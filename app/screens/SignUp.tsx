import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { API_URL } from '../../constants/Config';
import { Alert, ActivityIndicator } from 'react-native';

const SignUp = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]';
  const iconColor = isDarkMode ? '#626262' : 'black';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully! Please log in.', [
          { text: 'OK', onPress: () => router.replace('/screens/Login') }
        ]);
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Signup Network Error:', error);
      Alert.alert('Error', 'Network request failed. Please check your connection.');
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Row */}
          <View className="flex-row items-center mt-4">

            <TouchableOpacity
              onPress={() => router.replace('/screens/Login')}
              className="w-10 h-10 items-center justify-center"
            >
              <ChevronLeft color={iconColor} size={28} />
            </TouchableOpacity>

            <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-10">
              Sign Up
            </Text>

          </View>

          {/* Subtitle */}
          <Text className={`text-lg font-semibold text-center mt-8 ${textColor}`}>
            Create a Profile
          </Text>

          {/* Registration Form */}
          <View className="mt-10">
            {/* Email Field */}
            <Text
              className={`text-xl font-bold mb-4 ${textColor}`}
              style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
            >
              Email Id :
            </Text>
            <View className={`flex-row items-center ${inputBgColor} rounded-2xl px-5 py-5 mb-6`}>
              <Mail color={isDarkMode ? "#FFFFFF" : "#626262"} size={24} strokeWidth={2.5} />
              <TextInput
                placeholder="Enter your Email"
                className={`flex-1 ml-4 text-base ${isDarkMode ? 'text-[#A0A0A0]' : 'text-black'}`}
                placeholderTextColor={isDarkMode ? "#A0A0A0" : "#626262"}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <Text
              className={`text-xl font-bold mb-4 ${textColor}`}
              style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
            >
              Confrim Password :
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

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-[#D81B8C] rounded-xl py-5 items-center mt-12 shadow-lg shadow-pink-300"
            activeOpacity={0.8}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl font-bold">Sign up</Text>
            )}
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View className="flex-row justify-center mt-10 mb-10">
            <Text className={subTextColor}>Already Have a Account? </Text>
            <TouchableOpacity onPress={() => router.replace('/screens/Login')}>
              <Text className="text-[#D81B8C] font-bold">Signin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;