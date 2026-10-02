# Bitácora — Sistema de Diseño UNPSJB (MII 2.0)

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
