import { DataSource } from 'typeorm';
import { config } from './src/config/index';

export const AppDataSource = new DataSource({
  type: config.database.type as any,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.nodeEnv === 'development', // Only in development
  logging: false, // Disabled for clean production logs
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  subscribers: ['./src/subscribers/**/*.ts'],
  ssl: {
    rejectUnauthorized: false
  }, // Required for Neon
});
