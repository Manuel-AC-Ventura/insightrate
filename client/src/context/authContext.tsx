import type { User } from "../types/user.types";
import { login as loginRequest } from "../api/auth";
import { useState, useEffect, createContext } from "react";

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUser && storedToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });

    if (res.status !== 200) {
      throw new Error("Login failed");
    }

    const { user, token, refreshToken }: AuthResponse = res.data;

    setUser(user);
    setToken(token);
    setRefreshToken(refreshToken);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    // TODO: implementar logout real (API + limpeza de tokens)
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.clear();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
