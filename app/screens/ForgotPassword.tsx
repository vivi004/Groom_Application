import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const ForgotPassword = () => {
  const handleFinish = () => {
    router.replace('/screens/Otp');
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6"
      >
        {/* Top Navigation / Back Button */}
        <TouchableOpacity
          onPress={() => router.replace('/screens/Login')}
          className="mt-4 w-10 h-10 items-center justify-center"
        >
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="items-center mt-6">
          <Text className="text-3xl font-bold text-[#D81B8C]">Forgot Password</Text>
          <Text className="text-lg font-semibold text-center mt-8 text-black px-10 leading-6">
            Enter Register E-Mail Id to Recover Password
          </Text>
        </View>

        {/* Form Section */}
        <View className="mt-12">
          <Text className="text-lg font-bold mb-3 text-black">Email Id :</Text>
          <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4">
            <Mail color="#626262" size={20} />
            <TextInput
              placeholder="Enter your Email"
              className="flex-1 ml-3 text-base text-black"
              placeholderTextColor="#626262"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-auto pb-10">
          <TouchableOpacity
            className="bg-[#D81B8C] rounded-xl py-4 items-center shadow-lg shadow-pink-300"
            activeOpacity={0.8}
            onPress={handleFinish}
          >
            <Text className="text-white text-xl font-bold" >Sign in</Text>

          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;