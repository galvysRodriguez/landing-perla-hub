@echo off
title La Perla Host - Perla Suite Server
cd /d "%~dp0"
echo Iniciando servidor de Perla Suite + Mailjet en http://localhost:3005 ...
start "" "http://localhost:3005"
node server.js
pause
