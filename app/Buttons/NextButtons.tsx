import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const NextButton = ({ percentage, onPress }: { percentage: number, onPress: () => void }) => {
    const size = 80;
    const strokeWidth = 4;
    const center = size / 2;
    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(percentage / 100, { duration: 500 });
    }, [percentage]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progress.value),
    }));

    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.8} 
            className="items-center justify-center"
        >
            {/* SVG Container with -90deg rotation to start progress at the top */}
            <View className="-rotate-90">
                <Svg width={size} height={size}>
                    {/* Background Progress Path */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#333333"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Active Animated Progress Path */}
                    <AnimatedCircle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="white"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </Svg>
            </View>

            {/* Center Button UI */}
            <View 
                className="absolute bg-white items-center justify-center shadow-lg"
                style={{ 
                    width: size - 24, 
                    height: size - 24, 
                    borderRadius: (size - 24) / 2 
                }}
            >
                <ChevronRight 
                    size={32} 
                    className="text-slate-900" 
                    strokeWidth={3} 
                />
            </View>
        </TouchableOpacity>
    );
};

export default NextButton;