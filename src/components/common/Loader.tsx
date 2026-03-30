import React from 'react';
import { View, ActivityIndicator, Modal, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface LoaderProps {
  visible?: boolean;
  message?: string;
  fullScreen?: boolean;
}

const Loader = ({ visible = true, message, fullScreen = false }: LoaderProps) => {
  const { isDarkMode } = useTheme();

  const content = (
    <View className={`flex-1 items-center justify-center ${fullScreen ? (isDarkMode ? 'bg-black/70' : 'bg-white/70') : ''}`}>
      <View className={`p-6 rounded-2xl ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-xl items-center`}>
        <ActivityIndicator size="large" color="#D81B8C" />
        {message && (
          <Text className={`mt-4 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {message}
          </Text>
        )}
      </View>
    </View>
  );

  if (fullScreen) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        {content}
      </Modal>
    );
  }

  return visible ? content : null;
};

export default Loader;
