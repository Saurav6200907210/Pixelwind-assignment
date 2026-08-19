import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import QuantitySelector from './QuantitySelector';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export default function CartItem({ item }) {
  const { theme } = useTheme();
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: theme.colors.textPrimary }]} numberOfLines={2}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
            <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.price, { color: theme.colors.textPrimary }]}>
          {formatCurrency(item.price)}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <QuantitySelector 
          quantity={item.quantity} 
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
          vertical={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: spacing.md,
    backgroundColor: '#f1f1f6',
  },
  details: {
    flex: 1,
    height: 90,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginRight: spacing.sm,
    lineHeight: 22,
  },
  removeBtn: {
    padding: spacing.xs,
    marginTop: -spacing.xs,
    marginRight: -spacing.xs,
  },
  price: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.heavy,
  },
  controlsContainer: {
    marginLeft: spacing.md,
  }
});
