/// <reference types="nativewind/types" />
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
import Bell from '../../../assets/icons/Bell.svg';
import Searchicon from '../../../assets/icons/search.svg';
import { useTheme } from '../../context/ThemeContext';
import PaginationDots from '../common/PaginationDots';

const { width } = Dimensions.get('window');

const Search = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const bannerImages = [
    require('../../../assets/homepage_images/searchbg.jpg'),
    require('../../../assets/homepage_images/searchbg.jpg'),
    require('../../../assets/homepage_images/searchbg.jpg'),
  ];

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View className="w-full h-[400px]">
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
            <View className="absolute inset-0 bg-white/10 backdrop-blur-lg" />
          </ImageBackground>
        )}
      />
      <View className="absolute top-0 w-full">
        <View
          className="flex-row items-center px-4 w-full"
          style={{
            paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40)
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/profile' as any)}
            className="border-[3px] border-[#D81B8C] rounded-full overflow-hidden w-16 h-16"
          >
            <Image
              source={require('../../../assets/homepage_images/searchlogo.jpg')}
              className="w-full h-full"
              resizeMode='cover'
            />
          </TouchableOpacity>

          <BlurView
            intensity={35}
            tint="light"
            className="flex-1 flex-row items-center rounded-2xl px-4 h-[52px] mx-3"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              overflow: 'hidden'
            }}
          >
            <Searchicon width={22} height={22} color="rgba(255, 255, 255, 0.85)" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              className="flex-1 ml-2 text-[16px] text-white"
            />
          </BlurView>

          <TouchableOpacity className="relative mr-1" activeOpacity={0.7}>
            <Bell width={32} height={32} color="#D81B8C" />
            <View className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white bg-[#D81B8C]">
              <Text className="text-white text-[9px] font-bold">1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

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
// Search feature component for Homepage
