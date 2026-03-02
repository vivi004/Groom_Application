import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import NextButton from '../Buttons/NextButtons';
import PaginationDots from '../components/PaginationDots';
import { router } from 'expo-router';

export default function Page2() {
  return (
    <ImageBackground
      source={require('../../assets/images/page2.png')}
      className="flex-1 justify-end"
    >
      <View className="px-8 pb-16">
        <View className="items-center mb-10">
          <Text className="text-white text-3xl font-bold text-center mb-4 leading-tight">
            Try Bridal & Groom{"\n"}Looks Virtually
          </Text>
          <Text className="text-white text-center text-1lg px-4">
            See how you'll look with makeup trials before booking.
          </Text>
        </View>

        <View className="flex-row items-center justify-between w-full px-2">
          <PaginationDots activeIndex={1} />
          <NextButton percentage={66.6} onPress={() => router.push('/screens/Page3')} />
        </View>
      </View>
    </ImageBackground>
  );
}