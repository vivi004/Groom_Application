import { router } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
interface ReviewProps {
    name: string;
    time: string;
    text: string;
    image: any;
}

// 1. ADD ALL REVIEWS HERE
const ALL_REVIEWS: ReviewProps[] = [
    {
        name: "Fatima Siddiqui",
        time: "2 Mins",
        text: "Fatima is renowned for her expertise in Muslim bridal looks, blending elegance with tradition.",
        image: require('../../assets/artists/fatima.jpg')
    },
    {
        name: "Aarav Malhotra",
        time: "5 Mins",
        text: "Aarav transforms every groom with precision—whether it's a traditional sherwani look or a modern tuxedo vibe.",
        image: require('../../assets/artists/aarav.jpg')
    },
    {
        name: "Priya Sharma",
        time: "10 Mins",
        text: "The airbrush finish was flawless! Sanya is definitely the best in the business for bridal glam.",
        image: require('../../assets/stylist_img/neha_sharma.png')
    },
    {
        name: "Neha Varma",
        time: "1 Hour",
        text: "Very professional and punctual. She understood exactly what I wanted for my engagement look.",
        image: require('../../assets/artists/riya.jpg')
    }
];

const ArtistDetail = () => {
    const { isDarkMode } = useTheme();
    const [showAll, setShowAll] = useState(false);

    const handleBack = () => router.replace('/home_screens/Artist' as any);

    const handleBooking = () => {
        router.push({
            pathname: '/home_screens/Appointment',
            params: { initialStylist: 'Sanya' }
        });
    };

    // 2. LOGIC TO SLICE THE ARRAY
    const displayedReviews = showAll ? ALL_REVIEWS : ALL_REVIEWS.slice(0, 2);

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
                    Robert
                </Text>
                <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
                {/* Profile Section */}
                <View className="flex-row px-4 mt-2">
                    <Image
                        source={require('../../assets/artists/sanya.jpg')}
                        className="w-28 h-28 rounded-2xl"
                        style={{ backgroundColor: isDarkMode ? '#1F2937' : '#E5E7EB' }}
                    />
                    <View className="flex-1 ml-4 justify-center">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Sanya Kapoor</Text>
                            <View className="flex-row items-center">
                                <Star size={14} color="#FFD700" fill="#FFD700" />
                                <Text className={`text-sm font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>4.8</Text>
                            </View>
                        </View>
                        <Text className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>HD Bridal Airbrush Makeup</Text>
                        <Text className={`text-xs leading-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Sanya is a certified bridal artist known for creating soft, glowing wedding looks using high-definition airbrush techniques. She ensures a picture-perfect finish that lasts all day.</Text>
                    </View>
                </View>

                {/* Gallery Section */}
                <Text
                    className={`px-4 mt-8 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                >
                    Gallery :
                </Text>
                <View className="px-4 mt-4">
                    <View className="flex-row justify-between mb-3">
                        <Image source={require('../../assets/artists/sanya_gal/img1.jpg')} className="w-[32%] h-36 rounded-2xl" />
                        <Image source={require('../../assets/artists/sanya_gal/img2.png')} className="w-[66%] h-36 rounded-2xl" />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="w-[66%]">
                            <View className="flex-row justify-between mb-3">
                                <Image source={require('../../assets/artists/sanya_gal/img3.jpg')} className="w-[31%] h-40 rounded-2xl" />
                                <Image source={require('../../assets/artists/sanya_gal/img4.png')} className="w-[65%] h-40 rounded-2xl" />
                            </View>
                            <View className="flex-row justify-between">
                                <Image source={require('../../assets/artists/sanya_gal/img5.png')} className="w-[53%] h-36 rounded-2xl" />
                                <Image source={require('../../assets/artists/sanya_gal/img6.png')} className="w-[44%] h-36 rounded-2xl" />
                            </View>
                        <View className="w-[32%]">
                        </View>
                        </View>
                            <Image source={require('../../assets/artists/sanya_gal/img7.png')} className="w-[32%] h-44 rounded-2xl"/>
                    </View>
                </View>

                {/* Ratings Section */}
                <Text
                    className={`px-4 mt-10 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                >
                    Review :
                </Text>
                <View className="px-4 mt-6 flex-row items-center">
                    <View className="items-center mr-8">
                        <Text className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>4.3</Text>
                        <Text className="text-sm text-gray-500">23 ratings</Text>
                    </View>
                    <View className="flex-1">
                        {[12, 5, 4, 2, 0].map((count, index) => (
                            <View key={index} className="flex-row items-center mb-1">
                                <View className="flex-row mr-2">
                                    {[...Array(5 - index)].map((_, i) => (
                                        <Star key={i} size={8} color="#FFD700" fill="#FFD700" />
                                    ))}
                                </View>
                                <View className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <View style={{ width: `${(count / 12) * 100}%` }} className="h-full bg-[#D81B8C]" />
                                </View>
                                <Text className="text-xs text-gray-500 ml-3 w-5">{count}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 3. DYNAMIC REVIEWS LIST */}
                <View className="px-4 mt-6">
                    {displayedReviews.map((item, index) => (
                        <ReviewItem
                            key={index}
                            name={item.name}
                            time={item.time}
                            text={item.text}
                            image={item.image}
                        />
                    ))}
                </View>

                {/* 4. UPDATED SEE ALL BUTTON */}
                <TouchableOpacity
                    onPress={() => setShowAll(!showAll)}
                    className="mx-4 mt-6 py-4 rounded-2xl bg-white/5 border border-[#D81B8C]/30 items-center"
                >
                    <Text className="text-[#D81B8C] font-bold text-base">
                        {showAll ? "Show Less" : "See All Review"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <View className="absolute bottom-6 w-full px-6">
                <TouchableOpacity onPress={handleBooking} className="bg-[#D81B8C] py-5 rounded-2xl shadow-xl">
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