import type { User } from "../types/user.types";
import { login as loginRequest } from "../api/auth";
import { useState, useEffect, createContext, useContext } from "react";


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

  // Carrega user/token do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginRequest({ email, password });
    const data: AuthResponse = response.data;

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    // opcional: redirecionar para login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};