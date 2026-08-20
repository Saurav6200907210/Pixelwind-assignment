import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { StatusBar } from 'expo-status-bar';
import { View, Platform, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <AppWrapper />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

function AppWrapper() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.dark ? '#000' : '#E5E5E5' }]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <View style={[styles.appContainer, { backgroundColor: theme.colors.background }]}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 480 : '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  }
});
