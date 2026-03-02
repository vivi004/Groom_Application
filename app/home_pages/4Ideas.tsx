import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Download } from 'lucide-react-native';
import { useFavorites, IdeaItem } from '../home_screens/FavouritesContext';

const initialIdeas: IdeaItem[] = [
  {
    id: 1,
    title: 'Classic Bridal Glam',
    price: '$250',
    artist: 'Isha Mehra',
    desc: 'Elegant bridal makeup with peach tones, shimmer eyes, and matte finish.',
    image: require('../../assets/ideas_img/reception_makeup.png')
  },
  {
    id: 2,
    title: 'Royal Reception Look',
    price: '$250',
    artist: 'Kabir Styles',
    desc: 'Groom royal styling with beard definition and hair sculpting.',
    image: require('../../assets/ideas_img/haldi_ceremony.png')
  },
  {
    id: 3,
    title: 'Groom Maharaja Style',
    price: '$250',
    artist: 'Riya Makeovers',
    desc: 'Perfect Sangeet-ready bold bridal glam look with traditional jewelry.',
    image: require('../../assets/ideas_img/sangeet_glam.jpg')
  },
  {
    id: 4,
    title: 'Christian Wedding',
    price: '$250',
    artist: 'Isha Mehra',
    desc: 'Soft white-toned makeup for a classic look.',
    image: require('../../assets/ideas_img/christian_wedding.png')
  },
  {
    id: 5,
    title: 'Groom Beard',
    price: '$250',
    artist: 'Kabir Styles',
    desc: 'Sharp beard styling for the big day.',
    image: require('../../assets/ideas_img/groom_beard.png')
  },
  {
    id: 6,
    title: 'Muslim Bride',
    price: '$250',
    artist: 'Riya Makeovers',
    desc: 'Traditional gold and red glam.',
    image: require('../../assets/ideas_img/muslim_bride.png')
  },
];

const Ideas = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <View className="mt-8 px-4">
      <Text className="text-xl font-bold mb-4">Wedding Look Ideas</Text>

      <View className="flex-row flex-wrap justify-between">
        {initialIdeas.map((item) => {
          const isLiked = isFavorite(item.id);

          return (
            <View key={item.id} className="w-[48%] mb-6">
              {/* Image Container with Exact Hover/Active Styles */}
              <View className="h-48 bg-gray-200 rounded-3xl overflow-hidden relative shadow-sm">
                <Image
                  source={item.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Download Overlay */}
                <TouchableOpacity className="absolute top-2 left-2 bg-white/60 p-2 rounded-xl">
                  <Download size={14} color="black" />
                </TouchableOpacity>

                {/* Heart Toggle - Linked to Global Context */}
                <TouchableOpacity
                  onPress={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 bg-white/60 p-2 rounded-xl"
                >
                  <Heart
                    size={14}
                    color={isLiked ? "#D81B8C" : "black"}
                    fill={isLiked ? "#D81B8C" : "transparent"}
                  />
                </TouchableOpacity>
              </View>

              {/* Info Area */}
              <View className="mt-2 px-1">
                <Text className="text-sm font-bold text-black" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-sm text-[#D81B8C] font-bold">
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