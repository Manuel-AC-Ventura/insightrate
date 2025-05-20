import { FastifyInstance } from "fastify";
import { BoardController } from "../controllers/board.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class BoardRoute {
  private app: FastifyInstance;
  private boardController: BoardController;
  private authMiddleware: AuthMiddleware;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.boardController = new BoardController();
    this.authMiddleware = new AuthMiddleware();
  }

  public routes() {
    this.app.post('/board/create', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.boardController.createBoard.bind(this.boardController)
    });

    this.app.get('/board/:slug', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.boardController.getBoardBySlug.bind(this.boardController)
    });
    
    this.app.delete('/board/delete/:identifier', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.boardController.deleteBoard.bind(this.boardController)
    });
  }
}