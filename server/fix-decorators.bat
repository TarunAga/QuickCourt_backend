@echo off
echo Fixing TypeScript decorator issues...

echo 1. Restarting TypeScript Language Server...
echo    In VS Code: Ctrl+Shift+P -^> "TypeScript: Restart TS Server"

echo 2. Reload VS Code window if issues persist...
echo    In VS Code: Ctrl+Shift+P -^> "Developer: Reload Window"

echo 3. Checking TypeScript version...
npx tsc --version

echo 4. Testing build...
npm run build

echo ✅ Decorator issues should be resolved!
echo.
echo If problems persist:
echo - Press Ctrl+Shift+P in VS Code
echo - Type 'TypeScript: Restart TS Server'
echo - Or type 'Developer: Reload Window'
pause
