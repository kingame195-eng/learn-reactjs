import React from 'react';
import { useTheme } from "../contexts/ThemeContext";
import { useWeather } from '../contexts/WeatherContext';


const WeatherCard = () => {
    const { weatherData, loading, error, addToFavorites, favoriteCities } = useWeather();

    const { themeConfig } = useTheme();

    if (loading) {
        return (
            <div className="weather-card loading">
                <p>Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-card error">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="weather-card empty">
                <p>No weather data available. Please search for a city.</p>
            </div>
        );
    }

    const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity, pressure },
        weather: [{ main: weatherMain, description, icon }],
        wind: { speed }
    } = weatherData;

    const isFavorite = favoriteCities.includes(name);

    //Handle favorite toggle
    const handleFavoriteToggle = () => {
        addToFavorites(name);
    }

    return (
        <div className="weather-card success">
            <div className="weather-header">
                <div className="city-info">
                    <h2>{name}, {country}</h2>
                    <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteToggle}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? '⭐' : '☆'}
                    </button>
                </div>
                <div className="weather-icon">
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                    />
                </div>
            </div>

            <div className="weather-info">
                <div className="temp-main">
                    <span className="temperature">{Math.round(temp)}°C</span>
                    <span className="description">{description}</span>
                </div>

                <div className="weather-details">
                    <div className="detail-item">
                        <span className="label">feels_like:</span>
                        <span className="value">{Math.round(feels_like)}°C</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">humidity:</span>
                        <span className="value">{humidity}%</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">pressure:</span>
                        <span className="value">{pressure} hPa</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">wind speed:</span>
                        <span className="value">{speed} m/s</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;