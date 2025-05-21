import type { User } from './user.types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}