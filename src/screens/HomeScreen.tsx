import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Game, PlatformFilterType } from '../types/game';
import { FreeToGameAPI } from '../api/freeToGameApi';
import Colors from '../theme/colors';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import PlatformFilter from '../components/PlatformFilter';
import CategoryChip from '../components/CategoryChip';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Cargar juegos desde la API externa al montar la pantalla o cambiar plataforma/categoría
  useEffect(() => {
    fetchGames();
  }, [selectedPlatform, selectedCategory]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const data = await FreeToGameAPI.getGames(selectedPlatform, selectedCategory);
      setGames(data);
    } catch (error) {
      console.error('Error al cargar juegos en HomeScreen:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchGames();
  };

  // Filtrado local en tiempo real por el texto de búsqueda
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.short_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [games, searchQuery]);

  // Navegar a la pantalla de detalle del juego
  const handleGamePress = (game: Game) => {
    navigation.navigate('GameDetail', { gameId: game.id, title: game.title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Catálogo Gamer</Text>
          <Text style={styles.headerSubtitle}>
            {filteredGames.length} juegos encontrados
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={handleGamePress} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.secondary}
            colors={[Colors.secondary, Colors.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.filterSection}>
            {/* Barra de búsqueda por texto */}
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

            {/* Selector de plataforma */}
            <PlatformFilter
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
            />

            {/* Carrusel de categorías */}
            <CategoryChip
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={Colors.secondary} />
              <Text style={styles.loadingText}>Cargando catálogo desde la API...</Text>
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyTitle}>No se encontraron juegos</Text>
              <Text style={styles.emptySubtitle}>
                Intenta cambiar los filtros de búsqueda o la categoría seleccionada.
              </Text>
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
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  filterSection: {
    marginTop: 12,
  },
  listContent: {
    padding: 16,
  },
  centerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 12,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default HomeScreen;