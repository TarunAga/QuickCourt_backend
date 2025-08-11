import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import logger from '../helpers/utils/logger';

export class AuthController {
  private authService = new AuthService();

  async signup(req: Request, res: Response): Promise<void> {
    logger.info('Signup', { query: req.query, body: req.body, params: req.params });
    try {
      await this.authService.signupService(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('Signup controller error:', errMsg);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: errMsg,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    logger.info('Login', { query: req.query, body: req.body, params: req.params });
    try {
      await this.authService.loginService(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('Login controller error:', errMsg);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: errMsg,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    logger.info('Verify OTP', { query: req.query, body: req.body, params: req.params });
    try {
      await this.authService.verifyOtpService(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('Verify OTP controller error:', errMsg);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: errMsg,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
