import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import FacebookIcon from "../../assets/icons/Facebook.svg";
import GoogleIcon from "../../assets/icons/Google.svg";
import AppleIcon from "../../assets/icons/Apple.svg";
import { AuthService } from '@/services/auth.service';
import { Alert, ActivityIndicator } from 'react-native';

const Login = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]';
  const iconColor = isDarkMode ? '#626262' : 'black'; // Subtle back button

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
            onPress={() => router.replace('/page3')}
            className="w-10 h-10 items-center justify-center"
          >
            <ChevronLeft color={iconColor} size={28} />
          </TouchableOpacity>

          <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-10">
            Login
          </Text>

        </View>

        {/* Subtitle */}
        <Text className={`text-xl font-bold text-center mt-8 ${textColor} px-4`}>
          Welcome back you&apos;ve been missed!
        </Text>

        {/* Input Fields */}
        <View className="mt-10">
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

          <Text
            className={`text-xl font-bold mb-4 ${textColor}`}
            style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          >
            Password :
          </Text>
          <View className={`flex-row items-center ${inputBgColor} rounded-2xl px-5 py-5`}>
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

          <TouchableOpacity
            className="items-end mt-4"
            onPress={() => router.push('/forgot-password')}
          >
            <Text className="text-[#D81B8C] font-semibold text-base">Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#D81B8C] rounded-xl py-5 items-center mt-12 shadow-lg shadow-pink-300"
          activeOpacity={0.8}
          onPress={async () => {
            if (!email || !password) {
              Alert.alert('Error', 'Please enter both email and password');
              return;
            }
            setLoading(true);
            try {
              await AuthService.login({ email, password });
              router.replace('/home');
            } catch (error: any) {
              let errorMessage = 'Invalid credentials';
              if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
                errorMessage = 'Network Error: Cannot connect to server. Please check if the backend is running.';
              } else if (error.response?.data) {
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                  errorMessage = error.response.data.errors[0].msg;
                } else {
                  errorMessage = error.response.data.message || error.response.data.error || errorMessage;
                }
              } else if (error.message) {
                errorMessage = error.message;
              }
              Alert.alert('Login Failed', errorMessage);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-xl font-bold">Sign in</Text>
          )}
        </TouchableOpacity>

        {/* Social Login */}
        <View className="items-center mt-12">
          <Text className="text-[#D81B8C] font-semibold mb-8 text-lg">Or continue with</Text>
          <View className="flex-row justify-center space-x-6">
            <TouchableOpacity className={`${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]'} p-4 rounded-xl mx-2 shadow-sm`}>
              <FacebookIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity className={`${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]'} p-4 rounded-xl mx-2 shadow-sm`}>
              <GoogleIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity className={`${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F1F4F9]'} p-4 rounded-xl mx-2 shadow-sm`}>
              <AppleIcon width={24} height={24} color={isDarkMode ? "white" : "black"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-auto pb-6">
          <Text className={subTextColor}>Don&apos;t Have a Account? </Text>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
            <Text className="text-[#D81B8C] font-bold">Signup</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;