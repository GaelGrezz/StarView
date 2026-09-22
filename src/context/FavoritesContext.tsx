import React, { createContext, useContext, useState, useEffect } from "react";
import { AstronomyMedia } from "../services/nasa/types";
import { FavoritesStorage } from "../services/storage/favoritesStorage";

interface FavoritesContextData {
  favorites: AstronomyMedia[];
  toggleFavorite: (item: AstronomyMedia) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<AstronomyMedia[]>([]);

  useEffect(() => {
    FavoritesStorage.getFavorites().then(setFavorites);
  }, []);

  const toggleFavorite = async (item: AstronomyMedia) => {
    const exists = favorites.some((fav) => fav.id === item.id);
    if (exists) {
      const updated = await FavoritesStorage.removeFavorite(item.id);
      setFavorites(updated);
    } else {
      const updated = await FavoritesStorage.saveFavorite(item);
      setFavorites(updated);
    }
  };

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);