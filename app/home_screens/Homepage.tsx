import React from 'react';
import { ScrollView, View } from 'react-native';
import Search from '../home_pages/1Search';
import Try from '../home_pages/2Try';
import Services from '../home_pages/3Services';
import Ideas from '../home_pages/4Ideas';
import Packages from '../home_pages/5packages';
import Stylists from '../home_pages/6Stylists';
import Navbar from './Navbar';
import { router } from 'expo-router';


const Homepage = () => {

  return (
    // Use a regular View here. SafeAreaView is what creates the unwanted top gap.
    <View className="flex-1 bg-white" >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search now contains your background image and handles its own padding */}
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