import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Opening from './screens/Opening';
import Page1 from './screens/Page1';

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Hold the splash screen for 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Show the Opening Splash Screen first
  if (isSplashVisible) {
    return <Opening />;
  }

  // 2. This is what shows AFTER the opening screen
  return (
    <Page1 />
  );
}