import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

interface GoogleLoginCredentials {
  email: string;
  firstName: string;
  lastName: string;
  providerId: string;
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  user: User;
}

export const authService = {
  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  async googleLogin(credentials: GoogleLoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/google', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
}; 