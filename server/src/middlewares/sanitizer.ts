import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

/**
 * Custom morgan token to sanitize sensitive data from logs
 */
morgan.token('sanitized-body', (req: Request) => {
  if (!req.body) return '{}';
  
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'otp'];
  const sanitized = { ...req.body };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return JSON.stringify(sanitized);
});

/**
 * Sanitize request body for logging - removes sensitive fields
 */
export const sanitizeRequestBody = (req: Request, res: Response, next: NextFunction) => {
  // Store original body for processing
  (req as any).originalBody = req.body;
  
  // For development, we can still process normally but log sanitized version
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Request to:', req.method, req.path);
    console.log('📝 Sanitized Body:', JSON.stringify(sanitizeObject(req.body)));
  }
  
  next();
};

/**
 * Sanitize response before sending - removes sensitive fields
 */
export const sanitizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  
  res.json = function(body: any) {
    // Sanitize response body
    const sanitized = sanitizeObject(body);
    
    // In development, log the sanitized response
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Sanitized Response:', JSON.stringify(sanitized));
    }
    
    return originalJson.call(this, body); // Send original response
  };
  
  next();
};

/**
 * Remove sensitive fields from an object
 */
function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sensitiveFields = [
    'password', 
    'token', 
    'accessToken', 
    'refreshToken',
    'secret', 
    'key', 
    'otp',
    'hashedPassword',
    'salt'
  ];
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  const sanitized = { ...obj };
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  // Recursively sanitize nested objects
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  });
  
  return sanitized;
}
