import { useState, useCallback } from 'react';
import { SIMBOLOS_SEGUROS, PALABRAS_PASSPHRASE } from '../utils/passwordRules';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: SIMBOLOS_SEGUROS,
};

export const usePasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Modo de generación: 'complex' o 'passphrase' (frase secreta según Punto 4)
  const [mode, setMode] = useState('complex');

  const generatePassword = useCallback(() => {
    if (mode === 'passphrase') {
      // Frase secreta: 3 palabras al azar + número + símbolo
      const words = [];
      const usedIndices = new Set();
      while (words.length < 3) {
        const idx = Math.floor(Math.random() * PALABRAS_PASSPHRASE.length);
        if (!usedIndices.has(idx)) {
          usedIndices.add(idx);
          words.push(PALABRAS_PASSPHRASE[idx]);
        }
      }
      const randomNum = Math.floor(Math.random() * 90 + 10); // ej. 42
      const randomSym = '!@#$%&'[Math.floor(Math.random() * 6)];
      return `${words[0]}-${words[1]}-${words[2]}${randomNum}${randomSym}`;
    }

    let availableChars = '';
    const guaranteedChars = [];

    if (includeUppercase) {
      availableChars += CHAR_SETS.uppercase;
      guaranteedChars.push(
        CHAR_SETS.uppercase[Math.floor(Math.random() * CHAR_SETS.uppercase.length)]
      );
    }
    if (includeLowercase) {
      availableChars += CHAR_SETS.lowercase;
      guaranteedChars.push(
        CHAR_SETS.lowercase[Math.floor(Math.random() * CHAR_SETS.lowercase.length)]
      );
    }
    if (includeNumbers) {
      availableChars += CHAR_SETS.numbers;
      guaranteedChars.push(
        CHAR_SETS.numbers[Math.floor(Math.random() * CHAR_SETS.numbers.length)]
      );
    }
    if (includeSymbols) {
      availableChars += CHAR_SETS.symbols;
      guaranteedChars.push(
        CHAR_SETS.symbols[Math.floor(Math.random() * CHAR_SETS.symbols.length)]
      );
    }

    if (availableChars.length === 0) {
      return '';
    }

    // Completar el resto de la longitud requerida
    const remainingLength = Math.max(0, length - guaranteedChars.length);
    const resultChars = [...guaranteedChars];

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      resultChars.push(availableChars[randomIndex]);
    }

    // Mezclar aleatoriamente con Fisher-Yates shuffle
    for (let i = resultChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    return resultChars.join('');
  }, [mode, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return {
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
  };
};
