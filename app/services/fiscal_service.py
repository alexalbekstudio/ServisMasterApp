import urllib.request
import json
from decimal import Decimal
from typing import Any, Dict, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.fiscal_receipt import FiscalReceipt
from app.models.shop import Shop
from app.models.work_order import WorkOrder, WorkOrderItem
from app.api.v1.endpoints.settings import read_settings


class FiscalService:
    """Servis za fiskalizaciju (Interni račun, LPFR lokalni procesor ili Cloud VPFR)."""

    @classmethod
    def prepare_receipt_data(cls, db: Session, work_order: WorkOrder) -> Dict[str, Any]:
        shop = db.query(Shop).filter(Shop.id == work_order.shop_id).first()
        cfg = read_settings()

        items = db.query(WorkOrderItem).filter(
            WorkOrderItem.work_order_id == work_order.id,
            WorkOrderItem.is_approved == True,
        ).all()

        if not items:
            raise ValueError("Nalog nema odobrenih stavki za fiskalizaciju.")

        receipt_items = []
        for item in items:
            receipt_items.append({
                "name": item.title,
                "quantity": float(item.quantity),
                "unit_price": float(item.unit_price),
                "total_price": float(item.quantity * item.unit_price),
                "tax_label": "Ђ",
            })

        total_amount = sum(i["total_price"] for i in receipt_items)
        tax_base = total_amount / Decimal("1.20")
        vat_amount = total_amount - tax_base

        return {
            "shop_name": cfg.get("company_name") or (shop.name if shop else "ServisMaster"),
            "shop_pib": cfg.get("company_pib") or (shop.pib if shop else ""),
            "shop_address": cfg.get("company_address") or (shop.address if shop else ""),
            "cashier": cfg.get("fiscal_cashier", "Serviser 1"),
            "work_order_number": work_order.order_number,
            "items": receipt_items,
            "total_amount": float(total_amount),
            "tax_base": float(tax_base),
            "vat_amount": float(vat_amount),
            "vat_rate": 20.0,
        }

    @classmethod
    def create_fiscal_receipt(cls, db: Session, work_order: WorkOrder) -> FiscalReceipt:
        cfg = read_settings()
        fiscal_mode = cfg.get("fiscal_mode", "internal")
        data = cls.prepare_receipt_data(db, work_order)

        receipt_number = f"INT-{work_order.order_number:06d}"
        verification_url = ""
        pfr_status = "INTERNAL_OK"

        # Ako je kupac u Settings podesio LPFR ili VPFR
        if fiscal_mode in ("lpfr", "vpfr"):
            pfr_url = cfg.get("fiscal_pfr_url", "").strip()
            pac = cfg.get("fiscal_pac", "").strip()
            if not pfr_url:
                raise ValueError("Nije unet PFR URL u Podešavanjima fiskalizacije.")

            payload = json.dumps({
                "invoiceType": "Normal",
                "transactionType": "Sale",
                "payment": [{"amount": data["total_amount"], "paymentType": "Cash"}],
                "cashier": data["cashier"],
                "items": [
                    {
                        "name": i["name"],
                        "quantity": i["quantity"],
                        "unitPrice": i["unit_price"],
                        "totalAmount": i["total_price"],
                        "labels": ["Ђ"],
                    }
                    for i in data["items"]
                ],
            }).encode("utf-8")

            headers = {"Content-Type": "application/json"}
            if pac:
                headers["PAC"] = pac

            try:
                req = urllib.request.Request(pfr_url, data=payload, headers=headers, method="POST")
                with urllib.request.urlopen(req, timeout=8) as resp:
                    pfr_res = json.loads(resp.read().decode("utf-8"))
                    receipt_number = pfr_res.get("invoiceNumber", f"PFR-{work_order.order_number:06d}")
                    verification_url = pfr_res.get("verificationUrl", "")
                    pfr_status = "FISCALIZED"
                    data["pfr_raw"] = pfr_res
            except Exception as e:
                raise ValueError(f"Greška u komunikaciji sa PFR uređajem ({pfr_url}): {str(e)}")

        receipt = FiscalReceipt(
            work_order_id=work_order.id,
            receipt_number=receipt_number,
            total_amount=Decimal(str(data["total_amount"])),
            tax_base=Decimal(str(data["tax_base"])),
            vat_amount=Decimal(str(data["vat_amount"])),
            vat_rate=Decimal("20.00"),
            pfr_status=pfr_status,
            verification_url=verification_url,
            pfr_response=data,
        )
        db.add(receipt)
        db.commit()
        db.refresh(receipt)
        return receipt

    @classmethod
    def get_receipt_for_order(cls, db: Session, work_order_id: UUID) -> Optional[FiscalReceipt]:
        return db.query(FiscalReceipt).filter(FiscalReceipt.work_order_id == work_order_id).first()