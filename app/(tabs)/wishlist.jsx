import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useRouter } from 'expo-router';

export default function WishlistScreen() {
  const { theme } = useTheme();
  const { wishlist } = useWishlist();
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Wishlist</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <EmptyState 
        icon="heart-outline" 
        title="Your wishlist is empty" 
        description="Tap the heart icon on any product to save it for later." 
        buttonText="Explore Products"
        onButtonPress={() => router.push('/')}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <FlatList
        data={wishlist}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          wishlist.length === 0 && { flex: 1 }
        ]}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.hero || 32,
    fontWeight: typography.weights.heavy,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  scrollContent: {
    paddingBottom: spacing.xxl * 2,
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  productCell: {
    flex: 1,
    maxWidth: '50%',
  },
});
