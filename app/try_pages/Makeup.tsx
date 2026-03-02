import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  StatusBar,
} from 'react-native';
import { ChevronLeft, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Makeup_nav from './Makeup_nav';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [selectedId, setSelectedId] = useState('1');
  const [activeTab, setActiveTab] = useState('Makeup');
  const [isColorMode, setIsColorMode] = useState(false);

  const selectedOption = MAKEUP_OPTIONS.find(item => item.id === selectedId);

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      
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
              className="bg-white/20 w-10 h-10 items-center justify-center rounded-lg"
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Camera Action Button */}
        {!isColorMode && (
          <View className="absolute bottom-48 w-full items-center">
            <TouchableOpacity 
              activeOpacity={0.8}
              className="w-20 h-20 rounded-full border-2 border-[#D81B8C] items-center justify-center bg-white/10"
            >
              <View className="w-16 h-16 rounded-full bg-[#D81B8C] items-center justify-center">
                <Camera color="white" size={30} />
              </View>
            </TouchableOpacity>
          </View>
        )}

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
      <SafeAreaView edges={['bottom']} className="bg-white">
        <Makeup_nav activeTab={activeTab} setActiveTab={setActiveTab} />
      </SafeAreaView>
    </View>
  );
};

export default Makeup;