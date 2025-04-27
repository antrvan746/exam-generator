import { create } from 'zustand';
import { authService } from '../services/authService';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  googleLogin: (email: string, firstName: string, lastName: string, providerId: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user, loading: false }),
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { user } = await authService.login({ email, password });
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  register: async (email, password, firstName, lastName) => {
    set({ loading: true });
    try {
      const { user } = await authService.register({ email, password, firstName, lastName });
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  googleLogin: async (email, firstName, lastName, providerId) => {
    set({ loading: true });
    try {
      const { user } = await authService.googleLogin({ email, firstName, lastName, providerId });
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
})); 