import React, { useState } from 'react';
import { Lock, Sliders, ShieldAlert, CheckCircle } from 'lucide-react';
import { PasswordValidator } from './components/password/PasswordValidator';
import { PasswordGenerator } from './components/password/PasswordGenerator';
import { usePasswordValidation } from './hooks/usePasswordValidation';

export function App() {
  const [maxLimit, setMaxLimit] = useState(32);
  const minLimit = 12; // Criterio estricto del documento / manual (al menos 12 caracteres)

  const {
    password,
    setPassword,
    requirementsStatus,
    fulfilledCount,
    totalCount,
    allRequirementsMet,
    strength,
    charCount,
    isAtLimit,
  } = usePasswordValidation('', {
    minLength: minLimit,
    maxLength: maxLimit,
  });

  return (
    <div className="app-layout">
      {/* Encabezado */}
      <header className="app-top-header">
        <div className="container header-container">
          <div className="logo-section">
            <div className="logo-icon-box">
              <Lock size={26} className="logo-icon" />
            </div>
            <div>
              <h1 className="logo-title">Sistema de Seguridad de Contraseñas</h1>
              <p className="logo-subtitle">
                Validación en tiempo real y generación de claves seguras
              </p>
            </div>
          </div>

          <div className="header-status">
            {allRequirementsMet ? (
              <span className="global-badge badge-secure">
                <CheckCircle size={16} /> Contraseña Segura (100% Cumplido)
              </span>
            ) : (
              <span className="global-badge badge-pending">
                <ShieldAlert size={16} /> Requisitos Pendientes ({fulfilledCount}/{totalCount})
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container main-content">
        {/* Barra superior de configuración de límite */}
        <div className="limit-config-bar">
          <div className="limit-config-label">
            <Sliders size={18} />
            <span>Límite máximo permitido de caracteres:</span>
          </div>
          <div className="limit-presets">
            {[16, 24, 32, 48, 64].map((limitOption) => (
              <button
                key={limitOption}
                type="button"
                onClick={() => setMaxLimit(limitOption)}
                className={`limit-preset-btn ${maxLimit === limitOption ? 'active' : ''}`}
              >
                Máx. {limitOption} car.
              </button>
            ))}
          </div>
        </div>

        <div className="grid-layout">
          {/* Columna Izquierda: Validador con Edit Box y Palomitas */}
          <div className="grid-column">
            <PasswordValidator
              password={password}
              onPasswordChange={setPassword}
              maxLength={maxLimit}
              minLength={minLimit}
              requirementsStatus={requirementsStatus}
              fulfilledCount={fulfilledCount}
              totalCount={totalCount}
              allRequirementsMet={allRequirementsMet}
              strength={strength}
            />
          </div>

          {/* Columna Derecha: Generador */}
          <div className="grid-column">
            <PasswordGenerator
              onApplyPassword={(generatedPwd) => setPassword(generatedPwd)}
              maxLength={maxLimit}
            />
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="app-footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} Programa de Contraseñas Seguras • Implementado en React con componentes reutilizables</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
