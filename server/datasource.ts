import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/entities/User';
import { File } from './src/entities/File';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.PGPORT || process.env.DB_PORT || '5432'),
  username: process.env.PGUSER || process.env.DB_USERNAME || 'postgres',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.PGDATABASE || process.env.DB_NAME || 'quickcourt',
  synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.PGSSLMODE === 'require' ? {
    rejectUnauthorized: false
  } : false,
  entities: [User, File],
  migrations: ['./src/migrations/**/*.ts'],
  subscribers: ['./src/subscribers/**/*.ts'],
});
