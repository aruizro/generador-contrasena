import React, { useEffect } from 'react';
import { KeyRound, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Slider } from '../common/Slider';
import { Checkbox } from '../common/Checkbox';
import { usePasswordGenerator } from '../../hooks/usePasswordGenerator';

export const PasswordGenerator = ({ onApplyPassword, maxLength = 32 }) => {
  const {
    mode,
    setMode,
    length,
    setLength,
    includeUppercase,
    setIncludeUppercase,
    includeLowercase,
    setIncludeLowercase,
    includeNumbers,
    setIncludeNumbers,
    includeSymbols,
    setIncludeSymbols,
    generatePassword,
  } = usePasswordGenerator();

  const handleGenerateAndApply = () => {
    const newPwd = generatePassword();
    if (newPwd && onApplyPassword) {
      onApplyPassword(newPwd);
    }
  };

  // Generar una contraseña segura inicial al montar
  useEffect(() => {
    handleGenerateAndApply();
  }, [mode]);

  const atLeastOneOptionSelected =
    mode === 'passphrase' ||
    includeUppercase ||
    includeLowercase ||
    includeNumbers ||
    includeSymbols;

  return (
    <Card
      title="Generador de Contraseñas Seguras"
      subtitle="Genera combinaciones robustas o frases secretas de alta seguridad"
      icon={KeyRound}
    >
      <div className="generator-content">
        {/* Selector de modo del generador */}
        <div className="generator-mode-selector">
          <button
            type="button"
            className={`mode-tab-btn ${mode === 'complex' ? 'active' : ''}`}
            onClick={() => setMode('complex')}
          >
            <KeyRound size={15} /> Contraseña Compleja
          </button>
          <button
            type="button"
            className={`mode-tab-btn ${mode === 'passphrase' ? 'active' : ''}`}
            onClick={() => setMode('passphrase')}
          >
            <BookOpen size={15} /> Frase Secreta (Passphrase)
          </button>
        </div>

        {mode === 'complex' ? (
          <>
            {/* Control deslizante de longitud */}
            <Slider
              id="password-length"
              label="Longitud deseada de la contraseña"
              value={length}
              min={12}
              max={maxLength}
              onChange={setLength}
            />

            {/* Opciones de caracteres */}
            <div className="generator-options-grid">
              <Checkbox
                id="opt-upper"
                label="Mayúsculas (A-Z)"
                description="A B C D E F ..."
                checked={includeUppercase}
                onChange={setIncludeUppercase}
              />
              <Checkbox
                id="opt-lower"
                label="Minúsculas (a-z)"
                description="a b c d e f ..."
                checked={includeLowercase}
                onChange={setIncludeLowercase}
              />
              <Checkbox
                id="opt-numbers"
                label="Números (0-9)"
                description="0 1 2 3 4 5 ..."
                checked={includeNumbers}
                onChange={setIncludeNumbers}
              />
              <Checkbox
                id="opt-symbols"
                label="Símbolos especiales"
                description="! @ # $ % & * ..."
                checked={includeSymbols}
                onChange={setIncludeSymbols}
              />
            </div>
          </>
        ) : (
          <div className="passphrase-info-box">
            <p>
              <strong>Frase Secreta:</strong> Combina múltiples palabras
              aleatorias fáciles de recordar para ti pero difíciles de adivinar para un atacante,
              junto con números y símbolos especiales.
            </p>
          </div>
        )}

        {!atLeastOneOptionSelected && (
          <p className="error-note">
            * Selecciona al menos una opción de caracteres para poder generar.
          </p>
        )}

        {/* Botón de acción */}
        <div className="generator-actions">
          <Button
            onClick={handleGenerateAndApply}
            disabled={!atLeastOneOptionSelected}
            variant="primary"
            size="lg"
            icon={RefreshCw}
            fullWidth
          >
            {mode === 'passphrase'
              ? 'Generar Frase Secreta y Probar'
              : 'Generar y Validar Contraseña Segura'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
