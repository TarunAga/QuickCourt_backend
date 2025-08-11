# QuickCourt Backend API

A robust Node.js backend API built with TypeScript, Express.js, and TypeORM for the QuickCourt application.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated, minimalist web framework
- **TypeORM** - Object-relational mapping with support for PostgreSQL
- **JWT Authentication** - Secure user authentication and authorization
- **File Upload** - Secure file handling with validation
- **Input Validation** - Request validation using express-validator
- **Security Middleware** - Helmet, CORS, rate limiting, and compression
- **Logging** - Request logging with Morgan
- **Error Handling** - Global error handling middleware
- **Environment Configuration** - Separate dev and production configs

## 📁 Project Structure

```
├── app.ts                    # Main application entry point
├── datasource.ts            # TypeORM data source configuration
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── src/
    ├── API/
    │   └── v1.0/
    │       ├── index.ts         # API v1.0 main routes
    │       └── fileRoutes.ts    # File-related routes
    ├── config/
    │   ├── index.ts            # Configuration loader
    │   ├── dev.json            # Development configuration
    │   └── prod.json           # Production configuration
    ├── controllers/
    │   └── fileController.ts   # File operations controller
    ├── entities/
    │   ├── index.ts
    │   ├── File.ts            # File entity
    │   └── User.ts            # User entity
    ├── helpers/
    │   ├── auth/
    │   │   └── AuthHelper.ts  # Authentication utilities
    │   ├── utils/
    │   │   └── index.ts       # General utilities
    │   └── validation/
    │       └── index.ts       # Validation rules
    ├── interfaces/
    │   ├── index.ts
    │   ├── ApiResponse.ts     # API response interfaces
    │   ├── FileDto.ts         # File DTOs
    │   └── UserDto.ts         # User DTOs
    ├── middlewares/
    │   ├── authMiddleware.ts      # JWT authentication middleware
    │   ├── validationMiddleware.ts # Input validation middleware
    │   ├── errorHandler.ts        # Global error handler
    │   └── notFoundHandler.ts     # 404 handler
    ├── services/
    │   └── fileOperations.ts      # File business logic
    └── types/
        └── index.ts               # TypeScript type definitions
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- PostgreSQL database

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuickCourt_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other configurations.

4. **Database Setup**
   - Create a PostgreSQL database
   - Update database credentials in `.env` file
   - The application will automatically create tables on first run (in development mode)

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Build for production
   npm run build
   
   # Start production server
   npm start
   ```

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints

#### Health Check
- `GET /health` - Server health status
- `GET /api/v1.0/health` - API v1.0 health status

#### File Management
- `POST /api/v1.0/files/upload` - Upload a file
- `GET /api/v1.0/files` - Get all user files (paginated)
- `GET /api/v1.0/files/:id` - Get file by ID
- `PUT /api/v1.0/files/:id` - Update file metadata
- `DELETE /api/v1.0/files/:id` - Delete a file

### Request/Response Format

#### Standard API Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}, 
  "timestamp": "2025-08-11T10:00:00.000Z"
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "timestamp": "2025-08-11T10:00:00.000Z"
}
```

## 🔧 Configuration

The application uses environment-specific JSON configuration files:

- `src/config/dev.json` - Development environment
- `src/config/prod.json` - Production environment

Configuration can be overridden using environment variables.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Development Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run typecheck    # Type check without emitting
```

## 🔐 Security Features

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents abuse with configurable limits
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Comprehensive request validation
- **Password Hashing** - Bcrypt with salt rounds

## 🚀 Deployment

### Environment Variables

Make sure to set the following environment variables in production:

```bash
NODE_ENV=production
PORT=8080
DB_HOST=your-prod-db-host
DB_USERNAME=your-prod-db-username
DB_PASSWORD=your-prod-db-password
DB_NAME=your-prod-db-name
JWT_SECRET=your-super-secure-jwt-secret
```

### Build and Deploy

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcrypt
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

