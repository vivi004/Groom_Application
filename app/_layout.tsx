import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavouritesContext';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

function RootLayoutContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <RootLayoutContent />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}