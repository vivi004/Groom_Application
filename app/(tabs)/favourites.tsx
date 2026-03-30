import { useRouter } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavouritesContext';


const Favourite = () => {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();
    const { isDarkMode } = useTheme();

    const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';

    return (
        <SafeAreaView className={`flex-1 ${bgColor}`}>
            {/* Header */}
            <View className="flex-row items-center px-4 py-4">
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <ChevronLeft color={isDarkMode ? 'white' : 'black'} size={28} />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Favourite</Text>
            </View>

            {/* Content List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-4 mt-2"
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                {favorites.length === 0 ? (
                    <View className="items-center mt-20">
                        <Text className={subTextColor}>No favourites yet!</Text>
                    </View>
                ) : (
                    favorites.map((item) => (
                        <View key={item.id} className="flex-row mb-6 items-start">
                            <View className={`w-28 h-28 rounded-2xl overflow-hidden ${cardBgColor}`}>
                                <Image source={item.image} className="w-full h-full" resizeMode="cover" />
                            </View>

                            <View className="flex-1 ml-4 justify-between h-28 py-1">
                                <View>
                                    <View className="flex-row justify-between items-start">
                                        <Text className={`text-base font-bold flex-1 ${textColor}`} numberOfLines={1}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                                            <Heart size={18} color="#D81B8C" fill="#D81B8C" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text className={`text-[10px] mt-1 leading-4 ${subTextColor}`} numberOfLines={2}>{item.desc}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className={`text-sm font-medium ${textColor}`}>{item.artist}</Text>
                                    <Text className="text-sm font-bold text-[#D81B8C]">{item.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>


        </SafeAreaView>
    );
};

export default Favourite;