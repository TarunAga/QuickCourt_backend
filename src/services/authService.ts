import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { AuthHelper } from '../helpers/auth/AuthHelper';
import logger from '../helpers/utils/logger';

export class AuthService {
  async signupService(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, avatar, role } = req.body;
      const userRepo = getRepository(User);
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(409)
          .json({
            success: false,
            message: 'Email already registered',
            timestamp: new Date().toISOString(),
          });
      }
      const hashedPassword = await AuthHelper.hashPassword(password);
      const otp = AuthHelper.generateOtp();
      const user = userRepo.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        avatar,
        role,
        isActive: false,
        otp,
      });
      await userRepo.save(user);
      // TODO: Send OTP via email
      logger.info(`OTP for ${email}: ${otp}`);
      return res
        .status(201)
        .json({
          success: true,
          message: 'Signup successful. Please verify OTP sent to your email.',
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('Signup error:', errMsg);
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal server error',
          error: errMsg,
          timestamp: new Date().toISOString(),
        });
    }
  }

  async loginService(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json({
            success: false,
            message: 'Invalid credentials',
            timestamp: new Date().toISOString(),
          });
      }
      const isMatch = await AuthHelper.comparePassword(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({
            success: false,
            message: 'Invalid credentials',
            timestamp: new Date().toISOString(),
          });
      }
      if (!user.isActive) {
        return res
          .status(403)
          .json({
            success: false,
            message: 'Account not verified',
            timestamp: new Date().toISOString(),
          });
      }
      const token = AuthHelper.generateToken(user);
      return res
        .status(200)
        .json({
          success: true,
          message: 'Login successful',
          token,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('Login error:', errMsg);
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal server error',
          error: errMsg,
          timestamp: new Date().toISOString(),
        });
    }
  }

  async verifyOtpService(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email } });
      if (!user || user.otp !== otp) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid OTP', timestamp: new Date().toISOString() });
      }
      user.isActive = true;
      user.otp = '';
      await userRepo.save(user);
      return res
        .status(200)
        .json({
          success: true,
          message: 'Account verified successfully',
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error('OTP verification error:', errMsg);
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal server error',
          error: errMsg,
          timestamp: new Date().toISOString(),
        });
    }
  }
}
