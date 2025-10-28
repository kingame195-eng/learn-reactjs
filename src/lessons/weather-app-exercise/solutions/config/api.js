// 🌐 API CONFIGURATION
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