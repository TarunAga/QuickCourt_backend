import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import { AuthUserDto, ErrorResponse } from '../interfaces';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const response: ErrorResponse = {
        success: false,
        message: 'Authorization header is required',
        timestamp: new Date().toISOString(),
      };
      res.status(401).json(response);
      return;
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token) {
      const response: ErrorResponse = {
        success: false,
        message: 'Token is required',
        timestamp: new Date().toISOString(),
      };
      res.status(401).json(response);
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as AuthUserDto;
    req.user = decoded;

    next();
  } catch (error) {
    const response: ErrorResponse = {
      success: false,
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : 'Token verification failed',
      timestamp: new Date().toISOString(),
    };
    res.status(401).json(response);
  }
};
