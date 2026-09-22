import * as FileSystem from "expo-file-system/legacy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AstronomyMedia } from "../nasa/types";

const FAVORITES_KEY = "@starview_favorites_v1";

export const FavoritesStorage = {
  async getFavorites(): Promise<AstronomyMedia[]> {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      return json ? JSON.parse(json) : [];
    } catch (e) {
      console.error("Error al obtener favoritos:", e);
      return [];
    }
  },

  async saveFavorite(item: AstronomyMedia): Promise<AstronomyMedia[]> {
    try {
      const currentFavorites = await this.getFavorites();
      const exists = currentFavorites.some((fav) => fav.id === item.id);
      if (exists) return currentFavorites;

      const fileExtension = item.imageUrl.split(".").pop() || "jpg";
      const localUri = `${FileSystem.documentDirectory}fav_${item.id}.${fileExtension}`;

      // La API legacy permite seguir utilizando downloadAsync sin lanzar advertencias ni errores
      const downloadResult = await FileSystem.downloadAsync(item.imageUrl, localUri);

      const newItem: AstronomyMedia = {
        ...item,
        imageUrl: downloadResult.uri,
      };

      const updated = [...currentFavorites, newItem];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Error al guardar favorito:", e);
      return await this.getFavorites();
    }
  },

  async removeFavorite(id: string): Promise<AstronomyMedia[]> {
    try {
      const currentFavorites = await this.getFavorites();
      const itemToRemove = currentFavorites.find((fav) => fav.id === id);

      if (itemToRemove && itemToRemove.imageUrl.startsWith("file://")) {
        await FileSystem.deleteAsync(itemToRemove.imageUrl, { idempotent: true });
      }

      const updated = currentFavorites.filter((fav) => fav.id !== id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Error al eliminar favorito:", e);
      return await this.getFavorites();
    }
  },
};