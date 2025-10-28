import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildWeatherUrl } from '../config/api';

// 🌤️ WEATHER CONTEXT
const WeatherContext = createContext();

// WEATHER PROVIDER COMPONENT
export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [favoriteCities, setFavoriteCities] = useState([]);

    // Fetch weather data function
    const fetchWeatherData = async (cityName) => {
        try {
            setLoading(true);
            setError(null);

            const url = buildWeatherUrl(cityName);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Không tìm thấy thành phố "${cityName}"`);
            }

            const data = await response.json();
            setWeatherData(data);

            // Add to search history
            addToSearchHistory(cityName);

        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    // Search history management
    const addToSearchHistory = (cityName) => {
        setSearchHistory(prev => {
            const filtered = prev.filter(city =>
                city.toLowerCase() !== cityName.toLowerCase()
            );
            return [cityName, ...filtered].slice(0, 5);
        });
    };

    // Favorite cities management
    const addToFavorites = (cityName) => {
        setFavoriteCities(prev => {
            if (prev.includes(cityName)) return prev;
            return [...prev, cityName];
        });
    };

    const removeFromFavorites = (cityName) => {
        setFavoriteCities(prev =>
            prev.filter(city => city !== cityName)
        );
    };

    // Search function
    const searchWeather = (cityName) => {
        setSearchTerm(cityName);
        fetchWeatherData(cityName);
    };

    // Load default weather on mount
    useEffect(() => {
        searchWeather('Hanoi');
    }, []);

    const contextValue = {
        // State
        weatherData,
        loading,
        error,
        searchTerm,
        searchHistory,
        favoriteCities,

        // Actions
        searchWeather,
        addToFavorites,
        removeFromFavorites,
        fetchWeatherData
    };

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
};

// Custom hook để sử dụng Weather Context
export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within WeatherProvider');
    }
    return context;
};