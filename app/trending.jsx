import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function TrendingScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // Existing Trending Products logic
  const trendingProducts = products.filter(p => p.rating >= 4.8);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={[styles.backBtn, { backgroundColor: theme.colors.surfaceSecondary }]} 
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Trending Now</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {trendingProducts.length} Products
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {renderHeader()}
      <FlatList
        data={trendingProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        columnWrapperStyle={styles.productRow}
        renderItem={({ item }) => (
          <View style={styles.productCell}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  productCell: {
    flex: 1,
  },
});
