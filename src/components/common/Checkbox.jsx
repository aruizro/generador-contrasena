import React from 'react';
import { Check } from 'lucide-react';

export const Checkbox = ({ id, label, checked, onChange, disabled = false, description }) => {
  return (
    <label htmlFor={id} className={`app-checkbox-container ${disabled ? 'disabled' : ''}`}>
      <div className="checkbox-input-wrapper">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="app-checkbox-native"
        />
        <div className={`app-checkbox-custom ${checked ? 'checked' : ''}`}>
          {checked && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      <div className="checkbox-label-group">
        <span className="checkbox-title">{label}</span>
        {description && <span className="checkbox-desc">{description}</span>}
      </div>
    </label>
  );
};
