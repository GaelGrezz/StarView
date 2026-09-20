// Interfaz principal para la información básica de un juego desde la API FreeToGame
export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

// Requisitos mínimos del sistema para juegos de PC
export interface MinimumSystemRequirements {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
}

// Captura de pantalla del juego
export interface Screenshot {
  id: number;
  image: string;
}

// Detalle extendido de un juego obtenido por ID (/game?id=X)
export interface GameDetail extends Game {
  description: string;
  status: string;
  minimum_system_requirements?: MinimumSystemRequirements;
  screenshots?: Screenshot[];
}

// Filtros de plataforma disponibles
export type PlatformFilterType = 'all' | 'pc' | 'browser';

// Opciones de ordenamiento
export type SortByType = 'relevance' | 'popularity' | 'release-date' | 'alphabetical';
