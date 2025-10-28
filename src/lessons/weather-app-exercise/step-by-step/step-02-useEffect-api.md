# 🌐 Step 2: useEffect & API Integration

## 🎯 Mục tiêu Step 2
- Học cách sử dụng useEffect cho side effects
- Integrate với Weather API
- Handle loading states và error handling
- Hiểu dependency array trong useEffect

## 📚 Kiến thức cần nắm

### useEffect Hook
```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array
```

### Các patterns phổ biến:
- `useEffect(() => {}, [])` - Chạy 1 lần khi mount
- `useEffect(() => {}, [dep])` - Chạy khi dep thay đổi  
- `useEffect(() => {})` - Chạy mỗi lần re-render

## 🛠️ Bước 1: Setup API Configuration

### 📂 Tạo file: `config/api.js`

```javascript
// 🌐 WEATHER API CONFIGURATION
export const WEATHER_API = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY || 'demo-key',
  ENDPOINTS: {
    CURRENT: '/weather',
    FORECAST: '/forecast'
  }
};

// 🔧 API Helper Functions
export const buildWeatherUrl = (city) => {
  return `${WEATHER_API.BASE_URL}${WEATHER_API.ENDPOINTS.CURRENT}?q=${city}&appid=${WEATHER_API.API_KEY}&units=metric&lang=vi`;
};

export const buildForecastUrl = (city) => {
  return `${WEATHER_API.BASE_URL}${WEATHER_API.ENDPOINTS.FORECAST}?q=${city}&appid=${WEATHER_API.API_KEY}&units=metric&lang=vi`;
};
```

## 🛠️ Bước 2: Tạo WeatherCard Component

### 📂 Tạo file: `components/WeatherCard.js`

```javascript
import React from 'react';

// 🌤️ WEATHER CARD COMPONENT
const WeatherCard = ({ weatherData, loading, error }) => {
  // 🎯 TODO 1: Handle loading state
  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="loading-spinner">🌀</div>
        <p>Đang tải dữ liệu thời tiết...</p>
      </div>
    );
  }
  
  // 🎯 TODO 2: Handle error state
  if (error) {
    return (
      <div className="weather-card error">
        <div className="error-icon">❌</div>
        <h3>Không thể tải dữ liệu thời tiết</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  // 🎯 TODO 3: Handle no data state
  if (!weatherData) {
    return (
      <div className="weather-card empty">
        <div className="empty-icon">🔍</div>
        <p>Nhập tên thành phố để xem thời tiết</p>
      </div>
    );
  }
  
  // 🎯 TODO 4: Display weather data
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description, icon }],
    wind: { speed }
  } = weatherData;
  
  return (
    <div className="weather-card success">
      <div className="weather-header">
        <h2>{name}, {country}</h2>
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

## 🛠️ Bước 3: Update WeatherApp với useEffect

### 📂 Update file: `WeatherApp.js`

```javascript
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { buildWeatherUrl } from './config/api';
import './styles/WeatherApp.scss';

const WeatherApp = () => {
  // 🎯 TODO 1: State management
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 🎯 TODO 2: Fetch weather data function
  const fetchWeatherData = async (cityName) => {
    // Gợi ý implementation:
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
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  
  // 🎯 TODO 3: useEffect để fetch data khi searchTerm thay đổi
  useEffect(() => {
    // Gợi ý:
    // - Check nếu searchTerm không empty
    // - Call fetchWeatherData(searchTerm)
    // - Dependency array: [searchTerm]
    
    if (searchTerm) {
      fetchWeatherData(searchTerm);
    }
  }, [searchTerm]); // Dependencies array
  
  // 🎯 TODO 4: Handle search from SearchBar
  const handleSearch = (cityName) => {
    setSearchTerm(cityName);
  };
  
  // 🎯 TODO 5: Load default city on first load
  useEffect(() => {
    // Load Hanoi weather by default
    setSearchTerm('Hanoi');
  }, []); // Empty dependency = run once on mount
  
  return (
    <div className="weather-app">
      <header className="weather-header">
        <h1>🌤️ Weather App</h1>
        <p>Tìm kiếm thời tiết bất kỳ thành phố nào</p>
      </header>
      
      <main className="weather-main">
        <SearchBar onSearch={handleSearch} />
        <WeatherCard 
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
};

export default WeatherApp;
```

### 💡 Hoàn thành TODO:

```javascript
// TODO 3: useEffect for data fetching
useEffect(() => {
  if (searchTerm) {
    fetchWeatherData(searchTerm);
  }
}, [searchTerm]);

// TODO 5: Default city load
useEffect(() => {
  setSearchTerm('Hanoi');
}, []);
```

## 🎨 Bước 4: WeatherCard Styling

### 📂 Update file: `styles/WeatherApp.scss`

```scss
// Thêm vào cuối file WeatherApp.scss

// 🌤️ WEATHER CARD STYLES
.weather-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &.loading {
    text-align: center;
    
    .loading-spinner {
      font-size: 2rem;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  }
  
  &.error {
    text-align: center;
    border: 2px solid #ef4444;
    background: linear-gradient(145deg, #fef2f2, #fee2e2);
    
    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    h3 {
      color: #dc2626;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #7f1d1d;
    }
  }
  
  &.empty {
    text-align: center;
    color: #6b7280;
    
    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  }
  
  &.success {
    .weather-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      h2 {
        color: #1f2937;
        font-size: 1.5rem;
        margin: 0;
      }
      
      .weather-icon img {
        width: 80px;
        height: 80px;
      }
    }
    
    .weather-info {
      .temp-main {
        text-align: center;
        margin-bottom: 2rem;
        
        .temperature {
          display: block;
          font-size: 3rem;
          font-weight: bold;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }
        
        .description {
          font-size: 1.2rem;
          color: #6b7280;
          text-transform: capitalize;
        }
      }
      
      .weather-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 8px;
          
          .label {
            color: #6b7280;
            font-weight: 500;
          }
          
          .value {
            color: #1f2937;
            font-weight: 600;
          }
        }
      }
    }
  }
}

// 📱 Responsive design
@media (max-width: 640px) {
  .weather-card.success .weather-details {
    grid-template-columns: 1fr;
  }
}
```

## 🛠️ Bước 5: Environment Setup

### 📂 Tạo file: `.env` (root project)

```env
# Weather API Key (đăng ký miễn phí tại openweathermap.org)
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 📂 Update file: `.env.example`

```env
# Copy this file to .env and add your API key
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

## ✅ Checkpoint

Sau khi hoàn thành Step 2, bạn nên có:

1. ✅ useEffect fetch data khi searchTerm thay đổi
2. ✅ Loading spinner khi đang fetch data
3. ✅ Error handling khi API call fails
4. ✅ Weather data hiển thị đầy đủ thông tin
5. ✅ Default city (Hanoi) load khi app khởi động
6. ✅ Responsive design cho mobile

### 🧪 Test Cases:
- [ ] Search "Ho Chi Minh City" → hiển thị weather data
- [ ] Search "InvalidCity" → hiển thị error message
- [ ] App load → tự động hiển thị Hanoi weather
- [ ] Network slow → hiển thị loading spinner

## 🔧 Common useEffect Patterns

### Pattern 1: Fetch data on mount
```javascript
useEffect(() => {
  fetchData();
}, []); // Empty array = run once
```

### Pattern 2: Fetch data when dependency changes
```javascript
useEffect(() => {
  if (searchTerm) {
    fetchWeatherData(searchTerm);
  }
}, [searchTerm]); // Run when searchTerm changes
```

### Pattern 3: Cleanup (event listeners, timers)
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    // Update every 5 minutes
    fetchWeatherData(searchTerm);
  }, 5 * 60 * 1000);
  
  return () => clearInterval(timer); // Cleanup
}, [searchTerm]);
```

## 🚀 Next Step

Khi đã hoàn thành Step 2, tiếp tục với:
```bash
open step-by-step/step-03-useContext-global-state.md
```

---

**🎉 Awesome! API integration với useEffect completed!**