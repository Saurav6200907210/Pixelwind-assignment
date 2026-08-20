import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Animated, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { searchProducts } from '../../utils/productHelpers';
import { heroSlides } from '../../data/heroSlides';
import { promoSlides } from '../../data/promoSlides';
import { customerReviews } from '../../data/reviews';
import SearchBar from '../../components/SearchBar';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import ReviewCard from '../../components/ReviewCard';
import SectionHeader from '../../components/SectionHeader';
import EmptyState from '../../components/EmptyState';
import FilterModal from '../../components/FilterModal';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const HeroBanner = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);
  const [scrollX] = useState(() => new Animated.Value(0));
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroSlides.length;
        if (flatListRef.current && bannerWidth > 0) {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * bannerWidth,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4000);
  }, [bannerWidth, stopAutoPlay]);

  useEffect(() => {
    if (bannerWidth > 0) {
      startAutoPlay();
    }
    return stopAutoPlay;
  }, [bannerWidth, startAutoPlay, stopAutoPlay]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (event) => {
    if (bannerWidth > 0) {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
      setCurrentIndex(newIndex);
    }
    startAutoPlay();
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * bannerWidth,
      index * bannerWidth,
      (index + 1) * bannerWidth,
    ];
    
    const scale = bannerWidth > 0 ? scrollX.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    }) : 1;
    
    const opacity = bannerWidth > 0 ? scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    }) : 1;

    const hasError = imageErrors[item.id];

    return (
      <View style={{ width: bannerWidth, height: '100%', overflow: 'hidden' }}>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale }], opacity }]}>
          {!hasError ? (
            <Image 
              source={{ uri: item.image }} 
              style={styles.heroImage}
              resizeMode="cover"
              onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
            />
          ) : (
            <View style={[styles.heroImage, { backgroundColor: '#2A2A35', justifyContent: 'center', alignItems: 'center' }]}>
               <Ionicons name="image-outline" size={32} color="#666" />
            </View>
          )}
        </Animated.View>
      </View>
    );
  };

  return (
    <View 
      style={[styles.heroBanner, { backgroundColor: theme.colors.surfaceSecondary }]}
      onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
    >
      {bannerWidth > 0 && (
        <Animated.FlatList
          ref={flatListRef}
          data={heroSlides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={stopAutoPlay}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          bounces={false}
          style={StyleSheet.absoluteFill}
        />
      )}
      
      <View style={styles.heroOverlay} pointerEvents="none" />
      <View style={styles.heroContent} pointerEvents="box-none">
        <Text style={styles.heroSubtitle}>SUMMER COLLECTION</Text>
        <Text style={styles.heroTitle}>Upgrade your everyday style</Text>
        <Text style={styles.heroDiscount}>Up to 30% OFF</Text>
        <TouchableOpacity style={[styles.heroBtn, { backgroundColor: theme.colors.primary }]} onPress={() => {}}>
          <Text style={styles.heroBtnText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroIndicators} pointerEvents="none">
        {heroSlides.map((_, idx) => (
          <View 
            key={idx} 
            style={[
              styles.indicatorDot, 
              idx === currentIndex ? styles.indicatorDotActive : null
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const OfferBanner = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);
  const [scrollX] = useState(() => new Animated.Value(0));
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % promoSlides.length;
        if (flatListRef.current && bannerWidth > 0) {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * bannerWidth,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4500);
  }, [bannerWidth, stopAutoPlay]);

  useEffect(() => {
    if (bannerWidth > 0) {
      startAutoPlay();
    }
    return stopAutoPlay;
  }, [bannerWidth, startAutoPlay, stopAutoPlay]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (event) => {
    if (bannerWidth > 0) {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
      setCurrentIndex(newIndex);
    }
    startAutoPlay();
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ width: bannerWidth, height: '100%', overflow: 'hidden' }}>
        <Image 
          source={{ uri: item.image }} 
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View 
      style={[styles.offerBanner, { backgroundColor: theme.colors.surfaceSecondary }]}
      onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
    >
      {bannerWidth > 0 && (
        <Animated.FlatList
          ref={flatListRef}
          data={promoSlides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={stopAutoPlay}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          bounces={false}
          style={StyleSheet.absoluteFill}
        />
      )}
      
      <View style={styles.offerOverlay} pointerEvents="none" />

      <View style={styles.offerContent} pointerEvents="box-none">
        <Text style={styles.offerSubtitle}>WEEKEND SPECIAL</Text>
        <Text style={styles.offerTitle}>Extra 15% OFF</Text>
        <Text style={styles.offerDesc}>on selected products</Text>
        <TouchableOpacity style={styles.offerBtn} onPress={() => {}}>
          <Text style={styles.offerBtnText}>Explore Deals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.offerIndicators} pointerEvents="none">
        {promoSlides.map((_, idx) => (
          <View 
            key={idx} 
            style={[
              styles.offerIndicatorDot, 
              idx === currentIndex ? styles.offerIndicatorDotActive : null
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const TrustSection = ({ theme }) => {
  const items = [
    { 
      icon: 'award', 
      title: 'Premium Products', 
      desc: 'Quality products carefully selected for you.' 
    },
    { 
      icon: 'truck', 
      title: 'Fast Delivery', 
      desc: 'Quick and reliable delivery to your doorstep.' 
    },
    { 
      icon: 'shield', 
      title: 'Secure Shopping', 
      desc: 'Safe and secure shopping experience.' 
    },
    { 
      icon: 'refresh-ccw', 
      title: 'Easy Returns', 
      desc: 'Simple returns with hassle-free support.' 
    },
  ];

  return (
    <View style={styles.trustSection}>
      <SectionHeader title="Why Shop With Us" />
      <View style={styles.trustGrid}>
        {items.map((item, idx) => (
          <View key={idx} style={[styles.trustItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={[styles.trustIconWrap, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Feather name={item.icon} size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.trustItemTitle, { color: theme.colors.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.trustItemDesc, { color: theme.colors.textSecondary }]}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const CustomerFeedback = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  
  const ITEM_WIDTH = 280 + spacing.sm * 2; // Card width + margins

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % customerReviews.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * ITEM_WIDTH,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4000); // Autoplay every 4 seconds
  }, [stopAutoPlay, ITEM_WIDTH]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setCurrentIndex(newIndex);
    startAutoPlay();
  };

  return (
    <View style={styles.feedbackSection}>
      <View style={styles.sectionPadding}>
        <SectionHeader 
          title="Customer Feedback" 
          subtitle="See what our customers are saying"
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={customerReviews}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.feedbackScrollContent}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={handleScroll}
        onScrollBeginDrag={stopAutoPlay}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
      <View style={styles.feedbackIndicators}>
        {customerReviews.map((_, idx) => (
          <View 
            key={idx} 
            style={[
              styles.feedbackIndicatorDot,
              idx === currentIndex && styles.feedbackIndicatorDotActive,
              { backgroundColor: idx === currentIndex ? theme.colors.primary : 'rgba(150,150,150,0.3)' }
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('Relevance');
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (params?.category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(params.category);
    }
  }, [params?.category]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      // Reset all temporary filters and search state
      setSearchQuery('');
      setSelectedCategory('All');
      setPriceRange('All');
      setMinRating(0);
      setSortBy('Relevance');
      
      // Scroll to the top if we are already on this screen
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleApplyFilters = (filters) => {
    setSelectedCategory(filters.category);
    setPriceRange(filters.priceRange);
    setMinRating(filters.rating);
    setSortBy(filters.sortBy);
  };

  const hasActiveFilters = selectedCategory !== 'All' || priceRange !== 'All' || minRating > 0 || sortBy !== 'Relevance';
  const hasAdvancedFilters = priceRange !== 'All' || minRating > 0 || sortBy !== 'Relevance';

  let filteredProducts = searchProducts(searchQuery).filter(product => 
    selectedCategory === 'All' ? true : product.category === selectedCategory
  );

  if (priceRange !== 'All') {
    filteredProducts = filteredProducts.filter(product => {
      if (priceRange === 'under_1000') return product.price < 1000;
      if (priceRange === '1000_5000') return product.price >= 1000 && product.price <= 5000;
      if (priceRange === '5000_10000') return product.price > 5000 && product.price <= 10000;
      if (priceRange === 'above_10000') return product.price > 10000;
      return true;
    });
  }

  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
  }

  if (sortBy === 'Price: Low to High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'Rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'Newest') {
    filteredProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  if (!hasActiveFilters && !searchQuery) {
    filteredProducts = filteredProducts.slice(0, 12);
  }

  const trendingProducts = products.filter(p => p.rating >= 4.8).slice(0, 5);

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
              Good morning, Saurav 👋
            </Text>
            <Text style={[styles.mainHeading, { color: theme.colors.textPrimary }]}>
              Discover products you&apos;ll love
            </Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceSecondary }]}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100' }} 
              style={styles.avatarImage} 
            />
          </View>
        </View>
        
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          onClear={() => setSearchQuery('')} 
          onFilterPress={() => setIsFilterModalVisible(true)}
          filtersActive={hasActiveFilters}
        />
      </View>

      {(!searchQuery && !hasAdvancedFilters) ? (
        <View>
          <View style={styles.sectionPadding}>
            <HeroBanner theme={theme} />
          </View>

          <View style={styles.sectionPadding}>
            <SectionHeader 
              title="Shop by Category" 
              actionTitle="See All" 
              onActionPress={() => router.push('/categories')}
            />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {categories.map(cat => (
                <CategoryCard 
                  key={cat.id}
                  category={cat} 
                  isSelected={selectedCategory === cat.name}
                  onPress={() => setSelectedCategory(cat.name)}
                  variant="chip"
                />
              ))}
            </ScrollView>
          </View>

          {selectedCategory === 'All' && (
            <View style={styles.sectionPadding}>
              <SectionHeader 
                title="Trending Now" 
                actionTitle="See All" 
                onActionPress={() => router.push('/categories')}
              />
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalScrollContent}
                snapToInterval={260 + spacing.md} // Card width + margin
                decelerationRate="fast"
              >
                {trendingProducts.map(prod => (
                  <View key={prod.id} style={{ width: 260 }}>
                    <ProductCard product={prod} />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {selectedCategory === 'All' && (
            <View style={styles.sectionPadding}>
              <OfferBanner theme={theme} />
            </View>
          )}
        </View>
      ) : null}

      <View style={styles.sectionPadding}>
        <SectionHeader 
          title={(searchQuery || hasAdvancedFilters) ? (searchQuery ? 'Search Results' : 'Filtered Products') : 'Popular Products'} 
          actionTitle={(searchQuery || hasAdvancedFilters) ? '' : 'See All'} 
          onActionPress={() => !(searchQuery || hasAdvancedFilters) && router.push('/categories')}
        />
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
      {(!searchQuery && !hasAdvancedFilters) && (
        <View>
          <CustomerFeedback theme={theme} />
          <View style={styles.sectionPadding}>
            <TrustSection theme={theme} />
          </View>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.sectionPadding}>
      <EmptyState 
        icon="search-outline" 
        title="No products found" 
        description={hasActiveFilters ? "Try adjusting your filters or search query." : "Try searching for another keyword."} 
        buttonText={hasActiveFilters ? "Clear Filters" : "Clear Search"}
        onButtonPress={() => {
          if (hasActiveFilters) {
            handleApplyFilters({ category: 'All', priceRange: 'All', rating: 0, sortBy: 'Relevance' });
          } else {
            setSearchQuery('');
          }
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <FlatList
        ref={flatListRef}
        style={{ flex: 1 }}
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        ListEmptyComponent={renderEmpty()}
        renderItem={({ item }) => (
          <View style={styles.productCell}>
            <ProductCard product={item} />
          </View>
        )}
      />
      
      <FilterModal 
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilters}
        initialCategory={selectedCategory}
        initialPriceRange={priceRange}
        initialRating={minRating}
        initialSortBy={sortBy}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl * 2,
  },
  headerContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  sectionPadding: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  greeting: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 6,
  },
  mainHeading: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.heavy,
    maxWidth: '85%',
    lineHeight: 34,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  horizontalScroll: {
    marginHorizontal: -spacing.md,
  },
  horizontalScrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  gridContainer: {
    marginHorizontal: -8, // Compensate for card margins
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCell: {
    flex: 1,
  },
  heroBanner: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  heroSubtitle: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  heroDiscount: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  heroBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroIndicators: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 3,
  },
  indicatorDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  offerBanner: {
    width: '100%',
    borderRadius: 24,
    padding: spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    height: 180,
    justifyContent: 'center',
  },
  offerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  offerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  offerContent: {
    zIndex: 1,
  },
  offerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  offerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  offerDesc: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    marginBottom: 16,
  },
  offerBtn: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  offerIndicators: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  offerIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginHorizontal: 3,
  },
  offerIndicatorDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  trustSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  trustGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  trustItem: {
    width: '48%',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  trustIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  trustItemTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    marginBottom: 4,
  },
  trustItemDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
  feedbackSection: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  feedbackScrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  feedbackIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  feedbackIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  feedbackIndicatorDotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
  },
});
