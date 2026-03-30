import { Tabs, Redirect } from 'expo-router';
import Navbar from '@/components/common/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function TabLayout() {
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isLoading) {
    return null; // Optional: Render a loading splash screen here
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      tabBar={() => <Navbar />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' }
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="favourites" />
      <Tabs.Screen name="appointments" />
      <Tabs.Screen name="artists" />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
