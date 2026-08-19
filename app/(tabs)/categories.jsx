import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import CategoryCard from '../../components/CategoryCard';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useRouter } from 'expo-router';

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const categoriesWithCounts = categories
    .filter(cat => cat.id !== 'all')
    .map(cat => ({
      ...cat,
      count: `${products.filter(p => p.category === cat.name).length} products`
    }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Explore Categories</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Find products that match your style.</Text>
      </View>

      <FlatList
        data={categoriesWithCounts}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard 
            category={item} 
            variant="grid"
            onPress={() => {
              router.push({ pathname: '/', params: { category: item.name } });
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xxl,
  }
});
