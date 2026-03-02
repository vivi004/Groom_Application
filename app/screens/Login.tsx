import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleFinish = () => {
    // Navigate to Lforgot password after 
    router.replace('/screens/ForgotPassword');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6"
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.replace('/screens/Page3')} className="mt-4 w-10 h-10 items-center justify-center">
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="items-center mt-2">
          <Text className="text-3xl font-bold text-[#D81B8C] mt-4">Login</Text>
          <Text className="text-lg font-semibold text-center mt-4 text-black px-10">
            Welcome back you've been missed!
          </Text>
        </View>

        {/* Input Fields */}
        <View className="mt-6">
          <Text className="text-lg font-bold mb-2">Email Id :</Text>
          <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4 mb-4">
            <Mail color="#626262" size={20} />
            <TextInput
              placeholder="Enter your Email"
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#626262"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text className="text-lg font-bold mb-2">Password :</Text>
          <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4">
            <Lock color="#626262" size={20} />
            <TextInput
              placeholder="Enter your Password"
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#626262"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <Eye color="black" size={20} /> : <EyeOff color="black" size={20} />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="items-end mt-3">
            <Text className="text-[#D81B8C] font-semibold" onPress={handleFinish}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#D81B8C] rounded-xl py-4 items-center mt-8 shadow-lg shadow-pink-300"
          activeOpacity={0.8}
          onPress={() => router.replace('/home_screens/Homepage')}
        >
          <Text className="text-white text-xl font-bold">Sign in</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View className="items-center mt-10">
          <Text className="text-[#D81B8C] font-semibold mb-6">Or continue with</Text>
          <View className="flex-row justify-center space-x-6">
            <SocialIcon name="facebook-official" color="#1877F2" />
            <TouchableOpacity className="bg-[#F1F4F9] p-3 rounded-xl border border-gray-100 mx-3 shadow-sm">
              <Image
                source={require('../../assets/images/google_logo.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <SocialIcon name="apple" color="#000000" />
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-auto pb-6">
          <Text className="text-gray-600">Don't Have a Account? </Text>
          <TouchableOpacity onPress={() => router.replace('/screens/SignUp')}>
            <Text className="text-[#D81B8C] font-bold">Signup</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Helper for Social Buttons
const SocialIcon = ({ name, color }: { name: any, color: string }) => (
  <TouchableOpacity className="bg-[#F1F4F9] p-3 rounded-xl border border-gray-100 mx-3 shadow-sm">
    <FontAwesome name={name} size={28} color={color} />
  </TouchableOpacity>
);

export default Login;