import React from 'react';
import { Check, X } from 'lucide-react';

export const RequirementItem = ({ label, met }) => {
  return (
    <li className={`requirement-item ${met ? 'met' : 'unmet'}`}>
      <span className={`requirement-icon-wrapper ${met ? 'icon-success' : 'icon-muted'}`}>
        {met ? (
          <Check size={15} strokeWidth={3} className="checkmark-icon" />
        ) : (
          <X size={14} strokeWidth={2.5} className="unmet-icon" />
        )}
      </span>
      <span className="requirement-text">{label}</span>
      {met && <span className="requirement-palomita-badge">✓ Cumplido</span>}
    </li>
  );
};
