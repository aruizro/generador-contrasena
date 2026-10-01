import { useState, useMemo } from 'react';
import {
  PASSWORD_REQUIREMENTS,
  DEFAULT_MIN_LENGTH,
  DEFAULT_MAX_LENGTH,
  calculatePasswordStrength,
} from '../utils/passwordRules';

/**
 * Hook para validar una contraseña en tiempo real contra los requisitos de seguridad
 * y controlar los límites de caracteres en el Edit Box.
 */
export const usePasswordValidation = (initialValue = '', options = {}) => {
  const minLength = options.minLength || DEFAULT_MIN_LENGTH;
  const maxLength = options.maxLength || DEFAULT_MAX_LENGTH;

  const [password, setPassword] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  // Validación de límites del Edit Box
  const charCount = password.length;
  const isAtLimit = charCount >= maxLength;
  const isBelowMin = charCount > 0 && charCount < minLength;
  const remainingChars = Math.max(0, maxLength - charCount);

  // Evaluar cada requisito
  const requirementsStatus = useMemo(() => {
    return PASSWORD_REQUIREMENTS.map((req) => {
      let isMet = false;
      if (req.id === 'length') {
        isMet = req.validator(password, minLength, maxLength);
      } else {
        isMet = req.validator(password);
      }
      return {
        id: req.id,
        label: typeof req.label === 'function' ? req.label(minLength, maxLength) : req.label,
        met: isMet,
      };
    });
  }, [password, minLength, maxLength]);

  const fulfilledCount = requirementsStatus.filter((r) => r.met).length;
  const totalCount = requirementsStatus.length;
  const allRequirementsMet = totalCount > 0 && fulfilledCount === totalCount;

  // Fortaleza calculada
  const strength = useMemo(() => {
    return calculatePasswordStrength(password, fulfilledCount, totalCount);
  }, [password, fulfilledCount, totalCount]);

  // Manejador del cambio de texto con validación del límite del edit box
  const handlePasswordChange = (newPassword) => {
    // Si excede el límite máximo permitido, truncar o restringir
    if (newPassword.length > maxLength) {
      setPassword(newPassword.slice(0, maxLength));
    } else {
      setPassword(newPassword);
    }
    if (!touched) setTouched(true);
  };

  return {
    password,
    setPassword: handlePasswordChange,
    setRawPassword: setPassword,
    charCount,
    minLength,
    maxLength,
    isAtLimit,
    isBelowMin,
    remainingChars,
    requirementsStatus,
    fulfilledCount,
    totalCount,
    allRequirementsMet,
    strength,
    touched,
    setTouched,
  };
};
