import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import SectionHeader from '../../components/SectionHeader';
import ThemeSelector from '../../components/ThemeSelector';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Customize your shopping experience.</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Appearance" />
        <ThemeSelector />
      </View>

      <View style={styles.section}>
        <SectionHeader title="App Preferences" />
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <Ionicons name="notifications" size={22} color={theme.colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoRowLeft}>
              <Ionicons name="globe" size={22} color={theme.colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]}>Language & Region</Text>
            </View>
            <Text style={[styles.infoValue, { color: theme.colors.textSecondary }]}>English (US)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="About" />
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]}>Version</Text>
            <Text style={[styles.infoValue, { color: theme.colors.textSecondary }]}>{Constants.expoConfig?.version || '1.0.0'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </View>
        </View>
      </View>
      
      <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
        Made with ❤️ for UI/UX Evaluation
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.hero || 32,
    fontWeight: typography.weights.heavy,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  infoCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(150,150,150,0.2)',
    marginVertical: 0,
    marginHorizontal: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semiBold,
  },
  infoValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  footerText: {
    textAlign: 'center',
    fontSize: typography.sizes.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.xxl * 2,
  }
});
