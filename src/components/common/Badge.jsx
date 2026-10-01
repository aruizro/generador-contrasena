import React from 'react';

export const Badge = ({ children, variant = 'neutral', icon: Icon, className = '' }) => {
  return (
    <span className={`app-badge app-badge-${variant} ${className}`}>
      {Icon && <Icon size={12} className="badge-icon" />}
      {children}
    </span>
  );
};
