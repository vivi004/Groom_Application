import React from 'react';
import { View, Text } from 'react-native';
import { PackageOpen } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState = ({ 
  title = "No Data Found", 
  message = "Check back later or try a different search." 
}: EmptyStateProps) => {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 items-center justify-center p-8 opacity-60">
      <PackageOpen size={64} color={isDarkMode ? "#444" : "#CCC"} />
      <Text className={`mt-4 text-center text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {title}
      </Text>
      <Text className={`mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;
