import React from 'react';
import { Text, View, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const Packages = () => {
  const { isDarkMode } = useTheme();

  return (
    <View className="mx-4 mt-10 rounded-2xl p-8 items-center bg-[#FDF2F7] dark:bg-[#D81B8C] dark:shadow-lg">
      <Text 
        className="text-2xl font-bold mb-3 text-black dark:text-white"
        style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
      >
        Wedding Packages
      </Text>
      <Text className="text-center text-sm leading-6 text-gray-600 dark:text-white/90">
        Make your big day picture-perfect with customized bridal & groom styling packages.
      </Text>
    </View>
  );
};

export default Packages;