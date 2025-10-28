import { useState } from "react";

const WeatherApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    return (
        <div className="weather-app">
            <header className="weather-header">
                <h1>Weather App</h1>
                <p>Search for any city's weather</p>
            </header>

            <main className="weather-main">

            </main>
        </div>
    );
}

export default WeatherApp;