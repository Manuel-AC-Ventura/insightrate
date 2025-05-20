import { FastifyInstance } from "fastify";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { SuggestionController } from "../controllers/suggestion.controller";

export class SuggestionRoute {
  private app: FastifyInstance;
  private suggestionController: SuggestionController;
  private authMiddleware: AuthMiddleware;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.suggestionController = new SuggestionController();
    this.authMiddleware = new AuthMiddleware();
  }

  public routes() {
    this.app.post('/suggestion/create', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.suggestionController.creareSuggestion.bind(this.suggestionController)
    });

    this.app.get('/suggestion', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.suggestionController.getSuggestions.bind(this.suggestionController)
    });

    this.app.delete('/suggestion/:id', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.suggestionController.deleteSuggestion.bind(this.suggestionController)
    });
  }
}