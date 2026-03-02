import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
   const handleFinish = () => {
      // Navigate to Lforgot password after 
      router.replace('/home_screens/Homepage');
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6"
      >
        {/* Top Navigation - Consistent with previous screens */}
        <TouchableOpacity
          onPress={() => router.replace('/screens/Login')}
          className="mt-4 w-10 h-10 items-center justify-center"
        >
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="items-center mt-6">
          <Text className="text-3xl font-bold text-[#D81B8C]">Reset Password</Text>
          <Text className="text-lg font-semibold text-center mt-8 text-black px-10 leading-6">
            Create a New{"\n"}Password
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mt-10">
          {/* New Password Input */}
          <Text className="text-lg font-bold mb-2">Password :</Text>
          <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4 mb-6">
            <Lock color="#626262" size={20} />
            <TextInput
              placeholder="Enter your Password"
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#626262"
              secureTextEntry={passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <EyeOff color="black" size={20} /> : <Eye color="black" size={20} />}
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <Text className="text-lg font-bold mb-2">Confrim Password :</Text>
          <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4">
            <Lock color="#626262" size={20} />
            <TextInput
              placeholder="Re-Enter your Password"
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#626262"
              secureTextEntry={confirmVisible}
            />
            <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
              {confirmVisible ? <EyeOff color="black" size={20} /> : <Eye color="black" size={20} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-auto pb-10">
          <TouchableOpacity
            className="bg-[#D81B8C] rounded-xl py-4 items-center shadow-lg shadow-pink-300"
            activeOpacity={0.8}
            onPress={handleFinish}
          >
            <Text className="text-white text-xl font-bold">Sign in</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
