import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Game } from '../types/game';
import Colors from '../theme/colors';
import GameCard from '../components/GameCard';
import { useFavorites } from '../context/FavoritesContext';

interface FavoriteScreenProps {
  navigation: any;
}

export const FavoriteScreen: React.FC<FavoriteScreenProps> = ({ navigation }) => {
  const { favorites } = useFavorites();

  const handleGamePress = (game: Game) => {
    navigation.navigate('GameDetail', { gameId: game.id, title: game.title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} {favorites.length === 1 ? 'videojuego guardado' : 'videojuegos guardados'}
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={handleGamePress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="star-outline" size={54} color={Colors.favorite} />
            </View>
            <Text style={styles.emptyTitle}>¡Tu bóveda de favoritos está vacía!</Text>
            <Text style={styles.emptySubtitle}>
              Explora el catálogo principal y presiona el icono de la estrella ⭐ en cualquier juego para guardarlo aquí.
            </Text>
          </View>
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
    color: Colors.favorite,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoriteScreen;