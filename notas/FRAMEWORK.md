# 📘 Framework de Diseño Digital UNPSJB (MII 2.0)

**Delegación Trelew - Edición Extendida (2026)**

Este documento consolida las reglas de arquitectura, diseño de interfaz (UI) y experiencia de usuario (UX) para todo el software desarrollado en la UNPSJB. Nuestro objetivo es trasladar la "fuerza y carácter propio" del manual analógico de 2008 a estándares de usabilidad, seguridad y rendimiento modernos.

## 1. Arquitectura y Rendimiento (El Estándar "Lean")

Inspirados en la regla de los 14KB y optimizados para el entorno universitario:

- **VibeCoding de Archivo Único:** Para herramientas de utilidad, se prioriza un solo archivo `.html` que contenga estructura, lógica y estilos.
- **PWA Ready (Aplicación Instalable):** Toda herramienta oficial debe incluir un archivo `manifest.json` y un `sw.js` (Service Worker) para permitir su instalación en el escritorio/móvil y su funcionamiento offline ante caídas de red.
- **Tailwind CSS (CDN):** Se utiliza para evitar archivos CSS personalizados.
- **DOM Poco Profundo:** Prohibido anidar contenedores (`div`) de forma excesiva.

## 2. Paleta de Colores y Superficies (Design Tokens MII)

Adoptamos un enfoque Material Design 3 Híbrido mezclado con toques de Glassmorphism en los encabezados.

- 🔵 **Azul Institucional (`#004992`):** Barras de navegación, botones primarios, títulos principales y encabezados de tablas.
- 🟠 **Naranja de Acento (`#ff9900`):** ESTRICTAMENTE como indicador de estado, no como color de relleno. Se usa para anillos de enfoque (`focus:ring`), bordes activos (`border-l-4`), y alertas.
- 🌑 **Superficies Neutras (Slate):** Modo Claro (`slate-50`, `white`) y Modo Oscuro (`slate-900`, `slate-800/80` con `backdrop-blur`).
- 🚫 **Fondos Limpios (Sin Imágenes):** Queda estrictamente prohibido el uso de imágenes de fondo, patrones o marcas de agua (ej. escudos en baja opacidad). Las interfaces deben usar únicamente los fondos sólidos definidos en los tonos neutros para garantizar la máxima legibilidad, evitar ruido visual y no engrosar el código HTML innecesariamente.

## 3. Jerarquía Visual y Navegación (Header y Footer Institucional)

La estructura superior e inferior de la aplicación debe enmarcar la herramienta sin robar protagonismo.

**Estructura del Header (Top-Left):**

1. **Marca Paraguas:** El Isologo oficial de la UNPSJB consumido desde el servidor central.
2. **Separador:** Una línea vertical sutil (`border-l` o divider).
3. **Identidad de la Herramienta:** El ícono representativo de la app y un título descriptivo claro (Ej: `[Logo UNPSJB] | 📅 Gestión de Eventos`).

**Footer Minimalista (Base de la página):** Todo sistema debe terminar con un pie de página sutil (texto pequeño, color gris `slate-400` o `slate-500`) centrado. Debe contener: el año de creación, el nombre de la Universidad y la versión. Ejemplo: `© 2026 UNPSJB - Soporte Informático | v1.0.0`

**Navegación:** Uso de pestañas (Tabs) o un Menú Inferior (Bottom Navigation) en móviles para operar con una sola mano.

## 4. Señalética Digital y Estados del Sistema

Está estrictamente prohibido usar ventanas emergentes nativas del navegador (`alert()` o `confirm()`).

**El Semáforo Institucional:**

- ✅ **Éxito:** Esmeralda Institucional (`emerald-600` / `emerald-500`).
- ⚠️ **Advertencia:** Naranja Institucional (`#ff9900`).
- ❌ **Error Crítico:** Carmesí profundo (`rose-600`).

- **Banners Contextuales:** Tarjetas con borde lateral grueso (`border-l-4`) del color semántico. No bloquean la pantalla.
- **Toasts:** Notificaciones flotantes en la esquina inferior derecha que desaparecen tras 3 segundos.
- **Modales:** Fondos oscuros desenfocados. El botón destructivo debe ser Carmesí, nunca Azul Institucional.
- **Estados Vacíos (Empty States):** Mostrar siempre un contenedor centrado con iconografía abstracta de baja opacidad y un botón de acción primaria (Ej: "Crear evento").

## 5. Estandarización de Assets e Íconos

Para mantener una coherencia absoluta y evitar la confusión en los sistemas operativos de los usuarios:

### A. El Logotipo Institucional (Single Source of Truth)

El isologo de la UNPSJB en formato SVG optimizado estará alojado en un servidor estático central de Proxmox (ej. `http://recursos.tw.unp.edu.ar/assets/logo-unpsjb.svg`). Todas las apps deben apuntar a esta URL en su Header.

### B. Íconos de Aplicación (App Icons para PWA)

**Diferenciación Obligatoria:** El ícono para instalar la aplicación (definido en el `manifest.json`) NO debe ser el escudo de la UNPSJB en solitario.

Cada herramienta debe tener un ícono único y descriptivo (Ej: Un calendario azul para Eventos, un servidor para Redes), puede estar estilizado con la paleta de colores institucional, para evitar confusiones en la barra de tareas del OS a usar, pero no es obligatorio.

### C. Consistencia de Emojis Multi-Plataforma

**Librería Twemoji:** Todas las aplicaciones deben inyectar la librería Twemoji vía CDN. Esto reemplaza dinámicamente cualquier emoji en texto por una imagen SVG uniforme, garantizando el mismo aspecto en Windows, Linux, macOS o Android.

## 6. Integración de Inteligencia Artificial (Estándar Gemini)

El uso de Modelos de Lenguaje (LLMs) dentro de las aplicaciones universitarias debe ser transparente, seguro y visualmente predecible.

### A. Gestión de API Keys (Sistema Híbrido por Fallback)

Para facilitar el uso sin fricciones a los administrativos, pero permitiendo flexibilidad para usuarios avanzados, la gestión de claves IA se rige por un Sistema de Prioridad en Cascada.

**Regla 1: La Constante Global (Hardcodeada)**
El script de JavaScript DEBE iniciar siempre con un bloque de configuración claro, destinado al SysAdmin que hostea la página en Proxmox:

```javascript
// ==========================================
// CONFIGURACIÓN INSTITUCIONAL (UNPSJB)
// Pegar la API Key Global de Google Gemini aquí.
// Esta clave actuará como "Fallback" para todos los usuarios.
// ==========================================
const UNPSJB_GLOBAL_API_KEY = "PEGA_TU_API_KEY_AQUI_O_DEJALO_VACIO";
```

**Regla 2: El Inyector del Footer (UI)**
Para evitar crear menús de ajustes invasivos, la interfaz para ingresar una clave personal vivirá en el Footer Minimalista.

- Junto al texto de copyright, debe haber un botón discreto (Ej: `⚙️ API IA` o icono de llave).
- Al clickearlo, debe transformar ese pequeño sector en un input para pegar la API Key y guardarla en el `localStorage` (o abrir un modal ultraligero).

**Regla 3: Lógica de Prioridad (El Fallback)**
Al momento de instanciar Gemini, el código debe evaluar OBLIGATORIAMENTE las claves en este orden estricto:

1. Clave en el `localStorage` (Personal del usuario).
2. Constante `UNPSJB_GLOBAL_API_KEY` (Global del servidor).
3. Entorno de ejecución (Si está en el Canvas de prototipado).

### B. UI/UX de Funciones IA (El "Sparkle" Institucional)

Para que el usuario comprenda la diferencia entre el software determinista clásico y la IA generativa, todos los elementos de IA deben compartir este patrón visual:

- **Iconografía Obligatoria:** Todo botón, input o pestaña que active a Gemini debe incluir el icono `sparkles` (✨) de la librería Lucide.
- **Botones de Acción IA:** Para diferenciarse de las acciones estándar, los botones de IA utilizarán el Azul Institucional pero con un efecto visual distintivo. Se recomienda un delineado (outline) Azul/Naranja o un sutil efecto de elevación luminosa al hacer hover (`shadow-blue-500/30`), indicando que el botón ejecuta "magia".
- **Contenedores de Respuesta (Outputs):** El texto, código o análisis generado por la IA no debe mezclarse visualmente con los datos rígidos del sistema. Debe renderizarse dentro de una tarjeta (Card) con un fondo tintado ultraclaro (Ej: `bg-blue-50/50` en claro, `bg-blue-900/10` en oscuro), bordes sutiles azules, y poseer una insignia en la esquina superior derecha que indique claramente: **✨ Generado por IA**.
