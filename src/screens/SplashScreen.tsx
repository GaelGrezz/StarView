import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

/**
 * Portada / Splash Screen sencilla de proyecto estudiantil.
 * Cumple Requisito #1: Nombre, Logo/Icono y diseño propio básico.
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo / Icono sencillo */}
        <View style={styles.iconContainer}>
          <Ionicons name="game-controller" size={64} color={Colors.primary} />
        </View>

        {/* Nombre y descripción de la app */}
        <Text style={styles.title}>StarView</Text>
        <Text style={styles.subtitle}>Buscador de Juegos Gratuitos</Text>

        <Text style={styles.description}>
          Aplicación móvil para explorar videojuegos free-to-play consumiendo la API pública de FreeToGame.
        </Text>

        {/* Botón de ingreso sencillo */}
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={onStart}
        >
          <Text style={styles.startButtonText}>Ingresar a la App</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Proyecto Estudiantil • API FreeToGame</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
});

export default SplashScreen;
