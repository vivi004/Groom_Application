import { Star } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const artists = [
  { name: 'Neha Sharma', role: 'Bridal Expert', rating: '4.5', image: require('../../assets/stylist_img/neha_sharma.png') },
  { name: 'Kabir Styles', role: 'Groom Hair', rating: '4.7', image: require('../../assets/artists/kabir.jpg') },
  { name: 'Riya', role: 'Mehndi', rating: '4.9', image: require('../../assets/artists/riya.jpg') },
  { name: 'Afreen Khan', role: 'Muslim Bridal', rating: '4.6', image: require('../../assets/artists/afreen.jpg') },
  { name: 'Rajveer Singh', role: 'Beard Sculpting', rating: '4.5', image: require('../../assets/artists/rajveer.jpg') },
  { name: 'Diya Ghosh', role: 'Christian Bridal', rating: '4.7', image: require('../../assets/artists/diya.jpg') },
  { name: 'Sanya Kapoor', role: 'Bridal Airbrush', rating: '4.4', image: require('../../assets/artists/sanya.jpg') },
  { name: 'Aarav', role: 'Groom Styling', rating: '4.5', image: require('../../assets/artists/aarav.jpg') },
  { name: 'Fatima', role: 'Muslim Bridal', rating: '4.9', image: require('../../assets/artists/fatima.jpg') },
];

const Stylists = () => {
  const { isDarkMode } = useTheme();

  return (
    <View className="mt-8 px-4 pb-24">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">Our Stylists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {artists.map((artist, index) => (
          <View key={index} className="mr-6 w-36 pb-2">
            <View className="h-44 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
              <Image 
                source={artist.image} 
                className="w-full h-full" 
                resizeMode="cover" 
              />
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <Text className="font-bold text-sm text-black dark:text-white flex-1" numberOfLines={1}>{artist.name}</Text>
              <View className="flex-row items-center ml-1">
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text className="text-xs ml-1 text-gray-500 dark:text-gray-400">{artist.rating}</Text>
              </View>
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{artist.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stylists;