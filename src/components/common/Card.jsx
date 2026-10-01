import React from 'react';

export const Card = ({ children, title, subtitle, icon: Icon, className = '', headerAction }) => {
  return (
    <div className={`app-card ${className}`}>
      {(title || subtitle || Icon) && (
        <div className="app-card-header">
          <div className="app-card-title-group">
            {Icon && <div className="app-card-icon"><Icon size={20} /></div>}
            <div>
              {title && <h2 className="app-card-title">{title}</h2>}
              {subtitle && <p className="app-card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="app-card-body">{children}</div>
    </div>
  );
};
