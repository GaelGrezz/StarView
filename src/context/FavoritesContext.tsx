import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game } from '../types/game';

// Clave de almacenamiento en almacenamiento local
const STORAGE_KEY = '@starview_favorites_v1';

interface FavoritesContextType {
  favorites: Game[];
  toggleFavorite: (game: Game) => void;
  isFavorite: (gameId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  loading: true,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar favoritos al iniciar la aplicación
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setFavorites(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error al cargar favoritos de AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar o eliminar un juego de la lista de favoritos
  const toggleFavorite = async (game: Game) => {
    try {
      let updated: Game[];
      const exists = favorites.some((item) => item.id === game.id);

      if (exists) {
        // Si existe, lo quitamos
        updated = favorites.filter((item) => item.id !== game.id);
      } else {
        // Si no existe, lo agregamos
        updated = [...favorites, game];
      }

      setFavorites(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error al guardar favorito:', error);
    }
  };

  // Verificar si un juego es favorito
  const isFavorite = (gameId: number) => {
    return favorites.some((item) => item.id === gameId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado simple para usar el contexto de favoritos en cualquier pantalla
export const useFavorites = () => useContext(FavoritesContext);
