# Registro de cambios · Sistema de Diseño UNPSJB

`DESIGN.md` y `unpsjb.css` llevan el mismo número de versión (`MAYOR.MENOR.ARREGLO`). Cada versión se ordena en: **Nuevo**, **Cambiado**, **Obsoleto** (sigue funcionando, se quita en la próxima versión mayor), **Eliminado** y **Corregido**. Ver `DESIGN.md`, sección 14.

**Sobre los números.** El primer número es **0** porque el sistema todavía no se publicó en el servidor ni lo usa ninguna herramienta: hasta ahora hubo borradores de diseño, no versiones publicadas. La **1.0.0** va a ser la primera que se publique. El 1 de octubre de 2026 se renumeró todo el registro para que diga eso:

| Borrador | Se llamó | Ahora es |
|---|---|---|
| v1 | 1.0.0 (en su hoja de estilos ya decía 0.1.0) | **0.1.0** |
| v2 "Señalética" | 2.1.0 | **0.2.1** |
| v3, propuesta | 3.0.0 | **0.3.0** |
| v3 con las correcciones | 3.1.0 | **0.3.1** |
| El mismo, con el código en español | 0.4.0 (unas horas) | **0.3.2** |
| Agregados de la ronda 3 | — | **0.4.0** |
| Módulos de agenda y de video | — | **0.4.1** |
| Ajustes a los dos módulos después de la primera revisión | — | **0.4.2** |
| Módulos de documentos, gráficos de líneas, mesa de ayuda y cartelera | — | **0.4.3** |

Las entradas anteriores a la 0.3.2 nombran las clases y variables como se llamaban entonces (en inglés y español mezclados). La equivalencia está en `RENOMBRES.md`.

Los nombres de archivo con `-v1`, `-v2` y `-v3.0` no cambiaron: nombran borradores. En `BITACORA.md` y `FEEDBACK-NOTEBOOK.md`, lo escrito antes de esa fecha conserva los números viejos.

## 0.4.3 · 2026-10-02 · oficial

Cuatro módulos nuevos. Sube el último número: son agregados, y nada de lo anterior cambia. `unpsjb.css` no cambia (solo su número), y los módulos de agenda y de video tampoco: siguen como en la 0.4.2.

### Nuevo

- **Módulo de documentos e impresión:** `unpsjb-documentos.css` (16 KB) y `muestra-documentos.html`. La hoja A4 que se ve en pantalla igual que impresa (`.hoja`, `.hoja--apaisada`, `.hoja--numerada`, `.hoja--una-tinta`), membrete, partes del documento, firmas (a mano y digital), pie de verificación con QR, certificado y planilla para firmar. Al imprimir una página que tiene una hoja, sale solo la hoja. Utilidades `.salto-pagina` y `.sin-cortes`. Reglas: `DESIGN.md`, sección 18.
- **Módulo de gráficos de líneas:** `unpsjb-graficos.css` (5 KB), `unpsjb-graficos.js` (16 KB; 6 KB comprimido) y `muestra-graficos.html`. El gráfico se dibuja a partir de una tabla (`data-grafico="lineas"`), con la lectura fija arriba, recorrido con teclado y selector "Gráfico | Tabla". Cierra el pendiente de la 0.4.0. Reglas: 15.E.
- **Módulo de mesa de ayuda:** `unpsjb-mesa-ayuda.css` (8 KB) y `muestra-mesa-ayuda.html`. El historial de una solicitud (`.hilo`: mensajes, cambios de estado, notas internas, adjuntos), la pantalla de una solicitud (`.solicitud`) y la respuesta (`.respuesta`). Los cinco estados de una solicitud. Reglas: sección 19.
- **Módulo de cartelera:** `unpsjb-cartelera.css` (16 KB), `muestra-cartelera.html` (la tele) y `muestra-cartelera-celular.html` (la vista de solo lectura a la que lleva el QR). Todo medido en "u" (un píxel a 1920 × 1080), páginas que rotan solas, avisos, QR, estados sin actividades y sin conexión, tele en vertical. Reglas: sección 20.
- **Logo a una tinta:** `assets/logo-unpsjb-trelew-una-tinta.svg`, generado por `logo/generar.sh`. Cierra el pendiente del logo monocromo (10.A). Los otros cuatro logos salen idénticos, byte a byte.
- **Generador de QR:** `qr/generar.sh <dirección> <archivo.svg>`. Lo usan la cartelera y el pie de verificación de los documentos. Dos QR de ejemplo en `assets/` (`qr-ejemplo-cartelera.svg` y `qr-ejemplo-documento.svg`): sus direcciones no existen todavía.

### Cambiado

- `DESIGN.md`: la tabla de módulos (sección 16) lista los seis; 7.P aclara que el historial de mensajes no es la "línea de tiempo de un trámite" que no se agrega, y que en los gráficos la lectura fija reemplaza al tooltip; 13 suma cinco pares de hacer y no hacer.
- `DESIGN.md`, encabezado: se declaran los cuatro **colores de papel** (`papel`, `papel-tinta`, `papel-tinta-2`, `papel-linea`). No son nuevos: son los que `unpsjb.css` usa al imprimir desde la 0.2, y ahora también los de la hoja.
- `.impeccable/config.json`: se anotaron como excepción la serif de los documentos (ya permitida en 4.A) y los falsos positivos del detector en las cinco páginas nuevas (relleno, jerarquía de tamaños, interlineado y radios mal leídos de `calc()`).

### Pendiente

- **Módulo de correo:** falta confirmar qué es. Ayer se planteó como plantilla para los avisos automáticos de las herramientas; después se pidió como generador para escribir un correo con diseño institucional y pegarlo en Gmail. Son dos piezas distintas con la misma base.
- **Documentos:** confirmar los márgenes de la hoja (hoy 20, 20, 20 y 30 mm) con la norma de la universidad, si la hay; el servicio que verifica un documento por código; confirmar el logo a una tinta con quien maneja la marca.
- **Cartelera:** la dirección definitiva de la vista para el celular, para generar el QR real; probar en la tele que se vaya a usar (tamaño de letra a la distancia real, recorte de bordes) y cómo se deja el navegador a pantalla completa.
- **Gráficos:** la numeración de páginas y el retrazado al imprimir se probaron solo en Chrome.
- Las páginas de ejemplo tienen los datos escritos a mano. Falta armarlas en React con datos reales.

## 0.4.2 · 2026-10-02 · anterior

Ajustes a los dos módulos después de la primera revisión. `unpsjb.css` no cambia (solo su número). Quien ya usa las clases de la 0.4.1 tiene que revisar los tres puntos de **Cambiado** que tocan el HTML.

### Nuevo

- **Visor: el muro entra entero en la ventana,** con 1, 4 o 9 cámaras, sin scroll (desde 768px de ancho). Las celdas siguen en 16:9; el ancho del muro se calcula con el alto libre. La página le pasa a la hoja dónde empieza el muro, en `--visor-arriba`.
- **Visor: botón "Pantalla completa".** Pone la página en pantalla completa y esconde la cabecera, el banner de fase y el menú inferior.
- **Visor: `.encabezado--visor`** (encabezado más bajo), **`.camaras-panel`** (la lista de cámaras, que se pliega con menos de 1024px) y **`.camara__estado`** (el texto del estado, que en celdas de menos de 300px queda solo para el lector de pantalla).
- **Agenda: pasar de una vista a otra tocando lo que se quiere ver.** En Mes, una columna "Semana" a la izquierda abre cada semana (`.agenda-mes__semanas`, `.agenda-mes__semana`), y el número del día abre ese día. En Semana, el nombre del día abre ese día; en Día, el nombre del aula abre su semana (`.agenda-grilla__ir`).
- **Agenda: placa del aula** (`.agenda-aula`) en la vista Semana, con la etiqueta "Aula" a la vista, los datos del aula y la frase "La semana muestra un aula por vez".
- En `muestra-agenda.html`, las flechas y los saltos entre vistas funcionan (dentro de octubre de 2026). Los eventos de ejemplo son siempre los mismos.

### Cambiado

- **Agenda, barra:** "Día | Semana | Mes" va último, contra el borde derecho, y "Grilla | Lista" a su izquierda. Antes, al entrar o salir de Mes, el selector de período se corría. **Hay que cambiar el orden en el HTML.**
- **Agenda, flechas:** las dos van juntas, antes del título (en celular el título sigue entre las dos). **Hay que cambiar el orden en el HTML.**
- **Agenda, aula de la vista Semana:** sale de la barra y pasa a `.agenda-aula`. La regla `.agenda-barra .select` ya no existe.
- **Agenda, Mes:** la tabla tiene una columna más (la de semanas) y su ancho mínimo pasa de 720 a 800px.
- **Visor, estado de cada cámara:** el texto va en `<span class="camara__estado">`, y la explicación de "Sin señal" en un `<span>`. **Hay que agregarlos en el HTML** para que las celdas chicas se acomoden.
- **Visor, lista de cámaras:** va dentro de `details.acordeon.camaras-panel`. En pantallas de menos de 1024px arranca plegada, con el muro a la vista. Resuelve el pendiente de la 0.4.1.
- **Visor, ícono de "Ampliar" una cámara:** `maximize-2`. `maximize` queda para la pantalla completa.

### Pendiente

- **Tramos de grabación por cámara:** falta ver si el grabador entrega, por cada cámara, los tramos con grabación. La línea de tiempo no se tocó.
- **Muro de 9 en una notebook** (ventana de unos 640px de alto): entra, pero cada cámara mide unos 140px de ancho. En pantalla completa, unos 300px. Para agrandarlas sin pantalla completa habría que poner el nombre y el estado encima del video, que hoy la regla no permite.

## 0.4.1 · 2026-10-01 · anterior

Los dos módulos que en la 0.4.0 estaban solo como reglas. Sube el último número: son agregados, y nada de lo anterior cambia.

### Nuevo

- **Módulo de agenda de aulas:** `unpsjb-agenda.css` (14 KB) y su ejemplo `muestra-agenda.html`. Grilla por horas en vista Día y Semana, vista Mes, lista, fila de días para celular, marca "Hoy", línea de la hora actual y conflictos de aula.
- **Módulo de video:** `unpsjb-video.css` (8 KB) y su ejemplo `muestra-video.html`. Muro de 1, 4 o 9 cámaras, estados con ícono y texto, celda "Sin señal", lista de cámaras y línea de tiempo de grabaciones.
- Los módulos se cargan **después** de `unpsjb.css` y usan sus tokens. `DESIGN.md`, sección 16, pasó de reglas a documentación de lo hecho.

### Cambiado

- **`[hidden]` esconde siempre** (`display: none !important` en `unpsjb.css`). Antes, un componente con su propio `display` (por ejemplo un segmentado) seguía visible aunque llevara el atributo `hidden`.
- **Agenda, celdas libres:** la regla decía "la celda es un botón Reservar". Quedó como atajo para el mouse (`tabindex="-1"`); con teclado se reserva desde el botón "Reservar aula". Si no, había una parada de `Tab` por cada hora libre.
- **Agenda, línea de la hora actual:** pasa por detrás de los eventos. Por encima tachaba los nombres.

### Pendiente

- Los ejemplos tienen datos escritos a mano. Falta armarlos en React con datos reales, y conectar el video (los navegadores no reproducen RTSP: hace falta un conversor como MediaMTX o go2rtc).
- En celular, la lista de cámaras ocupa la primera pantalla antes del muro. Cuando haya una herramienta real conviene decidir si se pliega.

## 0.4.0 · 2026-10-01 · anterior

Los agregados 6 a 14 de la ronda 3 de `FEEDBACK-NOTEBOOK.md`. **Nada de lo anterior cambia de nombre ni de aspecto:** una herramienta hecha con la 0.3.2 sigue funcionando igual. La 0.3.2 quedó guardada en `DESIGN-0.3.2.md`, `unpsjb-0.3.2.css` y `muestra-0.3.2.html`.

### Nuevo

- **Componentes:** combobox con autocompletado (`.combo`), lista de resumen (`.resumen`), acordeón (`details.acordeon`), contador de caracteres (`.contador`), etiquetas (`.etiqueta`, `.etiquetas`), panel lateral (`.modal--lateral`, `.modal__cabecera`) y banner de fase (`.fase`). *(Agregado 6)*
- **Lo que no se agrega,** escrito en `DESIGN.md` 7.P: banner de cookies, selector de fecha propio, línea de tiempo, centro de notificaciones y tooltips. *(Agregado 6)*
- **Densidad compacta** como atributo del contenedor: `data-densidad="compacta"`. Token nuevo `--alto-fila`. *(Agregado 7)*
- **Gráficos e indicadores:** sección 15 de `DESIGN.md`, y en la hoja `.indicador`, `.grafico`, `.barras`, `.apilada`, `.leyenda` y las clases `.serie-N`. *(Agregado 10)*
- **Paleta de series** (`--color-serie-1` a `-5` y `-otros`), validada para que dos series vecinas no se confundan, tampoco con daltonismo, en claro y en oscuro. Reemplaza a la idea anterior de usar los colores de categoría en los gráficos: medidos así, no pasaban. *(Agregado 10)*
- **Pie de páginas públicas** (`.pie--publico`, `.pie__bloques`) y reglas para páginas públicas. *(Agregado 12)*
- **Portal del wifi:** plantilla `portal-wifi.html` (un solo archivo, 9 KB, sin JavaScript, en español e inglés) y sus reglas en la sección 17. *(Agregado 11)*
- **Reglas de los módulos de agenda y de video** (sección 16). Los módulos en sí todavía no están hechos. *(Agregados 8 y 9)*
- **Pruebas con personas** (sección 9) y **"Reportar un problema"** en el pie de todas las herramientas (6.C y 14.F). *(Agregado 13)*
- **Ficha de cada componente** en `muestra.html` (cuándo usarlo, cuándo no, accesibilidad, código): 27 fichas. Y la regla de los **estilos propios con prefijo `.ext-<herramienta>-`** (14.E). *(Agregado 14)*

### Cambiado

- **Marco de las tablas:** `tabindex="0"`, `role="region"` y `aria-label` pasan a ser para **toda** tabla (antes, solo `.tabla--fija`), porque en una pantalla angosta cualquiera puede tener scroll. La excepción son las tablas en tarjetas.
- **Encabezados de fila** (`<th scope="row">` dentro de `tbody`): ya no llevan el fondo gris de las cabeceras.
- **`.tabla--compacta`** ahora cambia el token `--alto-fila` (se ve igual que antes).

### Cómo migrar una herramienta de 0.3.2 a 0.4.0

1. Nada obligatorio: lo anterior sigue funcionando.
2. Agregar el botón "Reportar un problema" en el pie y, si está en prueba, el banner "Piloto".
3. En cada `.tabla-marco` que no sea de tarjetas, agregar `tabindex="0" role="region" aria-label="…"`.
4. Si la herramienta tiene gráficos, pasar sus colores a los de serie.
5. Si usa clases compactas en toda una pantalla, cambiarlas por `data-densidad="compacta"` en el contenedor.

### Pendiente

- ~~Hacer los módulos `unpsjb-agenda.css` y `unpsjb-video.css`~~ (hechos en la 0.4.1).
- Completar `portal-wifi.html` con los datos del equipo de red y las condiciones aprobadas; confirmar con lo legal si alcanza la frase de aceptación o hace falta una casilla.
- Gráficos de líneas: están las reglas, no hay componente (se dibujan en SVG).

## 0.3.2 · 2026-10-01 · anterior

**Todo el código en español.** Los nombres de clases, variables y atributos mezclaban inglés y español (`.btn-primary` junto a `.banda`); ahora siguen una sola regla (`DESIGN.md`, 2.A). **No cambia nada de lo que se ve.** Hay que tocar el HTML de todo lo que use el sistema; se hizo ahora porque todavía no hay nada publicado. (Durante unas horas se numeró 0.4.0; quedó como 0.3.2 porque no cambia el diseño.)

La lista completa de nombre anterior y nombre nuevo es `RENOMBRES.md`: esa tabla es la guía de migración.

### Cambiado

- **Clases:** de 133 cambian 31. Las principales: `.btn` → `.boton`, `.btn-primary` → `.boton--primario`, `.btn-danger` → `.boton--destructivo`, `.btn-quiet` → `.boton--tranquilo`, `.container` → `.contenedor`, `.nav-inferior` → `.menu-inferior`, `.nav-lateral` → `.menu-lateral`, `.check` → `.casilla`, `.tabla-wrap` → `.tabla-marco`, `.visually-hidden` → `.solo-lector`, `.ia-panel` → `.panel-ia`, `.text-display` → `.texto-titulo-1`.
- **Variantes con dos guiones en todos lados:** `.boton--primario`, `.icono--chico` (antes los botones y los íconos usaban uno).
- **`.insignia--aviso` → `.insignia--advertencia`**, igual que el aviso y el toast.
- **Variables:** de 76 cambian 46. Las principales: `--color-primary` → `--color-primario`, `--color-accent` → `--color-acento`, `--color-success` → `--color-exito`, `--color-warning` → `--color-advertencia`, `--space-N` → `--espacio-N`, `--radius-*` → `--radio-*`, `--size-control` → `--alto-control`, `--focus-ring` → `--anillo-foco`, `--font-*` → `--fuente-*`, `--text-*` → `--texto-*`.
- **Tema:** `data-theme="light|dark"` → `data-tema="claro|oscuro"`. Cambian también el script del `<head>` y el valor que se guarda en el navegador (clave `unpsjb-tema`). Quien tenía un tema guardado vuelve a "Automático" hasta elegirlo otra vez.
- **Tablas en tarjetas:** `data-label` → `data-columna`.
- **Tokens del encabezado de `DESIGN.md`:** `primary` → `primario`, `dark-*` → `oscuro-*`, `display` / `headline` / `title` → `titulo-1` / `titulo-2` / `titulo-3`, `body-md` → `texto-base`, `meta` → `detalle`, `caption` → `nota`.
- **Constante de JavaScript del proxy de IA:** `UNPSJB_AI_PROXY_URL` → `UNPSJB_URL_PROXY_IA`.

### Quedan en inglés, a propósito

- Los nombres de etiquetas HTML: `.input`, `.select`, `.textarea`, `.label`.
- Los préstamos que `DESIGN.md` usa tal cual: `toast`, `chip`, `modal`, `hover`.

### Eliminado

- `.banda__nav` (pestañas sobre la banda), obsoleta desde la 0.3.0. Tenía fecha de baja en la 1.0.0; se adelantó porque ninguna herramienta la usa.

### Cómo migrar una herramienta de 0.3.1 a 0.3.2

1. Reemplazar cada nombre de `RENOMBRES.md` en el HTML, el CSS propio y el JavaScript de la herramienta.
2. Cambiar el script del tema en el `<head>` por el de `DESIGN.md`, 3.F.
3. Si usaba `.banda__nav`, hacer antes la migración de la 0.3.0 (más abajo).

## 0.3.1 · 2026-10-01 · anterior

**Fue la primera versión oficial de la serie 0.3.** Reúne la 0.3.0 (que fue solo una propuesta) y las correcciones de la ronda 3 de `FEEDBACK-NOTEBOOK.md`. Desde hoy: `DESIGN.md`, `unpsjb.css` y `muestra.html` son la 0.3.1; la 0.2.1 quedó en `DESIGN-v2.md`, `unpsjb-v2.css` y `muestra-v2.html`.

Para comparar: `comparar-v3.html` (0.2.1 y 0.3.1) y `comparar-v3.1.html` (antes y después de las correcciones; el antes es `muestra-v3.0.html` con `unpsjb-v3.0.css`, la hoja 0.3.0 sin cambios y con el mismo contenido que la muestra nueva).

Quien venga de la 0.2.1 tiene que hacer la migración de la 0.3.0 (más abajo), que obliga a tocar el HTML del header. De la 0.3.0 a la 0.3.1 casi todo es automático.

### Corregido

- **El foco ya no queda tapado por la cabecera fija** (WCAG 2.2, 2.4.11). `html` lleva `scroll-padding-top` con el alto de la cabecera más 16px, y en celular `scroll-padding-bottom` por el menú inferior. Con 600px de alto o menos, la cabecera deja de ser fija. Tokens nuevos: `--alto-banda`, `--alto-cabecera`, `--alto-nav-inferior`.
- **Botón primario en modo oscuro:** el relleno pasa de `#004992` (1,82:1 contra el panel oscuro) a `#3874cb` (3,47:1; texto blanco 4,64:1), con hover `#316bbf`. Tokens nuevos: `--color-primary-fill` y `--color-primary-fill-hover`; en claro valen lo mismo que antes.
- **Columna fija de `.tabla--fija`:** en celular no pasa de 140px ni del 40% de la pantalla (`--tabla-fija-max`) y el texto sigue en otro renglón. Opcional: `--tabla-fija-min`.
- **Banda en celular:** medía 60px y el documento decía 56px. Ahora mide 56px (el relleno vertical baja de 8 a 6px; los botones siguen en 44px).
- **Tablas con scroll horizontal:** el contenedor de `.tabla--fija` lleva `tabindex="0"`, `role="region"` y `aria-label`, para poder recorrerla con teclado (lo marcó axe en celular; ya pasaba en la 0.2.1 y la 0.3.0).
- **Botones de texto largo en pantallas angostas** (menos de 480px): siguen en otro renglón en lugar de empujar la página hacia el costado. A 320px ya no había scroll horizontal; aparecía por debajo de ese ancho.

### Nuevo

- **"Más" en el menú inferior:** con 6 secciones o más, 4 ítems + un botón "Más" que abre el resto en `.modal.modal--inferior`. `.nav-inferior` ahora acepta un `<button>` además de los links.
- **Regla "no pedir dos veces el mismo dato"** (WCAG 2.2, 3.3.7) en la sección 8.F, con un ejemplo en la muestra ("Datos que ya tenemos"). No necesitó estilos nuevos.
- **Objetivo WCAG 2.2 AA:** tabla con los seis criterios nuevos en la sección 9, y la regla de la ayuda siempre en el mismo lugar.

### Cómo migrar una herramienta de 0.3.0 a 0.3.1

1. Nada que hacer para las correcciones: son automáticas al actualizar la hoja.
2. Si la herramienta tiene 6 secciones o más: dejar 4 links en `.nav-inferior`, agregar el botón "Más" y el `<dialog class="modal modal--inferior">` con el resto (copiar de `muestra.html`), y una línea de JavaScript para abrirlo.
3. Si la herramienta cambió el alto de su cabecera, ajustar `--alto-banda`.
4. Revisar los formularios de varios pasos: lo que ya trae la cuenta se muestra en lugar de pedirse.
5. En cada `.tabla--fija`, agregar al contenedor `tabindex="0" role="region" aria-label="…"`.

## 0.3.0 · 2026-09-30 · propuesta (no llegó a ser oficial)

Aplica las 12 acciones de `FEEDBACK-NOTEBOOK.md`. Pasó a ser oficial como parte de la 0.3.1; sus archivos de trabajo (`DESIGN-v3.md`, `unpsjb-v3.css`, `muestra-v3.html`) pasaron a ser `DESIGN.md`, `unpsjb.css` y `muestra.html`. La hoja tal como quedó en la 0.3.0 se conserva en `unpsjb-v3.0.css`.

Cambia el HTML del header (ver "Cómo migrar"): después de la 1.0.0, un cambio así sería **mayor**.

### Cambiado

- **Header en dos niveles.** La banda azul queda solo con logo, herramienta y acciones; las secciones pasan a una sub-barra clara debajo (`.secciones`), dentro de un contenedor fijo (`.cabecera`). *(Acción 1)*
- **La advertencia deja de ser naranja.** `--color-warning` pasa de `#ff9900` a ámbar `#b45309`; la placa de advertencia lleva ícono blanco (5.0:1). El naranja queda solo para "estás acá" y el foco. *(Acción 2)*
- **Interlineado de títulos:** `display` de 1.15 a 1.25 y `headline` de 1.2 a 1.25. *(Acción 4)*
- **Pilas de fuentes:** se agregan los respaldos ajustados "Atkinson respaldo" y "Montserrat respaldo". *(Acción 9)*
- **Íconos PWA:** reglas precisas de contenedor, zona segura y `maskable`. *(Acción 8)*
- **Redacción:** textos de la muestra con lenguaje inclusivo sin signos ("personas inscriptas", "184 inscripciones"). *(Acción 7)*

### Nuevo

- **Selector de tema** Automático · Claro · Oscuro (`.selector-tema`), guardado en `localStorage` (`unpsjb-tema`), con un script de una línea en el `<head>` para que no parpadee. *(Acción 3)*
- **Menú lateral** (`.nav-lateral`) para más de 6 secciones o tableros. *(Acción 1)*
- **Patrones:** sesión por vencer, pasos (`.pasos`), "Revisá tus respuestas" (`.revision`), comprobante (`.comprobante`), páginas de error (`.pagina-error`), filtros y chips (`.filtros`, `.chip`, `.chips`), carga de archivos (`.archivo`, `.archivos`, `progress`). *(Acción 5)*
- **Tablas en tarjetas** en celular (`.tabla--tarjetas` + `data-label`) y la regla para elegir entre tarjetas y columna fija. *(Acción 6)*
- **Guía de escritura:** voz activa, largo de oraciones, lenguaje inclusivo, siglas y tabla de formatos (fecha en texto, moneda, teléfono). *(Acción 7)*
- **Logo en tres niveles** (L, M, S), tamaño mínimo, área de resguardo y favicon `assets/favicon-unpsjb.svg`. *(Acción 8)*
- **Carga de fuentes:** precarga y reglas de recorte. Verificado: las dos fuentes ya están recortadas al español y **tienen cifras tabulares**. *(Acción 9)*
- **Serif para documentos formales:** `.font-academica` y el token `--font-academica`.
- **Sección 14, Gobernanza:** modelo, matriz RACI, versiones y métricas. Este archivo. *(Acción 10)*
- **Sección 2.E, Convivencia con SIU y Moodle.** *(Acción 11)*
- **Lista "Antes de publicar"** en la sección 9 (axe, teclado, zoom, contraste, Orca/NVDA, celular). *(Acción 12)*

### Corregido

- **Pestañas dentro de la página:** mostraban una barra de scroll vertical de 1px (el contenedor medía 43px y el contenido 44). Ahora la línea inferior es una sombra interna.
- **Insignia de advertencia:** con la marca en ámbar, el tinte de fondo baja de 12% a 6% para que el texto mantenga 4.6:1 (con 12% daba 4.25:1).

### Obsoleto

- `.banda__nav` (pestañas sobre la banda). Sigue funcionando en las 0.3; **se elimina en la 1.0.0**.

### Cómo migrar una herramienta de 0.2.1 a 0.3.0

1. Cambiar la hoja por la `unpsjb.css` nueva (en producción, la URL de la versión nueva).
2. Envolver el header en `<header class="cabecera">`, dejar la banda como `<div class="banda">` y mover los links de `.banda__nav` a:
   ```html
   <nav class="secciones" aria-label="Secciones">
     <div class="container secciones__lista">
       <a href="…" aria-current="page">Agenda</a> …
     </div>
   </nav>
   ```
3. Si la herramienta tenía un botón para cambiar de tema en la banda, quitarlo y poner el `.selector-tema` en el pie, con el script del `<head>` (`DESIGN.md`, 3.F).
4. Revisar los textos con "los/las", "inscriptos", etc. (sección 12).
5. En tablas que en celular se leen como lista de cosas, agregar `.tabla--tarjetas` y `data-label` en cada celda salvo la primera.
6. Nada que hacer en avisos y advertencias: el cambio de color es automático.

## 0.2.1 · 2026-09-29 · anterior

Dirección "Señalética": banda azul como único bloque de color, naranja "estás acá", neutros teñidos del azul, Montserrat + Atkinson Hyperlegible Next, radios de 4 y 8px, avisos como placa de estado, logo de la Sede Trelew con gaviota plana y emojis Twemoji como fuente de color. Detalle en `BITACORA.md`, sesiones 3 y siguientes.

## 0.1.0 · 2026-09-29

Primera versión (`DESIGN-v1.md`, `unpsjb-v1.css`, `muestra-v1.html`).
