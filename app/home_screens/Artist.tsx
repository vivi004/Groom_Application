import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import { ChevronLeft, Star, Home, Heart, Calendar, User } from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this one

// Define the interface for our Artist object
interface ArtistItem {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  image: any;
  route: string;
}

const ARTISTS: ArtistItem[] = [
  { id: '1', name: 'Isha Mehra', specialty: 'Bridal Makeup', rating: '4.5', image: require('../../assets/artists/isha.jpg'), route: '/artist_about/isha' },
  { id: '2', name: 'Kabir Styles', specialty: 'Groom Hair', rating: '4.7', image: require('../../assets/artists/kabir.jpg'), route: '/artist_about/kabir' },
  { id: '3', name: 'Riya', specialty: 'Mehndi', rating: '4.9', image: require('../../assets/artists/riya.jpg'), route: '/artist_about/riya' },
  { id: '4', name: 'Afreen Khan', specialty: 'Muslim Bridal', rating: '4.6', image: require('../../assets/artists/afreen.jpg'), route: '/artist_about/afreen' },
  { id: '5', name: 'Rajveer Singh', specialty: 'Beard Sculpting', rating: '4.5', image: require('../../assets/artists/rajveer.jpg'), route: '/artist_about/rajveer' },
  { id: '6', name: 'Diya Ghosh', specialty: 'Christian Bridal', rating: '4.7', image: require('../../assets/artists/diya.jpg'), route: '/artist_about/diya' },
  { id: '7', name: 'Sanya Kapoor', specialty: 'Bridal Airbrush', rating: '4.4', image: require('../../assets/artists/sanya.jpg'), route: '/artist_about/sanya' },
  { id: '8', name: 'Aarav', specialty: 'Groom Styling', rating: '4.5', image: require('../../assets/artists/aarav.jpg'), route: '/artist_about/aarav' },
  { id: '9', name: 'Fatima', specialty: 'Muslim Bridal', rating: '4.9', image: require('../../assets/artists/fatima.jpg'), route: '/artist_about/fatima' },
];

const Artist = () => {
  const handleHome = () => router.replace('/home_screens/Homepage' as any);

  const renderArtistCard = ({ item }: { item: ArtistItem }) => (
    <TouchableOpacity 
      className="flex-1 m-2" 
      activeOpacity={0.7}
      // Casting route to 'any' to satisfy Expo Router's strict navigation types
      onPress={() => router.push(item.route as any)}
    >
      <Image 
        source={item.image} 
        className="w-full h-48 rounded-xl bg-gray-200"
        resizeMode="cover"
      />
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-bold text-[13px] text-black flex-1" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row items-center">
          <Star size={10} color="#FFD700" fill="#FFD700" />
          <Text className="text-[10px] text-gray-500 ml-1">{item.rating}</Text>
        </View>
      </View>
      <Text className="text-[11px] text-gray-400">{item.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={handleHome} hitSlop={20}>
          <ChevronLeft color="black" size={28} />
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

      {/* Bottom Nav */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex-row justify-around py-3 pb-6">
        <TouchableOpacity className="items-center" onPress={handleHome}>
          <Home size={24} color="#9CA3AF" />
          <Text className="text-[10px] text-gray-400 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => router.replace('/home_screens/Favourites' as any)}>
          <Heart size={24} color="#9CA3AF" />
          <Text className="text-[10px] text-gray-400 mt-1">Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => router.replace('/home_screens/Appointment' as any)}>
          <Calendar size={24} color="#9CA3AF" />
          <Text className="text-[10px] text-gray-400 mt-1">Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <User size={24} color="#D81B8C" fill="#FCE7F3" />
          <Text className="text-[10px] text-[#D81B8C] font-bold mt-1">Artist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Artist;