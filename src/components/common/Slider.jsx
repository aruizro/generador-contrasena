import React from 'react';

export const Slider = ({
  id,
  label,
  value,
  min = 6,
  max = 32,
  step = 1,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="app-slider-container">
      <div className="slider-header">
        <label htmlFor={id} className="slider-label">
          {label}
        </label>
        <span className="slider-value-badge">{value}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="app-slider-input"
      />
      <div className="slider-footer">
        <span>{min} car.</span>
        <span>{max} car.</span>
      </div>
    </div>
  );
};
