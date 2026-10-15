---
name: design-md-unpsjb
description: "Design.md para generar páginas para la universidad"
---

---
name: UNPSJB · Señalética
version: 0.4.5
colors:
  # Institucionales (no se modifican)
  primario: "#004992"
  primario-hover: "#003a75"
  acento: "#ff9900"
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
  exito: "#047857"
  advertencia: "#b45309"
  advertencia-texto: "#a64c08"
  error: "#e11d48"
  error-hover: "#be123c"
  error-texto: "#be123c"
  # Categorías (tipos de evento, áreas): nunca estados
  cat-1: "#7c3aed"
  cat-2: "#0e7490"
  cat-3: "#a21caf"
  cat-4: "#4d7c0f"
  cat-5: "#475569"
  # Modo oscuro
  oscuro-fondo: "#0b1826"
  oscuro-panel: "#122234"
  oscuro-capa: "#1a2d43"
  oscuro-linea: "#2a4058"
  oscuro-linea-control: "#6f86a1"
  oscuro-tinta: "#e9eff6"
  oscuro-tinta-2: "#a3b4c8"
  oscuro-primario-texto: "#7ab3f0"
  oscuro-primario-relleno: "#3874cb"
  oscuro-primario-relleno-hover: "#316bbf"
  oscuro-exito-texto: "#34d399"
  oscuro-advertencia-texto: "#fbbf24"
  oscuro-error-texto: "#fb7185"
  oscuro-cat-1: "#a78bfa"
  oscuro-cat-2: "#22d3ee"
  oscuro-cat-3: "#e879f9"
  oscuro-cat-4: "#a3e635"
  oscuro-cat-5: "#94a3b8"
  # Series de gráficos (el orden es parte de la paleta)
  serie-1: "#0b55a8"
  serie-2: "#4d7c0f"
  serie-3: "#7c3aed"
  serie-4: "#0891b2"
  serie-5: "#a21caf"
  serie-otros: "#475569"
  oscuro-serie-1: "#3874cb"
  oscuro-serie-2: "#65a30d"
  oscuro-serie-3: "#8b5cf6"
  oscuro-serie-4: "#0ea5b7"
  oscuro-serie-5: "#c026d3"
  oscuro-serie-otros: "#94a3b8"
  # Papel: lo que se imprime y la hoja de los documentos (no siguen al tema)
  papel: "#ffffff"
  papel-tinta: "#000000"
  papel-tinta-2: "#333d49"
  papel-linea: "#b9c6d6"
typography:
  titulo-1:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: -0.015em
  titulo-2:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  titulo-3:
    fontFamily: Montserrat
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.3
  texto-grande:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  texto-base:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.35
  detalle:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  nota:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  control: 4px
  contenedor: 8px
  completo: 9999px
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
  fila: 48px
  fila-compacta: 40px
  banda: 64px
  banda-movil: 56px
  subbarra: 48px
  tabla-fija-max: 140px
  logo-banda: 48px
  logo-banda-movil: 36px
  medida-lectura: 70ch
motion:
  rapido: 120ms
  normal: 180ms
  curva: cubic-bezier(0.2, 0, 0, 1)
---

# Sistema de Diseño Digital UNPSJB

**Delegación Trelew · 2026 · versión 0.4.5 "Señalética"**

> **Versión oficial desde el 1 de octubre de 2026.** Reemplaza a la 0.2.1 (el borrador "v2"), que quedó en `archivo/` (`DESIGN-v2.md`, `unpsjb-v2.css` y `muestra-v2.html`; fuera de git, la etiqueta es `v0.2.1`). Qué cambió en cada versión y cómo migrar: `CHANGELOG.md`. Para comparar: `archivo/comparar-v3.html` (0.2.1 y la actual) y `archivo/comparar-v3.1.html` (antes y después de las correcciones de la 0.3.1). Lo nuevo de la 0.4 está marcado "(nuevo en 0.4)" y listado al principio de `muestra.html`. El primer número es 0 porque todavía no se publicó en el servidor (sección 14.C).

Este documento es la única fuente de verdad para el diseño de interfaz (UI), la experiencia de usuario (UX) y la arquitectura base del software web de la UNPSJB. Traslada la "fuerza y carácter propio" del manual de marca de 2008 (pensado para impresos) a la web, con estándares actuales de usabilidad, accesibilidad, seguridad y rendimiento. El primer borrador (`notas/FRAMEWORK.md`) lo llamaba "MII 2.0", como continuación de ese manual; desde la 0.4.5 el nombre es solo "Sistema de Diseño Digital UNPSJB".

## 1. La idea: la universidad como un lugar que se recorre

Las herramientas de la UNPSJB se usan para **hacer trámites y tareas**: inscribir, cargar, consultar, aprobar. La persona que las usa necesita saber siempre **dónde está, qué puede hacer y qué requiere su atención**. Eso es exactamente lo que resuelve la señalética de un edificio público, y de ahí sale el lenguaje visual del sistema:

- **El azul es la placa.** Como un cartel institucional, el azul aparece como una banda sólida y firme que identifica: el header de cada herramienta. Es el único gesto fuerte de la pantalla; todo lo demás es tranquilo. La placa dice **quién es** (la UNPSJB y la herramienta); **por dónde se va** lo dice la sub-barra clara de abajo.
- **El naranja es "estás acá".** El naranja institucional tiene un único significado: marca **la ubicación actual y el foco del teclado**. Si algo es naranja, es porque te dice dónde estás parado. Nunca decora y nunca avisa de un problema: las advertencias tienen su propio color (ámbar).
- **Los grises vienen del azul.** Los neutros (fondos, bordes, textos secundarios) están teñidos con el mismo tono del azul institucional. Por eso la interfaz se siente de la UNPSJB aunque no haya ningún logo a la vista.
- **Letras de cartel, letras de lectura.** Montserrat, una tipografía argentina que nació de la cartelería de Buenos Aires, para títulos. Atkinson Hyperlegible Next, diseñada para que cada letra se distinga sin esfuerzo, para todo lo demás.

### Principios

1. **Plano y firme.** Sin sombras para crear jerarquía, sin degradados, sin vidrio ni brillos. La jerarquía se arma con tamaño, peso, espacio y la banda azul.
2. **Accesible por defecto.** El objetivo es WCAG 2.2 AA (desde la 0.3.1), incluidos los bordes de los controles (3:1) y no solo el texto.
3. **Liviano.** Cada kilobyte cuenta. Nada de librerías que no aporten algo concreto.
4. **Familiar antes que original.** Un botón se ve como un botón y un formulario como un formulario. El carácter está en los detalles (la banda, el marcador naranja, las letras, los grises teñidos), no en inventar controles raros.
5. **Consistente.** El mismo header, el mismo botón y el mismo aviso en todas las herramientas, sin importar la tecnología.

## 2. Arquitectura y tecnología

### A. La base común: `unpsjb.css`

El sistema se distribuye como **una hoja de estilos central** (`unpsjb.css`) alojada en el servidor de recursos de la Delegación, junto al logo, los íconos y las fuentes. Contiene:

- Los **tokens** (colores, tipografías, espaciados, radios, tiempos) como variables CSS (`--color-primario`, `--espacio-4`, etc.).
- Las **clases de componentes** (`.boton`, `.boton--primario`, `.panel`, `.input`, `.aviso`, etc.).

Toda herramienta, sea HTML o React, usa esta hoja. Así se ven iguales y un cambio de diseño se hace en un solo lugar.

Las piezas grandes que usan pocas herramientas van en **módulos**: hojas aparte que se cargan después de la central y usan sus tokens (sección 16). Hoy hay siete: agenda de aulas, visor de cámaras, documentos e impresión, gráficos de líneas, mesa de ayuda, cartelera y planos.

**Cómo se nombran las clases y las variables (desde la 0.3.2).** Todo el código va en español, para poder adivinar un nombre sin ir a buscarlo:

1. **Cada cosa se llama como la nombra este documento.** Si acá dice "Menú inferior", la clase es `.menu-inferior`; si dice "botón destructivo", es `.boton--destructivo`.
2. **Sin tildes ni eñes:** `.paginacion`, `.pestanas`.
3. **Una sola forma:** `componente`, `componente--variante`, `componente__parte`. Ejemplo: `.aviso`, `.aviso--error`, `.aviso__titulo`.
4. **Quedan en inglés** solo los nombres de etiquetas HTML (`.input`, `.select`, `.textarea`, `.label`) y los préstamos que este documento usa tal cual: `toast`, `chip`, `modal` y `hover`.

La lista de nombres anteriores y nuevos está en `RENOMBRES.md`.

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
- **Fotos y video (nuevo en 0.4.5).** Las páginas con fotos son las que más pesan: en el estudio de referencia (`REFERENCIAS-UNC-UBA.md`), la portada de una universidad bajaba 22 MB, casi todo imágenes sin reducir, y la de otra, 11,7 MB de un video. Topes:
  - **Una página no pasa de 1 MB** en total la primera vez que se abre.
  - **Cada foto, 200 KB como máximo,** en `webp` o `avif`, y con el tamaño en que se muestra, no el de la cámara. Con `width` y `height` escritos, para que la página no salte al cargar.
  - **`loading="lazy"`** en toda foto que no se ve al entrar.
  - **Ningún video arranca solo** ni se descarga antes de que la persona lo pida: va una imagen con el botón de reproducir.

### D. PWA (aplicación instalable)

Toda herramienta oficial debe incluir un `manifest.json` y un `sw.js` (Service Worker) para poder instalarse en escritorio o móvil y seguir funcionando ante caídas de red. Requisito: la herramienta debe servirse por **HTTPS**. El `theme_color` del manifiesto es `#004992`, para que la barra del sistema continúe la banda azul.

### E. Convivencia con SIU y Moodle (nuevo en 0.3)

La UNPSJB usa también sistemas que no hacemos nosotros: SIU-Guaraní, Mapuche, Pilagá, Diaguita, SUDOCU, el portal SIU-Huarpe, el ingreso único SIU-Araí: Usuarios y Moodle. Para el personal, la dificultad no es que se vean distintos, sino que **funcionen distinto**: si una tabla, un formulario o un botón se comportan de una manera en SIU y de otra en nuestras herramientas, hay que aprender dos lógicas.

- **Regla 1: copiar patrones antes que inventar.** Si SIU ya resuelve algo de una forma razonable (orden de columnas, filtros, cómo se confirma un trámite), nuestras herramientas hacen lo mismo con el aspecto de este sistema. Nos diferenciamos solo cuando el patrón de SIU es inaccesible o confuso.
- **Regla 2: dos niveles de tema.** Se definen con quien administre cada sistema (en general, el Rectorado):

| Nivel | Sistemas | Qué se aplica |
|---|---|---|
| **Tema completo** | SIU-Huarpe, pantalla de ingreso de SIU-Araí, Moodle | Tokens de color, tipografía, foco, botones y avisos. Son la puerta de entrada: deben sentirse de la UNPSJB. |
| **Solo marca** | SIU-Guaraní, Mapuche, Pilagá, Diaguita, SUDOCU | Logo, favicon, color primario y anillo de foco. No se tocan tablas ni formularios internos: son pantallas densas y un estilo externo puede romperlas. |

- **Cómo se aplica:** con una hoja aparte (por ejemplo `unpsjb-siu.css`) que toma los tokens de `unpsjb.css` y los aplica a las clases de ese sistema. La gráfica de SIU usa Bootstrap 3/4, que en su mayoría **no** lee variables CSS: hay que sobreescribir sus clases (`.btn-primary`, `.navbar`, `.alert-warning`…) una por una. Moodle, en cambio, permite cargar SCSS propio desde su tema (Boost).
- **Antes de hacerlo:** confirmar quién administra cada sistema y si permite inyectar CSS. Hasta entonces, esta sección es una guía, no una tarea.

## 3. Color

### A. Reparto

La pantalla típica se reparte así: **neutros teñidos ~85%, azul ~12%, naranja y semáforo ~3%.** Si una pantalla tiene más naranja que eso, algo está mal usado.

### B. Institucionales

| Token | Valor | Uso |
|---|---|---|
| `primario` | `#004992` | La placa: banda del header, botones primarios, links, ítem seleccionado. |
| `primario-hover` | `#003a75` | Hover y estado presionado de lo que es azul. |
| `acento` | `#ff9900` | **"Estás acá":** marcador de la sección actual y anillo de foco. **Nada más.** Solo en marcas de 3 a 4px y bordes de foco. **Nunca** como texto sobre fondo claro (2.1:1), nunca como relleno de botones o áreas, nunca para advertencias. |

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
| `acento` | `#ff9900` | Anillo de foco de los botones de la banda. (Desde la 0.3 el marcador "estás acá" ya no va sobre la banda: va en la sub-barra.) | 4.1:1 |

### E. Semáforo

| Estado | Marca (ícono, borde, relleno) | Texto sobre claro | Texto sobre oscuro |
|---|---|---|---|
| Éxito | `#047857` | `#047857` (5.5:1) | `#34d399` |
| Advertencia | `#b45309` (ámbar) | `#a64c08` (5.7:1 sobre blanco, 4.9:1 sobre `--color-capa`; 0.4.5) | `#fbbf24` |
| Error | `#e11d48` | `#be123c` (6.3:1) | `#fb7185` |
| Información | `#004992` | `#004992` (8.9:1) | `#7ab3f0` |

Los estados **nunca** se comunican solo con color: siempre llevan ícono y texto.

> **Cambio en 0.3: la advertencia deja de ser naranja.** En la 0.2, `#ff9900` significaba tres cosas (ubicación, foco y advertencia), y quien recorría la pantalla no sabía si lo naranja era "estás acá" o "hay un problema". Ahora la marca de advertencia es ámbar `#b45309`, el mismo tono que ya se usaba para su texto: el ícono blanco da 5.0:1 y la placa se distingue del fondo tanto en claro (5.0:1) como en oscuro (3.2:1 sobre `oscuro-panel`). Además, la placa de advertencia de la 0.2 era un bloque naranja de 44px, que contradecía la regla "el naranja nunca como relleno".

> El rojo `#e11d48` como texto da 4.7:1 sobre blanco, pero baja a 4.3:1 sobre `fondo` y a 3.9:1 sobre el tinte de las insignias. Por eso el texto de error usa `#be123c` (5.2:1 o más en todos los fondos) y `#e11d48` queda para rellenos, bordes e íconos.

### F. Modo oscuro

Se activa si el sistema operativo lo pide; la herramienta puede forzarlo con `<html data-tema="oscuro">` o `data-tema="claro"`. La **banda azul no cambia**: sigue siendo `#004992` con texto blanco, porque es la identidad.

**Selector de tema (nuevo en 0.3).** Toda herramienta ofrece elegir **Automático · Claro · Oscuro**, porque hay personal en computadoras donde no puede cambiar la preferencia del sistema, y personas con fotofobia o baja visión que alternan según la luz de la oficina.

- Va en el **pie** (o en el menú de cuenta, si la herramienta lo tiene), como un segmentado compacto (`.segmentado.selector-tema`) con la leyenda "Tema".
- La primera vez vale **Automático** (sigue al sistema). La elección se guarda en el navegador (`localStorage`, clave `unpsjb-tema`), con el mismo valor para todas las herramientas del mismo dominio.
- Para que la página no parpadee en el tema equivocado, un script mínimo en el `<head>`, **antes** de la hoja de estilos, aplica la elección guardada:

```html
<script>try{var t=localStorage.getItem("unpsjb-tema");if(t==="claro"||t==="oscuro")document.documentElement.dataset.tema=t}catch(e){}</script>
```

| Token | Valor | Contraste |
|---|---|---|
| `oscuro-fondo` | `#0b1826` | — |
| `oscuro-panel` | `#122234` | — |
| `oscuro-capa` | `#1a2d43` | — |
| `oscuro-linea` | `#2a4058` | — |
| `oscuro-linea-control` | `#6f86a1` | 4.3:1 sobre `oscuro-panel` |
| `oscuro-tinta` | `#e9eff6` | 13.9:1 sobre `oscuro-panel` |
| `oscuro-tinta-2` | `#a3b4c8` | 6.6:1 sobre `oscuro-capa` |
| `oscuro-primario-texto` | `#7ab3f0` | Links y texto azul: 7.3:1 sobre `oscuro-panel`. |
| `oscuro-primario-relleno` | `#3874cb` | **Relleno del botón primario en oscuro (cambio en 0.3.1).** 3.5:1 sobre `oscuro-panel`, 3.0:1 sobre `oscuro-capa`, 3.9:1 sobre `oscuro-fondo`; el texto blanco encima da 4.6:1. Hover: `#316bbf`. |

> **Cambio en 0.3.1: el botón primario se aclara en oscuro.** Con `#004992`, el botón daba 1.8:1 contra el panel oscuro: casi no se distinguía dónde estaba. En CSS, el relleno pasa a tener su propio token (`--color-primario-relleno`), que en claro sigue siendo `#004992`. La banda no cambia: no es un control y es la identidad.

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
- **El mismo tipo, el mismo color** en toda la herramienta (tabla, agenda, lista). Se fija en un solo lugar del código. En los **gráficos** no van estos colores, sino los de serie (3.I).
- En CSS: la clase `.cat-N` define la variable `--cat`; cualquier componente toma el color con `var(--cat)`.

### I. Series de gráficos (nuevo en 0.4)

Las categorías se eligieron para leerse como texto junto a un nombre. En un gráfico el trabajo es otro: dos series vecinas no se tienen que confundir, **tampoco para una persona con daltonismo**. Medidas con ese criterio, las categorías no pasan (el fucsia y el cian se confunden, y dos tonos se leen como gris). Por eso los gráficos tienen su propia paleta:

| Token | Tono | Claro | Oscuro |
|---|---|---|---|
| `serie-1` | azul | `#0b55a8` | `#3874cb` |
| `serie-2` | oliva | `#4d7c0f` | `#65a30d` |
| `serie-3` | violeta | `#7c3aed` | `#8b5cf6` |
| `serie-4` | cian | `#0891b2` | `#0ea5b7` |
| `serie-5` | fucsia | `#a21caf` | `#c026d3` |
| `serie-otros` | pizarra | `#475569` | `#94a3b8` |

- **El orden es parte de la paleta.** Se asignan de la 1 a la 5, sin saltear ni reordenar: lo que se midió es que cada una se distinga de sus vecinas.
- **Una serie sola usa `serie-1`**, en todas sus barras o en su línea.
- **Máximo 5 series**, más "Otros". Con más, es una tabla.
- **El color sigue a la cosa, no a su puesto:** si se filtra una serie, las que quedan no cambian de color.
- **El texto nunca lleva el color de la serie.** Valores, nombres y leyendas van en `tinta` o `tinta-2`; el color va en un cuadradito al lado.
- **Nunca el semáforo** para algo que no es un estado, ni el naranja.
- Si las series son las categorías de la herramienta (tipos de evento), cada una usa la serie de su mismo tono: `cat-1` violeta → `serie-3`, `cat-2` cian → `serie-4`, `cat-3` fucsia → `serie-5`, `cat-4` oliva → `serie-2`.
- En CSS: la clase `.serie-N` define la variable `--serie`.

Cómo se midió: diferencia entre vecinas con visión normal y con deuteranopía y protanopía simuladas, luminosidad y saturación dentro de un rango, y 3:1 contra el fondo. En claro, la peor pareja da 9,8 con daltonismo (el mínimo es 8) y 24,5 con visión normal (el mínimo es 15); en oscuro, 10,9 y 24,2. Si se cambia un color o el orden, hay que medir de nuevo.

## 4. Tipografía

### A. Dos familias, dos trabajos

| Familia | Trabajo | Por qué |
|---|---|---|
| **Montserrat** (variable, 600–800) | **Solo títulos:** `titulo-1`, `titulo-2`, `titulo-3` y el nombre de la herramienta en la banda. | Se mantiene. La diseñó Julieta Ulanovsky inspirada en los carteles del barrio porteño de Montserrat: es una letra argentina y de señalética. Da voz institucional a los títulos. |
| **Atkinson Hyperlegible Next** (variable, 400–700) | **Todo lo demás:** texto, labels, botones, tablas, datos. | **Reemplaza a Inter.** La creó el Braille Institute para lectores con baja visión: distingue a simple vista `I l 1`, `O 0` y `rn m`, algo clave en legajos, DNI, códigos de materia y aulas. Tiene más personalidad que Inter, que hoy es la letra de casi todo el software y hace que cualquier interfaz parezca una plantilla. Es libre (licencia OFL). |

Ambas se sirven desde el servidor de recursos, no desde Google Fonts.

Si por algún motivo no se puede adoptar Atkinson, la alternativa es seguir con Inter: el resto del sistema funciona igual. (Se evaluaron también Public Sans, la de USWDS, y Encode Sans, la de Poncho/argentina.gob.ar: ninguna distingue `I l 1` y `O 0` tan bien como Atkinson.)

**Carga (nuevo en 0.3):**

- **Un archivo variable por familia**, en `woff2`. Los pesos no suman descarga, pero se usan pocos: 400 y 700 en texto; 700 y 800 en títulos.
- **Ya recortados al español:** los archivos actuales traen unos 220 caracteres (latín, tildes, ñ, ü, ¿ ¡, €, comillas y rayas) y pesan 34 KB (Atkinson) y 38 KB (Montserrat). Si se regeneran, se mantiene ese recorte. Verificado en la 0.3: **ambas traen cifras tabulares (`tnum`)**.
- **`font-display: swap`:** el texto se ve enseguida con la fuente de respaldo y cambia cuando llega la fuente.
- **Precarga:** cada página pide las dos fuentes al principio del `<head>`, antes de que el navegador descubra que las necesita:

```html
<link rel="preload" href="https://recursos.tw.unp.edu.ar/fonts/AtkinsonHyperlegibleNext-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://recursos.tw.unp.edu.ar/fonts/Montserrat-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

- **Respaldo ajustado:** mientras carga, se usa Arial (o Liberation Sans en Linux, que mide igual) **agrandada o achicada para que ocupe lo mismo** que la fuente real (`size-adjust`, `ascent-override`, `descent-override`). Así, cuando llega la fuente, el texto no salta de lugar. Los valores se midieron sobre los archivos actuales y están en `unpsjb.css` (familias "Atkinson respaldo" y "Montserrat respaldo").

**Serif para documentos formales (nuevo en 0.3).** La interfaz no usa serif. La excepción son las vistas que reproducen un documento oficial (resolución, certificado, constancia) y sus PDF: el manual de 2008 pide Times New Roman para el texto corrido de esos documentos. Para eso está la clase `.fuente-academica` (`"Times New Roman", "Liberation Serif", Georgia, serif`), que se aplica al contenedor del documento, nunca a la interfaz que lo rodea. La hoja, el membrete, las firmas y el resto de un documento están en el módulo de documentos (sección 18).

### B. Escala

La escala es fija (no cambia con el ancho de pantalla) y con saltos claros, para que cada rol se reconozca sin leer el texto.

| Rol | Familia | Tamaño / peso / interlineado | Uso |
|---|---|---|---|
| `titulo-1` | Montserrat | 32px / 800 / 1.25, tracking −0.015em | Título de la pantalla (uno por pantalla). Es el único rol en peso 800. |
| `titulo-2` | Montserrat | 24px / 700 / 1.25, tracking −0.01em | Secciones principales. |
| `titulo-3` | Montserrat | 19px / 700 / 1.3 | Títulos de paneles, modales y avisos destacados. |
| `texto-grande` | Atkinson | 18px / 400 / 1.6 | Textos de lectura larga (instructivos, reglamentos). |
| `texto-base` | Atkinson | 16px / 400 / 1.55 | Texto general. **Mínimo para cuerpo.** |
| `label` | Atkinson | 15px / 700 / 1.35 | Labels de formularios, botones, encabezados de tabla. |
| `detalle` | Atkinson | 14px / 400 / 1.4 | Metadatos, ayudas bajo un input. |
| `nota` | Atkinson | 13px / 400 / 1.4 | Footer, notas al pie. **Nunca menos de 13px.** |

### C. Reglas de uso

- **Mayúscula solo inicial** en todo: títulos, botones, labels, pestañas. Nada de TEXTO EN MAYÚSCULAS ni etiquetas chiquitas en mayúsculas arriba de los títulos: el título se sostiene solo.
- **Ancho de lectura:** los párrafos no pasan de 70 caracteres por línea (`max-width: 70ch`).
- **Números en tablas:** cifras de ancho fijo (`font-variant-numeric: tabular-nums`) y alineadas a la derecha, para que se comparen en columna. (Verificado: los archivos actuales de las dos fuentes las traen.)
- **Títulos equilibrados:** `text-wrap: balance` en títulos, para que no quede una palabra sola en la última línea.
- **Más aire arriba que abajo:** un título tiene el doble de espacio arriba (con lo anterior) que abajo (con lo suyo).
- **Interlineado de títulos: 1.25 como mínimo (cambio en 0.3).** Montserrat es ancha y alta; en 700–800, las tildes de las mayúsculas (Á, É, Ó) tocaban la línea de arriba con 1.15. Si un título largo no entra en una línea, se acorta el texto antes que achicar la letra.

## 5. Espacio, forma y movimiento

### A. Espaciado

Escala de 4px: 4, 8, 12, 16, 24, 32, 48, 64px (`espacio-1` a `espacio-16`). Dentro de un grupo, poco espacio (8–12px); entre grupos, mucho (32–48px). Esa diferencia es la que arma la jerarquía, no los recuadros.

### B. Radios: de placa, no de app

| Token | Valor | Uso |
|---|---|---|
| `control` | 4px | Botones, inputs, insignias, pestañas. |
| `contenedor` | 8px | Paneles, tablas, avisos, modales, toasts. |
| `completo` | 9999px | Solo avatares. |

Se eliminan los 16px de la versión anterior: los radios grandes hacen que todo parezca una app de consumo. Radios chicos y parejos se leen institucionales y firmes, como una placa.

### C. Tamaños

- **Controles:** 44px de alto (botones, inputs, ítems de navegación). Es el mínimo cómodo para el dedo.
- **Densidad compacta (nuevo en 0.4):** las pantallas de trabajo con muchos datos (inventario, visor de cámaras, planillas) llevan `data-densidad="compacta"` en su contenedor, y todo lo que está adentro se compacta junto: controles de 36px, filas de tabla de 40px, menos aire entre campos. **La letra no se achica.** Solo tiene efecto desde 768px: en celular todo sigue en 44px. No va en páginas públicas ni en herramientas que se usan de vez en cuando.
- Las clases sueltas (`.boton--compacto`, `.tabla--compacta`, `.segmentado--compacto`) quedan para compactar **una** pieza dentro de una pantalla cómoda: el botón de un aviso, el selector de tema del pie. Para una pantalla entera va el atributo, así no queda un control sin compactar.
- **Banda del header:** 64px en escritorio (logo de 48px + 8px arriba y abajo); 56px en celular (escudo de 36px).
- **Sub-barra de secciones:** 48px (solo en escritorio y tablet; en celular las secciones van en el menú inferior).

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

### A. Header: la banda institucional y la sub-barra

El header tiene **dos niveles** (cambio en 0.3). La banda azul dice **quién es**; la sub-barra clara dice **por dónde se va**. En la 0.2 las pestañas iban sobre la banda: con 5 o más secciones, o en laptops de 1024 a 1280px, no entraban junto al logo, el nombre y las acciones, y el marcador naranja sobre el azul llevaba la mirada al header en lugar de a los datos. Es lo que hacen GOV.UK, USWDS y Poncho: marca arriba, navegación aparte.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Logo Sede Trelew] │ [ícono] Gestión de Eventos       [ayuda] [cuenta]│  ← banda #004992, 64px
├──────────────────────────────────────────────────────────────────────┤
│   Agenda    Inscripciones    Aulas                                    │  ← sub-barra panel, 48px
│   ▀▀▀▀▀▀                                                              │  ← marcador naranja "estás acá"
└──────────────────────────────────────────────────────────────────────┘
  fondo #f3f6fa
```

**La banda** (`.banda`):

1. **Logo de la Sede Trelew en su versión para banda** (`logo-unpsjb-trelew-blanco.svg`, 48px de alto): el óvalo a color, sin el texto curvo, con la barra y "Sede Trelew" en blanco. Ver sección 10.A.
2. **Separador:** línea vertical de 1px, blanco al 40%, con 24px de aire a cada lado. El logo ya trae su propia barra entre el óvalo y "Sede Trelew"; el aire extra evita que las dos barras se lean amontonadas y deja claro dónde termina la marca y empieza la herramienta.
3. **Identidad de la herramienta:** ícono Lucide en blanco + nombre en Montserrat 700, 18px, blanco.
4. **Acciones** a la derecha (ayuda, cuenta), como botones de ícono con nombre accesible. **Nada más**: ni pestañas, ni buscadores, ni botones de acción de la pantalla.

**La sub-barra** (`.secciones`, solo si la herramienta tiene secciones):

- Fondo `panel`, borde inferior `linea`, 48px de alto, alineada con el contenido (`.contenedor`).
- Cada sección es un link en `label`: inactivas en `tinta-2`; la actual en `tinta`, con un **marcador naranja de 4px** abajo y `aria-current="page"`. Sobre blanco, el naranja no llega a 3:1 (2.1:1): por eso **no es la única señal**; también cambian el color y la presencia del texto. Hover: `tinta`.
- Hasta **6 secciones**. Si una herramienta necesita más, o es un tablero donde conviene liberar el alto (visor de cámaras, inventario), las secciones pasan a un **menú lateral** (`.menu-lateral`, dentro de `.grilla--lateral`): lista vertical, la actual con fondo `tinte`, texto `tinta` 700 y el mismo marcador naranja de 4px a la izquierda.

La banda y la sub-barra quedan fijas arriba al hacer scroll (`.cabecera`), **sin transparencias ni desenfoque**. En modo oscuro la banda no cambia; la sub-barra toma los neutros oscuros.

**La cabecera fija no tapa el foco (cambio en 0.3.1).** Son 113px fijos en escritorio (56px en celular, más el menú inferior de 61px abajo). Dos reglas de `unpsjb.css` evitan que escondan lo que la persona está usando (WCAG 2.2, criterio 2.4.11):

- **Margen de salto:** al moverse con `Tab` o ir a un ancla, el navegador deja libre el alto de la cabecera más 16px (`scroll-padding-top`), y en celular también el del menú inferior (`scroll-padding-bottom`). Los valores salen de los tokens `--alto-banda`, `--alto-cabecera` y `--alto-menu-inferior`: si una herramienta cambia el alto de su cabecera, cambia esos tokens.
- **Con poco alto, la cabecera se suelta:** si la ventana mide 600px de alto o menos (zoom al 200%, celular acostado), la cabecera deja de ser fija y se va con el scroll. Ahí cada renglón de pantalla vale más que tener las secciones a mano.

En móvil, la banda muestra solo el escudo (`escudo-unpsjb-blanco.svg`, 36px) y el nombre de la herramienta en un renglón (se recorta con "…" si no entra); la sub-barra desaparece y las secciones pasan al menú inferior.

> **Migración desde la 0.2:** hay que mover los links que iban sobre la banda a `<nav class="secciones">` y envolver banda y sub-barra en `<header class="cabecera">`. La clase vieja de las pestañas sobre la banda (`.banda__nav`) se eliminó en la 0.3.2. Ver `CHANGELOG.md`.

### B. Menú inferior (móvil)

Por debajo de 768px, las secciones van en una barra inferior de hasta 5 ítems (ícono + texto), fondo `panel`, borde superior `linea`. **Con 6 secciones o más (cambio en 0.3.1):** van las 4 más usadas y un quinto ítem, **"Más"** (ícono `ellipsis`), que abre el resto en un panel que sale desde abajo (`.modal.modal--inferior`, con la lista como `.menu-lateral`). Si la sección actual está dentro de "Más", el botón lleva el marcador (`aria-current="true"`). Antes, la sub-barra admitía 6 secciones y el menú inferior 5: en celular se amontonaban. El ítem activo: texto e ícono en `primario`, peso 700 y una marca naranja de 4px arriba. Respeta la zona segura inferior de los celulares (`env(safe-area-inset-bottom)`).

### C. Footer

Una línea de texto `nota` en `tinta-2`, alineada a la izquierda con el contenido, separada por un borde superior `linea`:

`© 2026 UNPSJB - Soporte Informático, Delegación Trelew` a la izquierda y `v1.0.0` a la derecha. En móvil, uno debajo del otro.

A la derecha, antes de la versión, va el **selector de tema** (sección 3.F). En herramientas con IA, el footer incluye también el acceso a la clave personal (ver sección 11).

**"Reportar un problema" (nuevo en 0.4).** Todas las herramientas llevan en el pie un botón tranquilo "Reportar un problema" (ícono `message-square-warning`), siempre en el mismo lugar. Abre un formulario corto, de tres cosas:

1. **Qué querés contarnos:** "Algo no funciona", "Me cuesta usarlo o leerlo" o "Tengo una sugerencia".
2. **Qué pasó:** un cuadro de texto, con la ayuda "Contanos qué estabas haciendo y qué esperabas que pasara".
3. **Captura de pantalla**, opcional.

La herramienta suma sola lo que ya sabe (quién reporta, en qué pantalla, con qué navegador): no se le pide a la persona. Qué se hace con cada reporte está en la sección 14.F.

**El pie va al fondo (nuevo en 0.4.5).** En una pantalla con poco contenido, el pie baja hasta el borde de abajo de la ventana: no queda flotando a mitad de pantalla con un hueco debajo. Lo hace la hoja sola, sin clase ni script, para el `<footer class="pie">` que cierra `<main>`. En una página larga no cambia nada: el pie va después del contenido.

- **El pie no entra cortado.** Si al abrir la página el pie entra solo en parte, es mejor que no se vea: se le da alto al contenido para que el pie empiece justo debajo del borde de la ventana, y se llega bajando. Importa sobre todo con el pie de las páginas públicas, que es alto. Esto sí necesita un script chico (quince líneas, en `muestra-portal.html`): es una mejora y, si no está, la página funciona igual.
- En el celular, el borde de abajo es el del menú inferior.

**Pie de las páginas públicas (nuevo en 0.4).** Las páginas que ve gente de afuera de la universidad (sección 17) usan un pie más completo (`.pie.pie--publico`), con tres bloques arriba de la línea de derechos: quién es y dónde queda (la dirección, en `<address>`), cómo contactar, y los enlaces "Accesibilidad", "Privacidad y datos personales" y "Reportar un problema". No lleva número de versión ni clave de IA.

### D. Encabezado de pantalla

Debajo de la banda, cada pantalla abre con su título `titulo-1` alineado a la izquierda y, si corresponde, la acción principal a la derecha en la misma línea (ej.: "Crear evento"). Sin textos de relleno entre el título y el contenido.

### E. Contenedores y grilla

| Clase | Ancho | Cuándo |
|---|---|---|
| `.contenedor` | hasta 1280px | Casi todo. |
| `.contenedor--ancho` | toda la pantalla | Muros de cámaras, grillas de aulas, tableros. |
| `.contenedor--angosto` | hasta 560px de contenido | Login, portal del wifi, formularios de una columna. |

**Grilla** (`.grilla`): separa con 24px (`--compacta`: 12px). Hay dos formas:

- **Automática** (sin modificador): arma tantas columnas como entren de al menos `--grilla-min` (280px por defecto) y en celular deja una. Todas las celdas miden lo mismo aunque sobre lugar: es lo que se quiere en un muro de cámaras o una lista de aulas. Se ajusta en el HTML: `style="--grilla-min: 200px"`.
- **Columnas fijas** (`--2`, `--3`, `--4`): para formularios y resúmenes con una cantidad conocida de piezas.
- **Lateral** (`--lateral`): columna de 280px (filtros, lista de cámaras) + contenido, desde 1024px. Antes, apiladas.
- `.grilla__completa` hace que una pieza ocupe todo el ancho.

La grilla ordena contenido; no habilita a armar la página como una grilla de tarjetas iguales con ícono + título + texto (sigue prohibido, 7.C).

### F. Migas de pan

Solo en herramientas con más de dos niveles (Agenda → Evento → Inscriptos). Van arriba del título, en `detalle` y `tinta-2`, separadas por `/`; el último nivel no es link, va en `tinta` 700 y lleva `aria-current="page"`. Se ocultan al imprimir.

### G. Impresión

Toda herramienta se puede imprimir sin preparar nada: `unpsjb.css` trae las reglas.

- **Siempre en claro**, aunque la persona use modo oscuro.
- **La banda pasa a blanco**, con una línea `primario` de 2px debajo y el logo a color (`logo-unpsjb-trelew.svg`). No se gasta tinta en el bloque azul.
- **Se ocultan** la navegación, los botones, la paginación, las migas y los toasts. Lo que no tenga sentido en papel lleva `.no-imprimir`; lo que solo va en papel (por ejemplo, "Impreso el 30/09/2026"), `.solo-impresion`.
- **Tablas:** la cabecera se repite en cada hoja, las filas no se cortan y el texto puede ir en varios renglones.
- **Colores que informan** (categorías, placas de avisos, insignias) se imprimen aunque el navegador tenga desactivados los fondos.
- Los links a otros sitios muestran su dirección entre paréntesis.

### H. Banner de fase (nuevo en 0.4)

Una herramienta que todavía está en prueba lo dice. Debajo de la cabecera va una franja (`.fase`) con la palabra **"Piloto"**, una frase y un link para opinar: "Esta herramienta es nueva. Contanos qué mejorarías."

- Fondo `capa`, texto `detalle`; "Piloto" en un bloque chico `primario-texto` con texto `panel`. Con mayúscula inicial, no en mayúsculas.
- Va en un `<aside>` con nombre (`aria-label="Estado de la herramienta"`), fuera de la cabecera: no queda fijo al hacer scroll.
- Una sola palabra para todas: "Piloto". Se quita cuando la herramienta pasa las pruebas con personas (sección 9).
- El link lleva al mismo formulario de "Reportar un problema" (6.C).

## 7. Componentes

Todos los componentes definen estos estados: normal, hover, foco, presionado, deshabilitado, cargando y error (cuando aplica).

### A. Botones

| Variante | Aspecto | Cuándo |
|---|---|---|
| **Primario** | Relleno `primario`, texto blanco. Hover `primario-hover`. | La acción principal de la pantalla. **Uno solo por zona.** |
| **Secundario** | Fondo `panel`, borde 1px `primario`, texto `primario`. Hover fondo `tinte`. | Acciones alternativas (cancelar, exportar). |
| **Tranquilo** | Sin fondo ni borde, texto `primario`. Hover fondo `tinte`. | Acciones de baja jerarquía, barras de herramientas. |
| **Destructivo** | Relleno `error`, texto blanco. Hover `error-hover`. | Borrar, anular, dar de baja. **Nunca** azul. |

- Forma: 44px de alto, radio 4px, texto `label` (15px/700), padding horizontal 16px. Ícono Lucide de 18px a la izquierda si ayuda a reconocer la acción.
- **El texto dice lo que pasa:** "Guardar cambios", "Eliminar evento", "Inscribir". Nunca "Aceptar", "Enviar" u "OK".
- **Deshabilitado:** opacidad 45% y cursor `not-allowed`. Si no es obvio por qué está deshabilitado, se explica al lado.
- **Cargando:** el botón mantiene su ancho, muestra un indicador giratorio en lugar del ícono y cambia el texto ("Guardando…"). Se bloquea para evitar doble envío.
- Sin flechas `→` agregadas al texto.

### B. Campos de formulario

- **Label siempre visible arriba**, en `label` (15px/700, `tinta`). El placeholder solo muestra un ejemplo, nunca reemplaza al label.
- **Input:** 44px de alto, fondo `panel`, borde 1px `linea-control`, radio 4px, texto `texto-base`.
- **Ayuda** debajo en `detalle` (`tinta-2`), conectada con `aria-describedby`.
- **Obligatorios:** se marca lo opcional ("(opcional)" junto al label), no lo obligatorio. En trámites, casi todo es obligatorio.
- **Error:** borde `error` engrosado a 2px con una sombra interna (`inset`), para que el campo no cambie de tamaño, `aria-invalid="true"` y mensaje debajo con ícono `circle-alert`, en `error-texto`, que diga **qué pasó y cómo se arregla** ("Falta el dominio. Ejemplo: nombre@unp.edu.ar"). Se valida al salir del campo, no mientras se escribe.
- **Formularios largos:** si al enviar hay errores, se muestra arriba un aviso de error con la lista de campos (cada uno es un link al campo) y se mueve el foco a ese aviso.
- **Casillas y radios:** 20px, `accent-color` en `primario-texto` (`#004992` en claro, `#7ab3f0` en oscuro, para que la marca se vea sobre el fondo oscuro), label clickeable a la derecha. Varias opciones de una misma pregunta van en un `fieldset.grupo-campos` con su `legend` (ver 7.H).
- **Fecha y hora:** `.input` con `type="date"` o `type="time"`: el calendario y el reloj los pone el navegador (y en celular, el teclado del sistema). Cifras de ancho fijo. Para rangos, "Desde" y "Hasta" van uno al lado del otro en una grilla.

### C. Paneles (antes "tarjetas bento")

El contenedor por defecto **no es la tarjeta**. Primero se usan listas, tablas y secciones separadas por espacio. Un panel se usa cuando agrupa algo que se puede mirar o accionar como unidad.

- Fondo `panel`, borde 1px `linea`, radio 8px, padding 24px (16px en móvil).
- **Encabezado opcional:** título `titulo-3` y, a la derecha, una acción tranquila. Separado del cuerpo por un borde `linea`.
- **Prohibido:** paneles dentro de paneles; grillas de paneles iguales con ícono + título + texto como estructura de la página; bordes laterales de color.

### D. Tablas

Son la pieza más usada en gestión, así que se cuidan especialmente.

- Contenedor con borde `linea` y radio 8px.
- **Encabezado:** fondo `capa`, texto `label` en `tinta`, y una **línea inferior de 2px en `primario`** que lo separa de los datos. (Antes era un relleno azul completo: se cambia para que la banda del header sea el único bloque azul de la pantalla y la tabla no compita con ella.)
- Filas de 48px (compacta: 40px), separadas por borde `linea`. Hover: fondo `fondo`. Seleccionada: fondo `tinte` y su casilla marcada.
- Números alineados a la derecha, con cifras de ancho fijo. Fechas en formato `dd/mm/aaaa`.
- Columnas ordenables: la flecha de orden aparece siempre en la columna activa, con `aria-sort`.
- **En celular, cada tabla elige una de dos formas (nuevo en 0.3):**

| Si la tarea es… | Forma | Clase | Ejemplos |
|---|---|---|---|
| **Comparar celdas** entre filas y columnas | Scroll horizontal con la **primera columna fija** | `.tabla--fija` | Notas por alumno, asistencia por día, puertos de un switch, planillas de presupuesto |
| **Mirar cada fila como una cosa** | **Tarjetas apiladas**: cada fila pasa a ser un bloque, y los encabezados se vuelven etiquetas dentro de él | `.tabla--tarjetas` | Eventos, solicitudes de soporte, equipos del inventario |

  - En `.tabla--tarjetas`, cada celda lleva `data-columna` con el nombre de su columna (`<td data-columna="Fecha">`). La primera celda es el título de la tarjeta. Por encima de 640px se ve como una tabla común.
  - Las tarjetas usan el mismo borde `linea` y radio 8px de los paneles; no llevan franjas de color.
  - **Ancho de la columna fija (cambio en 0.3.1):** en celular no pasa de **140px** ni del 40% de la pantalla (`--tabla-fija-max`); un texto más largo sigue en otro renglón. Antes no tenía tope y un nombre largo se llevaba toda la pantalla. La columna queda del ancho de su palabra más larga; con nombres largos se le pide un mínimo (`style="--tabla-fija-min: 140px"`).
  - Si lo que identifica a la fila es **siempre un texto largo** (título de un evento, asunto de una solicitud), no va columna fija: van tarjetas.
  - **Una tabla con scroll se tiene que poder recorrer con teclado.** En una pantalla angosta cualquier tabla puede tener scroll horizontal, así que el marco de **toda** tabla lleva `tabindex="0"`, `role="region"` y un nombre: `<div class="tabla-marco" tabindex="0" role="region" aria-label="Notas por estudiante">`. Así se llega con `Tab` y se mueve con las flechas. La única excepción son las tablas en tarjetas, que en celular no tienen scroll. (En la 0.3.1 la regla era solo para `.tabla--fija`; se amplió en la 0.4.)
- Tabla sin resultados: una fila que ocupa todo el ancho con el estado vacío (ver sección 8).
- **Si es un solo registro, no es una tabla:** va una lista de resumen (7.L).

### E. Insignias de estado

Texto `detalle` en peso 700, ícono de 14px, fondo con el color del estado al 12% (6% en advertencia, para que el texto ámbar mantenga 4.6:1) y texto en el color de texto del estado. Radio 4px. Siempre ícono + palabra: Confirmado (`circle-check`), Sin aula (`triangle-alert`), Suspendido (`circle-x`).

### F. Pestañas dentro de la página

Para subdividir un panel o una pantalla (no la navegación principal, que va en la sub-barra): texto `label` en `tinta-2`; la activa en `primario` con marcador de 3px `primario` debajo. El naranja queda reservado para la navegación principal y el foco.

### G. Carga

- **Contenido que tarda:** esqueletos (bloques grises `capa` con la forma del contenido), no un indicador giratorio en el medio de la pantalla.
- **Acciones:** el indicador va en el botón que las disparó (ver 7.A).

### H. Opciones e interruptor

- **Grupo de opciones** (`fieldset.grupo-campos` + `legend`): radios o casillas que responden una misma pregunta. En columna por defecto; `--fila` los pone en renglón si son 2 a 4 y cortos.
- **Interruptor** (`label.interruptor` + `input type="checkbox" role="switch"`): para algo que **se aplica en el momento**, sin botón "Guardar" (activar la grabación de una cámara, avisar por correo). Si el cambio se guarda después con un botón, va una casilla. Mide 44×24px, con radio de 4px como el resto de los controles (nada de píldoras). Apagado: `linea-control`; encendido: `primario-texto`.

### I. Segmentado y buscador

- **Segmentado** (`fieldset.segmentado`): elegir una vista entre 2 a 4 (Día | Semana | Mes; 1 | 4 | 9 cámaras). Son radios, así que se maneja con las flechas del teclado y funciona sin JavaScript. La opción elegida: relleno `primario-texto` y texto `panel`. No reemplaza a las pestañas: el segmentado cambia **cómo se ve** lo mismo; las pestañas cambian **qué** se ve.
- **Buscador** (`.buscador`): `.input type="search"` con la lupa adentro, a la izquierda. Lleva `aria-label` si no tiene label visible. Filtra mientras se escribe si los datos ya están cargados; si hay que ir al servidor, al apretar Enter.

### J. Paginación

Debajo de las tablas largas: "Anterior", números de página, "Siguiente" y a la derecha un resumen ("Eventos 21 a 40 de 230"). La página actual va en `tinta` con marcador `primario-texto` de 3px debajo, como las pestañas (el naranja queda para la navegación principal), y lleva `aria-current="page"`. En celular quedan solo "Anterior" y "Siguiente", con el resumen abajo. Si la tabla tiene menos de 50 filas, conviene no paginar.

### K. Combobox con autocompletado (nuevo en 0.4)

Para elegir entre **muchas** opciones escribiendo: un aula entre cien, un equipo del inventario, una persona.

- **Cuándo:** reemplaza al `select` cuando hay más de 15 o 20 opciones. Con menos, va un `select` o radios.
- **Primero, el del navegador.** `<input class="input" list="…">` con un `<datalist>` filtra mientras se escribe, no necesita JavaScript y es accesible. Alcanza para la mayoría de los casos.
- **El propio** (`.combo`), cuando hace falta controlar cómo se ve la lista o cargar opciones desde el servidor:
  - La lista aparece debajo del campo, con sombra de elemento flotante. Cada opción mide 40px. La parte que coincide con lo escrito va en negrita.
  - La opción marcada con el teclado lleva fondo `tinte` y una marca `primario-texto` a la izquierda (no naranja: no es "estás acá").
  - Si nada coincide, lo dice: "Ninguna opción coincide". Lo escrito no se borra.
- **Accesibilidad:** `role="combobox"` en el campo, con `aria-expanded`, `aria-controls` y `aria-activedescendant`; `role="listbox"` y `role="option"` en la lista. Flechas para moverse, `Enter` para elegir, `Esc` para cerrar. La cantidad de resultados ("3 opciones") se anuncia cuando la persona deja de escribir. Hay un script de referencia en `muestra.html`.

### L. Lista de resumen (nuevo en 0.4)

La ficha de **una** cosa: un aula, un equipo, una solicitud. Pares de nombre y dato (`dl.resumen`), en dos columnas en escritorio y apilados en celular, separados por una línea `linea`.

- Reemplaza a la tabla de una sola fila y a los campos deshabilitados usados para mostrar datos.
- Puede llevar una tercera columna con una acción ("Cambiar"). El link dice qué cambia, aunque sea con texto solo para el lector de pantalla: `Cambiar<span class="solo-lector"> responsable</span>`.
- Es una lista de descripción real: `<dl>`, `<dt>`, `<dd>`.
- "Revisá tus respuestas" (8.F) es este mismo patrón, agrupado por paso.

### M. Acordeón (nuevo en 0.4)

Esconde lo **secundario**: preguntas frecuentes, historiales, opciones avanzadas.

- Es la etiqueta nativa `<details class="acordeon">` con su `<summary>`: se abre con `Enter` o `Espacio`, sin JavaScript, y el buscador del navegador encuentra lo que hay adentro.
- El título va en `label` y `primario-texto`, con una flecha que gira al abrir. Cada uno se abre por separado: abrir uno no cierra los demás.
- **Nunca** esconde campos obligatorios ni información que todos necesitan. Si la persona tiene que leer todo, va a la vista, con títulos.
- Con una o dos secciones cortas no hace falta.

### N. Contador de caracteres (nuevo en 0.4)

Para un cuadro de texto con un límite real (una descripción que se publica).

- Va debajo del campo, en `detalle`: "Quedan 120 caracteres".
- **Si se pasa, deja seguir escribiendo** y avisa: el contador pasa a `error-texto` en negrita ("Te pasaste por 10 caracteres") y el campo se marca con error. Cortar el texto al llegar al límite hace perder lo que se pegó.
- Accesibilidad: el contador está unido al campo con `aria-describedby`. El lector de pantalla recibe el aviso un segundo después de la última tecla, no en cada una.

### O. Etiquetas (nuevo en 0.4)

Clasifican un registro con palabras fijas: tipo de aula, equipamiento, tipo de cámara. **No se tocan.**

- Texto `detalle` en `tinta`, borde 1px `linea-control`, sin fondo y sin ícono (`.etiqueta`). Varias van en una lista (`ul.etiquetas`).
- Tres piezas que se parecen y no son lo mismo:

| Pieza | Qué dice | Cómo se reconoce |
|---|---|---|
| **Insignia** | Cómo está algo (un estado) | Ícono + palabra en negrita, fondo de color |
| **Etiqueta** | Qué es o qué tiene | Palabra sola, con borde |
| **Chip** | Un filtro aplicado, que se puede quitar | Palabra + ✕ |

- Si la clasificación necesita color, va una categoría (3.H).

### P. Lo que no se agrega (nuevo en 0.4)

Para no volver a discutirlo cada vez:

| No va | Por qué | Qué va en su lugar |
|---|---|---|
| Banner de cookies | Las herramientas internas solo usan cookies de sesión. Si alguna vez se suma analítica de terceros, se revisa. | Nada |
| Selector de fecha propio | El del navegador es más accesible, más liviano y no hay que mantenerlo. | `input type="date"` |
| Línea de tiempo de un trámite | Ya lo cubren otras piezas. | Indicador de pasos y lista de resumen. (El historial de mensajes de una solicitud es otra cosa: sección 19) |
| Centro de notificaciones | Necesita servidor y base de datos: no es un tema de la hoja de estilos. | Avisos y toasts |
| Tooltip | En celular no existe "pasar el mouse", y tapa contenido. | Texto de ayuda fijo debajo del campo. En los gráficos, la lectura fija de arriba (15.E) |
| Torta con más de 3 partes, gráficos 3D, dos ejes | Se leen mal (sección 15). | Barras, o una tabla |
| Carrusel de fotos o de noticias | Pesa mucho y lo que importa queda en una de varias vueltas que casi nadie espera. | Una sola noticia destacada y, debajo, una lista |
| Ventana que se abre sola al entrar | Tapa todo en el celular y atrapa el foco antes de que la persona haya visto la página. | Un aviso (8.A) arriba del contenido |
| Asistente de chat flotante | Es otro elemento fijo que tapa contenido en el celular. | Un enlace a la mesa de ayuda (sección 19) |

Las últimas tres filas son nuevas (0.4.5) y salen del estudio de referencia.

### Q. Lista de accesos (nuevo en 0.4.5)

**A dónde se puede ir desde acá** (`ul.accesos`). Cada renglón es un destino: el nombre, una línea que dice para qué sirve y, a la derecha, una flecha o un botón. Es lo que va donde otros sitios ponen una grilla de tarjetas con ícono, título y texto (prohibida en 7.C): la misma información, en menos lugar y fácil de recorrer con la vista.

Sirve para tres cosas:

| Uso | Cómo va |
|---|---|
| **Accesos** de una página de inicio (17.D) | El nombre es el enlace (`a.accesos__nombre`) y a la derecha va una flecha (`chevron-right`). Se puede tocar todo el renglón. |
| **Lista de trámites** | El nombre es texto (`h3.accesos__nombre`) y a la derecha va **un solo botón**, `.boton--secundario`: "Iniciar trámite". En dos grupos con su título: los más pedidos primero y "Otros trámites" después. |
| **Listado de herramientas** | Con `.accesos--columnas` (dos o tres columnas si entran). Arriba, un buscador (7.I) que **filtra mientras se escribe** y un texto que dice cuántas hay ("12 herramientas"; al filtrar, "3 de 12"). |

- **Una línea de descripción,** que diga para qué sirve con palabras de quien lo usa ("Reservá y pagá el menú del día"), no el nombre de la oficina.
- **Si el enlace sale del sitio,** en lugar de la flecha va el ícono `external-link`, y el nombre lo dice para el lector de pantalla: `Guaraní<span class="solo-lector"> (abre otro sitio)</span>`.
- **El botón dice qué inicia:** `Iniciar trámite<span class="solo-lector">: comedor</span>`. Si no, un lector de pantalla lee cinco veces "Iniciar trámite".
- **Sin logo ni color por renglón.** Cuando cada trámite trae su logo, la página parece un collage. Si hace falta decir de qué área es, va una categoría (3.H) al lado del nombre.
- **Sin resultados** al filtrar: el estado vacío (8.D), con el botón "Borrar búsqueda".
- **No reemplaza** al menú de la herramienta (6.A) ni a una tabla: si de cada cosa hay que comparar varios datos, es una tabla (7.D).

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

- **Bloque del ícono:** 44px de ancho, alto completo, relleno del color del estado. Ícono Lucide de 20px en **blanco** en los cuatro estados (desde la 0.3, la advertencia es ámbar `#b45309`: blanco sobre ámbar da 5.0:1).
- **Mensaje:** título en `texto-base` peso 700 y `tinta` (no en color: el color ya está en la placa), descripción en `texto-base`. Una acción opcional, como botón tranquilo.
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
- Título en `titulo-3` que es una **pregunta concreta** ("¿Eliminar el evento Jornada de Informática?"). El texto explica la consecuencia ("Se borran también las 84 inscripciones. No se puede deshacer.").
- Botones abajo a la derecha: secundario "Cancelar" y la acción con su nombre real ("Eliminar evento"), destructiva si corresponde. El foco inicial va al botón **Cancelar** en acciones destructivas.

**Panel lateral (nuevo en 0.4).** Para filtros avanzados que no entran arriba de la tabla, o para ver el detalle de una fila sin perder la lista. Es el mismo `<dialog>`, con la variante `.modal--lateral`: ocupa todo el alto, pegado al borde derecho, de 420px como máximo (todo el ancho en celular). Arriba, el título y un botón de cerrar con `aria-label`. Como todo modal, atrapa el foco, se cierra con `Esc` y devuelve el foco al botón que lo abrió. No es para la navegación principal ni para algo que merece su propia página.

### D. Estados vacíos

Un estado vacío **enseña qué va a haber ahí y cómo empezar**.

- Alineado a la izquierda dentro del área de contenido, con un ícono Lucide de 32px en `tinta-2`, un título `titulo-3`, una frase y la acción primaria.
- Ejemplo: **"Todavía no hay eventos"** / "Los eventos que crees aparecen acá y en la agenda pública." / [Crear evento].
- Si está vacío por un filtro: "Ningún evento coincide con 'Madryn'" y un botón tranquilo "Quitar filtros".

### E. Sesión por vencer (nuevo en 0.3)

El ingreso se hace con el **ingreso único de la universidad** (SIU-Araí: Usuarios) siempre que se pueda; las herramientas no piden usuario y contraseña propios.

Cuando la sesión está por vencer, un aviso **dos minutos antes** evita que se pierda un formulario a medio cargar:

- Modal (`<dialog>`) con título "Tu sesión está por cerrarse", la cuenta regresiva ("Se cierra en 1:45") y dos botones: **"Seguir conectado"** (primario, con el foco inicial) y "Cerrar sesión".
- La cuenta regresiva se muestra, pero el lector de pantalla **no** la lee cada segundo: se anuncia una sola vez al abrir y otra al quedar 30 segundos.
- Si la sesión se cierra igual, al volver se muestra el ingreso y, después, **la misma pantalla con los datos que se habían cargado** si la herramienta puede guardarlos.

### F. Formularios de varios pasos (nuevo en 0.3)

Para trámites largos (solicitudes, reservas con muchos datos). Si entra en una pantalla, no se parte.

- **Indicador de pasos** (`.pasos`) arriba del formulario: el texto "Paso 2 de 4: Aula y horario" siempre visible, y debajo una barra de segmentos (hechos en `primario-texto`, el actual con el marcador naranja y su nombre en 700, los que faltan en `linea`). En celular queda solo el texto.
- Un botón "Continuar" por paso, y "Volver" como secundario. Lo cargado se conserva al ir y volver.
- **No se pide dos veces el mismo dato (nuevo en 0.3.1; WCAG 2.2, criterio 3.3.7):**
  - Lo que ya trae el ingreso único (nombre, legajo, correo) **se muestra, no se pide**: una lista de datos con la aclaración "Son los datos de tu cuenta de la universidad" y cómo avisar si hay un error.
  - Si un dato de la cuenta puede cambiar para este trámite (por ejemplo, el correo para los avisos), el campo viene **cargado** y la ayuda lo dice.
  - Lo que se cargó en un paso se ofrece en los siguientes: una casilla ("Quien retira es la misma persona que solicita") o el valor ya puesto. Nunca un campo vacío para repetirlo.
  - Los campos llevan `autocomplete` (`name`, `email`, `tel`), para que el navegador complete lo que ya sabe.
- **Antes de enviar, "Revisá tus respuestas"** (`.revision`): la lista de todo lo cargado, agrupado por paso, con un link **"Cambiar"** en cada grupo que lleva a ese paso y vuelve a la revisión. El botón final dice lo que hace ("Enviar solicitud").

### G. Confirmación final (nuevo en 0.3)

Después de un trámite que genera algo (una solicitud, una inscripción, una reserva):

- **Comprobante** (`.comprobante`): panel con el ícono `circle-check` en `exito`, título que dice qué pasó ("Solicitud enviada"), y el **número de trámite** grande, en cifras tabulares, fácil de copiar.
- Qué pasa ahora ("Soporte Informático la revisa en 48 horas hábiles; te avisamos por correo").
- Acciones: "Descargar comprobante (PDF)" e "Imprimir". El comprobante sale bien en papel sin preparar nada (sección 6.G).

### H. Páginas de error (nuevo en 0.3)

Nunca una página en blanco ni el mensaje técnico del servidor.

- Mantienen la banda y el pie: la persona sigue sabiendo dónde está.
- Estructura (`.pagina-error`): código en `detalle` (`Error 404`), título `titulo-1` en lenguaje claro, una frase que explica y **una salida**.

| Caso | Título | Salida |
|---|---|---|
| 404 | "No encontramos esta página" | "Ir al inicio" y el buscador si la herramienta lo tiene |
| 403 | "No tenés permiso para ver esta página" | "Volver" y "Pedir acceso a Soporte Informático" |
| 500 | "La herramienta tuvo un problema" | "Probar de nuevo" y el contacto de Soporte, con la hora del error para informar |

### I. Filtros de tablas (nuevo en 0.3)

- **Arriba de la tabla**, en una fila (`.filtros`): el buscador y los filtros más usados (selects). Los demás, detrás de un botón "Más filtros".
- **Filtros aplicados como chips** (`.chip`) debajo de la fila: "Sede: Trelew ✕". Cada chip se quita solo; al final, "Quitar filtros" (botón tranquilo) si hay más de uno.
- Un resumen con el total: "12 eventos" (`role="status"`, para que se anuncie al filtrar).
- En celular, los filtros van en un panel que se abre con "Filtros (2)".

### J. Carga de archivos (nuevo en 0.3)

- `label` visible y, **antes de elegir**, la ayuda con formatos y peso máximo: "PDF o JPG, hasta 10 MB".
- Un **botón** "Elegir archivo" (`input type="file"` estilizado con `.archivo`). Arrastrar y soltar puede sumarse, nunca reemplazar al botón.
- La lista de archivos (`.archivos`) muestra nombre, peso y una acción "Quitar" por archivo. Mientras sube: barra de progreso (`<progress>`) con el porcentaje en texto.
- Los errores dicen qué pasó y qué hacer: "programa.docx no es PDF ni JPG. Exportalo como PDF y probá de nuevo."

## 9. Accesibilidad

- **Contraste de texto:** mínimo 4.5:1 (3:1 para texto de 24px o más). Todas las combinaciones de la sección 3 están verificadas.
- **Contraste de controles:** bordes de inputs, casillas y marcadores de estado, mínimo 3:1 (WCAG 1.4.11).
- **Foco visible siempre, con doble anillo** (solo al navegar con teclado, `:focus-visible`):
  - Sobre fondos claros: 2px naranja por dentro y 2px `primario` por fuera. El naranja solo da 2.1:1 contra blanco; el anillo azul le da contraste (8.9:1) y el naranja contrasta contra el azul (4.1:1).
  - Sobre la banda azul y en modo oscuro: alcanza con el anillo naranja (4.1:1 sobre la banda, 7.5:1 sobre `oscuro-panel`).
- **Enlace para saltar al contenido** ("Ir al contenido") como primer elemento de la página, visible al recibir foco.
- **Navegación con teclado:** todo lo que se hace con el mouse se hace con el teclado, en un orden lógico.
- **Objetivos táctiles:** 44×44px como mínimo, con al menos 8px entre uno y otro.
- **El color no es el único mensaje:** los estados llevan ícono y texto.
- **Imágenes:** todas con `alt`; las decorativas, con `alt=""`. Los íconos que acompañan texto llevan `aria-hidden="true"`; los botones de solo ícono llevan `aria-label`.
- **Zoom:** la interfaz funciona al 200% de zoom sin perder contenido ni necesitar scroll horizontal (salvo tablas).
- **El foco nunca queda tapado** por la cabecera fija ni por el menú inferior (ver 6.A).
- **La ayuda, siempre en el mismo lugar:** el botón "Ayuda" va en la banda, a la derecha, en todas las herramientas.
- **No se pide dos veces el mismo dato** dentro de un trámite (ver 8.F).

**WCAG 2.2 (desde la 0.3.1).** Los seis criterios que suma la 2.2 en los niveles A y AA, y cómo los cubre el sistema:

| Criterio | Cómo se cubre |
|---|---|
| 2.4.11 Foco no tapado | Margen de salto y cabecera que se suelta con poco alto (6.A). |
| 2.5.7 Movimientos de arrastre | Todo lo que se arrastra tiene alternativa con un clic: la carga de archivos tiene botón (8.J). |
| 2.5.8 Tamaño del objetivo | Pide 24×24px; los controles miden 44px (36px en la variante compacta). |
| 3.2.6 Ayuda consistente | "Ayuda" siempre en la banda. |
| 3.3.7 Entrada redundante | Datos de la cuenta precargados y nada se pide dos veces (8.F). |
| 3.3.8 Autenticación accesible | Ingreso único de la universidad; los campos de ingreso permiten el gestor de contraseñas. |

El sistema da las piezas; que una herramienta cumpla se comprueba con la lista de abajo.
- **Detalles del navegador:** selección de texto en `tinte` con texto `tinta`, cursor de escritura (`caret-color`) en `primario`, casillas con `accent-color` en `primario-texto`, subrayado de links separado 2px del texto.

### Antes de publicar una herramienta (nuevo en 0.3)

Una lista corta que se recorre en cada versión nueva. Se anota el resultado en la bitácora de la herramienta.

1. **Automática:** la extensión **axe DevTools** (o **WAVE**) no marca errores críticos ni serios, y Lighthouse da 90 o más en Accesibilidad. No alcanza por sí sola: encuentra alrededor de un tercio de los problemas.
2. **Solo teclado:** recorrer todo con `Tab` y `Shift+Tab`. Se llega a todo, en orden lógico, sin quedar atrapado; el foco se ve siempre y **nunca queda debajo de la cabecera ni del menú inferior** (probarlo también hacia atrás, que es cuando la cabecera tapa). `Enter` y `Espacio` activan; `Esc` cierra modales y menús; las flechas se mueven dentro de pestañas, segmentados y radios.
3. **Zoom y ancho:** al 200% y con la ventana en 320px de ancho no aparece scroll horizontal en la página (las tablas pueden tenerlo adentro).
4. **Contraste:** los colores nuevos que no estén en este documento se miden (4.5:1 texto, 3:1 controles), en claro **y** en oscuro.
5. **Lector de pantalla:** el recorrido principal con **Orca** (Linux), **NVDA** (Windows) o VoiceOver (macOS/iOS). Los botones dicen qué hacen, los errores y toasts se anuncian solos y los íconos decorativos no se leen.
6. **Celular real:** un recorrido en un teléfono, con los campos de 16px (sin zoom automático) y el menú inferior sin tapar contenido.
7. **Lo básico de la página (nuevo en 0.4.5):** tres cosas que se rompen sin que nadie lo note y que aparecieron en sitios grandes en el estudio de referencia.
   - `<html lang="es">`. Con otro idioma declarado, el lector de pantalla pronuncia todo mal.
   - El `viewport` es `width=device-width, initial-scale=1`, **sin** `maximum-scale` ni `user-scalable=no`: bloquean el zoom con los dedos.
   - Al entrar no se abre ninguna ventana encima del contenido (7.P).

### Pruebas con personas (nuevo en 0.4)

Las herramientas automáticas y las listas no reemplazan ver a alguien usarlo. Con cinco personas aparece la mayoría de los problemas.

- **A quién:** 5 o 6 personas por ronda: 2 estudiantes, 2 nodocentes, 1 docente. Al menos una con baja visión, daltonismo o movilidad reducida, o que use lector de pantalla.
- **Cómo:** 30 minutos por persona, de a una. Se le da una tarea real ("Reservá el aula 102 para el viernes a las 14") y se le pide que piense en voz alta. Quien observa no ayuda ni explica.
- **Qué se anota,** por tarea:
  1. ¿La terminó sin ayuda? (sí o no)
  2. ¿Dónde dudó o se equivocó?
  3. "Del 1 al 7, ¿qué tan fácil te resultó?"
- **Cuándo:** una ronda por cuatrimestre, y antes de publicar una herramienta nueva o un cambio grande. Una herramienta deja de ser "Piloto" (6.H) cuando pasa su primera ronda.
- **Qué se hace con eso:** lo que traba a dos o más personas se corrige antes de publicar. El resto va a la bitácora de la herramienta.

## 10. Assets e íconos

### A. Logotipo institucional (fuente única)

El logo de la UNPSJB Sede Trelew se aloja en el servidor de recursos de la Delegación (en Proxmox), por ejemplo `https://recursos.tw.unp.edu.ar/assets/`. Todas las versiones se generan con `herramientas/logo/generar.sh` a partir del original de Illustrator (`logo unpsjb_SEDE TW.eps`).

**En pantalla, la gaviota es plana y vectorial:** óvalo azul, gaviota blanca, puntas de las alas `#4e4d49` y pico `#eab645`, sin el detalle de las plumas. Se ve nítida a cualquier tamaño (incluso como ícono de 16px, donde la foto era una mancha gris) y pesa diez veces menos.

**En pantalla va sin el texto curvo** ("Universidad Nacional de la Patagonia San Juan Bosco"): a 48px no se lee y queda como un borde borroso. Sin él, la barra y "Sede Trelew" se acercan al óvalo (el mismo aire a los dos lados de la barra) y la barra queda centrada con el óvalo. El nombre completo sigue en el `<title>` del SVG y en la versión completa para usos grandes.

| Archivo | Uso | Peso (comprimido) |
|---|---|---|
| `logo-unpsjb-trelew-blanco.svg` | **Banda azul** de todas las herramientas. Gaviota plana; barra y "Sede Trelew" en blanco. Proporción 2,11:1 (101×48px). | ~3KB |
| `escudo-unpsjb-blanco.svg` | Banda en **celular**: solo el óvalo con la gaviota plana (29×36px). | ~1KB |
| `logo-unpsjb-trelew.svg` | **Fondos claros**, documentos impresos o exportados; también el que usa `unpsjb.css` al imprimir. Gaviota plana; barra y "Sede Trelew" en gris `#3b3a36`. | ~3KB |
| `logo-unpsjb-trelew-completo.svg` | **Usos grandes** (carteles, portadas, pantallas de bienvenida): el original sin cambios, con la foto de la gaviota y el texto curvo. | ~56KB |
| `logo-unpsjb-trelew-una-tinta.svg` | **Impresión a una tinta** (nuevo en 0.4.3): óvalo, barra y "Sede Trelew" en negro; la gaviota entera en blanco, sin gris ni amarillo. Lo usa la hoja `.hoja--una-tinta` (sección 18). | ~3KB |

- **Los colores del óvalo no se modifican:** el azul (`#347EBB`), el gris de las puntas y el amarillo del pico se tomaron de la foto original. Son parte de la marca, no colores de interfaz: no se usan en botones ni textos.
- **De dónde sale la gaviota plana:** en el EPS la gaviota es una foto (JPEG en CMYK). `herramientas/logo/vectorizar.sh` la separa por color, borra el detalle y la vectoriza; el resultado queda guardado en `herramientas/logo/gaviota-plana.svg`. Solo hay que volver a correrlo si cambia el EPS (instala sus librerías de Python en `~/.cache/unpsjb-logo/`). `herramientas/logo/generar.sh` usa esa gaviota guardada y no necesita nada extra. **No se edita a mano:** si hay que afinar la forma, se ajusta `herramientas/logo/vectorizar.py` o se reemplaza por un dibujo hecho por un diseñador.
- Todos los SVG llevan `<title>` ("Universidad Nacional de la Patagonia San Juan Bosco, Sede Trelew"); en el HTML se usan con `alt="UNPSJB Sede Trelew"`.

**Tres tamaños, tres versiones (nuevo en 0.3).** Un mismo dibujo no funciona igual a 200px que a 16px:

| Nivel | Tamaño de uso | Archivo | Qué muestra |
|---|---|---|---|
| **L** · completo | 96px de alto o más | `logo-unpsjb-trelew-completo.svg` | El original: gaviota con detalle y texto curvo. Carteles, portadas, pantallas de bienvenida. |
| **M** · para pantalla | 32 a 95px | `logo-unpsjb-trelew-blanco.svg`, `logo-unpsjb-trelew.svg`, `escudo-unpsjb-blanco.svg` | Gaviota plana, sin el texto curvo. Banda, documentos, celular. |
| **S** · ícono | menos de 32px | `favicon-unpsjb.svg` | Solo la silueta blanca de la gaviota sobre un cuadrado `#004992`. Pestaña del navegador y marcadores. |

- **Tamaño mínimo:** el nivel M no se usa por debajo de 32px de alto (el óvalo se vuelve una mancha); por debajo va el S.
- **Área de resguardo:** alrededor del logo queda libre un margen igual a **la mitad del ancho del óvalo**. Ahí no entran textos, íconos ni bordes. En la banda, ese aire es el que ya dan los 8px de arriba y abajo y los 24px hasta el separador.
- **A una tinta:** para impresión en negro o sellos, el óvalo y los textos en un solo color y la gaviota entera en blanco, sin gris ni amarillo. Lo genera `herramientas/logo/generar.sh` desde la 0.4.3 (`logo-unpsjb-trelew-una-tinta.svg`, en negro). Como las demás versiones del logo, falta que lo confirme quien maneja la marca.
- **Favicon:** `<link rel="icon" href="https://recursos.tw.unp.edu.ar/assets/favicon-unpsjb.svg" type="image/svg+xml">`. Es el mismo para todas las herramientas: lo que distingue a cada herramienta es su ícono de instalación (10.B).
- **Qué ave es:** DESIGN.md la llama **gaviota**, como en el manual de marca. Algunas fuentes externas la describen como albatros; se mantiene "gaviota" hasta que lo confirme el responsable de la marca.

La URL debe ser **HTTPS**: si una página segura carga un recurso por HTTP, el navegador lo bloquea.

### B. Íconos de aplicación (PWA)

El ícono de instalación (en `manifest.json`) **no** es el escudo solo: con varias herramientas instaladas, serían todas iguales en la barra de tareas. Cada herramienta tiene uno propio, armado siempre igual:

- **Contenedor común:** cuadrado `#004992` que ocupa todo el ícono. Cada sistema operativo le aplica su propia máscara (círculo, cuadrado redondeado), así que el ícono se entrega cuadrado y como `"purpose": "maskable"`.
- **El ícono Lucide de la herramienta en blanco**, centrado y dentro del 60% central (la zona segura de los íconos maskable).
- **Un marcador naranja** de 8% de alto en el borde inferior (el mismo "estás acá" de la banda).
- Sin escudo, sin marca de agua y sin texto: a 48px no se leen.
- Tamaños: 192 y 512px en PNG, más el SVG.

### C. Íconos de interfaz

- **Librería Lucide** en todas las herramientas: trazo de 2px, tamaños 16, 18, 20 y 32px. Se incluyen como SVG en línea o desde un archivo de íconos del servidor de recursos, solo los que se usan.
- **Nada de emojis como íconos.** Los emojis se ven distinto en cada sistema operativo y no tienen el mismo trazo que el resto de la interfaz. En el header, en los botones y en los estados va siempre un ícono Lucide.
- Los emojis solo aparecen si los escribe una persona (comentarios, descripciones de eventos, títulos que carga el usuario).

### D. Emojis: Twemoji en todas las herramientas

Los emojis que escriben las personas se ven igual en Windows, Linux, macOS, Android e iOS, con los dibujos de **Twemoji** (los de Twitter), **también mientras se escriben** en un campo de texto.

- **Paquete:** `jdecked/twemoji`, el fork que mantiene la comunidad y se actualiza con cada versión nueva de Emoji de Unicode. El original de Twitter está abandonado.
- **Cómo funciona:** los SVG de Twemoji se convierten en una **fuente de color** (`fonts/TwemojiUNPSJB.woff2`, formato COLRv0, que funciona en Chrome, Edge, Firefox y Safari). `unpsjb.css` la declara después de las fuentes de texto, así que cualquier emoji de la página, en textos, `input` o `textarea`, se dibuja con Twemoji sin una línea de JavaScript.
- **Liviano:** la fuente se declara con `unicode-range`, así que el navegador solo la descarga en páginas que tienen emojis.
- **Actualización:** cuando salga una versión nueva de `jdecked/twemoji`, se corre `herramientas/emoji/construir.sh <versión Twemoji> <versión Unicode>` y se reemplaza el archivo de la fuente en el servidor de recursos.
- **Desactivar en una herramienta:** si una herramienta necesita los emojis del sistema, redefine `--fuente-texto` y `--fuente-titulo` sin `"Twemoji UNPSJB"`.

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
const UNPSJB_URL_PROXY_IA = "https://recursos.tw.unp.edu.ar/ia/";
```

### B. Cómo se ve la IA

La IA se distingue por **un ícono y un lugar propio**, no por efectos. Nada de brillos, degradados violetas ni animaciones "mágicas".

- **Ícono obligatorio:** todo botón, campo o pestaña que active IA lleva el ícono `sparkles` de Lucide.
- **Botones de IA:** variante secundaria (fondo `panel`, borde `primario`) con el ícono `sparkles`. El texto dice qué hace: "Resumir con IA", "Sugerir descripción". Así nunca compiten con la acción primaria de la pantalla.
- **Respuestas de IA:** siempre en su propio panel, nunca mezcladas con los datos del sistema.
  - Fondo `tinte` (en oscuro, `primario-texto` al 10%), borde 1px `primario` al 30%, radio 8px.
  - **Primera línea del panel:** ícono `sparkles` + "Generado por IA" en `detalle` peso 700, `primario`. Va arriba a la izquierda (no en una esquina flotante) para que sea lo primero que se lee, también con lector de pantalla.
  - Debajo de la respuesta: acciones tranquilas "Copiar", "Usar este texto" y "Descartar". El texto generado **nunca se guarda solo**: una persona decide usarlo.
  - Mientras genera: esqueleto con el texto "Generando…" (`role="status"`), y un botón "Detener".

## 12. Cómo se escribe

Las palabras son parte del diseño.

- **Tratamiento:** se usa **vos**, en todas las herramientas, igual ("Ingresá tu legajo", "Probá de nuevo"). El trato de usted o en tercera persona queda solo para los **documentos formales** que la herramienta genera (resoluciones, notas, certificados). Nunca se mezclan en la misma pantalla.
- **Nombrar por lo que entiende la persona**, no por cómo está hecho el sistema: "Inscripciones", no "Registros de la tabla alumnos_evento".
- **Botones con verbo y objeto:** "Guardar cambios", "Descargar planilla". La misma acción conserva el mismo nombre en todo el recorrido.
- **Errores:** dicen qué pasó y cómo se arregla. No piden disculpas ni son vagos ("Ocurrió un error" no sirve).
- **Sin relleno:** nada de "Bienvenido/a al sistema de…" arriba de cada pantalla. El título de la pantalla alcanza.
- **Voz activa (nuevo en 0.3):** que se sepa quién hace qué. "Soporte Informático revisa tu solicitud", no "La solicitud será revisada por el área correspondiente".
- **Corto (nuevo en 0.3):** oraciones de 20 palabras como máximo y párrafos de 1 a 3 oraciones. Si hace falta más, es una lista.
- **Lenguaje inclusivo sin signos (nuevo en 0.3):** nada de "los/las", "lxs", "l@s" ni "les" en la interfaz: los lectores de pantalla los leen mal o los deletrean. Se usan colectivos o fórmulas que no marcan género: "el cuerpo docente", "la comunidad estudiantil", "las personas inscriptas", "quien solicita", "184 inscripciones" en lugar de "184 inscriptos".
- **Siglas (nuevo en 0.3):** la primera vez en cada pantalla, nombre completo y sigla entre paréntesis, sin puntos: "Universidad Nacional de la Patagonia San Juan Bosco (UNPSJB)". Después, solo la sigla. Las siglas de uso interno (SUDOCU, SIU) se explican con un texto de ayuda si la herramienta la usa gente de afuera.
- **Dependencias:** con mayúscula inicial en cada palabra con significado, nunca todo en mayúsculas: "Secretaría Académica", "Delegación Trelew".

**Formatos (Argentina):**

| Dato | Así | No así |
|---|---|---|
| Fecha en tablas y campos | `29/09/2026` | `09/29/2026`, `29-9-26` |
| Fecha en un texto | `29 de septiembre de 2026` (mes en minúscula) | `29 de Septiembre del 2026` |
| Hora | `14:30 h` (24 horas) | `2:30 PM`, `14:30 hs.` |
| Números | `1.250` · `98,5 %` | `1,250` · `98.5%` |
| Moneda | `$ 45.600,50` (con espacio) | `$45600.50` |
| Teléfono | `(0280) 442-1234` o `+54 280 442-1234` | `0280-15-4421234` |

## 13. Resumen: hacer y no hacer

| Hacer | No hacer |
|---|---|
| Usar la banda azul del header como el único bloque grande de color. | Rellenar otras áreas con azul (encabezados de tabla, tarjetas destacadas). |
| Poner las secciones en la sub-barra clara (o en el menú lateral). | Poner pestañas, buscadores o botones de pantalla sobre la banda azul. |
| Usar el naranja solo para "estás acá" y el foco. | Usar el naranja como texto, relleno, decoración o advertencia. |
| Usar grises teñidos del azul (`tinta`, `linea`, `capa`). | Usar la paleta `slate` genérica o grises neutros. |
| Separar con espacio y bordes finos. | Crear jerarquía con sombras, degradados, vidrio o brillos. |
| Usar paneles solo cuando agrupan una unidad. | Armar la página como una grilla de tarjetas iguales o anidar tarjetas. |
| Avisos como placa de estado con ícono. | Franjas de color de 4px a la izquierda de avisos o tarjetas. |
| Íconos Lucide en toda la interfaz. | Emojis como íconos. |
| Mayúscula solo inicial. | TEXTO EN MAYÚSCULAS o etiquetas arriba de los títulos. |
| Borde `linea-control` (3:1) en los inputs. | Inputs con borde apenas visible. |
| Botones que dicen lo que hacen. | "Aceptar", "Enviar", "OK". |
| Mantener contraste WCAG 2.2 AA en textos y controles. | Usar texto de menos de 13px. |
| En celular, tabla con columna fija para comparar y tarjetas para listas de cosas. | Usar `alert()`, `confirm()` ni `prompt()`. |
| Ofrecer el selector de tema (Automático · Claro · Oscuro). | Depender solo de la preferencia del sistema operativo. |
| Escribir con colectivos ("el cuerpo docente", "las personas inscriptas"). | Usar "los/las", "x", "@" o "e" en la interfaz. |
| Recorrer la lista "Antes de publicar" (sección 9) en cada versión. | Publicar sin probar con teclado y lector de pantalla. |
| Tomar logo, fuentes (incluida la de emojis), íconos y `unpsjb.css` del servidor de recursos. | Poner claves de API en el código del navegador. |
| Usar los colores de categoría para tipos de cosas, siempre con su nombre. | Pintar categorías con el semáforo o estados con colores de categoría. |
| Usar el interruptor solo para lo que se aplica en el momento. | Poner un interruptor en un formulario con botón "Guardar". |
| Mostrar precargado lo que ya trae la cuenta de la universidad. | Pedir dos veces el mismo dato en un trámite. |
| Con 6 secciones o más, 4 + "Más" en el menú inferior. | Amontonar 6 ítems en el menú inferior. |
| Compactar una pantalla de trabajo con `data-densidad="compacta"`. | Achicar la letra para que entre más. |
| Mostrar un solo registro como lista de resumen. | Armar una tabla de una fila o campos deshabilitados. |
| Listar destinos como lista de accesos: nombre, una línea y una flecha o un botón. | Una grilla de tarjetas con ícono, o un logo y un color por trámite. |
| En la portada de un portal, de 2 a 4 entradas por tarea, planas. | Carrusel, foto de apertura, ventana al entrar o bloques con texto blanco sobre un color claro. |
| Fotos de hasta 200 KB y páginas de hasta 1 MB. | Subir la foto como sale de la cámara, o un video que arranca solo. |
| Usar el acordeón para lo secundario. | Esconder campos obligatorios o avisos importantes. |
| En gráficos, los colores de serie, en orden, y el valor escrito. | Pintar series con el semáforo o con las categorías. |
| Dar siempre la tabla de un gráfico. | Tortas de muchas partes, 3D o dos ejes. |
| Estilos propios de una herramienta con prefijo `.ext-`. | Colores o medidas sueltas en el HTML. |
| Mostrar en pantalla la misma hoja que se imprime (`.hoja`). | Armar un documento como imagen o con marcas de agua. |
| Escribir la dirección al lado de todo código QR. | Dejar un QR como única forma de llegar a algo. |
| En el historial de una solicitud, decir quién habla con nombre y rol. | Globos de chat a izquierda y derecha, o un color por persona. |
| En la cartelera, letra de 26 u o más y nada que tocar. | Poner en la tele una pantalla pensada para escritorio. |
| Avisar en la cartelera cuando los datos están viejos. | Dejar una tele mostrando datos sin decir de cuándo son. |

## 14. Gobernanza: quién decide y cómo se versiona (nuevo en 0.3)

Un sistema de diseño sin dueño se desarma: cada herramienta agrega "solo un color más" y al año hay tres azules. Esta sección dice quién decide qué, sin volverlo un trámite.

### A. Modelo

- **Hoy: centralizado.** Soporte Informático de la Delegación Trelew es el **núcleo**: mantiene `DESIGN.md`, `unpsjb.css`, `muestra.html` y los assets, y es el único que publica versiones.
- **Si otras sedes lo adoptan** (Comodoro Rivadavia, Esquel, Puerto Madryn): **núcleo común + extensiones.** Todas usan el mismo `unpsjb.css`; si una sede necesita algo propio, lo agrega en un archivo aparte (`unpsjb-madryn.css`) que **solo** cambia tokens puntuales, nunca componentes. Lo que sirva para todas, se sube al núcleo.

### B. Quién hace qué (matriz RACI)

| Tarea | Núcleo (Soporte Trelew) | Quien hace una herramienta | Comunicación / marca | Autoridad de la sede |
|---|---|---|---|---|
| Agregar o cambiar un token | **A** · R | C | I | I |
| Agregar un componente | **A** · R | R si lo propone · C | I | I |
| Cambiar el logo o sus versiones | R | I | **A** | I |
| Publicar una versión | **A** · R | I | I | I |

**R** hace el trabajo · **A** aprueba (hay una sola por fila) · **C** se le consulta antes · **I** se le avisa después.

- Quien hace una herramienta y necesita algo que no existe, **primero pregunta** (C). Si lo resuelve con estilos sueltos, es deuda: se anota y se lleva al núcleo en la próxima versión.
- Pendiente: definir quién cumple el rol de "Comunicación / marca" en la UNPSJB.

### C. Versiones

`unpsjb.css` y este documento llevan **el mismo número de versión**, con el formato `MAYOR.MENOR.ARREGLO`:

| Cambia… | Cuándo | Ejemplo |
|---|---|---|
| **ARREGLO** (1.0.**1**) | Se corrige algo sin cambiar cómo se usa. | Un contraste, un espaciado mal puesto. |
| **MENOR** (1.**1**.0) | Se agrega algo; lo anterior sigue funcionando igual. | Un componente nuevo, un token nuevo. |
| **MAYOR** (**2**.0.0) | Hay que tocar el HTML de las herramientas para actualizar. | Una clase que cambia de nombre o de estructura. |

**Hoy el primer número es 0** (esta es la 0.4.5), y eso quiere decir "todavía no se publicó: puede cambiar sin aviso".

- **Mientras sea 0:** el número del medio sube con cada borrador de diseño (0.1 el primero, 0.2 "Señalética", 0.3 el de dos niveles, 0.4 el que suma componentes, gráficos y páginas públicas), aunque obligue a tocar el HTML. El último sube con arreglos y agregados chicos.
- **La 1.0.0** es la primera que se publique en el servidor de recursos y use una herramienta real. Desde ahí rige la tabla de arriba, porque recién entonces alguien depende de que nada se rompa.
- Lo que haya que renombrar o eliminar (por ejemplo, unificar el idioma de los nombres de las clases) conviene hacerlo **antes** de la 1.0.0.

- **Registro de cambios:** `CHANGELOG.md`, con las secciones Nuevo, Cambiado, Obsoleto, Eliminado y Corregido, y para cada cambio mayor, **cómo migrar**.
- **Obsoleto antes que eliminado:** lo que se va a quitar se marca como **obsoleto** (en el CSS con un comentario `@deprecated` y en el registro), sigue funcionando al menos una versión y se elimina recién en la siguiente versión mayor. Ejemplo: `.banda__nav` se marcó obsoleta en la 0.3. (Se eliminó en la 0.3.2 sin esperar, porque todavía no había nada publicado.)
- **Dónde vive:** `unpsjb.css` en `https://recursos.tw.unp.edu.ar/css/unpsjb.css` (la versión actual) y `…/css/unpsjb-1.0.0.css` (fija, con el número de cada versión publicada, para herramientas que no pueden actualizar enseguida). `muestra.html` publicada en el mismo servidor, como referencia viva.

### D. Cómo saber si se usa

Tres números, que se miran una vez por cuatrimestre:

1. **Herramientas que cargan `unpsjb.css`** sobre el total de herramientas de la Delegación.
2. **Estilos sueltos:** colores hex o tamaños en px escritos a mano en el código de las herramientas (se buscan con `grep`). Cuantos menos, mejor.
3. **Tiempo para armar una pantalla nueva** con el sistema, comparado con el de antes.

### E. Estilos propios de una herramienta (nuevo en 0.4)

A veces una herramienta necesita algo que el sistema no tiene (un control de cámara, una grilla especial). Para que eso no se vuelva deuda escondida:

- Va en una hoja o un bloque `<style>` **de la herramienta**, nunca en `unpsjb.css`.
- Todas sus clases llevan el prefijo **`.ext-<herramienta>-`**: `.ext-camaras-muro`, `.ext-eventos-mapa`. Así se encuentran con una búsqueda.
- Usan los tokens del sistema (`var(--color-linea)`, `var(--espacio-4)`), no colores ni medidas sueltas.
- En el atributo `style` solo van **variables del sistema** que un componente espera (`style="--grilla-min: 200px"`, `style="--valor: 0.4"`). Nunca colores ni tamaños.
- Se anota en el registro de la herramienta. Si dos herramientas necesitan lo mismo, pasa al núcleo en la versión siguiente.

`muestra.html` hace lo mismo: sus fichas usan clases `.ext-muestra-…`.

### F. Fichas de componentes y reportes (nuevo en 0.4)

- **Cada componente tiene su ficha** en `muestra.html`, al final de su sección, con cuatro partes: **cuándo usarlo**, **cuándo no** (y qué va en su lugar), **accesibilidad** y un **ejemplo de código**. Un componente nuevo no entra al sistema sin su ficha.
- **Reportes** (los del botón "Reportar un problema", 6.C):
  - "Algo no funciona" y "Me cuesta usarlo o leerlo" se corrigen en la versión de arreglo siguiente. Los de accesibilidad, primero.
  - Las sugerencias se anotan. Lo que piden dos o más herramientas entra en la próxima versión menor.
  - A quien reportó se le contesta, aunque sea para decir que no se va a hacer.

## 15. Gráficos e indicadores (nuevo en 0.4)

### A. Primero: ¿hace falta un gráfico?

| Lo que hay | Va | No va |
|---|---|---|
| Un número (y cómo cambió) | **Indicador** | Un gráfico de una barra |
| Unos pocos números principales | Una fila de indicadores | Barras agrupadas |
| Cantidades de pocas cosas para comparar | **Barras horizontales** | Torta |
| Partes de un total | **Barra apilada** o **torta** (15.G), hasta 6 partes contando "Otros" | Torta de muchas partes |
| Algo que cambia en el tiempo | **Líneas** | Barras apretadas |
| Más de 5 series o más de 7 clases | Una **tabla** | Más colores |

No se usan: tortas de más de 6 partes (desde la 0.4.5; antes el tope era 3), donas, gráficos en 3D, áreas apiladas y **dos ejes en un mismo gráfico** (dos escalas inventan una relación que los datos no tienen; van dos gráficos).

### B. Indicador

Nombre en `detalle`, el valor grande (32px, peso 700, en la misma fuente de texto: no en Montserrat) y, si hay, el cambio contra un período.

- El cambio lleva **ícono + signo + texto**: `trending-up`, "+12 %", "contra septiembre". Nunca solo color.
- El color dice si el cambio **conviene**, no si subió: que bajen los reclamos es bueno (`exito-texto`); que suban, malo (`error-texto`). Si no es ni bueno ni malo, va en `tinta-2`.
- Siempre se dice contra qué se compara.
- Los indicadores van sueltos, en fila. No se encierran cada uno en un panel.

### C. Cómo se dibuja

| Pieza | Medida |
|---|---|
| Barra | 16px de alto (nunca más de 24px). Recta en la base, 4px de radio en la punta. |
| Línea | 2px, con un punto de 8px o más en cada dato. |
| Separación entre partes que se tocan | 2px del color del fondo. Nunca un borde alrededor. |
| Ejes y grilla | Una línea fina y continua (`linea-control` el eje, `linea` la grilla). Nunca punteada. |

- **El valor va escrito**, en la punta de cada barra. En un gráfico de líneas se escribe el último valor de cada serie, no todos.
- **Una serie, un color** (`serie-1`). No se pinta cada barra distinta ni más oscura la más grande: el largo ya lo dice.
- **Dos series o más:** siempre con leyenda (cuadradito + nombre + valor), en el mismo orden que el gráfico.
- **Barras horizontales** cuando los nombres son largos, y siempre en celular.
- Sin tramas de relleno: con el valor escrito y la tabla, no hacen falta.

### D. Todo gráfico tiene su tabla

- El gráfico de barras (`.barras`) **es** una tabla: nombre y valor, dibujada como barras. El lector de pantalla la lee sin nada extra.
- Un selector **"Gráfico | Tabla"** (segmentado) arriba a la derecha la muestra como tabla común.
- Un gráfico que no se puede armar así (líneas, en SVG) lleva `role="img"` con un nombre que dice lo importante, y su tabla al lado o detrás del selector.
- Arriba del gráfico, un título que dice qué muestra; abajo, una nota con el período y el total.
- Los filtros van **una sola vez, arriba de todos los gráficos** que afectan, nunca dentro de cada uno.
- Al imprimir salen con sus colores, sin el selector.

Los colores están en la sección 3.I.

### E. Gráficos de líneas (nuevo en 0.4.3)

Lo que cambia en el tiempo. Necesita un dibujo (SVG), así que va en un módulo: `unpsjb-graficos.css` (8 KB) y `unpsjb-graficos.js` (29 KB; 9 KB comprimido), que desde la 0.4.5 dibujan también barras, columnas y torta (15.F y 15.G). Ejemplo: `muestra-graficos.html`; casos límite: `prueba-graficos.html`.

- **Los datos se escriben una sola vez, en una tabla.** La tabla lleva `data-grafico="lineas"`; el script arma el gráfico y el selector "Gráfico | Tabla". Sin JavaScript queda la tabla. La primera columna es el momento (mes, día, año) y cada una de las demás, una serie.
- **`data-descripcion` es obligatorio:** una oración que dice lo importante ("Trelew sube de 310 a 412"). Es el nombre de la imagen: lo que escucha quien usa lector de pantalla.
- Opcionales: `data-unidad="%"`, `data-alto` (260px por defecto) y `data-desde-cero="no"`.
- **El eje arranca en cero.** Sin el cero, una suba de 2 % parece el doble. La excepción es cuando el cero no significa nada (una temperatura, un índice): ahí va `data-desde-cero="no"` y la nota del gráfico lo dice.
- **Marcas del eje en números redondos** (0, 100, 200), cuatro o cinco. Si los datos son enteros, las marcas también: 0, 5, 10, 15 y no 0; 2,5; 5; 7,5. Los nombres del eje de abajo se saltean si no entran, y el último va siempre.
- **Un punto en cada dato** si hay 20px o más entre uno y otro. Con muchos datos, solo en el último y en el momento elegido: una fila de puntos pegados es una línea más gruesa, no información.
- **La lectura, arriba del gráfico** (`.dibujo__lectura`): el momento elegido y el valor de cada serie con su cuadradito. Es también la leyenda. Sin tocar nada muestra el último momento.
  - Con el mouse o el dedo se elige un momento; una guía vertical lo marca.
  - Con el teclado, `Tab` llega al gráfico y las flechas lo recorren. Es un control de rango, como la línea de tiempo del visor (16.B): el lector de pantalla dice el momento y todos los valores.
  - No hay cartel flotante (7.P): la lectura está siempre en el mismo lugar y no tapa nada.
- **El último valor de cada serie va escrito en la punta,** en `tinta`. Si dos quedan encimados y habría que separarlos mucho, no se escriben: ya están en la lectura.
- **Si falta un dato, la línea se corta.** No se une ni se inventa un valor; en la tabla dice "Sin dato".
- **Color de cada serie:** en orden, de `serie-1` a `serie-5`. Para que una serie conserve su color aunque cambie el orden de las columnas, la clase va en su encabezado: `<th class="num serie-3">`.
- **Sobre qué fondo:** los puntos llevan un aro del color del fondo. Dentro de un panel no hay que hacer nada; si el gráfico va suelto sobre la página, `style="--grafico-fondo: var(--color-fondo)"`.
- **Al imprimir,** un gráfico por renglón y vuelto a trazar al ancho de la hoja, para que la letra salga a su tamaño.
- **Lo que no hace:** áreas rellenas, líneas curvas (suavizar inventa valores entre dato y dato), dos ejes, más de cinco series.
- En una herramienta hecha en React se puede usar el mismo script (después de cambiar los datos de la tabla, `unpsjbGraficos.dibujar(tabla)`) o armar un componente que produzca el mismo SVG con estas clases.

### F. Barras y columnas con el módulo (nuevo en 0.4.5)

Para comparar cantidades de cosas. Se arman igual que las líneas, desde una tabla, con `data-grafico="barras"`. La tabla `.barras` de `unpsjb.css` (15.D) sigue sirviendo para una serie sola sin script; el módulo agrega varias series, columnas y el eje.

- **Barras horizontales** por defecto: los nombres a la izquierda (hasta el 42 % del ancho; lo que no entra se corta con "…" y se lee entero con el mouse encima) y el valor escrito en la punta de cada barra.
- **Columnas** con `data-orientacion="vertical"`, para pocos períodos uno al lado del otro. Con una serie, el valor va arriba de cada columna; con varias, en la lectura de arriba, que se recorre con el mouse, el dedo o las flechas, como en las líneas. **En pantallas de menos de 480px las columnas pasan solas a barras horizontales** (15.C).
- **Varias series:** hasta 5, una barra por serie en cada fila y la leyenda arriba. La sexta columna de la tabla no se dibuja (queda en la tabla).
- **Siempre desde cero,** también con negativos: el cero entra en el eje y es la línea fuerte. Una barra negativa va hacia la izquierda (o hacia abajo) y su valor, en su punta.
- **Si falta un dato,** no hay barra; en la tabla dice "Sin dato". Un cero lleva una barra mínima y "0".
- Opcionales: `data-unidad`, `data-alto` (solo columnas; 260px por defecto).

### G. Torta (nuevo en 0.4.5)

Para las partes de un total, cuando son pocas y lo que importa es cuánto del todo se lleva cada una. `data-grafico="torta"`, con una sola columna de valores.

- **Hasta 6 porciones: 5 de color y una gris.** La gris va al final y junta las filas que se llaman "Otros" en la tabla y las que no entran de color; si es una sola fila, conserva su nombre. En la tabla quedan todas.
- **Empieza arriba y gira en el sentido del reloj,** en el orden de la tabla. Conviene de mayor a menor.
- **Sin textos encima del dibujo.** Al lado (debajo, en pantallas angostas) va la lista con el nombre, el valor y el porcentaje de cada parte, en el mismo orden. Los porcentajes son enteros y suman 100; una parte que se ve nunca dice "0 %" (dice "<1 %"), y si hay otras, ninguna dice "100 %" (dice ">99 %"). Con `data-unidad="%"` los valores ya son porcentajes y no se repiten.
- **Con el mouse o el dedo sobre una porción, se resalta su renglón de la lista** (fondo `tinte` y el nombre en negrita) y las demás porciones se apagan. También al revés: sobre un renglón, se resalta su porción. Es una ayuda para cuando hay varias partes de color parecido; la información ya está toda en la lista.
- **Partes que valen cero no se dibujan.** Si todo vale cero, no hay gráfico: queda la tabla.
- **Lo que no hace:** donas, porciones separadas, 3D, dos tortas para comparar dos totales (van barras con dos series).

## 16. Módulos: agenda de aulas y visor de cámaras (nuevo en 0.4)

Son piezas grandes que no van en `unpsjb.css` sino en hojas aparte, para que no las cargue quien no las usa. Cada una se enlaza **después** de `unpsjb.css` y usa sus tokens. Esta sección documenta las dos primeras; las demás tienen la suya.

| Módulo | Hoja | Ejemplo | Peso | Reglas |
|---|---|---|---|---|
| Agenda de aulas | `unpsjb-agenda.css` | `muestra-agenda.html` | 19 KB | 16.A |
| Visor de cámaras (rehecho en 0.4.5) | `unpsjb-video.css` | `muestra-video.html` | 28 KB | 16.B |
| Gráficos: líneas (0.4.3); barras, columnas y torta (0.4.5) | `unpsjb-graficos.css` + `unpsjb-graficos.js` | `muestra-graficos.html` | 8 KB + 29 KB | 15.E a 15.G |
| Documentos e impresión (0.4.3) | `unpsjb-documentos.css` | `muestra-documentos.html` | 16 KB | 18 |
| Mesa de ayuda (0.4.3) | `unpsjb-mesa-ayuda.css` | `muestra-mesa-ayuda.html` | 8 KB | 19 |
| Cartelera (0.4.3) | `unpsjb-cartelera.css` | `muestra-cartelera.html` y `muestra-cartelera-celular.html` | 16 KB | 20 |
| Planos (0.4.4) | `unpsjb-planos.css` + `unpsjb-planos.js` | `muestra-planos.html` | 11 KB + 31 KB | 21 |

Los ejemplos tienen los datos escritos en el HTML. En las herramientas reales (React), los arma el código a partir de los datos del servidor, con estas mismas clases. En el ejemplo de la agenda los eventos son siempre los mismos: al cambiar de fecha o de aula cambian los títulos y los días.

### A. Agenda de aulas

- **Dos formas, siempre:** la grilla (`.agenda-grilla`) y una **lista** ordenada por hora (`.agenda-lista`), donde cada evento va con su título y todos sus datos. Se cambia con un segmentado "Grilla | Lista". La lista no es un extra: es la forma de usar la agenda con lector de pantalla y en celular.
- **Tres períodos:** Día (aulas en columnas), Semana (los días de un aula en columnas) y Mes (`.agenda-mes`), con otro segmentado. En Mes, cada día muestra hasta 2 eventos y "+3 más".
- **De una vista a la otra, tocando lo que se quiere ver** (0.4.2). No hace falta volver al segmentado:

| Estás en | Tocás | Se abre |
|---|---|---|
| Mes | La semana, en la columna de la izquierda (`.agenda-mes__semana`) | Esa semana |
| Mes | El número del día, o "+3 más" | Ese día |
| Semana | El nombre del día, en el encabezado (`.agenda-grilla__ir`) | Ese día, con todas las aulas |
| Día | El nombre del aula, en el encabezado (`.agenda-grilla__ir`) | La semana de esa aula |

  Esos encabezados son botones con aspecto de enlace, y toda la celda responde al clic. Llevan `aria-describedby` hacia un texto que dice qué abren, así el nombre de la columna sigue siendo solo "Lunes 12". En Mes, al pasar por la semana se tiñe la fila entera. Al cambiar de vista, el foco queda en el título de la vista nueva.
- **En la barra nada se corre al cambiar de vista** (0.4.2). Las dos flechas van juntas, **antes** del título: con el título en el medio, "Siguiente" se movía cada vez que el título cambiaba de largo. "Día | Semana | Mes" va **último, contra el borde derecho**; lo que aparece y desaparece según la vista ("Grilla | Lista") queda a su izquierda. Las flechas dicen qué mueven: "Día anterior", "Semana siguiente".
- **En Semana, el aula va en su propia placa** (`.agenda-aula`, 0.4.2), justo arriba de la grilla o de la lista: el ícono, la etiqueta "Aula" **a la vista**, el selector, los datos del aula ("60 lugares · Planta baja") y la frase "La semana muestra un aula por vez". Antes era un selector sin etiqueta entre los controles de vista, y no se entendía qué era.
- **En celular** solo hay Día, en lista: arriba, una fila con los días para elegir (`.agenda-dias`); la grilla y el mes no se muestran.
- **La grilla es una tabla** (`<table>`): encabezados de columna y de fila, y un evento de dos horas ocupa dos filas (`rowspan`). Va dentro de un marco con scroll, como toda tabla (7.D). Una grilla con flechas en las cuatro direcciones (`role="grid"`) queda para más adelante: es cara de hacer bien.
- **Cada renglón de una hora mide 48px**, como una fila de tabla.
- **Cada evento es un botón** (`.agenda-evento`) con el cuadradito de su categoría (3.H), el nombre, el horario y **el nombre de la categoría escrito**. Fondo `capa` y un borde fino, para que se distinga también sobre la columna de hoy. Sin franja de color al costado.
- **Hoy y ahora, en azul.** La columna de hoy lleva fondo `tinte` y la marca "Hoy" (`.agenda-hoy`). La hora actual es una línea de 2px en `primario-texto`, anclada a la fila de esa hora, que pasa **por detrás** de los eventos (por encima parecería un tachado). **No en naranja:** el naranja haría creer que esa celda tiene el foco.
- **Conflictos** (dos eventos en la misma aula y hora): la celda muestra los dos, con el ícono `triangle-alert` y el texto "2 eventos a la misma hora" en ámbar, antes de los eventos. En la lista, cada uno dice "Se superpone con otro evento en la misma aula".
- **Reservar:** con el botón "Reservar aula" de la pantalla. Las celdas libres también reservan, pero son un **atajo para el mouse** (`tabindex="-1"`): si cada hora libre fuera una parada de `Tab`, habría que pasar por decenas para llegar a un evento.
- Arriba de la grilla, la lista de categorías con su color y su nombre.

### B. Visor de cámaras

Rehecho el 6 de octubre de 2026 (0.4.5), a partir de un visor comercial que se tomó de referencia. De ahí salen el panel lateral, el nombre encima de la imagen y las vistas con cámaras de distinto tamaño. Los colores, la tipografía y los componentes siguen siendo los del sistema.

- **Lo primero es el tamaño de las cámaras.** Todo lo demás se acomoda a eso: nada le saca alto al muro. No hay encabezado de pantalla ni barra de herramientas arriba, y el nombre de cada cámara va encima de la imagen, no debajo.
- **El video va siempre sobre negro** (`#000`), en claro y en oscuro. El resto de la pantalla respeta el tema elegido: el visor **no** fuerza el modo oscuro. Los únicos colores propios del módulo son los del video: el negro, y lo que se escribe encima de la imagen.
- **Panel lateral** (`.visor__lateral`, 280px, con fondo `panel`): arriba el título de la pantalla (el `h1`, "Cámaras en vivo") y el botón que lo pliega; debajo el segmentado de vistas, el botón de pantalla completa, el buscador, la lista de cámaras y el interruptor "Llenar el cuadro". Es la única excepción al encabezado de pantalla (6.D): acá el título vive en el panel.
- **El panel se pliega a un riel** de 46px (`data-lista="plegada"` en `.visor`) con los mismos controles en columna: desplegar, 1 · 4 · 5 · 6 · 9 y pantalla completa. El muro gana el ancho de la lista. Se recuerda entre visitas. Con menos de 1024px el panel va arriba del muro, "plegada" esconde solo la lista, y arranca plegada para que al entrar se vean las cámaras.
- **Muro** (`.muro`) con cinco vistas, elegidas con el segmentado. Las cámaras se muestran en el orden en que están; las primeras son las grandes:

| Vista | Cómo se arma | Proporción del muro |
|---|---|---|
| 1 | Una cámara | 16:9 |
| 4 | 2 × 2 | 16:9 |
| 5 | Dos grandes arriba y tres chicas abajo | 32:15 |
| 6 | Una grande (dos columnas y dos filas) y cinco chicas alrededor | 16:9 |
| 9 | 3 × 3 | 16:9 |

- **El muro ocupa todo el ancho libre y se ve entero, sin scroll** (desde 768px). De alto toma lo que piden sus celdas en 16:9, sin pasarse del alto libre de la ventana. Cuando el alto no alcanza, las celdas quedan más anchas que 16:9: la imagen no se deforma ni se recorta, y deja negro a los costados. La página mide dónde empieza el muro y se lo pasa a la hoja en `--visor-arriba` (en `muestra-video.html`); sin ese dato se usa un valor aproximado. Con ventanas muy bajas el muro no baja de 320px. En celular, una cámara por renglón.
- **"Llenar el cuadro"** (`.muro--llenar`, un interruptor en el panel, apagado al entrar): la imagen tapa toda su celda y se recorta lo que sobra. Apagado es lo seguro en vigilancia: no esconde ningún borde de la imagen. Encendido, plegar el panel agranda la imagen en todas las vistas.
- **Cada cámara** (`.camara`) es su imagen y, encima, una **barra oscura** (`.camara__barra`, negro al 75%, 32px; 44px en celular) con el número y nombre, el estado y las acciones. Tapa una franja de la imagen; a cambio no le saca alto al muro (con el nombre debajo, en un muro de 9 se iba un tercio del alto). Al ser oscura, lo escrito se lee igual con cualquier imagen: el texto, blanco, da 10:1 o más; los íconos de estado, 3,7:1 o más sobre una imagen blanca. Reemplaza a la regla anterior ("el estado no va encima del video").
- **Qué cámara va en cada lugar se elige sin arrastrar** (WCAG 2.2, 2.5.7), en dos toques:
  1. Se toca el recuadro que se quiere cambiar. El nombre de cada cámara es un botón (`button.camara__nombre`, con `aria-pressed`); con el mouse sirve toda la imagen. El elegido lleva un marco `primario-texto` y la barra en azul institucional.
  2. Se toca **otro recuadro**, y las dos cámaras se intercambian; o **una cámara de la lista**, y pasa a ese lugar (si ya estaba en el muro, se intercambian; si no, la otra sale del muro).
  - `Esc`, o tocar de nuevo el mismo recuadro, cancela. Una línea en el panel (`.visor__ayuda`) dice el paso que sigue, y cada cambio se le avisa al lector de pantalla.
  - Sin ningún recuadro elegido, tocar una cámara de la lista la pone en el primer lugar.
  - En la lista, las cámaras que se están viendo llevan un **ojo** (`eye`) a la derecha, que es un botón (`.camaras-lista__ojo`): tocarlo quita esa cámara del muro y deja su lugar vacío. Al pasar el mouse, o al llegar con `Tab`, el ojo pasa a **ojo tachado en rojo** (`eye-off`, color de error): muestra lo que va a hacer antes de hacerlo. En pantallas táctiles no hay ese aviso previo; el botón dice lo que hace ("Quitar Biblioteca del muro") y se deshace tocando el nombre de la cámara, que vuelve al lugar vacío.
  - La vista y el orden se recuerdan entre visitas.
- **Lugares vacíos.** Con un recuadro elegido, en su barra queda solo **"Quitar"** (ícono `x`; también `Supr`): la cámara sale del muro y su lugar queda vacío (`.camara--vacia`, borde punteado, "Lugar vacío"). El lugar vacío es un botón: se lo toca y se elige en la lista la cámara que va ahí; si la lista está plegada, se abre sola. Una cámara de la lista sin recuadro elegido va al primer lugar vacío que se esté viendo y, si no hay ninguno, al primer lugar. El muro son nueve lugares: cada uno tiene una cámara o está vacío, y una cámara puede no estar en ninguno.
- **Dos acciones distintas para agrandar, con íconos distintos:**

| Acción | Ícono | Qué hace | Quién lo lleva |
|---|---|---|---|
| Ampliar | `maximize-2` | Agranda la cámara **dentro del muro**: en la vista de 6 la pasa al lugar grande; en las de 4 y de 9, la deja sola | Vista de 6: las cinco chicas. Vistas de 4 y de 9: todas |
| Ampliar a la izquierda / a la derecha | `arrow-up-left` / `arrow-up-right` | En la vista de 5, la pasa a uno de los dos lugares grandes | Vista de 5: las tres chicas |
| Pantalla completa | `fullscreen` (para salir, `minimize`) | Esa cámara pasa a ser **lo único que se ve en el monitor**, sin nada de la interfaz, como un video | Todas, en todas las vistas |

  - En la pantalla completa de una cámara la barra se muestra 3 segundos al entrar y vuelve cada vez que la persona mueve el mouse, toca la pantalla o usa el teclado (`.camara--controles`); ahí está el botón para salir. También se sale con `Esc`. Con el mouse quieto, el puntero se esconde.
  - Si la página ya estaba en pantalla completa, al salir de la cámara se vuelve a la de la página.
  - En celular no hay "Ampliar": las cámaras van una debajo de la otra y no hay lugar grande.
  - El botón de pantalla completa lleva `hidden` y la página lo muestra si el navegador lo permite (en iPhone no existe para elementos de la página).
- **Estados, con ícono y texto,** nunca solo color. Sobre la barra el texto es blanco y el ícono lleva el color del estado (los del semáforo en modo oscuro):

| Estado | Ícono | Se ve |
|---|---|---|
| En vivo | `video` | Ícono verde y "En vivo" |
| Grabando | `disc` | Ícono celeste y "Grabando", sin parpadeo. No en rojo: grabar no es un error |
| Sin señal | `video-off` | Ícono rojo y "Sin señal", y en lugar del video una celda `capa` que dice "Sin señal" y qué hacer: "Cámara 04 desconectada. Avisá a Soporte Informático." |

- **Celdas chicas:** con menos de 340px de ancho, el estado y "Quitar" quedan solo con su ícono (el del estado es distinto en cada estado); con menos de 300px, "Sin señal" y el lugar vacío quedan sin la explicación. Los textos siguen estando para el lector de pantalla. Por eso el texto del estado va en `<span class="camara__estado">`.
- Sin puntos que laten ni tramas: el movimiento solo responde a una acción (5.E).
- **Pantalla completa de la página** (no confundir con la de una cámara): botón secundario del panel, con el ícono `maximize` ("Pantalla completa") y `minimize` ("Salir de pantalla completa"). Pone **la página** en pantalla completa y esconde la cabecera, el banner de fase y el menú inferior. Se sale con el mismo botón o con `Esc`. Se muestra solo si el navegador lo permite (en iPhone no existe para páginas).
- **Lista de cámaras** (`.camaras-lista`), dentro del panel y con su propio scroll si es larga. Cada renglón tiene el botón de la cámara (`.camaras-lista__camara`), con el ícono de su estado, y el ojo de las que se están viendo; el estado va también en texto para el lector de pantalla. La elegida lleva una marca `primario-texto` (no naranja: no es la navegación principal).
- **Las grabaciones van debajo del visor,** a todo el ancho. La línea de tiempo no cambió.
- **Línea de tiempo de grabaciones** (`.linea-tiempo`), sin depender de arrastrar (WCAG 2.2, 2.5.7):
  1. Botones de salto: "−15 min", "−1 min", "+1 min", "+15 min", y "Reproducir" / "Pausar".
  2. Un campo "Ir a la hora" (`input type="time"`).
  3. La línea misma es un `input type="range"`: con `Tab` se llega y con las flechas avanza de a un segundo. Dice la hora elegida (`aria-valuetext`).
- Arriba de la línea, una barra muestra en azul los tramos con grabación, con el mismo dato en texto para el lector de pantalla ("Hay grabación de 6:00 a 12:30 y de 14:00 a 22:00").
- El momento elegido se ve siempre en números grandes.

## 17. Páginas de entrada y públicas (nuevo en 0.4)

### A. Portal del wifi

Es la pantalla que aparece al conectarse a la red. Antes de aceptar, la red suele bloquear todo lo demás, y se abre en un navegador mínimo del celular. Hay una plantilla lista: `portal-wifi.html`.

- **Un solo archivo.** Los estilos y el escudo van adentro del HTML. No carga `unpsjb.css`, ni fuentes, ni imágenes de afuera. La plantilla pesa 9 KB (4 KB comprimida).
- **Fuentes del sistema** (`system-ui`…). Es el único caso donde no van Montserrat ni Atkinson.
- **Sin JavaScript.** Algunos de esos navegadores lo limitan.
- **Una sola cosa:** qué es, para quién y el botón. Sin menús ni links que saquen de la página.
- **Las condiciones, en dos niveles:** un resumen de 3 o 4 puntos en lenguaje claro ("Antes de conectarte") y el texto completo en un desplegable (`<details>`). Nunca un cuadro con scroll adentro.
- **Aceptación:** una frase y el botón: "Al tocar 'Conectar al wifi' aceptás las condiciones de uso". **Pendiente de confirmar con quien corresponda en lo legal:** si piden una aceptación expresa, se agrega una casilla obligatoria antes del botón (la plantilla marca dónde).
- **Botón de 48px, a todo el ancho.** Dice lo que hace: "Conectar al wifi".
- **Español e inglés,** con un link arriba a la derecha. Funciona sin JavaScript.
- **Modo oscuro** según el sistema. No hay selector: no hay dónde guardar la elección.
- Los valores (colores, radios, tamaños) son los de `unpsjb.css`, copiados a mano: si cambian allá, se actualizan en la plantilla.
- Falta completar, según el equipo que maneje la red: la dirección a la que envía el formulario y sus campos ocultos.

### B. Páginas públicas

Las que ve gente de afuera de la universidad: la agenda de eventos, una inscripción abierta.

- **La misma banda** que las herramientas: es la identidad. No hay un header distinto para lo público.
- **Sin sub-barra** si es una sola página; sin "Mi cuenta" si no hay ingreso.
- **Contenido de lectura:** `.contenedor` con los textos a 70 caracteres por línea, sin densidad compacta.
- **Pie de páginas públicas** (6.C), con dirección, contacto y enlaces legales.
- **El logo completo** (nivel L, 10.A) solo donde hay lugar para mostrarlo a 96px o más: una portada, no la banda.
- **Sin siglas internas** sin explicar (sección 12): quien llega de afuera no sabe qué es SIU ni SUDOCU.

### C. Portal de la Delegación (nuevo en 0.4.5)

El portal institucional de la universidad lo maneja Comodoro. El de la Delegación es otra cosa: **chico, informativo y de consulta rápida**. Sirve para encontrar en un minuto dónde queda algo, a quién escribirle y por dónde se hace un trámite. No es un diario ni repite lo que ya está en el portal de la universidad: lo enlaza.

Hay un prototipo: `muestra-portal.html`. Las reglas salen del estudio de los sitios de la UNC y la UBA (`REFERENCIAS-UNC-UBA.md`).

- **Vale todo lo de las páginas públicas** (17.B): la misma banda, textos a 70 caracteres, pie de páginas públicas.
- **Abre con las entradas** (`ul.entradas`): de **dos a cuatro** bloques grandes, nombrados por lo que la persona viene a hacer ("Estudiar en Trelew", "Trámites", "Herramientas"), no por el organigrama. Es la idea de las tres entradas del portal de la UNC.
  - Son planos, sin foto, sin ícono y sin sombra. El **principal** (`.entradas__principal`) va en azul con texto blanco; los demás, en `capa` con texto `tinta`. Es la única excepción a "la banda es el único bloque grande de color" (13), y solo en esta portada.
  - Cada uno lleva el título y una línea que dice qué hay adentro.
  - **El naranja no se usa de relleno** (3.B). Texto blanco sobre celeste o naranja, como en los mosaicos de otros sitios, da 2:1.
  - Con más de cuatro destinos no se suman bloques: va una lista de accesos (7.Q).
- **Avisos antes que noticias.** Lo que cambia el día de alguien ("El lunes no hay clases") va como aviso (8.A), arriba. Las novedades, como una lista corta de título y fecha, con un enlace a "todas". Sin carrusel (7.P).
- **Sin foto de apertura.** Si hay fotos, respetan los topes de 2.C.
- **El acceso a la cuenta va en la banda,** en todas las páginas (el botón "Mi cuenta"). Es el puente entre informarse y hacer un trámite.
- **Navegación de un solo nivel:** la sub-barra (6.A), con hasta 6 secciones. En el estudio había páginas con tres filas de menú antes del título.
- **Contacto a la vista:** oficina, dirección, horario, teléfono y correo, como lista de resumen (7.L) dentro de un panel. Los teléfonos y correos son enlaces (`tel:`, `mailto:`).
- **Pesa poco:** una página del portal no pasa de 1 MB (2.C).

### D. Página de inicio de una cuenta (nuevo en 0.4.5)

Lo primero que ve alguien al ingresar a un portal de cuenta o a una herramienta con varias partes. Responde tres preguntas, en este orden. Es el orden de la página de inicio de MiUNC, con nuestras piezas:

1. **Quién sos.** El título de la pantalla (6.D) saluda con el nombre de pila: "Hola, Rocío". En `titulo-1`, como cualquier otro título: no es más grande ni más fino.
2. **Qué tenés pendiente.** Si falta algo que le puede traer un problema (un correo de recuperación sin confirmar, un turno por vencer), va **un** aviso (8.A) que diga qué falta, para qué sirve y el botón para resolverlo. Si no hay nada pendiente, no va nada: no se inventa un aviso.
3. **A dónde ir.** Una lista de accesos (7.Q) con lo más usado, de 3 a 6 renglones.

- **Los datos de la cuenta** van en otra pantalla: menú lateral (6.A) con las secciones y, a la derecha, una lista de resumen (7.L). Solo llevan "Cambiar" los datos que la persona puede cambiar; de los demás se dice quién los corrige.
- **Avisos de seguridad** ("Nunca te vamos a pedir la contraseña") van como aviso, al lado del dato que protegen. No en letra chica ni en cursiva.
- **No va:** una grilla de tarjetas con ícono (7.C), contadores o gráficos de relleno, ni un saludo con la hora del día.

## 18. Documentos e impresión (nuevo en 0.4.3)

Casi toda herramienta termina en un papel: una constancia, un certificado, un comprobante. El módulo `unpsjb-documentos.css` (ejemplo: `muestra-documentos.html`) da la hoja y sus partes. Imprimir una pantalla cualquiera (una tabla, una agenda) no necesita este módulo: eso ya lo hace `unpsjb.css` (6.G).

| Documento | Hoja | Letra del texto | Trato |
|---|---|---|---|
| Constancia, nota, resolución | A4 vertical | Serif (`.fuente-academica`) | Formal, en tercera persona |
| Certificado, diploma | A4 apaisada | Serif | Formal |
| Comprobante de un trámite | A4 vertical | La del sistema | De vos, como la herramienta |
| Planilla para firmar | A4 vertical | La del sistema | — |

### A. La hoja

- **En pantalla se ve la misma hoja que sale impresa** (`article.hoja`): mide un A4 y tiene sus márgenes. Quien la mira sabe qué va a salir, sin abrir la vista previa.
- **La hoja es papel:** blanca con tinta negra, también en modo oscuro. Es la segunda excepción al tema, junto con el video sobre negro (16.B). Usa los colores de papel, los mismos con que `unpsjb.css` imprime cualquier pantalla (6.G): `papel` `#ffffff`, `papel-tinta` `#000000`, `papel-tinta-2` `#333d49` y `papel-linea` `#b9c6d6`.
- **Márgenes:** 20 mm arriba, a la derecha y abajo, y 30 mm a la izquierda, para encuadernar o perforar. La hoja apaisada (`.hoja--apaisada`), 15 mm parejos. Son un punto de partida: **falta confirmar si la universidad tiene una norma propia.** Se cambian en dos lugares de la hoja de estilos (los tokens `--hoja-margen-*` y las reglas `@page`), porque `@page` no acepta variables.
- **En celular** la hoja ocupa el ancho de la pantalla y el texto sigue en 16px. Se lee cómodo, aunque los renglones no corten donde cortan en el papel. La hoja apaisada se ve a tamaño real desde 1220px de ancho.
- **Borrador:** lo dice arriba, con palabras (`.hoja__borrador`: "Borrador: sin validez"). No hay marcas de agua (3.G).
- **Texto real, nunca una imagen:** se puede seleccionar, buscar y leer con lector de pantalla.

### B. Membrete

- **El logo original** (`logo-unpsjb-trelew-completo.svg`, desde la 0.4.5): la gaviota con su detalle y el texto curvo con el nombre de la universidad, a 26 mm de alto, el mínimo al que ese logo se lee (nivel L, 10.A). Al lado, la dependencia que emite el documento ("Secretaría Académica", y debajo "Delegación Trelew"). El nombre de la universidad ya lo dice el logo, así que no se repite. (Hasta la 0.4.3 iba el logo de fondos claros a 15 mm, sin el texto curvo, con el nombre escrito al lado.)
- Abajo, una línea `primario` de 2px: la misma que deja la banda al imprimir (6.G).
- Va en la primera hoja. Las siguientes llevan el número de página.

### C. El texto

- **Serif, 12 pt, interlineado 1,5, alineado a la izquierda.** No se justifica: sin cortar palabras, el texto justificado deja ríos de blanco y se lee peor.
- **Lugar y fecha** arriba a la derecha (`.documento__dato`), con la fecha en texto: "Trelew, 2 de octubre de 2026".
- **Título centrado** (`.documento__titulo`), con mayúscula solo inicial: "Constancia de alumna regular".
- **Trato formal** (sección 12): tercera persona o usted. La herramienta que rodea a la hoja sigue hablando de vos.
- **Las fórmulas de una resolución** (Visto, Considerando, Resuelve, Artículo 1.º) van en mayúsculas, porque así las escribe la norma: es la única mayúscula sostenida del sistema. En el HTML se escriben con mayúscula inicial y las mayúsculas las pone la clase `.documento__formula`, para que el lector de pantalla no las deletree.

### D. Firmas

- Hasta tres en un renglón (`.firmas`). Cada una: 22 mm para firmar y sellar, una línea, el nombre y el cargo.
- **Firma digital** (`.firma--digital`): no hay línea. Un recuadro con el nombre, el cargo y "Firmado digitalmente el 02/10/2026 a las 10:32 h". Se dice con palabras, no con el dibujo de un sello.
- **Una firma nunca queda sola en una hoja:** si no entra, se lleva con ella el final del texto.

### E. Pie de verificación y QR

- Al pie de la hoja (`.verificacion`): dónde se comprueba que el documento es auténtico. **La dirección y el código van escritos**; el QR es un atajo a esa misma dirección.
- El QR mide 20 mm: es el mínimo para escanear en papel con comodidad. Lleva `alt=""`, porque lo que dice ya está en el texto.
- Todo QR del sistema se genera con `herramientas/qr/generar.sh <dirección> <archivo.svg>`: negro sobre blanco, con su margen de 4 módulos y corrección de errores media. La dirección, lo más corta posible: cuanto más corta, más grandes los cuadraditos.
- **En espera desde la 0.4.5:** la pieza está diseñada pero no se usa hasta que exista el servicio que verifica un documento. Los ejemplos de `muestra-documentos.html` la tienen apagada; la dirección de los ejemplos (`verificar.tw.unp.edu.ar`) no existe.

### F. Certificado

- Hoja apaisada con todo centrado (`.certificado`): es el único documento que se centra, como el login entre las pantallas.
- El nombre de la persona en 28 pt; el tipo de certificado en 22 pt.
- Sin marcos, orlas ni fondos (3.G). Lo que lo hace solemne es la hoja, el membrete y el espacio.

### G. Planilla para firmar

- Una tabla común con `.tabla--planilla`: renglones de 10 mm y todas las celdas con borde, para que se vea dónde escribir a mano.
- La cabecera se repite en cada hoja y las filas no se cortan (6.G).

### H. Al imprimir

- **Sale solo la hoja.** En una página que tiene una `.hoja`, al imprimir se esconde todo lo demás: banda, botones, pie. No hay que marcar nada con `.no-imprimir`.
- **El tamaño y la orientación los pone la hoja** (reglas `@page` con nombre): quien imprime no tiene que elegir "apaisado". Chrome, Edge y Firefox lo respetan; en Safari hay que elegir la orientación a mano.
- **Numeración** (`.hoja--numerada`): "Página 2 de 3", abajo a la derecha, para documentos de más de una hoja. Hoy lo dibujan Chrome y Edge; en los demás navegadores la hoja sale sin número.
- **A una tinta** (`.hoja--una-tinta`): el logo cambia por su versión en negro (10.A) y todo lo que era azul pasa a negro.
- **Cortes:** `.salto-pagina` empieza una hoja nueva y `.sin-cortes` evita que un bloque se parta. Sirven en cualquier página, no solo dentro de una hoja.
- **PDF:** el mismo camino. "Imprimir o guardar como PDF" abre la impresión del navegador. Si una herramienta necesita generar el PDF en el servidor, usa esta misma hoja con un navegador sin ventana.

## 19. Mesa de ayuda (nuevo en 0.4.3)

Una mesa de ayuda se arma casi entera con lo que ya hay: la bandeja es una tabla con filtros (7.D, 8.I), el pedido es un formulario (8.F) y su confirmación un comprobante (8.G). Lo único que faltaba es el **historial de una solicitud**: los mensajes que van y vienen, los cambios de estado y los adjuntos. Eso es el módulo `unpsjb-mesa-ayuda.css` (ejemplo: `muestra-mesa-ayuda.html`).

### A. La pantalla de una solicitud

- **El título es el asunto,** escrito por quien pidió ("No funciona el proyector del Aula 102"). Arriba, las migas con el número.
- **Debajo del título, un renglón de estado** (`.solicitud__estado`): la insignia, el número, cuándo se abrió y quién la atiende. Es lo que hay que saber antes de leer.
- **Dos columnas desde 1024px** (`.solicitud`): el historial y la respuesta a la izquierda; la ficha (`.solicitud__ficha`, una lista de resumen) a la derecha. En celular la ficha va al final: lo esencial ya está en el renglón de estado.

### B. El historial

- **De lo más viejo a lo más nuevo,** de arriba hacia abajo, y termina en el cuadro para responder. Lo nuevo aparece donde se está escribiendo.
- **Un título por día** (`.hilo__dia`: "Jueves 1 de octubre") y, debajo, la lista de ese día (`ol.hilo`). Dentro del día va solo la hora.
- **Un mensaje es un bloque** (`.hilo__mensaje`): nombre de quien escribe, su rol en una etiqueta ("Solicitante", "Soporte Informático") y la hora a la derecha. Cada mensaje es un `<article>` con ese nombre: con lector de pantalla se salta de uno a otro.
- **Un cambio es un renglón** (`.hilo__evento`): ícono, qué pasó y la hora. "Martín Evans tomó la solicitud. Estado: En curso". Sin recuadro, para que los mensajes, que son lo que se lee, pesen más que los avisos del sistema.
- **Quién habla se dice con palabras.** No hay globos de chat a izquierda y derecha, ni avatares, ni un color por persona: en una solicitud que pasa por tres personas, el color deja de alcanzar y el rol es lo que importa.
- **Nota interna** (`.hilo__mensaje--nota`): la ve solo el equipo que atiende. Fondo `capa`, y arriba un candado con el texto "Nota interna: no la ve quien solicita". El fondo solo no alcanza: un error ahí manda al solicitante algo que no era para él.
- **Adjuntos:** la lista de archivos de siempre (`.archivos`, 8.J), con el nombre como link y el peso.
- **Lo que escribe la persona entra como texto,** nunca como HTML. Los emojis que escriba se ven con Twemoji (10.D).

### C. Estados de una solicitud

Cinco, con las mismas palabras para quien pide y para quien atiende:

| Estado | Insignia | Ícono | Quiere decir |
|---|---|---|---|
| Nueva | neutra | `inbox` | Entró y nadie la tomó todavía |
| En curso | información | `clock` | Alguien la está atendiendo |
| Esperando respuesta | advertencia | `reply` | Falta que conteste quien la pidió |
| Resuelta | éxito | `circle-check` | Soporte la dio por resuelta; se puede reabrir respondiendo |
| Cerrada | neutra | `archive` | Terminó; para seguir hay que abrir otra |

- "Esperando respuesta" es la única en ámbar: es la que le pide algo a una persona.
- **La prioridad no es un estado** y no lleva semáforo. Va escrita, con su motivo ("Alta: hay un parcial el 02/10 a las 14:00 h"), y la ve solo el equipo.
- **El plazo** se muestra en la ficha con fecha y hora. Si se venció, una insignia de error "Vencida".

### D. Responder

- Al final del historial, en un panel (`form.respuesta`): el cuadro de texto con su label ("Tu respuesta"), los adjuntos y los botones.
- **La ayuda dice a quién le llega:** "La recibe Camila Ñancufil por correo y queda en este historial".
- **Quien atiende elige "Respuesta | Nota interna"** con un segmentado. Al elegir nota interna cambian el label, la ayuda, el fondo del cuadro y el botón ("Guardar nota interna"): cuatro señales, porque equivocarse acá es caro.
- **Botones que dicen lo que hacen:** "Enviar respuesta" (primario) y "Enviar y marcar como resuelta" (secundario, solo para quien atiende).
- Al enviar, el mensaje aparece al final del historial y un toast lo confirma: "Respuesta enviada".
- Una solicitud resuelta no se cierra en el momento: queda unos días abierta a una respuesta, que la reabre.

## 20. Cartelera (nuevo en 0.4.3)

Una tele en un pasillo que muestra las actividades del día. Es la señalética del sistema en sentido literal, y se diseña al revés que una herramienta: se mira **de lejos y de paso**, y **no se toca**. Módulo `unpsjb-cartelera.css`; ejemplos: `muestra-cartelera.html` (la tele) y `muestra-cartelera-celular.html` (la vista de solo lectura a la que lleva el QR).

### A. Medidas para leer de lejos

- **Todo se mide en "u":** una u es un píxel en una tele de 1920 × 1080. En otra resolución (720p, 4K) todo crece o se achica junto, y la pantalla se ve igual.
- **Ninguna letra mide menos de 26 u:** el doble del mínimo de una pantalla de escritorio.

| Pieza | Tamaño |
|---|---|
| Reloj | 72 u, peso 700 |
| Hora de inicio, nombre de la actividad, lugar | 42 a 46 u, peso 700 |
| Lugar de la pantalla (en la banda) | 42 u, Montserrat 700 |
| Fecha | 36 u |
| Hora de fin, tipo de actividad, avisos | 26 a 30 u |
| Código QR | 300 u de lado |

- En una tele de 43 pulgadas, 44 u son letras de unos 15 mm de alto: se leen desde unos 4 metros. Con una tele más chica o un pasillo más largo, conviene probarlo parado donde va a pasar la gente.
- **Margen de 64 u** a los costados: algunas teles recortan los bordes de la imagen.
- **Sin scroll, sin botones, sin links, sin foco.** A pantalla completa tampoco se ve la flecha del mouse.

### B. Qué muestra

- **La banda,** más alta (120 u): el logo, el lugar ("Edificio de Aulas") y, a la derecha, la fecha y la hora. La hora es lo más grande de la pantalla: es lo que se busca primero.
- **La tabla de actividades** (`.cartelera-tabla`), ordenada por hora: hora, actividad y lugar. Es una tabla de verdad.
- **Solo lo que le sirve a quien pasa:** las actividades públicas que están en curso o por empezar. Las que terminaron salen solas. Las tareas internas (mantenimiento) no van.
- **En curso:** la fila lleva fondo `tinte` y la insignia "En curso". **En azul, no en naranja:** el naranja es el foco y "estás acá", y en la tele no hay ninguno de los dos.
- **"Empieza en 15 min"** desde media hora antes.
- **Cambio de aula:** insignia de advertencia, el aula nueva en grande y debajo "Antes: Aula 101".
- **Suspendida:** insignia de error. El nombre se apaga, pero **no se tacha:** se tiene que poder leer qué se suspendió.
- **Avisos** (`.cartelera-aviso`): la misma placa de estado de las herramientas (8.A), con título y una o dos frases. Van arriba del QR.

### C. Cuando no entra todo

- **Las filas se reparten en páginas que rotan solas,** cada 12 segundos. El pie dice "Página 1 de 2".
- Se mide lo que entra: seis filas en una tele horizontal, menos si un nombre ocupa dos renglones. Un nombre largo sigue en otro renglón; no se corta con puntos suspensivos.
- El cambio de página es un corte, sin animación (5.E).
- Los avisos hacen lo mismo: si no entran todos arriba del QR, van por tandas.

### D. El QR y la vista de solo lectura

- **El QR lleva a las mismas actividades en el celular** (`.cartelera-qr`), para quien quiere mirar con calma, buscar su materia o ver otro día. Esa vista (`muestra-cartelera-celular.html`) es una página pública común que usa las piezas de la agenda (`.solo-lectura`): se mira, no se toca. Desde la 0.4.5 se adapta a la pantalla:
  - **En el celular,** el día elegido en lista, con la fila de días arriba.
  - **Desde 768px** (tablet, notebook), el día en grilla con las aulas en columnas, o en lista, y la semana vigente con un día por columna.
  - **Al buscar,** los resultados salen en lista y abarcan toda la semana.
  - Un cambio o una suspensión se dice con ícono y palabras (`.solo-lectura__estado--advertencia`, `--error`), en el color de texto del estado.
- **Mide 300 u:** en una tele de 43 pulgadas son unos 15 cm, que se escanean a un metro y medio. Va siempre negro sobre blanco, con su margen, también con la tele en modo oscuro.
- **Al lado, la dirección escrita,** para quien no puede escanear.
- Se genera con `herramientas/qr/generar.sh` (18.E). **El de los ejemplos es de prueba:** la dirección `agenda.tw.unp.edu.ar/hoy` todavía no existe. Cuando esté la definitiva, se corre el script y se reemplaza el archivo.
- **La vista de solo lectura** es una página pública común (17.B): la banda, un contenedor angosto y el pie de páginas públicas. Usa la lista y la fila de días del módulo de agenda (16.A), dentro de `.solo-lectura`.
  - **No pide cuenta** y no tiene nada para reservar ni cambiar. Las actividades no son links.
  - Tiene un **buscador** por materia o aula, que no distingue tildes.
  - Muestra el día completo, con las mismas palabras de la tele: "En curso", "Empieza en 15 min", "Cambio de aula", "Suspendida", y además "Terminó".
  - Abajo dice de cuándo son los datos y dónde se reserva.

### E. Cuando algo falla

- **Sin actividades:** lo dice en grande ("No hay más actividades por hoy") y avisa cuál es la próxima. Nunca una tabla vacía.
- **Sin conexión:** la tele sigue mostrando lo último que recibió y **lo dice en el pie,** con ícono y palabras: "Sin conexión. Se muestran los datos de las 9:40 h". Una cartelera con datos viejos y sin aviso es peor que una apagada.
- El pie dice siempre a qué hora se actualizó.

### F. Tema y orientación

- **Claro u oscuro, fijo por pantalla.** La tele no tiene dónde elegirlo: se pone en la dirección (`?tema=oscuro`). Claro para pasillos con luz de día; oscuro para lugares con poca luz. La banda no cambia.
- **Tele en vertical:** la u pasa a medirse sobre 1080 de ancho; la tabla ocupa todo el ancho y los avisos y el QR van abajo.

### G. Lo que no va

| No va | Por qué |
|---|---|
| Animaciones, texto que corre, transiciones entre páginas | El movimiento sin motivo cansa y distrae en un pasillo (5.E) |
| Video o fotos de fondo | Fondos limpios (3.G); y bajan el contraste del texto |
| Algo que haya que tocar | Nadie se acerca a una tele a hacer clic; para eso está el QR |
| La grilla de la agenda | Es para comparar aulas sentado frente a una pantalla, no para leer de paso |
| Más de dos avisos largos | Lo que no se lee en diez segundos, no se lee |

## 21. Planos (nuevo en 0.4.4)

Las plantas de un edificio con lo que se marca encima: **antenas de wifi** (puntos) y **aulas** (zonas). Sirve cuando lo que importa es **dónde** está algo. Módulo: `unpsjb-planos.css` (11 KB) y `unpsjb-planos.js` (31 KB; 10 KB comprimido). Ejemplo: `muestra-planos.html`.

El plano muestra **el estado de ahora**. Para elegir un aula y un horario está la agenda (16.A): desde el aula elegida se llega a su agenda con un enlace (`data-agenda`).

### A. El dibujo

- **El plano es el fondo: va en neutros.** Muros en `tinta-2`, el resto (escaleras, cotas, mobiliario) en `linea-control`. **Nunca con los colores de CAD** (rojo, verde, cian, amarillo puros): chocan con el semáforo y no se ven en modo oscuro. El color queda para lo que se marca encima.
- **Es un SVG de solo trazos,** con tres clases: `.plano-trazo` (muros, columnas, aberturas), `.plano-trazo--suave` (lo demás) y `.plano-trazo--rotulo` (los nombres escritos en el plano original). El color lo pone la hoja con `currentColor`; el archivo no trae colores.
- **Nunca una imagen** (PNG, JPG) ni un PDF incrustado: se pixelan al acercar, no cambian con el tema y pesan más.
- **Las líneas no engordan al acercar:** miden 1px a cualquier distancia. Es un plano, no una foto.
- **Cómo se obtiene:** de un PDF de AutoCAD, con `pdftocairo -svg` y un paso de limpieza que cambia los colores por las tres clases, junta los trazos y recorta la hoja. Cada herramienta guarda su conversor junto a sus planos (el de Trelew: `herramientas/limpiar_svg.py`). Un plano de 9.000 trazos queda en menos de 500 KB (130 KB comprimido), y se trae solo la planta que se mira.
- El rótulo de la hoja ("PLANTA BAJA") se quita del dibujo: el nombre de la planta lo dice la pantalla.

### B. La pantalla

| Pieza | Clase | Regla |
|---|---|---|
| Barra | `.plano__barra` | Las plantas (segmentado) a la izquierda; "Plano \| Lista" último, contra el borde derecho. En el medio, lo que aparece y desaparece: las capas (casillas "Antenas", "Aulas") y acercar. |
| Lienzo | `.plano__lienzo` | Fondo `panel`, borde `linea`. El alto sale de la proporción del plano, sin pasar del 70 % de la ventana: la página se puede seguir moviendo por fuera. |
| Detalle | `.plano__detalle` | Un panel fijo al costado (280px; debajo, con menos de 1024px) con la ficha de lo elegido, en una lista de resumen (7.L). **Sin cartel flotante** (7.P). |
| Referencias | `.plano__referencias` | Debajo del plano: el ícono de cada estado con su nombre. Solo los que hay en esa planta. |
| Lista | `.plano__lista` | Una tabla de antenas y otra de aulas de la planta, con los mismos datos. |

- **Mover y acercar no dependen de arrastrar** (WCAG 2.2, 2.5.7). Se puede arrastrar y pellizcar, pero están siempre los botones "Acercar", "Alejar" y "Ver todo", y el teclado: con `Tab` se llega al plano, las flechas lo mueven, `+` y `−` acercan y alejan, y `0` muestra todo.
- **La rueda del mouse sola mueve la página,** no el plano: si no, al bajar por la pantalla el plano atrapa el scroll. Para acercar con la rueda, `Ctrl` + rueda. Debajo del plano hay una nota fija que lo dice.
- **"Ver todo" es un botón con texto,** no el ícono `maximize`: ese ícono ya significa "pantalla completa" en el visor de cámaras (16.B).
- **Todo plano tiene su lista,** igual que todo gráfico tiene su tabla (15.D). Es la forma de usarlo con lector de pantalla y **en celular, donde se abre primero la lista**. El nombre de cada fila es un botón con aspecto de enlace que la elige.
- **La planta y lo elegido van en la dirección** (`#planta=pb&antena=ap-03`), para poder mandarle a alguien el enlace a una antena.
- El dibujo lleva `aria-hidden`: para el lector de pantalla, lo que informa son los botones y la lista.

### C. Antenas

Cada antena es un **botón** (`.plano-marca`): un círculo de 26px, fondo `panel`, con **el dibujo de su equipo** adentro y el borde del color de su estado. Mide lo mismo a cualquier distancia, y el área para el dedo es de 44px.

| Equipo (`"equipo"`) | Dibujo |
|---|---|
| De plato (`plato`) | Redonda, de techo: dos círculos |
| Exterior (`exterior`) | Rectangular, de bordes redondeados |
| Módem o router (`router`) | Una caja con dos antenas |
| Sin dato | El ícono `wifi` |

Los tres dibujos son propios del módulo (Lucide no los tiene), con su mismo trazo. Dicen qué buscar en el techo o en la pared.

| Estado | Borde | Aviso en la esquina |
|---|---|---|
| Activa | `exito-texto` | Ninguno |
| Sin conexión | `error-texto` | `x` |
| En mantenimiento | `advertencia-texto` | `wrench` |

- **El estado no va solo en el color:** la que no está activa lleva un aviso de 14px en la esquina, con su ícono (`.plano-marca__aviso`). El nombre del botón lo dice entero ("Antena AP Hall, sin conexión"), y en el panel y en la lista va la insignia con texto.
- Las referencias de abajo del plano muestran la misma marca, con su nombre.
- **La elegida lleva un aro `primario-texto`** alrededor y conserva el color de su estado. **No naranja:** el naranja es el foco del teclado y "estás acá".
- **Un clic en un lugar vacío del plano cierra la ficha** de lo elegido.
- Sin puntos que laten ni círculos de alcance: el alcance real de una antena no es un círculo, y dibujarlo promete una cobertura que nadie midió.
- **La IP (`"ip"`) es opcional** y se muestra en el panel y en la lista. Solo se carga si la herramienta se ve **únicamente desde la red interna**. Claves y contraseñas, nunca.

### D. Aulas

Cada aula es una **zona** (`.plano-zona`, un polígono) con su **rótulo** (`.plano-rotulo`, un botón): ícono, nombre y estado.

| Estado | Ícono | Zona |
|---|---|---|
| Libre | `check` | `exito-texto`: borde y relleno al 10 % |
| Ocupada | `clock` | `tinta-2`: borde y relleno al 22 %. **No en rojo:** un aula ocupada no es un error |
| Sin dato | `square` | `primario-texto`: borde y relleno al 10 % |

- El texto dice hasta cuándo, si se sabe: "Ocupada hasta las 16:00", "Libre hasta las 14:00".
- **El rótulo nunca se sale de su aula.** Si no entra entero, se acorta de a un paso: sin el estado (`--medio`), solo el nombre (`--corto`), solo el ícono (`--chico`). Lo que deja de verse sigue en el nombre del botón, en el panel y en la lista. Al acercar, vuelve.
- **No todo lo que tiene nombre se reserva.** La biblioteca, una oficina o un laboratorio de investigación también se marcan, para ubicarse, pero **sin estado**: llevan `"reservable": false` y `"tipo"` ("Oficina", "Laboratorio"…). Se dibujan más suaves (`.plano-zona--fija`, en `linea-control`), con el nombre solo, y en la lista dicen su tipo.
- La zona también responde al clic, pero es un **atajo para el mouse**: con el teclado se llega al rótulo.
- Sin tramas de relleno (15.C). La elegida lleva el borde `primario-texto` de 3px.
- **El estado es un dato aparte** (`data-ocupacion`): el plano no sabe de reservas. Quien tenga las reservas arma `{ "id-del-aula": { "estado": "ocupada", "hasta": "16:00", "evento": "Álgebra I" } }` y se lo pasa (`plano.ocupacion(datos)`), sin volver a cargar la pantalla. Un aula que no figura queda "Sin dato".

### E. Los datos

Un solo archivo con las plantas, las antenas y las aulas (todos los espacios con nombre); las posiciones van en las unidades del `viewBox` de cada dibujo. El formato completo está al principio de `unpsjb-planos.js`.

- **El dibujo conserva las coordenadas de la hoja original** (su `viewBox` no arranca en cero). Así se puede **simplificar un plano** (quitarle una parte que no interesa) o volver a una versión más completa sin mover nada de lo marcado. Cada versión anterior de un plano se guarda: nunca se pisa.
- Un espacio sin `puntos` figura en la lista pero no en el plano: sirve para cargar primero los nombres y ubicarlos después.
- **El identificador de un aula no se cambia** una vez que lo usan las reservas: es lo que une el plano con la agenda. El nombre sí.
- **Editar las posiciones es cosa de cada herramienta,** no del módulo: el módulo avisa dónde se hizo clic (`plano:clic`), deja sumar un formulario al panel (`plano:detalle`) y se vuelve a pintar (`plano.pintar()`). Un editor nunca depende solo de arrastrar: ofrece también "reubicar" con un clic y campos con la posición.
- En React se puede usar el mismo script (`unpsjbPlanos.dibujar(elemento, datos)`) o armar un componente con estas clases.

### F. Lo que no va

| No va | Por qué |
|---|---|
| El plano con los colores de CAD, o como imagen | No funciona en oscuro, choca con el semáforo y se pixela (21.A) |
| Cartel flotante al pasar el mouse | No existe en celular y tapa el plano (7.P): va el panel de detalle |
| Mapa de calor o círculos de cobertura | Inventan una precisión que los datos no tienen |
| Un mapa de calles de fondo (Leaflet, Google Maps) | Adentro de un edificio no aporta, y suma cientos de KB y un servicio externo |
| Naranja para lo elegido | El naranja es foco y "estás acá" (sección 1) |
| El estado solo con color | Siempre ícono y texto (3.E) |
| Elegir horarios sobre el plano | Para eso está la agenda (16.A); el plano enlaza a ella |
