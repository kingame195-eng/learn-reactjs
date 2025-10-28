# 🚀 Step 5: Advanced Features & Performance Optimization

## 🎯 Mục tiêu Step 5
- Implement 5-day forecast feature
- Add performance optimizations
- Error boundaries và loading states
- Advanced UI/UX improvements
- Code splitting và lazy loading

## 📚 Kiến thức cần nắm

### Performance Hooks
- `React.memo()` - Prevent unnecessary re-renders
- `useMemo()` - Memoize expensive calculations
- `useCallback()` - Memoize functions
- `React.lazy()` - Code splitting
- `Suspense` - Loading boundaries

## 🛠️ Bước 1: Tạo 5-Day Forecast Component

### 📂 Tạo file: `components/ForecastList.js`

```javascript
import React, { memo } from 'react';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

// 📈 FORECAST LIST COMPONENT - Memoized for performance
const ForecastList = memo(() => {
  const { forecastData, fetchForecast, lastSearched } = useWeatherAPI();
  
  // 🎯 TODO 1: Process forecast data
  const processedForecast = React.useMemo(() => {
    if (!forecastData || !forecastData.list) return [];
    
    // Group by day (take one forecast per day at 12:00)
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      // Take 12:00 PM forecast or first available for each day
      if (!dailyForecasts[dayKey] || item.dt_txt.includes('12:00:00')) {
        dailyForecasts[dayKey] = {
          ...item,
          dayName: date.toLocaleDateString('vi-VN', { weekday: 'long' }),
          shortDate: date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      }
    });
    
    // Convert to array and take first 5 days
    return Object.values(dailyForecasts).slice(0, 5);
  }, [forecastData]);
  
  // 🎯 TODO 2: Auto-fetch forecast when lastSearched changes
  React.useEffect(() => {
    if (lastSearched) {
      fetchForecast(lastSearched);
    }
  }, [lastSearched, fetchForecast]);
  
  // Don't render if no forecast data
  if (!processedForecast.length) {
    return (
      <div className="forecast-list empty">
        <p>📈 Dự báo 5 ngày sẽ hiện thị ở đây</p>
      </div>
    );
  }
  
  return (
    <div className="forecast-list">
      <h3>📈 Dự báo 5 ngày tới</h3>
      <div className="forecast-items">
        {processedForecast.map((forecast, index) => (
          <ForecastItem key={forecast.dt} forecast={forecast} isToday={index === 0} />
        ))}
      </div>
    </div>
  );
});

// 🎯 TODO 3: Individual Forecast Item Component - Memoized
const ForecastItem = memo(({ forecast, isToday }) => {
  return (
    <div className={`forecast-item ${isToday ? 'today' : ''}`}>
      <div className="forecast-day">
        <span className="day-name">
          {isToday ? 'Hôm nay' : forecast.dayName}
        </span>
        <span className="day-date">{forecast.shortDate}</span>
      </div>
      
      <div className="forecast-weather">
        <img 
          src={forecast.icon} 
          alt={forecast.description}
          className="forecast-icon"
        />
        <span className="forecast-desc">{forecast.description}</span>
      </div>
      
      <div className="forecast-temp">
        <span className="temp-max">{forecast.tempMax}°</span>
        <span className="temp-min">{forecast.tempMin}°</span>
      </div>
      
      <div className="forecast-details">
        <span className="humidity">💧 {forecast.humidity}%</span>
        <span className="wind">🌬️ {forecast.windSpeed}m/s</span>
      </div>
    </div>
  );
});

ForecastList.displayName = 'ForecastList';
ForecastItem.displayName = 'ForecastItem';

export default ForecastList;
```

## 🛠️ Bước 2: Tạo Error Boundary Component

### 📂 Tạo file: `components/ErrorBoundary.js`

```javascript
import React from 'react';

// 🚨 ERROR BOUNDARY COMPONENT
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }
  
  // 🎯 TODO 1: Catch errors during render
  static getDerivedStateFromError(error) {
    // Update state to show error UI
    return { hasError: true };
  }
  
  // 🎯 TODO 2: Log error details
  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, send to error reporting service)
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }
  
  // 🎯 TODO 3: Reset error state
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };
  
  render() {
    if (this.state.hasError) {
      // 🎯 TODO 4: Error UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">💥</div>
            <h2>Oops! Có lỗi xảy ra</h2>
            <p>Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.</p>
            
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={this.resetError}
              >
                🔄 Thử lại
              </button>
              <button 
                className="reload-button"
                onClick={() => window.location.reload()}
              >
                ↻ Tải lại trang
              </button>
            </div>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Chi tiết lỗi (Development only)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    
    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 🛠️ Bước 3: Tạo Loading Skeleton Component

### 📂 Tạo file: `components/LoadingSkeleton.js`

```javascript
import React from 'react';

// 💀 LOADING SKELETON COMPONENT
const LoadingSkeleton = ({ type = 'weather' }) => {
  // 🎯 TODO 1: Different skeleton types
  const renderWeatherSkeleton = () => (
    <div className="loading-skeleton weather-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-icon"></div>
      </div>
      <div className="skeleton-temp"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-details">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
    </div>
  );
  
  const renderForecastSkeleton = () => (
    <div className="loading-skeleton forecast-skeleton">
      <div className="skeleton-title"></div>
      <div className="skeleton-forecast-items">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton-forecast-item">
            <div className="skeleton-day"></div>
            <div className="skeleton-icon"></div>
            <div className="skeleton-temp"></div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderSearchSkeleton = () => (
    <div className="loading-skeleton search-skeleton">
      <div className="skeleton-search-bar"></div>
      <div className="skeleton-history">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="skeleton-history-item"></div>
        ))}
      </div>
    </div>
  );
  
  // 🎯 TODO 2: Return appropriate skeleton based on type
  switch (type) {
    case 'weather':
      return renderWeatherSkeleton();
    case 'forecast':
      return renderForecastSkeleton();
    case 'search':
      return renderSearchSkeleton();
    default:
      return renderWeatherSkeleton();
  }
};

export default LoadingSkeleton;
```

## 🛠️ Bước 4: Performance Optimized WeatherApp

### 📂 Update file: `WeatherApp.js`

```javascript
import React, { Suspense, lazy } from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ThemeToggle from './components/ThemeToggle';
import './styles/WeatherApp.scss';

// 🎯 TODO 1: Lazy load heavy components
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
```

## 🛠️ Bước 5: Advanced Styling

### 📂 Update file: `styles/WeatherApp.scss`

```scss
// Add to WeatherApp.scss

// 📈 FORECAST LIST STYLES
.forecast-list {
  margin-top: 2rem;
  
  &.empty {
    text-align: center;
    color: var(--text-secondary);
    padding: 2rem;
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .forecast-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .forecast-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem;
    transition: var(--transition);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
    
    &.today {
      border-color: #3b82f6;
      background: linear-gradient(145deg, rgba(59, 130, 246, 0.1), var(--bg-secondary));
    }
    
    .forecast-day {
      text-align: center;
      margin-bottom: 0.5rem;
      
      .day-name {
        display: block;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
      
      .day-date {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }
    
    .forecast-weather {
      text-align: center;
      margin-bottom: 0.5rem;
      
      .forecast-icon {
        width: 50px;
        height: 50px;
      }
      
      .forecast-desc {
        display: block;
        font-size: 0.85rem;
        color: var(--text-secondary);
        text-transform: capitalize;
      }
    }
    
    .forecast-temp {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      
      .temp-max {
        font-weight: 600;
        color: var(--text-primary);
      }
      
      .temp-min {
        color: var(--text-secondary);
      }
    }
    
    .forecast-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
  }
}

// 🚨 ERROR BOUNDARY STYLES
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  
  .error-content {
    text-align: center;
    max-width: 500px;
    
    .error-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    h2 {
      color: #ef4444;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      
      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: var(--transition);
        
        &.retry-button {
          background: #3b82f6;
          color: white;
          
          &:hover {
            background: #2563eb;
          }
        }
        
        &.reload-button {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          
          &:hover {
            background: var(--bg-tertiary);
          }
        }
      }
    }
    
    .error-details {
      text-align: left;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      
      summary {
        cursor: pointer;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      pre {
        font-size: 0.8rem;
        color: var(--text-secondary);
        white-space: pre-wrap;
        word-break: break-word;
      }
    }
  }
}

// 💀 LOADING SKELETON STYLES
.loading-skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  [class^="skeleton-"] {
    background: linear-gradient(90deg, 
      var(--bg-secondary) 25%, 
      var(--bg-tertiary) 50%, 
      var(--bg-secondary) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  &.weather-skeleton {
    background: var(--bg-secondary);
    border-radius: 16px;
    padding: 2rem;
    
    .skeleton-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      .skeleton-title {
        height: 24px;
        width: 200px;
      }
      
      .skeleton-icon {
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }
    }
    
    .skeleton-temp {
      height: 48px;
      width: 120px;
      margin: 0 auto 1rem;
    }
    
    .skeleton-description {
      height: 20px;
      width: 150px;
      margin: 0 auto 2rem;
    }
    
    .skeleton-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      
      .skeleton-detail {
        height: 40px;
      }
    }
  }
  
  &.forecast-skeleton {
    .skeleton-title {
      height: 24px;
      width: 200px;
      margin-bottom: 1rem;
    }
    
    .skeleton-forecast-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      
      .skeleton-forecast-item {
        background: var(--bg-secondary);
        border-radius: 12px;
        padding: 1rem;
        
        .skeleton-day {
          height: 20px;
          margin-bottom: 0.5rem;
        }
        
        .skeleton-icon {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          margin: 0 auto 0.5rem;
        }
        
        .skeleton-temp {
          height: 16px;
          margin: 0 auto;
        }
      }
    }
  }
}

// 📱 RESPONSIVE LAYOUT
.weather-main {
  .main-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    @media (max-width: 640px) {
      padding: 1rem;
    }
    
    .primary-section {
      min-width: 0; // Prevent overflow
    }
    
    .sidebar-section {
      min-width: 0; // Prevent overflow
      
      @media (max-width: 1024px) {
        order: -1; // Show sidebar first on mobile
      }
    }
  }
}

// 🎨 HEADER IMPROVEMENTS
.weather-header {
  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .loading-button {
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: white;
    }
  }
}
```

## ✅ Checkpoint

Sau khi hoàn thành Step 5, bạn nên có:

1. ✅ 5-day forecast với optimized rendering
2. ✅ Error boundary for error handling
3. ✅ Loading skeletons for better UX
4. ✅ Code splitting với React.lazy
5. ✅ Performance optimizations với memo/useMemo
6. ✅ Responsive design for all screen sizes
7. ✅ Advanced styling và animations

### 🧪 Test Cases:
- [ ] Forecast loads after weather search
- [ ] Error boundary catches JS errors
- [ ] Loading skeletons show during data fetch
- [ ] App works on mobile devices
- [ ] Lazy loaded components work properly

## 🚀 Final Project Structure

```
weather-app-exercise/
├── WeatherApp.js           ✅ Main app with providers
├── components/
│   ├── SearchBar.js        ✅ Search with history
│   ├── WeatherCard.js      ✅ Weather display
│   ├── ForecastList.js     ✅ 5-day forecast
│   ├── ThemeToggle.js      ✅ Theme switching
│   ├── CurrentLocationButton.js ✅ Geolocation
│   ├── FavoriteCitiesList.js ✅ Favorites management
│   ├── ErrorBoundary.js    ✅ Error handling
│   └── LoadingSkeleton.js  ✅ Loading states
├── contexts/
│   ├── WeatherContext.js   ✅ Weather state management
│   └── ThemeContext.js     ✅ Theme management
├── hooks/
│   ├── useLocalStorage.js  ✅ Data persistence
│   ├── useGeolocation.js   ✅ Location services
│   ├── useWeatherAPI.js    ✅ API integration
│   ├── useFavorites.js     ✅ Favorites logic
│   └── useSearchHistory.js ✅ Search tracking
└── styles/
    └── WeatherApp.scss     ✅ Complete styling
```

## 🎉 Congratulations!

Bạn đã hoàn thành một **Weather App hoàn chỉnh** với tất cả **React Core Hooks**:

### 🏆 Những gì bạn đã học:
- ✅ **useState** - Local state management
- ✅ **useEffect** - Side effects và lifecycle
- ✅ **useContext** - Global state management  
- ✅ **useMemo** - Performance optimization
- ✅ **useCallback** - Function memoization
- ✅ **Custom Hooks** - Logic reusability
- ✅ **Error Boundaries** - Error handling
- ✅ **Code Splitting** - Performance
- ✅ **Responsive Design** - Mobile-first approach

### 🚀 Bước tiếp theo:
1. Deploy app lên Netlify/Vercel
2. Thêm unit tests với Jest/React Testing Library
3. Integrate với CI/CD pipeline
4. Explore advanced patterns như useReducer, useDeferredValue

---

**🎊 Amazing work! Bạn đã master React Core Hooks!**