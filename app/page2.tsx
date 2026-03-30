import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import NextButton from '@/components/common/NextButtons';
import PaginationDots from '@/components/common/PaginationDots';
import { router } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Page2() {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      // Swipe left
      if (e.translationX < -50 || e.velocityX < -500) {
        router.push('/page3');
      }
      // Swipe right
      else if (e.translationX > 50 || e.velocityX > 500) {
        router.back();
      }
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <View collapsable={false} className="flex-1">
          <ImageBackground
            source={require('../assets/images/page2.png')}
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
                <NextButton percentage={66.6} onPress={() => router.push('/page3')} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}