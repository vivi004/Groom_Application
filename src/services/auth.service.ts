import { AuthApi } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export const AuthService = {
  login: async (credentials: any) => {
    try {
      const { data } = await AuthApi.login(credentials);
      // Assuming backend returns token and user payload dynamically
      await useAuthStore.getState().login(data.user || { id: 'temp', email: credentials.email }, data.token || 'dummy_token');
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  signup: async (userData: any) => {
    try {
      const { data } = await AuthApi.signup(userData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  forgotPassword: async (email: string) => {
    const { data } = await AuthApi.forgotPassword({ email });
    return data;
  },
  
  verifyOtp: async (email: string, otp: string) => {
    const { data } = await AuthApi.verifyOtp({ email, otp });
    return data;
  },
  
  resetPassword: async (payload: any) => {
    const { data } = await AuthApi.resetPassword(payload);
    return data;
  },

  logout: async () => {
    await useAuthStore.getState().logout();
  }
};
