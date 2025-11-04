import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// 🌙 THEME TOGGLE COMPONENT
const ThemeToggle = () => {
    // 🎯 TODO 1: Use Theme Context
    const { theme, themeConfig, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <span className="theme-icon">
                {themeConfig.icon}
            </span>
            <span className="theme-text">
                {themeConfig.name}
            </span>
        </button>
    );
};

export default ThemeToggle;