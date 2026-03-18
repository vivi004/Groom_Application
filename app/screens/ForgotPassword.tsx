import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { API_URL } from '../../constants/Config';

const ForgotPassword = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const inputBgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]';
  const iconColor = isDarkMode ? '#626262' : 'black';

  const handleFinish = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success, move to OTP screen with email param
      router.push({
        pathname: '/screens/Otp',
        params: { email }
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
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
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <ChevronLeft color={iconColor} size={28} />
          </TouchableOpacity>

          <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-10">
            Forgot Password
          </Text>

        </View>

        {/* Subtitle */}
        <Text className={`text-xl font-bold text-center mt-8 ${textColor} px-4 leading-7`}>
          Enter Registered E-Mail Id to{"\n"}Recover Password
        </Text>
        {/* Form Section */}
        <View className="mt-12">
          <Text
            className={`text-xl font-bold mb-4 ${textColor}`}
            style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          >
            Email Id :
          </Text>
          <View className={`flex-row items-center ${inputBgColor} rounded-2xl px-5 py-5`}>
            <Mail color={isDarkMode ? "#FFFFFF" : "#626262"} size={24} strokeWidth={2.5} />
            <TextInput
              placeholder="Enter your Email"
              className={`flex-1 ml-4 text-base ${isDarkMode ? 'text-[#A0A0A0]' : 'text-black'}`}
              placeholderTextColor={isDarkMode ? "#A0A0A0" : "#626262"}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-auto pb-10">
          <TouchableOpacity
            className="bg-[#D81B8C] rounded-xl py-5 items-center shadow-lg shadow-pink-300"
            activeOpacity={0.8}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl font-bold">Send OTP</Text>
            )}
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;