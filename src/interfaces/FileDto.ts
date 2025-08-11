export interface CreateFileDto {
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  userId: number;
}

export interface UpdateFileDto {
  originalName?: string;
  description?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface FileDto {
  id: number;
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  userId: number;
  description?: string;
  tags?: string[];
  isPublic: boolean;
  uploadedAt: Date;
  updatedAt?: Date;
}
