import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function ThemeSelector() {
  const { theme, themeMode, setThemeMode } = useTheme();

  const options = [
    { label: 'Light', value: 'light', icon: 'sunny', desc: 'Use light appearance' },
    { label: 'Dark', value: 'dark', icon: 'moon', desc: 'Easier on the eyes' },
    { label: 'System', value: 'system', icon: 'settings', desc: 'Follow device preference' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = themeMode === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              isSelected && { borderColor: theme.colors.primary, borderWidth: 2 }
            ]}
            onPress={() => setThemeMode(option.value)}
            activeOpacity={0.8}
          >
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary }]}>
                <Ionicons 
                  name={option.icon} 
                  size={22} 
                  color={isSelected ? '#FFF' : theme.colors.textSecondary} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[
                  styles.label, 
                  { color: theme.colors.textPrimary },
                  isSelected && { fontWeight: typography.weights.bold }
                ]}>
                  {option.label}
                </Text>
                <Text style={[styles.desc, { color: theme.colors.textSecondary }]}>
                  {option.desc}
                </Text>
              </View>
            </View>
            <View style={[
              styles.radio, 
              { borderColor: isSelected ? theme.colors.primary : theme.colors.border }
            ]}>
              {isSelected && <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: spacing.md,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semiBold,
    marginBottom: 2,
  },
  desc: {
    fontSize: typography.sizes.sm,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  }
});
