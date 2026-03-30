import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import NextButton from '@/components/common/NextButtons';
import PaginationDots from '@/components/common/PaginationDots';
import { router } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Page1() {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      // Swipe left
      if (e.translationX < -50 || e.velocityX < -500) {
        router.push('/page2');
      }
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <View collapsable={false} className="flex-1">
          <ImageBackground
            source={require('../assets/images/page1.png')}
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
                <NextButton percentage={33.3} onPress={() => router.push('/page2')} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}