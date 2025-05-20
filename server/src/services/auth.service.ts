import { TokenService } from "./token.service";
import { UserModel } from "../models/user.model";
import { AuthResponse, User } from "../types/user.types";

export class AuthService {
  private userModel: UserModel;
  private tokenService: TokenService;

  constructor() {
    this.userModel = new UserModel();
    this.tokenService = new TokenService();
  }

  async register(user: User): Promise<AuthResponse> {
    if (!user.email) throw new Error("Email is required");

    const existingUser = await this.userModel.findByEmail(user.email);
    if (existingUser) throw new Error("User already exists");

    const createdUser = await this.userModel.create(user);
    const { password, ...safeUser } = createdUser;

    const token = this.tokenService.generateToken({ id: createdUser.id, email: createdUser.email });
    const refreshToken = this.tokenService.generateRefreshToken({ id: createdUser.id, email: createdUser.email });

    return {
      user: safeUser,
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userModel.findByEmail(email);
    if (!user) throw new Error("User not found");
    if (!user.password) throw new Error("Password is required");

    const isPasswordValid = await this.userModel.comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const { password: _, ...safeUser } = user;

    const token = this.tokenService.generateToken({ id: user.id, email: user.email });
    const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, email: user.email });

    return {
      user: safeUser,
      token,
      refreshToken,
    };
  }

}