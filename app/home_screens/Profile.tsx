import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ScrollView} from 'react-native';
import { ChevronLeft, User, Heart, Calendar, Moon, Globe, Info, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import Navbar from './Navbar'; // Adjust path if necessary
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this one

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  // Dynamic Styles based on Dark Mode
  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-100';
  const iconColor = isDarkMode ? 'white' : 'black';

  const menuItems = [
    { id: '1', title: 'Profile', icon: <User color={iconColor} size={22} />, path: '/profile_details' },
    { id: '2', title: 'Favourite', icon: <Heart color={iconColor} size={22} />, path: '/home_screens/Favourites' },
    { id: '3', title: 'Appointments', icon: <Calendar color={iconColor} size={22} />, path: '/home_screens/Appointment' },
  ];

  const settingItems = [
    { id: '4', title: 'Language', icon: <Globe color={iconColor} size={22} />, path: '/language' },
    { id: '5', title: 'Privacy & Policy', icon: <Info color={iconColor} size={22} />, path: '/privacy' },
  ];

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} hitSlop={20}>
          <ChevronLeft color={iconColor} size={28} />
        </TouchableOpacity>
        <Text className={`flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7`}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Info */}
        <View className="items-center mt-4">
          <View className="p-1 rounded-full border-2 border-[#D81B8C]">
            <Image 
              source={require('../../assets/homepage_images/searchlogo.jpg')} // Replace with your user image path
              className="w-24 h-24 rounded-full bg-gray-200"
            />
          </View>
          <Text className="text-xl font-bold text-[#D81B8C] mt-3">Jhon. Fr sen</Text>
        </View>

        {/* Menu Items */}
        <View className="mt-8 px-4">
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => router.push(item.path as any)}
              className={`flex-row items-center py-4 border-b ${borderColor}`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center bg-gray-50 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                {item.icon}
              </View>
              <Text className={`flex-1 ml-4 text-base font-semibold ${textColor}`}>{item.title}</Text>
              <ChevronRight color="gray" size={20} />
            </TouchableOpacity>
          ))}

          {/* Dark Mode Toggle */}
          <View className={`flex-row items-center py-4 border-b ${borderColor}`}>
            <View className={`w-10 h-10 rounded-full items-center justify-center bg-gray-50 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <Moon color={iconColor} size={22} />
            </View>
            <Text className={`flex-1 ml-4 text-base font-semibold ${textColor}`}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#D81B8C" }}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>

          {settingItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => router.push(item.path as any)}
              className={`flex-row items-center py-4 border-b ${borderColor}`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center bg-gray-50 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                {item.icon}
              </View>
              <Text className={`flex-1 ml-4 text-base font-semibold ${textColor}`}>{item.title}</Text>
              <ChevronRight color="gray" size={20} />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity 
            onPress={() => router.replace('/login' as any)}
            className="flex-row items-center py-4 mb-10"
          >
            <View className={`w-10 h-10 rounded-full items-center justify-center bg-gray-50 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <LogOut color={iconColor} size={22} />
            </View>
            <Text className={`flex-1 ml-4 text-base font-semibold ${textColor}`}>Logout</Text>
            <ChevronRight color="gray" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar Integration */}
      <Navbar />
    </SafeAreaView>
  );
};

export default Profile;