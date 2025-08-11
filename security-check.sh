#!/bin/bash

# Security Check Script - Run before pushing to ensure no secrets are exposed

echo "QuickCourt Backend Security Check"
echo "================================"

# Check if .env is properly ignored
echo "1. Checking .env file protection..."
if git ls-files --cached --ignore | grep -E "\.env$|\.env\..*" | grep -v ".env.example"; then
    echo "❌ ERROR: .env files are being tracked by git!"
    echo "   Run: git rm --cached .env"
    exit 1
else
    echo "✅ .env files are properly ignored"
fi

# Check for hardcoded secrets in code
echo "2. Scanning for potential hardcoded secrets..."
SECRETS_FOUND=false

# Check for potential database credentials
if grep -r --include="*.ts" --include="*.js" --include="*.json" -E "(password|secret|key)\s*[:=]\s*['\"][^'\"]{10,}['\"]" src/ app.ts 2>/dev/null; then
    echo "⚠️  WARNING: Potential hardcoded credentials found!"
    SECRETS_FOUND=true
fi

# Check for JWT secrets
if grep -r --include="*.ts" --include="*.js" -E "jwt.*secret.*['\"][^'\"]{10,}['\"]" src/ app.ts 2>/dev/null; then
    echo "⚠️  WARNING: Potential hardcoded JWT secret found!"
    SECRETS_FOUND=true
fi

if [ "$SECRETS_FOUND" = false ]; then
    echo "✅ No obvious hardcoded secrets found"
fi

# Check if .env.example exists
echo "3. Checking .env.example file..."
if [ -f ".env.example" ]; then
    echo "✅ .env.example file exists"
else
    echo "❌ ERROR: .env.example file missing"
    exit 1
fi

# Check if sensitive files are in gitignore
echo "4. Checking .gitignore coverage..."
REQUIRED_IGNORES=(".env" "node_modules/" "*.log" "dist/" "build/")
for item in "${REQUIRED_IGNORES[@]}"; do
    if grep -q "$item" .gitignore; then
        echo "✅ $item is properly ignored"
    else
        echo "⚠️  WARNING: $item might not be properly ignored"
    fi
done

echo ""
echo "Security check completed!"
echo "✅ Your repository is ready for pushing"
echo ""
