import "../global.css";
import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritesProvider } from './home_screens/FavouritesContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}