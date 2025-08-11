#!/bin/bash

# QuickCourt Backend Setup Script

echo "QuickCourt Backend Setup"
echo "======================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js (>= 16.0.0)"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# Create uploads directory
echo "Creating uploads directory..."
mkdir -p uploads/dev
mkdir -p uploads/prod
echo "Uploads directories created"

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ".env file created. Please update it with your configuration."
else
    echo ".env file already exists"
fi

echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm start            - Start production server"
echo "  npm test             - Run tests"
echo "  npm run lint         - Run ESLint"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database credentials"
echo "2. Create a PostgreSQL database"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "Setup complete!"
