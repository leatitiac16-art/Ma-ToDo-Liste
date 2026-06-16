@echo off
cd /d "%~dp0"
start "Serveur MaToDo" cmd /k "node server.js"
timeout /t 2
echo Serveur lance ! Tu peux ouvrir Live Server dans VS Code.
pause