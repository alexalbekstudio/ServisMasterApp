from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # ============================================
    # APP
    # ============================================
    APP_NAME: str = "ServisMaster OS"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"

    # ============================================
    # DATABASE
    # ============================================
    # Sada učitavamo kompletan URL. Ako ga nema (npr. kod tebe lokalno kad testiraš, ovo je default).
    # U Coolify-u će ova vrednost biti automatski zamenjena onim što si uneo u Environment Variables.
    DATABASE_URL: str = Field(
        default="postgresql+psycopg2://postgres:postgres@localhost:5434/servismaster_db", 
        env='DATABASE_URL'
    )

    # ============================================
    # JWT
    # ============================================
    SECRET_KEY: str = "promeni_ovaj_kljuc_u_produkciji_generisi_random_string"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ALGORITHM: str = "HS256"

    # ============================================
    # CORS & PUBLIC URL
    # ============================================
    ALLOWED_ORIGINS: str = "http://localhost:8000,http://localhost:3000"
    PUBLIC_BASE_URL: str = "http://localhost:8000"

    # ============================================
    # TELEGRAM & WHATSAPP (Konfiguriše kupac u Settings)
    # ============================================
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_DEV_CHAT_ID: str = ""
    WHATSAPP_DEFAULT_PREFIX: str = "381"

    # ============================================
    # EMAIL (SMTP - Konfiguriše kupac u Settings)
    # ============================================
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = "noreply@servismaster.local"
    TEST_EMAIL_RECIPIENT: str = ""
    SUPER_ADMIN_EMAIL: str = "admin@servismaster.local"

    # ============================================
    # VIN DEKODER & FISKALIZACIJA (PFR)
    # ============================================
    NHTSA_API_URL: str = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin"
    PFR_SANDBOX_URL: str = "https://vsdc.sandbox.suf.purs.gov.rs"
    PFR_PRODUCTION_URL: str = "https://vsdc.suf.purs.gov.rs"
    PFR_CERTIFICATE_PATH: str = ""
    PFR_PAK_CODE: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
        env_ignore_empty=True,
    )

settings = Settings()