import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';
import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenService } from '../services/token.service';

declare module 'fastify' {
  interface FastifyRequest {
    user?: Partial<User>;
  }
}

export class AuthMiddleware {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async authenticate(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const refreshToken = req.headers['x-refresh-token'] as string;

    try {
      const token = req.headers['authorization']?.split(' ')[1];

      if (!token) {
        res.status(401).send({ message: 'Unauthorized - No token provided' });
        return;
      }

      const decoded = await jwt.verify(token, process.env.JWT_SECRET as string) as Partial<User>;
      req.user = decoded;

    } catch (err: unknown) {
      if (err instanceof jwt.JsonWebTokenError) {
        if (err.name === 'TokenExpiredError') {
          if (!refreshToken) {
            res.status(401).send({ message: 'Unauthorized - No refresh token provided' });
            return;
          }

          try {
            const decodedRefresh = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as Partial<User>;
            const newAccessToken = this.tokenService.generateToken({ id: decodedRefresh.id, email: decodedRefresh.email });

            res.header('x-access-token', newAccessToken);
            req.user = decodedRefresh;

          } catch (refreshErr: unknown) {
            if (refreshErr instanceof jwt.JsonWebTokenError) {
              res.status(401).send({ message: 'Session expired, please log in again' });
            }
          }
        } else {
          res.status(401).send({ message: 'Unauthorized - No token provided' });
          return;
        }
      }
    }
  }
}
