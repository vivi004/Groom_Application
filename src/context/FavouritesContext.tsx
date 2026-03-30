import React, { createContext, useContext, useState } from 'react';

// Define the shape of our Idea/Favorite item
export interface IdeaItem {
  id: number;
  title: string;
  price: string;
  artist: string;
  desc: string;
  image: any;
}

interface FavoritesContextType {
  favorites: IdeaItem[];
  toggleFavorite: (item: IdeaItem) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<IdeaItem[]>([]);

  const toggleFavorite = (item: IdeaItem) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
export default FavoritesContext;