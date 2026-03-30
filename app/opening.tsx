import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

const Opening = () => {
    const { isDarkMode } = useTheme();
    // Animation value for the fade-in effect
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500, // 1.5 seconds to fade in
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
    const logoSource = isDarkMode 
        ? require('../assets/images/main_logodark.png') 
        : require('../assets/images/main_logolight.png');

    return (
        <SafeAreaView 
            style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}
        >
            <View className="flex-1 items-center justify-center">

                <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                    {/* Logo Section */}
                    <Image
                        source={logoSource}
                        style={{ width: 180, height: 180 }}
                        resizeMode="contain"
                    />

                </Animated.View>

            </View>
        </SafeAreaView>
    );
};

export default Opening;