/**
 * Reglas de validación para contraseña segura.
 * Basadas en el 'Manual de Contraseñas Seguras':
 * 1. Longitud de al menos 12 caracteres (Punto 1).
 * 2. Combinación de mayúsculas (A-Z), minúsculas (a-z), números (0-9) y símbolos (!@#$%...) (Punto 2).
 * 3. Evitar lo obvio: palabras comunes, secuencias y repeticiones (Punto 3).
 * 4. Generador de contraseñas complejas y frases secretas (Punto 4).
 */
export const DEFAULT_MIN_LENGTH = 12;
export const DEFAULT_MAX_LENGTH = 32;

export const SIMBOLOS_SEGUROS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

export const PALABRAS_COMUNES = [
  "password", "contrasena", "contraseña", "123456", "12345678", "qwerty",
  "admin", "root", "usuario", "login", "welcome", "iloveyou", "superman",
  "dragon", "master", "futbol", "familia", "secreto", "amor", "hola",
  "pass", "clave", "abcdef", "111111", "000000"
];

export const SECUENCIAS_OBVIAS = [
  "0123", "1234", "2345", "3456", "4567", "5678", "6789",
  "abcd", "bcde", "cdef", "defg", "efgh"
];

// Palabras para frases secretas basadas en el ejemplo del manual: MisPerros3ComenGalletas!
export const PALABRAS_PASSPHRASE = [
  "Perros", "Gatos", "Galletas", "Montaña", "Estrella", "Oceano", "Planeta",
  "Sol", "Luna", "Bosque", "Viento", "Camino", "Viaje", "Trueno", "Cielo",
  "Halcon", "Lince", "Cometa", "Espacio", "Volcan", "Aguila", "Delta", "Nieve"
];

// Ejemplos oficiales citados en el documento "Manual Contraseñas S3guR4$_"
export const EJEMPLOS_MANUAL = [
  {
    nombre: "Ejemplo Pág. 7: Frase Secreta",
    password: "MisPerros3ComenGalletas!",
    tipo: "Frase Secreta (4.-Usa Frases Secretas)"
  },
  {
    nombre: "Ejemplo Pág. 11: Contraseña Segura",
    password: "T!g3rL!ly#2024!RunS",
    tipo: "Contraseña Compleja (Resumen)"
  }
];

// Los 8 Principios del Manual Contraseñas S3guR4$_
export const PRINCIPIOS_MANUAL = [
  {
    numero: "1",
    titulo: "Longitud de la Contraseña",
    descripcion: "Usa al menos 12 caracteres para incrementar exponencialmente las combinaciones posibles contra ataques de fuerza bruta."
  },
  {
    numero: "2",
    titulo: "Combinación de Caracteres",
    descripcion: "Incluye Mayúsculas (A-Z), Minúsculas (a-z), Números (0-9) y Símbolos (!, @, #, $, %, etc.)."
  },
  {
    numero: "3",
    titulo: "Evita lo Obvio",
    descripcion: "NO uses palabras comunes ('password', '123456'), nombres propios ni fechas importantes. Si usas palabras, mézclalas con l33tspeak y símbolos."
  },
  {
    numero: "4",
    titulo: "Usa Frases Secretas",
    descripcion: "Combina varias palabras con sentido propio junto a números y símbolos. Ejemplo del manual: MisPerros3ComenGalletas!"
  },
  {
    numero: "5",
    titulo: "Cambia tus Contraseñas Regularmente",
    descripcion: "Lo más recomendable según el manual es renovarlas periódicamente cada 3 o 6 meses."
  },
  {
    numero: "6",
    titulo: "No Reutilices Contraseñas",
    descripcion: "Usa una contraseña diferente para cada cuenta; si una brecha ocurre en un sitio, no comprometerá tus demás accesos."
  },
  {
    numero: "7",
    titulo: "Usa un Gestor de Contraseñas",
    descripcion: "Herramientas dedicadas recomendadas en el manual: LastPass, 1Password y Dashlane."
  },
  {
    numero: "8",
    titulo: "Habilita 2FA (Doble Factor)",
    descripcion: "Activa la autenticación de dos factores en todas las cuentas que lo permitan para una capa extra de protección."
  }
];

export const PASSWORD_REQUIREMENTS = [
  {
    id: 'length',
    label: (min = DEFAULT_MIN_LENGTH, max = DEFAULT_MAX_LENGTH) =>
      `Mínimo ${min} caracteres (máximo ${max})`,
    validator: (pwd, min = DEFAULT_MIN_LENGTH, max = DEFAULT_MAX_LENGTH) =>
      pwd.length >= min && pwd.length <= max,
  },
  {
    id: 'uppercase',
    label: () => 'Al menos una letra mayúscula (A-Z)',
    validator: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: () => 'Al menos una letra minúscula (a-z)',
    validator: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: () => 'Al menos un dígito numérico (0-9)',
    validator: (pwd) => /[0-9]/.test(pwd),
  },
  {
    id: 'special',
    label: () => 'Al menos un símbolo o carácter especial (!@#$%...)',
    validator: (pwd) => {
      for (const char of pwd) {
        if (SIMBOLOS_SEGUROS.includes(char)) return true;
      }
      return false;
    },
  },
  {
    id: 'noObvious',
    label: () => 'Evitar patrones predecibles: sin palabras comunes, secuencias (1234/abcd) ni repeticiones',
    validator: (pwd) => {
      if (!pwd || pwd.length === 0) return false;
      const lower = pwd.toLowerCase();

      // Palabras comunes
      if (PALABRAS_COMUNES.some((w) => lower.includes(w))) return false;

      // Repetición excesiva consecutiva (ej: aaaa, 1111)
      if (/(.)\1{3,}/.test(pwd)) return false;

      // Secuencias consecutivas obvias
      if (SECUENCIAS_OBVIAS.some((seq) => lower.includes(seq))) return false;

      return true;
    },
  },
];

/**
 * Calcula la puntuación y el nivel de seguridad de la contraseña.
 */
export const calculatePasswordStrength = (password, fulfilledCount, totalCount) => {
  if (!password || password.length === 0) {
    return {
      score: 0,
      label: 'Sin ingresar',
      color: '#94a3b8',
      percentage: 0,
    };
  }

  if (fulfilledCount <= 2) {
    return {
      score: 1,
      label: 'Muy Débil',
      color: '#ef4444',
      percentage: 20,
    };
  } else if (fulfilledCount <= 4) {
    return {
      score: 2,
      label: 'Media / Aceptable',
      color: '#f59e0b',
      percentage: 50,
    };
  } else if (fulfilledCount === 5) {
    return {
      score: 3,
      label: 'Fuerte',
      color: '#3b82f6',
      percentage: 80,
    };
  } else {
    return {
      score: 4,
      label: 'Muy Segura (Excelente)',
      color: '#22c55e',
      percentage: 100,
    };
  }
};
