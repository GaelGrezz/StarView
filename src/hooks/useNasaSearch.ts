// En tu hook useNasaSearch.ts
import { useState, useCallback } from 'react';
import { AstronomyMedia, SearchParams } from '../services/nasa/types';
import { NasaImageService } from '../services/nasa/NasaImageService';

export interface SectionData {
  title: string;
  data: AstronomyMedia[];
}

export function useNasaSearch() {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeSearch = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const rawResults = await NasaImageService.searchImages(params);
      
      // Agrupar los resultados por categoría
      const grouped = rawResults.reduce((acc: { [key: string]: AstronomyMedia[] }, item) => {
        const categoryName = item.category || 'General';
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
      }, {});

      // Convertir el objeto a un arreglo para SectionList
      const formattedSections: SectionData[] = Object.keys(grouped).map((category) => ({
        title: category.toUpperCase(),
        data: grouped[category],
      }));

      setSections(formattedSections);
    } catch (err: any) {
      setError(err.message || 'Error al consultar las imágenes');
      setSections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sections,
    loading,
    error,
    executeSearch,
  };
}