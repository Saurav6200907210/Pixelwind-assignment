import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { searchProducts } from '../../utils/productHelpers';
import { heroSlides } from '../../data/heroSlides';
import { promoSlides } from '../../data/promoSlides';
import SearchBar from '../../components/SearchBar';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import SectionHeader from '../../components/SectionHeader';
import EmptyState from '../../components/EmptyState';
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
        <TouchableOpacity style={[styles.heroBtn, { backgroundColor: theme.colors.primary }]}>
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
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % promoSlides.length);
        setNextIndex((prev) => (prev + 1) % promoSlides.length);
        fadeAnim.setValue(0);
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.offerBanner}>
      <Image 
        source={{ uri: promoSlides[currentIndex].image }} 
        style={styles.offerImage}
        resizeMode="cover"
      />
      <Animated.Image 
        source={{ uri: promoSlides[nextIndex].image }} 
        style={[styles.offerImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      
      <View style={styles.offerOverlay} />

      <View style={styles.offerContent}>
        <Text style={styles.offerSubtitle}>WEEKEND SPECIAL</Text>
        <Text style={styles.offerTitle}>Extra 15% OFF</Text>
        <Text style={styles.offerDesc}>on selected products</Text>
        <TouchableOpacity style={styles.offerBtn}>
          <Text style={styles.offerBtnText}>Explore Deals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.offerIndicators}>
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
    { icon: 'star', text: 'Premium Products' },
    { icon: 'airplane', text: 'Fast Delivery' },
    { icon: 'shield-checkmark', text: 'Secure Shopping' },
    { icon: 'refresh-circle', text: 'Easy Returns' },
  ];

  return (
    <View style={[styles.trustSection, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.trustTitle, { color: theme.colors.textPrimary }]}>Why Shop With Us</Text>
      <View style={styles.trustGrid}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.trustItem}>
            <View style={[styles.trustIconWrap, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.trustText, { color: theme.colors.textSecondary }]}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = searchProducts(searchQuery).filter(product => 
    selectedCategory === 'All' ? true : product.category === selectedCategory
  );

  const trendingProducts = products.filter(p => p.rating >= 4.8).slice(0, 5);

  const renderProductGrid = (productsList) => {
    const rows = [];
    for (let i = 0; i < productsList.length; i += 2) {
      rows.push(
        <View key={i} style={styles.productRow}>
          <View style={styles.productCell}>
            <ProductCard product={productsList[i]} />
          </View>
          <View style={styles.productCell}>
            {productsList[i + 1] && <ProductCard product={productsList[i + 1]} />}
          </View>
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
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
          />
        </View>

        {!searchQuery ? (
          <>
            <View style={styles.sectionPadding}>
              <HeroBanner theme={theme} />
            </View>

            <View style={styles.sectionPadding}>
              <SectionHeader title="Shop by Category" actionTitle="See All" />
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                <CategoryCard 
                  category={{ id: 'all', name: 'All', icon: 'grid-outline' }} 
                  isSelected={selectedCategory === 'All'}
                  onPress={() => setSelectedCategory('All')}
                  variant="chip"
                />
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
                <SectionHeader title="Trending Now" actionTitle="See All" />
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
          </>
        ) : null}

        <View style={styles.sectionPadding}>
          <SectionHeader 
            title={searchQuery ? 'Search Results' : 'Popular Products'} 
            actionTitle={searchQuery ? '' : 'See All'} 
          />
          {filteredProducts.length > 0 ? (
            <View style={styles.gridContainer}>
              {renderProductGrid(filteredProducts)}
            </View>
          ) : (
            <EmptyState 
              icon="search-outline" 
              title="No products found" 
              description="Try searching for another keyword." 
              buttonText="Clear Search"
              onButtonPress={() => setSearchQuery('')}
            />
          )}
        </View>

        {!searchQuery && (
          <View style={styles.sectionPadding}>
            <TrustSection theme={theme} />
          </View>
        )}
        
      </ScrollView>
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
    marginBottom: 8,
    maxWidth: '70%',
  },
  heroDiscount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  heroBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
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
    minHeight: 180,
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
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  trustGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trustItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trustIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  trustText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  }
});
