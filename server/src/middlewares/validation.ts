import { body, validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Password validation rules
export const passwordValidation = () => [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

// Email validation
export const emailValidation = () => [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),
];

// Name validation
export const nameValidation = () => [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
];

// Phone validation
export const phoneValidation = () => [
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
];

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array().map((error: ValidationError) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

// Registration validation
export const registerValidation = [
  ...emailValidation(),
  ...passwordValidation(),
  ...nameValidation(),
  ...phoneValidation(),
  handleValidationErrors,
];

// Login validation
export const loginValidation = [
  ...emailValidation(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];
