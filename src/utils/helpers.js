// Utility functions

// Format số thành tiền tệ
export const formatCurrency = (amount, currency = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Debounce function
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Generate random ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date
export const formatDate = (date, locale = 'vi-VN') => {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
};