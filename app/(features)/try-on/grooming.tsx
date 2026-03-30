import React, { useState } from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  StatusBar,
} from 'react-native';
import { ChevronLeft, Download } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import MakeupNav from '@/components/features/MakeupNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

const { width, height } = Dimensions.get('window');

const GROOMING_OPTIONS = [
  { id: '1', image: require('../../../assets/images/try_img/Groom_img/gr-1.jpg'), colors: ['#D2B48C', '#C19A6B', '#FF0000', '#FFD700', '#D81B8C', '#BF00FF'] },
  { id: '2', image: require('../../../assets/images/try_img/Groom_img/gr-2.jpg'), colors: ['#000000', '#FFFFFF', '#36454F', '#000080'] },
  { id: '3', image: require('../../../assets/images/try_img/Groom_img/gr-3.jpg'), colors: ['#F5F5DC', '#E1C16E', '#800000', '#006400'] },
  { id: '4', image: require('../../../assets/images/try_img/Groom_img/gr-4.jpg'), colors: ['#1A1A1A', '#4B0082', '#0000FF', '#FF4500'] },
  { id: '5', image: require('../../../assets/images/try_img/Groom_img/gr-5.jpg'), colors: ['#C0C0C0', '#B87333', '#40E0D0', '#FF69B4'] },
];

const Grooming = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [selectedId, setSelectedId] = useState('3');
  const [activeTab, setActiveTab] = useState('Grooming');
  const [isColorMode, setIsColorMode] = useState(false);

  const selectedOption = GROOMING_OPTIONS.find(item => item.id === selectedId);

  return (
    // Outer container - We do NOT wrap the whole thing in SafeAreaView 
    // to allow the image to be full screen.
    <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>

      
      <View className="relative flex-1">
        {/* Main Grooming Preview - Edge to Edge */}
        {selectedOption && (
          <Image 
            source={selectedOption.image} 
            style={{ width: width, height: '100%' }} 
            className="absolute top-0 left-0"
            resizeMode="cover"
          />
        )}

        {/* Header - Use SafeAreaView here with 'top' edge only */}
        <SafeAreaView edges={['top']} className="absolute top-0 left-0 w-full">
          <View className="px-4 py-2 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => isColorMode ? setIsColorMode(false) : router.replace('/(tabs)/home')}
              className="w-10 h-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(236, 234, 234, 0.87)'}}
            >
              <ChevronLeft color="black" size={24} />
            </TouchableOpacity>

            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(236, 234, 234, 0.87)' }}
            >
              <Download color="black" size={20} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Bottom Interaction Panel */}
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
                  className="w-16 h-16 rounded-lg mr-4 border border-white/50"
                  resizeMode="cover"
                />
                <View className="h-16 w-[2px] bg-white/40 mr-4 rounded-full" />
                {selectedOption?.colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white/10"
                    style={{ backgroundColor: color }}
                    onPress={() => {}}
                  />
                ))}
              </View>
            ) : (
              GROOMING_OPTIONS.map((item) => (
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

      {/* Navigation Footer - Wrapping this in SafeAreaView with 'bottom' edge ensures fit */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: isDarkMode ? '#121212' : 'white' }}>
        <MakeupNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </SafeAreaView>
    </View>
  );
};

export default Grooming;