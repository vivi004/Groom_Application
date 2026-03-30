import { ArtistApi } from '@/api/artist.api';

export const ArtistService = {
  getArtists: async () => {
    try {
      const { data } = await ArtistApi.getAll();
      return data;
    } catch (error) {
      // Suppress the error and return null so the UI can gracefully use static fallbacks
      return null;
    }
  },

  getArtistById: async (id: string) => {
    try {
      const { data } = await ArtistApi.getById(id);
      return data;
    } catch (error) {
      return null;
    }
  }
};
