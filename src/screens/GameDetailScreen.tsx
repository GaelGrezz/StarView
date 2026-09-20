import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GameDetail } from '../types/game';
import { FreeToGameAPI } from '../api/freeToGameApi';
import Colors from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

interface GameDetailScreenProps {
  route: any;
  navigation: any;
}

const { width } = Dimensions.get('window');

export const GameDetailScreen: React.FC<GameDetailScreenProps> = ({ route, navigation }) => {
  const { gameId } = route.params;
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchDetail();
  }, [gameId]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const data = await FreeToGameAPI.getGameDetails(gameId);
      setGame(data);
    } catch (error) {
      console.error('Error al cargar detalles del juego:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGameUrl = () => {
    if (game?.game_url) {
      Linking.openURL(game.game_url).catch((err) =>
        console.error('No se pudo abrir la URL del juego:', err)
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.secondary} />
        <Text style={styles.loadingText}>Cargando información del juego...</Text>
      </SafeAreaView>
    );
  }

  if (!game) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>No se pudo cargar la información del juego.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(game.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner principal */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: game.thumbnail }} style={styles.bannerImage} resizeMode="cover" />

          {/* Botón de volver */}
          <TouchableOpacity style={styles.topNavButtonLeft} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>

          {/* Botón de favorito flotante */}
          <TouchableOpacity style={styles.topNavButtonRight} onPress={() => toggleFavorite(game)}>
            <Ionicons
              name={favorite ? 'star' : 'star-outline'}
              size={22}
              color={favorite ? Colors.favorite : '#FFF'}
            />
          </TouchableOpacity>

          {/* Overlay con Título y Género */}
          <View style={styles.bannerOverlay}>
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{game.genre.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{game.title}</Text>
          </View>
        </View>

        {/* Sección de Info Rápida */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="hardware-chip-outline" size={18} color={Colors.secondary} />
            <Text style={styles.infoLabel}>Plataforma</Text>
            <Text style={styles.infoValue}>{game.platform}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="business-outline" size={18} color={Colors.secondary} />
            <Text style={styles.infoLabel}>Desarrollador</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{game.developer}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="calendar-outline" size={18} color={Colors.secondary} />
            <Text style={styles.infoLabel}>Lanzamiento</Text>
            <Text style={styles.infoValue}>{game.release_date}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Botón de Acción Principal - Jugar Gratis */}
          <TouchableOpacity style={styles.playButton} onPress={handleOpenGameUrl} activeOpacity={0.85}>
            <Ionicons name="open-outline" size={20} color="#FFF" />
            <Text style={styles.playButtonText}>IR AL SITIO OFICIAL DEL JUEGO</Text>
          </TouchableOpacity>

          {/* Descripción Completa */}
          <Text style={styles.sectionHeader}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {game.description || game.short_description}
          </Text>

          {/* Capturas de Pantalla (Screenshots) */}
          {game.screenshots && game.screenshots.length > 0 && (
            <View style={styles.screenshotsSection}>
              <Text style={styles.sectionHeader}>Capturas de Pantalla</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.screenshotScroll}>
                {game.screenshots.map((item) => (
                  <Image
                    key={item.id}
                    source={{ uri: item.image }}
                    style={styles.screenshotImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Requisitos Mínimos del Sistema */}
          {game.minimum_system_requirements && (
            <View style={styles.specsContainer}>
              <Text style={styles.sectionHeader}>Requisitos Mínimos (PC)</Text>
              <View style={styles.specsCard}>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Sistema Operativo:</Text>
                  <Text style={styles.specValue}>{game.minimum_system_requirements.os || 'N/A'}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Procesador (CPU):</Text>
                  <Text style={styles.specValue}>{game.minimum_system_requirements.processor || 'N/A'}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Memoria (RAM):</Text>
                  <Text style={styles.specValue}>{game.minimum_system_requirements.memory || 'N/A'}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Tarjeta Gráfica:</Text>
                  <Text style={styles.specValue}>{game.minimum_system_requirements.graphics || 'N/A'}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Almacenamiento:</Text>
                  <Text style={styles.specValue}>{game.minimum_system_requirements.storage || 'N/A'}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  bannerContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  topNavButtonLeft: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 20,
    padding: 8,
  },
  topNavButtonRight: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 20,
    padding: 8,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  genreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  genreText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
    paddingVertical: 12,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  infoLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  infoValue: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 24,
    elevation: 3,
  },
  playButtonText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 8,
  },
  descriptionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  screenshotsSection: {
    marginBottom: 20,
  },
  screenshotScroll: {
    flexDirection: 'row',
  },
  screenshotImage: {
    width: width * 0.7,
    height: 150,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  specsContainer: {
    marginTop: 8,
  },
  specsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    gap: 10,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.4)',
    paddingBottom: 6,
  },
  specLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    width: '40%',
  },
  specValue: {
    color: Colors.textPrimary,
    fontSize: 12,
    width: '58%',
    textAlign: 'right',
  },
});

export default GameDetailScreen;
