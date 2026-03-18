import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, NativeSyntheticEvent, Platform, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../../constants/Config';

const Otp = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const email = params.email as string;
    
    const { isDarkMode } = useTheme();
    const [timer, setTimer] = useState(25);
    const [loading, setLoading] = useState(false);

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const inputBgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]';
    const iconColor = isDarkMode ? '#626262' : 'black';

    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Changed to 6 digits
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Create an array of refs for the 6 input boxes
    const inputRefs = useRef<(TextInput | null)[]>([]);

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
        if (!email) {
            Alert.alert('Error', 'Email is missing. Please restart the process.');
            router.replace('/screens/ForgotPassword');
        }
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [email, router]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            value = value[value.length - 1]; // Only take the last character if multiple are entered
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatic focus logic: Move to next box if value is entered
        if (value.length !== 0 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Backspace logic: Move to previous box if current box is empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = async () => {
        if (timer === 0) {
            try {
                const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                
                if (response.ok) {
                    Alert.alert('Success', 'A new OTP has been sent to your email.');
                    startTimer();
                } else {
                    const data = await response.json();
                    Alert.alert('Error', data.message || 'Failed to resend OTP');
                }
            } catch (error: any) {
                Alert.alert('Error', error.message || 'Failed to resend OTP');
            }
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length === 6) {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp: otpString }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Invalid OTP');
                }

                // Success, move to Reset Password screen with reset token
                router.replace({
                    pathname: '/screens/ResetPassword',
                    params: { email, resetToken: data.resetToken }
                });
            } catch (error: any) {
                Alert.alert('Verification Failed', error.message || 'The OTP entered is incorrect or expired.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Incomplete OTP', 'Please enter the full 6-digit OTP.');
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 px-6"
            >
                {/* Header Row */}
<View className="flex-row items-center mt-4">

  <TouchableOpacity
    onPress={() => router.replace('/screens/ForgotPassword')}
    className="w-10 h-10 items-center justify-center"
  >
    <ChevronLeft color={iconColor} size={28} />
  </TouchableOpacity>

  <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-10">
    Verification OTP
  </Text>

</View>

{/* Subtitle */}
<Text className={`text-xl font-bold text-center mt-8 ${textColor} px-4 leading-7`}>
  OTP Shared to Registered{"\n"}E-mail Id: {email}
</Text>

                {/* OTP Inputs with Auto-Focus */}
                <View className="flex-row justify-between mt-12 px-1">
                    {otp.map((digit, index) => (
                        <View key={index} className={`w-12 h-14 ${inputBgColor} rounded-xl items-center justify-center`}>
                            <TextInput
                                ref={(ref) => { inputRefs.current[index] = ref; }}
                                value={digit}
                                onChangeText={(value) => handleOtpChange(value, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                maxLength={1}
                                keyboardType="number-pad"
                                className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} text-center w-full h-full`}
                                selectTextOnFocus
                                placeholderTextColor={isDarkMode ? "#A0A0A0" : "#626262"}
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
                        className="bg-[#D81B8C] rounded-xl py-5 items-center shadow-lg shadow-pink-300"
                        activeOpacity={0.8}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-xl font-bold" >Verify</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Otp;