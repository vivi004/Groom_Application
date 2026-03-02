import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const services = [
  {
    name: 'Bridal Makeup', id: 1,
    image: require('../../assets/homepage_images/service_img/bridal_makeup.jpg')
  },
  {
    name: 'Groom Styling', id: 2,
    image: require('../../assets/homepage_images/service_img/groom_styling.png')
  },
  {
    name: 'Mehndi Designs', id: 3,
    image: require('../../assets/homepage_images/service_img/mehndi_designs.png')
  },

  {
    name: 'Hair Styling', id: 4,
    image: require('../../assets/homepage_images/service_img/hair_styling.png')
  },
];

const Services = () => {
  return (
    <View className="mt-8">
      <Text className="px-4 text-xl font-bold mb-4">Our Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
        {services.map((item) => (
          <View key={item.id} className="items-center mr-6">
            <View className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <Image source={item.image} className="w-full h-full" />
            </View>
            <Text className="text-xs font-semibold mt-2 text-center w-20">{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;