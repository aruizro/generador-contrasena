import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`app-btn app-btn-${variant} app-btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="btn-icon" />}
      {children}
    </button>
  );
};
