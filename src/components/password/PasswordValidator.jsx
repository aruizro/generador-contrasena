import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { InputBox } from '../common/InputBox';
import { StrengthMeter } from './StrengthMeter';
import { RequirementList } from './RequirementList';
import { PasswordSuggestions } from './PasswordSuggestions';

export const PasswordValidator = ({
  password,
  onPasswordChange,
  maxLength = 32,
  minLength = 12,
  requirementsStatus,
  fulfilledCount,
  totalCount,
  allRequirementsMet,
  strength,
}) => {
  return (
    <Card
      title="Validador de Contraseñas"
      subtitle="Escribe tu contraseña y verifica el cumplimiento de requisitos en tiempo real"
      icon={ShieldCheck}
    >
      <div className="validator-wrapper">
        <InputBox
          value={password}
          onChange={onPasswordChange}
          label="Contraseña"
          placeholder="Escribe aquí tu contraseña..."
          maxLength={maxLength}
          minLength={minLength}
          isSuccess={allRequirementsMet}
          showLimitValidation={true}
          helperText={`Longitud mínima requerida: ${minLength} caracteres. Límite máximo: ${maxLength} caracteres.`}
        />

        {/* 3 Botones de sugerencia basados en lo que escribe el usuario */}
        <PasswordSuggestions
          currentPassword={password}
          onSelectSuggestion={onPasswordChange}
          maxLength={maxLength}
          minLength={minLength}
        />

        {/* Medidor visual de seguridad */}
        <StrengthMeter strength={strength} />

        {/* Mensaje de éxito si cumple todos los requisitos con palomitas */}
        {allRequirementsMet && (
          <div className="success-banner">
            <Sparkles size={20} className="success-banner-icon" />
            <div>
              <strong>¡Contraseña Segura!</strong>
              <p>Cumple satisfactoriamente con todos los estándares y requisitos de seguridad.</p>
            </div>
          </div>
        )}

        {/* Lista de requisitos con palomitas */}
        <RequirementList
          requirements={requirementsStatus}
          fulfilledCount={fulfilledCount}
          totalCount={totalCount}
        />
      </div>
    </Card>
  );
};
