import React from 'react';
import './Input.css';

// Component Input tái sử dụng
function Input({
    type = 'text',
    placeholder,
    value,
    onChange,
    label,
    error,
    required = false,
    ...props
}) {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label">
                    {label} {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`input ${error ? 'input-error' : ''}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}

export default Input;