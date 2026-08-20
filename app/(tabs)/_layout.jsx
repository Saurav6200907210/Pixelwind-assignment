import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          height: Platform.OS === 'ios' ? 96 : 76,
          paddingBottom: Platform.OS === 'ios' ? 32 : 12,
          paddingTop: 12,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons name={focused ? "cart" : "cart-outline"} size={24} color={color} />
              {cartItemCount > 0 && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -4,
                  backgroundColor: theme.colors.danger,
                  borderRadius: 10,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 3,
                  borderWidth: 1.5,
                  borderColor: theme.colors.surface,
                }}>
                  <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
