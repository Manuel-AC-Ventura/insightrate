import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { generateSlug } from '../utils/generateSlug';
import { BoardService } from '../services/board.service';
import { BoardSchema } from '../validators/board.validator';
import { TokenService } from '../services/token.service';

export class BoardController {
  private boardService: BoardService;
  private tokenService: TokenService;

  constructor() {
    this.boardService = new BoardService();
    this.tokenService = new TokenService();
  }

  async createBoard(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader) {
        return res.status(401).send({ message: 'Unauthorized - No token found' });
      }

      const token = authorizationHeader.split(' ')[1];
      let userId: string;

      try {
        const decoded = this.tokenService.verifyToken(token);
        userId = decoded.id as string;
      } catch (error) {
        return res.status(401).send({ message: 'Unauthorized - Invalid or expired token' });
      }

      const body = BoardSchema.omit({ ownerId: true }).parse(req.body);
      const slug = body.slug || generateSlug(body.name);

      const board = await this.boardService.createBoard({
        ...body,
        slug,
        ownerId: userId,
      });

      return res.status(201).send(board);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: 'Validation error', errors: error.errors });
      }

      console.error('Error creating board:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getBoardBySlug(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { slug } = req.params as { slug: string };
      const board = await this.boardService.getBoardBySlug(slug);

      if (!board) {
        return res.status(404).send({ message: 'Board not found' });
      }

      return res.status(200).send(board);
    } catch (error) {
      console.error('Error fetching board:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getAllBoards(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader) {
        return res.status(401).send({ message: 'Unauthorized - No token found' });
      }

      const token = authorizationHeader.split(' ')[1];
      let userId: string;

      try {
        const decoded = this.tokenService.verifyToken(token);
        userId = decoded.id as string;
      } catch (error) {
        return res.status(401).send({ message: 'Unauthorized - Invalid or expired token' });
      }

      const boards = await this.boardService.getAllBoards(userId);
      return res.status(200).send(boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }

  async deleteBoard(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { identifier } = req.params as { identifier: string };

      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader) {
        return res.status(401).send({ message: 'Unauthorized - No token found' });
      }

      const token = authorizationHeader.split(' ')[1];
      let userId: string;

      try {
        const decoded = this.tokenService.verifyToken(token);
        userId = decoded.id as string;
      } catch (error) {
        return res.status(401).send({ message: 'Unauthorized - Invalid or expired token' });
      }

      if (!identifier) {
        return res.status(400).send({ message: 'Board identifier is required' });
      }

      const board = await this.boardService.deleteBoard(identifier, userId);

      if (!board) {
        return res.status(404).send({ message: 'Board not found' });
      }

      return res.status(200).send({ message: 'Board deleted successfully' });
    } catch (error) {
      console.error('Error deleting board:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }

}
