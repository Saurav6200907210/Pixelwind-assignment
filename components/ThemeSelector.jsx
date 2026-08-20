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
              { backgroundColor: isSelected ? `${theme.colors.primary}08` : theme.colors.surface, borderColor: isSelected ? theme.colors.primary : theme.colors.border }
            ]}
            onPress={() => setThemeMode(option.value)}
            activeOpacity={0.7}
          >
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary }]}>
                <Ionicons 
                  name={option.icon} 
                  size={20} 
                  color={isSelected ? '#FFF' : theme.colors.textSecondary} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[
                  styles.label, 
                  { color: isSelected ? theme.colors.primary : theme.colors.textPrimary },
                ]} numberOfLines={1}>
                  {option.label}
                </Text>
                <Text style={[styles.desc, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {option.desc}
                </Text>
              </View>
            </View>
            <View style={[
              styles.radio, 
              { borderColor: isSelected ? theme.colors.primary : theme.colors.border },
              isSelected && { backgroundColor: theme.colors.primary }
            ]}>
              {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
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
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
