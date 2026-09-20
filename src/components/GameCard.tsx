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
 * Componente Tarjeta de Juego estilizado con temática Gamer/Dark Mode.
 * Muestra la miniatura, título, género, plataforma y permite marcar como favorito.
 */
export const GameCard: React.FC<GameCardProps> = ({ game, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  const isWeb = game.platform.toLowerCase().includes('web') || game.platform.toLowerCase().includes('browser');

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(game)}
    >
      {/* Imagen miniatura del juego */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: game.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Badge de Plataforma */}
        <View style={[styles.platformBadge, { backgroundColor: isWeb ? Colors.browserBadge : Colors.pcBadge }]}>
          <Ionicons
            name={isWeb ? 'globe-outline' : 'desktop-outline'}
            size={12}
            color="#FFF"
          />
          <Text style={styles.platformText}>{isWeb ? 'BROWSER' : 'PC WIN'}</Text>
        </View>

        {/* Botón de Favorito flotante */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(game)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={20}
            color={favorite ? Colors.favorite : Colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Contenido textual */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {game.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {game.short_description}
        </Text>

        <View style={styles.footer}>
          {/* Badge de Género */}
          <View style={styles.genreBadge}>
            <Text style={styles.genreText}>{game.genre}</Text>
          </View>

          {/* Publisher/Developer */}
          <Text style={styles.developerText} numberOfLines={1}>
            {game.developer}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  platformBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  platformText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 20,
    padding: 6,
  },
  content: {
    padding: 12,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  genreBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  genreText: {
    color: Colors.secondary,
    fontSize: 11,
    fontWeight: '600',
  },
  developerText: {
    color: Colors.textMuted,
    fontSize: 11,
    maxWidth: '50%',
  },
});

export default GameCard;
