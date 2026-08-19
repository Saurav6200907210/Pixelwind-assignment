import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../constants/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme_mode');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme preference', error);
    } finally {
      setIsReady(true);
    }
  };

  const saveTheme = async (mode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem('@theme_mode', mode);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  const currentTheme = themeMode === 'system' 
    ? (systemColorScheme === 'dark' ? darkTheme : lightTheme)
    : (themeMode === 'dark' ? darkTheme : lightTheme);

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode: saveTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
