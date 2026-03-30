import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorView = ({ message = "Something went wrong. Please try again.", onRetry }: ErrorViewProps) => {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 items-center justify-center p-8">
      <AlertCircle size={48} color="#D81B8C" />
      <Text className={`mt-4 text-center text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Oops!
      </Text>
      <Text className={`mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity 
          onPress={onRetry}
          className="mt-8 flex-row items-center bg-[#D81B8C] px-6 py-3 rounded-xl"
        >
          <RefreshCw size={20} color="white" />
          <Text className="ml-2 text-white font-bold">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorView;
