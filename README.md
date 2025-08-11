# QuickCourt Full Stack Application

A complete full-stack application with React frontend and Node.js backend for the QuickCourt platform.

## 🏗️ Project Structure

```
QuickCourt_backend/
├── client/                 # React TypeScript Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── server/                 # Node.js TypeScript Backend
│   ├── src/
│   │   ├── API/v1.0/      # API routes
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── entities/      # Database entities
│   │   ├── helpers/       # Utility functions
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── middlewares/   # Express middlewares
│   │   ├── services/      # Business logic
│   │   └── types/         # Type definitions
│   ├── app.ts            # Main server entry
│   ├── datasource.ts     # Database configuration
│   └── package.json
├── package.json           # Root package.json for managing both apps
├── .gitignore
└── README.md
```

## � Quick Start

### Prerequisites
- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- PostgreSQL database

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Environment Setup
```bash
# Copy server environment template
cp server/.env.example server/.env
# Edit server/.env with your database credentials
```

### 3. Start Development Servers
```bash
# Start both client and server concurrently
npm run dev
```

This will start:
- **Backend server**: http://localhost:3000
- **Frontend app**: http://localhost:3001

## 📝 Available Scripts

### Root Level Commands
```bash
npm run dev              # Start both client and server in development
npm run start            # Start both client and server in production
npm run build            # Build both client and server
npm run test             # Run tests for both client and server
npm run install:all      # Install dependencies for both projects
npm run install:server   # Install server dependencies only
npm run install:client   # Install client dependencies only
```

### Server Commands (Backend)
```bash
npm run server:dev       # Start backend development server
npm run server:start     # Start backend production server
npm run server:build     # Build backend TypeScript
npm run server:test      # Run backend tests
```

### Client Commands (Frontend)
```bash
npm run client:dev       # Start React development server
npm run client:start     # Start React development server
npm run client:build     # Build React app for production
npm run client:test      # Run React tests
```

## 🔧 Backend Features

- **TypeScript** - Full type safety
- **Express.js** - Web framework
- **TypeORM** - Database ORM with PostgreSQL
- **JWT Authentication** - Secure user auth
- **File Upload** - Multer file handling
- **Security** - Helmet, CORS, rate limiting
- **Validation** - express-validator
- **Testing** - Jest test framework

## ⚛️ Frontend Features

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe frontend development
- **Create React App** - Standard React toolchain
- **Modern CSS** - CSS modules support
- **Testing** - Jest and React Testing Library

## �️ Development

### Backend Development
```bash
cd server
npm run dev  # Starts on port 3000
```

### Frontend Development
```bash
cd client
npm start    # Starts on port 3001
```

### Database Setup
1. Create PostgreSQL database
2. Update `server/.env` with database credentials
3. Start the server - tables will be created automatically

## 🌐 API Documentation

### Base URLs
- **Development**: http://localhost:3000/api/v1.0
- **Production**: https://your-domain.com/api/v1.0

### Key Endpoints
- `GET /health` - Server health check
- `GET /api/v1.0/health` - API health check
- `POST /api/v1.0/files/upload` - File upload
- `GET /api/v1.0/files` - Get user files

## 🔐 Environment Variables

### Server (.env)
```bash
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=quickcourt_dev
JWT_SECRET=your_jwt_secret
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Backend
```bash
cd server
npm run build
npm start
```

### Deploy Frontend
```bash
cd client
npm run build
# Serve the build folder with your preferred static server
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Backend Tests Only
```bash
npm run server:test
```

### Frontend Tests Only
```bash
npm run client:test
```

## � Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- TypeORM + PostgreSQL
- JWT + bcrypt
- Jest

### Frontend
- React 18 + TypeScript
- Create React App
- CSS Modules
- Jest + React Testing Library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding!** 🎉

