import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useRouter } from 'expo-router';

export default function ProductCard({ product }) {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const navigateToDetails = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Pressable 
      style={StyleSheet.flatten([styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }])}
      onPress={navigateToDetails}
    >
      <View style={[styles.imageContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <Pressable 
          style={[styles.favoriteBtn, { backgroundColor: theme.colors.surface }]}
          onPress={(e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (e && e.preventDefault) e.preventDefault();
            toggleWishlist(product);
          }}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={16} 
            color={isFavorite ? theme.colors.danger : theme.colors.textSecondary} 
          />
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.category, { color: theme.colors.textSecondary }]}>{product.category}</Text>
        <Text style={[styles.name, { color: theme.colors.textPrimary }]} numberOfLines={1}>{product.name}</Text>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={theme.colors.rating} />
          <Text style={[styles.ratingText, { color: theme.colors.textPrimary }]}>{product.rating}</Text>
          <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]}>({product.reviewCount})</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: theme.colors.textPrimary }]}>{formatCurrency(product.price)}</Text>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              if (e && e.preventDefault) e.preventDefault();
              handleAddToCart();
            }}
          >
            <Ionicons name="add" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: spacing.lg,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  infoContainer: {
    padding: 16,
  },
  category: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    fontWeight: typography.weights.bold,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: 6,
    lineHeight: 22,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: typography.weights.semiBold,
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 12,
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.heavy,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
