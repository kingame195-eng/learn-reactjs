import React, { Suspense, lazy } from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ThemeToggle from './components/ThemeToggle';
import './styles/WeatherApp.scss';

// Lazy load heavy components
const ForecastList = lazy(() => import('./components/ForecastList'));
const FavoriteCitiesList = lazy(() => import('./components/FavoriteCitiesList'));
const CurrentLocationButton = lazy(() => import('./components/CurrentLocationButton'));

// 🌤️ PERFORMANCE OPTIMIZED WEATHER APP
const WeatherApp = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <WeatherProvider>
                    <div className="weather-app">
                        <header className="weather-header">
                            <div className="header-content">
                                <div className="title-section">
                                    <h1>🌤️ Weather App</h1>
                                    <p>Tìm kiếm thời tiết bất kỳ thành phố nào</p>
                                </div>
                                <div className="header-actions">
                                    <Suspense fallback={<div className="loading-button">📍</div>}>
                                        <CurrentLocationButton />
                                    </Suspense>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>

                        <main className="weather-main">
                            <div className="main-content">
                                <div className="primary-section">
                                    <SearchBar />
                                    <WeatherCard />

                                    <Suspense fallback={<LoadingSkeleton type="forecast" />}>
                                        <ForecastList />
                                    </Suspense>
                                </div>

                                <aside className="sidebar-section">
                                    <Suspense fallback={<LoadingSkeleton type="search" />}>
                                        <FavoriteCitiesList />
                                    </Suspense>
                                </aside>
                            </div>
                        </main>
                    </div>
                </WeatherProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default WeatherApp;