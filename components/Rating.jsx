import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../constants/typography';

export default function Rating({ rating, count, size = 'sm' }) {
  const { theme } = useTheme();
  
  const iconSize = size === 'lg' ? 18 : 14;
  const textSize = size === 'lg' ? typography.sizes.md : typography.sizes.sm;

  return (
    <View style={styles.container}>
      <Ionicons name="star" size={iconSize} color={theme.colors.rating} />
      <Text style={[styles.ratingText, { color: theme.colors.textPrimary, fontSize: textSize }]}>{rating}</Text>
      {count !== undefined && (
        <Text style={[styles.countText, { color: theme.colors.textSecondary, fontSize: textSize }]}>({count})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: typography.weights.semiBold,
    marginLeft: 4,
  },
  countText: {
    marginLeft: 4,
  }
});
