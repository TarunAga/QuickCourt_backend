@echo off
echo.
echo QuickCourt Backend Setup
echo =======================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js (>= 16.0.0)
    pause
    exit /b 1
)

REM Display Node.js version
echo Node.js is installed
node --version

REM Create uploads directory
echo.
echo Creating uploads directory...
if not exist "uploads\dev" mkdir "uploads\dev"
if not exist "uploads\prod" mkdir "uploads\prod"
echo Uploads directories created

REM Copy environment file if it doesn't exist
if not exist ".env" (
    echo.
    echo Creating .env file from template...
    copy ".env.example" ".env" >nul
    echo .env file created. Please update it with your configuration.
) else (
    echo .env file already exists
)

echo.
echo Available commands:
echo   npm run dev          - Start development server
echo   npm run build        - Build for production
echo   npm start            - Start production server
echo   npm test             - Run tests
echo   npm run lint         - Run ESLint
echo.
echo Next steps:
echo 1. Update .env file with your database credentials
echo 2. Create a PostgreSQL database
echo 3. Run 'npm run dev' to start the development server
echo.
echo Setup complete!
echo.
pause
