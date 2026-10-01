import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, AlertCircle, X } from 'lucide-react';

export const InputBox = ({
  value,
  onChange,
  placeholder = 'Escribe o genera tu contraseña...',
  label = 'Contraseña',
  maxLength = 32,
  minLength = 8,
  disabled = false,
  allowToggleVisibility = true,
  allowCopy = true,
  allowClear = true,
  showLimitValidation = true,
  isSuccess = false,
  error = null,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const charCount = value ? value.length : 0;
  const isAtLimit = charCount >= maxLength;
  const isBelowMin = charCount > 0 && charCount < minLength;

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles', err);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="input-box-container">
      <div className="input-box-header">
        {label && <label className="input-box-label">{label}</label>}
        {showLimitValidation && (
          <div className="input-limit-indicator">
            <span
              className={`char-counter ${
                isAtLimit ? 'char-counter-limit' : isBelowMin ? 'char-counter-warning' : ''
              }`}
            >
              {charCount} / {maxLength} caracteres
            </span>
          </div>
        )}
      </div>

      <div
        className={`input-box-wrapper ${
          isAtLimit
            ? 'border-warning'
            : isSuccess
            ? 'border-success'
            : error
            ? 'border-danger'
            : ''
        }`}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="input-box-field"
          autoComplete="off"
          spellCheck="false"
        />

        <div className="input-box-actions">
          {allowClear && value && (
            <button
              type="button"
              onClick={handleClear}
              className="input-action-btn"
              title="Borrar texto"
            >
              <X size={16} />
            </button>
          )}

          {allowToggleVisibility && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="input-action-btn"
              title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {allowCopy && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={!value}
              className={`input-action-btn ${copied ? 'text-success' : ''}`}
              title={copied ? '¡Copiado!' : 'Copiar al portapapeles'}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Mensajes de validación de límite y avisos */}
      {showLimitValidation && isAtLimit && (
        <div className="input-validation-msg msg-limit">
          <AlertCircle size={14} />
          <span>Has alcanzado el límite máximo permitido de {maxLength} caracteres.</span>
        </div>
      )}

      {showLimitValidation && isBelowMin && (
        <div className="input-validation-msg msg-warning">
          <AlertCircle size={14} />
          <span>Longitud mínima recomendada: al menos {minLength} caracteres.</span>
        </div>
      )}

      {error && !isAtLimit && (
        <div className="input-validation-msg msg-danger">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {helperText && !isAtLimit && !isBelowMin && (
        <div className="input-helper-text">{helperText}</div>
      )}
    </div>
  );
};
