import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlatformFilterType } from '../types/game';
import Colors from '../theme/colors';

interface PlatformFilterProps {
  selectedPlatform: PlatformFilterType;
  onSelectPlatform: (platform: PlatformFilterType) => void;
}

/**
 * Selector de Plataforma (Todas, PC, Browser) para filtrar los juegos.
 */
export const PlatformFilter: React.FC<PlatformFilterProps> = ({
  selectedPlatform,
  onSelectPlatform,
}) => {
  const options: { id: PlatformFilterType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'all', label: 'Todas', icon: 'apps-outline' },
    { id: 'pc', label: 'PC / Win', icon: 'desktop-outline' },
    { id: 'browser', label: 'Navegador', icon: 'globe-outline' },
  ];

  return (
    <View style={styles.container}>
      {options.map((item) => {
        const active = selectedPlatform === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => onSelectPlatform(item.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={14}
              color={active ? '#FFF' : Colors.textSecondary}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  buttonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.secondary,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  labelActive: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default PlatformFilter;
