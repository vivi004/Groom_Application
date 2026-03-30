/// <reference types="nativewind/types" />
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Home from '../../../assets/icons/home.svg'
import Calendar from '../../../assets/icons/appointments.svg'
import Users from '../../../assets/icons/profile.svg'
import Heart from '../../../assets/icons/favorite.svg'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  // Helper to check if a tab is active
  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home';
    return pathname?.startsWith(path) ?? false;
  };

  const activeColor = "#D81B8C";
  const inactiveColor = isDarkMode ? "#9CA3AF" : "gray"; // gray-400 in dark mode

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 24,
        borderTopWidth: 1,
        backgroundColor: isDarkMode ? 'black' : 'white',
        borderTopColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F3F4F6'
      }}
      className="shadow-lg"
    >
      {/* Home Tab */}
      <TouchableOpacity
        className="items-center"
        // @ts-ignore
        onPress={() => router.replace('/home')}
      >
        <Home
          color={isActive('/home') ? activeColor : inactiveColor}
          fill={isActive('/home') ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${isActive('/home') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Favourite Tab */}
      <TouchableOpacity
        className="items-center"
        // @ts-ignore
        onPress={() => router.replace('/favourites')}
      >
        <Heart
          color={isActive('/favourites') ? activeColor : inactiveColor}
          fill={isActive('/favourites') ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${isActive('/favourites') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Favourite
        </Text>
      </TouchableOpacity>

      {/* Appointment Tab */}
      <TouchableOpacity
        className="items-center"
        // @ts-ignore
        onPress={() => router.replace('/appointments')}
      >
        <Calendar
          color={isActive('/appointments') ? activeColor : inactiveColor}
          fill={isActive('/appointments') ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${isActive('/appointments') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Appointment
        </Text>
      </TouchableOpacity>

      {/* Stylists Tab */}
      <TouchableOpacity
        className="items-center"
        // @ts-ignore
        onPress={() => router.replace('/artists')}
      >
        <Users color={isActive('/artists') ? activeColor : inactiveColor}
          fill={isActive('/artists') ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${isActive('/artists') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Stylists
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;