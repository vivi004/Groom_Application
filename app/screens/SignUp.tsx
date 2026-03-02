import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Route } from 'expo-router/build/Route';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const handleFinish =() =>{
       router.replace('/home_screens/Homepage');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.replace('/screens/Login')}
            className="mt-4 w-10 h-10 items-center justify-center"
          >
            <ChevronLeft color="black" size={28} />
          </TouchableOpacity>

          {/* Header Section */}
          <View className="items-center mt-6">
            <Text className="text-3xl font-bold text-[#D81B8C]">SignUp</Text>
            <Text className="text-lg font-semibold text-center mt-8 text-black">
              Create a Profile
            </Text>
          </View>

          {/* Registration Form */}
          <View className="mt-10">
            {/* Email Field */}
            <Text className="text-lg font-bold mb-2">Email Id :</Text>
            <View className="flex-row items-center bg-[#F1F4F9] rounded-xl px-4 py-4 mb-6">
              <Mail color="#626262" size={20} />
              <TextInput
                placeholder="Enter your Email"
                className="flex-1 ml-3 text-base"
                placeholderTextColor="#626262"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field */}
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

            {/* Confirm Password Field */}
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

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-[#D81B8C] rounded-xl py-4 items-center mt-12 shadow-lg shadow-pink-300"
            activeOpacity={0.8}
            onPress={handleFinish}
          >
            <Text className="text-white text-xl font-bold">Sign in</Text>
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View className="flex-row justify-center mt-10 mb-10">
            <Text className="text-gray-600">Already Have a Account? </Text>
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