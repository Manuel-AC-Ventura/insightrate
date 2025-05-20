import { FastifyInstance } from "fastify";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { VoteController } from "../controllers/vote.controller";

export class VoteRoute {
  private app: FastifyInstance;
  private voteController: VoteController;
  private authMiddleware: AuthMiddleware;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.voteController = new VoteController();
    this.authMiddleware = new AuthMiddleware();
  }

  public routes() {
    this.app.post('/vote/create', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware.authenticate),
      handler: this.voteController.createVote.bind(this.voteController)
    })
  }
}