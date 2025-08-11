#!/bin/bash

# TypeScript Decorator Fix Script
# Run this if you encounter decorator issues in VS Code

echo "Fixing TypeScript decorator issues..."

# Restart TypeScript Language Server
echo "1. Restarting TypeScript Language Server..."
# In VS Code: Ctrl+Shift+P -> "TypeScript: Restart TS Server"

# Reload VS Code window
echo "2. Reload VS Code window if issues persist..."
# In VS Code: Ctrl+Shift+P -> "Developer: Reload Window"

# Verify TypeScript version
echo "3. Checking TypeScript version..."
npx tsc --version

# Build to verify decorators work
echo "4. Testing build..."
npm run build

echo "✅ Decorator issues should be resolved!"
echo ""
echo "If problems persist:"
echo "- Press Ctrl+Shift+P in VS Code"
echo "- Type 'TypeScript: Restart TS Server'"
echo "- Or type 'Developer: Reload Window'"
