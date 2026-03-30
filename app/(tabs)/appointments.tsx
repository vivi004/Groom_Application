import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { BookingService } from '@/services/booking.service';
import Loader from '@/components/common/Loader';
import { ARTISTS } from '@/data/artists';

// Build STYLISTS from ARTISTS data so names always match
const STYLISTS = ARTISTS.map((a, idx) => ({
  id: String(idx + 1),
  name: a.name,
  rating: a.rating,
  image: a.image,
}));

const TIME_SLOTS = {
  Morning: ['9.00 AM', '10.00 AM', '11.00 AM'],
  Afternoon: ['12.00 PM', '1.00 PM', '3.00 PM'],
  Evening: ['4.00 PM', '5.00 PM', '6.00 PM'],
};

const MOCK_BOOKED_DATA: Record<string, string[]> = {
  'Isha Mehra': ['10.00 AM', '5.00 PM'],
  'Kabir Styles': ['9.00 AM', '6.00 PM'],
  'Riya': ['12.00 PM', '4.00 PM'],
  'Afreen Khan': ['10.00 AM', '1.00 PM'],
  'Rajveer Singh': ['9.00 AM', '5.00 PM'],
  'Diya Ghosh': ['11.00 AM', '12.00 PM'],
  'Sanya Kapoor': ['10.00 AM', '1.00 PM'],
  'Aarav': ['9.00 AM', '3.00 PM'],
  'Fatima': ['11.00 AM', '5.00 PM'],
};

const Appointment = () => {
  const { initialStylist } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  const handleHome = () => router.replace('/home');

  // Move the pre-selected artist to the front of the list
  const orderedStylists = useMemo(() => {
    if (!initialStylist) return STYLISTS;
    const idx = STYLISTS.findIndex(s => s.name === initialStylist);
    if (idx <= 0) return STYLISTS;
    const reordered = [...STYLISTS];
    const [selected] = reordered.splice(idx, 1);
    return [selected, ...reordered];
  }, [initialStylist]);

  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-50';

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

  const [selectedDateObj, setSelectedDateObj] = useState(next30Days[0]);
  const [selectedStylist, setSelectedStylist] = useState<string>((initialStylist as string) || orderedStylists[0].name);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedBookings, setConfirmedBookings] = useState<Record<string, string[]>>(() => {
    const todayStr = new Date().toDateString();
    const initialMap: Record<string, string[]> = {};
    for (const [stylist, times] of Object.entries(MOCK_BOOKED_DATA)) {
      initialMap[`${stylist}_${todayStr}`] = times;
    }
    return initialMap;
  });

  useEffect(() => {
    if (initialStylist) {
      setSelectedStylist(initialStylist as string);
    }
  }, [initialStylist]);

  const isSlotAvailable = useCallback((timeStr: string) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(/[:\.]/).map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const slotDate = new Date(selectedDateObj.fullDate);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate > new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // closed if < 2 hours away
  }, [selectedDateObj]);

  const handleBooking = async () => {
    setLoading(true);
    try {
      await BookingService.bookAppointment({
        stylist: selectedStylist,
        date: selectedDateObj.fullDate.toISOString(),
        time: selectedTime,
      });

      // Update local state for immediate UI feedback
      const bookingKey = `${selectedStylist}_${selectedDateObj.fullDate.toDateString()}`;
      const currentDateBookings = confirmedBookings[bookingKey] || [];
      setConfirmedBookings({
        ...confirmedBookings,
        [bookingKey]: [...currentDateBookings, selectedTime]
      });

      Alert.alert("Success", `Appointment booked with ${selectedStylist} on ${selectedDateObj.dateNum} ${selectedDateObj.monthName} at ${selectedTime}`,
        [
          {
            text: "OK",
            onPress: () => {
              setSelectedTime('');
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      <Loader visible={loading} fullScreen message="Booking your appointment..." />
      {/* Header */}
      <View className="flex-row items-center px-4 py-6">
        <TouchableOpacity onPress={handleHome} hitSlop={20}>
          <ChevronLeft color={isDarkMode ? 'white' : 'black'} size={28} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-2xl font-bold text-[#D81B8C] mr-7">Book Appointment</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="px-4"
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* Calendar Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
          {next30Days.map((item, index) => {
            const isSelected = selectedDateObj.fullDate.toDateString() === item.fullDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => { setSelectedDateObj(item); setSelectedTime(''); }}
                className={`items-center justify-center w-16 h-20 mr-3 rounded-xl ${isSelected ? 'bg-[#D81B8C]' : isDarkMode ? 'bg-gray-800' : 'bg-[#F3F4F6]'}`}
              >
                <Text className={`text-lg font-bold ${isSelected ? 'text-white' : textColor}`}>{item.dateNum}</Text>
                <Text className={`text-xs ${isSelected ? 'text-white' : subTextColor}`}>{item.dayName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Choose Wedding Stylist Section */}
        <Text className={`text-lg font-bold mt-8 mb-4 ${textColor}`}>Choose Wedding Stylists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {orderedStylists.map((stylist) => {
            const isSelected = selectedStylist === stylist.name;
            return (
              <TouchableOpacity key={stylist.id} onPress={() => setSelectedStylist(stylist.name)} className="mr-5 items-center">
                <View className={`rounded-xl border-2 overflow-hidden ${isSelected ? 'border-[#D81B8C]' : 'border-transparent'}`}>
                  <Image source={stylist.image} className="w-16 h-16 bg-gray-200" />
                </View>
                <Text className={`mt-2 font-bold ${isSelected ? 'text-[#D81B8C]' : (isDarkMode ? 'text-white' : 'text-black')}`}>{stylist.name}</Text>
                <View className="flex-row items-center">
                  <Star size={10} color="#FFD700" fill="#FFD700" />
                  <Text className={`text-xs ml-1 ${subTextColor}`}>{stylist.rating}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Select Timing Section */}
        <Text className={`text-lg font-bold mt-8 mb-4 ${textColor}`}>Select Timing</Text>
        
        {Object.entries(TIME_SLOTS).map(([period, slots]) => (
          <View key={period} className="mb-6">
            <Text className={`font-semibold mb-4 ${textColor}`}>{period}</Text>
            <View className="flex-row justify-between">
              {slots.map((time) => {
                const bookingKey = `${selectedStylist}_${selectedDateObj.fullDate.toDateString()}`;
                const isBooked = confirmedBookings[bookingKey]?.includes(time);
                const isClosed = !isSlotAvailable(time);   // within 2 hours → closed
                const isSelected = selectedTime === time && !isBooked && !isClosed;

                return (
                  <TouchableOpacity
                    key={time}
                    disabled={isBooked || isClosed}
                    onPress={() => setSelectedTime(prev => prev === time ? '' : time)}
                    style={{ opacity: isClosed ? 0.4 : 1 }}
                    className={`w-[31%] py-3 rounded-lg flex-row justify-center items-center shadow-sm ${
                      isClosed
                        ? isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                        : isBooked
                          ? 'bg-[#555555]'
                          : isSelected
                            ? 'bg-[#D81B8C]'
                            : isDarkMode ? 'bg-gray-800' : 'bg-[#F3F4F6]'
                    }`}
                  >
                    <Text className={`text-[12px] font-bold ${
                      isClosed ? (isDarkMode ? 'text-gray-500' : 'text-gray-400')
                        : isBooked || isSelected ? 'text-white'
                        : textColor
                    }`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View className="h-4" />
      </ScrollView>

      {/* Book Appointment Button - Fixed above the tab bar */}
      <View 
        className="absolute w-full px-4" 
        style={{ bottom: 110 }}
      >
        <TouchableOpacity
          onPress={handleBooking}
          disabled={!selectedTime}
          className={`py-5 rounded-2xl items-center shadow-lg ${selectedTime ? 'bg-[#D81B8C]' : 'bg-gray-300'}`}
        >
          <Text className="text-white text-lg font-bold">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Appointment;