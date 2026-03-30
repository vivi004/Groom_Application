import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import NextButton from '@/components/common/NextButtons';
import PaginationDots from '@/components/common/PaginationDots';
import { router } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Page3() {
  const handleFinish = () => {
    // Navigate to Login after reaching 100%
    router.replace('/login');
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      // Swipe left
      if (e.translationX < -50 || e.velocityX < -500) {
        handleFinish();
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
            source={require('../assets/images/page3.png')}
            className="flex-1 justify-end"
          >
            <View className="px-8 pb-16">
              <View className="items-center mb-10">
                <Text className="text-white text-3xl font-bold text-center mb-4 leading-tight">
                  Book Appointments{"\n"}Seamlessly
                </Text>
                <Text className="text-white text-center text-1lg px-4">
                  Secure your favorite artist for your big day.
                </Text>
              </View>

              <View className="flex-row items-center justify-between w-full px-2">
                <PaginationDots activeIndex={2} />
                <NextButton percentage={100} onPress={handleFinish} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
