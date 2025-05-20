import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

// Extend FastifyRequest to include 'user' property
declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}

export class UserMiddleware {
  async verifyToken(req: FastifyRequest, res: FastifyReply) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
      return true;
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }

  static async refreshToken(req: FastifyRequest, res: FastifyReply) {
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    if (!refreshToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
      req.user = decoded;
      return true;
    } catch (error) {
      return res.status(401).send({ message: 'Invalid refresh token' });
    }
  }
}