# Bitácora — Sistema de Diseño UNPSJB

## 2026-09-26 — Sesión 1: arranque y fusión de borradores

### Contexto
- Objetivo: crear un sistema de diseño para que todas las páginas y herramientas web de la UNPSJB (Delegación Trelew) sigan una lógica visual pareja.
- Punto de partida: dos borradores armados con NotebookLM a partir de estrategias de diseño de entes públicos.
- El manual de marca de 2008 **no se toma como regla** (estaba pensado para impresos, no para web).
- Moodle (aula virtual) queda fuera del alcance por ahora.

### Qué hicimos
1. Copiamos la skill `design-md-unpsjb` a la carpeta como `DESIGN.md`.
2. Guardamos el borrador extendido ("Framework de Diseño Digital UNPSJB, Edición Extendida 2026") en `FRAMEWORK.md`, solo con el formato Markdown ordenado y sin cambios de contenido.
3. Comparamos los dos: no eran lo mismo, sino complementarios. `DESIGN.md` define el *look* (tipografías, radios, componentes); `FRAMEWORK.md` define arquitectura, PWA, header/footer, estados, íconos e IA.
4. Definimos la tecnología:
   - **Base común:** una hoja de estilos central `unpsjb.css` (tokens + clases de componentes), que sirve tanto para HTML como para React.
   - **Herramientas simples → HTML plano** (archivo único).
   - **Aplicaciones complejas → React + Vite** (ej.: visor de cámaras, sistema de gestión de eventos).
5. Fusionamos ambos borradores en un único `DESIGN.md` (12 secciones).

### Decisiones y correcciones aplicadas en `DESIGN.md`
| Tema | Antes | Ahora | Motivo |
|---|---|---|---|
| Estilos | Tailwind por CDN | `unpsjb.css` central (Tailwind compilado permitido en React) | El CDN pesa cientos de KB y no es para producción; contradecía la regla de los 14KB |
| API key de Gemini | Hardcodeada en el JavaScript | Proxy en el servidor (Proxmox); clave personal opcional en `localStorage` | Cualquier visitante podía ver y usar la clave institucional |
| Anillo de foco | Naranja solo | Doble anillo: naranja adentro + azul afuera | El naranja sobre blanco da 2.1:1; WCAG pide 3:1 |
| Color de éxito | emerald-600 | emerald-700 (`#047857`) | El 600 no llegaba a 4.5:1 como texto |
| Advertencia | Texto naranja `#ff9900` | Texto `#b45309`; el naranja queda para bordes e íconos | Contraste insuficiente |
| Texto del footer | slate-400 | slate-500 como mínimo | Contraste insuficiente |
| URL del logo | `http://` | `https://` | El navegador bloquea recursos HTTP en páginas seguras; las PWA exigen HTTPS |
| Twemoji | Original de Twitter | Fork `jdecked/twemoji` | El original está abandonado |
| Fuentes | Sin especificar el origen | Servidas desde el servidor de recursos, no desde Google Fonts | Rendimiento e independencia |

**Agregados nuevos:** escala tipográfica completa (display → caption), escala de espaciado de 4px, radios, breakpoints, modo oscuro con tokens propios, estados de botones, reglas de tablas, modales (Esc y foco atrapado), labels visibles en inputs, toasts no usados para errores importantes y una sección de accesibilidad.

### Avisos técnicos para los proyectos grandes
- **Cámaras:** los navegadores no reproducen RTSP directamente. Hace falta un conversor en el servidor (MediaMTX o go2rtc).
- **Eventos:** además del frontend, necesita un backend con base de datos y manejo de usuarios.

### Pendientes
- [ ] Revisar `DESIGN.md` y confirmar o ajustar las decisiones de la tabla.
- [ ] Confirmar si existe la URL `recursos.tw.unp.edu.ar` o si es tentativa.
- [ ] Borrar `FRAMEWORK.md` cuando se confirme que no falta nada.
- [ ] Actualizar la skill `design-md-unpsjb` con la versión nueva de `DESIGN.md`.
- [x] **Paso 2:** crear `unpsjb.css` con tokens y componentes base (sesión 2).
- [x] **Paso 3:** página de muestra con todos los componentes (sesión 2).
- [ ] (Opcional, más adelante) Subir el sistema a Claude Design con `/design-sync`.

## 2026-09-29 — Sesión 2: `unpsjb.css` y página de muestra

### Qué hicimos
1. Creamos `unpsjb.css` (v0.1.0): tokens como variables CSS, base, header, footer, pestañas, menú inferior, botones, inputs, tarjetas, tablas, insignias, banners, toasts, modales, estados vacíos, componentes de IA y utilidades. Pesa ~18KB (~5KB comprimido).
2. Creamos `muestra.html` con todos los componentes y un botón para cambiar el tema. La probamos en escritorio (claro y oscuro) y en móvil.

### Decisiones
- **Modo oscuro:** se activa solo si el sistema operativo lo pide. Se puede forzar con `<html data-theme="dark">` o `data-theme="light"`.
- **Tokens nuevos para modo oscuro** (agregados a `DESIGN.md`): `#94a3b8` para texto secundario y versiones claras del semáforo (`#34d399`, `#fbbf24`, `#fb7185`). Los originales no llegaban a 4.5:1 sobre fondo oscuro. Contrastes verificados: todos entre 5.4:1 y 9.3:1.
- **Modales:** se usa la etiqueta nativa `<dialog>` con `showModal()`. El navegador ya cierra con Esc y atrapa el foco, sin JavaScript extra.
- **Banners:** fondo blanco (no tintado), porque el rojo `#e11d48` sobre rosa claro baja de 4.5:1.
- **Fuentes:** `unpsjb.css` las busca en `fonts/` junto al archivo (`Inter-Variable.woff2`, `Montserrat-Variable.woff2`). Si no están, usa la fuente del sistema.
- **Menú inferior:** por debajo de 768px reemplaza a las pestañas que tengan la clase `tabs--responsive`.

### Pendientes nuevos
- [ ] Conseguir el SVG del isologo y las fuentes (woff2) para el servidor de recursos. En la muestra, el logo es un texto provisorio.
- [ ] Probar la muestra con lector de pantalla y navegando solo con teclado.

## 2026-09-29 — Sesión 3: DESIGN.md v2 "Señalética" (propuesta)

Con las skills frontend-design, UI/UX Pro Max e Impeccable se reescribió `DESIGN.md` para que tenga más carácter y se sienta menos plantilla. La versión anterior quedó en `DESIGN-v1.md`.

### Cambios clave
- **Concepto:** la interfaz como señalética. El azul es la placa (banda sólida del header, el único bloque grande de color) y el naranja significa "estás acá" (sección actual, foco, advertencias).
- **Neutros teñidos del azul** en lugar de la paleta `slate` de Tailwind. 36 combinaciones verificadas, todas AA.
- **Corrección de accesibilidad:** los inputs pasan a tener un borde de 3.4:1 (`linea-control`); antes era 1.2:1 y no cumplía WCAG 1.4.11.
- **Tipografía:** se mantiene Montserrat (argentina, nacida de la cartelería porteña) solo para títulos; Inter se reemplaza por **Atkinson Hyperlegible Next** para texto y datos. Mínimo de texto sube de 12 a 13px.
- **Radios:** 4px (controles) y 8px (contenedores). Se elimina el de 16px.
- **Avisos:** de franja de 4px a "placa de estado" con el ícono sobre un bloque de color sólido.
- **Tablas:** encabezado en gris `capa` con línea azul de 2px, en lugar de relleno azul completo.
- **Toasts:** fondo oscuro institucional, duran 5 s (antes 3) y se pausan con el mouse.
- **Íconos:** Lucide en toda la interfaz; nada de emojis como íconos. Twemoji deja de ser obligatorio.
- **IA:** sin brillos. Botón secundario con ícono `sparkles`; la marca "Generado por IA" va arriba a la izquierda del panel.
- **Nuevas secciones:** estructura del header con navegación sobre la banda, tamaños táctiles de 44px, movimiento, estados de carga y "Cómo se escribe" (tratamiento de vos, verbos en botones, formato argentino de fechas y números).

### Pendientes nuevos
- [x] Revisar y aprobar la propuesta v2 (o volver a `DESIGN-v1.md`). Aprobada en la sesión 5.
- [x] Si se aprueba: actualizar `unpsjb.css` y `muestra.html` (sesión 5).
- [ ] Conseguir el isologo en versión blanca y el escudo solo en blanco.
- [x] Descargar Atkinson Hyperlegible Next (woff2 variable) y verificar que tenga cifras tabulares (sesión 4: sí las tiene).
- [ ] Confirmar el tratamiento de "vos" en las herramientas.

## 2026-09-29 — Sesión 4: `unpsjb-v2.css` de prueba

### Qué hicimos
1. Bajamos las fuentes a `fonts/` (woff2 variables, solo caracteres latinos): Montserrat, Inter y Atkinson Hyperlegible Next.
2. Creamos `unpsjb-v2.css`, que implementa la propuesta v2 "Señalética". Convive con `unpsjb.css` (v1), que no se tocó.
3. Creamos `muestra-v2.html` (mismo contenido que la muestra v1, más lo nuevo: navegación en la banda, botón cargando, esqueletos, fila seleccionada, acciones de IA, toast con pausa) y `comparar.html` para ver las dos lado a lado.
4. Probamos en Chrome: escritorio claro y oscuro, celular, modal y toast.

### Correcciones que surgieron al implementar
- **Rojo para texto de error:** `#e11d48` como texto baja a 3.9:1 sobre el tinte de las insignias y a 4.3:1 sobre `fondo`. Se agregó `error-text: #be123c` (5.2:1 o más) y se actualizó `DESIGN.md`.
- **Modal:** solo sombra, sin borde (el detector de Impeccable marcó "borde fino + sombra ancha" como tic de plantilla).
- **Sombra de lo que flota:** negro neutro en lugar de azul teñido.
- **Header en celular:** el nombre de la herramienta va en un renglón y se recorta con "…" si no entra.

### Excepciones del detector de Impeccable (`.impeccable/config.json`)
- Montserrat marcada como "fuente sobreusada": se mantiene porque el pedido la conserva como fuente institucional.
- "Jerarquía plana" y "relleno apretado" en `muestra-v2.html`: falsos positivos (Chrome mide h1 32px, h2 24px, h3 19px; las celdas tienen 16px de relleno).

## 2026-09-29 — Sesión 5: v2 oficial y emojis de Twitter

### Pendientes
- [x] Versión del logo para la banda azul (sesión 6, falta tu revisión).
- [ ] Probar la fuente de emojis en Safari (Mac/iPhone) y en Windows.

### Decisiones
- **La v2 "Señalética" es la base oficial** (puede tener ajustes, pero sobre esa base). `unpsjb.css` y `muestra.html` ahora son la v2; la v1 quedó en `unpsjb-v1.css` y `muestra-v1.html`.
- **Emojis de Twitter en todas las herramientas**, también mientras se escribe. Se usa `jdecked/twemoji` (v17.0.3, junio 2026, cubre Emoji 17), el fork mantenido.

### Cómo se resolvió
- Los SVG de Twemoji se convierten en una **fuente de color** (COLRv0, funciona en Chrome, Edge, Firefox y Safari) con `nanoemoji`, una herramienta libre de Google. `unpsjb.css` la pone después de las fuentes de texto, así que todo emoji de la página, incluidos `input` y `textarea`, se dibuja con Twemoji sin JavaScript.
- Se descartó la fuente de Mozilla (Twemoji Mozilla): su última versión es de 2022 (Emoji 14).
- Se descartó `twemoji.parse` para mostrar contenido: con la fuente no hace falta y se evita subir 4000 SVG al servidor.
- `emoji/preparar.py` resuelve que Twemoji nombra los archivos sin el selector FE0F: cada emoji se registra con y sin FE0F según la lista oficial de Unicode.
- `emoji/construir.sh <Twemoji> <Unicode>` rehace la fuente cuando salga una versión nueva.

### Resultado de la prueba
- `fonts/TwemojiUNPSJB.woff2`: **610KB**, 4021 emojis (todo Unicode 17). Compilarla tardó ~22 minutos.
- Probado en Chrome y Firefox: familias (ZWJ), banderas, tonos de piel, teclas (#️⃣ 1️⃣), corazón con FE0F y los emojis nuevos de Unicode 16 y 17 se ven con Twemoji en `textarea`, `input` y texto común. Con la fuente del sistema, los de Unicode 17 salen como cuadrados vacíos.
- Verificado con un servidor local: una página sin emojis (aunque tenga ©, ®, flechas o números) **no** descarga la fuente; una con un emoji, sí.
- `muestra.html` tiene una sección "Emojis" para probar escribiendo.

### Logo
- Apareció `logo unpsjb_SEDE TW.eps` (Illustrator, abril 2026): óvalo azul con gaviota y "Sede Trelew" en gris oscuro. Su azul es más claro que `#004992` y el texto gris no se lee sobre la banda azul: hace falta una versión para fondo azul.

## 2026-09-29 — Sesión 6: logo para la banda

### Qué hicimos
- Analizamos `logo unpsjb_SEDE TW.eps`: el óvalo con la gaviota es una **foto JPEG en CMYK**, no un vector. El texto curvo, la barra y "Sede Trelew" sí son vectoriales.
- Generamos tres SVG en `assets/`:
  - `logo-unpsjb-trelew-blanco.svg` (banda azul): óvalo a color, textos y barra en blanco. ~23KB comprimido.
  - `escudo-unpsjb-blanco.svg` (banda en celular): solo el óvalo y el texto curvo en blanco. ~21KB.
  - `logo-unpsjb-trelew.svg` (fondos claros e impresos): colores originales. ~58KB.
- El óvalo no se recoloreó: su azul (`#347EBB`) es parte de la marca, no un color de interfaz.
- Header: logo de 48px (banda de 64px en escritorio), separador con 24px de aire a cada lado para que la barra del logo y la del header no se amontonen. Celular: escudo de 36px.
- `logo/generar.sh` rehace los tres SVG desde el EPS (probado: da archivos idénticos).
- `DESIGN.md` actualizado (secciones 5.C, 6.A y 10.A).

### Pendientes
- [ ] Revisar cómo quedó el logo en la banda.
- [ ] Consultar si existe una versión vectorial de la gaviota (se vería más nítida y pesaría menos).

### Archivos en la carpeta
- `DESIGN.md`: sistema de diseño unificado (fuente de verdad). Desde la sesión 3, propuesta v2 "Señalética".
- `DESIGN-v1.md`: versión anterior de `DESIGN.md`, para comparar.
- `FRAMEWORK.md`: borrador original extendido (referencia, se borrará).
- `unpsjb.css` / `muestra.html`: versión oficial (v2 "Señalética").
- `unpsjb-v1.css` / `muestra-v1.html`: versión anterior.
- `comparar.html`: v1 y v2 lado a lado.
- `fonts/`: fuentes woff2 (Montserrat, Inter, Atkinson Hyperlegible Next, Twemoji UNPSJB).
- `emoji/`: `construir.sh` y `preparar.py` para regenerar la fuente de emojis.
- `logo unpsjb_SEDE TW.eps`: logo original de la Sede Trelew (Illustrator).
- `assets/`: versiones web del logo (SVG).
- `logo/`: `generar.sh` y `armar.py` para regenerar los SVG del logo.
- `BITACORA.md`: este archivo.

## 2026-09-30 — Sesión 7: piezas generales para los próximos proyectos (v2.1.0)

### Por qué
Se revisó si `unpsjb.css` alcanza para los próximos proyectos: visor de cámaras/DVR, gestión de eventos y aulas, portal del wifi y reestructuración de webapps. Conclusión: los componentes base sirven, pero faltaban piezas de **estructura** y de **controles**. Plan en 4 pasos:
1. Piezas generales en `unpsjb.css` (esta sesión).
2. Módulos aparte: `unpsjb-video.css` (cámaras, línea de tiempo) y `unpsjb-agenda.css` (grilla de horarios por aula).
3. Versión mínima para el portal del wifi, incluida dentro del HTML (antes de aceptar los términos la red suele bloquear el servidor de recursos).
4. Webapps: cuando llegue la información.

### Qué se agregó (`unpsjb.css` 774 → ~1080 líneas)
- **Contenedores:** `.container--ancho` (toda la pantalla) y `.container--angosto` (560px).
- **Grilla:** `.grilla` automática (`--grilla-min`), `--2/--3/--4`, `--lateral` (280px + contenido), `--compacta`, `.grilla__completa`.
- **Migas de pan:** `.migas`.
- **Controles:** `.grupo-campos` (fieldset para radios), `.interruptor` (switch, radio 4px), `.segmentado` (radios con aspecto de botonera), `.buscador`, cifras fijas en fecha/hora.
- **Paginación:** `.paginacion` (en celular solo Anterior/Siguiente).
- **Categorías:** tokens `--color-cat-1..5` (violeta, cian, fucsia, oliva, pizarra = "Otros"), clases `.cat-N` que definen `--cat`, y `.categoria` (cuadrado + nombre).
- **Impresión** (sección 9 nueva): siempre en claro, banda blanca con logo a color, se ocultan navegación y botones, cabecera de tabla repetida, `.no-imprimir` y `.solo-impresion`.

### Decisiones
- **Las categorías no son estados:** tonos lejos del semáforo y del azul; cuadrado + nombre, sin fondo, para no confundirse con una insignia. Máximo 5.
- **Interruptor con radio de 4px**, no píldora: `full` sigue reservado a avatares.
- **Página actual de la paginación en azul**, como las pestañas: el naranja queda para la navegación principal.
- **La grilla automática usa `auto-fill`**: las celdas miden siempre lo mismo aunque sobre lugar (importante en un muro de cámaras).
- **Segmentado elegido y casillas en `primary-text`:** con `#004992` el seleccionado daba 1.8:1 sobre el panel oscuro; con `primary-text` da 7.3:1. Esto corrigió también un problema previo: en oscuro, las casillas y radios marcados casi no se veían.
- **Impresión:** `:root:root:root` para ganarle al modo oscuro; el logo se cambia con `content: url(...)` sobre el `<img>`.

### Verificación
- Capturas en Chrome: escritorio 1280px, celular 390px, oscuro. PDF de impresión en claro y con `data-theme="dark"`: sale en claro, con el logo a color y sin navegación.
- Contraste de las 5 categorías: todas ≥ 4.5:1 sobre `panel` y `fondo`, en claro y oscuro.

### Pendientes
- [ ] Revisar las piezas nuevas en `muestra.html` (secciones "Más controles", "Grilla", "Categorías", "Impresión" y la paginación bajo la tabla).
- [ ] Imprimir en Firefox: verificar el cambio de logo con `content: url(...)`.
- [ ] Paso 2: módulos de video y agenda.
- [ ] Averiguar qué controlador maneja el portal del wifi (UniFi, Mikrotik, Cisco…).
- [ ] La skill sincronizada `design-md-unpsjb` tiene todavía el DESIGN.md original (colores slate): actualizarla desde claude.ai con el DESIGN.md actual.

## 2026-09-30 — Sesión 8: prueba del logo sin el texto curvo

### Qué hicimos
- Prueba en `prueba-logo/` (los logos oficiales de `assets/` **no se tocaron**). Se quitó el texto curvo "Universidad Nacional de la Patagonia San Juan Bosco": es vectorial y tiene su propio color en el EPS (`#231f20`), así que sale limpio sin tocar la foto de la gaviota.
- Dos variantes:
  - **A:** sin texto, todo en su lugar (queda un hueco entre el óvalo y la barra).
  - **B:** sin texto, con la barra y "Sede Trelew" corridas hacia el óvalo (mismo aire a los dos lados de la barra) y la barra centrada con el óvalo. A la misma altura, el óvalo sale ~9% más grande.
  - Escudo para celular: solo el óvalo.
- `prueba-logo/armar_sin_texto.py` rehace las variantes desde `assets/logo-unpsjb-trelew.svg`. `prueba-logo/comparar-logo.html` las compara en la banda, en celular y sobre blanco.

### Observaciones
- A 48px (banda) y 36px (celular) el texto curvo no se lee: queda como un borde borroso.
- Quitarlo es una decisión de marca, no técnica: el texto es el nombre de la universidad y forma parte del isologo oficial. Hay que consultarlo con quien maneja la marca (¿el manual de 2008 define una versión reducida o un tamaño mínimo con leyenda?).

### Pendientes
- [x] Decisión: se usa la variante B, sin el texto curvo, "de momento" (sesión 9).
- [ ] Confirmar con el responsable de la marca.

## 2026-09-30 — Sesión 9: logo sin texto adoptado + prueba minimalista

### Logo adoptado
- **Se usa la variante B (sin el texto curvo, compacta) "de momento".** `logo/armar.py` ahora la genera desde el EPS con los mismos nombres de archivo, así que la banda, el celular y la impresión la toman sin cambios en el CSS:
  - `logo-unpsjb-trelew-blanco.svg` (banda, 101×48px), `escudo-unpsjb-blanco.svg` (solo el óvalo, 29×36px), `logo-unpsjb-trelew.svg` (fondos claros e impresión).
  - Nuevo: `logo-unpsjb-trelew-completo.svg`, el original con el texto curvo, para usos grandes.
- Verificado: los archivos generados son idénticos píxel a píxel a la prueba B aprobada y el completo al logo anterior.
- De paso se limpió una referencia a un recorte (`clip-0`) que no existía en el SVG; los navegadores la ignoraban.
- `muestra.html`: medidas del `<img>` actualizadas (101×48 y 29×36). `DESIGN.md` 6.A y 10.A actualizados.
- Respaldo de los SVG anteriores: en el directorio temporal de la sesión (se borra con la sesión); se pueden rehacer desde el EPS con la versión vieja de `armar.py`.

### Prueba minimalista (`prueba-logo/minimalista/`)
- La gaviota se redibujó **como vector**: se separan por color el cuerpo, las puntas oscuras y el pico; se suavizan las máscaras para borrar las plumas y se vectorizan con potrace (`potracer`, en Python).
- Dos niveles:
  - **Plano:** óvalo azul, gaviota blanca, puntas `#4e4d49` y pico `#eab645` (sin patas ni la mancha de la cola). Escudo: 1,1KB comprimido.
  - **Monocromo:** solo la silueta blanca. Escudo: 0,9KB.
- Contra la foto (13–15KB): unas 10 veces más livianos y nítidos a cualquier tamaño. A 16px (favicon) la foto es una mancha gris; plano y monocromo se siguen leyendo.
- `vectorizar.py` rehace todo (necesita numpy, pillow y potracer: ver el encabezado del script). `comparar.html` compara foto, plano y monocromo en la banda, en celular, como favicon y sobre blanco.

### Pendientes
- [ ] Elegir: seguir con la foto, o pasar a plano o monocromo (o plano en la banda y monocromo para favicon).
- [ ] Redibujar la gaviota es un cambio de marca mayor que quitar el texto: confirmarlo con el responsable de la marca. La silueta sale de la foto original, pero un diseñador podría afinar la cabeza y las alas.

## 2026-09-30 — Sesión 10: variante geométrica de la gaviota

### Decisiones del usuario
- **Le gustó el modelo plano** (3 colores). El monocromo quedaría solo para favicon, y está en duda.
- Pidió probar una variante más "geométrica".

### Qué hicimos (`prueba-logo/geometrico/`)
- `geometrico.py`: la silueta se vectoriza como **polígono** (potrace con `alphamax=0`) y se simplifica con Ramer-Douglas-Peucker. Las puntas de las alas son el ala **cortada por una recta** (perpendicular al ala, donde empieza lo oscuro); el pico es un **triángulo** con el largo y el grosor medidos del original. Mismos colores que el plano.
- Dos grados:
  - **Facetado** (tolerancia 0,9pt → 24 vértices): la misma gaviota con lados rectos.
  - **Angular** (1,3pt → 17 vértices): más símbolo. Con 1,8pt (11 vértices) se perdía la cabeza y parecía un avión: descartado.
- `comparar.html`: plano (elegido) contra facetado y angular, en banda, celular, favicon y sobre blanco.
- Escudos de menos de 1KB comprimidos.

### Observaciones
- A 48px o menos las tres se ven casi iguales; la diferencia aparece en tamaños grandes (impresos, pantallas de bienvenida).

### Pendientes
- [x] **Descartadas las dos variantes geométricas** (no convencieron). Se borró `prueba-logo/geometrico/`. Queda el modelo **plano** (`prueba-logo/minimalista/`).
- [x] Pasar la gaviota plana a `logo/generar.sh` y reemplazar la foto en `assets/` (sesión 11).
- [ ] Confirmar con el responsable de la marca.

## 2026-09-30 — Sesión 11: gaviota plana en assets

### Qué hicimos
- **La gaviota plana reemplaza a la foto** en las versiones web de `assets/`: banda (`logo-unpsjb-trelew-blanco.svg`), celular (`escudo-unpsjb-blanco.svg`) y fondos claros e impresión (`logo-unpsjb-trelew.svg`). Mismos nombres y proporciones: el CSS y `muestra.html` no cambian.
- `logo-unpsjb-trelew-completo.svg` sigue siendo el original (foto + texto curvo), para usos grandes.
- Pesos comprimidos: banda 15KB → 2,7KB; escudo 13KB → 1,2KB; fondos claros 48KB → 2,7KB.
- Verificado: los tres archivos son idénticos píxel a píxel a la prueba del modelo plano que se aprobó; el completo no cambió.

### Cómo se genera ahora
- `logo/vectorizar.sh "logo unpsjb_SEDE TW.eps"`: vectoriza la gaviota y la guarda en `logo/gaviota-plana.svg` (2KB). **Solo si cambia el EPS.** La primera vez instala numpy, pillow y potracer en `~/.cache/unpsjb-logo/venv` (~100MB, fuera del proyecto para no copiarlo al servidor). Probado desde cero: da la misma gaviota byte a byte.
- `logo/generar.sh "logo unpsjb_SEDE TW.eps"`: arma los cuatro SVG usando la gaviota guardada. No necesita librerías extra.
- `logo/gaviota-plana.svg` no se edita a mano.

### Archivos nuevos
- `logo/vectorizar.sh`, `logo/vectorizar.py`, `logo/gaviota-plana.svg`, `assets/logo-unpsjb-trelew-completo.svg`.
- `prueba-logo/` queda como registro de las pruebas (variantes A/B y minimalista). `prueba-logo/minimalista/vectorizar.py` quedó reemplazado por `logo/vectorizar.py`.

### Pendientes
- [ ] Monocromo como favicon: en duda. Si se decide, se agrega a `logo/vectorizar.py` (la silueta ya está) y a `generar.sh`.
- [ ] Confirmar la gaviota plana y el logo sin texto con el responsable de la marca.

## 2026-09-30 — Sesión 4: feedback del notebook de referencia

Se consultó el notebook "Digital Infrastructure: Design Systems, Typography, and Responsibility Matrices" (99 fuentes; se abre en el navegador "Browser 1", no en el otro) con un resumen de la v2. Detalle completo en `FEEDBACK-NOTEBOOK.md`.

- **Valida:** naranja como "estás acá", neutros teñidos, errores fuera de los toasts, Lucide sin emojis, `unpsjb.css` + HTML/React, estructura del header.
- **No aplican:** las críticas al texto de 13px y a los toasts (DESIGN.md ya usa 16px en el cuerpo y toasts con cierre, pausa con foco y `role="status"`).
- **A evaluar:** peso del header azul en pantallas densas y los radios (se mantienen).

### Pendientes nuevos
- [ ] Logo en tres tamaños (grande / medio / silueta para favicon).
- [ ] Serif para documentos solemnes o impresión (resoluciones, certificados).
- [ ] Decidir si `unpsjb.css` se aplica como tema sobre los sistemas SIU o si quedan fuera del alcance.
- [ ] Variante de tabla en tarjetas apiladas para móvil.
- [ ] Gobernanza: quién aprueba componentes y tokens nuevos.

### Ronda 2 de consultas (mismo día)
Ocho preguntas por tema (header, logo, SIU, tipografía, redacción, gobernanza, patrones faltantes, color), pasándole los valores exactos de DESIGN.md. Todo documentado en `FEEDBACK-NOTEBOOK.md`, que arranca con una tabla de 12 acciones priorizadas.

Hallazgos principales:
- **Header en dos niveles:** banda azul solo con marca, herramienta y cuenta; las pestañas pasan a una sub-barra clara. Con 5 o más secciones no entran en 64px.
- **Naranja sobrecargado:** hoy marca ubicación, foco y advertencia. Propuesta: la advertencia pasa a ámbar `#b45309`. Además, DESIGN.md se contradice (3.B prohíbe el naranja como relleno y 8.A lo usa en la placa de advertencia).
- **Selector manual de tema** además del automático.
- **Títulos:** interlineado de 1.25 como mínimo por las tildes en mayúscula de Montserrat 800.
- **6 patrones nuevos:** sesión por vencer, multipaso con revisión, páginas de error, filtros, carga de archivos, comprobante.

### Pendientes nuevos (ronda 2)
- [ ] Decidir y aplicar las 12 acciones de `FEEDBACK-NOTEBOOK.md` en DESIGN.md, `unpsjb.css` y `muestra.html`.
- [ ] Confirmar si el ave del escudo es gaviota o albatros (el notebook dice albatros).
- [ ] Averiguar quién administra los sistemas SIU y si permiten inyectar CSS.
- [ ] Averiguar quién cumple el rol de marca/comunicación para la matriz RACI.

## 2026-09-30 — Sesión 5: v3 "propuesta" con las 12 acciones

Se aplicaron las 12 acciones de `FEEDBACK-NOTEBOOK.md` en una **versión aparte**. La oficial sigue siendo la v2.1 (`DESIGN.md`, `unpsjb.css`, `muestra.html`), que no se tocó.

### Archivos nuevos
- `DESIGN-v3.md`, `unpsjb-v3.css` (55 KB, 14,5 KB comprimido) y `muestra-v3.html` (con una sección por cada patrón nuevo).
- `assets/favicon-unpsjb.svg` (logo nivel S): la gaviota blanca de `prueba-logo/minimalista/escudo-mono.svg` sobre un cuadrado `#004992`.
- `comparar-v3.html`: v2 y v3 lado a lado.
- `CHANGELOG.md`: registro de cambios, con la guía para migrar de 2.1 a 3.0.

### Decisiones
- **Header en dos niveles:** la banda se queda en 64px con el logo de 48px; la sub-barra mide 48px. `.banda__nav` queda obsoleta hasta la v4.
- **Advertencia en ámbar `#b45309`** en claro y en oscuro (3,2:1 sobre `dark-panel`). La insignia de advertencia usa un tinte del 6%.
- **Selector de tema en el pie**, guardado en `localStorage` con la clave `unpsjb-tema`, y un script de una línea en el `<head>`.
- Se verificaron las fuentes con fontTools (instalado en un entorno temporal): ya están recortadas al español y **tienen cifras tabulares**.

### Cómo se verificó
- Capturas headless con Google Chrome: escritorio (1280px) y celular (390px), en claro y oscuro. Además, impresión a PDF.
- axe-core 4.10: sin errores propios en claro ni en oscuro.
- Selector de tema (se guarda y sobrevive a la recarga) y aviso de sesión (foco inicial, cuenta regresiva, aviso al lector de pantalla), probados en el navegador.

### Pendientes nuevos
- [ ] Revisar la v3 en `comparar-v3.html` y decidir si pasa a ser la oficial. Si pasa: renombrar los archivos -v3, guardar la v2 como -v2 y actualizar la skill `design-md-unpsjb`.
- [ ] Generar el logo monocromo y las versiones PNG del favicon con `logo/generar.sh`.
- [ ] Hacer la prueba con Orca y en un celular real (la lista de la sección 9).

## 2026-10-01 — Sesión 6: ronda 3 de feedback del notebook (sobre la v3)

Siete consultas al notebook de referencia, esta vez con los valores exactos de `DESIGN-v3.md`. Todo quedó en `FEEDBACK-NOTEBOOK.md`: el resumen con 14 acciones arriba y el detalle por pregunta al final. **No se cambió nada del diseño**: `DESIGN-v3.md`, `unpsjb-v3.css` y `muestra-v3.html` siguen igual.

### Hallazgos principales
- **Header fijo y foco tapado (WCAG 2.2, 2.4.11):** la cabecera ocupa 112px fijos y el CSS no tiene `scroll-padding`. Con zoom al 200% se lleva casi un tercio de la pantalla. GOV.UK, USWDS y Poncho no fijan el header.
- **Botón primario en oscuro:** `#004992` contra el panel `#122234` da 1,82:1 (medido). Candidato: `#3874cb` solo en oscuro (3,47:1 sobre panel, 3,02:1 sobre capa, texto blanco 4,64:1).
- **Menú inferior:** la sub-barra admite 6 secciones y el menú inferior 5. Falta la regla "4 + Más".
- **Columna fija de las tablas:** no tiene ancho máximo.
- **Entrada redundante (3.3.7):** falta la regla de precargar lo que ya trae el ingreso único.
- **Faltan 7 componentes** (combobox, lista de resumen, acordeón, contador de caracteres, panel lateral, banner de fase, etiquetas) y conviene escribir los 5 que no se agregan.
- **Reglas para los módulos de agenda y video**, para gráficos, para el portal del wifi y para páginas públicas.
- **Pruebas con personas** (5 o 6 por ronda) y un link "Reportar un problema" en el pie.

### Críticas que no aplican
- Doble anillo de foco, serif para documentos y enlace "Ir al contenido": la v3 ya los tiene.
- "La banda azul deslumbra en oscuro": el notebook lo retiró al pasarle los valores.
- La escala de azules para gráficos que propone no cumple su propia regla (medida: 2,11:1 y 1,91:1 entre tonos vecinos).

### Pendientes nuevos
- [ ] Decidir cuáles de las 14 acciones de la ronda 3 se aplican (las 5 primeras son correcciones).
- [ ] Decidir el idioma de los nombres en el código (hoy mezclados) **antes** de hacer oficial la v3.
- [ ] Decidir si la cabecera sigue fija.
- [ ] Consultar con lo legal si el portal del wifi puede aceptar los términos con el botón, sin casilla.
- [ ] Primera ronda de pruebas con personas, sobre la v3.

### Nota técnica (para consultar el notebook)
- El notebook abre solo en el navegador "Browser 1". Ninguno de los dos navegadores conectados se identifica como Brave.
- Con la pestaña en segundo plano, los temporizadores de JavaScript se frenan: cargar el texto y hacer clic en "Enviar" van en dos llamadas separadas, sin esperas adentro.

## 2026-10-01 — Sesión 7: v3.1, las 5 correcciones de la ronda 3

Se aplicaron las 5 correcciones sobre la v3 propuesta, que pasa a 3.1.0. La oficial sigue siendo la v2.1 (sin tocar).

### Archivos
- Cambiados: `unpsjb-v3.css` (3.1.0), `DESIGN-v3.md`, `muestra-v3.html`, `CHANGELOG.md`, `comparar-v3.html` (solo el rótulo).
- Nuevos: `unpsjb-v3.0.css` (copia de la hoja 3.0, sin cambios), `muestra-v3.0.html` (el mismo contenido de la muestra nueva con la hoja 3.0) y `comparar-v3.1.html` (antes y después, con un botón por corrección).

### Qué se hizo
1. **Foco no tapado:** `scroll-padding` en `html` con el alto de la cabecera (y del menú inferior en celular); con 600px de alto o menos la cabecera deja de ser fija.
2. **Botón primario en oscuro:** `#3874cb` (hover `#316bbf`), con tokens propios `--color-primary-fill`.
3. **Menú inferior:** con 6 secciones, 4 + "Más" (`.modal.modal--inferior`). La muestra pasó a tener 6 secciones (se sumó "Certificados").
4. **Columna fija:** tope de 140px o 40% de la pantalla en celular; `--tabla-fija-min` opcional.
5. **No pedir dos veces el mismo dato:** regla en 8.F y ejemplo "Datos que ya tenemos" en la muestra. Sin CSS nuevo.
- `DESIGN-v3.md` pasa a tener como objetivo WCAG 2.2 AA, con la tabla de los seis criterios nuevos.

### Cómo se verificó
- Prueba automática en Chrome: se enfoca cada control de la muestra, hacia adelante y hacia atrás, y se mide si queda bajo la cabecera o el menú inferior. En la 3.0: 16 controles totalmente tapados en escritorio (1280×668) y 7 en celular (390×844). En la 3.1: 0 en todos los tamaños probados (1280×668, 1366×560, 683×334, 390×844, 360×640, 320×568), en claro y en oscuro.
- Capturas de antes y después de cada corrección, y de la página de comparación.
- No se volvió a pasar axe ni la impresión a PDF.

### Lo que apareció
- La primera versión de la columna fija la aplastaba a una letra por renglón (por `overflow-wrap: anywhere`). Corregido antes de terminar.
- La banda en celular mide 60px, no los 56px que dice `DESIGN-v3.md` (5.C): manda el botón de 44px más 8px arriba y abajo. Ya pasaba en la 3.0.
- A 320px de ancho hay scroll horizontal en la muestra (pestañas internas y renglón de archivo en carga). Ya pasaba en la 3.0.

### Pendientes nuevos
- [ ] Revisar `comparar-v3.1.html` y decidir si la 3.1 pasa a ser la oficial.
- [ ] Corregir el scroll horizontal a 320px y el dato de los 56px de la banda en celular.
- [ ] Volver a pasar axe y la impresión sobre la 3.1.
- [ ] Decidir los agregados 6 a 14 de la ronda 3.

## 2026-10-01 — Sesión 8: la v3.1.0 pasa a ser la oficial

### Decisión
- **La v3.1.0 "Señalética" es la versión oficial.** Reúne las 12 acciones de las rondas 1 y 2 del notebook y las 5 correcciones de la ronda 3.

### Antes de oficializar se corrigió
- **Banda en celular:** medía 60px; ahora mide los 56px que dice `DESIGN.md` (relleno vertical de 6px).
- **Scroll horizontal:** a 320px no había (fue una falsa alarma de la prueba: la barra de scroll le sacaba 15px al marco). Aparecía por debajo de 320px, por dos botones de texto largo. Ahora, con menos de 480px de ancho, los botones largos siguen en otro renglón.
- **Tablas con scroll, por teclado** (lo marcó axe en celular; venía de antes): el contenedor de `.tabla--fija` lleva `tabindex="0"`, `role="region"` y `aria-label`.

### Archivos (estado actual de la carpeta)
- **Oficial (3.1.0):** `DESIGN.md`, `unpsjb.css`, `muestra.html`. Registro: `CHANGELOG.md`.
- **Anteriores:** v2.1 en `DESIGN-v2.md`, `unpsjb-v2.css`, `muestra-v2.html`; v1 en `DESIGN-v1.md`, `unpsjb-v1.css`, `muestra-v1.html`.
- **Para comparar:** `comparar.html` (v1 y v2), `comparar-v3.html` (v2 y v3.1), `comparar-v3.1.html` (antes y después de las correcciones, con `muestra-v3.0.html` y `unpsjb-v3.0.css`).
- **Skill:** `skill/design-md-unpsjb/SKILL.md`, lista para subir a claude.ai (el `DESIGN.md` nuevo con el encabezado de la skill). La copia local de la skill es sincronizada y no se edita a mano.
- Ya no existen `DESIGN-v3.md`, `unpsjb-v3.css` ni `muestra-v3.html`: son los tres archivos oficiales.

### Cómo se verificó la versión oficial
- **axe-core 4.10.2** (reglas WCAG 2.0, 2.1 y 2.2 A/AA y buenas prácticas): sin fallas en escritorio y celular, en claro y en oscuro.
- **Foco:** ningún control totalmente tapado en 1280×668, 390×844 y 683×334.
- **Ancho:** sin scroll horizontal a 305, 320 y 390px.
- **Impresión a PDF:** 11 hojas, en claro, con el logo a color y sin navegación.
- **Enlaces:** todos los archivos que nombran las muestras y las páginas de comparación existen.
- Sigue sin hacerse: lector de pantalla (Orca), celular real, Firefox y Safari.

### Versiones
- La 3.0.0 quedó como propuesta que no se publicó; la primera versión 3 oficial es la 3.1.0.
- Mientras ninguna herramienta cargue `unpsjb.css` desde el servidor, el número es sobre todo un registro interno. Empieza a importar con la primera herramienta en producción.

### Pendientes
- [x] Decidir si la v3 pasa a ser la oficial (sí, como 3.1.0).
- [ ] Subir `skill/design-md-unpsjb/SKILL.md` a claude.ai para actualizar la skill.
- [ ] Decidir los agregados 6 a 14 de la ronda 3 y el idioma de los nombres del código.
- [ ] Prueba con Orca, en un celular real, y en Firefox y Safari.
- [ ] Borrar `FRAMEWORK.md` y los archivos de versiones viejas cuando ya no hagan falta.

## 2026-10-01 — Sesión 9: renumeración al esquema 0.x

### Por qué
Nunca hubo una 1.0.0: la primera hoja de estilos ya se llamaba v0.1.0, y "v2" y "v3" eran nombres de borradores de diseño que terminaron usándose como primer número de versión. Nada se publicó en el servidor ni lo usa una herramienta.

### Decisión
- El primer número es **0** hasta la primera publicación. La **1.0.0** será la primera que esté en el servidor de recursos y use una herramienta real.
- Equivalencias: v1 = **0.1.0** · v2 (antes 2.1.0) = **0.2.1** · v3 propuesta (antes 3.0.0) = **0.3.0** · oficial de hoy (antes 3.1.0) = **0.3.1**.
- Mientras sea 0: el número del medio sube con cada borrador de diseño; el último, con arreglos y agregados chicos. La regla completa (mayor, menor, arreglo) rige desde la 1.0.0. Quedó escrito en `DESIGN.md`, sección 14.C.
- `.banda__nav`, que estaba marcada "se elimina en la v4", ahora dice "se elimina en la 1.0.0".

### Qué se tocó
- Números y menciones en `DESIGN.md`, `unpsjb.css` (solo comentarios), `muestra.html`, `CHANGELOG.md` (con la tabla de equivalencias), las tres páginas de comparación y `skill/design-md-unpsjb/SKILL.md`.
- En los archivos guardados (`DESIGN-v2.md`, `unpsjb-v2.css`, `muestra-v3.0.html`), solo el número del encabezado.
- **No cambiaron** los nombres de archivo (`-v1`, `-v2`, `-v3.0`, `comparar-v3.html`, `comparar-v3.1.html`): nombran borradores.
- En esta bitácora y en `FEEDBACK-NOTEBOOK.md`, lo escrito antes de hoy conserva los números viejos.

### Pendiente
- [ ] Decidir el idioma de los nombres del código **antes** de la 1.0.0 (renombrar clases después sería un cambio mayor).

## 2026-10-01 — Sesión 10: tabla de renombres (todo el código en español)

- **Decisión:** los nombres del código (clases, variables y atributos) pasan todos al español antes de la 1.0.0.
- **Propuesta para revisar:** `RENOMBRES.md`, con cada nombre viejo y el nuevo. De 133 clases cambian 31 y se elimina 1; de 76 variables cambian 46. **Todavía no se aplicó.**
- La tabla trae cuatro decisiones con una recomendación cada una: variantes con dos guiones, palabras que quedan en inglés (etiquetas HTML y préstamos), `data-tema="claro|oscuro"` y eliminar `.banda__nav`.
- Al aplicarla, la versión pasa a 0.3.2 (primero se anotó 0.4.0).

### Pendiente
- [ ] Revisar `RENOMBRES.md`, responder las cuatro decisiones y aplicar.

## 2026-10-01 — Sesión 11: versión 0.3.2, todo el código en español

Se aplicó `RENOMBRES.md` con las cuatro opciones recomendadas. La oficial pasa a ser la **0.3.2** (al aplicarlo se numeró 0.4.0; se corrigió el mismo día: la 0.4.0 queda para los agregados de la ronda 3). No cambia nada de lo que se ve.

### Qué cambió
- **Clases:** 31 de 133 (`.btn` → `.boton`, `.container` → `.contenedor`, `.nav-inferior` → `.menu-inferior`, `.check` → `.casilla`, `.visually-hidden` → `.solo-lector`…). Variantes siempre con dos guiones (`.boton--primario`, `.icono--chico`).
- **Variables:** 46 de 76 (`--color-primary` → `--color-primario`, `--space-4` → `--espacio-4`, `--focus-ring` → `--anillo-foco`…).
- **Tema:** `data-tema="claro|oscuro"` (antes `data-theme="light|dark"`). **Tarjetas:** `data-columna` (antes `data-label`).
- **Eliminada** `.banda__nav`.
- **Quedan en inglés:** `.input`, `.select`, `.textarea`, `.label`, y `toast`, `chip`, `modal`, `hover`.
- La regla de nombres quedó escrita en `DESIGN.md`, 2.A. `RENOMBRES.md` es la guía de migración.

### Archivos
- Tocados: `unpsjb.css`, `DESIGN.md`, `muestra.html`, `CHANGELOG.md`, `RENOMBRES.md`, `comparar-v3.html`, `comparar-v3.1.html`, `skill/design-md-unpsjb/SKILL.md`.
- Sin tocar: los borradores guardados (`-v1`, `-v2`, `-v3.0`), que siguen con sus nombres viejos.

### Cómo se verificó
- **Capturas de antes y después, píxel a píxel:** celular completo (claro y oscuro), escritorio (claro, oscuro y ventana baja) y las 11 hojas impresas. Únicas diferencias: el número de versión del pie y un texto de la muestra que nombra `.fuente-academica`.
- **Nombres:** ninguna clase ni variable vieja queda en la hoja, la muestra ni el documento; toda clase usada en la muestra existe en la hoja.
- **axe 4.10.2:** sin fallas en escritorio y celular, claro y oscuro. **Foco:** ningún control totalmente tapado. **Ancho:** sin scroll horizontal a 305, 320 y 390px.
- Página de comparación `comparar-v3.1.html` probada con el cambio de tema.

### Lo que apareció
- El reemplazo automático cambió una mención a `.btn-primary` que era la clase de Bootstrap de SIU (`DESIGN.md`, 2.E). Se restauró.
- Quien tenía un tema guardado en el navegador vuelve a "Automático" (los valores guardados eran `light` / `dark`).
- `--color-primario-hover` está definida pero ya no se usa: se puede eliminar.

### Pendientes
- [x] Decidir el idioma de los nombres del código (español) y aplicarlo.
- [ ] Subir `skill/design-md-unpsjb/SKILL.md` a claude.ai.
- [ ] Decidir los agregados 6 a 14 de la ronda 3 (ya con los nombres nuevos).
- [ ] Prueba con Orca, en un celular real, y en Firefox y Safari.

## 2026-10-01 — Sesión 12: versión 0.4.0, los agregados de la ronda 3

Antes de empezar se renumeró lo de la sesión 11 (el código en español) como **0.3.2**, con copia en `DESIGN-0.3.2.md`, `unpsjb-0.3.2.css` y `muestra-0.3.2.html`. La **0.4.0** son los agregados 6 a 14 de la ronda 3. Nada de lo anterior cambia de nombre ni de aspecto.

### Qué se hizo
- **7 componentes:** combobox, lista de resumen, acordeón, contador de caracteres, etiquetas, panel lateral y banner de fase "Piloto". Y la lista de lo que no se agrega (DESIGN.md 7.P).
- **Densidad compacta** con `data-densidad="compacta"` en el contenedor.
- **Gráficos e indicadores** (DESIGN.md 15): indicador, barras horizontales (son una tabla real) y barra apilada, con selector "Gráfico | Tabla".
- **Paleta de series** para gráficos: azul, oliva, violeta, cian, fucsia y "Otros".
- **Pie de páginas públicas** y reglas de páginas públicas (17.B).
- **Portal del wifi:** plantilla `portal-wifi.html` y reglas (17.A).
- **Reglas de los módulos de agenda y video** (16). Los módulos no están construidos.
- **Pruebas con personas** (9), **"Reportar un problema"** en el pie (6.C, 14.F), **fichas** de cada componente en la muestra (27) y la regla de estilos propios `.ext-<herramienta>-` (14.E).

### Lo que apareció
- **Los colores de categoría no sirven para gráficos.** En la ronda 3 opiné que sí. Al medirlos con el validador de la guía de gráficos, el fucsia y el cian se confunden con daltonismo y dos tonos se leen como gris. Se armó una paleta de series aparte, buscada con el mismo validador sobre los dos fondos del sistema. Peor pareja: 9,8 con daltonismo en claro (mínimo 8) y 10,9 en oscuro.
- **Cualquier tabla puede tener scroll en celular,** no solo las de columna fija: axe lo marcó en el ejemplo de densidad. La regla del marco (`tabindex`, `role="region"`, nombre) pasó a ser para toda tabla, salvo las de tarjetas.
- El banner de fase tiene que estar en una región con nombre (`<aside aria-label>`): también lo marcó axe.
- En la plantilla del wifi saqué una frase ("como pide la ley") que afirmaba algo legal sin respaldo.

### Cómo se verificó
- **axe 4.10.2:** sin fallas en la muestra (escritorio y celular, claro y oscuro) y en `portal-wifi.html` (español e inglés).
- **Foco:** ningún control totalmente tapado (128 controles, en 1280×668, 390×844, 360×640 y 683×334).
- **Ancho:** sin scroll horizontal a 305, 320 y 390px.
- **Impresión:** 14 hojas, con los gráficos a color.
- **Capturas** de cada pieza nueva en claro y oscuro, escritorio y celular; el combobox, el panel lateral, el formulario de reporte y el selector Gráfico | Tabla probados funcionando.
- **Paleta de series:** validador de la guía de gráficos, en claro sobre `#ffffff` y en oscuro sobre `#122234`.
- Sin probar: lector de pantalla, celular real, Firefox y Safari; el portal en el navegador mínimo de un celular real.

### Pendientes
- [ ] Construir `unpsjb-agenda.css` y `unpsjb-video.css` con las reglas de la sección 16.
- [ ] `portal-wifi.html`: completar con el equipo de red (dirección del formulario), las condiciones aprobadas y la consulta legal sobre la aceptación.
- [ ] Componente para gráficos de líneas (hoy solo hay reglas).
- [ ] Subir `skill/design-md-unpsjb/SKILL.md` a claude.ai.
- [ ] Prueba con Orca, celular real, Firefox y Safari; primera ronda de pruebas con personas.

## 2026-10-01 — Sesión 13: versión 0.4.1, módulos de agenda y de video

### Qué se hizo
- **`unpsjb-agenda.css`** (14 KB) y `muestra-agenda.html`: grilla por horas (Día por aula, Semana de un aula), Mes, lista, fila de días para celular, "Hoy", línea de la hora actual y conflictos.
- **`unpsjb-video.css`** (8 KB) y `muestra-video.html`: muro de 1, 4 o 9 cámaras, estados con ícono y texto, "Sin señal", lista de cámaras y línea de tiempo con botones de salto, campo de hora y control con flechas.
- Los dos se cargan después de `unpsjb.css` y usan sus tokens. El único color propio es el negro detrás del video.
- `DESIGN.md`, sección 16: de reglas a documentación de lo hecho.

### Decisiones al construir
- **Celdas libres de la agenda:** atajo para el mouse (`tabindex="-1"`). Con teclado se reserva desde "Reservar aula". Evita una parada de Tab por cada hora libre.
- **Línea de la hora actual:** anclada a la fila de esa hora (no calculada por altura, que fallaba cuando una fila crecía) y por detrás de los eventos (por encima tachaba los nombres).
- **Eventos con borde fino:** sin él, en la columna de hoy se confundían con el fondo, en claro y en oscuro.
- **Estado de la cámara debajo del video,** no encima: se lee igual sin importar la imagen.
- **Cámara elegida en azul,** no naranja.
- **`[hidden]` esconde siempre** (regla nueva en `unpsjb.css`): el selector "Grilla | Lista" no se ocultaba en la vista Mes.

### Cómo se verificó
- **axe 4.10.2:** sin fallas en las dos páginas (escritorio y celular, claro y oscuro) y en `muestra.html` después del cambio de `[hidden]`.
- **Foco:** ningún control totalmente tapado. **Ancho:** sin scroll horizontal a 320 y 390px.
- **Capturas:** agenda en Día, Semana (oscuro), Mes, Lista y celular; visor en claro, oscuro (con salto de +15 min y reproducción) y celular.
- Sin probar: lector de pantalla, celular real, Firefox y Safari. Sin video real: las celdas son un fondo negro con un texto.

### Pendientes
- [ ] Armar los dos módulos en React con datos reales. Para el video hace falta un conversor de RTSP (MediaMTX o go2rtc).
- [ ] Decidir en celular si la lista de cámaras se pliega.
- [ ] Módulos siguientes, en este orden sugerido: documentos formales e impresión, plantilla de correo, gráficos de líneas, tema para SIU y Moodle.

## 2026-10-02 — Sesión 14: versión 0.4.2, ajustes a los módulos después de la primera revisión

### Lo que pidió el usuario
- **Agenda:** el módulo le pareció bien resuelto. Pidió: pasar de Mes a una semana desde una opción a la izquierda del calendario; en Semana, pasar al día tocando el día; el selector Día | Semana | Mes a la derecha (se corría al salir de Mes); y mejorar cómo se ve en qué aula se está en la vista Semana (la primera vez no entendió cómo funcionaba).
- **Visor:** que al entrar, sin scroll, se vean bien las cámaras, sean 1, 4 o 9; y un botón de pantalla completa.
- **Grabaciones:** quedan como están. Pendiente: ver si se pueden tener los tramos de grabación según la cámara.

### Qué se hizo en la agenda
- **Mes → Semana:** columna "Semana" a la izquierda, con un botón por fila ("12 al 17 ›"). Al pasar por encima se tiñe la fila. El número del día y "+N más" abren ese día.
- **Semana → Día:** el nombre de cada día, en el encabezado, es un botón con aspecto de enlace.
- **Día → Semana** (agregado mío, no pedido): el nombre de cada aula abre la semana de esa aula. Es la misma idea al revés y ayuda a entender que la semana es de un aula.
- **Barra:** Día | Semana | Mes va último, contra el borde derecho. Las dos flechas van juntas antes del título (también se corrían, con el largo del título).
- **Aula en Semana:** placa propia (`.agenda-aula`) arriba de la grilla, con la etiqueta "Aula" a la vista, el selector, los datos del aula y "La semana muestra un aula por vez".
- **El ejemplo ahora se puede recorrer:** flechas y saltos entre vistas funcionan dentro de octubre de 2026 (los días que muestra el mes). Los eventos son siempre los mismos; cambian títulos, días y rótulos. En Mes las flechas están apagadas: el ejemplo tiene un solo mes.

### Qué se hizo en el visor
- **El muro entra en la ventana.** Las celdas siguen en 16:9; el ancho del muro se calcula con el alto libre (`100dvh` menos `--visor-arriba`, que la página mide). Mínimo de 320px de alto.
- **Pantalla completa:** botón al lado de 1 | 4 | 9. Usa la pantalla completa del navegador sobre toda la página y esconde cabecera, banner de fase y menú inferior.
- **Lista de cámaras plegable** con menos de 1024px de ancho: arranca cerrada, así en celular lo primero que se ve es una cámara. Cierra el pendiente de la sesión 13.
- **Celdas chicas:** insignia solo con ícono y "Sin señal" sin explicación (los textos siguen para el lector de pantalla).
- Encabezado de la pantalla más bajo (`.encabezado--visor`) y otro ícono para "Ampliar" una cámara (`maximize-2`).

### Medidas (Chrome, con la página de muestra, que tiene el banner "Piloto")
| Ventana | 1 cámara | 4 cámaras | 9 cámaras |
|---|---|---|---|
| 1920×950 | 1186×667 | 540×304 | 325×183 |
| 1366×641 (notebook) | 636×358 | 266×149 | 142×80 |
| 1366×768 en pantalla completa | 996×560 | 491×276 | 307×173 |

En los seis tamaños probados desde 768px de ancho (1920×950, 1366×641, 1280×800, 1024×700, 800×1000) el muro termina dentro de la ventana con 1, 4 y 9. En celular (390×844) entra la primera cámara; con 4 o 9 se sigue con scroll, una por renglón.

### Cómo se verificó
- **Recorrido automático en Chrome** de la agenda: Mes → semana del 5 → miércoles 7 → semana del Lab. Informática 1 → flechas hasta el borde. El selector de período no se movió (1058 a 1248px en las tres vistas) y "Siguiente" tampoco.
- **Pantalla completa:** entrar, medir con 1, 4 y 9, salir.
- **axe 4.10.2:** sin fallas en las dos páginas, escritorio y celular, claro y oscuro (visor con 4 y 9; agenda en Día, Semana, Mes y lista).
- **Foco:** ningún control tapado (visor: 1280×668, 390×844, 683×334; agenda: Día, Semana y Mes a 1280×668, y celular).
- **Ancho:** sin scroll horizontal a 390px. **Impresión:** la columna de semanas, las flechas y la lista de cámaras no salen.
- Sin probar: lector de pantalla, celular real, Firefox y Safari. La pantalla completa se probó solo en Chrome.

### Archivos
- Tocados: `unpsjb-agenda.css`, `unpsjb-video.css`, `muestra-agenda.html`, `muestra-video.html`, `DESIGN.md` (16.A y 16.B), `CHANGELOG.md`, `skill/design-md-unpsjb/SKILL.md`. En `unpsjb.css` y `muestra.html`, solo el número de versión.

### Pendientes
- [ ] **Decidir:** en un muro de 9 en una notebook cada cámara queda de unos 140px de ancho, porque el pie (nombre, estado y botón) se lleva un tercio del alto. Poner nombre y estado **encima** del video las llevaría a unos 220px, pero cambia la regla de la sesión 13 ("el estado va debajo").
- [ ] Averiguar si el grabador entrega los tramos de grabación por cámara (define cómo se arma la barra de tramos).
- [ ] En el ejemplo, "Ampliar" una cámara y elegir una cámara de la lista no hacen nada todavía.
- [ ] Revisar si el agregado "el aula abre su semana" se queda.
- [ ] Siguen: armar los módulos en React con datos reales; subir `skill/design-md-unpsjb/SKILL.md` a claude.ai; pruebas con Orca, celular real, Firefox y Safari.

## 2026-10-02 — Sesión 15: versión 0.4.3, cuatro módulos más

Se pidieron cinco módulos de la lista del 1/10: documentos e impresión, correo, gráficos, mesa de ayuda y cartelera. Se hicieron cuatro. **El de correo quedó en espera** porque el pedido no coincide con lo planeado (ver "Pendientes").

### Dónde se trabajó
- La carpeta pasó a ser un repositorio git durante la sesión, y había otra sesión cambiando la agenda y el visor al mismo tiempo. Para no pisarlas, todo esto se hizo aparte: en la carpeta de trabajo `.claude/worktrees/modulos-0.4.2`, que quedó en la rama **`modulos-0.4.3`**.
- La otra sesión numeró sus cambios 0.4.2, así que estos módulos son la **0.4.3**. La rama sale de `main` en la etiqueta `v0.4.2` y suma un solo commit; no hubo archivos tocados por los dos lados.
- `main` no se tocó: sigue en la 0.4.2 hasta que se integre la rama.

### Qué se hizo
- **Documentos e impresión** (`unpsjb-documentos.css`, `muestra-documentos.html`): la hoja A4 que se ve en pantalla igual que impresa, membrete, firmas, pie de verificación con QR, certificado apaisado, planilla para firmar. Cinco ejemplos: constancia, certificado, resolución, comprobante y planilla.
- **Gráficos de líneas** (`unpsjb-graficos.css`, `unpsjb-graficos.js`, `muestra-graficos.html`): el gráfico sale de una tabla. Cinco ejemplos: tres series, cinco series, 30 datos, sin arrancar en cero y con un dato que falta.
- **Mesa de ayuda** (`unpsjb-mesa-ayuda.css`, `muestra-mesa-ayuda.html`): el historial de una solicitud, con la vista de quien atiende y la de quien pide, y la bandeja con los cinco estados.
- **Cartelera** (`unpsjb-cartelera.css`, `muestra-cartelera.html`, `muestra-cartelera-celular.html`): la tele del pasillo y la vista de solo lectura a la que lleva el QR.
- **Logo a una tinta** y **generador de QR** (`qr/generar.sh`).
- `DESIGN.md`: 15.E y las secciones 18, 19 y 20.

### Decisiones al construir
- **La hoja es papel:** siempre blanca con tinta negra, también en modo oscuro (como el video, que va siempre sobre negro).
- **Al imprimir sale solo la hoja,** sin marcar nada a mano: una regla esconde todo lo que no es la hoja ni la contiene.
- **Texto de los documentos sin justificar:** sin corte de palabras, justificar deja ríos de blanco.
- **Las fórmulas de una resolución van en mayúsculas** (así las escribe la norma), pero puestas por CSS: en el HTML dicen "Visto", para que el lector de pantalla no las deletree.
- **Una firma nunca queda sola en una hoja.** Apareció al imprimir la resolución de ejemplo: la firma caía sola en la segunda hoja.
- **Gráficos sin cartel flotante** (7.P dice que no hay tooltips): la lectura va fija arriba del gráfico y es también la leyenda. Con teclado se recorre con un control de rango, como la línea de tiempo del visor.
- **Al imprimir, los gráficos se vuelven a trazar** al ancho de la hoja y van de a uno por renglón: achicados a dos columnas, la letra quedaba de unos 6 puntos.
- **Historial sin globos de chat ni colores por persona:** quién habla se dice con nombre y rol.
- **Nota interna con cuatro señales** (fondo, candado, texto y, al escribirla, label y botón distintos): mandarle por error una nota interna a quien pidió es caro.
- **Cartelera en "u":** una u es un píxel a 1920 × 1080; así se ve igual en 720p y en 4K. Mínimo de letra: 26 u.
- **"En curso" en azul, no en naranja,** igual que "Hoy" en la agenda.
- **Las páginas de la cartelera se arman midiendo,** no contando filas: un nombre largo ocupa dos renglones.
- **El QR lleva siempre la dirección escrita al lado.**
- **La vista del celular reutiliza la lista y la fila de días del módulo de agenda,** dentro de `.solo-lectura`.

### Lo que apareció
- **El primer intento de la cartelera no entraba:** los dos avisos más el QR pasaban el alto de la pantalla y el texto quedaba cortado. Se resolvió repartiendo los avisos por tandas, como las filas, y bajando un poco la banda.
- **Una falla falsa de axe en modo oscuro** (contraste del selector de tema): era la prueba, que cambiaba el tema después de cargar y medía a mitad de la transición. Corregida la prueba, no hay fallas.
- **El detector de Impeccable marcó Times New Roman** como fuente fuera del sistema. Se anotó la excepción (4.A ya la permite para documentos).
- **Al cerrar, el detector marcó 45 observaciones** en las cinco páginas nuevas:
  - *Corregido:* interlineados de 1,15 y 1,2 en letra grande que puede ocupar más de un renglón (cartelera y certificado). Pasaron a 1,25, el mínimo de 4.C.
  - *Corregido documentando:* los colores de papel (negro, `#333d49`, `#b9c6d6`) no estaban en el encabezado de `DESIGN.md`. Se declararon.
  - *Anotado como excepción* (falsos positivos del análisis sin navegador): relleno "apretado" en la banda, `.tabla-marco` y `.segmentado`; jerarquía de tamaños "plana"; interlineado de 0,12; radios "1080" y "1920". El detector no resuelve `var()` ni `calc()` y lee las reglas de impresión como si fueran de pantalla.
  - *Sin tocar:* "espaciado monótono" en las cinco páginas y los fondos de las insignias de advertencia y de error (salen de `color-mix`, en `unpsjb.css`). Vienen de la hoja central y también aparecen en las páginas anteriores: conviene decidirlo para todo el sistema, no página por página.

### Cómo se verificó
- **axe 4.10.2** (reglas WCAG 2.0, 2.1 y 2.2 A/AA y buenas prácticas), sin fallas en ninguna: documentos (los cinco ejemplos; escritorio, celular y 320px; claro y oscuro), gráficos (1280, 390 y 320px; claro y oscuro), mesa de ayuda (las dos vistas; 1280, 390 y 320px; claro y oscuro), vista de celular de la cartelera (390, 320 y 1280px; claro y oscuro) y la tele (las dos páginas; claro y oscuro).
- **Ancho:** sin scroll horizontal en ninguna de esas pruebas (hasta 320px).
- **Foco:** ningún control totalmente tapado en documentos, gráficos, mesa de ayuda y la vista de celular (1280×668, 390×844 y 683×334).
- **Impresión a PDF (Chrome):** constancia (1 hoja A4), certificado (1 hoja apaisada), resolución (2 hojas, numeradas, con la firma acompañada), planilla a una tinta, y los gráficos (3 hojas, vueltos a trazar).
- **QR:** leídos con un decodificador (zxing) desde los SVG y desde las capturas: la tele en claro, en oscuro, a 720p y en vertical, y la constancia en pantalla.
- **Paleta de series:** validada otra vez con el validador de la guía de gráficos (peor pareja con daltonismo: 9,8 en claro y 10,9 en oscuro; mínimo 8).
- **Logos:** los cuatro que ya existían salen idénticos byte a byte después de sumar el de una tinta.
- **Capturas** de cada módulo en escritorio y celular, claro y oscuro; la cartelera a 1920×1080, 1280×720 y 1080×1920, con sus estados (cambio de aula, suspendida, sin actividades, sin conexión).
- **Probado funcionando:** pestañas de documentos, interruptor "A una tinta", recorrer un gráfico con el mouse y con el teclado, pasar un gráfico a tabla, enviar una respuesta, guardar una nota interna, marcar como resuelta y el error al enviar vacío.
- Sin probar: lector de pantalla, celular real, Firefox y Safari, una tele real. La numeración de páginas y la impresión se probaron solo en Chrome.

### Archivos
- Nuevos: `unpsjb-documentos.css`, `unpsjb-graficos.css`, `unpsjb-graficos.js`, `unpsjb-mesa-ayuda.css`, `unpsjb-cartelera.css`, `muestra-documentos.html`, `muestra-graficos.html`, `muestra-mesa-ayuda.html`, `muestra-cartelera.html`, `muestra-cartelera-celular.html`, `qr/generar.sh`, `assets/logo-unpsjb-trelew-una-tinta.svg`, `assets/qr-ejemplo-cartelera.svg`, `assets/qr-ejemplo-documento.svg`.
- Tocados: `DESIGN.md`, `CHANGELOG.md`, `BITACORA.md`, `skill/design-md-unpsjb/SKILL.md`, `logo/armar.py`, `logo/generar.sh`, `.impeccable/config.json`. En `unpsjb.css`, solo el número de versión; en `muestra.html`, el número y los enlaces a los módulos nuevos.
- Sin tocar: los módulos de agenda y de video y sus muestras (siguen en 0.4.2).

### Pendientes
- [ ] **Correo: confirmar qué se quiere.** El 1/10 se planeó como *plantilla para los avisos automáticos* que mandan las herramientas ("tu reserva fue aprobada"). Hoy se pidió como *generador*: una página donde una persona escribe un mensaje, lo ve con diseño institucional y lo copia para pegarlo en Gmail. Comparten la base (HTML de correo con los estilos adentro), pero son dos piezas. Se puede hacer el generador solo, o la base y las dos.
- [ ] Para el correo, sea cual sea: hace falta una dirección pública (https) para el logo. Un correo no puede traer el logo desde la computadora de quien lo escribe.
- [ ] **Integrar la rama `modulos-0.4.3` en `main`** y ponerle la etiqueta `v0.4.3` (son archivos nuevos, más los cambios de documentación): `git merge --ff-only modulos-0.4.3 && git tag v0.4.3`.
- [ ] Documentos: confirmar los márgenes con la norma de la universidad, si la hay; definir el servicio de verificación; confirmar el logo a una tinta con quien maneja la marca.
- [ ] Cartelera: definir la dirección de la vista para el celular y generar el QR real; probar en la tele real y decidir cómo queda el navegador a pantalla completa.
- [ ] Siguen: armar los módulos en React con datos reales; subir `skill/design-md-unpsjb/SKILL.md` a claude.ai; pruebas con Orca, celular real, Firefox y Safari.


---

## 2026-10-06 — Estudio de referencia: UNC, UBA y MiUNC

Sin número de sesión, porque hay trabajo en curso sin anotar (0.4.4 y el módulo de planos) y no se quiso pisar su numeración.

### Qué se hizo
- Se estudiaron **unc.edu.ar**, **uba.ar** y **mi.unc.edu.ar** (MiUNC, con la sesión del usuario). Todo quedó en `REFERENCIAS-UNC-UBA.md`: arriba el resumen con 10 acciones, abajo el detalle por tema.
- **No se cambió nada del diseño**: `DESIGN.md`, `unpsjb.css` y las muestras no se tocaron.

### Qué salió
- Los tres se ven cuidados y ninguno pasaría nuestra lista de "antes de publicar". La UBA bloquea el zoom, dice `lang="en"` y usa texto blanco sobre celeste y naranja (2:1). MiUNC no muestra el foco y usa 13px para casi todo. La UNC es la mejor en teclado, pero su portada baja 22 MB.
- **Vale tomar estructura, no aspecto.** De MiUNC: la página de inicio de cuenta, la lista de trámites en dos grupos, el lanzador de aplicaciones con buscador y el perfil con navegación lateral. De los portales: las tres entradas por tarea de la UNC y el mosaico de bloques planos de la UBA (con nuestros colores).
- Confirma decisiones ya tomadas: letra con identidad local, naranja nunca como texto, radios chicos, sin sombras ni degradados.

### Cómo se verificó
- Portales: Chrome sin ventana con `playwright-core`, seis páginas por sitio a 1280, 390 y 320px; estilos efectivos, peso, **axe 4.10.2** y recorrido con Tab. Lo crudo está en `referencias/medidas.json` y se repite con `referencias/medir.js`.
- MiUNC: en el navegador, solo mirando; el ancho de celular, con marcos de 390 y 320px. No se guardaron capturas porque muestran datos personales.
- Contrastes calculados aparte.
- Sin probar: lector de pantalla, Firefox, Safari. Se miraron seis páginas por sitio, no todo.

### Archivos
- Nuevos: `REFERENCIAS-UNC-UBA.md`, `referencias/medidas.json`, `referencias/medir.js`. Las capturas (`referencias/unc/`, `referencias/uba/`, 11 MB) quedan fuera de git.
- Tocados: `.gitignore`, `BITACORA.md`.

### Pendientes
**En espera por decisión del usuario (2026-10-06):** no se integra nada todavía, por el trabajo en paralelo. Queda como información.
- Decidido: el portal de la Delegación **se va a hacer, pero simple**, informativo y de consulta rápida, porque el portal institucional lo maneja Comodoro. No hace falta un módulo completo de noticias.
- [ ] Cuando se retome: sumar a `DESIGN.md` las reglas de las acciones 8 (tope de peso para fotos) y 9 (`lang`, zoom y ventana de entrada).
- [ ] Cuando se retome: decidir si las acciones 1 a 4 (piezas tomadas de MiUNC) entran en una versión.
- [ ] Cuando llegue el portal: partir de las acciones 6 y 7, en chico.

## 2026-10-06 — Visor de cámaras rehecho (sin número de versión todavía)

### Lo que pidió el usuario
- Mostró una captura de un visor comercial ("Vigilance") que le parece más pulido, y pidió una versión del visor que tome sus ideas siguiendo el sistema.
- Una vista de 5 cámaras "como en el ejemplo" y una de 6.
- **La prioridad: que las cámaras sean lo más grandes posible.** Observó que, en todas las vistas, plegar la lista solo corría las cámaras al centro, sin ganar lugar útil.
- Antes (2/10) había pedido poder plegar la lista en pantallas anchas; quedó hecho ese día y este rediseño lo reemplaza.

### Qué se tomó de la referencia
- Panel lateral con todo lo que no es video, el nombre de cada cámara en una barra sobre la imagen, y vistas con cámaras de distinto tamaño.
- **No se tomó:** el tema oscuro forzado (el visor respeta el tema elegido), la línea de tiempo en la misma pantalla (le sacaría alto al muro, y el usuario pidió no tocarla) y el recorte de la imagen como comportamiento normal (queda como opción, apagada).

### Qué se hizo
- **Panel lateral** con el `h1`, las vistas 1 · 4 · 5 · 6 · 9, pantalla completa, buscador, lista e interruptor "Llenar el cuadro". Plegado es un riel de 46px con los controles en columna.
- **Sin encabezado ni barra arriba del muro,** y el nombre encima de la imagen: todo ese alto pasó a las cámaras.
- **El muro llena el ancho y el alto libres.** Las celdas pueden ser más anchas que 16:9; la imagen no se deforma y deja negro a los costados.
- **Vista de 6:** una grande y cinco chicas, igual a la referencia. **Vista de 5:** dos grandes y tres chicas.
- **"Ampliar"** y la lista ahora hacen algo (cierra un pendiente de la sesión 14).
- **Elegir qué cámara va en cada lugar** (pedido el mismo día, después de ver las vistas): se toca un recuadro y después otro recuadro, y se intercambian; o una cámara de la lista, y pasa a ese lugar. Sin arrastrar. La lista marca con un ojo las cámaras que se están viendo. La vista y el orden se recuerdan en el navegador. Antes, elegir una cámara la mandaba siempre al primer lugar y corría a todas las demás.
- En el ejemplo, cada cámara muestra una imagen de prueba en 16:9 con su borde, para que se vea cuánto ocupa la imagen real dentro de su celda.

### Decisiones
- **Vista de 5: dos grandes y tres chicas. Decidido por el usuario.** Se probó también con una sola grande y una tira de cuatro chicas al costado (grande de 806×454 y chicas de 191×108 en notebook); el usuario la vio y pidió volver a la de dos grandes. Antes se había descartado la grande con cuatro chicas en un cuadro de 2 × 2: en un monitor quedaba más chica que la de 6. No volver a proponer una sola grande para la vista de 5.
- **El nombre encima del video** cambia la regla de la sesión 13. Lo decidió la prioridad del usuario; era el pendiente abierto de la sesión 14.
- **"Llenar el cuadro" apagado al entrar:** recortar esconde bordes de la imagen, y en vigilancia eso tiene que ser una elección.
- **Controles en el panel y no en una barra arriba del muro:** una barra costaba 44px de alto en todas las vistas.

### Medidas (Chrome; ancho × alto de la imagen, no de la celda)
| Ventana | 1 | 4 | 5 (grande / chica) | 6 (grande / chica) | 9 |
|---|---|---|---|---|---|
| Notebook 1366×641, antes | 636×358 | 266×149 | — | — | 142×80 |
| Notebook 1366×641, ahora | 827×465 | 406×229 | 490×276 / 322×181 | 546×307 / 266×150 | 266×150 |
| Monitor 1920×950, ahora | 1376×774 | 681×383 | 776×437 / 513×288 | 913×513 / 449×253 | 449×253 |
| Monitor, panel plegado | 1376×774 | 681×383 | 820×461 / 542×305 | 913×513 / 449×253 | 449×253 |
| Notebook, pantalla completa y panel plegado (1366×768) | 1244×700 | 615×346 | 616×347 / 406×228 | 825×464 / 405×228 | 405×228 |

- **Plegar el panel agranda la imagen** cuando lo que limita es el ancho: la vista de 5 en un monitor, todas las vistas en ventanas angostas (a 1024×700, 4 cámaras pasan de 327 a 444px) y en pantalla completa.
- **En una ventana ancha y baja, con 1, 4, 6 o 9, plegar el panel no agranda la imagen:** lo que limita es el alto, y una imagen 16:9 no puede crecer sin recortarse. Ahí la celda se ensancha y queda negro a los costados. Para que crezca hay que encender "Llenar el cuadro".

### Cómo se verificó
- El muro termina dentro de la ventana en las cinco vistas, con el panel abierto y plegado, a 1366×641, 1920×950, 1024×700 y 800×1000. En celular (390×844) entra la primera cámara.
- Recorrido automático: ampliar en 6 y en 9, elegir en la lista, llenar el cuadro, plegar con teclado, recargar (se recuerda) y pantalla completa.
- **axe 4.10.2:** sin fallas en claro y oscuro, panel abierto y plegado, celular y tablet. **Foco:** ningún control tapado. **Ancho:** sin scroll horizontal. **Impresión:** sale el muro como planilla, sin fondos negros ni panel.
- Sin probar: video real (las imágenes son de prueba), lector de pantalla, celular real, Firefox y Safari.

### Archivos
- Tocados: `unpsjb-video.css` (rehecho salvo la línea de tiempo), `muestra-video.html`, `DESIGN.md` (16.B y el peso en la tabla de módulos), `CHANGELOG.md` (entrada "En curso"), `skill/design-md-unpsjb/SKILL.md`.
- Nada de esto está en git todavía.

### Pendientes
- [ ] Que el usuario revise cómo se cambia una cámara de lugar.
- [ ] Darle número de versión y registrarla en git, junto con lo demás que está sin registrar en `main`.
- [ ] Probar con video real: ahí se ve si la barra tapa algo importante (la hora que la cámara escribe sobre la imagen suele ir arriba).
- [ ] El buscador de la lista sigue sin filtrar en el ejemplo.
- [x] "Ampliar" y la lista de cámaras ya hacen algo (pendiente de la sesión 14).
- [x] Decidido: el nombre y el estado van encima del video (pendiente de la sesión 14).

## 2026-10-06 — Visor: ampliar y pantalla completa por cámara, lugares vacíos, y prueba en cuatro tipos de equipo

### Lo que pidió el usuario
- Diferenciar "ampliar" de "pantalla completa": un botón que deje la cámara como lo único que se ve en el monitor, sin interfaz, "como en un video de YouTube".
- Que siga habiendo un botón para ampliar. En la vista de 6 le parece bien; en la de 5, que sean dos, para elegir izquierda o derecha.
- Poder sacar una cámara y dejar la vacante vacía.
- Probar todo en celular, tablet, notebook y monitor de PC.

### Qué se hizo
- **Tres botones de agrandar, según la vista:** "Ampliar" (`maximize-2`) en 4, 6 y 9; "Ampliar a la izquierda" y "a la derecha" (`arrow-up-left`, `arrow-up-right`) en las tres chicas de la vista de 5; "Pantalla completa" (`fullscreen`) en todas. Las cámaras que ya son grandes no llevan "Ampliar". La hoja decide qué botón se ve; el HTML los lleva todos.
- **Pantalla completa de una cámara:** usa la pantalla completa del navegador sobre el recuadro. La barra se ve 3 segundos al entrar y vuelve al mover el mouse, tocar o usar el teclado; con el mouse quieto se esconde también el puntero.
- **Lugares vacíos:** el recuadro elegido muestra "Quitar" en su barra (y funciona `Supr`). Queda un lugar vacío con borde punteado, que se toca y se llena desde la lista. Si la lista está plegada, se abre sola.
- **Cambió el modelo del ejemplo:** el muro son nueve lugares, cada uno con una cámara o vacío; una cámara puede no estar en ninguno. Lo que se guarda en el navegador admite lugares vacíos.

### Decisiones
- **"Quitar" aparece solo en el recuadro elegido,** no siempre: con cuatro botones fijos, en las cámaras chicas el nombre quedaba en 84px.
- **Sin "Ampliar" en celular:** ahí las cámaras van una debajo de la otra y no hay lugar grande.
- **La barra se muestra al entrar a pantalla completa:** si no, no se ve cómo salir.
- **Al reemplazar una cámara por otra que no estaba en el muro, la reemplazada sale del muro** (no va sola a un lugar vacío): que un lugar quede vacío es una elección de la persona.

### Prueba en cuatro tipos de equipo (Chrome; celular y tablet con pantalla táctil simulada)
Imagen de cada cámara, grande / chica, con el panel abierto:

| Equipo | 1 | 4 | 5 | 6 | 9 |
|---|---|---|---|---|---|
| Celular 390×844 y 360×640 | 358×201 (328×185 en el chico), una debajo de la otra en todas las vistas | | | | |
| Tablet parada 768×1024 | 704×396 | 345×194 | 346×195 / 226×127 | 465×261 / 225×127 | 225×127 |
| Tablet acostada 1024×768 | 668×376 | 327×184 | 328×185 / 214×120 | 441×248 / 213×120 | 213×120 |
| Tablet acostada, panel plegado | 902×507 | 444×250 | 445×250 / 292×164 | 597×336 / 291×164 | 291×164 |
| Notebook 1366×641 | 827×465 | 406×229 | 490×276 / 322×181 | 546×307 / 266×150 | 266×150 |
| Notebook 1536×730 | 985×554 | 485×273 | 584×329 / 385×216 | 652×367 / 319×179 | 319×179 |
| Monitor 1920×950 | 1376×774 | 681×383 | 776×437 / 513×288 | 913×513 / 449×253 | 449×253 |
| Monitor 2560×1300 | 1998×1124 | 992×558 | 1096×617 / 726×408 | 1327×747 / 657×369 | 657×369 |

En los ocho tamaños, con el mismo recorrido:
- Desde tablet, las cinco vistas entran sin scroll, con el panel abierto y plegado. Sin scroll horizontal en ninguno.
- La barra de ninguna cámara desborda; el nombre más angosto mide 95px (vista de 5 en la tablet acostada con el panel abierto).
- Ampliar en 6, ampliar a la derecha y a la izquierda en 5, quitar, recargar (el lugar vacío se recuerda) y llenar el lugar vacío desde la lista.
- Pantalla completa de una cámara: ocupa todo el monitor, la barra se va a los 3 segundos, vuelve al tocar o mover el mouse, y el botón sale.
- **axe 4.10.2** con un lugar vacío: sin fallas.

Además, en notebook: todo con teclado solo (elegir, `Supr`, llenar el vacío, entrar y salir de pantalla completa); pantalla completa de la página y, adentro, la de una cámara (al salir se vuelve a la de la página); foco sin controles tapados a 1366, 768 y 390px; impresión sin botones ni lugares vacíos.

### Lo que no se probó
- Equipos reales: todo fue en Chrome simulando los tamaños y el toque. En un **iPhone** el botón de pantalla completa de cada cámara no va a aparecer (Safari no la permite para elementos de la página); con video real se puede resolver con la pantalla completa propia del video.
- Firefox, Safari, lector de pantalla y video real.

### Pendientes
- [ ] Probar en un celular y una tablet reales.
- [ ] Con video real: pantalla completa en iPhone, y ver si la barra tapa algo de la imagen.
- [x] Decidida la vista de 5 (dos grandes y tres chicas) y el cambio de lugar de las cámaras.

## 2026-10-07 — Visor: el ojo de la lista quita la cámara. La maqueta queda lista para implementar

### Lo que pidió el usuario
- Que al tocar el ojo de una cámara activa, en la barra lateral, se la pueda sacar de la vista; y que al pasar el mouse aparezca un ojo tachado en rojo, para dar a entender que la va a sacar.
- Con eso da la maqueta por lista: **se va a usar próximamente para una implementación.**

### Qué se hizo
- Cada renglón de la lista tiene dos botones: el de la cámara (`.camaras-lista__camara`) y el ojo (`.camaras-lista__ojo`), que está solo en las cámaras que se ven en el muro.
- Tocar el ojo quita la cámara y deja su lugar vacío, igual que "Quitar" en el recuadro. El foco se queda en el renglón.
- Con el mouse encima, o con el foco del teclado, el ojo pasa a ojo tachado (`eye-off`) en el rojo de error, con un fondo rosado.
- Para volver a ponerla: se toca su nombre en la lista y va al lugar vacío.

### Cómo se verificó
- Chrome, en notebook (claro), monitor (oscuro), tablet y celular (táctil simulado): el ojo aparece solo en las cámaras que se ven, cambia a tachado con el mouse y con `Tab`, quita la cámara, el aviso al lector de pantalla sale, y tocar el nombre la devuelve. **axe 4.10.2** sin fallas y sin scroll horizontal en los cuatro.
- En táctil no hay "mouse encima": el ojo quita al primer toque, sin el aviso previo.

### Para quien implemente el visor
`muestra-video.html` es la referencia de marcado y de comportamiento; `unpsjb-video.css` se usa tal cual. Lo que en la maqueta está simulado y la herramienta tiene que resolver:
- **Video:** las imágenes son de prueba. Los navegadores no reproducen RTSP: hace falta un conversor (MediaMTX o go2rtc). El `<video>` va dentro de `.camara__video`.
- **Estado de cada cámara** (en vivo, grabando, sin señal): está escrito a mano; tiene que venir del grabador.
- **Lugares y vista:** se guardan en `localStorage` (`unpsjb-visor-orden`, `unpsjb-visor-vista`, `unpsjb-visor-lista`, `unpsjb-visor-llenar`). Si el muro tiene que ser el mismo en todos los equipos de un puesto, va al servidor.
- **`--visor-arriba`:** la página mide dónde empieza el muro y lo pone en `<html>`; hay que repetirlo al cambiar el tamaño de la ventana y al entrar o salir de pantalla completa.
- **Buscador de la lista:** no filtra todavía.
- **Grabaciones:** la línea de tiempo no está conectada, y falta saber si el grabador entrega los tramos por cámara.
- **iPhone:** no hay pantalla completa para un elemento de la página; usar la del `<video>`.

### Pendientes
- [ ] Darle número de versión y registrar en git todo lo que está sin registrar en `main` (incluye la 0.4.4 de planos).
- [ ] Probar en un celular y una tablet reales, y con video real.

---

## 2026-10-07 — Piezas del estudio de referencia y prototipo de portal

Sin número de sesión ni de versión: hay otros trabajos en paralelo (el visor de cámaras, entre otros) y el usuario pidió no subir nada todavía. **Sin commitear.**

### Qué se hizo
- Se pasó a `DESIGN.md` y a `unpsjb.css` lo que convenía del estudio (`REFERENCIAS-UNC-UBA.md`). Todo lo nuevo está marcado "(nuevo, sin número todavía)".
- **Dos piezas en `unpsjb.css`:** la lista de accesos (`.accesos`) y las entradas (`.entradas`). No se tocó ninguna regla que ya existía.
- **En `DESIGN.md`:** 2.C (topes de peso para fotos y video), 7.P (tres filas: carrusel, ventana al entrar, chat flotante), 7.Q (lista de accesos), sección 9 (punto 7 de "Antes de publicar"), 13 (tres filas), 17.C (portal de la Delegación) y 17.D (página de inicio de una cuenta).
- **`muestra-portal.html`:** prototipo con cinco pantallas en un archivo: portada, trámites, herramientas con buscador, inicio de cuenta y datos de la cuenta. Con datos de ejemplo.

### Decisiones
- **Una sola pieza para tres usos.** Los accesos de MiUNC, su lista de trámites y su lanzador de aplicaciones son la misma lista con otra cosa a la derecha. Se hizo una pieza, no tres.
- **El perfil no necesitó nada nuevo:** menú lateral más lista de resumen, que ya existían.
- **Las entradas son la única excepción** a "la banda es el único bloque grande de color", y solo en la portada de un portal. Hasta cuatro, sin ícono; la principal en azul, las demás en neutro. El naranja no se usa de relleno.
- **El portal se pensó chico,** como pidió el usuario: el institucional lo maneja Comodoro. No hay módulo de noticias; las novedades son una lista corta que enlaza al portal de la universidad.
- **No se hizo hoja aparte** (`unpsjb-portal.css`): son 80 líneas y sirven también dentro de las herramientas.

### Cómo se verificó
- **axe 4.10.2** (WCAG 2.0, 2.1 y 2.2 A/AA y buenas prácticas), sin fallas en las cinco pantallas, a 1280, 390 y 320px, en claro y en oscuro.
- **Ancho:** sin scroll horizontal en ninguna de esas pruebas.
- **Probado funcionando:** cambio de pantalla desde la sub-barra y el menú inferior, el buscador (filtra sin distinguir tildes ni mayúsculas, cuenta "1 de 9", muestra el estado vacío y "Borrar búsqueda" lo restablece) y el foco con teclado, que marca el renglón entero.
- **Capturas** revisadas con las fuentes reales (servido por http): portada, trámites en celular, herramientas en oscuro y datos de la cuenta.
- La página pesa 23 KB sin la hoja ni las fuentes.
- Sin probar: lector de pantalla, celular real, Firefox y Safari, impresión.

### Lo que apareció
- En el listado en columnas, si un renglón tenía una descripción de dos líneas, en el de al lado el nombre y la descripción se separaban. Corregido con `align-content: center`.
- El detector de Impeccable marcó las tres fuentes de respaldo de `unpsjb.css` ("Atkinson respaldo", "Montserrat respaldo", "Twemoji UNPSJB") como fuentes fuera del sistema. Ya estaban en la hoja y están documentadas (4.A y 10.D): se anotaron como excepción en `.impeccable/config.json`.

### Archivos
- Nuevos: `muestra-portal.html`.
- Tocados: `DESIGN.md`, `unpsjb.css`, `CHANGELOG.md` (entrada "En curso"), `BITACORA.md`, `REFERENCIAS-UNC-UBA.md` (el estado), `skill/design-md-unpsjb/SKILL.md` (copia de `DESIGN.md`), `.impeccable/config.json`.
- Sin tocar: `muestra.html` (no se sumó el enlace al prototipo ni las fichas de las dos piezas, para no cruzarse con el trabajo en paralelo) y todos los módulos.

### Pendientes
- [ ] Darle número de versión, junto con lo demás que está en curso.
- [ ] Sumar a `muestra.html` el enlace a `muestra-portal.html` y las fichas "cuándo usarlo" de la lista de accesos y de las entradas (14.F).
- [ ] Para el portal de verdad: los datos reales (dirección, horarios, teléfonos, las direcciones de cada herramienta) y qué secciones lleva.
- [ ] Subir `skill/design-md-unpsjb/SKILL.md` a claude.ai.

### Ajustes después de la primera mirada del usuario (mismo día)

El usuario miró `muestra-portal.html` y marcó tres cosas.

- **"No veo el aporte de la investigación."** Tenía razón: lo que se tomó es estructura y, sobre todo, cosas que *no* están (carrusel, ventana al entrar, logos por trámite), así que la maqueta se veía como el sistema de siempre. Se sumó al final de cada pantalla una tabla plegable, "Qué sale del estudio en esta pantalla", con qué se vio, dónde y qué se hizo. Es una nota del prototipo, no va en la página real.
- **En Herramientas el pie quedaba alto,** con un hueco debajo. Regla nueva en `unpsjb.css` y en 6.C: el pie va al fondo de la ventana cuando el contenido es corto. Es una sola línea (`position: sticky; top: 100dvh` en el `<footer class="pie">` que cierra `<main>`): el pie se corre hacia abajo hasta donde termina `<main>`, que ya ocupaba el alto que sobra. No hizo falta cambiar `<main>` ni envolver el contenido, y vale para todas las muestras.
- **En Mi cuenta el pie se veía cortado.** Con solo CSS no hay forma de decir "si no entra entero, que no se vea". Se resolvió con un script de quince líneas en el prototipo, que le da alto a la pantalla para que el pie empiece justo debajo del borde. Quedó escrito en 6.C como mejora opcional.

Lo que apareció:
- **Las pantallas tenían como `id` el mismo nombre que el enlace** (`#cuenta`), y el navegador corría la página 41px hasta ese punto: parte del "se ve cortado" era eso. Se les quitó el `id`.
- **Medir el pie para saber dónde empezaría daba mal,** porque la regla nueva ya lo había corrido. Se mide desde donde termina el contenido.

Verificado: 120 casos (cinco pantallas; ocho tamaños de ventana, de 320×640 a 2560×1440; al cargar, al navegar y con las notas plegadas): el pie queda al fondo o debajo del borde, nunca cortado. axe sin fallas en las cinco pantallas y los ocho tamaños. En las otras ocho muestras el pie sigue donde estaba, y en una ventana alta baja al fondo (`muestra-planos.html` a 1920×1200).

## 2026-10-07 — Orden: carpeta renombrada, rama `en-curso` y copias viejas al archivo

Sin número de sesión. No se tocó ninguna pieza: es orden de carpetas y de git.

- **La carpeta se llama `unpsjb-design-system`,** como el repositorio (antes `ClaudeDesign`), y está en `~/Documents/UNPSJB/`.
- **Todo lo que estaba sin registrar en `main` quedó en la rama `en-curso`,** con un commit por función: visor de cámaras, módulo de planos, estudio de referencias con el prototipo de portal, y uno último con los archivos que comparten (`unpsjb.css`, `DESIGN.md`, la skill, `CHANGELOG.md`, esta bitácora). Sin número de versión y sin subir a GitHub.
- **Las copias de versiones anteriores salieron de la raíz** a `archivo/`, que no está en git: las `-v1`, `-v2`, `-v3.0` y `-0.3.2` y las tres páginas de comparación. Se comprobó que cada copia es igual a la de su etiqueta (`archivo/LEEME.md` tiene la tabla).
- **La carpeta de trabajo de `ajustes-0.4.4`** (`.claude/worktrees/modulos-0.4.2`) había quedado apuntando a la ruta vieja; se reparó con `git worktree repair`.
- `muestra-planos.html` funciona sola, con un edificio y datos inventados que trae dentro de la página (`#datos-ejemplo`); la mención a `datos/planos.json` es un ejemplo de código. La herramienta con los planos y los datos reales de la sede es `planos-universidad`, que va en un repositorio aparte: acá no entra ningún dato real. (Corrige lo que decía esta línea y el mensaje del commit ff5ea9d, que daban la muestra por rota.)

Pendientes, en orden:
- [x] Integrar `ajustes-0.4.4` (cartelera, documentos y gráficos). Quedó unida dentro de `en-curso`, no en `main`: sale todo junto en la próxima versión, cuando el módulo de planos esté terminado.
- [x] Reordenar las carpetas. Quedaron `sistema/` (lo que se publica: la hoja, los módulos, `fonts/` y `assets/`), `muestras/`, `notas/` y `herramientas/` (logo, emojis, QR y las pruebas de logo, con el EPS). Un commit que solo mueve y otro que corrige las rutas. Comprobado: las 163 rutas de las muestras, las hojas y las pruebas de logo resuelven, y `herramientas/logo/generar.sh` vuelve a generar los cinco logos idénticos. Las entradas anteriores de esta bitácora y de `CHANGELOG.md` nombran los archivos donde estaban entonces.
- [ ] Documentar lo que vino de `ajustes-0.4.4` en `DESIGN.md` y `CHANGELOG.md`, probar los gráficos nuevos y unificar el número de versión (hoy "0.4.4" nombra solo al módulo de planos).
- [ ] De ahí en adelante, una rama por función.

## 2026-10-15 — Se arma la 0.4.5, sin unir a `main`

Sin número de sesión. No se tocó ninguna pieza: número de versión y registro.

- **La rama `version-0.4.5` sale de `en-curso`** y lleva todo lo que había ahí: el visor de cámaras rehecho, las piezas del estudio de referencia con el prototipo de portal, lo que vino de `ajustes-0.4.4` (cartelera en el celular, logo original en documentos, barras, columnas y torta) y el reordenamiento de carpetas. El módulo de planos entra como quedó en la 0.4.4; los ajustes de `planos` y `planos-claro` no.
- **La 0.4.4 queda como estaba en el registro** (el módulo de planos). Nunca llegó a `main`: al unir la 0.4.5 entran las dos juntas.
- `DESIGN.md`, `unpsjb.css`, `unpsjb-video.css`, `muestra.html` y `muestra-video.html` dicen 0.4.5, y lo que decía "sin número todavía" dice 0.4.5. En `CHANGELOG.md`, las dos entradas "En curso" pasan a ser la 0.4.5, que suma lo de `ajustes-0.4.4`, que no estaba registrado.
- Sin subir a GitHub ni unir a `main`: falta decidir qué más entra.

Pendientes, en orden:
- [x] Qué entra en la 0.4.5: lo de `en-curso` más los gráficos probados. Los ajustes de `planos` y la revisión de `textos-y-revision` quedan para después.
- [x] Probar los gráficos de barras, columnas y torta. Con `muestras/prueba-graficos.html` (24 casos límite, datos inventados) en Chrome sin ventana a 1366 y 390 px, claro y oscuro. Aparecieron y se arreglaron: todo negativo se dibujaba fuera del gráfico, el valor de las negativas iba del lado del cero, la torta en cero dejaba una caja vacía, "Otros" podía salir dos veces y una porción visible decía "0 %". `muestra-graficos.html` sigue igual.
- [x] Tope de la torta: 6 porciones, 5 de color y una gris (lo decidió el usuario). `DESIGN.md` 15.A y 15.G.
- [x] Documentar barras, columnas y torta en `DESIGN.md` (15.F y 15.G), y en 18 y 20 lo que vino de `ajustes-0.4.4` (logo original del membrete, pie de verificación en espera, cartelera en el celular).
- [x] Resaltar en la lista la porción que está bajo el mouse (pedido del usuario), y al revés.
- [x] Marcas del eje enteras cuando los datos son enteros (antes 0; 2,5; 5,0…).
- [x] Sacar "(MII 2.0)" del nombre (pedido del usuario): queda contado como origen en `DESIGN.md`. Las notas viejas (`FRAMEWORK.md`, `FEEDBACK-NOTEBOOK.md`) lo conservan.
- [x] `axe` en las 12 muestras, a 1366 y 390 px, claro y oscuro. Apareció un contraste: `--color-advertencia-texto` sobre `capa` (4,3:1); pasa a `#a64c08`. Quedan dos avisos en `muestra-planos.html`, que se ven al unir `planos-claro`.
- [ ] Lector de pantalla: necesita una persona.
- [ ] Unir `version-0.4.5` a `main` y subirla.

## 2026-10-15 — Se publica la 0.4.5

A pedido del usuario: "es suficiente para esta versión que se pospuso mucho". `main` avanza hasta `version-0.4.5`, con las etiquetas `v0.4.5` y `v0.4.3` (que no se había etiquetado). La 0.4.4 no tiene etiqueta propia: salió dentro de la 0.4.5. En `CHANGELOG.md`, la 0.4.5 pasa a oficial y la 0.4.3 y la 0.4.4 a anteriores.
