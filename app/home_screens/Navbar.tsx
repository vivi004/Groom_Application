import { usePathname, useRouter } from 'expo-router';
import {Heart} from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Home from '../../assets/icons/home.svg'
import Calendar from '../../assets/icons/appointments.svg'
import Users from '../../assets/icons/profile.svg'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  // Helper to check if a tab is active
  const isActive = (path: string) => pathname?.includes(path) ?? false;

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
        paddingBottom: 32, 
        borderTopWidth: 1, 
        backgroundColor: isDarkMode ? 'black' : 'white',
        borderTopColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F3F4F6'
      }}
      className="shadow-lg"
    >
      {/* Home Tab */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.replace('/home_screens/Homepage')}
      >
        <Home
          color={isActive('Homepage') ? activeColor : inactiveColor}
          fill={isActive('Homepage') ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${isActive('Homepage') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Favourite Tab */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.replace('/home_screens/Favourites')}
      >
        <Heart
          color={isActive('Favourites') ? activeColor : inactiveColor}
          fill={isActive('Favourites') ? activeColor : "transparent"}
          size={24}
        />
        <Text className={`text-[10px] mt-1 ${isActive('Favourites') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Favourite
        </Text>
      </TouchableOpacity>

      {/* Appointment Tab */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.replace('/home_screens/Appointment')}
      >
        <Calendar color={isActive('Appointment') ? activeColor : inactiveColor} />
        <Text className={`text-[10px] mt-1 ${isActive('Appointment') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Appointment
        </Text>
      </TouchableOpacity>

      {/* Stylists Tab */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.replace('/home_screens/Artist')}
      >
        <Users color={isActive('Artist') ? activeColor : inactiveColor}
        fill={isActive('Artist') ? activeColor : "transparent"}
         />
        <Text className={`text-[10px] mt-1 ${isActive('Artist') ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Artist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;