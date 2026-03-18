import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

import { ChevronLeft, Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../../constants/Config';

const ResetPassword = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  const resetToken = params.resetToken as string;

  const { isDarkMode } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const inputBgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]';
  const iconColor = isDarkMode ? '#626262' : 'black';

  const handleFinish = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!email || !resetToken) {
      Alert.alert('Error', 'Missing reset credentials. Please try the process again.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetToken, newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      Alert.alert('Success', 'Your password has been reset successfully.', [
        { text: 'OK', onPress: () => router.replace('/screens/Login') }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to reset password');
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
    onPress={() => router.replace('/screens/Login')}
    className="w-10 h-10 items-center justify-center"
  >
    <ChevronLeft color={iconColor} size={28} />
  </TouchableOpacity>

  <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-10">
    Reset Password
  </Text>

</View>

{/* Subtitle */}
<Text className={`text-lg font-semibold text-center mt-8 ${textColor} px-10 leading-6`}>
  Create a New{"\n"}Password
</Text>
        {/* Form Fields */}
        <View className="mt-10">
          {/* New Password Input */}
          <Text
            className={`text-xl font-bold mb-4 ${textColor}`}
            style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          >
            Password :
          </Text>
          <View className={`flex-row items-center ${inputBgColor} rounded-2xl px-5 py-5 mb-6`}>
            <Lock color={isDarkMode ? "#FFFFFF" : "#626262"} size={24} strokeWidth={2.5} />
            <TextInput
              placeholder="Enter your Password"
              className={`flex-1 ml-4 text-base ${isDarkMode ? 'text-[#A0A0A0]' : 'text-black'}`}
              placeholderTextColor={isDarkMode ? "#A0A0A0" : "#626262"}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <Eye color={isDarkMode ? "#FFFFFF" : "black"} size={24} />
              ) : (
                <EyeOff color={isDarkMode ? "#FFFFFF" : "black"} size={24} />
              )}
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <Text
            className={`text-xl font-bold mb-4 ${textColor}`}
            style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          >
            Confirm Password :
          </Text>
          <View className={`flex-row items-center ${inputBgColor} rounded-2xl px-5 py-5`}>
            <Lock color={isDarkMode ? "#FFFFFF" : "#626262"} size={24} strokeWidth={2.5} />
            <TextInput
              placeholder="Re-Enter your Password"
              className={`flex-1 ml-4 text-base ${isDarkMode ? 'text-[#A0A0A0]' : 'text-black'}`}
              placeholderTextColor={isDarkMode ? "#A0A0A0" : "#626262"}
              secureTextEntry={!confirmVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
              {confirmVisible ? (
                <Eye color={isDarkMode ? "#FFFFFF" : "black"} size={24} />
              ) : (
                <EyeOff color={isDarkMode ? "#FFFFFF" : "black"} size={24} />
              )}
            </TouchableOpacity>
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
              <Text className="text-white text-xl font-bold">Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
