import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Search from '../home_pages/Search';
import Try from '../home_pages/Try';
import Services from '../home_pages/Services';
import Ideas from '../home_pages/Ideas';
import Packages from '../home_pages/Packages';
import Stylists from '../home_pages/Stylists';
import Navbar from './Navbar';

const Homepage = () => {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Search />
        <Try />
        <Services />
        <Ideas />
        <Packages />
        <Stylists />
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default Homepage;