// src/services/nasa/NasaImageService.ts

import { AstronomyMedia, SearchParams } from './types';
import { SearchStrategyFactory } from './strategies/SearchStrategies';

export class NasaImageService {
  private static readonly BASE_URL = 'https://images-api.nasa.gov/search';

  /**
   * Ejecuta la consulta aplicando la estrategia correspondiente
   */
  static async searchImages(params: SearchParams): Promise<AstronomyMedia[]> {
    try {
      // 1. Seleccionar estrategia según la categoría seleccionada
      const strategy = SearchStrategyFactory.getStrategy(params.category);
      const queryString = strategy.buildQuery(params);

      // 2. Realizar petición HTTP
      const response = await fetch(`${this.BASE_URL}?${queryString}`);
      if (!response.ok) {
        throw new Error(`Error en la API de la NASA: ${response.statusText}`);
      }

      const data = await response.json();

      // 3. Normalizar datos de la API de la NASA al formato interno
      return this.mapResponseToDomain(data);
    } catch (error) {
      console.error('NasaImageService Error:', error);
      throw error;
    }
  }

  /**
   * Mapper: Aísla a la UI de la estructura interna de la NASA API
   */
  private static mapResponseToDomain(apiResponse: any): AstronomyMedia[] {
  const items = apiResponse?.collection?.items || [];

  return items
    .filter((item: any) => item.links && item.links.length > 0)
    .map((item: any): AstronomyMedia => {
      const itemData = item.data?.[0] || {};
      
      // Obtener el enlace de la imagen
      let imageLink = item.links?.find((l: any) => l.rel === 'preview' || l.render === 'image')?.href || '';

      // FORCE HTTPS: Convierte http:// a https:// para evitar bloqueos del SO
      if (imageLink.startsWith('http://')) {
        imageLink = imageLink.replace('http://', 'https://');
      }

      return {
        id: itemData.nasa_id || Math.random().toString(),
        title: itemData.title || 'Sin título',
        description: itemData.description || 'Sin descripción.',
        imageUrl: imageLink,
        category: itemData.keywords?.[0] || 'General',
        date: itemData.date_created,
      };
    });
} 
}