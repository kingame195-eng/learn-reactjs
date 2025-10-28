import React, { useState } from 'react';

const searchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim) {
            onSearch(inputValue);
            setInputValue('');
        }
    }

    return (
        <form className="search-bar" onSubmit={
            handleSubmit
         }>
            <div className=""search-input-group>
                <input
                    type="text"
                    placeholder="Enter city name..."
                />
            </div>
        </form>
    );
}

export default searchBar;