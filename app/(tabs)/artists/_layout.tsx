/// <reference types="nativewind/types" />
import { Stack } from 'expo-router';
import { View } from 'react-native';
import Navbar from '../../../src/components/common/Navbar';

export default function ArtistsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
