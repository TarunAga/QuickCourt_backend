import { Request, Response, NextFunction } from 'express';
import { FileOperations } from '../services/fileOperations';
import { ApiResponse } from '../interfaces/ApiResponse';
import { CreateFileDto, UpdateFileDto } from '../interfaces/FileDto';

export class FileController {
  private fileOperations: FileOperations;

  constructor() {
    this.fileOperations = new FileOperations();
  }

  async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fileData: CreateFileDto = {
        originalName: req.file?.originalname || '',
        filename: req.file?.filename || '',
        path: req.file?.path || '',
        size: req.file?.size || 0,
        mimetype: req.file?.mimetype || '',
        userId: req.user?.id || 0,
      };

      const result = await this.fileOperations.uploadFile(fileData);

      const response: ApiResponse<any> = {
        success: true,
        message: 'File uploaded successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getFileById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fileId = parseInt(req.params.id, 10);
      const userId = req.user?.id || 0;

      const result = await this.fileOperations.getFileById(fileId, userId);

      if (!result) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'File not found',
          data: null,
          timestamp: new Date().toISOString(),
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<any> = {
        success: true,
        message: 'File retrieved successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 0;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await this.fileOperations.getAllFiles(userId, page, limit);

      const response: ApiResponse<any> = {
        success: true,
        message: 'Files retrieved successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fileId = parseInt(req.params.id, 10);
      const userId = req.user?.id || 0;

      const result = await this.fileOperations.deleteFile(fileId, userId);

      if (!result) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'File not found or unauthorized',
          data: null,
          timestamp: new Date().toISOString(),
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'File deleted successfully',
        data: null,
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fileId = parseInt(req.params.id, 10);
      const userId = req.user?.id || 0;
      const updateData: UpdateFileDto = req.body;

      const result = await this.fileOperations.updateFile(fileId, userId, updateData);

      if (!result) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'File not found or unauthorized',
          data: null,
          timestamp: new Date().toISOString(),
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<any> = {
        success: true,
        message: 'File updated successfully',
        data: result,
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
