import React, { useMemo, useState } from 'react';
import { Lightbulb, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SIMBOLOS_SEGUROS, PALABRAS_PASSPHRASE } from '../../utils/passwordRules';

/**
 * Genera 3 sugerencias inteligentes basadas en lo que el usuario va escribiendo
 * para transformar su texto o palabras en una contraseña segura según el manual.
 */
export const PasswordSuggestions = ({ currentPassword, onSelectSuggestion, maxLength = 32, minLength = 12 }) => {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const suggestions = useMemo(() => {
    const raw = (currentPassword || '').trim();
    const base = raw.length > 0 ? raw : 'MiClave';

    // 1. Estilo LeetSpeak / Reemplazo (Punto 3 del manual: "mezcla y reemplaza letras con mayúsculas, símbolos y números")
    // ej: 'a' -> '@', 'e' -> '3', 'i' -> '!', 'o' -> '0', 's' -> '$'
    const toLeet = (text) => {
      const map = {
        'a': '@', 'A': '@',
        'e': '3', 'E': '3',
        'i': '!', 'I': '!',
        'o': '0', 'O': '0',
        's': '$', 'S': '$',
        't': '7', 'T': '7'
      };
      return text.split('').map(c => map[c] || c).join('');
    };

    // --- Sugerencia 1: Fortalecimiento LeetSpeak + Símbolos ---
    let s1 = toLeet(base);
    // Asegurar mayúscula y minúscula
    if (!/[A-Z]/.test(s1)) s1 = s1.charAt(0).toUpperCase() + s1.slice(1);
    if (!/[a-z]/.test(s1)) s1 = s1 + 'seg';
    // Asegurar números y símbolos
    if (!/[0-9]/.test(s1)) s1 += '2026';
    if (!/[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(s1)) s1 += '#!';
    // Completar longitud mínima
    while (s1.length < minLength) {
      s1 += '$7';
    }
    if (s1.length > maxLength) s1 = s1.slice(0, maxLength);

    // --- Sugerencia 2: Estilo Frase Secreta / Passphrase (Punto 4 del manual: ej. MisPerros3ComenGalletas!) ---
    const capitalizedBase = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
    const randomWord = PALABRAS_PASSPHRASE[Math.abs(base.length) % PALABRAS_PASSPHRASE.length] || 'Galletas';
    let s2 = `${capitalizedBase}7${randomWord}!`;
    if (s2.length < minLength) {
      s2 = `${capitalizedBase}#2026${randomWord}!`;
    }
    if (s2.length > maxLength) s2 = s2.slice(0, maxLength);

    // --- Sugerencia 3: Patrón Blindado Mixto (Blindaje con prefijo/sufijo seguro) ---
    // Envolver la palabra del usuario con caracteres seguros
    const cleanedBase = base.replace(/[^a-zA-Z0-9]/g, '') || 'Clave';
    let s3 = `!Seg_${cleanedBase}#94?`;
    if (s3.length < minLength) {
      s3 = `!S3guR4_${cleanedBase}#2026!`;
    }
    if (s3.length > maxLength) s3 = s3.slice(0, maxLength);

    return [
      {
        id: 'sug-1',
        title: 'Sugerencia 1',
        badge: 'LeetSpeak + Símbolos',
        subtitle: 'Transforma tu texto cambiando letras por números y caracteres especiales',
        generated: s1,
      },
      {
        id: 'sug-2',
        title: 'Sugerencia 2',
        badge: 'Frase Secreta',
        subtitle: 'Combina tu palabra con otra palabra memorable, número y símbolo',
        generated: s2,
      },
      {
        id: 'sug-3',
        title: 'Sugerencia 3',
        badge: 'Blindaje Robusto',
        subtitle: 'Protege tu palabra con prefijos y sufijos de alta seguridad',
        generated: s3,
      },
    ];
  }, [currentPassword, minLength, maxLength]);

  const activeSuggestion = suggestions[selectedSuggestionIndex] || suggestions[0];

  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <Lightbulb size={16} className="text-warning" />
        <span>Sugerencias para hacer tu contraseña segura:</span>
      </div>

      {/* 3 Botones de sugerencia */}
      <div className="suggestion-buttons-row">
        {suggestions.map((sug, idx) => (
          <button
            key={sug.id}
            type="button"
            className={`suggestion-tab-btn ${selectedSuggestionIndex === idx ? 'active' : ''}`}
            onClick={() => setSelectedSuggestionIndex(idx)}
          >
            <Sparkles size={14} className="sug-icon" />
            <span className="sug-btn-title">{sug.title}</span>
            <span className="sug-btn-badge">{sug.badge}</span>
          </button>
        ))}
      </div>

      {/* Contenido / Vista previa de la sugerencia seleccionada */}
      {activeSuggestion && (
        <div className="suggestion-preview-card">
          <div className="sug-preview-top">
            <span className="sug-preview-desc">{activeSuggestion.subtitle}</span>
            <button
              type="button"
              className="btn-apply-suggestion"
              onClick={() => onSelectSuggestion(activeSuggestion.generated)}
              title="Aplicar esta sugerencia al Edit Box"
            >
              <span>Usar esta sugerencia</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div
            className="suggestion-code-box"
            onClick={() => onSelectSuggestion(activeSuggestion.generated)}
            title="Haz clic para aplicar al Edit Box"
          >
            <code className="suggestion-text">{activeSuggestion.generated}</code>
            <span className="click-to-use-tag">Clic para aplicar</span>
          </div>
        </div>
      )}
    </div>
  );
};
