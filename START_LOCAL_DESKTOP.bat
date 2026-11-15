@echo off
title ServisMaster OS Desktop
if not exist ".venv" (
    python -m venv .venv
    call .venv\Scripts\activate
    pip install -r requirements.txt
) else (
    call .venv\Scripts\activate
)
python desktop_launcher.py
