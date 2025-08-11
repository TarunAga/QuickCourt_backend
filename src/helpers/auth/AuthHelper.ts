import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../config/index';
import { AuthUserDto } from '../../interfaces/UserDto';

export class AuthHelper {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(user: AuthUserDto): string {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: '24h', // Default to 24 hours
    });
  }

  static verifyToken(token: string): AuthUserDto {
    return jwt.verify(token, config.jwt.secret) as AuthUserDto;
  }

  static generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, config.jwt.secret + '_refresh', { expiresIn: '7d' });
  }

  static generateOtp(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
}
