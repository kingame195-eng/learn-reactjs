import React from 'react';
import './Button.css';

// Component Button tái sử dụng
function Button({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    ...props
}) {
    const className = `btn btn-${variant} btn-${size}`;

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;