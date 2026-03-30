import { create } from 'zustand';
import { Storage } from '@/utils/storage';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (user, token) => {
    await Storage.setToken(token);
    set({ user, isAuthenticated: true });
  },
  logout: async () => {
    await Storage.removeToken();
    set({ user: null, isAuthenticated: false });
  },
  checkSession: async () => {
    try {
      const token = await Storage.getToken();
      if (token) {
        set({ isAuthenticated: true, isLoading: false });
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    } catch (e) {
      set({ isAuthenticated: false, isLoading: false });
    }
  }
}));
