import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { categories } from '../data/categories';

const PRICE_RANGES = [
  { label: 'All', value: 'All' },
  { label: 'Under ₹1,000', value: 'under_1000' },
  { label: '₹1,000 – ₹5,000', value: '1000_5000' },
  { label: '₹5,000 – ₹10,000', value: '5000_10000' },
  { label: 'Above ₹10,000', value: 'above_10000' }
];

const RATINGS = [
  { label: 'All', value: 0 },
  { label: '4★ & above', value: 4 },
  { label: '3★ & above', value: 3 }
];

const SORT_OPTIONS = [
  { label: 'Relevance', value: 'Relevance' },
  { label: 'Price: Low to High', value: 'Price: Low to High' },
  { label: 'Price: High to Low', value: 'Price: High to Low' },
  { label: 'Rating', value: 'Rating' },
  { label: 'Newest', value: 'Newest' }
];

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply, 
  initialCategory, 
  initialPriceRange, 
  initialRating, 
  initialSortBy 
}) {
  const { theme } = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(initialPriceRange || 'All');
  const [selectedRating, setSelectedRating] = useState(initialRating || 0);
  const [selectedSortBy, setSelectedSortBy] = useState(initialSortBy || 'Relevance');

  useEffect(() => {
    if (visible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(initialCategory || 'All');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPriceRange(initialPriceRange || 'All');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedRating(initialRating || 0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSortBy(initialSortBy || 'Relevance');
    }
  }, [visible, initialCategory, initialPriceRange, initialRating, initialSortBy]);

  const handleApply = () => {
    onApply({
      category: selectedCategory,
      priceRange: selectedPriceRange,
      rating: selectedRating,
      sortBy: selectedSortBy
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedRating(0);
    setSelectedSortBy('Relevance');
    onApply({
      category: 'All',
      priceRange: 'All',
      rating: 0,
      sortBy: 'Relevance'
    });
    onClose();
  };

  const renderChip = (label, isSelected, onPress) => (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary },
        isSelected && styles.chipSelected
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.chipText,
        { color: isSelected ? '#FFF' : theme.colors.textPrimary }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Filters</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Category</Text>
                <View style={styles.chipContainer}>
                  {categories.map(cat => (
                    <React.Fragment key={cat.id}>
                      {renderChip(cat.name, selectedCategory === cat.name, () => setSelectedCategory(cat.name))}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Price Range</Text>
                <View style={styles.chipContainer}>
                  {PRICE_RANGES.map(range => (
                    <React.Fragment key={range.value}>
                      {renderChip(range.label, selectedPriceRange === range.value, () => setSelectedPriceRange(range.value))}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Rating</Text>
                <View style={styles.chipContainer}>
                  {RATINGS.map(rating => (
                    <React.Fragment key={rating.value}>
                      {renderChip(rating.label, selectedRating === rating.value, () => setSelectedRating(rating.value))}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Sort By</Text>
                <View style={styles.chipContainer}>
                  {SORT_OPTIONS.map(sort => (
                    <React.Fragment key={sort.value}>
                      {renderChip(sort.label, selectedSortBy === sort.value, () => setSelectedSortBy(sort.value))}
                    </React.Fragment>
                  ))}
                </View>
              </View>
              
              <View style={{ height: 40 }} />
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
              <TouchableOpacity 
                style={[styles.footerBtn, styles.clearBtn, { borderColor: theme.colors.border }]} 
                onPress={handleClear}
              >
                <Text style={[styles.clearBtnText, { color: theme.colors.textPrimary }]}>Clear</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.footerBtn, styles.applyBtn, { backgroundColor: theme.colors.primary }]} 
                onPress={handleApply}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    height: '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    position: 'relative',
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  closeBtn: {
    position: 'absolute',
    right: spacing.md,
    padding: spacing.xs,
  },
  scrollArea: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
  },
  chipSelected: {
  },
  chipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
  },
  footerBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtn: {
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  clearBtnText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  applyBtn: {
    marginLeft: spacing.sm,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
});
