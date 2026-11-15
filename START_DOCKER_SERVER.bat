@echo off
title ServisMaster OS Server (Docker)
docker compose up -d --build
start http://localhost:8000
exit
