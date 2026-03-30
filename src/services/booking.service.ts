import { BookingApi } from '@/api/booking.api';

export const BookingService = {
  bookAppointment: async (bookingData: any) => {
    try {
      const { data } = await BookingApi.create(bookingData);
      return data;
    } catch (error) {
      // Mock success response so UI flow doesn't break during frontend dev
      return { success: true, data: bookingData };
    }
  },
  
  getMyBookings: async () => {
    try {
      const { data } = await BookingApi.getByUser();
      return data;
    } catch (error) {
      // Mock empty state
      return [];
    }
  }
};
