import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Switch, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import SectionHeader from '../../components/SectionHeader';
import ThemeSelector from '../../components/ThemeSelector';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function SettingsScreen() {
  const { theme } = useTheme();
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@notifications_enabled').then(val => {
      if (val !== null) setNotificationsEnabled(val === 'true');
    });
  }, []);

  const toggleNotifications = async (val) => {
    setNotificationsEnabled(val);
    await AsyncStorage.setItem('@notifications_enabled', val.toString());
  };

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
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7} onPress={() => setNotificationsOpen(true)}>
            <View style={styles.infoRowLeft}>
              <View style={[styles.settingIconBox, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Ionicons name="notifications" size={20} color={theme.colors.primary} />
              </View>
              <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]} numberOfLines={1}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7} onPress={() => setLanguageOpen(true)}>
            <View style={styles.infoRowLeft}>
              <View style={[styles.settingIconBox, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Ionicons name="globe" size={20} color={theme.colors.primary} />
              </View>
              <Text style={[styles.infoLabel, { color: theme.colors.textPrimary }]} numberOfLines={1}>Language & Region</Text>
            </View>
            <View style={styles.infoRowRight}>
              <Text style={[styles.infoValue, { color: theme.colors.textSecondary, marginRight: 8 }]} numberOfLines={1}>English (US)</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={notificationsOpen} transparent animationType="fade" onRequestClose={() => setNotificationsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setNotificationsOpen(false)}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsOpen(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalRow}>
              <Text style={[styles.modalLabel, { color: theme.colors.textPrimary }]}>Enable Notifications</Text>
              <Switch 
                value={notificationsEnabled} 
                onValueChange={toggleNotifications}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFF"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={languageOpen} transparent animationType="fade" onRequestClose={() => setLanguageOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setLanguageOpen(false)}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Language & Region</Text>
              <TouchableOpacity onPress={() => setLanguageOpen(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalRow} onPress={() => setLanguageOpen(false)}>
              <Text style={[styles.modalLabel, { color: theme.colors.textPrimary }]}>English (US)</Text>
              <Ionicons name="checkmark" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  infoRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    padding: spacing.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  closeBtn: {
    padding: 4,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  modalLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  }
});
