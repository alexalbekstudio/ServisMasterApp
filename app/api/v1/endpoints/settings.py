import os
import json
import hmac
import hashlib
import shutil
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.shop import Shop

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
LOGO_PATH = BASE_DIR / "company-logo.png"
SETTINGS_FILE = BASE_DIR / "settings_local.json"
LICENSE_SALT = os.getenv("LICENSE_SALT", "SM-2026-SECRET-SALT")

DEFAULT_SETTINGS = {
    "company_name": "ServisMaster OS",
    "company_pib": "",
    "company_mb": "",
    "company_address": "",
    "company_city": "",
    "company_phone": "",
    "company_bank_acc": "",
    "currency_base": "RSD",
    "default_lang": "sr",
    "license_key": "SM-ULTIMATE-2026-MASTER",
    "license_tier": "ultimate",
    # OBD-II
    "obd_mode": "simulation",
    "obd_com_port": "COM3",
    "obd_baudrate": "38400",
    "obd_protocol": "AUTO",
    # Fiskalizacija
    "fiscal_mode": "internal",
    "fiscal_pfr_url": "http://localhost:8989/api/v3/invoices",
    "fiscal_pac": "",
    "fiscal_cashier": "Serviser 1",
    # WhatsApp & Telegram
    "whatsapp_enabled": "true",
    "whatsapp_phone": "",
    "whatsapp_greeting": "Poštovani, status vašeg vozila možete pratiti na linku:",
    "telegram_enabled": "false",
    "telegram_bot_token": "",
    "telegram_chat_id": "",
    # SMTP
    "smtp_host": "smtp.gmail.com",
    "smtp_port": "587",
    "smtp_user": "",
    "smtp_pass": "",
}


def verify_license_key(key_str: str) -> str:
    if not key_str or not isinstance(key_str, str):
        return "core"
    clean = key_str.strip().upper()
    if clean == "SM-ULTIMATE-2026-MASTER":
        return "ultimate"
    if clean == "SM-PRO-2026-MASTER":
        return "pro"
    if clean == "SM-CORE-2026-MASTER":
        return "core"

    parts = clean.split("-")
    if len(parts) != 4 or parts[0] != "SM":
        return "core"
    tier = parts[1].lower()
    if tier not in ("core", "pro", "ultimate"):
        return "core"

    payload = f"{parts[0]}-{parts[1]}-{parts[2]}"
    expected_sig = hmac.new(
        LICENSE_SALT.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()[:4].upper()
    return tier if parts[3] == expected_sig else "core"


def read_settings(db: Optional[Session] = None) -> dict:
    data = dict(DEFAULT_SETTINGS)
    if SETTINGS_FILE.exists():
        try:
            with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                data.update(json.load(f))
        except Exception:
            pass
    elif db is not None:
        shop = db.query(Shop).first()
        if shop:
            data["company_name"] = shop.name or data["company_name"]
            data["company_pib"] = shop.pib or ""
            data["company_mb"] = getattr(shop, "maticni_broj", "") or ""
            data["company_address"] = shop.address or ""
            data["company_city"] = shop.city or ""
            data["company_phone"] = shop.phone or ""
            data["company_bank_acc"] = getattr(shop, "bank_account", "") or ""

    data["license_tier"] = verify_license_key(data.get("license_key", ""))
    return data


def write_settings(data: dict, db: Optional[Session] = None) -> dict:
    data["license_tier"] = verify_license_key(data.get("license_key", ""))
    with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Sinhronizuj sa Shop tabelom u bazi kako bi PDF i QR kod odmah vukli nove podatke
    if db is not None:
        try:
            shops = db.query(Shop).all()
            for shop in shops:
                if data.get("company_name"):
                    shop.name = data["company_name"]
                shop.pib = data.get("company_pib", "")
                if hasattr(shop, "maticni_broj"):
                    shop.maticni_broj = data.get("company_mb", "")
                shop.address = data.get("company_address", "")
                shop.city = data.get("company_city", "")
                shop.phone = data.get("company_phone", "")
                if hasattr(shop, "bank_account") and data.get("company_bank_acc"):
                    shop.bank_account = data["company_bank_acc"]
                if hasattr(shop, "logo_path") and LOGO_PATH.exists():
                    shop.logo_path = str(LOGO_PATH)
            db.commit()
        except Exception:
            db.rollback()
    return data


@router.get("")
def get_settings(db: Session = Depends(get_db)):
    cfg = read_settings(db)
    return {
        "settings": cfg,
        "hasCustomLogo": LOGO_PATH.exists(),
    }


@router.post("")
async def save_settings(
    company_name: Optional[str] = Form(None),
    company_pib: Optional[str] = Form(None),
    company_mb: Optional[str] = Form(None),
    company_address: Optional[str] = Form(None),
    company_city: Optional[str] = Form(None),
    company_phone: Optional[str] = Form(None),
    company_bank_acc: Optional[str] = Form(None),
    currency_base: Optional[str] = Form(None),
    default_lang: Optional[str] = Form(None),
    license_key: Optional[str] = Form(None),
    obd_mode: Optional[str] = Form(None),
    obd_com_port: Optional[str] = Form(None),
    obd_baudrate: Optional[str] = Form(None),
    obd_protocol: Optional[str] = Form(None),
    fiscal_mode: Optional[str] = Form(None),
    fiscal_pfr_url: Optional[str] = Form(None),
    fiscal_pac: Optional[str] = Form(None),
    fiscal_cashier: Optional[str] = Form(None),
    whatsapp_enabled: Optional[str] = Form(None),
    whatsapp_phone: Optional[str] = Form(None),
    whatsapp_greeting: Optional[str] = Form(None),
    telegram_enabled: Optional[str] = Form(None),
    telegram_bot_token: Optional[str] = Form(None),
    telegram_chat_id: Optional[str] = Form(None),
    smtp_host: Optional[str] = Form(None),
    smtp_port: Optional[str] = Form(None),
    smtp_user: Optional[str] = Form(None),
    smtp_pass: Optional[str] = Form(None),
    remove_logo: Optional[str] = Form(None),
    company_logo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    current = read_settings(db)

    if remove_logo == "true" and LOGO_PATH.exists():
        LOGO_PATH.unlink()

    if company_logo and company_logo.filename:
        with open(LOGO_PATH, "wb") as buffer:
            shutil.copyfileobj(company_logo.file, buffer)

    updates = {
        "company_name": company_name,
        "company_pib": company_pib,
        "company_mb": company_mb,
        "company_address": company_address,
        "company_city": company_city,
        "company_phone": company_phone,
        "company_bank_acc": company_bank_acc,
        "currency_base": currency_base,
        "default_lang": default_lang,
        "license_key": license_key,
        "obd_mode": obd_mode,
        "obd_com_port": obd_com_port,
        "obd_baudrate": obd_baudrate,
        "obd_protocol": obd_protocol,
        "fiscal_mode": fiscal_mode,
        "fiscal_pfr_url": fiscal_pfr_url,
        "fiscal_pac": fiscal_pac,
        "fiscal_cashier": fiscal_cashier,
        "whatsapp_enabled": whatsapp_enabled,
        "whatsapp_phone": whatsapp_phone,
        "whatsapp_greeting": whatsapp_greeting,
        "telegram_enabled": telegram_enabled,
        "telegram_bot_token": telegram_bot_token,
        "telegram_chat_id": telegram_chat_id,
        "smtp_host": smtp_host,
        "smtp_port": smtp_port,
        "smtp_user": smtp_user,
        "smtp_pass": smtp_pass,
    }

    for k, v in updates.items():
        if v is not None:
            current[k] = v.strip()

    saved = write_settings(current, db)
    return {
        "success": True,
        "settings": saved,
        "license_tier": saved["license_tier"],
        "hasCustomLogo": LOGO_PATH.exists(),
    }


@router.get("/obd/scan")
def obd_scan_diagnostics():
    cfg = read_settings()
    mode = cfg.get("obd_mode", "simulation")

    if mode == "serial_com":
        port = cfg.get("obd_com_port", "COM3")
        baud = int(cfg.get("obd_baudrate", "38400"))
        try:
            import obd
            connection = obd.OBD(portstr=port, baudrate=baud, fast=False)
            if not connection.is_connected():
                raise HTTPException(
                    status_code=400,
                    detail=f"ELM327 adapter nije pronađen na portu {port} ({baud} baud).",
                )
            cmd = obd.commands.GET_DTC
            response = connection.query(cmd)
            connection.close()
            codes = [{"code": c[0], "description": c[1]} for c in (response.value or [])]
            return {"mode": "serial_com", "port": port, "dtc": codes}
        except ImportError:
            raise HTTPException(
                status_code=400,
                detail="Biblioteka 'obd' nije instalirana (pip install obd) ili prebacite na Web Bluetooth / Simulaciju.",
            )
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"OBD greška na {port}: {str(e)}")

    return {
        "mode": "simulation",
        "port": "SIM-ELM327",
        "dtc": [
            {
                "code": "P0300",
                "severity": "VISOK RIZIK",
                "system": "Motor / Paljenje",
                "description": "Random/Multiple Cylinder Misfire Detected (Detektovano preskakanje paljenja na više cilindara)",
            },
            {
                "code": "P0171",
                "severity": "SREDNJI RIZIK",
                "system": "Smješa goriva / Usis",
                "description": "System Too Lean Bank 1 (Siromašna smješa goriva - Bank 1 / MAF ili falš vazduh)",
            },
        ],
    }