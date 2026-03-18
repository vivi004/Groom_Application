import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Palette from '../../assets/icons/try icons/makeup.svg';
import Hairstyle from '../../assets/icons/try icons/hairstyle.svg';
import Grooming from '../../assets/icons/try icons/Grooming.svg';

interface MakeupNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Makeup_nav = ({ activeTab, setActiveTab }: MakeupNavProps) => {
  const { isDarkMode } = useTheme();
  const router = useRouter(); // Initialize router hook
  
  const activeColor = "#D81B8C"; 
  const inactiveColor = isDarkMode ? "#9CA3AF" : "#8E8E93"; 
  const bgColor = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-100';

  const navigateTo = (tabName: string, route: any) => {
    setActiveTab(tabName);
    
    // Use try/catch to prevent the app from crashing if path is wrong
    try {
      router.replace(route);
    } catch (error) {
      console.error("Navigation Error:", error);
    }
  };

  return (
    <View className={`flex-row justify-around items-center ${bgColor} py-4 pb-8 border-t ${borderColor} shadow-sm`}>
      
      {/* 1. Makeup Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Makeup', '/try_pages/Makeup')}
      >
        <Palette 
          color={activeTab === 'Makeup' ? activeColor : inactiveColor} 
          fill={activeTab === 'Makeup' ? activeColor : "transparent"} 
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Makeup' ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Makeup
        </Text>
      </TouchableOpacity>

      {/* 2. Hairstyle Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Hairstyle', '/try_pages/Hairstyle')}
      >
        <Hairstyle 
          color={activeTab === 'Hairstyle' ? activeColor : inactiveColor} 
          fill={activeTab === 'Hairstyle' ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Hairstyle' ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Hairstyle
        </Text>
      </TouchableOpacity>

      {/* 3. Grooming Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Grooming', '/try_pages/Grooming')}
      >
        <Grooming 
          color={activeTab === 'Grooming' ? activeColor : inactiveColor} 
          fill={activeTab === 'Grooming' ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Grooming' ? 'text-[#D81B8C] font-bold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Grooming
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Makeup_nav;
