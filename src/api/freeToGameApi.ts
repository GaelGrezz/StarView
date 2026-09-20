import { Game, GameDetail, PlatformFilterType, SortByType } from '../types/game';

// Base URL oficial de la API de FreeToGame
const BASE_URL = 'https://www.freetogame.com/api';

/**
 * Servicio para realizar peticiones HTTP a la API de FreeToGame.
 * Fácil de entender y explicar en la presentación.
 */
export const FreeToGameAPI = {
  /**
   * Obtiene la lista de juegos filtrados por plataforma, categoría u ordenamiento.
   */
  async getGames(
    platform?: PlatformFilterType,
    category?: string,
    sortBy?: SortByType
  ): Promise<Game[]> {
    try {
      const params = new URLSearchParams();

      if (platform && platform !== 'all') {
        params.append('platform', platform);
      }
      if (category && category.trim() !== '' && category.toLowerCase() !== 'todas') {
        params.append('category', category.toLowerCase());
      }
      if (sortBy) {
        params.append('sort-by', sortBy);
      }

      const queryString = params.toString();
      const url = `${BASE_URL}/games${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data: Game[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la lista de juegos:', error);
      return [];
    }
  },

  /**
   * Obtiene la información detallada de un juego por su ID.
   */
  async getGameDetails(id: number): Promise<GameDetail | null> {
    try {
      const url = `${BASE_URL}/game?id=${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data: GameDetail = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al obtener detalle del juego con id ${id}:`, error);
      return null;
    }
  }
};
