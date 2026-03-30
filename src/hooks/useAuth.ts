import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'expo-router';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  const logout = async () => {
    await AuthService.logout();
    router.replace('/(auth)/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
};
