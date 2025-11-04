import React from 'react';
import SearchBar from "./components/SearchBar";
import "./styles/WeatherApp.scss";
import WeatherCard from './components/WeatherCard';
import { WeatherProvider } from './contexts/WeatherContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const WeatherApp = () => {

    return (
        <ThemeProvider>
            <WeatherProvider>
                <div className="weather-app">
                    <header className="weather-header">
                        <div className="header-content">
                            <div className="title-section">
                                <h1>🌤️ Weather App</h1>
                                <p>Tìm kiếm thời tiết bất kỳ thành phố nào</p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </header>

                    <main className="weather-main">
                        <SearchBar />
                        <WeatherCard />
                    </main>
                </div>
            </WeatherProvider>
        </ThemeProvider>
    );


}

export default WeatherApp;