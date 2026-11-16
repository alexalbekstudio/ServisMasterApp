import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# 1. Pametno pronalaženje putanja (radno okruženje vs PyInstaller)
if getattr(sys, 'frozen', False):
    # Kada je spakovano, frontend fajlovi su u sys._MEIPASS (_internal)
    ASSETS_DIR = Path(sys._MEIPASS)
    # .env fajl i SQLite baza su pored samog .exe fajla
    DATA_DIR = Path(sys.executable).parent
else:
    # U toku kucanja koda, sve je u istom korenskom folderu
    ASSETS_DIR = Path(__file__).resolve().parent.parent
    DATA_DIR = ASSETS_DIR

# Učitavanje .env fajla
load_dotenv(dotenv_path=str(DATA_DIR / ".env"), override=True)

# Sada učitaj ostalo
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles

from app.api.v1.api import api_router
from app.config import settings
from app.database import engine, Base

# Kreiranje tabela u bazi (za SQLite Desktop mod)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

ALLOWED_ORIGINS = ["*"] if settings.APP_ENV == "development" else settings.ALLOWED_ORIGINS.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.v1.endpoints.settings import LOGO_PATH

@app.get("/company-logo.png", tags=["Branding"])
def serve_company_logo():
    if LOGO_PATH.exists():
        return FileResponse(str(LOGO_PATH), headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
    return Response(status_code=404)

@app.get("/favicon.ico", tags=["Branding"])
def serve_favicon():
    if LOGO_PATH.exists():
        return FileResponse(str(LOGO_PATH), headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
    empty_png = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
    return Response(content=empty_png, media_type="image/png")

app.include_router(api_router, prefix=settings.API_V1_STR)

# 2. Registracija Frontend putanja
FRONTEND_DIR = ASSETS_DIR / "frontend"

# Fallback metoda u slučaju da je folder direktno pored .exe fajla
if not FRONTEND_DIR.exists():
    FRONTEND_DIR = DATA_DIR / "frontend"

if FRONTEND_DIR.exists():
    for subdir in ("css", "js", "img", "fonts", "icons"):
        sub_path = FRONTEND_DIR / subdir
        if sub_path.exists() and sub_path.is_dir():
            app.mount(f"/static/{subdir}", StaticFiles(directory=str(sub_path)), name=f"static-{subdir}")

    @app.get("/", tags=["Frontend"])
    def serve_frontend_root(): return FileResponse(str(FRONTEND_DIR / "index.html"))

    @app.get("/settings", tags=["Frontend"])
    def serve_settings_page(): return FileResponse(str(FRONTEND_DIR / "settings.html"))

    @app.get("/login", tags=["Frontend"])
    def serve_login_page(): return FileResponse(str(FRONTEND_DIR / "login.html"))

    @app.get("/register", tags=["Frontend"])
    def serve_register_page(): return FileResponse(str(FRONTEND_DIR / "register.html"))

    @app.get("/orders", tags=["Frontend"])
    def serve_orders_page(): return FileResponse(str(FRONTEND_DIR / "orders.html"))

    @app.get("/dashboard", tags=["Frontend"])
    def serve_dashboard_page(): return FileResponse(str(FRONTEND_DIR / "dashboard.html"))

    @app.get("/inventory", tags=["Frontend"])
    def serve_inventory_page(): return FileResponse(str(FRONTEND_DIR / "inventory.html"))

    @app.get("/status", tags=["Frontend"])
    def serve_status_page(): return FileResponse(str(FRONTEND_DIR / "status.html"))

    @app.get("/reminders", tags=["Frontend"])
    def serve_reminders_page(): return FileResponse(str(FRONTEND_DIR / "reminders.html"))

    @app.get("/help", tags=["Frontend"])
    def serve_help_page(): return FileResponse(str(FRONTEND_DIR / "help.html"))

    @app.get("/sw.js", tags=["PWA"])
    def serve_service_worker(): return FileResponse(str(FRONTEND_DIR / "sw.js"), media_type="application/javascript")

    @app.get("/manifest.json", tags=["PWA"])
    def serve_manifest(): return FileResponse(str(FRONTEND_DIR / "manifest.json"), media_type="application/json")


@app.get("/health", tags=["Status"])
def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV, "frontend_found": FRONTEND_DIR.exists()}


if __name__ == "__main__":
    import uvicorn
    import threading
    import time
    import webview

    def run_server():
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="warning")

    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    time.sleep(1.5)

    webview.create_window("ServisMaster OS", "http://127.0.0.1:8000", width=1280, height=800)
    webview.start()