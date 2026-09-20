import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game } from '../types/game';

const STORAGE_KEY = '@starview_favorites_v1';

// Función auxiliar resiliente para obtener datos del almacenamiento
const safeGetItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    // Si AsyncStorage falla por ser ejecucion en Expo Go o Web sin modulo nativo, intentamos localStorage o fallback
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignorar fallback error
    }
    return null;
  }
};

// Función auxiliar resiliente para guardar datos en el almacenamiento
const safeSetItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignorar fallback error
    }
  }
};

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

  // Cargar favoritos al iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedData = await safeGetItem(STORAGE_KEY);
      if (storedData) {
        setFavorites(JSON.parse(storedData));
      }
    } catch (error) {
      console.warn('Almacenamiento temporal en memoria activado');
    } finally {
      setLoading(false);
    }
  };

  // Guardar o eliminar un juego de favoritos
  const toggleFavorite = async (game: Game) => {
    try {
      let updated: Game[];
      const exists = favorites.some((item) => item.id === game.id);

      if (exists) {
        updated = favorites.filter((item) => item.id !== game.id);
      } else {
        updated = [...favorites, game];
      }

      setFavorites(updated);
      await safeSetItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Error al guardar favorito en storage:', error);
    }
  };

  const isFavorite = (gameId: number) => {
    return favorites.some((item) => item.id === gameId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
