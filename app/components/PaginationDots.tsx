import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

interface PaginationProps {
  activeIndex: number;
  variant?: 'default' | 'home';
}

const AnimatedDot = ({ index, activeIndex, variant }: { index: number, activeIndex: number, variant: string }) => {
  const { isDarkMode } = useTheme();
  const isActive = index === activeIndex;

  const animatedStyle = useAnimatedStyle(() => {
    // Default Colors
    let activeColor = '#FFFFFF';
    let inactiveColor = '#626262';

    // Home Colors
    if (variant === 'home') {
      activeColor = '#D81B8C';
      inactiveColor = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#58393980';
    }

    return {
      // Shared Size logic for both variants
      width: withTiming(isActive ? 22 : 10, { duration: 300 }),
      backgroundColor: withTiming(isActive ? activeColor : inactiveColor, { duration: 300 }),
    };
  });

  return (
    <Animated.View
      style={[
        // Shared Shape logic (Height, Radius, and Rotation for BOTH)
        {
          height: 4.5,
          borderRadius: 10,
          transform: [{ rotate: '-50deg' }] // Applied to Home and Default now
        },
        animatedStyle
      ]}
    />
  );
};

const PaginationDots = ({ activeIndex, variant = 'default' }: PaginationProps) => {
  return (
    <View className="flex-row items-center space-x-2">
      {[0, 1, 2].map((index) => (
        <AnimatedDot
          key={index}
          index={index}
          activeIndex={activeIndex}
          variant={variant}
        />
      ))}
    </View>
  );
};

export default PaginationDots;