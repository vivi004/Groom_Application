import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { BlurView } from 'expo-blur';
import Bell from '../../assets/icons/Bell.svg';
import Searchicon from '../../assets/icons/search.svg';
import { useTheme } from '../../context/ThemeContext';
import PaginationDots from '../components/PaginationDots';

const { width } = Dimensions.get('window');

const Search = () => {
  const { isDarkMode } = useTheme();
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
      <StatusBar translucent backgroundColor="#FFFFFF80" barStyle="light-content" />
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
          >

            {/* Transparent / Blur Overlay */}
            <View className="absolute inset-0 bg-white/10 backdrop-blur-lg" />

          </ImageBackground>
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
            className="border-[3px] border-[#D81B8C] rounded-full overflow-hidden w-16 h-16"
          >
            <Image
              source={require('../../assets/homepage_images/searchlogo.jpg')}
              className="w-full h-full"
              resizeMode='cover'
            />
          </TouchableOpacity>

          {/* Search Bar Input */}
          <BlurView
            intensity={25}
            tint="light"
            className="flex-1 flex-row items-center rounded-2xl px-4 h-[52px] mx-3"
            style={{ 
              backgroundColor: 'rgba(141, 137, 137, 0.45)',
              overflow: 'hidden'
            }}
          >
            <Searchicon width={24} height={24} color="#FFFFFF" style={{ opacity: 0.9 }} />

            <TextInput
              placeholder="Search"
              placeholderTextColor="rgba(255, 255, 255, 0.9)"
              className="flex-1 ml-0.5 text-[16px] text-white font-semibold"
            />
          </BlurView>

          {/* Notification Bell */}
          <TouchableOpacity className="relative mr-1" activeOpacity={0.7}>
            <Bell width={32} height={32} color="#D81B8C" />
            <View className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white bg-[#D81B8C]">
              <Text className="text-white text-[9px] font-bold">1</Text>
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