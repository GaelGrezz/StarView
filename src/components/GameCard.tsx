import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Game } from '../types/game';
import Colors from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

interface GameCardProps {
  game: Game;
  onPress: (game: Game) => void;
}

/**
 * Componente sencillo de Tarjeta de Juego para proyectos estudiantiles.
 */
export const GameCard: React.FC<GameCardProps> = ({ game, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  const isWeb = game.platform.toLowerCase().includes('web') || game.platform.toLowerCase().includes('browser');

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(game)}
    >
      {/* Imagen del juego */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: game.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Badge de Plataforma */}
        <View style={[styles.platformBadge, { backgroundColor: isWeb ? Colors.browserBadge : Colors.pcBadge }]}>
          <Text style={styles.platformText}>{isWeb ? 'Navegador' : 'PC'}</Text>
        </View>

        {/* Botón de estrella de favorito */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(game)}
        >
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={18}
            color={favorite ? Colors.favorite : '#FFF'}
          />
        </TouchableOpacity>
      </View>

      {/* Info básica */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {game.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {game.short_description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.genreTag}>{game.genre}</Text>
          <Text style={styles.developerText} numberOfLines={1}>{game.developer}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  imageContainer: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  platformBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  platformText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 5,
  },
  content: {
    padding: 10,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreTag: {
    color: Colors.secondary,
    fontSize: 11,
    fontWeight: '600',
  },
  developerText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
});

export default GameCard;
