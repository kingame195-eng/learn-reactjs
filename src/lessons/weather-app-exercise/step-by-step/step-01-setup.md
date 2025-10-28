# 📋 Step 1: Project Setup & useState Basics

## 🎯 Mục tiêu Step 1
- Tạo component structure cơ bản
- Implement SearchBar với useState
- Hiểu cách useState hoạt động với form inputs

## 📚 Kiến thức cần nắm

### useState Hook
```javascript
const [state, setState] = useState(initialValue);
```
- **state**: Giá trị hiện tại
- **setState**: Function để update state  
- **initialValue**: Giá trị ban đầu

## 🛠️ Bước 1: Tạo Main App Component

### 📂 Tạo file: `WeatherApp.js`

```javascript
import React, { useState } from 'react';
import './styles/WeatherApp.scss';

// 🌤️ MAIN WEATHER APP COMPONENT
const WeatherApp = () => {
  // TODO: Thêm state management ở đây
  
  return (
    <div className="weather-app">
      <header className="weather-header">
        <h1>🌤️ Weather App</h1>
        <p>Tìm kiếm thời tiết bất kỳ thành phố nào</p>
      </header>
      
      <main className="weather-main">
        {/* TODO: Thêm SearchBar component ở đây */}
        {/* TODO: Thêm WeatherCard component ở đây */}
      </main>
    </div>
  );
};

export default WeatherApp;
```

### 💡 Gợi ý cho bạn:
1. Import useState từ React
2. Tạo state để store search term: `const [searchTerm, setSearchTerm] = useState('')`
3. Tạo state để store weather data: `const [weatherData, setWeatherData] = useState(null)`

## 🛠️ Bước 2: Tạo SearchBar Component

### 📂 Tạo file: `components/SearchBar.js`

```javascript
import React, { useState } from 'react';

// 🔍 SEARCH BAR COMPONENT
const SearchBar = ({ onSearch }) => {
  // 🎯 TODO 1: Tạo state cho input value
  // Gợi ý: const [inputValue, setInputValue] = useState('');
  
  // 🎯 TODO 2: Tạo handleInputChange function
  const handleInputChange = (e) => {
    // Gợi ý: setInputValue(e.target.value);
  };
  
  // 🎯 TODO 3: Tạo handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gợi ý: 
    // - Check nếu inputValue không empty
    // - Call onSearch(inputValue)
    // - Clear input: setInputValue('')
  };
  
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Nhập tên thành phố..."
          value={/* TODO: Gán inputValue */}
          onChange={/* TODO: Gán handleInputChange */}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍 Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
```

### 💡 Hoàn thành TODO:
```javascript
// TODO 1: State cho input
const [inputValue, setInputValue] = useState('');

// TODO 2: Handle input change
const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

// TODO 3: Handle form submit
const handleSubmit = (e) => {
  e.preventDefault();
  if (inputValue.trim()) {
    onSearch(inputValue);
    setInputValue('');
  }
};

// TODO 4: Trong JSX
value={inputValue}
onChange={handleInputChange}
```

## 🛠️ Bước 3: Update WeatherApp.js

### Thêm SearchBar vào WeatherApp:

```javascript
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './styles/WeatherApp.scss';

const WeatherApp = () => {
  // 🎯 TODO 1: Thêm state management
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  
  // 🎯 TODO 2: Tạo handleSearch function
  const handleSearch = (cityName) => {
    console.log('Searching for:', cityName);
    setSearchTerm(cityName);
    // TODO: Sẽ thêm API call ở step sau
  };
  
  return (
    <div className="weather-app">
      <header className="weather-header">
        <h1>🌤️ Weather App</h1>
        <p>Tìm kiếm thời tiết bất kỳ thành phố nào</p>
      </header>
      
      <main className="weather-main">
        <SearchBar onSearch={handleSearch} />
        
        {/* Hiển thị search term để test */}
        {searchTerm && (
          <p>Đang tìm kiếm: <strong>{searchTerm}</strong></p>
        )}
      </main>
    </div>
  );
};

export default WeatherApp;
```

## 🎨 Bước 4: Basic Styling

### 📂 Tạo file: `styles/WeatherApp.scss`

```scss
// 🌤️ WEATHER APP STYLES
.weather-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  .weather-header {
    text-align: center;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.5rem;
      color: #2563eb;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #6b7280;
      font-size: 1.1rem;
    }
  }
  
  .weather-main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

// 🔍 SEARCH BAR STYLES
.search-bar {
  width: 100%;
  
  .search-input-group {
    display: flex;
    gap: 0.5rem;
    max-width: 500px;
    margin: 0 auto;
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
    
    .search-button {
      padding: 12px 24px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}
```

## 🛠️ Bước 5: Test Component

### 📂 Update file: `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import WeatherApp from './WeatherApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);
```

## ✅ Checkpoint

Sau khi hoàn thành Step 1, bạn nên có:

1. ✅ WeatherApp component hiển thị header
2. ✅ SearchBar component với input và button
3. ✅ useState hoạt động với form input
4. ✅ onSearch callback được call khi submit
5. ✅ Input clear sau khi submit
6. ✅ Basic styling đẹp mắt

### 🧪 Test Cases:
- [ ] Type vào search input → input value updates
- [ ] Submit form → console.log shows city name
- [ ] Input clears after submit
- [ ] Search term hiển thị dưới search bar

## 🚀 Next Step

Khi đã hoàn thành Step 1, tiếp tục với:
```bash
open step-by-step/step-02-useEffect-api.md
```

## 💡 useState Best Practices

### ✅ Do:
```javascript
// ✅ Correct: Using functional update
setCount(prevCount => prevCount + 1);

// ✅ Correct: New object/array
setUser({...user, name: 'New Name'});
```

### ❌ Don't:
```javascript
// ❌ Wrong: Direct mutation
user.name = 'New Name';
setUser(user);

// ❌ Wrong: Sync state updates
setCount(count + 1);
setCount(count + 1); // Won't work as expected
```

---

**🎉 Great job! useState basics completed!**