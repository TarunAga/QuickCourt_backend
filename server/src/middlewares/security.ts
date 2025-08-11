import { Request, Response, NextFunction } from 'express';

/**
 * Security headers middleware
 * Adds additional security headers not covered by helmet
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy (formerly Feature Policy)
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
};

/**
 * Simple CSRF protection for state-changing operations
 * In production, use a more robust CSRF library like 'csurf'
 */
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // For now, just check for custom header (simple CSRF protection)
  // This prevents simple form submissions from other domains
  const customHeader = req.get('X-Requested-With');
  
  if (!customHeader || customHeader !== 'XMLHttpRequest') {
    return res.status(403).json({
      success: false,
      message: 'CSRF protection: Missing required header'
    });
  }

  next();
};
