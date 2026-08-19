import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';
import { useRouter } from 'expo-router';

export default function ReviewCard({ review }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleProductPress = () => {
    if (review.productId) {
      router.push(`/product/${review.productId}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {!imgError ? (
            <Image 
              source={{ uri: review.avatar }} 
              style={styles.avatar}
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="person" size={20} color={theme.colors.textTertiary || '#999'} />
            </View>
          )}
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.customerName, { color: theme.colors.textPrimary }]} numberOfLines={1}>
            {review.customerName}
          </Text>
          {review.verifiedPurchase && (
            <View style={styles.verifiedRow}>
              <Ionicons name="checkmark-circle" size={14} color={theme.colors.success || '#4CAF50'} />
              <Text style={[styles.verifiedText, { color: theme.colors.success || '#4CAF50' }]}>
                Verified
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons 
            key={i} 
            name={i < review.rating ? "star" : "star-outline"} 
            size={14} 
            color="#FFD700" 
            style={styles.star}
          />
        ))}
      </View>

      <Text style={[styles.reviewText, { color: theme.colors.textSecondary }]} numberOfLines={3}>
        &quot;{review.review}&quot;
      </Text>

      <View style={styles.footer}>
        <Pressable onPress={handleProductPress} style={({ pressed }) => [styles.productBtn, { opacity: pressed ? 0.7 : 1 }]}>
          <Text style={[styles.productName, { color: theme.colors.primary }]} numberOfLines={1}>
            {review.productName}
          </Text>
        </Pressable>
        <Text style={[styles.date, { color: theme.colors.textTertiary }]}>
          {review.date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.lg,
    marginHorizontal: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  customerName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: typography.weights.medium,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  star: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: spacing.sm,
  },
  productBtn: {
    flex: 1,
    marginRight: spacing.sm,
  },
  productName: {
    fontSize: 12,
    fontWeight: typography.weights.semiBold,
  },
  date: {
    fontSize: 11,
  },
});
