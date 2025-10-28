# 🔧 Step 4: Custom Hooks - Logic Separation & Reusability

## 🎯 Mục tiêu Step 4
- Tạo custom hooks để tách logic khỏi UI components
- Implement useWeather, useLocalStorage, useGeolocation hooks
- Hiểu cách reuse logic giữa nhiều components
- Performance optimization với useMemo và useCallback

## 📚 Kiến thức cần nắm

### Custom Hooks Pattern
```javascript
// Custom hook = function bắt đầu với "use" + sử dụng React hooks
const useCustomHook = (params) => {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Side effects
  }, []);
  
  // Return values and functions
  return { state, actions };
};
```

## 🛠️ Bước 1: Tạo useLocalStorage Hook

### 📂 Tạo file: `hooks/useLocalStorage.js`

```javascript
import { useState, useEffect } from 'react';

// 💾 LOCAL STORAGE CUSTOM HOOK
export const useLocalStorage = (key, initialValue) => {
  // 🎯 TODO 1: Initialize state with value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get item from localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // 🎯 TODO 2: Create setValue function that updates both state and localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  // 🎯 TODO 3: Remove from localStorage function
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue, removeValue];
};

// 🎯 USAGE EXAMPLE:
// const [favorites, setFavorites, removeFavorites] = useLocalStorage('favorites', []);
```

## 🛠️ Bước 2: Tạo useGeolocation Hook  

### 📂 Tạo file: `hooks/useGeolocation.js`

```javascript
import { useState, useEffect } from 'react';

// 📍 GEOLOCATION CUSTOM HOOK
export const useGeolocation = (options = {}) => {
  // 🎯 TODO 1: State management
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 🎯 TODO 2: Get current position function
  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options
    };
    
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now()
        });
        setLoading(false);
      },
      // Error callback
      (error) => {
        let errorMessage = 'An unknown error occurred';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      defaultOptions
    );
  };
  
  // 🎯 TODO 3: Watch position function (for continuous tracking)
  const watchPosition = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return null;
    }
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now()
        });
      },
      (error) => {
        setError(error.message);
      },
      options
    );
    
    return watchId;
  };
  
  // 🎯 TODO 4: Clear watch function
  const clearWatch = (watchId) => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };
  
  return {
    location,
    error,
    loading,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    isLocationAvailable: location.latitude !== null && location.longitude !== null
  };
};

// 🎯 USAGE EXAMPLE:
// const { location, error, loading, getCurrentPosition } = useGeolocation();
```

## 🛠️ Bước 3: Tạo useWeatherAPI Hook

### 📂 Tạo file: `hooks/useWeatherAPI.js`

```javascript
import { useState, useEffect, useCallback, useMemo } from 'react';
import { buildWeatherUrl, buildForecastUrl } from '../config/api';

// 🌤️ WEATHER API CUSTOM HOOK
export const useWeatherAPI = () => {
  // 🎯 TODO 1: State management
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearched, setLastSearched] = useState(null);
  
  // 🎯 TODO 2: Fetch weather by city name
  const fetchWeatherByCity = useCallback(async (cityName) => {
    if (!cityName) return;
    
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
      setLastSearched(cityName);
      
      return data;
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 🎯 TODO 3: Fetch weather by coordinates
  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    if (!lat || !lon) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=vi`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Không thể lấy thời tiết từ vị trí hiện tại');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLastSearched(`${data.name}, ${data.sys.country}`);
      
      return data;
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 🎯 TODO 4: Fetch 5-day forecast
  const fetchForecast = useCallback(async (cityName) => {
    if (!cityName) return;
    
    try {
      const url = buildForecastUrl(cityName);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Không thể lấy dự báo cho "${cityName}"`);
      }
      
      const data = await response.json();
      setForecastData(data);
      
      return data;
    } catch (err) {
      console.error('Forecast fetch error:', err);
      // Don't set error state for forecast - it's optional
      return null;
    }
  }, []);
  
  // 🎯 TODO 5: Processed weather data với useMemo
  const processedWeatherData = useMemo(() => {
    if (!weatherData) return null;
    
    return {
      ...weatherData,
      // Add computed properties
      tempRounded: Math.round(weatherData.main.temp),
      feelsLikeRounded: Math.round(weatherData.main.feels_like),
      windSpeedKmh: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : null, // Convert to km
      weatherIcon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      isDay: weatherData.weather[0].icon.includes('d'),
      backgroundGradient: getWeatherGradient(weatherData.weather[0].main)
    };
  }, [weatherData]);
  
  // 🎯 TODO 6: Helper function for weather-based backgrounds
  const getWeatherGradient = (weatherMain) => {
    const gradients = {
      Clear: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      Clouds: 'linear-gradient(135deg, #a4b0be 0%, #57606f 100%)',
      Rain: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
      Drizzle: 'linear-gradient(135deg, #74b9ff 0%, #636e72 100%)',
      Thunderstorm: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
      Snow: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
      Mist: 'linear-gradient(135deg, #a4b0be 0%, #747d8c 100%)',
      Fog: 'linear-gradient(135deg, #a4b0be 0%, #747d8c 100%)'
    };
    
    return gradients[weatherMain] || gradients.Clear;
  };
  
  return {
    // State
    weatherData: processedWeatherData,
    forecastData,
    loading,
    error,
    lastSearched,
    
    // Actions
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchForecast,
    
    // Helpers
    hasWeatherData: !!weatherData,
    hasForecastData: !!forecastData
  };
};
```

## 🛠️ Bước 4: Tạo useFavorites Hook

### 📂 Tạo file: `hooks/useFavorites.js`

```javascript
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

// ⭐ FAVORITES MANAGEMENT CUSTOM HOOK
export const useFavorites = () => {
  // 🎯 TODO 1: Use localStorage hook for persistence
  const [favorites, setFavorites] = useLocalStorage('weather-favorites', []);
  
  // 🎯 TODO 2: Add city to favorites
  const addToFavorites = useCallback((cityName) => {
    if (!cityName) return;
    
    setFavorites(prev => {
      // Check if already exists (case insensitive)
      const exists = prev.some(city => 
        city.toLowerCase() === cityName.toLowerCase()
      );
      
      if (exists) return prev;
      
      // Add new favorite
      const newFavorite = {
        name: cityName,
        addedAt: Date.now()
      };
      
      return [...prev, newFavorite];
    });
  }, [setFavorites]);
  
  // 🎯 TODO 3: Remove city from favorites
  const removeFromFavorites = useCallback((cityName) => {
    setFavorites(prev => 
      prev.filter(favorite => 
        favorite.name.toLowerCase() !== cityName.toLowerCase()
      )
    );
  }, [setFavorites]);
  
  // 🎯 TODO 4: Toggle favorite status
  const toggleFavorite = useCallback((cityName) => {
    const isFavorite = favorites.some(favorite => 
      favorite.name.toLowerCase() === cityName.toLowerCase()
    );
    
    if (isFavorite) {
      removeFromFavorites(cityName);
    } else {
      addToFavorites(cityName);
    }
  }, [favorites, addToFavorites, removeFromFavorites]);
  
  // 🎯 TODO 5: Check if city is favorite
  const isFavorite = useCallback((cityName) => {
    return favorites.some(favorite => 
      favorite.name.toLowerCase() === cityName.toLowerCase()
    );
  }, [favorites]);
  
  // 🎯 TODO 6: Get favorites sorted by date
  const getFavoritesSorted = useCallback(() => {
    return [...favorites].sort((a, b) => b.addedAt - a.addedAt);
  }, [favorites]);
  
  // 🎯 TODO 7: Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);
  
  return {
    favorites: getFavoritesSorted(),
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
    hasFavorites: favorites.length > 0
  };
};
```

## 🛠️ Bước 5: Tạo useSearchHistory Hook

### 📂 Tạo file: `hooks/useSearchHistory.js`

```javascript
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

// 📍 SEARCH HISTORY CUSTOM HOOK
export const useSearchHistory = (maxItems = 10) => {
  // 🎯 TODO 1: Use localStorage for persistence
  const [searchHistory, setSearchHistory] = useLocalStorage('weather-search-history', []);
  
  // 🎯 TODO 2: Add search to history
  const addToHistory = useCallback((cityName) => {
    if (!cityName) return;
    
    setSearchHistory(prev => {
      // Remove existing entry (case insensitive)
      const filtered = prev.filter(item => 
        item.city.toLowerCase() !== cityName.toLowerCase()
      );
      
      // Add new search at the beginning
      const newSearch = {
        city: cityName,
        searchedAt: Date.now(),
        id: Date.now() + Math.random() // Simple unique ID
      };
      
      // Keep only maxItems
      return [newSearch, ...filtered].slice(0, maxItems);
    });
  }, [setSearchHistory, maxItems]);
  
  // 🎯 TODO 3: Remove specific search from history
  const removeFromHistory = useCallback((cityName) => {
    setSearchHistory(prev => 
      prev.filter(item => 
        item.city.toLowerCase() !== cityName.toLowerCase()
      )
    );
  }, [setSearchHistory]);
  
  // 🎯 TODO 4: Clear all history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);
  
  // 🎯 TODO 5: Get recent searches (last N items)
  const getRecentSearches = useCallback((count = 5) => {
    return searchHistory.slice(0, count);
  }, [searchHistory]);
  
  // 🎯 TODO 6: Check if city is in history
  const isInHistory = useCallback((cityName) => {
    return searchHistory.some(item => 
      item.city.toLowerCase() === cityName.toLowerCase()
    );
  }, [searchHistory]);
  
  // 🎯 TODO 7: Get search frequency (how many times searched)
  const getSearchFrequency = useCallback((cityName) => {
    return searchHistory.filter(item => 
      item.city.toLowerCase() === cityName.toLowerCase()
    ).length;
  }, [searchHistory]);
  
  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
    isInHistory,
    getSearchFrequency,
    historyCount: searchHistory.length,
    hasHistory: searchHistory.length > 0
  };
};
```

## 🛠️ Bước 6: Update Components để sử dụng Custom Hooks

### 📂 Tạo file: `components/CurrentLocationButton.js`

```javascript
import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

// 📍 CURRENT LOCATION BUTTON COMPONENT
const CurrentLocationButton = () => {
  // 🎯 TODO 1: Use custom hooks
  const { location, error, loading, getCurrentPosition } = useGeolocation();
  const { fetchWeatherByCoords } = useWeatherAPI();
  
  // 🎯 TODO 2: Handle get current location
  const handleGetCurrentLocation = async () => {
    try {
      // Get current position
      getCurrentPosition();
      
      // Wait for location to be available, then fetch weather
      if (location.latitude && location.longitude) {
        await fetchWeatherByCoords(location.latitude, location.longitude);
      }
    } catch (err) {
      console.error('Error getting current location weather:', err);
    }
  };
  
  // 🎯 TODO 3: Auto-fetch weather when location is available
  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location.latitude, location.longitude, fetchWeatherByCoords]);
  
  return (
    <button 
      className="current-location-btn"
      onClick={handleGetCurrentLocation}
      disabled={loading}
      title="Lấy thời tiết vị trí hiện tại"
    >
      {loading ? (
        <>🌀 Đang lấy vị trí...</>
      ) : (
        <>📍 Vị trí hiện tại</>
      )}
      {error && <div className="error-tooltip">{error}</div>}
    </button>
  );
};

export default CurrentLocationButton;
```

### 📂 Tạo file: `components/FavoriteCitiesList.js`

```javascript
import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

// ⭐ FAVORITE CITIES LIST COMPONENT
const FavoriteCitiesList = () => {
  // 🎯 TODO 1: Use custom hooks
  const { favorites, removeFromFavorites, hasFavorites } = useFavorites();
  const { fetchWeatherByCity } = useWeatherAPI();
  
  // 🎯 TODO 2: Handle favorite city click
  const handleFavoriteClick = (cityName) => {
    fetchWeatherByCity(cityName);
  };
  
  // Don't render if no favorites
  if (!hasFavorites) {
    return (
      <div className="favorites-list empty">
        <p>⭐ Chưa có thành phố yêu thích nào</p>
      </div>
    );
  }
  
  return (
    <div className="favorites-list">
      <h3>⭐ Thành phố yêu thích</h3>
      <div className="favorites-items">
        {favorites.map((favorite) => (
          <div key={favorite.name} className="favorite-item">
            <button
              className="favorite-name"
              onClick={() => handleFavoriteClick(favorite.name)}
            >
              📍 {favorite.name}
            </button>
            <button
              className="remove-favorite"
              onClick={() => removeFromFavorites(favorite.name)}
              title="Xóa khỏi yêu thích"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCitiesList;
```

## 🎨 Bước 7: Styling cho New Components

### 📂 Add to `styles/WeatherApp.scss`

```scss
// 📍 CURRENT LOCATION BUTTON
.current-location-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  position: relative;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .error-tooltip {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #ef4444;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
    
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #ef4444;
    }
  }
}

// ⭐ FAVORITES LIST
.favorites-list {
  margin-top: 2rem;
  
  &.empty {
    text-align: center;
    color: var(--text-secondary);
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .favorites-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .favorite-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      transition: var(--transition);
      
      &:hover {
        background: rgba(59, 130, 246, 0.1);
        border-color: #3b82f6;
      }
      
      .favorite-name {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        font-weight: 500;
        flex: 1;
        text-align: left;
        padding: 0.25rem;
        
        &:hover {
          color: #3b82f6;
        }
      }
      
      .remove-favorite {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: var(--transition);
        
        &:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      }
    }
  }
}
```

## ✅ Checkpoint

Sau khi hoàn thành Step 4, bạn nên có:

1. ✅ useLocalStorage hook for data persistence
2. ✅ useGeolocation hook for location services
3. ✅ useWeatherAPI hook with optimized API calls
4. ✅ useFavorites hook for favorites management
5. ✅ useSearchHistory hook for search tracking
6. ✅ CurrentLocationButton component
7. ✅ FavoriteCitiesList component
8. ✅ Performance optimizations với useMemo/useCallback

### 🧪 Test Cases:
- [ ] Current location button gets weather for current position
- [ ] Favorites persist across page refreshes
- [ ] Search history shows recent searches
- [ ] Clicking favorite city searches that city
- [ ] Remove favorite works correctly

## 🔧 Custom Hooks Best Practices

### ✅ Do:
```javascript
// ✅ Return object with named properties
return {
  data,
  loading,
  error,
  actions: { fetch, reset }
};

// ✅ Use useCallback for functions
const fetchData = useCallback(async () => {
  // fetch logic
}, [dependencies]);

// ✅ Use useMemo for expensive computations
const processedData = useMemo(() => {
  return heavyComputation(rawData);
}, [rawData]);
```

### ❌ Don't:
```javascript
// ❌ Don't return array if you have many values
return [data, loading, error, fetch, reset, clear]; // Confusing order

// ❌ Don't forget dependencies in useCallback/useMemo
const fetchData = useCallback(async () => {
  // uses external variable but missing from deps
}, []); // Missing dependencies!
```

## 🚀 Next Step

Khi đã hoàn thành Step 4, tiếp tục với:
```bash
open step-by-step/step-05-advanced-features.md
```

---

**🎉 Fantastic! Custom hooks mastery completed!**