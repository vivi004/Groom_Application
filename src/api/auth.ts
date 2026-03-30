import { apiClient } from './client';

export const AuthApi = {
  login: (data: any) => apiClient.post('/api/auth/login', data),
  signup: (data: any) => apiClient.post('/api/auth/signup', data),
  forgotPassword: (data: any) => apiClient.post('/api/auth/forgot-password', data),
  verifyOtp: (data: any) => apiClient.post('/api/auth/verify-otp', data),
  resetPassword: (data: any) => apiClient.post('/api/auth/reset-password', data),
};
