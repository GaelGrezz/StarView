import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';

interface SplashScreenProps {
  onStart: () => void;
}

/**
 * Portada / Splash Screen temática de StarView.
 * Cumple con el Requisito #1: Nombre de la app, Logo/Imagen temática y Diseño propio.
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo / Icono Temático Gamer con brillo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <Ionicons name="game-controller" size={84} color={Colors.secondary} />
        </View>

        {/* Nombre de la Aplicación */}
        <Text style={styles.title}>STARVIEW</Text>
        <Text style={styles.subtitle}>FREE-TO-PLAY GAMER PORTAL</Text>

        {/* Descripción / Slogan */}
        <Text style={styles.description}>
          Explora, descubre y guarda los mejores videojuegos gratuitos para PC y Navegador Web en un solo lugar.
        </Text>

        {/* Botón de Entrada Interactivo */}
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={onStart}
        >
          <Text style={styles.startButtonText}>EXPLORAR UNIVERSO</Text>
          <Ionicons name="rocket-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Footer / Versión */}
      <Text style={styles.versionText}>StarView v1.0 • Powered by FreeToGame API</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.secondary,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    maxWidth: '85%',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  versionText: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
});

export default SplashScreen;
