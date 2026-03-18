import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camera from '../../assets/icons/camera.svg';
import { useTheme } from '../../context/ThemeContext';
import Makeup_nav from './Makeup_nav';

const { width, height } = Dimensions.get('window');

const MAKEUP_OPTIONS = [
  { id: '1', image: require('../try_pages/try_img/Makeup_img/mk_2.jpg'), colors: ['#F9E4D9', '#E5B899', '#844E39', '#EDD1C4', '#D6A582'] },
  { id: '2', image: require('../try_pages/try_img/Makeup_img/mk_1.jpg'), colors: ['#F3D0C1', '#D4A387', '#72422E', '#EBC5B2', '#C69476'] },
  { id: '3', image: require('../try_pages/try_img/Makeup_img/mk_3.jpg'), colors: ['#FCEFE8', '#D8B199', '#965D46', '#F4DFD4', '#E0BC9E'] },
  { id: '4', image: require('../try_pages/try_img/Makeup_img/mk_4.jpg'), colors: ['#E9C6B5', '#B5846E', '#5E3023', '#DDB29F', '#A4745C'] },
  { id: '5', image: require('../try_pages/try_img/Makeup_img/mk_5.jpg'), colors: ['#FFF0E5', '#E9CBB7', '#AD7D66', '#F9E1D2', '#D9B49C'] },
];

const Makeup = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [selectedId, setSelectedId] = useState('1');
  const [activeTab, setActiveTab] = useState('Makeup');
  const [isColorMode, setIsColorMode] = useState(false);

  const selectedOption = MAKEUP_OPTIONS.find(item => item.id === selectedId);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Main Preview Container */}
      <View className="relative flex-1">
        {selectedOption && (
          <Image 
            source={selectedOption.image} 
            style={{ width: width, height: '100%' }} // Full screen height
            className="absolute top-0 left-0"
            resizeMode="cover"
          />
        )}

        {/* 1. TOP SAFE AREA: Header Overlay */}
        <SafeAreaView edges={['top']} className="absolute top-0 left-0 w-full">
          <View className="px-4 py-2">
            <TouchableOpacity 
              onPress={() => isColorMode ? setIsColorMode(false) : router.back()}
              className="w-10 h-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(236, 234, 234, 0.87)'}}
            >
              <ChevronLeft color="black" size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

{/* Camera Action Button */}
<View className="absolute bottom-[150px] w-full items-center">
  <TouchableOpacity
    activeOpacity={0.8}
    className="w-[68px] h-[68px] rounded-full border-[3px] border-[#D81B8C] items-center justify-center bg-[#ECEAEA]"
  >
    <Camera width={34} height={34} color="#D81B8C" />
  </TouchableOpacity>
</View>

        {/* Thumbnail / Color Selection Area */}
        <View className="absolute bottom-0 w-full bg-black/40 py-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {isColorMode ? (
              <View className="flex-row items-center">
                <Image 
                  source={selectedOption?.image} 
                  className="w-16 h-16 rounded-lg mr-4 border border-white"
                  resizeMode="cover"
                />
                <View className="h-12 w-[1px] bg-white/30 mr-4" />
                {selectedOption?.colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white/50"
                    style={{ backgroundColor: color }}
                    onPress={() => console.log("Color selected:", color)}
                  />
                ))}
              </View>
            ) : (
              MAKEUP_OPTIONS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedId(item.id);
                    setIsColorMode(true);
                  }}
                  className={`mr-4 rounded-2xl border-2 ${
                    selectedId === item.id ? 'border-[#D81B8C]' : 'border-transparent'
                  }`}
                >
                  <Image 
                    source={item.image} 
                    className="w-20 h-24 rounded-2xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>

      {/* 2. BOTTOM SAFE AREA: Fit Navigation Bar correctly */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: isDarkMode ? '#121212' : 'white' }}>
        <Makeup_nav activeTab={activeTab} setActiveTab={setActiveTab} />
      </SafeAreaView>
    </View>
  );
};

export default Makeup;