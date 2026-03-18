import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Camera from '../../assets/icons/camera.svg';
import Star from '../../assets/icons/star.svg';

const Try = () => {
  const { isDarkMode } = useTheme();
  const handleMakeupPress = () => router.replace('/try_pages/Makeup');

  return (
    <View className="flex-row items-center px-4 mt-8 gap-x-4">
      <TouchableOpacity 
        className="flex-1 flex-row items-center justify-center border-[3px] border-[#D81B8C] rounded-full py-2.5 bg-white dark:bg-black shadow-sm"
        onPress={handleMakeupPress}
      >
        <Camera color="#D81B8C" strokeWidth={2.5} />
        <View className="ml-2 items-start">
          <Text className="font-bold text-[11px] leading-tight text-[#D81B8C] dark:text-white">Try Bridal</Text>
          <Text className="font-bold text-[11px] leading-tight text-[#D81B8C] dark:text-white">Makeup</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-1 flex-row items-center justify-center border-[3px] border-[#D81B8C] rounded-full py-2.5 bg-white dark:bg-black shadow-sm"
      >
        <Star color="#D81B8C" />
        <View className="ml-2 items-start">
          <Text className="font-bold text-[11px] leading-tight text-[#D81B8C] dark:text-white">Live</Text>
          <Text className="font-bold text-[11px] leading-tight text-[#D81B8C] dark:text-white">Grooming</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Try;