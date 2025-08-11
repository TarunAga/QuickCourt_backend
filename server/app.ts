import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { AppDataSource } from './datasource';
import apiV1Routes from './src/API/v1.0/index';
import { errorHandler } from './src/middlewares/errorHandler';
import { notFoundHandler } from './src/middlewares/notFoundHandler';
import { sanitizeRequestBody, sanitizeResponse } from './src/middlewares/sanitizer';
import { config } from './src/config/index';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS
    this.app.use(cors({
      origin: config.corsOrigin,
      credentials: true,
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    });
    this.app.use(limiter);

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Sanitization middleware (after body parsing)
    this.app.use(sanitizeRequestBody);
    this.app.use(sanitizeResponse);

    // Logging (after sanitization)
    this.app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
      });
    });

    // API routes
    this.app.use('/api/v1.0', apiV1Routes);

    // Root endpoint
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'QuickCourt Backend API',
        version: '1.0.0',
        endpoints: {
          health: '/health',
          api: '/api/v1.0',
        },
      });
    });
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Initialize database connection
      try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown database error';
        console.warn('Database connection failed:', message);
        console.warn('Server will continue running without database connection');
        console.warn('Database-dependent features will not be available');
      }

      const PORT = config.port || 3000;
      this.app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${config.nodeEnv}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log(`API Base: http://localhost:${PORT}/api/v1.0`);
      });
    } catch (error) {
      console.error('Error starting the application:', error);
      process.exit(1);
    }
  }
}

export default App;

// Start the application
const application = new App();
application.start();
