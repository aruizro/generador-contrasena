import React from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export const StrengthMeter = ({ strength }) => {
  const { label, color, percentage, score } = strength;

  const getStrengthIcon = () => {
    if (score >= 4) return <ShieldCheck size={18} className="text-success" />;
    if (score >= 2) return <Shield size={18} style={{ color }} />;
    return <ShieldAlert size={18} style={{ color }} />;
  };

  return (
    <div className="strength-meter-container">
      <div className="strength-meter-header">
        <div className="strength-label-group">
          {getStrengthIcon()}
          <span className="strength-title">Nivel de Seguridad:</span>
          <strong className="strength-status-text" style={{ color }}>
            {label}
          </strong>
        </div>
        <span className="strength-percentage">{percentage}%</span>
      </div>

      <div className="strength-meter-track">
        <div
          className="strength-meter-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className="strength-meter-steps">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`strength-step-dot ${score >= step ? 'active' : ''}`}
            style={{
              backgroundColor: score >= step ? color : '#e2e8f0',
            }}
          />
        ))}
      </div>
    </div>
  );
};
