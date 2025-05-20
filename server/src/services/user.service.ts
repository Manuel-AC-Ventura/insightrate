import { UserModel } from "../models/user.model";
import { TokenService } from "./token.service";

export class UserService {
  private userModel: UserModel;
  private tokenService: TokenService;

  constructor() {
    this.userModel = new UserModel();
    this.tokenService = new TokenService();
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findById(id);
    if (!user) throw new Error("User not found");
    await this.userModel.delete(id);
  }
}