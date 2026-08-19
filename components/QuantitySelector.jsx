import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, vertical = false }) {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      vertical ? styles.containerVertical : styles.containerHorizontal,
      { backgroundColor: theme.colors.surfaceSecondary }
    ]}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Ionicons name="remove" size={18} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <Text style={[styles.quantity, { color: theme.colors.textPrimary }]}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Ionicons name="add" size={18} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHorizontal: {
    flexDirection: 'row',
  },
  containerVertical: {
    flexDirection: 'column-reverse',
  },
  button: {
    padding: spacing.sm,
    paddingHorizontal: 12,
  },
  quantity: {
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
    paddingHorizontal: spacing.sm,
  }
});
