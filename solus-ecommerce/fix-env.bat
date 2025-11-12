@echo off
REM Fix DATABASE_URL in .env file for SQLite

echo Fixing .env file for SQLite...

REM Backup existing .env
if exist .env (
    copy .env .env.backup >nul
    echo ✓ Backed up .env to .env.backup
)

REM Delete old .env and create new one from .env.example
del .env
copy .env.example .env >nul

echo ✓ .env file updated with SQLite configuration
echo.
echo You can now run: setup.bat
echo.
