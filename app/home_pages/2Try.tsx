import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const Try = () => {
    const handleMakeupPress = () => router.replace('/try_pages/Makeup');
  
  return (
    <View className="flex-row justify-between px-4 mt-6">
      <TouchableOpacity className="flex-1 flex-row items-center 
      justify-center border-2 border-[#D81B8C] rounded-2xl py-3 mr-2"
      onPress={handleMakeupPress}>
        <Camera color="#D81B8C" size={24} />
        <Text className="ml-2 font-bold text-sm">Try Bridal Makeup</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 flex-row items-center justify-center border-2 border-[#D81B8C] rounded-2xl py-3 ml-2" >
        <Star color="#D81B8C" size={24} />
        <Text className="ml-2 font-bold text-sm">Live Grooming</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Try;