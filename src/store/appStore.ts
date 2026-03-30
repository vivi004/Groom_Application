import { create } from 'zustand';

interface AppState {
  globalLoading: boolean;
  globalError: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  globalLoading: false,
  globalError: null,
  setLoading: (loading) => set({ globalLoading: loading }),
  setError: (error) => set({ globalError: error }),
}));
