import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import EmptyState from '../../components/EmptyState';
import { formatCurrency } from '../../utils/currency';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { theme } = useTheme();
  const { cartItems, getCartTotal, getCartItemCount } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
        <EmptyState 
          icon="cart-outline" 
          title="Your cart is empty" 
          description="Discover something you'll love." 
          buttonText="Start Shopping"
          onButtonPress={() => router.push('/')}
        />
      </SafeAreaView>
    );
  }

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 99 : 0;
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal + delivery - discount;

  const renderFooter = () => (
    <View style={styles.listFooter}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Promo Code</Text>
      <View style={[styles.promoContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
        <TextInput 
          style={[styles.promoInput, { color: theme.colors.textPrimary }]} 
          placeholder="Enter promo code"
          placeholderTextColor={theme.colors.textSecondary}
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity 
          style={[styles.promoBtn, { backgroundColor: theme.colors.primary }]}
          onPress={() => setDiscountApplied(promoCode.length > 3)}
        >
          <Text style={styles.promoBtnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>Your Cart</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>{getCartItemCount()} items</Text>
        </View>

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
        
        <View style={[styles.summaryWrapper, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
          <Text style={[styles.orderSummaryTitle, { color: theme.colors.textPrimary }]}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.textPrimary }]}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Delivery</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.textPrimary }]}>{formatCurrency(delivery)}</Text>
          </View>
          {discountApplied && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.success }]}>Discount (10%)</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.success }]}>-{formatCurrency(discount)}</Text>
            </View>
          )}
          
          <View style={[styles.totalRow, { borderTopColor: theme.colors.border }]}>
            <Text style={[styles.totalLabel, { color: theme.colors.textPrimary }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: theme.colors.textPrimary }]}>
              {formatCurrency(total)}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.checkoutBtn, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.heavy,
  },
  headerSubtitle: {
    fontSize: typography.sizes.md,
    marginTop: 4,
    fontWeight: typography.weights.medium,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listFooter: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  promoContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: typography.sizes.md,
    height: 44,
  },
  promoBtn: {
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summaryWrapper: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    borderTopWidth: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 20,
  },
  orderSummaryTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginBottom: spacing.lg,
  },
  totalLabel: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  totalAmount: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.heavy,
  },
  checkoutBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 20,
  },
  checkoutBtnText: {
    color: 'white',
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  }
});
