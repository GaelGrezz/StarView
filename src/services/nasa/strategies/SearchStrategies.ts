import { SearchStrategy, SearchParams } from '../types';

export class GeneralSearchStrategy implements SearchStrategy {
  buildQuery(params: SearchParams): string {
    const term = params.term ? encodeURIComponent(params.term) : 'space';
    return `q=${term}&media_type=image`;
  }
}

export class PlanetsCategoryStrategy implements SearchStrategy {
  buildQuery(params: SearchParams): string {
    const term = params.term ? encodeURIComponent(params.term) : 'planet';
    return `q=${term}%20planet&media_type=image`;
  }
}

export class GalaxiesCategoryStrategy implements SearchStrategy {
  buildQuery(params: SearchParams): string {
    const term = params.term ? encodeURIComponent(params.term) : 'galaxy';
    return `q=${term}%20galaxy&media_type=image`;
  }
}

export class SearchStrategyFactory {
  private static strategies: Record<string, SearchStrategy> = {
    planets: new PlanetsCategoryStrategy(),
    galaxies: new GalaxiesCategoryStrategy(),
    default: new GeneralSearchStrategy(),
  };

  static getStrategy(category?: string): SearchStrategy {
    if (!category || !this.strategies[category.toLowerCase()]) {
      return this.strategies['default'];
    }
    return this.strategies[category.toLowerCase()];
  }

  static registerStrategy(categoryKey: string, strategy: SearchStrategy): void {
    this.strategies[categoryKey.toLowerCase()] = strategy;
  }
}