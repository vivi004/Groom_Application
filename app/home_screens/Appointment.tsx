import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { ChevronLeft, Star } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; // Keep this one


const STYLISTS = [
    { id: '1', name: 'Priya', rating: '4.5', image: require('../../assets/stylist_img/neha_sharma.png') },

  { id: '2', name: 'Aman', rating: '4.5', image: require('../../assets/stylist_img/aman_verma.jpg') },

  { id: '3', name: 'Isha', rating: '4.5', image: require('../../assets/stylist_img/sanya_mehta.jpg') },

  { id: '4', name: 'Kabir', rating: '4.5', image: require('../../assets/stylist_img/aman_verma.jpg') },

  { id: '5', name: 'Riya', rating: '4.9', image: require('../../assets/artists/riya.jpg') },

  { id: '6', name: 'Afreen', rating: '4.6', image: require('../../assets/artists/afreen.jpg') },

  { id: '7', name: 'Rajveer', rating: '4.5', image: require('../../assets/artists/rajveer.jpg') },

  { id: '8', name: 'Diya', rating: '4.7', image: require('../../assets/artists/diya.jpg') },

  { id: '9', name: 'Sanya', rating: '4.4', image: require('../../assets/artists/sanya.jpg') },

  { id: '10', name: 'Aarav', rating: '4.5', image: require('../../assets/artists/aarav.jpg') },

  { id: '11', name: 'Fatima', rating: '4.9', image: require('../../assets/artists/fatima.jpg') },
];

const TIME_SLOTS = {
  Morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '01:00 PM', '03:00 PM'],
  Evening: ['04:00 PM', '05:00 PM', '07:00 PM'],
};

const Appointment = () => {
  const { initialStylist } = useLocalSearchParams(); // Catch the artist name from navigation
  const handleHome = () => router.replace('/home_screens/Homepage');

  const next30Days = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(startOfToday);
      date.setDate(startOfToday.getDate() + i);
      return {
        fullDate: date,
        dateNum: date.getDate().toString(),
        dayName: date.toLocaleString('default', { weekday: 'short' }),
        monthName: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
      };
    });
  }, []);

  // Selection States - Initialized with param if available
  const [selectedDateObj, setSelectedDateObj] = useState(next30Days[0]);
  const [selectedStylist, setSelectedStylist] = useState(initialStylist || STYLISTS[0].name);
  const [selectedTime, setSelectedTime] = useState('');

  // Sync state if initialStylist changes
  useEffect(() => {
    if (initialStylist) {
      setSelectedStylist(initialStylist as string);
    }
  }, [initialStylist]);

  const isSlotAvailable = useCallback((timeStr: string) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const slotDate = new Date(selectedDateObj.fullDate);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate > new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
  }, [selectedDateObj]);

  const handleBooking = () => {
    Alert.alert("Success", `Appointment booked with ${selectedStylist} on ${selectedDateObj.dateNum} ${selectedDateObj.monthName} at ${selectedTime}`,
      [
        {
          text: "OK",
          onPress: () => router.replace('/home_screens/Homepage')
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-50">
        <TouchableOpacity onPress={handleHome} hitSlop={20}>
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Book Appointment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <Text className="text-lg font-bold text-gray-800 mt-4">{selectedDateObj.monthName} {selectedDateObj.year}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4">
          {next30Days.map((item, index) => {
            const isSelected = selectedDateObj.fullDate.toDateString() === item.fullDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => { setSelectedDateObj(item); setSelectedTime(''); }}
                className={`items-center justify-center w-16 h-20 mr-3 rounded-2xl ${isSelected ? 'bg-[#D81B8C]' : 'bg-gray-100'}`}
              >
                <Text className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{item.dateNum}</Text>
                <Text className={`text-xs uppercase ${isSelected ? 'text-white' : 'text-gray-500'}`}>{item.dayName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text className="text-lg font-bold text-gray-800 mt-4 mb-4">Choose Wedding Stylist</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {STYLISTS.map((stylist) => {
            const isSelected = selectedStylist === stylist.name;
            return (
              <TouchableOpacity key={stylist.id} onPress={() => setSelectedStylist(stylist.name)} className="mr-5 items-center">
                <View className={`p-1 rounded-2xl border-2 ${isSelected ? 'border-[#D81B8C]' : 'border-transparent'}`}>
                  <Image source={stylist.image} className="w-20 h-20 rounded-xl bg-gray-200" />
                </View>
                <Text className={`mt-2 font-semibold ${isSelected ? 'text-[#D81B8C]' : 'text-black'}`}>{stylist.name}</Text>
                <View className="flex-row items-center">
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text className="text-xs text-gray-500 ml-1">{stylist.rating}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text className="text-lg font-bold text-gray-800 mt-8 mb-4">Select Timing</Text>
        {Object.entries(TIME_SLOTS).map(([period, slots]) => (
          <View key={period} className="mb-4">
            <Text className="font-semibold text-gray-500 mb-3">{period}</Text>
            <View className="flex-row flex-wrap">
              {slots.map((time) => {
                const available = isSlotAvailable(time);
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    disabled={!available}
                    onPress={() => setSelectedTime(time)}
                    className={`px-2 py-3 rounded-xl w-[30%] mr-[3%] mb-3 items-center border ${
                      !available ? 'bg-gray-50 border-gray-100' : isSelected ? 'bg-[#D81B8C] border-[#D81B8C]' : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text className={`text-[11px] font-bold ${!available ? 'text-gray-300' : isSelected ? 'text-white' : 'text-black'}`}>{time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        <View className="h-32" /> 
      </ScrollView>

      <View className="absolute bottom-6 w-full px-4 bg-white/80 pb-2">
        <TouchableOpacity 
          onPress={handleBooking}
          disabled={!selectedTime} 
          className={`py-4 rounded-2xl items-center shadow-lg ${selectedTime ? 'bg-[#D81B8C]' : 'bg-gray-300'}`}
        >
          <Text className="text-white text-lg font-bold">Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Appointment;