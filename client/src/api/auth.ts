import axios from 'axios';
import type { AuthResponse } from '../types/auth.types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', { email, password });
  return response.data;
};

export const registerRequest = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', data);
  return response.data;
};


export const refreshTokenRequest = async (refreshToken: string) => {
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Erro ao renovar token');
  }

  return response.json();
};