import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session

from app.config import settings

# 1. Provera da li je aplikacija pokrenuta u Desktop (Standalone) režimu
IS_DESKTOP = os.getenv("IS_DESKTOP", "False").lower() in ("true", "1", "yes")

if IS_DESKTOP:
    # Lokalna SQLite baza za Desktop .exe
    SQLALCHEMY_DATABASE_URL = "sqlite:///./servismaster_desktop.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        connect_args={"check_same_thread": False} # Neophodno za SQLite u FastAPI-ju
    )
    print("🟢 ServisMasterOS pokrenut u DESKTOP modu (SQLite)")
else:
    # Originalni PostgreSQL za Server
    SQLALCHEMY_DATABASE_URL = settings.database_url
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
    )
    print("🔵 ServisMasterOS pokrenut u SERVER modu (PostgreSQL)")

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()

def get_db() -> Generator[Session, None, None]:
    """Dependency funkcija za FastAPI rute."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()