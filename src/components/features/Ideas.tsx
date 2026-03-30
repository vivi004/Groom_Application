/// <reference types="nativewind/types" />
import { Download, Heart } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { IdeaItem, useFavorites } from '../../context/FavouritesContext';

const initialIdeas: IdeaItem[] = [
  {
    id: 1,
    title: 'Reception Makeup',
    price: '$250',
    artist: 'Isha Mehra',
    desc: 'Elegant bridal makeup with peach tones, shimmer eyes, and matte finish.',
    image: require('../../../assets/ideas_img/reception_makeup.png')
  },
  {
    id: 2,
    title: 'Haldi Ceremony',
    price: '$250',
    artist: 'Kabir Styles',
    desc: 'Groom royal styling with beard definition and hair sculpting.',
    image: require('../../../assets/ideas_img/haldi_ceremony.png')
  },
  {
    id: 3,
    title: 'Sangeet Glam',
    price: '$250',
    artist: 'Riya Makeovers',
    desc: 'Perfect Sangeet-ready bold bridal glam look with traditional jewelry.',
    image: require('../../../assets/ideas_img/sangeet_glam.jpg')
  },
  {
    id: 4,
    title: 'Christian Wedding',
    price: '$250',
    artist: 'Isha Mehra',
    desc: 'Soft white-toned makeup for a classic look.',
    image: require('../../../assets/ideas_img/christian_wedding.png')
  },
  {
    id: 5,
    title: 'Groom Beard',
    price: '$250',
    artist: 'Kabir Styles',
    desc: 'Sharp beard styling for the big day.',
    image: require('../../../assets/ideas_img/groom_beard.png')
  },
  {
    id: 6,
    title: 'Muslim Bride',
    price: '$250',
    artist: 'Riya Makeovers',
    desc: 'Traditional gold and red glam.',
    image: require('../../../assets/ideas_img/muslim_bride.png')
  },
];

const Ideas = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isDarkMode } = useTheme();

  return (
    <View className="mt-8 px-4">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">Wedding Look Ideas</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {initialIdeas.map((item) => {
          const isLiked = isFavorite(item.id);

          return (
            <View key={item.id} style={{ width: '31%', marginBottom: 24 }}>
              {/* Image Container */}
              <View className="h-40 rounded-2xl overflow-hidden relative shadow-md bg-gray-100 dark:bg-[#1A1A1A]">
                <Image
                  source={item.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Download Overlay */}
                <TouchableOpacity className="absolute top-2 left-2 p-1">
                  <Download size={16} color="white" strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Heart Toggle */}
                <TouchableOpacity
                  onPress={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 p-1"
                >
                  <Heart
                    size={16}
                    color={isLiked ? "#D81B8C" : "white"}
                    fill={isLiked ? "#D81B8C" : "transparent"}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>
              </View>

              {/* Info Area: Horizontal Alignment */}
              <View className="mt-2 flex-row justify-between items-center px-0.5">
                <Text 
                  className="text-[10px] font-bold flex-1 text-black dark:text-white" 
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className="text-[10px] text-[#D81B8C] font-bold ml-1">
                  {item.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Ideas;