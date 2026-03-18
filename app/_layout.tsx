import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { ThemeProvider } from '../context/ThemeContext';
import { FavoritesProvider } from '../context/FavouritesContext';
import React, { useMemo } from 'react';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}