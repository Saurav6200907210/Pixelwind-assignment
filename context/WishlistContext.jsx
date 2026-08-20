import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const stored = await AsyncStorage.getItem('wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
  };

  const saveWishlist = async (items) => {
    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev;
      const updated = [...prev, product];
      saveWishlist(updated);
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => {
      const updated = prev.filter(item => item.id !== productId);
      saveWishlist(updated);
      return updated;
    });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
