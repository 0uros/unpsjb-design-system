# Feedback del notebook "Digital Infrastructure: Design Systems, Typography, and Responsibility Matrices"

Consultas hechas el 2026-09-30 (rondas 1 y 2, sobre la v2) y el 2026-10-01 (ronda 3, sobre la v3) al notebook de referencia (99 fuentes: sistemas gubernamentales, SIU, Material, identidad institucional, tipografía, accesibilidad). Link: https://notebooklm.google.com/notebook/e504cca8-7462-435a-95f0-36e802bb3afa (se abre en el navegador "Browser 1").

Cada respuesta se contrastó con `DESIGN.md`. Las marcas son: **[Ya está]** si DESIGN.md ya lo cubre, **[Nuevo]** si conviene agregarlo, **[Revisar]** si contradice una decisión actual y **[Dudoso]** si el notebook parece inventar o contradecirse.

> Cómo leer este feedback: el notebook a veces presenta como "lo que dicen las fuentes" cosas que son inferencia propia, y usa como autoridad los borradores MII 2.0 anteriores (radios de 16px, glassmorphism, marca de agua), que la v2 dejó de lado a propósito. Por eso cada punto lleva una opinión propia.

---

## Ronda 3 — Resumen: qué hacer sobre la v3

Consultas del 2026-10-01, ya con la v3 "propuesta" como base. Priorizado de mayor a menor impacto. El detalle de cada punto está al final del archivo ("Ronda 3 — Consultas sobre la v3").

**Estado al 2026-10-01:** las 5 correcciones están aplicadas y la v3.1 es la **versión oficial** (`DESIGN.md`, `unpsjb.css`, `muestra.html`), que desde ese día se numera **0.3.1** (la v2 es la 0.2.1; la tabla está en `CHANGELOG.md`). Desde la 0.3.2 los nombres del código están en español: las clases y variables que este archivo menciona (`.btn-compacto`, `.tabla-wrap`, `--color-primary`…) tienen su nombre actual en `RENOMBRES.md`; el antes y el después se ven en `comparar-v3.1.html`. Los agregados 6 a 14 se aplicaron en la **0.4.0** (ver abajo qué quedó como reglas y qué como piezas hechas). Donde este archivo dice `DESIGN-v3.md`, `unpsjb-v3.css` o `muestra-v3.html`, hoy son esos tres archivos oficiales; la v2 quedó con el sufijo `-v2`.

### Correcciones (problemas reales de la v3, verificados en el código) — aplicadas en la 3.1

| # | Acción | Sección de DESIGN-v3.md | Viene de |
|---|---|---|---|
| 1 | **El header fijo no puede tapar el foco.** La cabecera ocupa 112px fijos y `unpsjb-v3.css` no tiene `scroll-padding`. Agregar `scroll-padding-top` (y `scroll-padding-bottom` en celular, por el menú inferior) y soltar la cabecera cuando la ventana tiene poco alto (por ejemplo, menos de 600px, que es lo que pasa con zoom al 200%). | 6.A, 9 | R3, P1 y P2 |
| 2 | **Botón primario en modo oscuro.** `#004992` contra el panel oscuro `#122234` da 1,82:1: el botón casi no se distingue. Usar `#3874cb` solo en oscuro (3,47:1 sobre panel, 3,02:1 sobre capa, texto blanco 4,64:1) o sumarle un borde `#7ab3f0`. La banda sigue en `#004992`. | 3.F, 7.A | R3, P5 |
| 3 | **Menú inferior con más de 5 secciones.** La sub-barra admite 6 y el menú inferior, 5. Regla: hasta 5 van todas; con más, 4 + "Más". | 6.A, 6.B | R3, P1 |
| 4 | **Ancho máximo de la columna fija** en `.tabla--fija` (hoy no tiene). Si la primera columna es un texto largo (nombres, títulos), la tabla va como tarjetas. | 7.D | R3, P1 |
| 5 | **No pedir dos veces el mismo dato** (WCAG 2.2, 3.3.7): lo que ya trae el ingreso único (nombre, legajo, correo) se precarga. Con esto y el punto 1 se puede declarar **WCAG 2.2 AA**. | 8.F, 9 | R3, P2 |

### Agregados — aplicados en la 0.4.0

Hechos como piezas: 6, 7, 10, 11 (plantilla `portal-wifi.html`), 12, 13 y 14. Los módulos de los agregados 8 y 9 se construyeron en la 0.4.1 (`unpsjb-agenda.css`, `unpsjb-video.css`). Una corrección sobre lo que decía este archivo: en la P5 opiné que los gráficos podían usar los colores de categoría; al medirlos como paleta de gráficos no pasaron, y la 0.4.0 trae una paleta de series propia.

| # | Acción | Sección | Viene de |
|---|---|---|---|
| 6 | **7 componentes nuevos:** combobox con autocompletado, lista de resumen (`<dl>`), acordeón (`<details>`), contador de caracteres, panel lateral, banner de fase ("Piloto") y etiquetas. Y dejar escrito qué **no** se agrega: banner de cookies, selector de fecha propio, línea de tiempo de trámites, centro de notificaciones y tooltips. | 7 | R3, P3 |
| 7 | **Densidad como atributo** (`data-densidad="compacta"` en el contenedor) en lugar de clases sueltas (`.btn-compacto`, `.tabla--compacta`, `.segmentado--compacto`). | 5.C | R3, P6 |
| 8 | **Reglas del módulo de agenda:** vista en lista como alternativa obligatoria a la grilla, celular en vista Día, "hoy" y la hora actual en azul, conflictos de aula con ámbar + ícono + texto. | módulo `unpsjb-agenda.css` | R3, P4 |
| 9 | **Reglas del módulo de video:** video siempre sobre negro, sin forzar el modo oscuro; estados con ícono + texto; botones de salto y campo de hora como alternativa a arrastrar la línea de tiempo. | módulo `unpsjb-video.css` | R3, P4 |
| 10 | **Sección nueva de gráficos e indicadores:** tipos permitidos, máximo 5 series, etiquetas directas, botón "Gráfico / Tabla", indicador con ícono + signo + texto. | nueva | R3, P5 |
| 11 | **Portal del wifi:** un solo HTML con todo adentro, fuentes del sistema, resumen de los términos en 3 o 4 puntos con el texto completo en un desplegable, y selector ES / EN. | paso 3 del plan | R3, P7 |
| 12 | **Variante para páginas públicas** (agenda de eventos): pie extendido con dirección, contacto y enlaces legales. | 6.C | R3, P7 |
| 13 | **Pruebas con personas:** 5 o 6 por ronda, una vez por cuatrimestre, y un link "Reportar un problema" en el pie de todas las herramientas. | 9, 14 | R3, P7 |
| 14 | **Ficha de cada componente** en `muestra.html`: cuándo usarlo, cuándo no, accesibilidad y código. Y una regla para las excepciones: estilos propios con prefijo `.ext-<herramienta>`. | 14 | R3, P6 |

### Decisiones que son tuyas

- **Idioma de los nombres en el código.** Hoy se mezclan (`--color-primary` y `--color-fondo`; `.btn-primary` y `.banda`). El notebook dice "todo en inglés". Conviene unificar, pero la dirección es discutible (ver P6). Si se hace, el momento es **antes** de que la v3 pase a ser oficial, porque ya obliga a tocar el HTML.
- **Aceptación de términos en el wifi:** el notebook recomienda un botón sin casilla ("Al tocar 'Conectar al wifi' aceptás las condiciones"). Antes de adoptarlo, consultarlo con quien corresponda en lo legal.
- **Header fijo:** alcanza con el punto 1, o directamente dejar de fijarlo, como GOV.UK y Poncho.

Se mantienen sin cambios: el doble anillo de foco, la serif solo para documentos, el enlace "Ir al contenido" (el notebook los pidió, pero la v3 ya los tiene) y la banda `#004992` en modo oscuro (el notebook retiró su crítica).

---

## Rondas 1 y 2 — Resumen: qué hacer

Priorizado de mayor a menor impacto.

| # | Acción | Sección de DESIGN.md | Viene de |
|---|---|---|---|
| 1 | Sacar las pestañas de la banda azul y pasarlas a una sub-barra clara debajo (o a un menú lateral en apps densas). La banda queda con logo, herramienta y cuenta. | 6.A | Ronda 2, P1 |
| 2 | El naranja deja de marcar advertencias: se queda solo con "estás acá" y el foco. La placa de advertencia pasa a ámbar oscuro. Esto además resuelve una contradicción interna (el naranja "nunca como relleno", pero hoy la placa de advertencia es un bloque naranja de 44px). | 3.B, 3.E, 8.A | Ronda 2, P8 |
| 3 | Agregar un selector manual de tema (claro / oscuro / automático), guardado en el navegador. | 3.F | Ronda 2, P8 |
| 4 | Subir el interlineado de los títulos a 1.25 como mínimo y reservar el peso 800 para `display`. | 4.B | Ronda 2, P4 |
| 5 | Agregar 6 patrones: sesión por vencer, formulario de varios pasos con "Revisá tus respuestas", páginas de error (404 / 403 / 500), filtros de tabla, carga de archivos y confirmación con comprobante. | 7 y 8 | Ronda 2, P7 |
| 6 | Tablas en móvil: regla para elegir entre scroll con primera columna fija y tarjetas apiladas. | 7.D | Rondas 1 y 2 |
| 7 | Completar la guía de escritura: lenguaje inclusivo sin barras ni "x", siglas, largo de las oraciones y formatos de moneda, teléfono y fecha en texto. | 12 | Ronda 2, P5 |
| 8 | Logo en tres tamaños (L / M / S) con área de resguardo y favicon; íconos PWA sobre un contenedor común. | 10.A, 10.B | Rondas 1 y 2 |
| 9 | Estrategia de carga de fuentes: recorte al español (subset), `preload` y respaldo con `size-adjust`. | 2.C, 4 | Ronda 2, P4 |
| 10 | Sección nueva de gobernanza: RACI, semver, `CHANGELOG.md` y deprecaciones. | nueva (14) | Ronda 2, P6 |
| 11 | Sección nueva sobre SIU y Moodle: tema completo en los portales de entrada y solo marca en los módulos de gestión. | nueva (2.E) | Ronda 2, P3 |
| 12 | Lista de pruebas de accesibilidad antes de publicar. | 9 | Ronda 2, P7 |

Se mantienen sin cambios: los radios de 4px y 8px, que el header no tenga transparencias, la ausencia de marcas de agua y el uso de Atkinson Hyperlegible en lugar de Inter.

### Estado: las 12 aplicadas en la v3 (propuesta), 2026-09-30

Las 12 acciones están en una versión aparte, sin tocar la oficial: `DESIGN-v3.md`, `unpsjb-v3.css`, `muestra-v3.html` y `assets/favicon-unpsjb.svg`. Para verlas lado a lado, `comparar-v3.html`; el detalle y cómo migrar, en `CHANGELOG.md` (versión 3.0.0).

Al aplicarlas aparecieron algunas cosas que conviene saber:

- **Cifras tabulares:** las dos fuentes ya las traen (`tnum`), y ya están recortadas al español (unos 220 caracteres). Con esto se cierra el pendiente de la sección 4.C.
- **Respaldo de fuentes:** los valores de `size-adjust` se midieron sobre los archivos reales contra Liberation Sans (misma métrica que Arial). Atkinson: 99,16%. Montserrat 700: 109,52%.
- **Advertencia en ámbar:** la insignia de advertencia daba 4,25:1 con el tinte al 12%. Bajó a 6% (4,64:1).
- **Error previo corregido:** las pestañas internas mostraban una barra de scroll de 1px (ya pasaba en la v2).
- **Qué no se hizo:**
  - El tema para SIU queda como guía, hasta confirmar quién administra esos sistemas.
  - El logo monocromo sigue pendiente en `logo/generar.sh`.
- **Verificación:**
  - Capturas en escritorio y celular, en claro y oscuro.
  - Impresión a PDF.
  - axe sin errores en los dos temas.
  - Selector de tema y aviso de sesión probados en el navegador.

---

## Ronda 1 — Evaluación general de la v2

Se le pasó un resumen de la v2 "Señalética" y se le pidió qué está bien, qué está mal y qué falta.

### Lo que valida [Ya está]

- Naranja reservado para "estás acá": foco, sección activa y advertencias (en la ronda 2 se corrige lo de las advertencias).
- Neutros teñidos de azul y modo oscuro automático con `prefers-color-scheme`.
- Errores importantes nunca en toast, sino en avisos persistentes.
- Una sola librería de íconos (Lucide) y nada de emojis como íconos.
- `unpsjb.css` central + HTML plano o React+Vite según la complejidad.
- Header con `[isologo] | [nombre de la herramienta]` y footer institucional.

### Críticas que no aplican (fueron por lo resumido de la consulta)

| Crítica | Qué dice DESIGN.md |
|---|---|
| "Texto mínimo de 13px es crítico: el cuerpo debe ser 16px" | El cuerpo (`body-md`) ya es 16px. Los 13px son solo para `caption` (footer y notas). Los inputs usan `body-md` (16px), así que no hay auto-zoom en iOS. |
| "Toasts de 5 s violan WCAG 2.2.1: falta botón de cerrar, pausa con foco y `aria-live`" | Ya tienen botón de cerrar, se pausan con mouse **y con foco**, y el contenedor lleva `role="status"`. |

### Críticas a evaluar

1. **Header azul "pesado" en pantallas densas.** Profundizado en la ronda 2 (P1), donde cambia la opinión.
2. **Radios de 4px y 8px.** Admite que son sobrios y funcionales (estilo USWDS), pero dice que el MII 2.0 original pedía 16px. *Opinión:* la v2 los eliminó a propósito y no hay un argumento nuevo, así que se mantienen.

### Lo que falta

Logo en tres tamaños, serif para documentos solemnes, capa para SIU, tablas como tarjetas en móvil y gobernanza. Todo se profundizó en la ronda 2.

---

## Ronda 2 — Consultas por tema

Esta vez se le pasaron los valores exactos de DESIGN.md, para evitar críticas por malentendidos.

### P1. Header y navegación

**Qué dicen las fuentes**
- **GOV.UK:** header oscuro y compacto, solo con la marca y el nombre del servicio. La navegación va en una sub-barra o en un menú lateral.
- **USWDS:** header por capas: banner oficial arriba, después la identidad del organismo (logo, título, perfil) y abajo una franja de navegación o un menú lateral.
- **Poncho (argentina.gob.ar):** header limpio con marca, buscador y accesos globales. La navegación va más abajo, con migas de pan y paneles.
- **SIU:** franja con escudo y sesión, y un menú lateral para los módulos. *[Dudoso: no trae una cita concreta.]*

**Riesgos de nuestra solución**
- Logo (48px) + separador + herramienta + acciones + pestañas en 64px se pisan en laptops de 1024 a 1280px o con la ventana dividida.
- Con 5 o más secciones de nombre largo ("Control de stock"), las pestañas no entran.
- El marcador naranja sobre el azul llama la atención hacia el header, lejos de los datos.

**Recomendación del notebook:** header en dos niveles. Arriba, la banda azul de 48 a 56px con logo, separador, herramienta, ayuda y cuenta. Debajo, una sub-barra clara con las pestañas y el marcador naranja. En apps muy densas (cámaras, inventario), un menú lateral que se puede colapsar.

**Opinión: [Revisar] y adoptar.** Mantiene el concepto: la banda azul sigue siendo la única área grande de color, y además queda más limpia. Hay que definir:
- Alto de la sub-barra: 44 a 48px, fondo `panel`, borde inferior `linea`.
- Pestaña activa: texto en `tinta` peso 700, `aria-current="page"` y marcador naranja de 4px. Sobre blanco, el naranja no llega a 3:1, pero no es la única señal (también cambian el color y el peso del texto), así que cumple.
- Menú inferior en móvil: sin cambios.

Conviene que la regla sea una sola para todas las herramientas (principio 5, "Consistente"). El menú lateral queda como excepción documentada para apps con más de 6 secciones.

### P2. Logo y arquitectura de marca

- **Arquitectura de marca [Ya está]:** respaldada (UNPSJB como marca paraguas). En el header, `[logo] | [herramienta]`; la sede y el área van en el footer para no cargar el header con 4 niveles.
- **Logo en tres niveles [Nuevo]:**

  | Versión | Tamaño | Contenido |
  |---|---|---|
  | L | 48px o más | Completo (header de escritorio, diplomas, portadas). |
  | M | 24 a 44px | Sin el texto curvo, conserva el óvalo y el ave (tarjetas, firmas de correo). |
  | S | menos de 32px | Silueta lineal del ave con trazo grueso (menú móvil, favicon). |

- **Favicon [Nuevo]:** la versión S en SVG, blanca sobre un círculo `#004992`.
- **Área de resguardo [Nuevo]:** un módulo igual a la altura del óvalo (1X), sin texto ni gráficos adentro.
- **Otras versiones [Nuevo]:** blanca (fondos oscuros o azules) y monocroma (impresión a una tinta).
- **Íconos PWA [Ya está en parte]:** todos con el mismo contenedor azul redondeado y un ícono Lucide blanco propio de cada herramienta.
- **[Dudoso]**
  - Propone una marca de agua del ave al 10–15% en los íconos PWA. Contradice sus propias fuentes (en la ronda 1 dijo que el manual prohíbe las marcas de agua) y a 48px no se vería. Se descarta.
  - Llama "albatros" al ave; DESIGN.md dice gaviota. Confirmar con el responsable de la marca.
  - El radio del contenedor PWA lo pone en 16px. Ahí sí puede ser más grande que en la interfaz, porque cada sistema operativo recorta el ícono con su propia máscara.

### P3. SIU y sistemas de terceros

**Qué dicen las fuentes**
- El ecosistema SIU se organiza así: SIU-Huarpe (portal), SIU-Araí: Usuarios (ingreso único, SSO), Araí: Documentos (firma), SUDOCU (expedientes) y los módulos de gestión (Guaraní, Mapuche, Pilagá, Diaguita).
- La gráfica base de SIU usa **Bootstrap 3/4** y no impone tokens cerrados: cada universidad adapta el portal a su identidad.
- Para el personal, la fricción es funcional y no estética: si los patrones se contradicen entre SIU y las herramientas propias, aumenta la carga mental.
- Se puede aplicar un tema encima (variables CSS que sobreescriben Bootstrap) sin tocar el código de SIU.

**Recomendación (inferencia del notebook)**
- **Nivel 1, tema completo:** SIU-Huarpe, el login de Araí y Moodle, porque son la puerta de entrada.
- **Nivel 2, solo marca:** header y footer, logo, favicon, color primario y foco en Guaraní, Mapuche, Pilagá y SUDOCU. Sobreescribir todo en esos sistemas puede romper tablas complejas.

**Opinión: [Nuevo].** Tiene sentido. Antes de escribirlo como regla, conviene confirmar quién administra esos sistemas en la UNPSJB (seguramente el Rectorado, no la Sede) y si permiten inyectar CSS. En DESIGN.md alcanza con una sección corta: "Convivencia con SIU y Moodle", con los dos niveles y la regla de **copiar patrones de SIU** (tablas, formularios) cuando no haya motivo para diferenciarse.

### P4. Tipografía

- **[Ya está] Valida:**
  - Montserrat (de Julieta Ulanovsky, inspirada en la cartelería del barrio porteño de Montserrat) para títulos.
  - Atkinson Hyperlegible para texto: pensada para baja visión, distingue I/l/1 y 0/O.
  - 16px de mínimo en el cuerpo, 70ch y cifras tabulares.
- **Alternativas mencionadas:**
  - Inter: la recomiendan los borradores UNPSJB como equivalente digital de la AvantGarde del manual 2008.
  - Public Sans (USWDS): utilitaria y con cifras tabulares.
  - Encode Sans (Poncho): alinea con la gráfica del Estado nacional.
  - *Opinión:* ninguna da un argumento más fuerte que la legibilidad de Atkinson, así que se mantiene.
- **[Revisar] Montserrat en 700–800:**
  - Es ancha: los títulos largos saltan de línea antes.
  - Con un interlineado de 1.1, las tildes en mayúscula (Á, É, Ó) pueden tocar la línea de arriba.
  - Hoy `display` está en 32px/800/**1.15** y `headline` en **1.2**.
  - → Subir los títulos a 1.25 como mínimo y dejar el 800 solo para `display` (o números grandes).
- **[Nuevo] Carga de fuentes:**
  - 3 pesos útiles como mucho.
  - `font-display: swap`.
  - Recorte (subset) al latín con los signos del español: de ~300 KB a ~40 KB.
  - `<link rel="preload">` de las fuentes críticas.
  - Respaldo con `size-adjust`, `ascent-override` y `descent-override` sobre Arial o system-ui, para que la página no salte cuando termina de cargar la fuente.
- **[Nuevo] Serif:**
  - No se usa en la interfaz.
  - Solo una clase `.font-academica` (Times New Roman o Merriweather) para ver resoluciones o expedientes y para PDF oficiales, porque el manual 2008 exige Times para el texto corrido de los documentos oficiales.

### P5. Redacción

**[Ya está]:** voseo en toda la interfaz, botones con verbo + objeto, errores que dicen qué pasó y cómo seguir, y modal destructivo con una pregunta concreta, la consecuencia y el foco inicial en "Cancelar".

**[Nuevo]:**
- **Usted o tercera persona** solo en documentos formales (resoluciones, notas). Nunca mezclar formas en la misma pantalla.
- **Voz activa:** "Soporte Informático revisa tu solicitud", no "La solicitud será revisada".
- **Oraciones de 15 a 20 palabras** como máximo; párrafos de 1 a 3 oraciones.
- **Lenguaje inclusivo sin barras, "x" ni "@"**, porque los lectores de pantalla los leen mal. Usar colectivos o fórmulas neutras: "el cuerpo docente", "la comunidad estudiantil", "la persona titular del legajo".
- **Siglas:** nombre completo + sigla la primera vez, sin puntos (UNPSJB, no U.N.P.S.J.B.).
- **Formatos:**

  | Dato | Formato |
  |---|---|
  | Fecha en texto | 26 de septiembre de 2026 (mes en minúscula) |
  | Fecha en tablas | 26/09/2026 |
  | Hora | 14:30 h (el notebook sugiere "hs", pero la RAE indica "h", que es lo que ya dice DESIGN.md) |
  | Números | 1.250 · 98,5 % |
  | Moneda | $ 45.600,50 |
  | Teléfono | (0280) 442-1234 o +54 280 442-1234 |
  | Dependencias | Mayúscula inicial, nunca todo en mayúsculas |

- **[Dudoso]** Su ejemplo de modal dice "14 alumnos inscriptos", contra su propia regla inclusiva ("14 inscripciones" o "14 personas inscriptas").

### P6. Gobernanza

**Modelo:**
- Hoy, centralizado y ágil: Soporte Informático Trelew es el núcleo y la fuente única.
- Si otras sedes lo adoptan, pasar a un modelo mixto: un núcleo común (tokens, tipografía, accesibilidad, componentes base) más un archivo por sede (`unpsjb-madryn.css`) que solo cambia tokens puntuales, sin duplicar código.

**Matriz RACI mínima:**

| Tarea | Núcleo (Soporte Trelew) | Dev de una herramienta | Comunicación / marca | Autoridad de la sede |
|---|---|---|---|---|
| Agregar o cambiar un token | **A** / R | C | I | I |
| Agregar un componente | **A** / R | R (si lo propone) / C | I | I |
| Cambiar el logo | R | I | **A** | I |
| Publicar una versión | **A** / R | I | I | I |

R ejecuta, **A** aprueba (una sola por fila), C es consultado y I es informado.

**Versiones:**
- **Semver:**

  | Tipo | Ejemplo | Cuándo |
  |---|---|---|
  | PATCH | 0.1.1 | Arreglos. |
  | MINOR | 0.2.0 | Componentes o tokens nuevos que no rompen nada. |
  | MAJOR | 1.0.0 | Clases renombradas o eliminadas. |

- **`CHANGELOG.md`** con Nuevo / Cambiado / Por eliminar / Eliminado / Corregido.
- **Deprecaciones:** marcar con `@deprecated` durante al menos una versión MINOR antes de eliminar en la siguiente MAJOR.

**Publicación:**
- `unpsjb.css` en el servidor de recursos. El notebook puso `http://`; tiene que ser `https://`, como ya corrigió DESIGN.md.
- `DESIGN.md` en el repositorio.
- `muestra.html` publicada en Nginx como referencia viva.

**Métricas simples:**
- Porcentaje de herramientas que usan `unpsjb.css` sin hojas sueltas.
- Colores hex o px sueltos que aparecen en las revisiones de código.
- Tiempo para armar una pantalla nueva.

**Opinión: [Nuevo].** Es práctico y cabe en una sección corta. Falta averiguar quién cumple el rol de "Comunicación / marca" en la UNPSJB (¿Prensa del Rectorado?).

### P7. Patrones que faltan y pruebas

**[Nuevo] Los 6 imprescindibles:**
1. **Ingreso por SSO** (SIU-Araí Usuarios) y **aviso de sesión por vencer**: un modal con cuenta regresiva y el botón "Seguir conectado", para no perder formularios largos.
2. **Formulario de varios pasos:** indicador de paso ("Paso 2 de 4") y, antes de enviar, una pantalla "Revisá tus respuestas" con "Cambiar" en cada sección.
3. **Páginas de error 404, 403 (sin permiso) y 500:** con header y footer, en lenguaje claro ("No tenés permiso para ver este expediente") y con una salida (volver o contactar a Soporte).
4. **Filtros de tabla:** arriba de la tabla, con chips de los filtros aplicados y "Quitar filtros". En móvil, dentro de un panel.
5. **Carga de archivos:**
   - Avisar antes los formatos y el peso máximo.
   - Progreso accesible.
   - Lista de archivos con "Quitar".
   - Botón además de arrastrar y soltar.
6. **Confirmación final:** número de trámite o expediente bien visible y "Descargar comprobante (PDF)".

**[Nuevo] Tabla o tarjetas en móvil:**
- **Scroll + primera columna fija** (lo actual) cuando la tarea es **comparar celdas**: planillas, notas, puertos de un switch.
- **Tarjetas apiladas** cuando **cada fila es una cosa**: eventos, solicitudes, equipos del inventario. Los encabezados de columna pasan a ser labels dentro de cada tarjeta.
- El notebook sugiere radio de 16px y franja lateral de 4px en las tarjetas. No aplica: se usan los paneles de la v2 (radio 8px).

**[Nuevo] Pruebas antes de publicar:**
- **Automáticas:** axe DevTools o WAVE sin errores críticos; Lighthouse de accesibilidad mayor a 90.
- **Teclado:** recorrer todo con Tab y Shift+Tab, sin trampas de foco y con el foco siempre visible. Enter y Espacio activan, Esc cierra y las flechas mueven dentro de las pestañas.
- **Zoom:** al 200% y con 320px de ancho no debe aparecer scroll horizontal (WCAG 1.4.10).
- **Contraste:** 4.5:1 en claro y en oscuro.
- **Lector de pantalla:** NVDA (Windows) o VoiceOver. En Linux, **Orca** (agregado propio). Verificar que los botones se anuncien, que los errores se lean solos y que los íconos decorativos lleven `aria-hidden`.

### P8. Color y modo oscuro

- **[Ya está] Valida:**
  - El semáforo siempre con ícono y texto (WCAG 1.4.1).
  - Esmeralda y carmesí en lugar de verde y rojo puros, que ayuda con el daltonismo.
  - El borde de los controles en 3.4:1 (WCAG 1.4.11).
  - La banda azul igual en modo oscuro.
- **[Revisar] Sobrecarga del naranja:**
  - Hoy `#ff9900` significa tres cosas: "estás acá", foco y advertencia. Quien escanea la pantalla no sabe si lo naranja es su ubicación, el control enfocado o un problema.
  - **Propuesta:** el naranja queda solo para "estás acá" y el foco (que ya se distingue por la forma: doble anillo). La advertencia pasa a ámbar oscuro: placa `#b45309` con ícono blanco (5.0:1) y texto `#b45309`.
  - Así también se resuelve la contradicción de DESIGN.md: 3.B dice que el naranja nunca va de relleno, pero 8.A lo usa como bloque sólido en la placa de advertencia.
- **[Nuevo] Selector manual de tema:**
  - Hay personal en PCs sin permiso para cambiar la preferencia del sistema, y personas con fotofobia o baja visión que cambian según la luz.
  - Regla: automático al entrar la primera vez, más un selector claro / oscuro / automático (en el menú de cuenta o en el footer) que se guarda en el navegador.
  - Hoy DESIGN.md solo prevé forzarlo desde el código (`data-theme`).
- **Referencias de foco:**

  | Sistema | Foco |
  |---|---|
  | GOV.UK | Fondo amarillo `#ffdd00` con borde negro |
  | USWDS | Anillo de alto contraste |
  | Poncho | Foco celeste o azul con borde grueso |

  Nuestro doble anillo (naranja + azul) sigue la misma lógica y se mantiene.
- **Referencias de modo oscuro:** GOV.UK y Poncho casi no lo ofrecen (se quedan en claro). USWDS y Material usan tokens semánticos, como ya hace `unpsjb.css`.

---

## Ronda 3 — Consultas sobre la v3

Hechas el 2026-10-01, con los valores exactos de `DESIGN-v3.md`. Siete preguntas: revisión crítica, WCAG 2.2, componentes que faltan, módulos de agenda y video, modo oscuro y gráficos, tokens, y páginas de entrada más validación.

> Sobre la confiabilidad de esta ronda: el notebook siguió citando valores que la v3 no usa (`slate-900`, radios de 16px, borde lateral de 4px, textos en mayúsculas). También repitió un número de contraste que yo le había pasado mal (1,6:1; el real es 1,82:1) y lo "confirmó" con un cálculo. Por eso los contrastes de esta sección están **medidos aparte**, no tomados del notebook.

### P1. Revisión crítica: los 5 puntos más débiles

| Punto del notebook | Veredicto |
|---|---|
| Foco solo naranja sobre fondos claros | **[Ya está]** La v3 usa doble anillo (naranja + azul). No aplica. |
| Menú inferior con 6 secciones | **[Nuevo]** Es una inconsistencia real: la sub-barra admite hasta 6 secciones (6.A) y el menú inferior hasta 5 (6.B). Material y USWDS piden de 3 a 5 destinos. |
| Falta la serif para documentos | **[Ya está]** `.font-academica` existe desde la v3. No aplica. |
| La banda azul "deslumbra" en modo oscuro | **[Dudoso]** Lo retiró en la P5: `#004992` es un color oscuro y no deslumbra. |
| Columna fija con texto largo en celular | **[Nuevo]** Si la primera columna mide 180 a 200px, quedan unos 150px para el resto. `.tabla--fija` hoy no limita ese ancho. |

**Opinión.** Dos hallazgos valen:
- **Menú inferior:** con 6 secciones, en celular van 4 + "Más" (abre un panel con el resto). Hasta 5, van todas.
- **Columna fija:** ancho máximo de unos 140px (o el 40% de la pantalla), con el texto en dos renglones. La regla de 7.D se completa: si lo que identifica a la fila es un texto largo, van tarjetas.

### P2. Qué falta para declarar WCAG 2.2 AA

| Criterio nuevo de 2.2 | Estado | Qué hacer |
|---|---|---|
| 2.4.11 Foco no tapado (AA) | **Falla** | La cabecera fija de 112px puede tapar el elemento enfocado al recorrer con Tab. Ver abajo. |
| 2.5.7 Movimientos de arrastre (AA) | Cumple | La carga de archivos tiene botón. Ojo con la línea de tiempo del visor de cámaras (P4). |
| 2.5.8 Tamaño del objetivo (AA) | Cumple | Pide 24×24px; la v3 usa 44px y 36px en la variante compacta. |
| 3.2.6 Ayuda consistente (A) | Cumple | "Ayuda" está siempre en la banda. Conviene escribirlo como regla: mismo lugar en todas las herramientas. |
| 3.3.7 Entrada redundante (A) | **Pendiente** | No pedir dos veces el mismo dato dentro de un trámite. |
| 3.3.8 Autenticación accesible (AA) | Cumple | El ingreso es por SIU-Araí y permite el gestor de contraseñas. |

**El header fijo [Revisar].**
- **Qué dicen las fuentes:** GOV.UK y Poncho no fijan el header: se va con el scroll. USWDS tampoco lo fija por defecto.
- **Las cuentas (inferencia del notebook, razonable):** en una laptop de 1366×768 quedan unos 670px útiles y la cabecera se lleva el 17%. Con zoom al 200% quedan unos 384px y la cabecera ocupa casi un tercio.
- **Verificado en el código:** `.cabecera` es `position: sticky` y `unpsjb-v3.css` no tiene ninguna regla `scroll-padding` ni `scroll-margin`.
- **Opinión, en dos pasos:**
  1. `html { scroll-padding-top: 128px }` (la cabecera más 16px de aire). En celular, además, `scroll-padding-bottom` por el menú inferior. Es mejor ponerlo una vez en `html` que el `scroll-margin-top` elemento por elemento que propone el notebook.
  2. Cuando la ventana tiene poco alto (`@media (max-height: 600px)`), la cabecera deja de ser fija. Cubre el caso del zoom al 200%.
- Una alternativa más simple es no fijar nunca la cabecera, como GOV.UK. Se pierde tener las secciones siempre a mano en tablas largas. Es una decisión de producto.
- El notebook propone además que la sub-barra se esconda al bajar. Se descarta: es movimiento que no responde a una acción de la persona (5.E) y suma JavaScript.

**Entrada redundante [Nuevo].** En 8.F: los datos que ya trae el ingreso único (nombre, legajo, correo) se muestran precargados; lo que se cargó en un paso no se vuelve a pedir en otro.

**No aplica:** el enlace "Ir al contenido" (ya está en la sección 9) y el borde blanco extra en el foco sobre fondos oscuros (el naranja ya da 4,1:1 sobre la banda y 7,5:1 sobre el panel oscuro).

### P3. Componentes que faltan

**[Nuevo] Agregar, en este orden:**

| # | Componente | Para qué | Regla de uso | Accesibilidad |
|---|---|---|---|---|
| 1 | **Combobox con autocompletado** | Elegir entre muchas opciones: aula, bien de inventario, persona. | Reemplaza al `select` cuando hay más de 15 a 20 opciones. | `role="combobox"`, `aria-expanded`, `aria-controls`; flechas, Enter y Esc; anunciar la cantidad de resultados ("5 aulas"). |
| 2 | **Lista de resumen** | La ficha de una sola cosa: un aula, un equipo, una solicitud. | Pares de etiqueta y dato, en fila en escritorio y apilados en celular. Evita usar una tabla para un solo registro. | `<dl>`, `<dt>`, `<dd>`. Si hay "Cambiar", el nombre accesible dice qué cambia. |
| 3 | **Acordeón** | Preguntas frecuentes, historiales, opciones avanzadas. | Solo para lo secundario. Nunca esconde campos obligatorios ni información crítica. | `<details>` y `<summary>` nativos. |
| 4 | **Contador de caracteres** | Descripciones con límite. | Debajo del `textarea`: cuántos quedan. | Unido con `aria-describedby`; se anuncia al frenar de escribir, no en cada tecla. |
| 5 | **Panel lateral** | Filtros avanzados, ver un detalle sin salir de la lista. | Se abre desde un borde, encima del contenido. | Como un modal: atrapa el foco, Esc cierra y el foco vuelve al botón que lo abrió. |
| 6 | **Banner de fase** | Avisar que una herramienta está en prueba. | Debajo de la cabecera: etiqueta "Piloto", una frase y un link para opinar. | El link dice a dónde va. |
| 7 | **Etiquetas** | Clasificar un registro: tipo de aula, tipo de cámara. | No se pueden tocar. No son chips (los chips se quitan) ni insignias (las insignias son estados). | El texto dice la categoría; el color solo acompaña. |

**Opinión sobre los 7:**
- **Combobox:** es el más caro de hacer bien. Primer paso barato: `<input list>` con `<datalist>`, que es nativo. El combobox propio queda para React.
- **Lista de resumen:** `.revision` (8.F) ya es casi esto. Conviene generalizarla en lugar de crear otra pieza.
- **Panel lateral:** se hace con `<dialog>`, igual que los modales, así que no suma JavaScript.
- **Banner de fase:** el notebook lo escribe "BETA" en mayúsculas. Va con mayúscula inicial (4.C). Es útil ahora mismo: todas las herramientas nuevas van a estar en piloto.
- **Etiquetas:** `.categoria` ya cubre las de color. Falta solo la variante neutra.

**[Nuevo] Dejar escrito que no se agregan:**

| Componente | Por qué no |
|---|---|
| Banner de cookies | Las herramientas internas solo usan cookies de sesión. Si alguna vez se suma analítica de terceros, se revisa. |
| Selector de fecha propio | El nativo es más accesible, más liviano y no se mantiene. Excepción posible: rangos complejos. |
| Línea de tiempo de trámites | Ya lo cubren el indicador de pasos y la lista de resumen. |
| Centro de notificaciones | Necesita servidor y base de datos: no es un tema de la hoja de estilos. |
| Tooltip | En celular no hay "pasar el mouse" y tapan contenido. Se usa el texto de ayuda fijo debajo del campo. |

### P4. Módulos de agenda y de video

**Agenda de aulas**

| Tema | Qué propone | Opinión |
|---|---|---|
| Teclado y lector de pantalla | Grilla con `role="grid"` y flechas, más un botón "Grilla / Lista" obligatorio: la lista es una secuencia por hora, cada evento con su título. | **[Nuevo]** La vista en lista, sí, y además resuelve el celular. El `role="grid"` es caro de hacer bien: empezar con una `<table>` común, con botones adentro de las celdas. |
| Celular | Solo vista Día: una fila de días para elegir y debajo la lista de eventos. | **[Nuevo]** Adoptar. La fila de días, sin "píldoras": radio de 4px. |
| Conflictos de aula | Celda dividida en dos, con ámbar `#b45309`, ícono de alerta y el texto "2 eventos (conflicto)". | **[Nuevo]** Adoptar. Sin borde lateral de color (está prohibido en 7.C) y sin `aria-invalid`, que es para campos de formulario. |
| Hoy y hora actual | Columna de hoy con un tinte azul y la etiqueta "Hoy"; línea de 2px en azul para la hora. Nunca en naranja. | **[Nuevo]** Adoptar: usar `tinte` y `primary-text`. Buen argumento: el naranja haría creer que la celda está enfocada. |
| Alto del renglón | De 48 a 60px por hora. | **[Nuevo]** 48px, igual que las filas de tabla. |

**Visor de cámaras**

| Tema | Qué propone | Opinión |
|---|---|---|
| Modo oscuro | El video siempre sobre negro `#000`. El resto respeta el selector de tema; sugiere arrancar en oscuro. | **[Nuevo]** Negro detrás del video, sí. No arrancar en oscuro: la regla es Automático (3.F) y cambiarla en una sola herramienta rompe la consistencia. |
| Estados de cámara | Ícono + texto en cada uno: En vivo (`video`), Grabando (`disc`), Sin señal (`video-off`) con un mensaje de qué hacer. | **[Nuevo]** Adoptar con mayúscula inicial. Se descartan el punto con pulso animado (5.E) y la trama diagonal de "Sin señal" (3.G). |
| Densidad | Lista lateral con filas de 36 a 40px y controles del reproductor de 36px. | **[Ya está]** Es la variante compacta de escritorio. |
| Arrastrar la línea de tiempo | Botones −15 min, −1 min, +1 min y +15 min; un campo de hora para saltar; y la línea como `input type="range"`, que se maneja con flechas. | **[Nuevo]** Adoptar las tres. Es lo que pide WCAG 2.5.7. |

### P5. Modo oscuro y gráficos

**Botón primario en oscuro [Revisar].** El notebook retiró lo del "deslumbramiento" y coincidió con el problema real. Medido aparte:

| Color | Sobre panel `#122234` | Sobre capa `#1a2d43` | Sobre fondo `#0b1826` | Texto blanco encima |
|---|---|---|---|---|
| `#004992` (hoy) | 1,82:1 | 1,58:1 | 2,02:1 | 8,87:1 |
| `#2c70d0` (propuesta del notebook) | 3,32:1 | 2,89:1 | 3,70:1 | 4,84:1 |
| `#3874cb` | 3,47:1 | 3,02:1 | 3,86:1 | 4,64:1 |

- **Opción A (recomendada):** `#3874cb` como relleno del botón primario solo en oscuro. Pasa 3:1 en las tres superficies.
- **Opción B:** mantener `#004992` y sumarle un borde de 1px en `#7ab3f0`. Conserva el azul exacto, pero el botón primario pasa a parecerse al secundario.
- La banda no cambia. No es un control, así que no necesita 3:1; si se quiere marcar dónde termina, alcanza un borde inferior `dark-linea`.
- La placa de aviso de información ya usa `#7ab3f0` en oscuro: no tiene este problema.

**Gráficos e indicadores [Nuevo].** Hoy DESIGN.md no dice nada.

| Regla | Detalle |
|---|---|
| Tipos permitidos | Barras (mejor horizontales: las etiquetas se leen enteras), líneas con marcadores y el indicador suelto. |
| Tipos a evitar | Torta o dona con más de 3 partes, 3D y áreas apiladas. |
| Series | 5 como máximo. Con más, es una tabla ordenable. |
| Color | Nunca el semáforo para datos que no son estados. Un solo azul para una serie. |
| Etiquetas | Directas, sobre la barra o al lado de la línea. La leyenda, solo si no hay otra, arriba y en el mismo orden. |
| Sin depender del color | Líneas con trazo y marcador distintos; barras separadas por 1px del color del fondo. |
| Tabla alternativa | Botón "Gráfico / Tabla" (un segmentado) en cada gráfico. La tabla es una `<table>` real. |
| Indicador | Número grande + ícono (`trending-up` o `trending-down`) + texto con signo: "+12 % contra el mes anterior". |
| Celular | Las barras verticales pasan a horizontales. |
| Impresión | Fondo blanco y sin controles. |

**[Dudoso]**
- La escala de azules que propone (`#7ab3f0`, `#3874cb`, `#004992`) no cumple su propia regla. Los tonos vecinos contrastan 2,11:1 y 1,91:1, y el más claro da 2,2:1 sobre blanco. Lo que funciona es la separación de 1px y las etiquetas directas, no la escala. Para varias series conviene usar los colores de categoría (3.H), que ya están medidos: en un gráfico, cada serie es una clase de cosa.
- "Barras con tramas" de relleno: contradice los fondos limpios (3.G) y ensucia. Con etiquetas directas no hace falta.
- "Imprimir en gris con tramas": la v3 ya imprime los colores que informan (6.G).

Cuando se arme la sección, conviene medir la paleta de datos antes de fijarla.

### P6. Tokens, nombres y documentación

- **Capas [Nuevo, liviano].** Las fuentes (Material, Carbon, Spectrum, el grupo de tokens del W3C) usan tres: primitivos, semánticos y de componente. Para 2 o 3 personas, la tercera es sobreingeniería. Recomienda dos: primitivos → semánticos. *Opinión:* la v3 ya es casi eso (los tokens son semánticos y el modo oscuro los redefine). Agregar los primitivos solo ordena; no es urgente.
- **Idioma [Decisión].** Recomienda todo el código en inglés y la documentación en español, con dos argumentos: CSS ya es en inglés, y los asistentes de IA aciertan más con nombres estándar. *Opinión:*
  - Unificar, sí: hoy conviven `--color-primary` con `--color-fondo` y `.btn-primary` con `.banda`.
  - La dirección no es obvia. Es inferencia del notebook, no una fuente. El argumento de la IA pesa poco: `DESIGN.md` lista las clases y el asistente las lee de ahí.
  - A favor del español: la mayoría de las clases ya están en español (`.banda`, `.secciones`, `.aviso`, `.tabla`, `.grilla`, `.segmentado`, `.migas`), los nombres cargan el concepto (banda, tinta, placa) y el equipo los lee más fácil.
  - A favor del inglés: si otro equipo o una librería externa lo toma.
  - En cualquier caso es un cambio mayor: renombra clases. Hacerlo antes de que la v3 sea oficial evita una segunda migración.
- **`tokens.json` [Nuevo, baja prioridad].** Publicar los tokens también en JSON, con el formato del W3C (`$value`, `$type`). Sirve si algún día se usa Tailwind compilado o una app móvil. Hoy sería un segundo archivo para mantener a mano: solo vale la pena si `unpsjb.css` se genera desde ahí.
- **Densidad [Nuevo].** En lugar de clases sueltas, un atributo en el contenedor que cambia los tokens de alto, relleno y tamaño de letra. Todo lo que está adentro se compacta sin tocar su HTML. *Opinión:* adoptar, con nombre en español (`data-densidad="compacta"`) y solo en escritorio. El notebook baja la letra a 14px: revisar, porque en inputs de celular eso dispara el zoom automático.
- **Ficha de cada componente [Nuevo].** GOV.UK usa cinco partes: ejemplo y descripción, cuándo usarlo, cuándo no (y qué usar en su lugar), cómo funciona y accesibilidad, y por qué se diseñó así. *Opinión:* `DESIGN.md` ya tiene buena parte. Llevar "cuándo sí / cuándo no" a `muestra.html`, al lado de cada ejemplo.
- **Evitar estilos sueltos [Nuevo en parte].**
  - **[Ya está]** Cargar `unpsjb.css` desde el servidor de recursos, sin copias locales.
  - **[Nuevo]** Lo que una herramienta necesite y no exista va en su propia hoja, con prefijo `.ext-<herramienta>`, y se anota para evaluarlo en el núcleo.
  - **[Dudoso]** "Prohibir el atributo `style`": la v3 lo usa a propósito para ajustar variables (`style="--grilla-min: 200px"`). La regla correcta es: en `style` solo variables del sistema, nunca colores ni medidas sueltas.

### P7. Páginas de entrada y validación

**Portal del wifi [Nuevo]**

| Tema | Regla | Opinión |
|---|---|---|
| Propósito | Una sola cosa: qué es, para quién y el botón. Sin menús. | Adoptar. |
| Términos | Un resumen de 3 o 4 puntos en lenguaje claro y el texto completo en un `<details>`. Nunca un cuadro con scroll interno. | Adoptar. |
| Aceptación | Sin casilla: el botón "Conectar al wifi" y, antes, la frase "Al tocar 'Conectar al wifi' aceptás las condiciones de uso". | Consultar antes con lo legal. Si piden una constancia expresa, va la casilla. |
| Peso | Un solo `.html`, con el CSS y el logo en SVG adentro. De 50 a 100 KB como máximo. | Apuntar a los 14 KB de 2.C: el logo pesa 3 KB. |
| Fuentes | Las del sistema (`system-ui`…), sin cargar Montserrat ni Atkinson. | Adoptar. Es el único caso donde no van las fuentes propias. |
| Idioma | Selector "ES \| EN" arriba a la derecha. | Adoptar si hay visitantes de afuera: son tres o cuatro textos. |

**Páginas públicas [Nuevo].** Las fuentes separan lo público (más marca) de lo interno (más denso). Propone logo completo, header extendido con selector de sede, pie extendido y un contenedor de lectura de 720 a 1024px.
- *Opinión:* adoptar el **pie extendido** (dirección, teléfono, enlaces legales, redes oficiales) y el contenedor de lectura.
- Se descarta el header extendido: la misma banda en todos lados es la identidad del sistema.
- El logo completo solo va de 96px para arriba (10.A): en una portada, no en la banda.

**Pruebas con personas [Nuevo]**
- **Qué dicen las fuentes:** con 5 personas aparece la mayoría de los problemas (Nielsen Norman Group). Probar con personas que usan lector de pantalla, ampliador o solo teclado es la única forma de validar la accesibilidad real.
- **Plan mínimo:**
  - 5 o 6 personas por ronda: 2 estudiantes, 2 nodocentes, 1 docente, y al menos una persona con baja visión, daltonismo o movilidad reducida.
  - 30 minutos cada una, con una tarea real ("Reservá el aula 102 para el viernes a las 14"), pensando en voz alta. Quien observa no interviene.
  - Se anota: ¿la terminó sin ayuda?, ¿dónde dudó?, y de 1 a 7, qué tan fácil le resultó.
  - Una ronda por cuatrimestre, o antes de una versión mayor.
- *Opinión:* adoptar. La primera ronda puede ser la v3 misma, antes de hacerla oficial. Combina con el pendiente de la prueba con Orca y en un celular real.

**Canal de reportes [Nuevo].** Un link fijo en el pie de todas las herramientas, "Reportar un problema", que abre un formulario de tres campos: tipo (error, accesibilidad o sugerencia), qué pasó y una captura opcional. Los errores y fallos de accesibilidad van a la siguiente versión de arreglo. Lo que pidan dos o más herramientas va a la siguiente versión menor. *Opinión:* adoptar, y además cumple el criterio de ayuda consistente (3.2.6). El notebook le pone un emoji al link: va un ícono Lucide (`message-square-warning`).
