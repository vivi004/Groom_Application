import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Search from '../../src/components/features/Search';
import TryOn from '@/components/features/TryOn';
import Services from '@/components/features/Services';
import Ideas from '@/components/features/Ideas';
import Packages from '@/components/features/Packages';
import Stylists from '@/components/features/Stylists';

const Homepage = () => {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Search />
        <TryOn />
        <Services />
        <Ideas />
        <Packages />
        <Stylists />
      </ScrollView>
    </View>
  );
};

export default Homepage;