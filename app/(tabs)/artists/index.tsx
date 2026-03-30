/// <reference types="nativewind/types" />
import { router } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../src/context/ThemeContext';
import { ARTISTS } from '../../../src/data/artists';
import { ArtistItem } from '@/types/artist';

const Artist = () => {
  const { isDarkMode } = useTheme();
  const handleHome = () => router.replace('/home');

  const renderArtistCard = ({ item }: { item: ArtistItem }) => (
    <TouchableOpacity
      className="flex-1 m-2"
      activeOpacity={0.7}
      onPress={() => router.push(`/artists/${item.id}` as any)}
    >
      <View className="h-48 rounded-xl overflow-hidden bg-gray-200">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className={`font-bold text-[13px] flex-1 ${isDarkMode ? 'text-white' : 'text-black'}`} numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row items-center">
          <Star size={10} color="#FFD700" fill="#FFD700" />
          <Text className={`text-[10px] ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.rating}</Text>
        </View>
      </View>
      <Text className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>{item.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
      edges={['top', 'left', 'right']}
      className={`flex-1 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}
    >
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={handleHome} hitSlop={20}>
          <ChevronLeft color={isDarkMode ? "white" : "black"} size={28} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-3xl font-bold text-[#D81B8C] mr-7">
          Artist
        </Text>
      </View>

      <FlatList
        data={ARTISTS}
        renderItem={renderArtistCard}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />


    </SafeAreaView>
  );
};

export default Artist;   
