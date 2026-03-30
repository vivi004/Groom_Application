import { apiClient } from './client';

export const BookingApi = {
  create: (data: any) => apiClient.post('/api/bookings', data),
  getByUser: () => apiClient.get('/api/bookings/my-bookings'),
};
