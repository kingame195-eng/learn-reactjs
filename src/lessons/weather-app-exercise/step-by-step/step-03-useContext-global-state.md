# 🌐 Step 3: useContext - Global State Management

## 🎯 Mục tiêu Step 3
- Học cách sử dụng useContext cho global state
- Tạo WeatherContext và ThemeContext
- Share data giữa components mà không prop drilling
- Implement theme switching functionality

## 📚 Kiến thức cần nắm

### Context API Pattern
```javascript
// 1. Create Context
const MyContext = createContext();

// 2. Create Provider
const MyProvider = ({ children }) => {
  const [state, setState] = useState();
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// 3. Use Context
const value = useContext(MyContext);
```

## 🛠️ Bước 1: Tạo WeatherContext

### 📂 Tạo file: `contexts/WeatherContext.js`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildWeatherUrl } from '../config/api';

// 🌤️ CREATE WEATHER CONTEXT
const WeatherContext = createContext();

// 🎯 TODO 1: Weather Provider Component
export const WeatherProvider = ({ children }) => {
  // State management
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  
  // 🎯 TODO 2: Fetch weather data function
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
  
  // 🎯 TODO 3: Search history management
  const addToSearchHistory = (cityName) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(city => 
        city.toLowerCase() !== cityName.toLowerCase()
      );
      return [cityName, ...filtered].slice(0, 5); // Keep last 5 searches
    });
  };
  
  // 🎯 TODO 4: Favorite cities management
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
  
  // 🎯 TODO 5: Search function
  const searchWeather = (cityName) => {
    setSearchTerm(cityName);
    fetchWeatherData(cityName);
  };
  
  // 🎯 TODO 6: Load default weather on mount
  useEffect(() => {
    searchWeather('Hanoi');
  }, []);
  
  // 🎯 TODO 7: Context value
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

// 🎯 TODO 8: Custom hook để sử dụng Weather Context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};
```

## 🛠️ Bước 2: Tạo ThemeContext

### 📂 Tạo file: `contexts/ThemeContext.js`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

// 🌙 CREATE THEME CONTEXT
const ThemeContext = createContext();

// 🎯 TODO 1: Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // 🎯 TODO 2: Theme state với localStorage persistence
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    return localStorage.getItem('weather-app-theme') || 'light';
  });
  
  // 🎯 TODO 3: Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  // 🎯 TODO 4: Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('weather-app-theme', theme);
    // Apply theme class to body
    document.body.className = `theme-${theme}`;
  }, [theme]);
  
  // 🎯 TODO 5: Theme-based configurations
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
  
  // 🎯 TODO 6: Context value
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

// 🎯 TODO 7: Custom hook để sử dụng Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## 🛠️ Bước 3: Tạo ThemeToggle Component

### 📂 Tạo file: `components/ThemeToggle.js`

```javascript
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
```

## 🛠️ Bước 4: Update WeatherCard với Context

### 📂 Update file: `components/WeatherCard.js`

```javascript
import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { useTheme } from '../contexts/ThemeContext';

// 🌤️ WEATHER CARD COMPONENT - Updated with Context
const WeatherCard = () => {
  // 🎯 TODO 1: Use Weather Context instead of props
  const { weatherData, loading, error, addToFavorites, favoriteCities } = useWeather();
  const { themeConfig } = useTheme();
  
  // Loading state
  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="loading-spinner">🌀</div>
        <p>Đang tải dữ liệu thời tiết...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="weather-card error">
        <div className="error-icon">❌</div>
        <h3>Không thể tải dữ liệu thời tiết</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  // No data state
  if (!weatherData) {
    return (
      <div className="weather-card empty">
        <div className="empty-icon">🔍</div>
        <p>Nhập tên thành phố để xem thời tiết</p>
      </div>
    );
  }
  
  // 🎯 TODO 2: Extract weather data
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description, icon }],
    wind: { speed }
  } = weatherData;
  
  // 🎯 TODO 3: Check if city is in favorites
  const isFavorite = favoriteCities.includes(name);
  
  // 🎯 TODO 4: Handle favorite toggle
  const handleFavoriteToggle = () => {
    addToFavorites(name);
  };
  
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
            <span className="label">Cảm giác như:</span>
            <span className="value">{Math.round(feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Độ ẩm:</span>
            <span className="value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Áp suất:</span>
            <span className="value">{pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="label">Tốc độ gió:</span>
            <span className="value">{speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
```

## 🛠️ Bước 5: Update SearchBar với Context

### 📂 Update file: `components/SearchBar.js`

```javascript
import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';

// 🔍 SEARCH BAR COMPONENT - Updated with Context
const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  
  // 🎯 TODO 1: Use Weather Context
  const { searchWeather, searchHistory } = useWeather();
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchWeather(inputValue);
      setInputValue('');
    }
  };
  
  // 🎯 TODO 2: Handle history item click
  const handleHistoryClick = (cityName) => {
    searchWeather(cityName);
  };
  
  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Nhập tên thành phố..."
            value={inputValue}
            onChange={handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Tìm kiếm
          </button>
        </div>
      </form>
      
      {/* 🎯 TODO 3: Search History */}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <h4>Tìm kiếm gần đây:</h4>
          <div className="history-items">
            {searchHistory.map((city, index) => (
              <button
                key={index}
                className="history-item"
                onClick={() => handleHistoryClick(city)}
              >
                📍 {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
```

## 🛠️ Bước 6: Update Main App với Context Providers

### 📂 Update file: `WeatherApp.js`

```javascript
import React from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ThemeToggle from './components/ThemeToggle';
import './styles/WeatherApp.scss';

// 🌤️ MAIN WEATHER APP - Updated with Context Providers
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
};

export default WeatherApp;
```

## 🎨 Bước 7: Theme-aware Styling

### 📂 Update file: `styles/WeatherApp.scss`

```scss
// Add to the beginning of WeatherApp.scss

// 🌙 THEME VARIABLES
:root {
  --transition: all 0.3s ease;
}

// Light theme
body.theme-light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

// Dark theme
body.theme-dark {
  --bg-primary: #1f2937;
  --bg-secondary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #4b5563;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

// Update existing styles to use CSS variables
.weather-app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
  min-height: 100vh;
  
  .weather-header {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    padding: 2rem;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 800px;
      margin: 0 auto;
      
      .title-section {
        h1 {
          color: white;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin: 0;
        }
      }
    }
  }
}

// 🌙 THEME TOGGLE STYLES
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .theme-icon {
    font-size: 1.2rem;
  }
}

// 📍 SEARCH HISTORY STYLES
.search-container {
  .search-history {
    margin-top: 1rem;
    
    h4 {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .history-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      
      .history-item {
        padding: 0.5rem 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        color: var(--text-primary);
        cursor: pointer;
        transition: var(--transition);
        font-size: 0.9rem;
        
        &:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-1px);
        }
      }
    }
  }
}

// ⭐ FAVORITE BUTTON STYLES
.weather-card.success {
  .weather-header {
    .city-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .favorite-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        transition: var(--transition);
        
        &:hover {
          transform: scale(1.2);
        }
        
        &.active {
          color: #fbbf24;
        }
      }
    }
  }
}

// Update weather-card to use CSS variables
.weather-card {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  transition: var(--transition);
}
```

## ✅ Checkpoint

Sau khi hoàn thành Step 3, bạn nên có:

1. ✅ WeatherContext provide weather data globally
2. ✅ ThemeContext handle theme switching
3. ✅ Components use Context thay vì prop drilling
4. ✅ Theme toggle button hoạt động
5. ✅ Search history được lưu và hiển thị
6. ✅ Favorite cities functionality
7. ✅ Theme persistence với localStorage

### 🧪 Test Cases:
- [ ] Click theme toggle → UI changes theme
- [ ] Refresh page → theme persists
- [ ] Search cities → appears in search history
- [ ] Click history item → searches that city
- [ ] Click star icon → adds/removes from favorites

## 🔧 Context Best Practices

### ✅ Do:
```javascript
// ✅ Create custom hooks
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

// ✅ Split contexts by concern
// WeatherContext for weather data
// ThemeContext for UI theme
```

### ❌ Don't:
```javascript
// ❌ Don't put everything in one massive context
const AppContext = createContext({
  weather: {},
  theme: {},
  user: {},
  settings: {},
  // ... too much!
});

// ❌ Don't use context for frequently changing values
// (causes all consumers to re-render)
```

## 🚀 Next Step

Khi đã hoàn thành Step 3, tiếp tục với:
```bash
open step-by-step/step-04-custom-hooks.md
```

---

**🎉 Amazing! Global state management với useContext completed!**