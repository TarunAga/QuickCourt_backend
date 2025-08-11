import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ErrorResponse } from '../interfaces';

export const validateFileUpload = [
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const response: ErrorResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(response);
      return;
    }

    // Check if file exists
    if (!req.file) {
      const response: ErrorResponse = {
        success: false,
        message: 'File is required',
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(response);
      return;
    }

    next();
  },
];

export const validateUserRegistration = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  
  body('firstName')
    .isLength({ min: 1 })
    .withMessage('First name is required'),
  
  body('lastName')
    .isLength({ min: 1 })
    .withMessage('Last name is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const response: ErrorResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(response);
      return;
    }

    next();
  },
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const response: ErrorResponse = {
        success: false,
        message: 'Validation failed',
        error: errors.array().map(err => err.msg).join(', '),
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(response);
      return;
    }

    next();
  },
];
