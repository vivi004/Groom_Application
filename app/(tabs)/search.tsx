import React from 'react';
import { View, ScrollView } from 'react-native';
import Search from '../../src/components/features/Search';
import { useTheme } from '@/context/ThemeContext';

const SearchScreen = () => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Search />
        {/* Additional search results or categories can be added here */}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;