import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../utils/productHelpers';
import { formatCurrency } from '../../utils/currency';
import Rating from '../../components/Rating';
import EmptyState from '../../components/EmptyState';
import QuantitySelector from '../../components/QuantitySelector';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  
  const product = getProductById(id);

  useEffect(() => {
    let timeout;
    if (added) {
      timeout = setTimeout(() => setAdded(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [added]);

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState 
          icon="alert-circle-outline" 
          title="Product not found" 
          description="The product you're looking for doesn't exist or has been removed." 
          buttonText="Return Home"
          onButtonPress={() => router.push('/')}
        />
      </View>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.iconBtn, { backgroundColor: theme.colors.surfaceSecondary }]} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconBtn, { backgroundColor: theme.colors.surfaceSecondary }]} 
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? theme.colors.danger : theme.colors.textPrimary} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.imageContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
          </View>
        </View>
        
        <View style={[styles.detailsContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.category, { color: theme.colors.textSecondary }]}>{product.category}</Text>
          <Text style={[styles.name, { color: theme.colors.textPrimary }]}>{product.name}</Text>
          
          <View style={styles.ratingRow}>
            <Rating rating={product.rating} count={`${product.reviewCount} Reviews`} size="lg" />
          </View>
          
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.colors.textPrimary }]}>{formatCurrency(product.price)}</Text>
            {product.originalPrice && (
              <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>{formatCurrency(product.originalPrice)}</Text>
            )}
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.divider} />
          
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Description</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{product.description}</Text>

          <View style={styles.divider} />

          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Features</Text>
          <View style={styles.featuresList}>
            {(product.features || []).map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} style={styles.featureIcon} />
                <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Information</Text>
          <View style={styles.infoList}>
            {product.brand && (
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Brand:</Text>
                <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{product.brand}</Text>
              </View>
            )}
            {product.availability && (
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Stock:</Text>
                <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{product.availability}</Text>
              </View>
            )}
            {product.delivery && (
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Delivery:</Text>
                <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{product.delivery}</Text>
              </View>
            )}
            {product.returnPolicy && (
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Returns:</Text>
                <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{product.returnPolicy}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <View style={styles.quantityWrapper}>
          <QuantitySelector 
            quantity={quantity} 
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => q > 1 ? q - 1 : 1)}
          />
        </View>
        <TouchableOpacity 
          style={[
            styles.addToCartBtn, 
            { backgroundColor: added ? theme.colors.success : theme.colors.primary }
          ]}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>
            {added ? '✓ Added to Cart' : `Add ${formatCurrency(product.price * quantity)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContent: {
    paddingBottom: 120, // padding for bottom bar
  },
  imageContainer: {
    width: '100%',
    height: width * 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
  },
  detailsContainer: {
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    minHeight: 400,
  },
  category: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.heavy,
    marginBottom: spacing.sm,
    lineHeight: 38,
  },
  ratingRow: {
    marginBottom: spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  price: {
    fontSize: 32,
    fontWeight: typography.weights.heavy,
    marginRight: spacing.md,
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150,150,150,0.15)',
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.sizes.md,
    lineHeight: 26,
  },
  featuresList: {
    marginTop: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureIcon: {
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginRight: spacing.md,
  },
  infoList: {
    marginTop: spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    width: 80,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  infoValue: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + 12, // Extra padding for home indicator
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 20,
  },
  quantityWrapper: {
    marginRight: spacing.md,
    justifyContent: 'center',
  },
  addToCartBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 56,
  },
  addToCartText: {
    color: 'white',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  }
});
