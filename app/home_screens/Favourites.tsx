import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'; // Removed SafeAreaView here
import { ChevronLeft, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFavorites } from './FavouritesContext';
import Navbar from './Navbar';
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this one

const Favourite = () => {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center px-4 py-4">
                <TouchableOpacity onPress={() => router.push('/home_screens/Homepage')}>
                    <ChevronLeft color="black" size={28} />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Favourite</Text>
            </View>

            {/* Content List */}
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                className="px-4 mt-2"
                contentContainerStyle={{ paddingBottom: 100 }} 
            >
                {favorites.length === 0 ? (
                    <View className="items-center mt-20">
                        <Text className="text-gray-400">No favourites yet!</Text>
                    </View>
                ) : (
                    favorites.map((item) => (
                        <View key={item.id} className="flex-row mb-6 items-start">
                            <View className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100">
                                <Image source={item.image} className="w-full h-full" resizeMode="cover" />
                            </View>

                            <View className="flex-1 ml-4 justify-between h-28 py-1">
                                <View>
                                    <View className="flex-row justify-between items-start">
                                        <Text className="text-base font-bold text-black flex-1" numberOfLines={1}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                                            <Heart size={18} color="#D81B8C" fill="#D81B8C" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="text-[10px] text-gray-500 mt-1 leading-4" numberOfLines={2}>{item.desc}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm font-medium text-black">{item.artist}</Text>
                                    <Text className="text-sm font-bold text-[#D81B8C]">{item.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Navigation Bar */}
            <Navbar />
        </SafeAreaView>
    );
};

export default Favourite;