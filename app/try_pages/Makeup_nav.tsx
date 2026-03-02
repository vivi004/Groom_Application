import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Palette, Users, Scissors } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // Changed to useRouter hook for stability

interface MakeupNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Makeup_nav = ({ activeTab, setActiveTab }: MakeupNavProps) => {
  const router = useRouter(); // Initialize router hook
  
  const activeColor = "#D81B8C"; 
  const inactiveColor = "#8E8E93"; 

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
    <View className="flex-row justify-around items-center bg-white py-4 pb-8 border-t border-gray-100 shadow-sm">
      
      {/* 1. Makeup Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Makeup', '/try_pages/Makeup')}
      >
        <Palette 
          size={24} 
          color={activeTab === 'Makeup' ? activeColor : inactiveColor} 
          fill={activeTab === 'Makeup' ? activeColor : "transparent"} 
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Makeup' ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>
          Makeup
        </Text>
      </TouchableOpacity>

      {/* 2. Hairstyle Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Hairstyle', '/try_pages/Hairstyle')}
      >
        <Users 
          size={24} 
          color={activeTab === 'Hairstyle' ? activeColor : inactiveColor} 
          fill={activeTab === 'Hairstyle' ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Hairstyle' ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>
          Hairstyle
        </Text>
      </TouchableOpacity>

      {/* 3. Grooming Tab */}
      <TouchableOpacity 
        className="items-center" 
        onPress={() => navigateTo('Grooming', '/try_pages/Grooming')}
      >
        <Scissors 
          size={24} 
          color={activeTab === 'Grooming' ? activeColor : inactiveColor} 
          fill={activeTab === 'Grooming' ? activeColor : "transparent"}
        />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Grooming' ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>
          Grooming
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Makeup_nav;
