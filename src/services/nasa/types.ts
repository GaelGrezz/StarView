export interface AstronomyMedia {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
}

export interface SearchStrategy {
  buildQuery(params: SearchParams): string;
}

export interface SearchParams {
  term?: string;
  category?: string;
  page?: number;
}