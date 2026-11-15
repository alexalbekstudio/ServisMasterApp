@echo off
chcp 65001 >nul
title ServisMaster OS - Pokretanje sistema
echo ===================================================
echo   ServisMaster OS v2.4 Commercial - Pokretanje...
echo ===================================================

if not exist ".venv" (
    echo [1/3] Kreiranje virtuelnog okruzenja...
    python -m venv .venv
)

call .venv\Scripts\activate

echo [2/3] Provera zavisnosti...
pip install -r requirements.txt --quiet

echo [3/3] Otvaranje ServisMaster OS aplikacije na http://127.0.0.1:8000 ...
start "" http://127.0.0.1:8000
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
pause
