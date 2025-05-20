export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
  refreshToken: string;
}