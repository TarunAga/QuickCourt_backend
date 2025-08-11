# 🔒 QuickCourt Backend - Push & PR Guide

## Security ✅
Your environment is properly secured:
- `.env` file is ignored by git
- `.env.example` provides template without secrets
- All sensitive files are in `.gitignore`

## Step-by-Step Commands

### 1. Create a Feature Branch
```bash
git checkout -b feature/complete-backend-setup
```

### 2. Add All Files to Staging
```bash
git add .
```

### 3. Commit Your Changes
```bash
git commit -m "feat: Complete backend setup with TypeScript, Express, TypeORM, and JWT auth

- Add complete project structure with API v1.0
- Implement TypeORM with PostgreSQL database integration
- Add JWT authentication system with bcrypt
- Implement file management with upload/CRUD operations
- Add comprehensive middleware (auth, validation, error handling)
- Include security features (Helmet, CORS, rate limiting)
- Add development/production configuration system
- Include comprehensive testing setup with Jest
- Add ESLint and Prettier for code quality
- Clean production-ready logging without emojis
- Secure environment variable handling"
```

### 4. Push to Your Repository
```bash
git push origin feature/complete-backend-setup
```

### 5. Create Pull Request
Go to GitHub and click "Compare & pull request" or use GitHub CLI:
```bash
gh pr create --title "Complete Backend Setup - Production Ready" --body "Complete backend implementation with all requested features and clean architecture"
```

## One-Line Commands (Copy & Paste)

### Option 1: Step by step
```bash
git checkout -b feature/complete-backend-setup
git add .
git commit -m "feat: Complete backend setup with TypeScript, Express, TypeORM, and JWT auth"
git push origin feature/complete-backend-setup
```

### Option 2: All at once
```bash
git checkout -b feature/complete-backend-setup && git add . && git commit -m "feat: Complete backend setup with TypeScript, Express, TypeORM, and JWT auth" && git push origin feature/complete-backend-setup
```

## After Pushing
1. Go to your GitHub repository
2. You'll see a "Compare & pull request" button
3. Click it to create the PR
4. Add description and submit

## 🔍 Final Security Verification
Before pushing, you can run:
```bash
# Windows
.\security-check.bat

# Linux/Mac
./security-check.sh
```

Your secrets are safe! 🔒
