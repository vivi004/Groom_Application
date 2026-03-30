/// <reference types="nativewind/types" />
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const services = [
  {
    name: 'Bridal Makeup', id: 1,
    image: require('../../../assets/homepage_images/service_img/bridal_makeup.jpg')
  },
  {
    name: 'Groom Styling', id: 2,
    image: require('../../../assets/homepage_images/service_img/groom_styling.png')
  },
  {
    name: 'Mehndi Designs', id: 3,
    image: require('../../../assets/homepage_images/service_img/mehndi_designs.png')
  },

  {
    name: 'Hair Styling', id: 4,
    image: require('../../../assets/homepage_images/service_img/hair_styling.png')
  },
];

const Services = () => {
  const { isDarkMode } = useTheme();

  return (
    <View className="mt-8">
      <Text className="px-4 text-xl font-bold mb-4 text-black dark:text-white">Our Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
        {services.map((item) => (
          <View key={item.id} style={{ alignItems: 'center', marginRight: 24, width: 80 }}>
            <View className="w-20 h-20 rounded-full overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <Image source={item.image} className="w-full h-full" />
            </View>
            <Text className="text-[11px] mt-2 text-center text-black font-medium dark:text-gray-300">{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;