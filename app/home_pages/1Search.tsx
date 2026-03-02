import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Platform, 
  Text, 
  ImageBackground, 
  StatusBar, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router'; 
import PaginationDots from '../components/PaginationDots';

const { width } = Dimensions.get('window');

const Search = () => {
  // State to track current banner index (0, 1, or 2)
  const [activeIndex, setActiveIndex] = useState(0);

  // Banner images for the slider
  const bannerImages = [
    require('../../assets/homepage_images/searchbg.jpg'),
    require('../../assets/homepage_images/searchbg.jpg'), 
    require('../../assets/homepage_images/searchbg.jpg'), 
  ];

  // Calculate current index based on horizontal scroll position
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View className="w-full h-[400px]">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* 1. Image Slider (FlatList) */}
      <FlatList
        data={bannerImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ImageBackground
            source={item}
            style={{ width: width, height: 400 }}
            resizeMode="cover"
            className="opacity-90"
          />
        )}
      />

      {/* 2. Overlay Header (Logo, Search, Notification) */}
      <View className="absolute top-0 w-full">
        <View 
          className="flex-row items-center px-4 w-full"
          style={{ 
            paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40) 
          }}
        >
          {/* Logo with Navigation to Profile */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/home_screens/Profile' as any)}
            className="border-2 border-[#D81B8C] rounded-full p-[2px]"
          >
            <Image 
              source={require('../../assets/homepage_images/searchlogo.jpg')} 
              className="w-12 h-12 rounded-full" 
            />
          </TouchableOpacity>

          {/* Search Bar Input */}
          <View className="flex-1 flex-row items-center bg-black/20 rounded-xl px-4 h-11 mx-3 border border-white/20">
            <SearchIcon color="white" size={18} />
            <TextInput 
              placeholder="Search" 
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              className="flex-1 ml-2 text-base text-white font-medium" 
            />
          </View>

          {/* Notification Bell */}
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <FontAwesome5 name="bell" size={26} color="#D81B8C" solid />
            <View className="absolute -top-1 -right-1 bg-white w-4 h-4 rounded-full items-center justify-center border border-[#D81B8C]">
              <Text className="text-[#D81B8C] text-[8px] font-bold">1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Pagination Dots */}
      <View className="absolute bottom-6 w-full flex-row justify-center items-center">
        <PaginationDots 
          activeIndex={activeIndex}
          variant='home' 
        />
      </View>
    </View>
  );
};

export default Search;