import path from 'path';
import fs from 'fs';

interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface JWTConfig {
  secret: string;
  expiresIn: string | number;
}

interface FileUploadConfig {
  maxSize: string;
  allowedTypes: string[];
  uploadPath: string;
}

interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export interface Config {
  port: number;
  nodeEnv: string;
  corsOrigin: string[];
  database: DatabaseConfig;
  jwt: JWTConfig;
  fileUpload: FileUploadConfig;
  redis: RedisConfig;
  email: EmailConfig;
}

const getConfig = (): Config => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const configFile = nodeEnv === 'production' ? 'prod.json' : 'dev.json';
  const configPath = path.join(__dirname, configFile);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`);
  }

  const configData = fs.readFileSync(configPath, 'utf8');
  const parsedConfig = JSON.parse(configData);

  // Override with environment variables if they exist
  return {
    ...parsedConfig,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : parsedConfig.port,
    database: {
      ...parsedConfig.database,
      host: process.env.DB_HOST || parsedConfig.database.host,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : parsedConfig.database.port,
      username: process.env.DB_USERNAME || parsedConfig.database.username,
      password: process.env.DB_PASSWORD || parsedConfig.database.password,
      database: process.env.DB_NAME || parsedConfig.database.database,
    },
    jwt: {
      ...parsedConfig.jwt,
      secret: process.env.JWT_SECRET || parsedConfig.jwt.secret,
    },
  };
};

export const config = getConfig();
