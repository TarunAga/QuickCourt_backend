import { Request, Response } from 'express';
import { AppDataSource } from '../../datasource';
import { User } from '../entities/User';
import { AuthHelper } from '../helpers/auth/AuthHelper';
import { CreateUserDto } from '../interfaces/UserDto';
import { sendOtpEmail } from '../helpers/utils';
import crypto from 'crypto';

// In-memory OTP store (for demo; use DB/Redis in production)
const otpStore: Record<string, { otp: string; expires: number }> = {};

export const register = async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const { email, password, firstName, lastName } = req.body as CreateUserDto;
  try {
    let user = await userRepo.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'Email already registered' });
    const hashedPassword = await AuthHelper.hashPassword(password);
    user = userRepo.create({ email, password: hashedPassword, firstName, lastName });
    await userRepo.save(user);
    // Generate OTP
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOtpEmail(email, otp);
    return res.status(201).json({ message: 'User registered. Please verify OTP sent to your email.' });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: 'Registration failed', error: errorMsg });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const record = otpStore[email];
    if (!record || record.otp !== otp || record.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    user.isActive = true;
    await userRepo.save(user);
    delete otpStore[email];
    return res.json({ message: 'Email verified successfully' });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: 'OTP verification failed', error: errorMsg });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOtpEmail(email, otp);
    return res.json({ message: 'OTP resent to your email' });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: 'Failed to resend OTP', error: errorMsg });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isActive) return res.status(403).json({ message: 'Please verify your email before logging in.' });
    const valid = await AuthHelper.comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = AuthHelper.generateToken(user);
    return res.json({ token });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: 'Login failed', error: errorMsg });
  }
};
