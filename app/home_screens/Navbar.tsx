import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { Home, Heart, Calendar, Users } from 'lucide-react-native';

import { useRouter, usePathname } from 'expo-router';



const Navbar = () => {

  const router = useRouter();

  const pathname = usePathname(); // This gets the current route path



  // Helper to check if a tab is active

  const isActive = (path: string) => pathname.includes(path);



  const activeColor = "#D81B8C";

  const inactiveColor = "gray";



  return (

    <View className="absolute bottom-0 w-full bg-white flex-row justify-around items-center py-4 pb-8 border-t border-gray-100 shadow-lg">



      {/* Home Tab */}

      <TouchableOpacity

        className="items-center"

        onPress={() => router.replace('/home_screens/Homepage')}

      >

        <Home color={isActive('Homepage') ? activeColor : inactiveColor}

        fill={isActive('Homepage') ? activeColor : "transparent"}

        size={24} />

        <Text className={`text-[10px] mt-1 ${isActive('Homepage') ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>

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

        <Text className={`text-[10px] mt-1 ${isActive('Favourites') ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>

          Favourite

        </Text>

      </TouchableOpacity>



      {/* Appointment Tab */}

      <TouchableOpacity

        className="items-center"

        onPress={() => router.replace('/home_screens/Appointment')}

      >

        <Calendar color={isActive('Appointment') ? activeColor : inactiveColor} size={24} />

        <Text className={`text-[10px] mt-1 ${isActive('Appointment') ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>

          Appointment

        </Text>

      </TouchableOpacity>



      {/* Stylists Tab */}

      <TouchableOpacity

        className="items-center"

      onPress={() => router.replace('/home_screens/Artist')}

      >

        <Users color={isActive('Artist') ? activeColor : inactiveColor} size={24} />

        <Text className={`text-[10px] mt-1 ${isActive('Artist') ? 'text-[#D81B8C] font-bold' : 'text-gray-500'}`}>

          Artist

        </Text>

      </TouchableOpacity>



    </View>

  );

};



export default Navbar;