# Generador y Validador de Contraseñas Seguras (React)

Aplicación web desarrollada en **React** con componentes modulares y reutilizables, basada en los lineamientos del **Manual de Contraseñas Seguras**.

---

## 🌟 Características Principales

1. **Validación en tiempo real con palomitas de verificación (✓):**
   - **Punto 1:** Longitud mínima de 12 caracteres (máximo configurable).
   - **Punto 2:** Combinación de mayúsculas (A-Z).
   - **Punto 2:** Combinación de minúsculas (a-z).
   - **Punto 2:** Inclusión de números (0-9).
   - **Punto 2:** Inclusión de símbolos y caracteres especiales (`!@#$%^&*()-_=+[]{}|;:,.<>?`).
   - **Punto 3:** Evita lo obvio (sin palabras comunes como `password`, `123456`, secuencias consecutivas `1234`/`abcd`, ni repeticiones `aaaa`/`1111`).
2. **Edit Box con validación de límite:**
   - Contador en tiempo real `caracteres / límite`.
   - Restricción estricta (`maxLength`) que impide rebasar el límite.
   - Avisos dinámicos en color cuando se alcanza el límite máximo o si está por debajo del mínimo recomendado.
   - Botón para ver/ocultar contraseña, copiar al portapapeles y limpiar.
   - Selector de presets de límite máximo (16, 24, 32, 48, 64 caracteres).
3. **Generador de contraseñas:**
   - Modo **Contraseña Compleja** con slider de longitud y checkboxes de tipos de caracteres.
   - Modo **Frase Secreta (Passphrase)** recomendada por el manual (palabras aleatorias + números + símbolos).
4. **Componentes reutilizables:**
   - `InputBox`: Edit box con validación de límites, estados de éxito/error, contador y acciones.
   - `Card`: Contenedor de tarjeta con título, subtítulo, iconos y acciones.
   - `Button`: Botón modular con múltiples variantes (`primary`, `secondary`, `sm`, `md`, `lg`).
   - `Slider`: Control deslizante con etiquetas dinámicas de valor.
   - `Checkbox`: Interruptor de casilla con soporte de descripción.
   - `Badge`: Indicador de estado y etiquetas.
   - `StrengthMeter`: Barra medidora y porcentaje de seguridad.
   - `RequirementList` & `RequirementItem`: Lista de requisitos con palomita verde interactiva (✓).

---

## 🚀 Cómo ejecutar el proyecto

En una terminal ubicada en la carpeta `Generador-contraseña`:

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`.

Para generar la compilación de producción:
```bash
npm run build
```
