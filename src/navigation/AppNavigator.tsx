import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../theme/colors';
import { FavoritesProvider } from '../context/FavoritesContext';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import GameDetailScreen from '../screens/GameDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Navegador de Pestañas Inferiores (Bottom Tabs).
 * Incluye las pantallas de Inicio, Categorías y Favoritos.
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.surfaceLight,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'game-controller-outline';

          if (route.name === 'Inicio') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Categorías') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'star' : 'star-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Categorías" component={CategoriesScreen} />
      <Tab.Screen name="Favoritos" component={FavoriteScreen} />
    </Tab.Navigator>
  );
}

/**
 * Navegador Principal de la Aplicación.
 * Maneja el flujo desde la Portada (Splash), las Pestañas Principales y el Detalle de Juego.
 */
export default function AppNavigator() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <FavoritesProvider>
      <NavigationContainer>
        {showSplash ? (
          <SplashScreen onStart={() => setShowSplash(false)} />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen
              name="GameDetail"
              component={GameDetailScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </FavoritesProvider>
  );
}
