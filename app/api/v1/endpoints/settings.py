import os
import json
import hmac
import hashlib
import shutil
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, Response

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
LOGO_PATH = BASE_DIR / "company-logo.png"
SETTINGS_FILE = BASE_DIR / "settings_local.json"
LICENSE_SALT = os.getenv("LICENSE_SALT", "SM-2026-SECRET-SALT")

DEFAULT_SETTINGS = {
    # White-Label podaci auto-servisa
    "company_name": "ServisMaster OS",
    "company_pib": "",
    "company_mb": "",
    "company_address": "",
    "company_phone": "",
    "company_bank_acc": "",
    "currency_base": "RSD",
    "default_lang": "sr",
    # Licenciranje
    "license_key": "",
    "license_tier": "core",
    # OBD-II / Bluetooth dijagnostika
    "obd_mode": "simulation",       # simulation | web_bluetooth | serial_com
    "obd_com_port": "COM3",
    "obd_baudrate": "38400",
    "obd_protocol": "AUTO",
    # Fiskalizacija (PFR)
    "fiscal_mode": "internal",      # internal | lpfr | vpfr
    "fiscal_pfr_url": "http://localhost:8989/api/v3/invoices",
    "fiscal_pac": "",
    "fiscal_cashier": "Serviser 1",
    # SMTP Email alarmi
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


def read_settings() -> dict:
    data = dict(DEFAULT_SETTINGS)
    if SETTINGS_FILE.exists():
        try:
            with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                data.update(json.load(f))
        except Exception:
            pass
    data["license_tier"] = verify_license_key(data.get("license_key", ""))
    return data


def write_settings(data: dict) -> dict:
    data["license_tier"] = verify_license_key(data.get("license_key", ""))
    with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return data


@router.get("")
def get_settings():
    cfg = read_settings()
    # Maskiraj lozinku pri slanju na frontend ako postoji
    safe_cfg = dict(cfg)
    return {
        "settings": safe_cfg,
        "hasCustomLogo": LOGO_PATH.exists(),
    }


@router.post("")
async def save_settings(
    company_name: Optional[str] = Form(None),
    company_pib: Optional[str] = Form(None),
    company_mb: Optional[str] = Form(None),
    company_address: Optional[str] = Form(None),
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
    smtp_host: Optional[str] = Form(None),
    smtp_port: Optional[str] = Form(None),
    smtp_user: Optional[str] = Form(None),
    smtp_pass: Optional[str] = Form(None),
    remove_logo: Optional[str] = Form(None),
    company_logo: Optional[UploadFile] = File(None),
):
    current = read_settings()

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
        "smtp_host": smtp_host,
        "smtp_port": smtp_port,
        "smtp_user": smtp_user,
        "smtp_pass": smtp_pass,
    }

    for k, v in updates.items():
        if v is not None:
            current[k] = v.strip()

    saved = write_settings(current)
    return {
        "success": True,
        "settings": saved,
        "license_tier": saved["license_tier"],
        "hasCustomLogo": LOGO_PATH.exists(),
    }


@router.get("/obd/scan")
def obd_scan_diagnostics():
    """Čita greške preko podešenog OBD-II porta ili vraća simulirane DTC kodove za test."""
    cfg = read_settings()
    mode = cfg.get("obd_mode", "simulation")

    if mode == "serial_com":
        port = cfg.get("obd_com_port", "COM3")
        baud = int(cfg.get("obd_baudrate", "38400"))
        try:
            import obd  # opciona python-OBD biblioteka kod kupca
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

    # Simulacija / Demo režim (kada nema fizičkog uređaja)
    return {
        "mode": "simulation",
        "port": "SIM-ELM327",
        "dtc": [
            {"code": "P0300", "description": "Random/Multiple Cylinder Misfire Detected (Detektovano preskakanje paljenja)"},
            {"code": "P0171", "description": "System Too Lean Bank 1 (Siromašna smeša goriva - Bank 1)"},
        ],
    }