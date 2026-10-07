# Renombres: todo el código en español

**Aplicado el 2026-10-01 en la versión 0.3.2**, con las cuatro opciones recomendadas. Este archivo queda como guía de migración: nombre anterior a la izquierda, nombre actual a la derecha.

Hoy los nombres del código mezclan inglés y español (`.btn-primary` junto a `.banda`, `--color-success` junto a `--color-fondo`). Esta tabla lleva todo al español antes de la 1.0.0, que es cuando renombrar empieza a costar.

- **Clases:** 133 en total. Cambian 31, se elimina 1 y quedan igual 101.
- **Variables:** 76 en total. Cambian 46 y quedan igual 30.
- **Atributos:** cambian 2 (más los valores del tema).

Comprobado con un script sobre la hoja real: cada nombre viejo de la tabla existe, no hay dos nombres nuevos iguales y ningún nombre nuevo choca con uno que queda.

## La regla

1. **Cada cosa se llama como la nombra `DESIGN.md`.** Si el documento dice "Menú inferior", la clase es `.menu-inferior`. Si dice "botón destructivo", es `.boton--destructivo`.
2. **Sin tildes ni eñes** en el código (`.paginacion`, `.pestanas`), como hasta ahora.
3. **Una sola forma:** `componente`, `componente--variante`, `componente__parte`. Ejemplo: `.aviso`, `.aviso--error`, `.aviso__titulo`.

## Las cuatro decisiones

Se aplicó la opción recomendada en las cuatro.

### 1. Las variantes de los botones, con dos guiones (marcadas con † en la tabla)

Hoy casi todo usa dos guiones para las variantes (`.aviso--error`, `.tabla--fija`), pero los botones, los íconos y algunos más usan uno (`.btn-primary`, `.icono-sm`). Como ya hay que renombrarlos, propongo emparejarlos: `.boton--primario`, `.icono--chico`.

- **Aplicado:** dos guiones en todos. Una sola forma para adivinar.
- **Descartado:** un guion (`.boton-primario`). Más corto, pero quedan dos formas.

### 2. Palabras que quedan en inglés

- **Nombres de etiquetas HTML:** `.input`, `.select`, `.textarea` y `.label`. Son literalmente la etiqueta a la que se aplican (`<input class="input">`), así que no hay nada que traducir. Además, "etiqueta" va a hacer falta para otro componente (las etiquetas de clasificación de la ronda 3).
- **Préstamos que `DESIGN.md` usa tal cual:** `toast`, `chip`, `modal` y `hover`.
- **Aplicado:** dejarlos. La alternativa obliga a inventar palabras (`.entrada`, `.rotulo`, `.confirmacion`) que nadie del equipo usa al hablar.

### 3. El atributo del tema

Hoy es `data-theme="light"` o `"dark"`, y eso mismo se guarda en el navegador (clave `unpsjb-tema`).

- **Aplicado:** `data-tema="claro"` y `"oscuro"`. Cambia también el script de una línea del `<head>`.
- No cambian `prefers-color-scheme` ni `color-scheme`: son del lenguaje CSS.

### 4. `.banda__nav`

Son las pestañas sobre la banda azul, obsoletas desde la 0.3 y con fecha de baja en la 1.0.0.

- **Aplicado:** eliminarla ahora. Ninguna herramienta la usa y evita renombrar algo que se va a borrar.

## Clases que cambian

### Botones

| Antes | Ahora | Nota |
|---|---|---|
| `.btn` | `.boton` |  |
| `.btn-primary` | `.boton--primario` | † |
| `.btn-secondary` | `.boton--secundario` | † |
| `.btn-quiet` | `.boton--tranquilo` | † Así lo llama DESIGN.md: "Tranquilo" |
| `.btn-danger` | `.boton--destructivo` | † Así lo llama DESIGN.md: "Destructivo" |
| `.btn-icon` | `.boton--icono` | † |
| `.btn-compacto` | `.boton--compacto` | † |

### Estructura y navegación

| Antes | Ahora | Nota |
|---|---|---|
| `.container` | `.contenedor` |  |
| `.container--ancho` | `.contenedor--ancho` |  |
| `.container--angosto` | `.contenedor--angosto` |  |
| `.nav-inferior` | `.menu-inferior` | DESIGN.md lo llama "Menú inferior" |
| `.nav-lateral` | `.menu-lateral` | DESIGN.md lo llama "Menú lateral" |
| `.tabla-wrap` | `.tabla-marco` | El contenedor con borde y scroll de la tabla |
| `.banda__nav` | **se elimina** | Obsoleta desde la 0.3. Se elimina ahora en lugar de esperar a la 1.0.0 |

### Formularios, íconos e insignias

| Antes | Ahora | Nota |
|---|---|---|
| `.check` | `.casilla` | Sirve para casillas y radios |
| `.icono-sm` | `.icono--chico` | † 16px |
| `.icono-md` | `.icono--mediano` | † 20px |
| `.icono-lg` | `.icono--grande` | † 32px |
| `.insignia--aviso` | `.insignia--advertencia` | Igual que `.aviso--advertencia` y `.toast--advertencia` |

### Texto

| Antes | Ahora | Nota |
|---|---|---|
| `.text-display` | `.texto-titulo-1` | 32px, título de la pantalla |
| `.text-headline` | `.texto-titulo-2` | 24px, secciones |
| `.text-title` | `.texto-titulo-3` | 19px, paneles y modales |
| `.text-body-lg` | `.texto-grande` | 18px, lectura larga |
| `.text-label` | `.texto-label` | 15px; "label" queda (ver excepciones) |
| `.text-meta` | `.texto-detalle` | 14px, metadatos y ayudas |
| `.text-caption` | `.texto-nota` | 13px, pie y notas |
| `.text-secundario` | `.texto-secundario` |  |
| `.font-academica` | `.fuente-academica` |  |
| `.visually-hidden` | `.solo-lector` | Texto que solo escucha el lector de pantalla |

### Inteligencia artificial

| Antes | Ahora | Nota |
|---|---|---|
| `.ia-panel` | `.panel-ia` | Orden del español |
| `.ia-panel__marca` | `.panel-ia__marca` |  |
| `.ia-panel__acciones` | `.panel-ia__acciones` |  |

## Variables que cambian

### Color

| Antes | Ahora | Nota |
|---|---|---|
| `--color-primary` | `--color-primario` |  |
| `--color-primary-hover` | `--color-primario-hover` | "hover" queda (decisión 2). Hoy está definida pero ya no se usa: se puede eliminar |
| `--color-primary-text` | `--color-primario-texto` | Azul para texto y links |
| `--color-primary-fill` | `--color-primario-relleno` | Relleno del botón primario |
| `--color-primary-fill-hover` | `--color-primario-relleno-hover` |  |
| `--color-accent` | `--color-acento` | El naranja "estás acá" |
| `--color-success` | `--color-exito` |  |
| `--color-success-text` | `--color-exito-texto` |  |
| `--color-warning` | `--color-advertencia` |  |
| `--color-warning-text` | `--color-advertencia-texto` |  |
| `--color-error-text` | `--color-error-texto` |  |
| `--color-backdrop` | `--color-velo` | El oscurecido detrás de un modal |
| `--color-toast-bg` | `--color-toast-fondo` |  |
| `--color-toast-text` | `--color-toast-texto` |  |
| `--color-toast-success` | `--color-toast-exito` |  |
| `--color-toast-warning` | `--color-toast-advertencia` |  |

### Espaciado, radios y tamaños

| Antes | Ahora | Nota |
|---|---|---|
| `--space-1` | `--espacio-1` | 4px |
| `--space-2` | `--espacio-2` | 8px |
| `--space-3` | `--espacio-3` | 12px |
| `--space-4` | `--espacio-4` | 16px |
| `--space-6` | `--espacio-6` | 24px |
| `--space-8` | `--espacio-8` | 32px |
| `--space-12` | `--espacio-12` | 48px |
| `--space-16` | `--espacio-16` | 64px |
| `--radius-control` | `--radio-control` | 4px |
| `--radius-contenedor` | `--radio-contenedor` | 8px |
| `--radius-full` | `--radio-completo` | Solo avatares |
| `--size-control` | `--alto-control` | 44px. Es un alto, como `--alto-banda` |
| `--size-control-compacto` | `--alto-control-compacto` | 36px |
| `--size-banda` | `--alto-banda-min` | Alto mínimo de la banda; no confundir con `--alto-banda` |
| `--size-subbarra` | `--alto-subbarra` | 48px |
| `--alto-nav-inferior` | `--alto-menu-inferior` | Acompaña a `.menu-inferior` |

### Tipografía

| Antes | Ahora | Nota |
|---|---|---|
| `--font-titulo` | `--fuente-titulo` |  |
| `--font-texto` | `--fuente-texto` |  |
| `--font-academica` | `--fuente-academica` |  |
| `--text-display` | `--texto-titulo-1` |  |
| `--text-headline` | `--texto-titulo-2` |  |
| `--text-title` | `--texto-titulo-3` |  |
| `--text-body-lg` | `--texto-grande` |  |
| `--text-body-md` | `--texto-base` | 16px, el texto general |
| `--text-label` | `--texto-label` |  |
| `--text-meta` | `--texto-detalle` |  |
| `--text-caption` | `--texto-nota` |  |

### Foco y movimiento

| Antes | Ahora | Nota |
|---|---|---|
| `--focus-ring` | `--anillo-foco` |  |
| `--dur-rapido` | `--duracion-rapida` | 120ms |
| `--dur-normal` | `--duracion-normal` | 180ms |

## Atributos y valores

| Antes | Ahora | Nota |
|---|---|---|
| `data-theme="light"` | `data-tema="claro"` | Decisión 3 |
| `data-theme="dark"` | `data-tema="oscuro"` | Decisión 3. También el valor guardado en `unpsjb-tema` |
| `data-label="Fecha"` | `data-columna="Fecha"` | En las tablas que pasan a tarjetas: dice a qué columna pertenece la celda |
| `UNPSJB_AI_PROXY_URL` | `UNPSJB_URL_PROXY_IA` | La constante de JavaScript de la sección 11 |

## Nombres de los tokens en el encabezado de `DESIGN.md`

El encabezado (lo que está entre `---`) repite los tokens para que lo lean las herramientas. Las claves de primer nivel (`colors`, `typography`, `rounded`, `spacing`) y las propiedades (`fontFamily`, `fontSize`) son del formato y no se tocan. Los nombres de adentro sí:

| Antes | Ahora |
|---|---|
| `primary`, `primary-hover`, `accent` | `primario`, `primario-hover`, `acento` |
| `success`, `warning`, `warning-text`, `error-text` | `exito`, `advertencia`, `advertencia-texto`, `error-texto` |
| `dark-fondo`, `dark-panel`, `dark-primary-text`… | `oscuro-fondo`, `oscuro-panel`, `oscuro-primario-texto`… |
| `display`, `headline`, `title` | `titulo-1`, `titulo-2`, `titulo-3` |
| `body-lg`, `body-md` | `texto-grande`, `texto-base` |
| `label` | `label` (queda) |
| `meta`, `caption` | `detalle`, `nota` |
| `rounded: full` | `completo` |

## Lo que queda igual

**Clases (101):** `.archivo`, `.archivos`, `.archivos__nombre`, `.archivos__peso`, `.aviso`, `.aviso--advertencia`, `.aviso--error`, `.aviso--exito`, `.aviso__accion`, `.aviso__cuerpo`, `.aviso__placa`, `.aviso__titulo`, `.ayuda`, `.banda`, `.banda__acciones`, `.banda__fila`, `.banda__herramienta`, `.banda__logo`, `.banda__logo--escritorio`, `.banda__logo--movil`, `.buscador`, `.cabecera`, `.campo`, `.campo-error`, `.cat-1`, `.cat-2`, `.cat-3`, `.cat-4`, `.cat-5`, `.categoria`, `.chip`, `.chips`, `.chips__total`, `.comprobante`, `.comprobante__numero`, `.comprobante__titulo`, `.encabezado`, `.esqueleto`, `.fila`, `.filtros`, `.grilla`, `.grilla--2`, `.grilla--3`, `.grilla--4`, `.grilla--compacta`, `.grilla--lateral`, `.grilla__completa`, `.grupo`, `.grupo-campos`, `.grupo-campos--fila`, `.icono`, `.input`, `.insignia`, `.insignia--error`, `.insignia--exito`, `.insignia--info`, `.interruptor`, `.label`, `.migas`, `.modal`, `.modal--inferior`, `.modal__acciones`, `.modal__titulo`, `.no-imprimir`, `.num`, `.opcional`, `.pagina-error`, `.pagina-error__codigo`, `.paginacion`, `.paginacion__paso`, `.paginacion__resumen`, `.panel`, `.panel__cabecera`, `.pasos`, `.pasos__barra`, `.pasos__texto`, `.pestanas`, `.pestanas__item`, `.pie`, `.pie__derecha`, `.revision`, `.revision__cabecera`, `.saltar`, `.secciones`, `.secciones__lista`, `.segmentado`, `.segmentado--compacto`, `.select`, `.selector-tema`, `.solo-impresion`, `.tabla`, `.tabla--compacta`, `.tabla--fija`, `.tabla--tarjetas`, `.textarea`, `.toast`, `.toast--advertencia`, `.toast--exito`, `.toasts`, `.vacio`, `.vacio__titulo`

**Variables (30):** `--alto-banda`, `--alto-cabecera`, `--aviso-color`, `--aviso-icono`, `--cat`, `--color-banda`, `--color-capa`, `--color-cat-1`, `--color-cat-2`, `--color-cat-3`, `--color-cat-4`, `--color-cat-5`, `--color-error`, `--color-error-hover`, `--color-fondo`, `--color-info`, `--color-linea`, `--color-linea-control`, `--color-panel`, `--color-sobre-banda`, `--color-sobre-banda-2`, `--color-tinta`, `--color-tinta-2`, `--color-tinte`, `--color-toast-error`, `--curva`, `--grilla-min`, `--medida-lectura`, `--sombra-flotante`, `--tabla-fija-max`

## Cómo se aplicó

- Se tocaron `unpsjb.css`, `DESIGN.md`, `muestra.html`, la página de comparación `comparar-v3.1.html` (que le manda el tema a la muestra) y el archivo de la skill.
- Los archivos guardados de borradores anteriores (`-v1`, `-v2`, `-v3.0`) no se tocaron: siguen funcionando con sus nombres viejos.
- Es la **0.3.2**: cambia el HTML de todo lo que use el sistema. El `CHANGELOG.md` remite a esta tabla como guía de migración.
- No cambió nada de lo que se ve. Se compararon capturas de antes y después (celular completo en claro y oscuro, escritorio y las 11 hojas impresas): las únicas diferencias son el número de versión del pie y un texto de la muestra que nombra `.fuente-academica`.
- Una excepción que apareció al aplicar: en `DESIGN.md`, la mención a `.btn-primary` de la sección de SIU es la clase de Bootstrap, no la nuestra, y quedó como estaba.
