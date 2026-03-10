import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Opening = () => {
    // Animation value for the fade-in effect
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500, // 1.5 seconds to fade in
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center">

                <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                    {/* Logo Section */}
                    <Image
                        source={require('../../assets/images/main_logolight.png')}
                        style={{ width: 180, height: 180 }}
                        resizeMode="contain"
                    />

                </Animated.View>

            </View>
        </SafeAreaView>
    );
};

export default Opening;