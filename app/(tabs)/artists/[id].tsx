/// <reference types="nativewind/types" />
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../src/context/ThemeContext';
import { ARTISTS } from '../../../src/data/artists';
import { ReviewProps, ArtistItem } from '@/types/artist';
import { ArtistService } from '@/services/artist.service';
import { useFetch } from '@/hooks/useFetch';
import Loader from '@/components/common/Loader';

const ArtistDetail = () => {
    const { isDarkMode } = useTheme();
    const { id } = useLocalSearchParams();
    const [showAll, setShowAll] = useState(false);

    const { data: apiArtist, loading } = useFetch(() => ArtistService.getArtistById(id as string), [id]);

    // Find the artist based on the ID passed from dynamic route (Fallback to static data)
    const artist = apiArtist || ARTISTS.find((a: ArtistItem) => a.id === id);

    if (loading && !apiArtist) {
        return <Loader visible fullScreen message="Loading artist details..." />;
    }

    if (!artist) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text className={isDarkMode ? 'text-white' : 'text-black'}>Artist not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2 bg-[#D81B8C] rounded">
                    <Text className="text-white">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleBack = () => router.back();

    const handleBooking = () => {
        router.push({
            pathname: '/(tabs)/appointments',
            params: { initialStylist: artist.name }
        } as any);
    };

    const displayedReviews = showAll ? artist.reviews : artist.reviews.slice(0, 2);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
            <View className="flex-row items-center px-4 py-4">
                <TouchableOpacity
                    onPress={handleBack}
                    hitSlop={20}
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                >
                    <ChevronLeft color={isDarkMode ? "white" : "black"} size={24} />
                </TouchableOpacity>
                <Text
                    className="flex-1 text-center text-3xl font-bold text-[#D81B8C]"
                    style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                >
                    {artist.name.split(' ')[0]}
                </Text>
                <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
                {/* Profile Section */}
                <View className="flex-row px-4 mt-2">
                    <Image
                        source={artist.image}
                        className="w-28 h-28 rounded-2xl"
                        style={{ backgroundColor: isDarkMode ? '#1F2937' : '#E5E7EB' }}
                    />
                    <View className="flex-1 ml-4 justify-center">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{artist.name}</Text>
                            <View className="flex-row items-center">
                                <Star size={14} color="#FFD700" fill="#FFD700" />
                                <Text className={`text-sm font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{artist.rating}</Text>
                            </View>
                        </View>
                        <Text className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{artist.specialty}</Text>
                        <Text className={`text-xs leading-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`} numberOfLines={3}>{artist.description}</Text>
                    </View>
                </View>

                {/* Gallery Section */}
                {artist.gallery && artist.gallery.length > 0 && (
                <>
                    <Text
                        className={`px-4 mt-8 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                        style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                    >
                        Gallery :
                    </Text>
                    <View className="px-4 mt-4">
                        <View className="flex-row justify-between mb-3">
                            <Image source={artist.gallery[0]} className="w-[32%] h-36 rounded-2xl" resizeMode="cover" />
                            <Image source={artist.gallery[1]} className="w-[66%] h-36 rounded-2xl" resizeMode="cover" />
                        </View>
                        <View className="flex-row justify-between">
                            <View className="w-[66%]">
                                <View className="flex-row justify-between mb-3">
                                    <Image source={artist.gallery[2]} className="w-[31%] h-40 rounded-2xl" resizeMode="cover" />
                                    <Image source={artist.gallery[3]} className="w-[65%] h-40 rounded-2xl" resizeMode="cover" />
                                </View>
                                <View className="flex-row justify-between">
                                    <Image source={artist.gallery[4]} className="w-[53%] h-36 rounded-2xl" resizeMode="cover" />
                                    <Image source={artist.gallery[5]} className="w-[44%] h-36 rounded-2xl" resizeMode="cover" />
                                </View>
                            </View>
                            <Image source={artist.gallery[6]} className="w-[32%] h-44 rounded-2xl" resizeMode="cover" />
                        </View>
                    </View>
                </>
                )}

                {/* Ratings Section */}
                <Text
                    className={`px-4 mt-10 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                >
                    Review :
                </Text>
                <View className="px-4 mt-6 flex-row items-center">
                    <View className="items-center mr-8">
                        <Text className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{artist.rating}</Text>
                        <Text className="text-sm text-gray-500">23 ratings</Text>
                    </View>
                    <View className="flex-1">
                        {[12, 5, 4, 0, 0].map((count, index) => (
                            <View key={index} className="flex-row items-center mb-1">
                                <View className="flex-row mr-2">
                                    {[...Array(5 - index)].map((_, i) => (
                                        <Star key={i} size={8} color="#FFD700" fill="#FFD700" />
                                    ))}
                                </View>
                                <View className="flex-1 h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                    <View style={{ width: `${(count / 12) * 100}%` }} className="h-full bg-[#D81B8C]" />
                                </View>
                                <Text className="text-xs text-gray-500 ml-3 w-5">{count}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* DYNAMIC REVIEWS LIST */}
                <View className="px-4 mt-6">
                    {displayedReviews.map((item: ReviewProps, index: number) => (
                        <ReviewItem
                            key={index}
                            name={item.name}
                            time={item.time}
                            text={item.text}
                            image={item.image}
                        />
                    ))}
                </View>

                {artist.reviews.length > 2 && (
                    <TouchableOpacity
                        onPress={() => setShowAll(!showAll)}
                        className="mx-4 mt-6 mb-4 py-4 rounded-2xl border border-[#D81B8C] items-center"
                        style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }}
                    >
                        <Text className="text-[#D81B8C] font-bold text-base">
                            {showAll ? "Show Less" : "See All Review"}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            <View className="absolute w-full px-4" style={{ bottom: 110 }}>
                <TouchableOpacity
                    onPress={handleBooking}
                    className="bg-[#D81B8C] py-5 rounded-2xl items-center shadow-lg"
                >
                    <Text className="text-white text-center text-xl font-bold">Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const ReviewItem = ({ name, time, text, image }: ReviewProps) => {
    const { isDarkMode } = useTheme();
    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                    <Image
                        source={image}
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: isDarkMode ? '#1F2937' : '#E5E7EB' }}
                    />
                    <View className="ml-4">
                        <Text className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</Text>
                        <View className="flex-row mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={12} color={i <= 4 ? "#FFD700" : (isDarkMode ? "#444" : "#ddd")} fill={i <= 4 ? "#FFD700" : "transparent"} />
                            ))}
                        </View>
                    </View>
                </View>
                <Text className="text-xs text-gray-500 font-bold">{time}</Text>
            </View>
            <Text className={`text-sm leading-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{text}</Text>
        </View>
    );
};

export default ArtistDetail;
