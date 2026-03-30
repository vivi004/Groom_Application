/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { ARTISTS } from '../../data/artists';
import { ArtistService } from '@/services/artist.service';
import { useFetch } from '@/hooks/useFetch';
import Loader from '@/components/common/Loader';

const Stylists = () => {
    const router = useRouter();
    const { data: artists, loading } = useFetch(ArtistService.getArtists, []);
    
    // Fallback to static data if API returns empty or fails (for dev/demo)
    const displayArtists = (artists && artists.length > 0) ? artists : ARTISTS;

    if (loading && (!artists || artists.length === 0)) {
        return <Loader visible message="Loading stylists..." />;
    }

    return (
        <View className="mt-8">
            <Text className="text-xl font-bold px-4 mb-6 text-black dark:text-white">Our Stylists</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
                {displayArtists.map((artist: any) => (
                    <TouchableOpacity 
                        key={artist.id} 
                        style={{ width: 144, marginRight: 24, flexShrink: 0 }}
                        onPress={() => router.push(`/artists/${artist.id}` as any)}
                        activeOpacity={0.9}
                    >
                        <View className="w-full h-48 rounded-[25px] overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image 
                                source={artist.image} 
                                className="w-full h-full" 
                                resizeMode="cover" 
                            />
                        </View>
                        <View className="flex-row items-center mt-3">
                            <Text 
                                className="font-bold text-[13px] text-black dark:text-white" 
                                style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                                numberOfLines={1}
                            >
                                {artist.name}
                            </Text>
                            <View className="flex-row items-center ml-2">
                                <Star size={11} color="#FFD700" fill="#FFD700" />
                                <Text className="text-[11px] ml-1 text-gray-500 font-medium dark:text-gray-400">{artist.rating}</Text>
                            </View>
                        </View>
                        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{artist.specialty}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Stylists;