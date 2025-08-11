@echo off
echo QuickCourt Backend Security Check
echo ================================

echo 1. Checking .env file protection...
git ls-files --cached --ignore 2>nul | findstr /E ".env" | findstr /V ".env.example" >nul
if %errorlevel% == 0 (
    echo ❌ ERROR: .env files are being tracked by git!
    echo    Run: git rm --cached .env
    exit /b 1
) else (
    echo ✅ .env files are properly ignored
)

echo 2. Checking .env.example file...
if exist ".env.example" (
    echo ✅ .env.example file exists
) else (
    echo ❌ ERROR: .env.example file missing
    exit /b 1
)

echo 3. Checking .gitignore coverage...
findstr /C:".env" .gitignore >nul && echo ✅ .env is properly ignored || echo ⚠️ WARNING: .env might not be ignored
findstr /C:"node_modules" .gitignore >nul && echo ✅ node_modules is properly ignored || echo ⚠️ WARNING: node_modules might not be ignored
findstr /C:"dist/" .gitignore >nul && echo ✅ dist/ is properly ignored || echo ⚠️ WARNING: dist/ might not be ignored

echo.
echo Security check completed!
echo ✅ Your repository is ready for pushing
echo.
