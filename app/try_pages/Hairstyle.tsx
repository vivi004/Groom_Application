import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,  
  Dimensions, 
  StatusBar 
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Makeup_nav from './Makeup_nav';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HAIRSTYLE_OPTIONS = [
  { id: '1', image: require('../try_pages/try_img/Hairstyle_img/hr-1.jpg'), colors: ['#1A1A1A', '#3D3130', '#6B4C3E', '#A65E00', '#541A3F', '#B57914'] },
  { id: '2', image: require('../try_pages/try_img/Hairstyle_img/hr-2.jpg'), colors: ['#000000', '#2E1D16', '#4A3728', '#8C5423'] },
  { id: '3', image: require('../try_pages/try_img/Hairstyle_img/hr-3.jpg'), colors: ['#241C16', '#402E2A', '#734D3D', '#C98D5F', '#5C2B42'] },
  { id: '4', image: require('../try_pages/try_img/Hairstyle_img/hr-4.jpg'), colors: ['#121212', '#362822', '#634235', '#946333'] },
  { id: '5', image: require('../try_pages/try_img/Hairstyle_img/hr-5.jpg'), colors: ['#1C1C1C', '#4A3B33', '#825E4D', '#D49B6A'] },
];

const Hairstyle = () => {
  const [selectedId, setSelectedId] = useState('3');
  const [activeTab, setActiveTab] = useState('Hairstyle');
  const [isColorMode, setIsColorMode] = useState(false);

  const selectedOption = HAIRSTYLE_OPTIONS.find(item => item.id === selectedId);

  return (
    // SafeAreaView wraps the whole screen but edges control where padding is applied
    <SafeAreaView className="flex-1 bg-black" edges={['right', 'left']}>
      <StatusBar barStyle="light-content" />
      
      <View className="relative flex-1">
        {/* Main Hair Preview - Remains Full Screen */}
        {selectedOption && (
          <Image 
            source={selectedOption.image} 
            style={{ width: width, height: '100%' }} // Use 100% to fill the flex container
            className="absolute top-0 left-0"
            resizeMode="cover"
          />
        )}

        {/* Back Button - Top edge padding handled by nested SafeAreaView */}
        <SafeAreaView className="absolute top-0 left-0 w-full" edges={['top']}>
          <View className="px-4 py-2">
            <TouchableOpacity 
              onPress={() => isColorMode ? setIsColorMode(false) : router.back()}
              className="bg-white/20 w-10 h-10 items-center justify-center rounded-lg"
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Bottom Panel */}
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
                <View className="h-20 w-[1px] bg-white/40 mr-4" />
                {selectedOption?.colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white/20"
                    style={{ backgroundColor: color }}
                    onPress={() => console.log("Selected Color:", color)}
                  />
                ))}
              </View>
            ) : (
              HAIRSTYLE_OPTIONS.map((item) => (
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

      {/* Navigation Footer - Bottom edge padding handled by nested SafeAreaView */}
      <SafeAreaView edges={['bottom']} className="bg-white">
        <Makeup_nav activeTab={activeTab} setActiveTab={setActiveTab} />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Hairstyle;