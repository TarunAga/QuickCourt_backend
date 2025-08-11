import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../interfaces';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const response: ErrorResponse = {
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  };

  res.status(404).json(response);
};
