import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useRouter } from 'expo-router';

export default function EmptyState({ icon, title, description, buttonText, onButtonPress }) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
        <Ionicons name={icon} size={48} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{description}</Text>
      
      {buttonText && (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.textPrimary }]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: theme.colors.surface }]}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.heavy,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
    maxWidth: '80%',
  },
  button: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: 14,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semiBold,
  }
});
