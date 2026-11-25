import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

FILES_TO_PLAN = {
    "basic_codes.txt": "basic",
    "pro_codes.txt": "pro",
    "enterprise_codes.txt": "enterprise",
}


def normalize_db_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+psycopg2://", 1)
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+psycopg2://", 1)
    return url


def main() -> None:
    if not DATABASE_URL:
        raise RuntimeError("Nije pronađen DATABASE_URL u okruženju (.env).")

    db_url = normalize_db_url(DATABASE_URL)
    engine = create_engine(db_url, pool_pre_ping=True)

    rows: list[dict[str, str]] = []
    for filename, plan in FILES_TO_PLAN.items():
        path = Path(filename)
        if not path.exists():
            print(f"Preskačem {filename} — fajl ne postoji.")
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            code = line.strip()
            if code:
                rows.append({"code": code, "plan": plan})

    if not rows:
        print("Nema kodova za uvoz.")
        return

    with engine.begin() as conn:
        conn.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS license_keys (
                    id SERIAL PRIMARY KEY,
                    code VARCHAR(64) UNIQUE NOT NULL,
                    plan VARCHAR(20) NOT NULL,
                    is_used BOOLEAN NOT NULL DEFAULT FALSE,
                    used_at TIMESTAMPTZ NULL,
                    activated_for VARCHAR(255) NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );
                """
            )
        )
        conn.execute(
            text(
                """
                INSERT INTO license_keys (code, plan)
                VALUES (:code, :plan)
                ON CONFLICT (code) DO NOTHING;
                """
            ),
            rows,
        )

    print(f"Obrađeno {len(rows)} kodova (postojeći duplikati su preskočeni).")


if __name__ == "__main__":
    main()