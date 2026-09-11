import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeConfig } from '../types';

export const THEMES: Record<ThemeId, ThemeConfig> = {
  moove: {
    id: 'moove',
    name: 'Moove Signature',
    category: 'Digital Studio & SaaS',
    primaryColor: '#6366f1',
    primaryLight: '#eef2ff',
    accentColor: '#06b6d4',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '1.25rem',
    previewGradient: 'from-indigo-500 to-cyan-400',
  },
  fintech: {
    id: 'fintech',
    name: 'FinTech Capital',
    category: 'Finance & Banking',
    primaryColor: '#059669',
    primaryLight: '#ecfdf5',
    accentColor: '#6366f1',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '1.25rem',
    previewGradient: 'from-emerald-600 to-teal-400',
  },
  healthcare: {
    id: 'healthcare',
    name: 'CarePulse Health',
    category: 'Healthcare & Medical',
    primaryColor: '#0284c7',
    primaryLight: '#f0f9ff',
    accentColor: '#14b8a6',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '1.5rem',
    previewGradient: 'from-sky-500 to-teal-400',
  },
  realestate: {
    id: 'realestate',
    name: 'EstatePro Realty',
    category: 'Property & Real Estate',
    primaryColor: '#d97706',
    primaryLight: '#fffbeb',
    accentColor: '#0284c7',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '1rem',
    previewGradient: 'from-amber-600 to-orange-400',
  },
  marketing: {
    id: 'marketing',
    name: 'Vivid Marketing',
    category: 'Growth & Social Analytics',
    primaryColor: '#8b5cf6',
    primaryLight: '#f5f3ff',
    accentColor: '#ec4899',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '1.25rem',
    previewGradient: 'from-purple-600 to-pink-500',
  },
};

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeId: ThemeId) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moove_theme_id') as ThemeId;
      if (saved && THEMES[saved]) return saved;
    }
    return 'moove';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moove_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return false; // Default to Light Mode as requested
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    try {
      localStorage.setItem('moove_theme_id', themeId);
      localStorage.setItem('moove_dark_mode', String(isDarkMode));
    } catch {
      // Ignore storage errors
    }
  }, [themeId, isDarkMode]);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: THEMES[themeId],
        setTheme,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
