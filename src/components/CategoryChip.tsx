import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../theme/colors';

// Lista de géneros principales de FreeToGame
export const POPULAR_CATEGORIES = [
  'Todas',
  'MMORPG',
  'Shooter',
  'PvP',
  'Anime',
  'Strategy',
  'Action',
  'MOBA',
  'Fighting',
  'Survival',
  'Battle Royale',
  'Card',
  'Sports'
];

interface CategoryChipProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * Carrusel horizontal de categorías/géneros de videojuegos.
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {POPULAR_CATEGORIES.map((cat) => {
        const active = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingRight: 12,
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  chipActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: Colors.secondary,
  },
  text: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  textActive: {
    color: Colors.secondary,
    fontWeight: '700',
  },
});

export default CategoryChip;
