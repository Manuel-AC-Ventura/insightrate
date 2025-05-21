import type { User } from '../types/user.types';
import type { AuthContextData } from '../types/auth.types';
import { createContext, useState, useEffect } from 'react';
import { loginRequest, registerRequest, refreshTokenRequest } from '../api/auth';

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth:user');
    const token = localStorage.getItem('auth:token');
    const refreshToken = localStorage.getItem('auth:refreshToken');

    if (storedUser && token && refreshToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token, refreshToken } = await loginRequest(email, password);
    localStorage.setItem('auth:user', JSON.stringify(user));
    localStorage.setItem('auth:token', token);
    localStorage.setItem('auth:refreshToken', refreshToken);
    setUser(user);
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const { user, token, refreshToken } = await registerRequest(data);
    localStorage.setItem('auth:user', JSON.stringify(user));
    localStorage.setItem('auth:token', token);
    localStorage.setItem('auth:refreshToken', refreshToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('auth:user');
    localStorage.removeItem('auth:token');
    localStorage.removeItem('auth:refreshToken');
    setUser(null);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('auth:refreshToken');
    if (!refreshToken) {
      logout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    try {
      const { token: newToken } = await refreshTokenRequest(refreshToken);
      localStorage.setItem('auth:token', newToken);
      return newToken;
    } catch {
      logout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let token = localStorage.getItem('auth:token');
    const refreshToken = localStorage.getItem('auth:refreshToken');

    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    let response = await fetch(url, authOptions);

    if (response.status === 401 && refreshToken) {
      try {
        token = await refreshAccessToken();

        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        };

        response = await fetch(url, retryOptions);
      } catch (error) {
        throw error;
      }
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user, fetchWithAuth, refreshAccessToken } as AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

