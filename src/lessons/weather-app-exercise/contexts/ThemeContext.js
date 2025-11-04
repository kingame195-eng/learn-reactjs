import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('weather-app-theme') || 'light';
    });
    
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem('weather-app-theme', theme);
        // Apply theme class to body
        document.body.className = `theme-${theme}`;
    }, [theme]);

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
 
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};