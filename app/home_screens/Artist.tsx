import { router } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Navbar from './Navbar';

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
  const { isDarkMode } = useTheme();
  const handleHome = () => router.replace('/home_screens/Homepage' as any);

  const renderArtistCard = ({ item }: { item: ArtistItem }) => (
    <TouchableOpacity
      className="flex-1 m-2"
      activeOpacity={0.7}
      onPress={() => router.push(item.route as any)}
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
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
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

      <Navbar />
    </SafeAreaView>
  );
};

export default Artist;   
