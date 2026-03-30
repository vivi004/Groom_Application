import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this one
import AppointmentIcon from '../../assets/icons/profile/appointments.svg';
import DarkModeIcon from '../../assets/icons/profile/darkmode.svg';
import FavouriteIcon from '../../assets/icons/profile/favourite.svg';
import LanguageIcon from '../../assets/icons/profile/language.svg';
import LogoutIcon from '../../assets/icons/profile/logout.svg';
import PrivacyIcon from '../../assets/icons/profile/privacy&policy.svg';
import ProfileIcon from '../../assets/icons/profile/profile.svg';
import { useTheme } from '@/context/ThemeContext';

const Profile = () => {
  const router = useRouter();
  const { isDarkMode, toggleColorScheme } = useTheme();

  // Dynamic Styles based on Dark Mode
  const bgColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subTextColor = isDarkMode ? '#9CA3AF' : '#6B7280';
  const borderColor = isDarkMode ? '#374151' : '#F3F4F6';
  const iconColor = isDarkMode ? 'white' : 'black';
  const iconBgColor = isDarkMode ? '#1F2937' : '#F9FAFB';

  const menuItems = [
    { id: '1', title: 'Profile', icon: <ProfileIcon color={iconColor} />, path: '/profile_details' },
    { id: '2', title: 'Favourite', icon: <FavouriteIcon color={iconColor} />, path: '/favourites' },
    { id: '3', title: 'Appointments', icon: <AppointmentIcon color={iconColor} />, path: '/appointments' },
  ];

  const settingItems = [
    { id: '4', title: 'Language', icon: <LanguageIcon color={iconColor} />, path: '/language' },
    { id: '5', title: 'Privacy & Policy', icon: <PrivacyIcon color={iconColor} />, path: '/privacy' },
  ];

  return (
    <SafeAreaView 
      edges={['top', 'left', 'right']}
      className={`flex-1 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} hitSlop={20}>
          <ChevronLeft color={iconColor} size={28} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Profile</Text>
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
              className="flex-row items-center py-4 border-b"
              style={{ borderBottomColor: borderColor }}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: iconBgColor }}
              >
                {item.icon}
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold" style={{ color: textColor }}>{item.title}</Text>
              <ChevronRight color="gray" size={20} />
            </TouchableOpacity>
          ))}

          {/* Dark Mode Toggle */}
          <View className="flex-row items-center py-4 border-b" style={{ borderBottomColor: borderColor }}>
            <View 
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <DarkModeIcon color={iconColor} />
            </View>
            <Text className="flex-1 ml-4 text-base font-semibold" style={{ color: textColor }}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#D81B8C" }}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              onValueChange={toggleColorScheme}
              value={isDarkMode}
            />
          </View>

          {settingItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(item.path as any)}
              className="flex-row items-center py-4 border-b"
              style={{ borderBottomColor: borderColor }}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: iconBgColor }}
              >
                {item.icon}
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold" style={{ color: textColor }}>{item.title}</Text>
              <ChevronRight color="gray" size={20} />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity
            onPress={() => router.replace('/login')}
            className="flex-row items-center py-4 mb-10"
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <LogoutIcon color={iconColor} />
            </View>
            <Text className="flex-1 ml-4 text-base font-semibold" style={{ color: textColor }}>Logout</Text>
            <ChevronRight color="gray" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar Integration */}

    </SafeAreaView>
  );
};

export default Profile;