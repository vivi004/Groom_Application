import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import NextButton from '../Buttons/NextButtons';
import PaginationDots from '../components/PaginationDots';
import { router } from 'expo-router';

export default function Page1() {
  return (
    <ImageBackground
      source={require('../../assets/images/page1.png')}
      className="flex-1 justify-end"
    >
      <View className="px-8 pb-16">
        <View className="items-center mb-10">
          <Text className="text-white text-3xl font-bold text-center mb-4 leading-tight">
            Your Perfect Wedding{"\n"}Look Starts Here
          </Text>
          <Text className="text-white text-center text-1lg px-4">
            Discover top makeup artists and groom stylists near you.
          </Text>
        </View>

        <View className="flex-row items-center justify-between w-full px-2">
          <PaginationDots activeIndex={0} />
          <NextButton percentage={33.3} onPress={() => router.push('/screens/Page2')} />
        </View>
      </View>
    </ImageBackground>
  );
}