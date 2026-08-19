import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function CategoryCard({ category, isSelected, onPress, variant = 'chip' }) {
  const { theme } = useTheme();
  
  if (variant === 'grid') {
    return (
      <TouchableOpacity 
        style={[
          styles.gridContainer,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.gridIconContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Ionicons name={category.icon} size={28} color={theme.colors.primary} />
        </View>
        <Text style={[styles.gridName, { color: theme.colors.textPrimary }]}>{category.name}</Text>
        <Text style={[styles.gridCount, { color: theme.colors.textSecondary }]}>{category.count || 'Explore'}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[
        styles.chipContainer,
        { backgroundColor: theme.colors.surface, borderColor: isSelected ? theme.colors.primary : theme.colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconWrapper, { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary }]}>
        <Ionicons 
          name={category.icon || "list"} 
          size={28} 
          color={isSelected ? '#FFFFFF' : theme.colors.primary} 
        />
      </View>
      <Text style={[
        styles.chipName,
        { color: isSelected ? theme.colors.primary : theme.colors.textPrimary },
      ]} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    width: 110,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 24,
    borderWidth: 2,
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  chipName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
  },
  gridContainer: {
    flex: 1,
    margin: spacing.sm,
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  gridIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  gridName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: 6,
  },
  gridCount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  }
});
