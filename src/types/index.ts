export type UserRole = 'admin' | 'user' | 'moderator';

export type FileStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type SortOrder = 'ASC' | 'DESC';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  order: SortOrder;
}

export interface FilterOptions {
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: FileStatus;
  userId?: number;
}

export interface DatabaseConnectionOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export interface JWTPayload {
  id: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
