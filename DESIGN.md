---
name: UNPSJB MII 2.0 · Señalética
version: 2.1.0
colors:
  # Institucionales (no se modifican)
  primary: "#004992"
  primary-hover: "#003a75"
  accent: "#ff9900"
  # Neutros teñidos con el azul institucional (modo claro)
  fondo: "#f3f6fa"
  panel: "#ffffff"
  capa: "#e8eef5"
  tinte: "#e6eef8"
  tinta: "#0f2438"
  tinta-2: "#4a5d74"
  linea: "#d6dfea"
  linea-control: "#7b8ca1"
  texto-sobre-banda: "#ffffff"
  texto-sobre-banda-2: "#c7d7ea"
  # Semáforo
  success: "#047857"
  warning: "#ff9900"
  warning-text: "#b45309"
  error: "#e11d48"
  error-hover: "#be123c"
  error-text: "#be123c"
  # Categorías (tipos de evento, áreas): nunca estados
  cat-1: "#7c3aed"
  cat-2: "#0e7490"
  cat-3: "#a21caf"
  cat-4: "#4d7c0f"
  cat-5: "#475569"
  # Modo oscuro
  dark-fondo: "#0b1826"
  dark-panel: "#122234"
  dark-capa: "#1a2d43"
  dark-linea: "#2a4058"
  dark-linea-control: "#6f86a1"
  dark-tinta: "#e9eff6"
  dark-tinta-2: "#a3b4c8"
  dark-primary-text: "#7ab3f0"
  dark-success-text: "#34d399"
  dark-warning-text: "#fbbf24"
  dark-error-text: "#fb7185"
  dark-cat-1: "#a78bfa"
  dark-cat-2: "#22d3ee"
  dark-cat-3: "#e879f9"
  dark-cat-4: "#a3e635"
  dark-cat-5: "#94a3b8"
typography:
  display:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.015em
  headline:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  title:
    fontFamily: Montserrat
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.35
  meta:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  control: 4px
  contenedor: 8px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
size:
  control: 44px
  control-compacto: 36px
  banda: 56px
  logo-banda: 48px
  logo-banda-movil: 36px
  medida-lectura: 70ch
motion:
  rapido: 120ms
  normal: 180ms
  curva: cubic-bezier(0.2, 0, 0, 1)
---

> **Versión anterior: 0.2.1 (borrador v2; antes numerada 2.1.0).** La oficial es `DESIGN.md` (0.3.1). Se conserva para comparar.


# Sistema de Diseño Digital UNPSJB (MII 2.0)

**Delegación Trelew · 2026 · versión 2.1 "Señalética"**

Este documento es la única fuente de verdad para el diseño de interfaz (UI), la experiencia de usuario (UX) y la arquitectura base del software web de la UNPSJB. Traslada la "fuerza y carácter propio" del manual de marca de 2008 (pensado para impresos) a la web, con estándares actuales de usabilidad, accesibilidad, seguridad y rendimiento.

## 1. La idea: la universidad como un lugar que se recorre

Las herramientas de la UNPSJB se usan para **hacer trámites y tareas**: inscribir, cargar, consultar, aprobar. La persona que las usa necesita saber siempre **dónde está, qué puede hacer y qué requiere su atención**. Eso es exactamente lo que resuelve la señalética de un edificio público, y de ahí sale el lenguaje visual del sistema:

- **El azul es la placa.** Como un cartel institucional, el azul aparece como una banda sólida y firme que identifica: el header de cada herramienta. Es el único gesto fuerte de la pantalla; todo lo demás es tranquilo.
- **El naranja es "estás acá".** El naranja institucional tiene un único significado: marca **la ubicación actual, el foco del teclado y lo que necesita atención**. Si algo es naranja, es porque te está señalando algo. Nunca decora.
- **Los grises vienen del azul.** Los neutros (fondos, bordes, textos secundarios) están teñidos con el mismo tono del azul institucional. Por eso la interfaz se siente de la UNPSJB aunque no haya ningún logo a la vista.
- **Letras de cartel, letras de lectura.** Montserrat, una tipografía argentina que nació de la cartelería de Buenos Aires, para títulos. Atkinson Hyperlegible Next, diseñada para que cada letra se distinga sin esfuerzo, para todo lo demás.

### Principios

1. **Plano y firme.** Sin sombras para crear jerarquía, sin degradados, sin vidrio ni brillos. La jerarquía se arma con tamaño, peso, espacio y la banda azul.
2. **Accesible por defecto.** Todo cumple WCAG 2.1 AA, incluidos los bordes de los controles (3:1) y no solo el texto.
3. **Liviano.** Cada kilobyte cuenta. Nada de librerías que no aporten algo concreto.
4. **Familiar antes que original.** Un botón se ve como un botón y un formulario como un formulario. El carácter está en los detalles (la banda, el marcador naranja, las letras, los grises teñidos), no en inventar controles raros.
5. **Consistente.** El mismo header, el mismo botón y el mismo aviso en todas las herramientas, sin importar la tecnología.

## 2. Arquitectura y tecnología

### A. La base común: `unpsjb.css`

El sistema se distribuye como **una hoja de estilos central** (`unpsjb.css`) alojada en el servidor de recursos de la Delegación, junto al logo, los íconos y las fuentes. Contiene:

- Los **tokens** (colores, tipografías, espaciados, radios, tiempos) como variables CSS (`--color-primary`, `--space-4`, etc.).
- Las **clases de componentes** (`.btn`, `.btn-primary`, `.panel`, `.input`, `.aviso`, etc.).

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
- **Fuentes:** solo en formato `woff2` variable, un archivo por familia, con `font-display: swap`.

### D. PWA (aplicación instalable)

Toda herramienta oficial debe incluir un `manifest.json` y un `sw.js` (Service Worker) para poder instalarse en escritorio o móvil y seguir funcionando ante caídas de red. Requisito: la herramienta debe servirse por **HTTPS**. El `theme_color` del manifiesto es `#004992`, para que la barra del sistema continúe la banda azul.

## 3. Color

### A. Reparto

La pantalla típica se reparte así: **neutros teñidos ~85%, azul ~12%, naranja y semáforo ~3%.** Si una pantalla tiene más naranja que eso, algo está mal usado.

### B. Institucionales

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#004992` | La placa: banda del header, botones primarios, links, ítem seleccionado. |
| `primary-hover` | `#003a75` | Hover y estado presionado de lo que es azul. |
| `accent` | `#ff9900` | **"Estás acá":** marcador de la sección actual, anillo de foco, advertencias. Solo en marcas de 3 a 4px, íconos y bordes de foco. **Nunca** como texto sobre fondo claro (2.1:1), nunca como relleno de botones o áreas. |

### C. Neutros teñidos (modo claro)

Los grises dejan de ser la paleta genérica `slate` y pasan a derivarse del azul institucional (tono 212°).

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `fondo` | `#f3f6fa` | Fondo general de la aplicación. | — |
| `panel` | `#ffffff` | Paneles, tablas, formularios, modales. | — |
| `capa` | `#e8eef5` | Segunda capa: encabezado de tablas, barras de herramientas, esqueletos de carga. | — |
| `tinte` | `#e6eef8` | Hover de botones secundarios, filas seleccionadas y fondo de respuestas de IA. | — |
| `tinta` | `#0f2438` | Texto principal. | 14.6:1 sobre `fondo` |
| `tinta-2` | `#4a5d74` | Texto secundario, metadatos, footer. Es el gris más claro permitido para texto. | 5.8:1 sobre `capa` |
| `linea` | `#d6dfea` | Divisores y bordes de paneles (decorativos: no necesitan 3:1). | — |
| `linea-control` | `#7b8ca1` | **Borde de inputs, selects y casillas.** Tiene que verse para saber dónde escribir. | 3.4:1 sobre `panel` |

> Corrección de accesibilidad: en la versión anterior los inputs usaban el mismo borde que las tarjetas (`#e2e8f0`, 1.2:1). WCAG 1.4.11 pide 3:1 para que un control se identifique. Por eso ahora hay dos bordes: `linea` para separar y `linea-control` para controles.

### D. Sobre la banda azul

| Token | Valor | Uso | Contraste sobre `#004992` |
|---|---|---|---|
| `texto-sobre-banda` | `#ffffff` | Nombre de la herramienta, ítem activo. | 8.9:1 |
| `texto-sobre-banda-2` | `#c7d7ea` | Ítems de navegación inactivos. | 6.1:1 |
| `accent` | `#ff9900` | Marcador "estás acá" y foco. | 4.1:1 |

### E. Semáforo

| Estado | Marca (ícono, borde, relleno) | Texto sobre claro | Texto sobre oscuro |
|---|---|---|---|
| Éxito | `#047857` | `#047857` (5.5:1) | `#34d399` |
| Advertencia | `#ff9900` | `#b45309` (5.0:1) | `#fbbf24` |
| Error | `#e11d48` | `#be123c` (6.3:1) | `#fb7185` |
| Información | `#004992` | `#004992` (8.9:1) | `#7ab3f0` |

Los estados **nunca** se comunican solo con color: siempre llevan ícono y texto.

> El rojo `#e11d48` como texto da 4.7:1 sobre blanco, pero baja a 4.3:1 sobre `fondo` y a 3.9:1 sobre el tinte de las insignias. Por eso el texto de error usa `#be123c` (5.2:1 o más en todos los fondos) y `#e11d48` queda para rellenos, bordes e íconos.

### F. Modo oscuro

Se activa si el sistema operativo lo pide; la herramienta puede forzarlo con `<html data-theme="dark">` o `data-theme="light"`. La **banda azul no cambia**: sigue siendo `#004992` con texto blanco, porque es la identidad.

| Token | Valor | Contraste |
|---|---|---|
| `dark-fondo` | `#0b1826` | — |
| `dark-panel` | `#122234` | — |
| `dark-capa` | `#1a2d43` | — |
| `dark-linea` | `#2a4058` | — |
| `dark-linea-control` | `#6f86a1` | 4.3:1 sobre `dark-panel` |
| `dark-tinta` | `#e9eff6` | 13.9:1 sobre `dark-panel` |
| `dark-tinta-2` | `#a3b4c8` | 6.6:1 sobre `dark-capa` |
| `dark-primary-text` | `#7ab3f0` | Links y texto azul: 7.3:1 sobre `dark-panel`. Los botones primarios mantienen `#004992`. |

En oscuro, el texto claro sobre fondo oscuro se ve más fino: los párrafos largos suben el interlineado un paso (1.55 → 1.65).

### G. Fondos limpios

Prohibido usar imágenes de fondo, patrones, degradados o marcas de agua (por ejemplo, escudos en baja opacidad). Solo fondos sólidos de esta paleta.

### H. Categorías

Sirven para distinguir **clases de cosas** (tipo de evento, área, sede), nunca **estados**. Ningún tono se parece al semáforo ni al azul institucional, para que un examen no parezca un error ni una charla parezca un link.

| Token | Claro | Oscuro |
|---|---|---|
| `cat-1` | `#7c3aed` violeta (5.7:1) | `#a78bfa` (5.9:1) |
| `cat-2` | `#0e7490` cian (5.4:1) | `#22d3ee` (8.9:1) |
| `cat-3` | `#a21caf` fucsia (6.3:1) | `#e879f9` (6.5:1) |
| `cat-4` | `#4d7c0f` oliva (5.0:1) | `#a3e635` (10.7:1) |
| `cat-5` | `#475569` pizarra (7.6:1), siempre "Otros" | `#94a3b8` (6.3:1) |

Contraste medido sobre `panel`; todos pasan 4.5:1, así que sirven también como texto.

- **Máximo 5.** Si hay más tipos, los menos frecuentes se agrupan en "Otros" (`cat-5`).
- **Siempre con el nombre al lado.** El color ayuda a encontrar, el nombre dice qué es.
- **El mismo tipo, el mismo color** en toda la herramienta (tabla, agenda, gráficos). Se fija en un solo lugar del código.
- En CSS: la clase `.cat-N` define la variable `--cat`; cualquier componente toma el color con `var(--cat)`.

## 4. Tipografía

### A. Dos familias, dos trabajos

| Familia | Trabajo | Por qué |
|---|---|---|
| **Montserrat** (variable, 600–800) | **Solo títulos:** `display`, `headline`, `title` y el nombre de la herramienta en la banda. | Se mantiene. La diseñó Julieta Ulanovsky inspirada en los carteles del barrio porteño de Montserrat: es una letra argentina y de señalética. Da voz institucional a los títulos. |
| **Atkinson Hyperlegible Next** (variable, 400–700) | **Todo lo demás:** texto, labels, botones, tablas, datos. | **Reemplaza a Inter.** La creó el Braille Institute para lectores con baja visión: distingue a simple vista `I l 1`, `O 0` y `rn m`, algo clave en legajos, DNI, códigos de materia y aulas. Tiene más personalidad que Inter, que hoy es la letra de casi todo el software y hace que cualquier interfaz parezca una plantilla. Es libre (licencia OFL). |

Ambas se sirven desde el servidor de recursos, no desde Google Fonts. Respaldo: `font-family: "Atkinson Hyperlegible Next", system-ui, sans-serif;`.

Si por algún motivo no se puede adoptar Atkinson, la alternativa es seguir con Inter: el resto del sistema funciona igual.

### B. Escala

La escala es fija (no cambia con el ancho de pantalla) y con saltos claros, para que cada rol se reconozca sin leer el texto.

| Rol | Familia | Tamaño / peso / interlineado | Uso |
|---|---|---|---|
| `display` | Montserrat | 32px / 800 / 1.15, tracking −0.015em | Título de la pantalla (uno por pantalla). |
| `headline` | Montserrat | 24px / 700 / 1.2, tracking −0.01em | Secciones principales. |
| `title` | Montserrat | 19px / 700 / 1.3 | Títulos de paneles, modales y avisos destacados. |
| `body-lg` | Atkinson | 18px / 400 / 1.6 | Textos de lectura larga (instructivos, reglamentos). |
| `body-md` | Atkinson | 16px / 400 / 1.55 | Texto general. **Mínimo para cuerpo.** |
| `label` | Atkinson | 15px / 700 / 1.35 | Labels de formularios, botones, encabezados de tabla. |
| `meta` | Atkinson | 14px / 400 / 1.4 | Metadatos, ayudas bajo un input. |
| `caption` | Atkinson | 13px / 400 / 1.4 | Footer, notas al pie. **Nunca menos de 13px.** |

### C. Reglas de uso

- **Mayúscula solo inicial** en todo: títulos, botones, labels, pestañas. Nada de TEXTO EN MAYÚSCULAS ni etiquetas chiquitas en mayúsculas arriba de los títulos: el título se sostiene solo.
- **Ancho de lectura:** los párrafos no pasan de 70 caracteres por línea (`max-width: 70ch`).
- **Números en tablas:** cifras de ancho fijo (`font-variant-numeric: tabular-nums`) y alineadas a la derecha, para que se comparen en columna. (Pendiente: verificar que el archivo de Atkinson que se aloje incluya cifras tabulares.)
- **Títulos equilibrados:** `text-wrap: balance` en títulos, para que no quede una palabra sola en la última línea.
- **Más aire arriba que abajo:** un título tiene el doble de espacio arriba (con lo anterior) que abajo (con lo suyo).

## 5. Espacio, forma y movimiento

### A. Espaciado

Escala de 4px: 4, 8, 12, 16, 24, 32, 48, 64px (`space-1` a `space-16`). Dentro de un grupo, poco espacio (8–12px); entre grupos, mucho (32–48px). Esa diferencia es la que arma la jerarquía, no los recuadros.

### B. Radios: de placa, no de app

| Token | Valor | Uso |
|---|---|---|
| `control` | 4px | Botones, inputs, insignias, pestañas. |
| `contenedor` | 8px | Paneles, tablas, avisos, modales, toasts. |
| `full` | 9999px | Solo avatares. |

Se eliminan los 16px de la versión anterior: los radios grandes hacen que todo parezca una app de consumo. Radios chicos y parejos se leen institucionales y firmes, como una placa.

### C. Tamaños

- **Controles:** 44px de alto (botones, inputs, ítems de navegación). Es el mínimo cómodo para el dedo. En tablas y barras densas se permite la variante compacta de 36px, solo en escritorio.
- **Banda del header:** 64px en escritorio (logo de 48px + 8px arriba y abajo); 56px en celular (escudo de 36px).

### D. Profundidad

No hay sombras para crear jerarquía. **La única excepción es lo que flota sobre la página** (toasts, menús desplegables, modales): llevan una sombra suave con desplazamiento hacia abajo (`0 8px 24px rgb(15 36 56 / 0.16)`), porque ahí la sombra comunica "esto está encima".

### E. Movimiento

- El movimiento solo **responde a algo que hizo la persona**: abrir, cerrar, confirmar. No hay animaciones de entrada de secciones ni efectos al pasar el mouse por tarjetas.
- Duraciones: 120ms para cambios de color (hover), 180ms para aparecer o desaparecer (toasts, menús, modales). Curva: `cubic-bezier(0.2, 0, 0, 1)` (arranca rápido y frena suave).
- Con `prefers-reduced-motion` se elimina todo desplazamiento; quedan solo los cambios de opacidad.

### F. Breakpoints

`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Se diseña primero para móvil. El contenido se alinea **a la izquierda**; solo los modales y el login se centran.

La grilla con columnas fijas (sección 6.E) usa estos cortes: 1 columna en celular, 2 desde `sm`, la cantidad pedida desde `lg`.

## 6. Estructura de página

### A. Header: la banda institucional

Es el gesto fuerte del sistema y el único lugar con un área grande de color.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Isologo UNPSJB] │ [ícono] Gestión de Eventos        [ayuda] [cuenta] │  ← banda #004992, 56px
│                    Agenda   Inscripciones   Aulas                     │  ← navegación sobre la banda
│                    ▀▀▀▀▀▀                                             │  ← marcador naranja "estás acá"
└──────────────────────────────────────────────────────────────────────┘
  fondo #f3f6fa
```

1. **Logo de la Sede Trelew en su versión para banda** (`logo-unpsjb-trelew-blanco.svg`, 48px de alto): el óvalo a color, sin el texto curvo, con la barra y "Sede Trelew" en blanco. Ver sección 10.A.
2. **Separador:** línea vertical de 1px, blanco al 40%, con 24px de aire a cada lado. El logo ya trae su propia barra entre el óvalo y "Sede Trelew"; el aire extra evita que las dos barras se lean amontonadas y deja claro dónde termina la marca y empieza la herramienta.
3. **Identidad de la herramienta:** ícono Lucide en blanco + nombre en Montserrat 700, 18px, blanco.
4. **Acciones** a la derecha (ayuda, cuenta), como botones de ícono con nombre accesible.
5. **Navegación** (si la herramienta tiene secciones): pestañas sobre la misma banda. Inactivas en `texto-sobre-banda-2`; la activa en blanco, con un **marcador naranja de 4px** debajo. El marcador no es la única señal: la activa también cambia de color y lleva `aria-current="page"`.

El header queda fijo arriba al hacer scroll, **sin transparencias ni desenfoque**. En modo oscuro no cambia.

En móvil, la banda muestra solo el escudo (`escudo-unpsjb-blanco.svg`, 36px) y el nombre de la herramienta en un renglón (se recorta con "…" si no entra); la navegación pasa al menú inferior.

### B. Menú inferior (móvil)

Por debajo de 768px, las secciones van en una barra inferior de hasta 5 ítems (ícono + texto), fondo `panel`, borde superior `linea`. El ítem activo: texto e ícono en `primary`, peso 700 y una marca naranja de 4px arriba. Respeta la zona segura inferior de los celulares (`env(safe-area-inset-bottom)`).

### C. Footer

Una línea de texto `caption` en `tinta-2`, alineada a la izquierda con el contenido, separada por un borde superior `linea`:

`© 2026 UNPSJB - Soporte Informático, Delegación Trelew` a la izquierda y `v1.0.0` a la derecha. En móvil, uno debajo del otro.

En herramientas con IA, el footer incluye el acceso a la clave personal (ver sección 11).

### D. Encabezado de pantalla

Debajo de la banda, cada pantalla abre con su título `display` alineado a la izquierda y, si corresponde, la acción principal a la derecha en la misma línea (ej.: "Crear evento"). Sin textos de relleno entre el título y el contenido.

### E. Contenedores y grilla

| Clase | Ancho | Cuándo |
|---|---|---|
| `.container` | hasta 1280px | Casi todo. |
| `.container--ancho` | toda la pantalla | Muros de cámaras, grillas de aulas, tableros. |
| `.container--angosto` | hasta 560px de contenido | Login, portal del wifi, formularios de una columna. |

**Grilla** (`.grilla`): separa con 24px (`--compacta`: 12px). Hay dos formas:

- **Automática** (sin modificador): arma tantas columnas como entren de al menos `--grilla-min` (280px por defecto) y en celular deja una. Todas las celdas miden lo mismo aunque sobre lugar: es lo que se quiere en un muro de cámaras o una lista de aulas. Se ajusta en el HTML: `style="--grilla-min: 200px"`.
- **Columnas fijas** (`--2`, `--3`, `--4`): para formularios y resúmenes con una cantidad conocida de piezas.
- **Lateral** (`--lateral`): columna de 280px (filtros, lista de cámaras) + contenido, desde 1024px. Antes, apiladas.
- `.grilla__completa` hace que una pieza ocupe todo el ancho.

La grilla ordena contenido; no habilita a armar la página como una grilla de tarjetas iguales con ícono + título + texto (sigue prohibido, 7.C).

### F. Migas de pan

Solo en herramientas con más de dos niveles (Agenda → Evento → Inscriptos). Van arriba del título, en `meta` y `tinta-2`, separadas por `/`; el último nivel no es link, va en `tinta` 700 y lleva `aria-current="page"`. Se ocultan al imprimir.

### G. Impresión

Toda herramienta se puede imprimir sin preparar nada: `unpsjb.css` trae las reglas.

- **Siempre en claro**, aunque la persona use modo oscuro.
- **La banda pasa a blanco**, con una línea `primary` de 2px debajo y el logo a color (`logo-unpsjb-trelew.svg`). No se gasta tinta en el bloque azul.
- **Se ocultan** la navegación, los botones, la paginación, las migas y los toasts. Lo que no tenga sentido en papel lleva `.no-imprimir`; lo que solo va en papel (por ejemplo, "Impreso el 30/09/2026"), `.solo-impresion`.
- **Tablas:** la cabecera se repite en cada hoja, las filas no se cortan y el texto puede ir en varios renglones.
- **Colores que informan** (categorías, placas de avisos, insignias) se imprimen aunque el navegador tenga desactivados los fondos.
- Los links a otros sitios muestran su dirección entre paréntesis.

## 7. Componentes

Todos los componentes definen estos estados: normal, hover, foco, presionado, deshabilitado, cargando y error (cuando aplica).

### A. Botones

| Variante | Aspecto | Cuándo |
|---|---|---|
| **Primario** | Relleno `primary`, texto blanco. Hover `primary-hover`. | La acción principal de la pantalla. **Uno solo por zona.** |
| **Secundario** | Fondo `panel`, borde 1px `primary`, texto `primary`. Hover fondo `tinte`. | Acciones alternativas (cancelar, exportar). |
| **Tranquilo** | Sin fondo ni borde, texto `primary`. Hover fondo `tinte`. | Acciones de baja jerarquía, barras de herramientas. |
| **Destructivo** | Relleno `error`, texto blanco. Hover `error-hover`. | Borrar, anular, dar de baja. **Nunca** azul. |

- Forma: 44px de alto, radio 4px, texto `label` (15px/700), padding horizontal 16px. Ícono Lucide de 18px a la izquierda si ayuda a reconocer la acción.
- **El texto dice lo que pasa:** "Guardar cambios", "Eliminar evento", "Inscribir". Nunca "Aceptar", "Enviar" u "OK".
- **Deshabilitado:** opacidad 45% y cursor `not-allowed`. Si no es obvio por qué está deshabilitado, se explica al lado.
- **Cargando:** el botón mantiene su ancho, muestra un indicador giratorio en lugar del ícono y cambia el texto ("Guardando…"). Se bloquea para evitar doble envío.
- Sin flechas `→` agregadas al texto.

### B. Campos de formulario

- **Label siempre visible arriba**, en `label` (15px/700, `tinta`). El placeholder solo muestra un ejemplo, nunca reemplaza al label.
- **Input:** 44px de alto, fondo `panel`, borde 1px `linea-control`, radio 4px, texto `body-md`.
- **Ayuda** debajo en `meta` (`tinta-2`), conectada con `aria-describedby`.
- **Obligatorios:** se marca lo opcional ("(opcional)" junto al label), no lo obligatorio. En trámites, casi todo es obligatorio.
- **Error:** borde `error` engrosado a 2px con una sombra interna (`inset`), para que el campo no cambie de tamaño, `aria-invalid="true"` y mensaje debajo con ícono `circle-alert`, en `error-text`, que diga **qué pasó y cómo se arregla** ("Falta el dominio. Ejemplo: nombre@unp.edu.ar"). Se valida al salir del campo, no mientras se escribe.
- **Formularios largos:** si al enviar hay errores, se muestra arriba un aviso de error con la lista de campos (cada uno es un link al campo) y se mueve el foco a ese aviso.
- **Casillas y radios:** 20px, `accent-color` en `primary-text` (`#004992` en claro, `#7ab3f0` en oscuro, para que la marca se vea sobre el fondo oscuro), label clickeable a la derecha. Varias opciones de una misma pregunta van en un `fieldset.grupo-campos` con su `legend` (ver 7.H).
- **Fecha y hora:** `.input` con `type="date"` o `type="time"`: el calendario y el reloj los pone el navegador (y en celular, el teclado del sistema). Cifras de ancho fijo. Para rangos, "Desde" y "Hasta" van uno al lado del otro en una grilla.

### C. Paneles (antes "tarjetas bento")

El contenedor por defecto **no es la tarjeta**. Primero se usan listas, tablas y secciones separadas por espacio. Un panel se usa cuando agrupa algo que se puede mirar o accionar como unidad.

- Fondo `panel`, borde 1px `linea`, radio 8px, padding 24px (16px en móvil).
- **Encabezado opcional:** título `title` y, a la derecha, una acción tranquila. Separado del cuerpo por un borde `linea`.
- **Prohibido:** paneles dentro de paneles; grillas de paneles iguales con ícono + título + texto como estructura de la página; bordes laterales de color.

### D. Tablas

Son la pieza más usada en gestión, así que se cuidan especialmente.

- Contenedor con borde `linea` y radio 8px, scroll horizontal en móvil.
- **Encabezado:** fondo `capa`, texto `label` en `tinta`, y una **línea inferior de 2px en `primary`** que lo separa de los datos. (Antes era un relleno azul completo: se cambia para que la banda del header sea el único bloque azul de la pantalla y la tabla no compita con ella.)
- Filas de 48px (compacta: 40px), separadas por borde `linea`. Hover: fondo `fondo`. Seleccionada: fondo `tinte` y su casilla marcada.
- Números alineados a la derecha, con cifras de ancho fijo. Fechas en formato `dd/mm/aaaa`.
- Columnas ordenables: la flecha de orden aparece siempre en la columna activa, con `aria-sort`.
- En tablas complejas, la primera columna queda fija al hacer scroll horizontal en móvil.
- Tabla sin resultados: una fila que ocupa todo el ancho con el estado vacío (ver sección 8).

### E. Insignias de estado

Texto `meta` en peso 700, ícono de 14px, fondo con el color del estado al 12% y texto en el color de texto del estado. Radio 4px. Siempre ícono + palabra: Confirmado (`circle-check`), Sin aula (`triangle-alert`), Suspendido (`circle-x`).

### F. Pestañas dentro de la página

Para subdividir un panel o una pantalla (no la navegación principal, que va en la banda): texto `label` en `tinta-2`; la activa en `primary` con marcador de 3px `primary` debajo. El naranja queda reservado para la navegación principal y el foco.

### G. Carga

- **Contenido que tarda:** esqueletos (bloques grises `capa` con la forma del contenido), no un indicador giratorio en el medio de la pantalla.
- **Acciones:** el indicador va en el botón que las disparó (ver 7.A).

### H. Opciones e interruptor

- **Grupo de opciones** (`fieldset.grupo-campos` + `legend`): radios o casillas que responden una misma pregunta. En columna por defecto; `--fila` los pone en renglón si son 2 a 4 y cortos.
- **Interruptor** (`label.interruptor` + `input type="checkbox" role="switch"`): para algo que **se aplica en el momento**, sin botón "Guardar" (activar la grabación de una cámara, avisar por correo). Si el cambio se guarda después con un botón, va una casilla. Mide 44×24px, con radio de 4px como el resto de los controles (nada de píldoras). Apagado: `linea-control`; encendido: `primary-text`.

### I. Segmentado y buscador

- **Segmentado** (`fieldset.segmentado`): elegir una vista entre 2 a 4 (Día | Semana | Mes; 1 | 4 | 9 cámaras). Son radios, así que se maneja con las flechas del teclado y funciona sin JavaScript. La opción elegida: relleno `primary-text` y texto `panel`. No reemplaza a las pestañas: el segmentado cambia **cómo se ve** lo mismo; las pestañas cambian **qué** se ve.
- **Buscador** (`.buscador`): `.input type="search"` con la lupa adentro, a la izquierda. Lleva `aria-label` si no tiene label visible. Filtra mientras se escribe si los datos ya están cargados; si hay que ir al servidor, al apretar Enter.

### J. Paginación

Debajo de las tablas largas: "Anterior", números de página, "Siguiente" y a la derecha un resumen ("Eventos 21 a 40 de 230"). La página actual va en `tinta` con marcador `primary-text` de 3px debajo, como las pestañas (el naranja queda para la navegación principal), y lleva `aria-current="page"`. En celular quedan solo "Anterior" y "Siguiente", con el resumen abajo. Si la tabla tiene menos de 50 filas, conviene no paginar.

## 8. Estados del sistema

Prohibido usar las ventanas nativas del navegador (`alert()`, `confirm()`, `prompt()`).

### A. Avisos (antes "banners")

Un aviso es una **placa de estado**: un bloque sólido del color del estado a la izquierda, que contiene el ícono, y el mensaje a la derecha.

```
┌────┬─────────────────────────────────────────────────────┐
│    │ No se pudo guardar el evento                        │
│ ✕  │ El servidor no respondió. Tus datos siguen cargados:│
│    │ probá de nuevo en unos minutos.     [Reintentar]    │
└────┴─────────────────────────────────────────────────────┘
 44px de color sólido · fondo panel · borde 1px del color del estado · radio 8px
```

- **Bloque del ícono:** 44px de ancho, alto completo, relleno del color del estado. Ícono Lucide de 20px en **blanco** para información, éxito y error, y en **`tinta`** para advertencia (blanco sobre naranja no se ve: 2.1:1; `tinta` sobre naranja da 7.4:1).
- **Mensaje:** título en `body-md` peso 700 y `tinta` (no en color: el color ya está en la placa), descripción en `body-md`. Una acción opcional, como botón tranquilo.
- Íconos: `info`, `circle-check`, `triangle-alert`, `circle-x`.
- Los avisos de error son **persistentes**: no desaparecen solos. Los de éxito pueden tener botón de cerrar.
- `role="alert"` para errores; `role="status"` para el resto.

Por qué cambia: la franja de color de 4px a la izquierda es hoy el recurso más repetido de las interfaces genéricas. La placa sólida usa el mismo color con más decisión, le da una función (sostener el ícono) y remite a la señalética.

### B. Toasts

Confirmaciones breves de algo que la persona acaba de hacer ("Evento guardado").

- **Fondo `tinta`** (azul casi negro institucional), texto blanco, ícono del estado en su versión clara (ej.: `#34d399` para éxito). Radio 8px, sombra de elemento flotante.
- Abajo a la derecha en escritorio; abajo al centro, encima del menú inferior, en móvil.
- Desaparecen a los **5 segundos** (3 no alcanzan para leer una frase con calma), se pausan al pasar el mouse o con el foco, y tienen botón de cerrar.
- **El mismo verbo que el botón:** si el botón dice "Publicar", el toast dice "Publicado".
- **Nunca** para errores importantes: esos van en avisos (8.A), porque el toast desaparece antes de que se lea.
- El contenedor tiene `role="status"` para que el lector de pantalla lo anuncie.

### C. Modales

Solo cuando la tarea necesita interrumpir: confirmar algo irreversible o completar algo breve sin perder el contexto. Si se puede resolver en la misma pantalla, no es un modal.

- Etiqueta nativa `<dialog>` abierta con `showModal()`: el navegador cierra con `Esc` y atrapa el foco.
- Fondo de la página: `tinta` al 60%, **sin desenfoque**.
- Panel de 480px como máximo, radio 8px, padding 24px, sombra de elemento flotante.
- Título en `title` que es una **pregunta concreta** ("¿Eliminar el evento Jornada de Informática?"). El texto explica la consecuencia ("Se borran también las 84 inscripciones. No se puede deshacer.").
- Botones abajo a la derecha: secundario "Cancelar" y la acción con su nombre real ("Eliminar evento"), destructiva si corresponde. El foco inicial va al botón **Cancelar** en acciones destructivas.

### D. Estados vacíos

Un estado vacío **enseña qué va a haber ahí y cómo empezar**.

- Alineado a la izquierda dentro del área de contenido, con un ícono Lucide de 32px en `tinta-2`, un título `title`, una frase y la acción primaria.
- Ejemplo: **"Todavía no hay eventos"** / "Los eventos que crees aparecen acá y en la agenda pública." / [Crear evento].
- Si está vacío por un filtro: "Ningún evento coincide con 'Madryn'" y un botón tranquilo "Quitar filtros".

## 9. Accesibilidad

- **Contraste de texto:** mínimo 4.5:1 (3:1 para texto de 24px o más). Todas las combinaciones de la sección 3 están verificadas.
- **Contraste de controles:** bordes de inputs, casillas y marcadores de estado, mínimo 3:1 (WCAG 1.4.11).
- **Foco visible siempre, con doble anillo** (solo al navegar con teclado, `:focus-visible`):
  - Sobre fondos claros: 2px naranja por dentro y 2px `primary` por fuera. El naranja solo da 2.1:1 contra blanco; el anillo azul le da contraste (8.9:1) y el naranja contrasta contra el azul (4.1:1).
  - Sobre la banda azul y en modo oscuro: alcanza con el anillo naranja (4.1:1 sobre la banda, 7.5:1 sobre `dark-panel`).
- **Enlace para saltar al contenido** ("Ir al contenido") como primer elemento de la página, visible al recibir foco.
- **Navegación con teclado:** todo lo que se hace con el mouse se hace con el teclado, en un orden lógico.
- **Objetivos táctiles:** 44×44px como mínimo, con al menos 8px entre uno y otro.
- **El color no es el único mensaje:** los estados llevan ícono y texto.
- **Imágenes:** todas con `alt`; las decorativas, con `alt=""`. Los íconos que acompañan texto llevan `aria-hidden="true"`; los botones de solo ícono llevan `aria-label`.
- **Zoom:** la interfaz funciona al 200% de zoom sin perder contenido ni necesitar scroll horizontal (salvo tablas).
- **Detalles del navegador:** selección de texto en `tinte` con texto `tinta`, cursor de escritura (`caret-color`) en `primary`, casillas con `accent-color` en `primary-text`, subrayado de links separado 2px del texto.

## 10. Assets e íconos

### A. Logotipo institucional (fuente única)

El logo de la UNPSJB Sede Trelew se aloja en el servidor de recursos de la Delegación (en Proxmox), por ejemplo `https://recursos.tw.unp.edu.ar/assets/`. Todas las versiones se generan con `logo/generar.sh` a partir del original de Illustrator (`logo unpsjb_SEDE TW.eps`).

**En pantalla, la gaviota es plana y vectorial:** óvalo azul, gaviota blanca, puntas de las alas `#4e4d49` y pico `#eab645`, sin el detalle de las plumas. Se ve nítida a cualquier tamaño (incluso como ícono de 16px, donde la foto era una mancha gris) y pesa diez veces menos.

**En pantalla va sin el texto curvo** ("Universidad Nacional de la Patagonia San Juan Bosco"): a 48px no se lee y queda como un borde borroso. Sin él, la barra y "Sede Trelew" se acercan al óvalo (el mismo aire a los dos lados de la barra) y la barra queda centrada con el óvalo. El nombre completo sigue en el `<title>` del SVG y en la versión completa para usos grandes.

| Archivo | Uso | Peso (comprimido) |
|---|---|---|
| `logo-unpsjb-trelew-blanco.svg` | **Banda azul** de todas las herramientas. Gaviota plana; barra y "Sede Trelew" en blanco. Proporción 2,11:1 (101×48px). | ~3KB |
| `escudo-unpsjb-blanco.svg` | Banda en **celular**: solo el óvalo con la gaviota plana (29×36px). | ~1KB |
| `logo-unpsjb-trelew.svg` | **Fondos claros**, documentos impresos o exportados; también el que usa `unpsjb.css` al imprimir. Gaviota plana; barra y "Sede Trelew" en gris `#3b3a36`. | ~3KB |
| `logo-unpsjb-trelew-completo.svg` | **Usos grandes** (carteles, portadas, pantallas de bienvenida): el original sin cambios, con la foto de la gaviota y el texto curvo. | ~56KB |

- **Los colores del óvalo no se modifican:** el azul (`#347EBB`), el gris de las puntas y el amarillo del pico se tomaron de la foto original. Son parte de la marca, no colores de interfaz: no se usan en botones ni textos.
- **De dónde sale la gaviota plana:** en el EPS la gaviota es una foto (JPEG en CMYK). `logo/vectorizar.sh` la separa por color, borra el detalle y la vectoriza; el resultado queda guardado en `logo/gaviota-plana.svg`. Solo hay que volver a correrlo si cambia el EPS (instala sus librerías de Python en `~/.cache/unpsjb-logo/`). `logo/generar.sh` usa esa gaviota guardada y no necesita nada extra. **No se edita a mano:** si hay que afinar la forma, se ajusta `logo/vectorizar.py` o se reemplaza por un dibujo hecho por un diseñador.
- Todos los SVG llevan `<title>` ("Universidad Nacional de la Patagonia San Juan Bosco, Sede Trelew"); en el HTML se usan con `alt="UNPSJB Sede Trelew"`.

La URL debe ser **HTTPS**: si una página segura carga un recurso por HTTP, el navegador lo bloquea.

### B. Íconos de aplicación (PWA)

El ícono de instalación (en `manifest.json`) **no** es el escudo solo. Cada herramienta tiene uno propio: su ícono Lucide en blanco sobre un cuadrado `#004992` con un marcador naranja en la esquina inferior (el mismo "estás acá" de la banda). Así todas se reconocen como de la UNPSJB y se distinguen entre sí en la barra de tareas.

### C. Íconos de interfaz

- **Librería Lucide** en todas las herramientas: trazo de 2px, tamaños 16, 18, 20 y 32px. Se incluyen como SVG en línea o desde un archivo de íconos del servidor de recursos, solo los que se usan.
- **Nada de emojis como íconos.** Los emojis se ven distinto en cada sistema operativo y no tienen el mismo trazo que el resto de la interfaz. En el header, en los botones y en los estados va siempre un ícono Lucide.
- Los emojis solo aparecen si los escribe una persona (comentarios, descripciones de eventos, títulos que carga el usuario).

### D. Emojis: Twemoji en todas las herramientas

Los emojis que escriben las personas se ven igual en Windows, Linux, macOS, Android e iOS, con los dibujos de **Twemoji** (los de Twitter), **también mientras se escriben** en un campo de texto.

- **Paquete:** `jdecked/twemoji`, el fork que mantiene la comunidad y se actualiza con cada versión nueva de Emoji de Unicode. El original de Twitter está abandonado.
- **Cómo funciona:** los SVG de Twemoji se convierten en una **fuente de color** (`fonts/TwemojiUNPSJB.woff2`, formato COLRv0, que funciona en Chrome, Edge, Firefox y Safari). `unpsjb.css` la declara después de las fuentes de texto, así que cualquier emoji de la página, en textos, `input` o `textarea`, se dibuja con Twemoji sin una línea de JavaScript.
- **Liviano:** la fuente se declara con `unicode-range`, así que el navegador solo la descarga en páginas que tienen emojis.
- **Actualización:** cuando salga una versión nueva de `jdecked/twemoji`, se corre `emoji/construir.sh <versión Twemoji> <versión Unicode>` y se reemplaza el archivo de la fuente en el servidor de recursos.
- **Desactivar en una herramienta:** si una herramienta necesita los emojis del sistema, redefine `--font-texto` y `--font-titulo` sin `"Twemoji UNPSJB"`.

## 11. Inteligencia artificial

El uso de modelos de lenguaje (LLMs, por ejemplo Gemini) debe ser transparente, seguro y visualmente predecible.

### A. Gestión de claves (API keys)

**Regla de oro: la clave institucional nunca va en el código del navegador.** Todo lo que está en el HTML o el JavaScript de una página puede verlo cualquier visitante con "Ver código fuente", y podría usar la clave a costa de la Universidad.

El sistema de prioridad queda así:

1. **Clave personal del usuario (opcional):** el usuario puede pegar su propia clave desde el footer (botón tranquilo con ícono `key-round` y el texto "Clave de IA"). Se guarda en el `localStorage` de su navegador y solo la usa él.
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

### B. Cómo se ve la IA

La IA se distingue por **un ícono y un lugar propio**, no por efectos. Nada de brillos, degradados violetas ni animaciones "mágicas".

- **Ícono obligatorio:** todo botón, campo o pestaña que active IA lleva el ícono `sparkles` de Lucide.
- **Botones de IA:** variante secundaria (fondo `panel`, borde `primary`) con el ícono `sparkles`. El texto dice qué hace: "Resumir con IA", "Sugerir descripción". Así nunca compiten con la acción primaria de la pantalla.
- **Respuestas de IA:** siempre en su propio panel, nunca mezcladas con los datos del sistema.
  - Fondo `tinte` (en oscuro, `primary-text` al 10%), borde 1px `primary` al 30%, radio 8px.
  - **Primera línea del panel:** ícono `sparkles` + "Generado por IA" en `meta` peso 700, `primary`. Va arriba a la izquierda (no en una esquina flotante) para que sea lo primero que se lee, también con lector de pantalla.
  - Debajo de la respuesta: acciones tranquilas "Copiar", "Usar este texto" y "Descartar". El texto generado **nunca se guarda solo**: una persona decide usarlo.
  - Mientras genera: esqueleto con el texto "Generando…" (`role="status"`), y un botón "Detener".

## 12. Cómo se escribe

Las palabras son parte del diseño.

- **Tratamiento:** se usa **vos**, en todas las herramientas, igual ("Ingresá tu legajo", "Probá de nuevo").
- **Nombrar por lo que entiende la persona**, no por cómo está hecho el sistema: "Inscripciones", no "Registros de la tabla alumnos_evento".
- **Botones con verbo y objeto:** "Guardar cambios", "Descargar planilla". La misma acción conserva el mismo nombre en todo el recorrido.
- **Errores:** dicen qué pasó y cómo se arregla. No piden disculpas ni son vagos ("Ocurrió un error" no sirve).
- **Sin relleno:** nada de "Bienvenido/a al sistema de…" arriba de cada pantalla. El título de la pantalla alcanza.
- **Fechas y números** en formato argentino: `29/09/2026`, `14:30 h`, `1.250,50`.

## 13. Resumen: hacer y no hacer

| Hacer | No hacer |
|---|---|
| Usar la banda azul del header como el único bloque grande de color. | Rellenar otras áreas con azul (encabezados de tabla, tarjetas destacadas). |
| Usar el naranja para "estás acá", el foco y las advertencias. | Usar el naranja como texto, relleno o decoración. |
| Usar grises teñidos del azul (`tinta`, `linea`, `capa`). | Usar la paleta `slate` genérica o grises neutros. |
| Separar con espacio y bordes finos. | Crear jerarquía con sombras, degradados, vidrio o brillos. |
| Usar paneles solo cuando agrupan una unidad. | Armar la página como una grilla de tarjetas iguales o anidar tarjetas. |
| Avisos como placa de estado con ícono. | Franjas de color de 4px a la izquierda de avisos o tarjetas. |
| Íconos Lucide en toda la interfaz. | Emojis como íconos. |
| Mayúscula solo inicial. | TEXTO EN MAYÚSCULAS o etiquetas arriba de los títulos. |
| Borde `linea-control` (3:1) en los inputs. | Inputs con borde apenas visible. |
| Botones que dicen lo que hacen. | "Aceptar", "Enviar", "OK". |
| Mantener contraste WCAG 2.1 AA en textos y controles. | Usar texto de menos de 13px. |
| Fijar la primera columna de tablas complejas en móvil. | Usar `alert()`, `confirm()` ni `prompt()`. |
| Tomar logo, fuentes (incluida la de emojis), íconos y `unpsjb.css` del servidor de recursos. | Poner claves de API en el código del navegador. |
| Usar los colores de categoría para tipos de cosas, siempre con su nombre. | Pintar categorías con el semáforo o estados con colores de categoría. |
| Usar el interruptor solo para lo que se aplica en el momento. | Poner un interruptor en un formulario con botón "Guardar". |
