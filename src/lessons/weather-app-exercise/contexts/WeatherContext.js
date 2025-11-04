import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildWeatherUrl } from '../config/api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [favoriteCities, setFavoriteCities] = useState([]);

    const addToSearchHistory = (cityName) => {
        setSearchHistory(prevHistory => {
            const filtered = prevHistory.filter(
                city => city.toLowerCase() !== cityName.toLowerCase()
            );
            return [cityName, ...filtered].slice(0, 5
            );
        });
    }

    const addToFavorites = (cityName) => {
        setFavoriteCities(prevFavorites => {
            if (prevFavorites.includes(cityName))
                return prevFavorites; // Đã có trong favorites, không thêm nữa
            return [...prevFavorites, cityName];
        });
    }

    const removeFromFavorites = (cityName) => {
        setFavoriteCities(prevFavorites =>
            prevFavorites.filter(city => city !== cityName)
        );
    };

    const searchWeather = (cityName) => {
        setSearchTerm(cityName);
        fetchWeatherData(cityName);
    };

    useEffect(() => {
        searchWeather('Hanoi');
    }, []);

    const fetchWeatherData = async (cityName) => {
        try {
            setLoading(true);
            setError(null);

            const url = buildWeatherUrl(cityName);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch weather data "${cityName}"`);
            }
            const data = await response.json();
            setWeatherData(data);
            // Add to search history
            addToSearchHistory(cityName);
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

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

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within WeatherProvider');
    }
    return context;
};

export default WeatherContext;