import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const Otp = () => {
    const [timer, setTimer] = useState(25);
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Create an array of refs for the 5 input boxes
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimer(25);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            value = value[value.length - 1]; // Only take the last character if multiple are entered
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatic focus logic: Move to next box if value is entered
        if (value.length !== 0 && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Backspace logic: Move to previous box if current box is empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            startTimer();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join('');
        if (otpString.length === 5) {
            console.log("Verifying OTP:", otpString);
            // Add verification logic here
            // For now, let's just go back to login or a success screen
            router.replace('/screens/Login');
        } else {
            // Show error or shake effect
            console.log("Please enter full OTP");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 px-6"
            >
                <TouchableOpacity onPress={() => router.replace('/screens/ForgotPassword')} className="mt-4 w-10 h-10 items-center justify-center">
                    <ChevronLeft color="black" size={28} />
                </TouchableOpacity>

                <View className="items-center mt-6">
                    <Text className="text-3xl font-bold text-[#D81B8C]">Verification OTP</Text>
                    <Text className="text-lg font-semibold text-center mt-8 text-black px-10 leading-6">
                        Otp Shared to Register{"\n"}E-mail Id
                    </Text>
                </View>

                {/* OTP Inputs with Auto-Focus */}
                <View className="flex-row justify-between mt-12 px-2">
                    {otp.map((digit, index) => (
                        <View key={index} className="w-14 h-14 bg-[#F1F4F9] rounded-xl items-center justify-center border border-transparent focus-within:border-[#D81B8C]">
                            <TextInput
                                ref={(ref) => { inputRefs.current[index] = ref; }}
                                value={digit}
                                onChangeText={(value) => handleOtpChange(value, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                maxLength={1}
                                keyboardType="number-pad"
                                className="text-xl font-bold text-black text-center w-full h-full"
                                selectTextOnFocus
                            />
                        </View>
                    ))}
                </View>

                {/* Resend OTP Section with Dynamic UI */}
                <View className="items-center mt-10">
                    <TouchableOpacity
                        onPress={handleResend}
                        disabled={timer > 0}
                    >
                        <Text
                            className="text-base font-medium"
                            style={{ color: timer === 0 ? '#D81B8C' : '#626262' }}
                        >
                            Resend OTP {timer > 0 && (
                                <Text className="text-[#D81B8C]">
                                    : 0.{timer < 10 ? `0${timer}` : timer}s
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-auto pb-10">
                    <TouchableOpacity
                        className="bg-[#D81B8C] rounded-xl py-4 items-center shadow-lg shadow-pink-300"
                        activeOpacity={0.8}
                        onPress={() => router.replace('/screens/ResetPassword')}
                    >
                        <Text className="text-white text-xl font-bold" >Verify</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Otp;