@echo off
REM Solus E-commerce Setup Script (Windows)
REM Run this once to set up your local development environment

echo.
echo ========================================
echo    Solus E-commerce Setup
echo ========================================
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env > nul
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)

echo.
echo Installing dependencies...
call npm install

echo.
echo Generating Prisma client...
call npm run db:generate

echo.
echo Setting up database...
call npm run db:push

echo.
echo Seeding database with sample data...
call npm run db:seed

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo You can now run: npm run dev
echo.
echo Login credentials:
echo    Admin: admin@solus.ro / admin123
echo    Customer: customer@example.com / customer123
echo.
pause
