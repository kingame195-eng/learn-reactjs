import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const { searchWeather, searchHistory } = useWeather();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        //chặn page reload khi submit form
        e.preventDefault();
        if (inputValue.trim()) {
            searchWeather(inputValue);
            setInputValue('');
        }
    }

    const handleHistoryClick = (cityName) => {
        searchWeather(cityName);
    };

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={
                handleSubmit
            }>
                <div className="" search-input-group>
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                    <button type="submit" className="search-button">
                        🔍 Search
                    </button>
                </div>
            </form>

            {searchHistory.length > 0 && (
                <div className="search-history">
                    <h3>Search History:</h3>
                    <div className="history-items">
                        {searchHistory.map((city, index) => (
                            <button
                                key={index}
                                className="history-item"
                                onClick={() => handleHistoryClick(city)}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default SearchBar;