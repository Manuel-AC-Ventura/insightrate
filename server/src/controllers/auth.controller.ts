import { ZodError } from "zod";
import { AuthResponse } from "../types/user.types";
import { AuthService } from "../services/auth.service";
import { FastifyRequest, FastifyReply } from 'fastify';
import { userSchema } from "../validators/user.validator";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: FastifyRequest, res: FastifyReply): Promise<AuthResponse> {
    try {
      const userData = userSchema.parse(req.body);
      const createdUser = await this.authService.register(userData);
      res.status(201).send(createdUser);
      return createdUser;
    } catch (error) {
      console.error('Error in register controller:', error);

      if (error.message === 'Email is required') {
        return res.status(400).send({ error: 'O email é obrigatório.' });
      }

      if (error.message === 'User already exists') {
        return res.status(409).send({ error: 'Usuário já existe.' });
      }

      if (error instanceof ZodError) {
        return res.status(422).send({ error: 'Erro de validação', issues: error.issues });
      }

      res.status(500).send({ error: 'Erro interno do servidor' });
      throw error;
    }
  }

  async login(req: FastifyRequest, res: FastifyReply): Promise<AuthResponse> {
    try {
      const { email, password } = req.body as { email: string; password: string };
      const user = await this.authService.login(email, password);
      res.status(200).send(user);
      return user;
    } catch (error) {
      console.error('Error in login controller:', error);

      if (error.message === 'User not found') {
        return res.status(404).send({ error: 'Usuário não encontrado.' });
      }

      if (error.message === 'Invalid password') {
        return res.status(401).send({ error: 'Senha inválida.' });
      }

      res.status(500).send({ error: 'Erro interno do servidor' });
      throw error;
    }
  }

  async refreshToken(req: FastifyRequest, res: FastifyReply): Promise<{ token: string }> {
    try {
      const { refreshToken } = req.body as { refreshToken: string };

      if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token é obrigatório.' });
      }

      const token = await this.authService.refreshAccessToken(refreshToken);
      res.status(200).send({ token });
      return { token };
    } catch (error) {
      console.error('Error in refreshToken controller:', error);

      if (error.message === 'Invalid or expired refresh token') {
        return res.status(401).send({ error: 'Refresh token inválido ou expirado.' });
      }

      res.status(500).send({ error: 'Erro interno do servidor' });
      throw error;
    }
  }
}
