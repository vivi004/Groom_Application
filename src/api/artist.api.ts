import { apiClient } from './client';

export const ArtistApi = {
  getAll: () => apiClient.get('/api/artists'),
  getById: (id: string) => apiClient.get(`/api/artists/${id}`),
};
