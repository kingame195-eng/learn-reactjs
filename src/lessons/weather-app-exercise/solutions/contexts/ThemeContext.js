import React, { createContext, useContext, useState, useEffect } from 'react';

// 🌙 THEME CONTEXT
const ThemeContext = createContext();

// THEME PROVIDER COMPONENT
export const ThemeProvider = ({ children }) => {
    // Theme state với localStorage persistence
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('weather-app-theme') || 'light';
    });

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem('weather-app-theme', theme);
        document.body.className = `theme-${theme}`;
    }, [theme]);

    // Theme-based configurations
    const themeConfig = {
        light: {
            name: 'Light',
            icon: '☀️',
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            gradients: {
                primary: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                card: 'linear-gradient(145deg, #ffffff, #f8fafc)'
            }
        },
        dark: {
            name: 'Dark',
            icon: '🌙',
            backgroundColor: '#1f2937',
            textColor: '#f9fafb',
            gradients: {
                primary: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                card: 'linear-gradient(145deg, #374151, #1f2937)'
            }
        }
    };

    const contextValue = {
        theme,
        themeConfig: themeConfig[theme],
        toggleTheme,
        isLight: theme === 'light',
        isDark: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook để sử dụng Theme Context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};