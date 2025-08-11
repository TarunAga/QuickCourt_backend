import { AppDataSource } from '../../datasource';
import { File } from '../entities/File';
import { Repository } from 'typeorm';
import { CreateFileDto, UpdateFileDto } from '../interfaces/FileDto';
import { PaginatedResponse } from '../interfaces/ApiResponse';
import fs from 'fs';
import path from 'path';

export class FileOperations {
  private fileRepository: Repository<File>;

  constructor() {
    // Repository will be initialized when first accessed
  }

  private getFileRepository(): Repository<File> {
    if (!this.fileRepository) {
      this.fileRepository = AppDataSource.getRepository(File);
    }
    return this.fileRepository;
  }

  async uploadFile(fileData: CreateFileDto): Promise<File> {
    try {
      const file = this.getFileRepository().create({
        originalName: fileData.originalName,
        filename: fileData.filename,
        path: fileData.path,
        size: fileData.size,
        mimetype: fileData.mimetype,
        userId: fileData.userId,
        uploadedAt: new Date(),
      });

      const savedFile = await this.getFileRepository().save(file);
      return savedFile;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to upload file: ${message}`);
    }
  }

  async getFileById(fileId: number, userId: number): Promise<File | null> {
    try {
      const file = await this.getFileRepository().findOne({
        where: {
          id: fileId,
          userId: userId,
        },
      });

      return file;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to retrieve file: ${message}`);
    }
  }

  async getAllFiles(
    userId: number, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<File>> {
    try {
      const skip = (page - 1) * limit;

      const [files, total] = await this.getFileRepository().findAndCount({
        where: { userId },
        order: { uploadedAt: 'DESC' },
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: files,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to retrieve files: ${message}`);
    }
  }

  async deleteFile(fileId: number, userId: number): Promise<boolean> {
    try {
      const file = await this.getFileRepository().findOne({
        where: {
          id: fileId,
          userId: userId,
        },
      });

      if (!file) {
        return false;
      }

      // Delete physical file from disk
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      // Delete from database
      await this.getFileRepository().remove(file);
      
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete file: ${message}`);
    }
  }

  async updateFile(
    fileId: number, 
    userId: number, 
    updateData: UpdateFileDto
  ): Promise<File | null> {
    try {
      const file = await this.getFileRepository().findOne({
        where: {
          id: fileId,
          userId: userId,
        },
      });

      if (!file) {
        return null;
      }

      // Update only provided fields
      Object.assign(file, updateData);
      file.updatedAt = new Date();

      const updatedFile = await this.getFileRepository().save(file);
      return updatedFile;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update file: ${message}`);
    }
  }

  async getFilesByType(
    userId: number, 
    mimetype: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<File>> {
    try {
      const skip = (page - 1) * limit;

      const [files, total] = await this.getFileRepository().findAndCount({
        where: { 
          userId, 
          mimetype: mimetype 
        },
        order: { uploadedAt: 'DESC' },
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: files,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to retrieve files by type: ${message}`);
    }
  }

  async getTotalStorageUsed(userId: number): Promise<number> {
    try {
      const result = await this.getFileRepository()
        .createQueryBuilder('file')
        .select('SUM(file.size)', 'totalSize')
        .where('file.userId = :userId', { userId })
        .getRawOne();

      return parseInt(result.totalSize) || 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to calculate storage usage: ${message}`);
    }
  }
}
