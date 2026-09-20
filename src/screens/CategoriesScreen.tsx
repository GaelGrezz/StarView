import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Game } from '../types/game';
import { FreeToGameAPI } from '../api/freeToGameApi';
import Colors from '../theme/colors';
import GameCard from '../components/GameCard';

// Categorías destacadas con sus iconos correspondientes
const CATEGORY_CARDS = [
  { id: 'shooter', name: 'Shooter', icon: 'crosshair-outline', color: '#EF4444' },
  { id: 'mmorpg', name: 'MMORPG', icon: 'shield-half-outline', color: '#8B5CF6' },
  { id: 'pvp', name: 'PvP', icon: 'flash-outline', color: '#F59E0B' },
  { id: 'anime', name: 'Anime', icon: 'sparkles-outline', color: '#EC4899' },
  { id: 'strategy', name: 'Estrategia', icon: 'grid-outline', color: '#3B82F6' },
  { id: 'action', name: 'Acción', icon: 'flame-outline', color: '#10B981' },
  { id: 'moba', name: 'MOBA', icon: 'people-outline', color: '#06B6D4' },
  { id: 'card', name: 'Cartas', icon: 'albums-outline', color: '#6366F1' },
];

interface CategoriesScreenProps {
  navigation: any;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('shooter');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategoryGames(selectedCategory);
  }, [selectedCategory]);

  const fetchCategoryGames = async (category: string) => {
    setLoading(true);
    try {
      const data = await FreeToGameAPI.getGames(undefined, category);
      setGames(data);
    } catch (error) {
      console.error('Error al cargar juegos de categoría:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGamePress = (game: Game) => {
    navigation.navigate('GameDetail', { gameId: game.id, title: game.title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorías & Géneros</Text>
        <Text style={styles.headerSubtitle}>
          Selecciona una categoría para explorar la API
        </Text>
      </View>

      {/* Grid de tarjetas de categoría */}
      <View style={styles.gridContainer}>
        {CATEGORY_CARDS.map((item) => {
          const active = selectedCategory.toLowerCase() === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryCard,
                active && { borderColor: item.color, backgroundColor: 'rgba(30, 41, 59, 0.9)' },
              ]}
              onPress={() => setSelectedCategory(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={active ? item.color : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryCardText,
                  active && { color: item.color, fontWeight: 'bold' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Título de la sección de resultados */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Juegos en género "{selectedCategory.toUpperCase()}" ({games.length})
        </Text>
      </View>

      {/* Lista de juegos filtrada */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={handleGamePress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={Colors.secondary} />
              <Text style={styles.loadingText}>Consultando la API...</Text>
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No hay juegos disponibles en esta categoría.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  categoryCard: {
    width: '23%',
    backgroundColor: Colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  categoryCardText: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surface,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 16,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 12,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 13,
  },
});

export default CategoriesScreen;