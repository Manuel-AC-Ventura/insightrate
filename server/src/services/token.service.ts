import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';

export class TokenService {
  private secret: jwt.Secret;
  private expiresIn: string | number;
  private refreshSecret: jwt.Secret;
  private refreshExpiresIn: string | number;

  constructor() {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) throw new Error('Missing JWT secrets in environment variables');

    this.secret = process.env.JWT_SECRET!;
    this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET!;
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  generateToken(payload: Partial<User>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  generateRefreshToken(payload: Partial<User>): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
  }

  verifyToken(token: string): Partial<User> {
    return jwt.verify(token, this.secret) as Partial<User>;
  }

  verifyRefreshToken(token: string): { id: string; email: string } {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { id: string; email: string };
  }

  decodeToken(token: string): Partial<User> {
    return jwt.decode(token) as Partial<User>;
  }

  decodeRefreshToken(token: string): Partial<User> {
    return jwt.decode(token) as Partial<User>;
  }


}
