import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function SearchBar({ value, onChangeText, onClear, onFilterPress, filtersActive }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceSecondary }]}>
      <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: theme.colors.textPrimary }]}
        placeholder="Search products..."
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
          <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
      <TouchableOpacity 
        style={styles.filterBtn} 
        onPress={onFilterPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="options-outline" size={20} color={theme.colors.textPrimary} />
        {filtersActive && (
          <View style={[styles.badge, { backgroundColor: theme.colors.primary }]} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    height: 56,
    marginVertical: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.md,
    height: '100%',
  },
  clearBtn: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },
  filterBtn: {
    paddingLeft: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(150,150,150,0.2)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF', // Ideally theme surface secondary but white is fine for contrast
  }
});
