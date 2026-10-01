import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { RequirementItem } from './RequirementItem';

export const RequirementList = ({ requirements = [], fulfilledCount = 0, totalCount = 0 }) => {
  const allMet = totalCount > 0 && fulfilledCount === totalCount;

  return (
    <div className="requirements-card">
      <div className="requirements-header">
        <div className="requirements-header-title">
          {allMet ? (
            <CheckCircle2 size={18} className="text-success" />
          ) : (
            <ShieldAlert size={18} className="text-warning" />
          )}
          <span>Requisitos de Seguridad</span>
        </div>
        <span className={`requirements-count-badge ${allMet ? 'all-met' : ''}`}>
          {fulfilledCount} de {totalCount} cumplidos
        </span>
      </div>

      <ul className="requirements-list">
        {requirements.map((req) => (
          <RequirementItem key={req.id} label={req.label} met={req.met} />
        ))}
      </ul>
    </div>
  );
};
