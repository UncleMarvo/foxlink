'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the theme colors interface
export interface ThemeColors {
  primary: string;      // For icons and accents
  background: string;   // For main background
  surface: string;      // For cards and elevated surfaces
  border: string;       // For borders
  text: {
    primary: string;    // For main text
    secondary: string;  // For secondary text
    accent: string;     // For accent text
  };
  shadow: string;       // For shadows
  hover: {
    background: string; // For hover states
    shadow: string;     // For hover shadows
  };
  backgroundPattern?: string;  // SVG pattern as a data URL
}

// Define the theme context interface
interface ThemeContextType {
  colors: ThemeColors;
  setTheme: (theme: 'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam') => void;
  currentTheme: 'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam';
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the theme colors for each theme
const themes: Record<'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam', ThemeColors> = {
  OceanBreeze: {
    primary: "#3498db",      // Bright blue
    background: "#f5f9fc",   // Very light blue-gray
    surface: "#ffffff",      // White
    border: "#d0e1f9",       // Light blue
    text: {
      primary: "#2c3e50",    // Dark blue-gray
      secondary: "#7f8c8d",  // Medium gray
      accent: "#2980b9",     // Darker blue
    },
    shadow: "rgba(52, 152, 219, 0.1)",
    hover: {
      background: "#e1f0fa", // Light blue
      shadow: "rgba(52, 152, 219, 0.2)"
    },
  },
  ForestRetreat: {
    primary: "#27ae60",      // Green
    background: "#f5fff7",   // Very light green tint
    surface: "#ffffff",      // White
    border: "#c8e6c9",       // Light green
    text: {
      primary: "#2c3c2d",    // Dark green-gray
      secondary: "#7d8a7e",  // Muted green-gray
      accent: "#219653",     // Darker green
    },
    shadow: "rgba(39, 174, 96, 0.1)",
    hover: {
      background: "#e8f5e9", // Light green
      shadow: "rgba(39, 174, 96, 0.2)"
    },
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2327ae60' fill-opacity='0.07'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  Twilight: {
    primary: "#8e44ad",      // Purple
    background: "#f9f5fd",   // Very light purple
    surface: "#ffffff",      // White
    border: "#e1d5e7",       // Light purple
    text: {
      primary: "#2e2236",    // Dark purple-gray
      secondary: "#7c7583",  // Muted purple-gray
      accent: "#7d3c98",     // Darker purple
    },
    shadow: "rgba(142, 68, 173, 0.1)",
    hover: {
      background: "#f3e5f5", // Light purple
      shadow: "rgba(142, 68, 173, 0.2)"
    },
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238e44ad' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  Amber: {
    primary: "#FF7E00",      // Bright orange
    background: "#FFF9F0",   // Very light orange tint
    surface: "#ffffff",      // White
    border: "#FFCB8E",       // Light orange
    text: {
      primary: "#33281E",    // Dark brown
      secondary: "#8A7968",  // Medium warm gray
      accent: "#D35400",     // Burnt orange
    },
    shadow: "rgba(255, 126, 0, 0.15)",
    hover: {
      background: "#FFE8CC", // Light orange
      shadow: "rgba(255, 126, 0, 0.25)"
    },
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='44' height='12' viewBox='0 0 44 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12v-2L0 0v10l4 2h16zm18 0l4-2V0L22 10v2h16zM20 0v8L4 0h16zm18 0L22 8V0h16z' fill='%23FF7E00' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  Azure: {
    primary: "#0078D7",      // Vibrant blue
    background: "#F0F8FF",   // Light blue tint
    surface: "#ffffff",      // White
    border: "#99D6FF",       // Light blue
    text: {
      primary: "#1A365D",    // Dark navy
      secondary: "#718096",  // Blue-gray
      accent: "#0056B3",     // Deep blue
    },
    shadow: "rgba(0, 120, 215, 0.15)",
    hover: {
      background: "#DEEFFF", // Light blue
      shadow: "rgba(0, 120, 215, 0.25)"
    },
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230078D7' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  Sunbeam: {
    primary: "#FFB400",      // Bright yellow
    background: "#FFFAEB",   // Very light yellow
    surface: "#ffffff",      // White
    border: "#FFE399",       // Light yellow
    text: {
      primary: "#3D3000",    // Dark brown
      secondary: "#8D7B42",  // Muted gold
      accent: "#E09E00",     // Deep gold
    },
    shadow: "rgba(255, 180, 0, 0.15)",
    hover: {
      background: "#FFF0C0", // Light yellow
      shadow: "rgba(255, 180, 0, 0.25)"
    },
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFB400' fill-opacity='0.07' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
  },
};

export const themeNames = [
  "OceanBreeze",
  "ForestRetreat",
  "Twilight",
  "Amber",
  "Azure",
  "Sunbeam",
] as const;

export type ThemeName = typeof themeNames[number];
export { themes };

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam';
}

// Create the provider component
export function ThemeProvider({ children, initialTheme = 'OceanBreeze' }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam'>(initialTheme);

  // Function to set the theme
  const setTheme = (theme: 'OceanBreeze' | 'ForestRetreat' | 'Twilight' | 'Amber' | 'Azure' | 'Sunbeam') => {
    setCurrentTheme(theme);
    // Apply theme to document
    if (theme === null) {
      document.documentElement.classList.toggle('OceanBreeze', theme === 'OceanBreeze');
    }
  };

  // Get the current theme colors
  const colors = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ colors, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 