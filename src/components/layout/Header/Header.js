import React from 'react';
import './Header.css';

function Header({ title = 'My App' }) {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">{title}</h1>
                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;