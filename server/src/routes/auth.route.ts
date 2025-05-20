import { FastifyInstance } from "fastify";
import { userSchema } from "../validators/user.validator";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoute {
  private app: FastifyInstance;
  private authController: AuthController;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.authController = new AuthController();
  }

  public routes() {
    this.app.post('/auth/register', {
      schema: {
        body: userSchema,
      }
    }, this.authController.register.bind(this.authController));

    this.app.post('/auth/login', {
      schema: {
        body: userSchema
      }
    }, this.authController.login.bind(this.authController));
  }
}
