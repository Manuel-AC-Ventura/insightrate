import { FastifyRequest, FastifyReply } from 'fastify';
import { SuggestionService } from '../services/suggestion.service';
import { suggestionSchema } from '../validators/suggestion.validator';
import { TokenService } from '../services/token.service'; // #file:token.service.ts

export class SuggestionController {
  private suggestionService: SuggestionService;
  private tokenService: TokenService;

  constructor() {
    this.suggestionService = new SuggestionService();
    this.tokenService = new TokenService();
  }

  async creareSuggestion(req: FastifyRequest, res: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).send({ error: 'Missing authorization header' });
      }
      const token = authHeader.replace('Bearer ', '');
      const user = this.tokenService.verifyToken(token);

      const suggestion = suggestionSchema.parse(req.body);
      const createdSuggestion = await this.suggestionService.createSuggestion({
        ...suggestion,
        authorId: user.id ?? (() => { throw new Error('User ID is missing'); })(),
      });
      res.status(201).send(createdSuggestion);
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: 'Invalid data' });
    }
  }

  async getSuggestions(req: FastifyRequest, res: FastifyReply) {
    try {
      const suggestions = await this.suggestionService.getAllSuggestions();
      res.status(200).send(suggestions);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async updateSuggestion(req: FastifyRequest, res: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];
      if(!authHeader) return res.status(401).send({ error: 'Missing authorization header' });

      const token = authHeader.replace('Bearer ', '');
      const user = this.tokenService.verifyToken(token);
      const { id: suggestionId } = req.params as { id: string };
      const suggestion = suggestionSchema.parse(req.body);
      if (!user.id) throw new Error('User ID is missing');
      const updatedSuggestion = await this.suggestionService.updateSuggestion(suggestionId, {
        ...suggestion,
        authorId: user.id,
      });
      res.status(200).send(updatedSuggestion);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  async deleteSuggestion(req: FastifyRequest, res: FastifyReply) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).send({ error: 'Missing authorization header' });
      }
      const token = authHeader.replace('Bearer ', '');
      const user = this.tokenService.verifyToken(token);

      const { id: suggestionId } = req.params as { id: string };
      if (!user.id) throw new Error('User ID is missing'); 

      await this.suggestionService.deleteSuggestion(suggestionId, user.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}