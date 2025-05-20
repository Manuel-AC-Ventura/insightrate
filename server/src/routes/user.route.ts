import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoute {
  private app: FastifyInstance;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
  }

  public routes() {
   /* this.app.post('/user/delete', {
      preHandler: this.authMiddleware.authenticate.bind(this.authMiddleware),
      handler: this.userController.delete.bind(this.userController)
    });*/
  }
}