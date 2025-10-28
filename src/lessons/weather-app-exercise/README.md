# 🌤️ Weather App Exercise - React Core Hooks Practice

## 🎯 Mục tiêu bài tập

Xây dựng một ứng dụng thời tiết hoàn chỉnh để thực hành **React Core Hooks**:
- ✅ **useState** - Quản lý state local
- ✅ **useEffect** - Side effects và lifecycle  
- ✅ **useContext** - Global state management
- ✅ **Custom Hooks** - Logic tái sử dụng

## 🚀 Tính năng cần xây dựng

### 📱 Core Features
1. **🔍 Search Weather** - Tìm kiếm thời tiết theo tên thành phố
2. **📍 Current Location** - Lấy thời tiết vị trí hiện tại
3. **📊 Weather Display** - Hiển thị nhiệt độ, độ ẩm, mô tả
4. **🌈 Dynamic Backgrounds** - Background thay đổi theo thời tiết
5. **📝 Recent Searches** - Lưu lịch sử tìm kiếm
6. **🌙 Dark/Light Theme** - Chuyển đổi theme

### 🎨 Advanced Features  
7. **📈 5-Day Forecast** - Dự báo 5 ngày tới
8. **⭐ Favorite Cities** - Lưu thành phố yêu thích
9. **📱 Responsive Design** - Hoạt động trên mobile
10. **💾 Local Storage** - Lưu data offline

## 🏗️ Cấu trúc project

```
weather-app-exercise/
├── README.md                 # Hướng dẫn tổng quan
├── index.js                  # Entry point
├── WeatherApp.js             # Main app component  
├── components/               # UI Components
│   ├── SearchBar.js         # Tìm kiếm thành phố
│   ├── WeatherCard.js       # Hiển thị thời tiết
│   ├── ForecastList.js      # Dự báo 5 ngày
│   ├── FavoriteCities.js    # Thành phố yêu thích
│   └── ThemeToggle.js       # Chuyển đổi theme
├── contexts/                 # Context Providers
│   ├── WeatherContext.js    # Weather state management
│   └── ThemeContext.js      # Theme state management
├── hooks/                    # Custom Hooks
│   ├── useWeather.js        # Weather API logic
│   ├── useGeolocation.js    # Location logic
│   └── useLocalStorage.js   # LocalStorage logic
├── styles/                   # Styling
│   └── WeatherApp.scss      # Main styles
├── step-by-step/            # Hướng dẫn từng bước
│   ├── step-01-setup.md
│   ├── step-02-useState.md
│   ├── step-03-useEffect.md
│   ├── step-04-useContext.md
│   └── step-05-custom-hooks.md
└── solutions/               # Code hoàn chỉnh
    └── [all completed files]
```

## 🎓 Kiến thức cần có

### 📚 Prerequisites
- ✅ JavaScript ES6+ (destructuring, async/await)
- ✅ React basics (components, props, JSX)
- ✅ Basic CSS/SCSS

### 🧠 Sẽ học được
- 🔥 **useState patterns** - State management best practices
- 🔥 **useEffect mastery** - Dependencies, cleanup, async operations
- 🔥 **Context API** - Global state without Redux
- 🔥 **Custom Hooks** - Logic separation và reusability
- 🔥 **API Integration** - Fetch weather data
- 🔥 **Error Handling** - Try/catch, loading states
- 🔥 **Performance** - Optimization với React hooks

## 🛠️ Setup Instructions

### 1️⃣ Cài đặt dependencies (nếu cần)
```bash
npm install axios  # Cho API calls (optional, có thể dùng fetch)
```

### 2️⃣ Lấy API key miễn phí
1. Đăng ký tại [OpenWeatherMap](https://openweathermap.org/api)
2. Lấy free API key
3. Tạo file `.env` (không commit):
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 3️⃣ Bắt đầu với Step 1
```bash
# Đọc hướng dẫn chi tiết
cat step-by-step/step-01-setup.md
```

## 🎯 Learning Path

### 📋 Phase 1: Foundation (useState)
- [ ] **Step 1**: Project setup và component structure
- [ ] **Step 2**: SearchBar với useState
- [ ] **Step 3**: WeatherCard display logic

### 📋 Phase 2: Side Effects (useEffect)  
- [ ] **Step 4**: API integration với useEffect
- [ ] **Step 5**: Loading states và error handling
- [ ] **Step 6**: Geolocation với useEffect

### 📋 Phase 3: Global State (useContext)
- [ ] **Step 7**: WeatherContext setup
- [ ] **Step 8**: ThemeContext implementation  
- [ ] **Step 9**: Context consumer components

### 📋 Phase 4: Advanced (Custom Hooks)
- [ ] **Step 10**: useWeather custom hook
- [ ] **Step 11**: useLocalStorage hook
- [ ] **Step 12**: Performance optimization

## 💡 Tips cho người học

### 🎯 Best Practices
1. **Start Small** - Làm từng feature một, đừng vội
2. **Test Often** - Check browser sau mỗi thay đổi
3. **Read Errors** - Console errors là bạn của bạn
4. **Use DevTools** - React DevTools để debug state

### 🚨 Common Mistakes
- ❌ Quên dependencies array trong useEffect
- ❌ State mutation trực tiếp (phải dùng setState)
- ❌ Infinite re-renders (useEffect dependencies)
- ❌ Missing error handling cho API calls

### 🔧 Debugging Tips
- 🔍 `console.log` state changes
- 🔍 React DevTools Components tab
- 🔍 Network tab để check API calls
- 🔍 Application tab để check localStorage

## 🏆 Success Criteria

Khi hoàn thành, bạn sẽ có:
- ✅ Functional weather app với search
- ✅ Theme switching hoạt động
- ✅ Favorite cities được lưu
- ✅ Responsive design  
- ✅ Error handling tốt
- ✅ Clean, maintainable code

## 📚 Tài liệu tham khảo

- [React Hooks Official Docs](https://reactjs.org/docs/hooks-intro.html)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [useEffect Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Context API Guide](https://reactjs.org/docs/context.html)

---

## 🚀 Ready to start?

```bash
# Bắt đầu với Step 1
open step-by-step/step-01-setup.md
```

**Happy Coding! 🎉**