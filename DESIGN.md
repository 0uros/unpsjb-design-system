---
name: UNPSJB MII 2.0
colors:
  primary: "#004992"
  primary-on-dark: "#60a5fa"
  accent: "#ff9900"
  surface: "#f8fafc"
  surface-container: "#ffffff"
  on-surface: "#0f172a"
  on-surface-muted: "#64748b"
  border-subtle: "#e2e8f0"
  success: "#047857"
  warning: "#ff9900"
  warning-text: "#b45309"
  error: "#e11d48"
  ai-surface: "#eff6ff"
  dark-surface: "#0f172a"
  dark-surface-container: "#1e293b"
  dark-on-surface: "#f1f5f9"
  dark-border-subtle: "#334155"
  dark-on-surface-muted: "#94a3b8"
  dark-success-text: "#34d399"
  dark-warning-text: "#fbbf24"
  dark-error-text: "#fb7185"
typography:
  display:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  xl: 16px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
---

# Sistema de Diseño Digital UNPSJB (MII 2.0)

**Delegación Trelew · 2026**

Este documento es la única fuente de verdad para el diseño de interfaz (UI), la experiencia de usuario (UX) y la arquitectura base de todo el software web desarrollado en la UNPSJB. Busca trasladar la "fuerza y carácter propio" del manual de marca de 2008 (pensado para impresos) a estándares web modernos de usabilidad, accesibilidad, seguridad y rendimiento.

## 1. Principios

- **Flat moderno:** líneas limpias, bajo ruido visual y alta densidad de información, orientada a la gestión universitaria.
- **Accesible por defecto:** todo cumple WCAG 2.1 AA.
- **Liviano:** cada kilobyte cuenta. Nada de librerías pesadas si no aportan algo concreto.
- **Consistente:** el mismo botón, la misma tarjeta y el mismo header en todas las herramientas, sin importar con qué tecnología estén hechas.

## 2. Arquitectura y tecnología

### A. La base común: `unpsjb.css`

El sistema de diseño se distribuye como **una hoja de estilos central** (`unpsjb.css`) alojada en el servidor de recursos de la Delegación, junto al logo y las fuentes. Contiene:

- Los **tokens** (colores, tipografías, espaciados, radios) como variables CSS (`--color-primary`, `--space-4`, etc.).
- Las **clases de componentes** (`.btn`, `.btn-primary`, `.card`, `.input`, `.banner`, etc.).

Toda herramienta, sea HTML o React, usa esta hoja. Así se ven iguales y un cambio de diseño se hace en un solo lugar.

### B. Qué tecnología usar en cada proyecto

| Tipo de proyecto | Tecnología | Ejemplos |
|---|---|---|
| **Herramienta simple:** una sola pantalla, poco estado, sin login | **HTML plano** en un archivo único (estructura, lógica y estilos propios en un solo `.html`, más `unpsjb.css`) | Conversores, calculadoras, formularios, páginas informativas |
| **Aplicación compleja:** muchas piezas repetidas, datos que se actualizan solos, varias pantallas, formularios con validación | **React + Vite**, con componentes que usan las clases de `unpsjb.css` | Visor de cámaras, sistema de gestión de eventos |

Regla práctica: si la herramienta empieza a necesitar más de una pantalla, o hay que actualizar a mano muchas partes de la página con JavaScript, es momento de pasar a React.

### C. Rendimiento

- **Objetivo de los 14KB:** el HTML inicial de una herramienta simple debería pesar menos de 14KB (comprimido), para que se muestre en un solo viaje de red.
- **DOM poco profundo:** prohibido anidar contenedores (`div`) sin necesidad. Preferir etiquetas semánticas (`header`, `main`, `nav`, `section`, `footer`).
- **Sin Tailwind por CDN:** el script de Tailwind por CDN pesa cientos de KB y no está pensado para producción. En React se permite Tailwind **compilado**, configurado con los mismos tokens de `unpsjb.css`.

### D. PWA (aplicación instalable)

Toda herramienta oficial debe incluir un `manifest.json` y un `sw.js` (Service Worker) para poder instalarse en escritorio o móvil y seguir funcionando ante caídas de red. Requisito: la herramienta debe servirse por **HTTPS**.

## 3. Colores

### Paleta base

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#004992` | Azul institucional. Barras de navegación, botones primarios, títulos principales, encabezados de tablas, links. |
| `accent` | `#ff9900` | Naranja institucional. **Solo como indicador**: anillos de foco, bordes activos (`border-l-4`), advertencias. Nunca como relleno amplio ni como color de texto sobre fondo claro. |
| `surface` | `#f8fafc` | Fondo general de la aplicación (slate-50). |
| `surface-container` | `#ffffff` | Fondo de tarjetas y paneles. |
| `on-surface` | `#0f172a` | Texto principal (slate-900). |
| `on-surface-muted` | `#64748b` | Texto secundario, metadatos, footer (slate-500). Es el gris más claro permitido para texto sobre fondo claro. |
| `border-subtle` | `#e2e8f0` | Bordes de tarjetas, inputs y divisores (slate-200). |

### El semáforo institucional

| Estado | Borde / ícono / relleno | Texto sobre fondo claro |
|---|---|---|
| ✅ Éxito | `#047857` (emerald-700) | `#047857` |
| ⚠️ Advertencia | `#ff9900` (naranja institucional) | `#b45309` (amber-700) |
| ❌ Error | `#e11d48` (rose-600) | `#e11d48` |

### Modo oscuro

| Token | Valor |
|---|---|
| `dark-surface` | `#0f172a` (slate-900) |
| `dark-surface-container` | `#1e293b` (slate-800). En headers puede usarse al 80% con `backdrop-blur` (efecto vidrio). |
| `dark-on-surface` | `#f1f5f9` (slate-100) |
| `dark-border-subtle` | `#334155` (slate-700) |
| `primary-on-dark` | `#60a5fa` (blue-400). Para texto y links azules sobre fondo oscuro; el `#004992` no se lee sobre slate-900. Los botones primarios mantienen el `#004992` con texto blanco. |
| `dark-on-surface-muted` | `#94a3b8` (slate-400). Texto secundario sobre fondo oscuro. |
| `dark-success-text` | `#34d399` (emerald-400). Texto de éxito sobre fondo oscuro. |
| `dark-warning-text` | `#fbbf24` (amber-400). Texto de advertencia sobre fondo oscuro. |
| `dark-error-text` | `#fb7185` (rose-400). Texto de error sobre fondo oscuro. |

Los colores del semáforo para texto (`#047857`, `#b45309`, `#e11d48`) no se leen sobre fondo oscuro, por eso tienen su versión clara. Los bordes y rellenos (botón destructivo, borde de banners) mantienen el color original.

### Fondos limpios

Prohibido usar imágenes de fondo, patrones o marcas de agua (por ejemplo, escudos en baja opacidad). Solo fondos sólidos de la paleta neutra: mejoran la legibilidad, reducen el ruido visual y no suman peso.

## 4. Tipografía

| Estilo | Fuente | Tamaño / peso | Uso |
|---|---|---|---|
| `display` | Montserrat | 32px / 700 | Portadas y títulos de página |
| `headline` | Montserrat | 24px / 700 | Títulos de módulos y banners |
| `title` | Montserrat | 20px / 600 | Títulos de tarjetas y secciones |
| `body-lg` | Inter | 18px / 400 | Textos de lectura larga |
| `body-md` | Inter | 16px / 400 | Texto general (tamaño mínimo para cuerpo) |
| `label` | Inter | 14px / 500 | Inputs, metadatos, encabezados de tablas |
| `caption` | Inter | 12px / 400 | Footer, notas al pie. **Nunca menos de 12px.** |

Las fuentes se sirven desde el servidor de recursos de la Delegación (no desde Google Fonts), con respaldo a fuentes del sistema: `font-family: Inter, system-ui, sans-serif;`.

## 5. Espaciado, radios y layout

- **Espaciado:** escala de 4px. Valores permitidos: 4, 8, 12, 16, 24, 32, 48px (tokens `space-1` a `space-12`).
- **Radios:** `sm` 4px (insignias), `md` 8px (botones, inputs), `xl` 16px (tarjetas, modales), `full` (avatares, píldoras).
- **Sombras:** no se usan sombras pesadas para crear jerarquía. La separación se logra con bordes finos (`border-subtle`) o contraste de superficies.
- **Breakpoints:** `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Se diseña primero para móvil.

## 6. Estructura de página: header y footer

El header y el footer enmarcan la herramienta sin robarle protagonismo.

### Header (arriba a la izquierda)

1. **Marca paraguas:** el isologo oficial de la UNPSJB, tomado del servidor de recursos.
2. **Separador:** una línea vertical sutil (`border-l`).
3. **Identidad de la herramienta:** ícono representativo y título descriptivo claro.

Ejemplo: `[Logo UNPSJB] | 📅 Gestión de Eventos`

### Footer minimalista

Pie de página centrado, texto `caption` en `on-surface-muted`. Contiene año, nombre de la Universidad y versión:

`© 2026 UNPSJB - Soporte Informático | v1.0.0`

En herramientas con IA, el footer incluye también el acceso a la configuración de clave personal (ver sección 10).

### Navegación

Pestañas (tabs) en escritorio. En móviles, menú inferior (bottom navigation) para operar con una sola mano.

## 7. Componentes

- **Botones:** radio 8px. Primario: relleno `primary` y texto blanco. Secundario: delineado (outlined) en `primary`. Destructivo: relleno `error`, **nunca** azul institucional. Estados: hover un tono más oscuro; deshabilitado con opacidad 50% y cursor `not-allowed`.
- **Inputs:** estilo "papel digital". Fondo blanco, borde de 1px `border-subtle`, radio 8px, siempre con `label` visible encima (el placeholder no reemplaza al label). Si hay error, borde `error` y mensaje debajo.
- **Tarjetas:** estilo "bento box". Radio 16px, fondo `surface-container`, borde `border-subtle`, sin sombras pesadas. El borde lateral izquierdo naranja (4px) se reserva para señalética clave.
- **Tablas:** encabezado con fondo `primary` y texto blanco. En tablas complejas, la primera columna queda fija (sticky) al hacer scroll horizontal en móviles.

## 8. Estados del sistema

Prohibido usar las ventanas nativas del navegador (`alert()`, `confirm()`, `prompt()`).

- **Banners contextuales:** tarjetas con borde lateral grueso (`border-l-4`) del color semántico. No bloquean la pantalla.
- **Toasts:** notificaciones flotantes abajo a la derecha que desaparecen solas tras 3 segundos. Los errores importantes no van en toasts, porque desaparecen antes de que se lean: van en banners.
- **Modales:** fondo oscuro desenfocado. El botón destructivo es rojo (`error`). Se cierran con `Esc` y el foco queda atrapado dentro mientras están abiertos.
- **Estados vacíos:** contenedor centrado con iconografía abstracta de baja opacidad, un texto breve y un botón de acción primaria (ej.: "Crear evento").

## 9. Accesibilidad

- **Contraste de texto:** mínimo 4.5:1 (3:1 para texto de 24px o más). Todas las combinaciones de la sección 3 lo cumplen.
- **Foco visible siempre, con doble anillo:** 2px naranja institucional por dentro y 2px azul institucional por fuera. El naranja solo tiene un contraste de 2.1:1 contra el blanco y no alcanza el 3:1 que exige WCAG. El anillo azul le da contraste contra el fondo claro (9:1) y el naranja contrasta contra el azul (4.2:1). En modo oscuro alcanza con el anillo naranja (8.4:1 contra slate-900).
- **Navegación con teclado:** todo lo que se puede hacer con el mouse se puede hacer con el teclado.
- **El color no es el único mensaje:** los estados siempre llevan ícono o texto además del color.
- **Imágenes:** todas con texto alternativo (`alt`); las decorativas, con `alt=""`.

## 10. Assets e íconos

### A. Logotipo institucional (fuente única)

El isologo de la UNPSJB, en SVG optimizado, se aloja en el servidor de recursos de la Delegación (en Proxmox), por ejemplo `https://recursos.tw.unp.edu.ar/assets/logo-unpsjb.svg`. Todas las herramientas lo toman de esa URL. La URL debe ser **HTTPS**: si una página segura carga un recurso por HTTP, el navegador lo bloquea.

### B. Íconos de aplicación (PWA)

El ícono de instalación (definido en `manifest.json`) **no** debe ser el escudo de la UNPSJB solo. Cada herramienta tiene un ícono propio y descriptivo (por ejemplo, un calendario para Eventos o una cámara para el visor de cámaras), para distinguirla en la barra de tareas. Puede usar la paleta institucional, pero no es obligatorio.

### C. Íconos de interfaz y emojis

- **Íconos de interfaz:** librería **Lucide**, en todas las herramientas.
- **Emojis:** solo en contenido y títulos. Para que se vean iguales en Windows, Linux, macOS y Android, se usa **Twemoji** (el fork mantenido por la comunidad, `jdecked/twemoji`, porque el original de Twitter ya no se actualiza).

## 11. Inteligencia artificial

El uso de modelos de lenguaje (LLMs, por ejemplo Gemini) debe ser transparente, seguro y visualmente predecible.

### A. Gestión de claves (API keys)

**Regla de oro: la clave institucional nunca va en el código del navegador.** Todo lo que está en el HTML o el JavaScript de una página puede verlo cualquier visitante con "Ver código fuente", y podría usar la clave a costa de la Universidad.

El sistema de prioridad queda así:

1. **Clave personal del usuario (opcional):** el usuario puede pegar su propia clave desde el footer (botón discreto `⚙️ API IA` o ícono de llave). Se guarda en el `localStorage` de su navegador y solo la usa él.
2. **Proxy institucional:** si no hay clave personal, la herramienta envía la consulta a un pequeño servicio en el servidor de la Delegación (en Proxmox). Ese servicio guarda la clave institucional y reenvía la consulta a Gemini. El navegador nunca ve la clave.
3. **Entorno de prototipado:** solo durante el desarrollo (por ejemplo, en Canvas), puede usarse la clave del propio entorno.

La URL del proxy se define en un bloque de configuración al inicio del script, claramente marcado para el administrador:

```javascript
// ==========================================
// CONFIGURACIÓN INSTITUCIONAL (UNPSJB)
// URL del proxy de IA de la Delegación.
// Dejar vacío si la herramienta no usa el proxy institucional.
// ==========================================
const UNPSJB_AI_PROXY_URL = "https://recursos.tw.unp.edu.ar/ia/";
```

### B. El "sparkle" institucional

Todo elemento de IA comparte el mismo patrón visual, para que el usuario distinga el software clásico de la IA generativa:

- **Ícono obligatorio:** todo botón, input o pestaña que active IA lleva el ícono `sparkles` (✨) de Lucide.
- **Botones de IA:** azul institucional con un rasgo distintivo: delineado azul/naranja o un leve brillo al pasar el mouse (`shadow-blue-500/30`).
- **Respuestas de IA:** nunca mezcladas con los datos del sistema. Se muestran dentro de una tarjeta con fondo tintado ultraclaro (`ai-surface`, blue-50; en oscuro, azul al 10%), borde azul sutil y una insignia arriba a la derecha: **✨ Generado por IA**.

## 12. Resumen: hacer y no hacer

- **Hacer:** usar el naranja solo como acento interactivo o semántico.
- **No hacer:** rellenar áreas grandes con naranja ni usarlo como color de texto sobre fondo claro.
- **Hacer:** separar con bordes sutiles.
- **No hacer:** crear jerarquía con sombras pesadas.
- **Hacer:** mantener contraste WCAG 2.1 AA en todos los textos.
- **No hacer:** usar fuentes de menos de 12px.
- **Hacer:** fijar la primera columna de las tablas complejas en móvil.
- **No hacer:** usar `alert()`, `confirm()` ni `prompt()`.
- **Hacer:** tomar logo, fuentes y `unpsjb.css` del servidor de recursos.
- **No hacer:** poner claves de API en el código del navegador.
