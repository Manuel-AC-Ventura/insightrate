import { ZodError } from "zod";
import { UserService } from "../services/user.service";
import { FastifyRequest, FastifyReply } from 'fastify';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async delete(req: FastifyRequest, res: FastifyReply): Promise<void> {
    
  }
}