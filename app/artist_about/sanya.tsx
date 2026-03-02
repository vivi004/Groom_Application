import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center px-4 py-4">
                <TouchableOpacity onPress={handleBack} hitSlop={20}>
                    <ChevronLeft color="black" size={28} />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Sanya Kapoor</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
                {/* Profile Section */}
                <View className="flex-row px-4 mt-2">
                    <Image source={require('../../assets/artists/sanya.jpg')} className="w-24 h-24 rounded-xl bg-gray-200" />
                    <View className="flex-1 ml-4 justify-center">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-bold">Sanya Kapoor</Text>
                            <View className="flex-row items-center">
                                <Star size={14} color="#FFD700" fill="#FFD700" />
                                <Text className="text-xs font-bold ml-1">4.8</Text>
                            </View>
                        </View>
                        <Text className="text-xs text-gray-500 font-semibold mb-1">HD Bridal Airbrush Makeup</Text>
                        <Text className="text-[10px] text-gray-400 leading-4">Sanya is a certified bridal artist known for creating soft, glowing wedding looks using high-definition airbrush techniques.</Text>
                    </View>
                </View>

                {/* Gallery Section */}
                <Text className="px-4 mt-6 text-lg font-bold">Gallery :</Text>
                <View className="px-4 mt-3">
                    <View className="flex-row justify-between mb-2">
                        <Image source={require('../../assets/artists/sanya_gal/img1.jpg')} className="w-[32%] h-32 rounded-xl" />
                        <Image source={require('../../assets/artists/sanya_gal/img2.png')} className="w-[66%] h-32 rounded-xl" />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="w-[66%]">
                            <View className="flex-row justify-between mb-2">
                                <Image source={require('../../assets/artists/sanya_gal/img3.jpg')} className="w-[30%] h-36 rounded-xl" />
                                <Image source={require('../../assets/artists/sanya_gal/img4.png')} className="w-[67%] h-36 rounded-xl" />
                            </View>
                            <View className="flex-row justify-between">
                                <Image source={require('../../assets/artists/sanya_gal/img5.png')} className="w-[53%] h-32 rounded-xl" />
                                <Image source={require('../../assets/artists/sanya_gal/img6.png')} className="w-[46%] h-32 rounded-xl" />
                            </View>
                        </View>
                        <Image source={require('../../assets/artists/sanya_gal/img7.png')} className="w-[32%] h-[246px] rounded-xl" />
                    </View>
                </View>

                {/* Ratings Section */}
                <Text className="px-4 mt-8 text-lg font-bold">Review :</Text>
                <View className="px-4 mt-4 flex-row items-center">
                    <View className="items-center mr-6">
                        <Text className="text-5xl font-bold">4.3</Text>
                        <Text className="text-xs text-gray-500">23 ratings</Text>
                    </View>
                    <View className="flex-1">
                        {[12, 5, 4, 2, 0].map((count, index) => (
                            <View key={index} className="flex-row items-center mb-1">
                                <View className="flex-row mr-2">
                                    {[...Array(5 - index)].map((_, i) => (
                                        <Star key={i} size={8} color="#FFD700" fill="#FFD700" />
                                    ))}
                                </View>
                                <View className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <View style={{ width: `${(count / 12) * 100}%` }} className="h-full bg-[#D81B8C]" />
                                </View>
                                <Text className="text-[10px] text-gray-400 ml-2 w-4">{count}</Text>
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
                    className="mx-4 mt-4 mb-10 py-3 rounded-xl border border-[#D81B8C] items-center"
                >
                    <Text className="text-[#D81B8C] font-semibold">
                        {showAll ? "Show Less" : "See All Review"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <View className="absolute bottom-6 w-full px-4">
                <TouchableOpacity onPress={handleBooking} className="bg-[#D81B8C] py-4 rounded-xl shadow-md">
                    <Text className="text-white text-center text-lg font-bold">Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const ReviewItem = ({ name, time, text, image }: ReviewProps) => (
    <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
                <Image source={image} className="w-10 h-10 rounded-full bg-gray-100" />
                <View className="ml-3">
                    <Text className="font-bold text-sm">{name}</Text>
                    <View className="flex-row">
                        {[1, 2, 3, 4].map((i) => <Star key={i} size={10} color="#FFD700" fill="#FFD700" />)}
                        <Star size={10} color="#D1D5DB" />
                    </View>
                </View>
            </View>
            <Text className="text-xs text-gray-400">{time}</Text>
        </View>
        <Text className="text-[11px] text-gray-600 leading-4">{text}</Text>
    </View>
);

export default ArtistDetail;