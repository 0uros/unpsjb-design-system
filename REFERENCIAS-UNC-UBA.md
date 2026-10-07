# Estudio de referencia: los sitios de la UNC y la UBA, y MiUNC

Hecho el 2026-10-06. Se miraron tres cosas:

- **unc.edu.ar** (a donde lleva unc.ar): el portal de la Universidad Nacional de Córdoba. Drupal 7 con Bootstrap.
- **uba.ar**: el portal de la Universidad de Buenos Aires. Bootstrap 5.
- **mi.unc.edu.ar** (MiUNC): el portal donde cada persona de la UNC administra su cuenta e inicia trámites. Vue 2, con sesión iniciada.

**No se cambió nada del diseño.** `DESIGN.md`, `unpsjb.css` y las muestras quedaron como estaban. Esto es para decidir.

**Estado al 2026-10-07: aplicado en parte, sin número de versión ni commit.** Por pedido del usuario se pasaron a `DESIGN.md` y `unpsjb.css` las acciones 1 a 4 (como una sola pieza, la lista de accesos, 7.Q, más la página de inicio de cuenta, 17.D), la 5, 6 y 7 en chico (portal de la Delegación y entradas, 17.C), la 8 (2.C) y la 9 (sección 9). El prototipo es `muestra-portal.html`. Lo que sigue es lo que se había anotado el día anterior.

**Estado al 2026-10-06: en espera.** Por decisión del usuario no se integra nada todavía, porque hay otro trabajo en paralelo. Lo decidido hasta acá:

- Las reglas y restricciones (acciones 8 y 9, y la tabla "Lo que no conviene tomar") se tienen en cuenta cuando se retome.
- **El portal de la Delegación se va a hacer, pero simple:** informativo y de consulta rápida, porque el portal institucional ya lo maneja Comodoro. La acción 5 se achica a eso; no hace falta un módulo completo de noticias.

> Cómo leer este informe: los dos portales públicos sirven para **informar**; nuestro sistema está pensado para **hacer trámites** (`DESIGN.md`, sección 1). La referencia más cercana a lo nuestro es MiUNC, que es una herramienta. De los portales sirve sobre todo lo que hoy no tenemos: páginas de contenido.

Las marcas son las de `FEEDBACK-NOTEBOOK.md`: **[Ya está]** si `DESIGN.md` ya lo cubre, **[Nuevo]** si conviene agregarlo, **[Revisar]** si toca una decisión actual, **[Descartar]** si no conviene, con el motivo.

---

## Resumen: qué hacer

### Lo más importante

Los tres sitios se ven cuidados y los tres fallan en lo mismo que nosotros ya resolvimos: contraste, foco, zoom y peso. **Lo que vale la pena tomar es estructura y contenido, no el aspecto.** Y el aspecto de MiUNC (degradados, sombras, radios de 16 y 20px, letra de 13px) es justo lo que la 0.3 sacó a propósito.

### Acciones propuestas

| # | Acción | Sección de DESIGN.md | Viene de | Marca |
|---|---|---|---|---|
| 1 | **Página de inicio de cuenta.** MiUNC abre con el saludo, un aviso de lo que falta resolver (el correo de recuperación) y los accesos a lo más usado. Hoy no tenemos descrita la pantalla de entrada de una herramienta o de un portal de cuenta. Se arma con piezas que ya existen: encabezado de pantalla, un aviso y una lista de accesos (no una grilla de tarjetas con ícono, que 7.C prohíbe). | 6.D, 7.C, 8.A | MiUNC, inicio | **[Nuevo]** |
| 2 | **Lista de trámites en dos grupos:** "destacados" y "otros", cada uno con un único botón "Iniciar trámite". Es simple y se entiende sola. A nuestra manera: una lista con el nombre, una línea de qué es y el botón; sin logo grande por trámite. | 7 (pieza nueva) | MiUNC, trámites | **[Nuevo]** |
| 3 | **Lanzador de aplicaciones con buscador.** MiUNC lista 17 aplicaciones con un cuadro para filtrar por nombre y un contador. Sirve para un futuro "todas las herramientas de la Delegación". El buscador ya existe (7.I); falta la pieza del listado. | 7.I, 7 (pieza nueva) | MiUNC, aplicaciones | **[Nuevo]** |
| 4 | **Perfil con navegación lateral y lista de datos.** Columna izquierda con las secciones de la cuenta, a la derecha los datos como etiqueta y valor. En celular la navegación pasa arriba. La lista de resumen (7.L) ya cubre la parte derecha; falta escribir la regla de la columna de secciones. | 6.E, 7.L | MiUNC, perfil | **[Nuevo]** chico |
| 5 | **Módulo de portal** (si se decide hacer un sitio de la Delegación): portada, listado de noticias, noticia, página de contenido y pie con mapa del sitio. Es lo que tienen los dos portales y nosotros no. Detalle abajo, en "Piezas que ellos tienen y nosotros no". | sección nueva | UNC y UBA | **[Nuevo]** grande |
| 6 | **Pocas entradas, por tarea.** La UNC pone tres entradas arriba de todo: *Estudiar en la UNC · Facultades y colegios · Trámites*. En el celular son tres bloques que ocupan la pantalla. Es la mejor idea de navegación de los tres sitios. Para un portal nuestro: tres o cuatro entradas por lo que la persona viene a hacer, no por el organigrama. | sección nueva (portal) | UNC, portada | **[Nuevo]** |
| 7 | **Mosaico de bloques de color** para elegir entre pocas opciones grandes (la UBA lo usa para las 13 facultades). Es plano, sin sombras ni degradados, compatible con "plano y firme". Pero así como está falla: texto blanco sobre celeste da 1,99:1 y sobre naranja 2,02:1. A nuestra manera: bloques en `primario` con texto blanco y bloques neutros con texto oscuro; el naranja no se usa de relleno (3.B). | 3.B, sección nueva (portal) | UBA, facultades | **[Nuevo]** adaptado |
| 8 | **Presupuesto de peso para páginas con fotos.** La portada de la UNC baja 22 MB y su listado de noticias 32 MB, casi todo imágenes sin reducir. La de la UBA baja 14,5 MB, de los cuales 11,7 MB son un video. 2.C habla de rendimiento pero no pone un tope para imágenes: conviene fijarlo (tamaño máximo por foto, carga diferida, sin video que arranque solo). | 2.C | UNC y UBA | **[Nuevo]** |
| 9 | **Sumar tres controles a la lista de "antes de publicar":** que `lang` sea `es` (la UBA dice `en` en todo el sitio), que el `viewport` no bloquee el zoom (la UBA tiene `maximum-scale=1`, falla crítica de axe en las seis páginas) y que no se abra una ventana encima al entrar (la UBA abre una). La lista de hoy pide probar el zoom al 200 %, pero no nombra ninguno de los tres. | 9, "Antes de publicar" | UBA | **[Nuevo]** chico |
| 10 | **Ancho de renglón en textos largos.** La noticia de la UBA llega a unos 100 caracteres por renglón y su página de trámites a unos 124; la de la UNC, a unos 77. Nuestro tope ya es de 70 (`max-width: 70ch`, 4.C). No hay nada que cambiar. | 4.C | UNC y UBA | **[Ya está]** |

### Lo que confirma decisiones que ya tomamos

| Decisión nuestra | Qué se vio | Marca |
|---|---|---|
| Tipografía con identidad local (Montserrat). | La UNC usa **Reforma**, una familia hecha para ella; la UBA usa **Bitter**, argentina. Las dos universidades grandes eligieron letra con raíz propia, no una genérica. MiUNC usa Roboto y se nota: podría ser de cualquiera. | **[Ya está]** |
| Azul como banda de identidad. | Los tres abren con azul oscuro: UNC `#013765`, MiUNC `#153b65`, UBA `#1d2554` en el pie. | **[Ya está]** |
| Naranja nunca como texto ni como relleno (3.B). | La UBA usa naranja `#f3a400` para enlaces sobre blanco: 2,07:1. Es su falla más repetida (11 a 26 elementos por página). | **[Ya está]** |
| Foco siempre visible. | La UNC lo hace bien: contorno oscuro de 5px en todos los enlaces y enlace "Pasar al contenido principal". MiUNC tiene `outline: none` y al recorrer con Tab no se ve dónde se está. | **[Ya está]** |
| Cuerpo de 16px como mínimo, nunca menos de 13px. | MiUNC usa 13px para casi todo, también para los datos del perfil. La UNC, 13 a 15px en menús y pies de foto. | **[Ya está]** |
| Radios chicos (4 y 8px), sin sombras ni degradados. | MiUNC: radios de 10, 16 y 20px, nueve sombras distintas y degradados a 135° en botones e íconos. Es lo que le da el aire de plantilla. Los dos portales públicos casi no usan radios ni sombras, y se ven más firmes. | **[Ya está]** |
| Botones y enlaces de verdad. | En MiUNC las cuatro tarjetas de acceso rápido son `<div>` con clic: no se llega con el teclado. | **[Ya está]** |

### Lo que no conviene tomar

| Qué | Dónde | Motivo |
|---|---|---|
| Degradados, sombras de color y radios grandes. | MiUNC | Contra el principio 1 y contra 5.B. |
| Grilla de tarjetas iguales con ícono, título y texto. | MiUNC, inicio y aplicaciones | 7.C la prohíbe; la misma información entra en una lista. |
| Texto blanco sobre celeste, durazno o naranja. | UBA | 1,47:1 a 2,02:1. |
| Ventana que se abre sola al entrar. | UBA, portada | Tapa todo en el celular y atrapa el foco. |
| Carrusel de fotos como apertura. | UNC y UBA | Pesa mucho y la noticia que importa queda en una de siete vueltas. |
| Menú de más de 140 enlaces dentro de la cabecera. | UNC | El menú completo está en el código de cada página: 144 enlaces. |
| Un color por secretaría como fondo del título y de los botones. | UNC | La idea de orientar por color sirve, pero a nuestra manera va como marca fina (3.H), no como relleno. |
| Asistente de chat flotante. | UNC, facultades | Tapa contenido en el celular y es otro elemento fijo. |

---

## Detalle

### Cómo se midió

- **Portales públicos:** Chrome sin ventana, seis páginas por sitio (portada, una noticia, el listado de noticias, un listado, una página para un público y una de trámite), a **1280, 390 y 320px**. De cada una: captura entera, estilos efectivos (`getComputedStyle`), peso de la descarga, **axe 4.10.2** (WCAG 2.0, 2.1 y 2.2 A/AA y buenas prácticas) a 1280 y 390px, y doce pasos de Tab en la portada.
- **MiUNC:** en el navegador con la sesión del usuario, solo mirando: inicio, perfil, aplicaciones, trámites y seguridad. No se tocó ningún dato ni se inició ningún trámite. El ancho de celular se probó cargando las páginas en marcos de 390 y 320px. **No se guardaron capturas de MiUNC** porque muestran datos personales (nombre, DNI, CUIL, correo).
- Todo lo crudo está en `referencias/`: `medidas.json`, el programa `medir.js` y las capturas en `referencias/unc/` y `referencias/uba/` (`<página>-<ancho>.jpg` es la página entera; `-arriba` es lo que se ve al entrar).

Límites: el peso es aproximado (suma lo que declara cada respuesta). El alto de la cabecera de la UNC se tomó de la captura porque la página tiene un `<header>` vacío. No se probó lector de pantalla, ni Firefox ni Safari. De cada sitio se miraron seis páginas, no todo.

### Páginas

| | UNC | UBA |
|---|---|---|
| Portada | `/` | `/` |
| Noticia | `/comunicación/la-unc-pone-en-marcha-una-aceleradora…` | `/ubanoticias/noticias/1385` |
| Listado de noticias | `/noticias` | `/ubanoticias/home` |
| Listado | `/académicas/facultades-de-la-unc` | `/facultades` |
| Para un público | `/estudiantes` | `/ingresouba` |
| Trámite | `/vida-estudiantil/becas-0` | `/tramites` |

### Color

| | UNC | UBA | MiUNC | UNPSJB hoy |
|---|---|---|---|---|
| Azul de identidad | `#013765` y `#242f57` | `#1d2554` | `#153b65` | `#004992` |
| Segundo color | celeste `#9bbad7`, y un color por área (bordó en Bienestar) | naranja `#f7a600`, celeste `#91bde0`, durazno `#fdcd8f` | azul Material `#2196f3`, naranja `#ff9800` | naranja `#ff9900`, solo marca y foco |
| Texto | `#153154`, `#222222`, gris `#727273` | `#1d2554` para todo | `#212121`, `#4c4c4c`, `#5f6368` | neutros teñidos de azul |
| Fondos distintos en la portada | 16 | 15 | 11, más 5 degradados | — |
| Variables de color en `:root` | 6 | 0 | 0 de color | todo por tokens |

Contrastes medidos aparte:

| Par | Relación | |
|---|---|---|
| UBA: blanco sobre celeste `#91bde0` | 1,99:1 | falla |
| UBA: blanco sobre naranja `#f7a600` | 2,02:1 | falla |
| UBA: blanco sobre durazno `#fdcd8f` | 1,47:1 | falla |
| UBA: enlace naranja `#f3a400` sobre blanco | 2,07:1 | falla |
| UBA: verde de "Noticias" `#3bc3ad` sobre blanco | 2,19:1 | falla |
| UBA: azul `#1d2554` sobre blanco | 14,53:1 | pasa |
| UNC: gris `#727273` sobre blanco | 4,81:1 | pasa justo |
| UNC: azul `#153154` sobre blanco | 13,13:1 | pasa |
| MiUNC: blanco sobre el botón `#2196f3` | 3,12:1 | falla para texto de 13px |

Lectura: la UBA tiene la paleta con más carácter de las tres (azul, naranja, celeste y durazno en bloques planos), y es la que peor contraste da. La paleta sirve para fondos con texto azul oscuro; con texto blanco no.

### Tipografía

| | UNC | UBA | MiUNC | UNPSJB hoy |
|---|---|---|---|---|
| Familias | Reforma 2018 (interfaz) y Reforma 1918 (lectura), propias | Bitter en cinco pesos | Roboto | Montserrat y Atkinson Hyperlegible Next |
| Cuerpo | 17px / 300 / 1,5 | 17 a 18px / 400 / 1,5 | **13px** / 400 a 500 | 16px / 400 / 1,55 |
| Título de página | 30px / 500 | 40px / 500 | 40px / 300 (saludo), 22,5px | 32px / 800 |
| Tamaños distintos en la portada | 8 | **16** | 9 | 8 roles fijos |
| Ancho de renglón en la noticia | 653px, unos 77 caracteres | 846px, unos 100 | — | — |

- La UNC usa peso 300 (fino) para casi todo el texto, también a 13 y 14px. Se ve elegante y cuesta leer en pantallas comunes.
- La UBA escribe casi todos los títulos y bloques en mayúsculas. En títulos cortos funciona; en titulares de noticia de tres renglones, no.
- La UBA no tiene escala: 16 tamaños en una página (27, 28, 29, 32 y 33px conviven).

### Cabecera, navegación y pie

| | UNC | UBA | MiUNC | UNPSJB hoy |
|---|---|---|---|---|
| Cabecera en escritorio | banda azul con foto, unos 123px, más barra de tres entradas de 50px | blanca, 107 a 139px según la sección | banda azul, 65px | banda 64px + sub-barra 48px |
| Cabecera en celular | 80px | 54 a 115px | 65px | 56px |
| ¿Fija? | no | no | **sí** | sí, con `scroll-padding` |
| Qué hay | menú, logo, acceso a MiUNC, buscador | logo, buscador, menú, idioma | menú, logo, cuenta | logo, herramienta, ayuda, cuenta |
| Navegación principal | tres entradas por tarea; debajo, fila de secretarías y fila de temas | todo detrás del botón "Menú" | menú lateral de seis ítems | sub-barra de hasta 6 secciones |
| Pie | logo, dirección y teléfono, redes; 151px | logo, 12 enlaces del sitio con marca naranja arriba, redes; 417px | logos de la UNC y de Informática | una línea |

- En la UNC, el acceso a **MiUNC está en la cabecera del portal**, en todas las páginas. Es el puente entre "informarse" y "hacer": vale copiarlo si hay portal.
- En la página de becas de la UNC hay tres niveles de navegación antes del título (tres entradas, 20 secretarías, 8 temas). Es mucho; la sección actual se marca con fondo de color.
- La marca naranja fina sobre cada enlace del pie de la UBA es el mismo gesto que nuestro "estás acá", usado como adorno. Entre nosotros el naranja no decora (3.B).

### Forma

| | UNC | UBA | MiUNC | UNPSJB hoy |
|---|---|---|---|---|
| Radios | casi ninguno (4px en el buscador) | casi ninguno | 10, 14, 16 y 20px | 4 y 8px |
| Sombras | ninguna que arme jerarquía | una, en las tarjetas de noticias | 9 distintas, algunas de color | ninguna |
| Degradados | ninguno | ninguno | 5, a 135° | ninguno |

Los dos portales grandes son planos. MiUNC es el único con el repertorio de plantilla.

### Accesibilidad

axe, reglas que fallan (entre paréntesis, cuántos elementos en la página más afectada):

| | UNC | UBA |
|---|---|---|
| Críticas | botón del buscador sin nombre (todas las páginas), imágenes sin texto alternativo (3), roles de lista mal armados en el menú del celular | **el zoom está bloqueado** (`maximum-scale=1`, todas las páginas), botón sin nombre en facultades |
| Serias | enlaces sin texto (120 en el listado de noticias: la foto y el título son enlaces separados), contraste (63 en facultades), enlaces que solo se distinguen por color (11 en becas), blancos de menos de 24px | contraste (11 a 26 por página), enlaces sin texto (8 a 14 en todas: los íconos de redes), ventana sin nombre |
| Moderadas | sin `<main>`, páginas sin `h1` (cuatro de seis), contenido fuera de regiones | sin `<main>`, orden de títulos roto (hasta 10), hasta **6 `h1`** en una página |
| Reglas que fallan por página | 5 a 9 | 7 a 8 |

Otras pruebas:

| | UNC | UBA | MiUNC |
|---|---|---|---|
| `lang` | `es` | **`en`** | `es` |
| Enlace para saltar al contenido | sí | no | no |
| Foco visible | sí, contorno de 5px | no se pudo ver: la ventana de entrada atrapa el foco y su botón no tiene contorno | **no** (`outline: none`) |
| Scroll horizontal a 390px | en `/estudiantes` la página mide 560px | no | no |
| Scroll horizontal a 320px | en facultades y becas, unos pocos píxeles; en `/estudiantes`, 560px | no | en aplicaciones, unos píxeles |
| Títulos | — | — | ordenados (`h1`, `h2`, `h3`) |
| Regiones | sin `main` | sin `main` | `header`, `aside`, `footer`; sin `main` ni `nav` |

Lectura: **ninguno de los tres pasaría nuestra lista de "antes de publicar".** La UNC es la más cuidada en teclado; la UBA, la más prolija en el celular, pero con el zoom bloqueado.

### Peso

| Página | UNC | UBA |
|---|---|---|
| Portada | 22,1 MB en 64 pedidos (21,2 MB de imágenes) | 14,5 MB en 27 pedidos (11,7 MB de video) |
| Noticia | 3,1 MB | 1,2 MB |
| Listado de noticias | 32,3 MB (31,4 MB de imágenes) | 2,1 MB |
| Listado | 12,7 MB | 0,8 MB |
| Trámite | 1,3 MB | 0,3 MB |

Fuera de la portada, la UBA es liviana: 69 kB de estilos y 29 kB de programa. La UNC carga 360 a 430 kB de estilos y 340 kB a 1,2 MB de programa en cada página.

### MiUNC, pantalla por pantalla

| Pantalla | Qué tiene | Qué sirve | Qué no |
|---|---|---|---|
| Inicio | Saludo con el nombre, aviso sobre el correo de recuperación con tres reglas, cuatro accesos rápidos. | El orden: quién sos, qué tenés pendiente, a dónde ir. El aviso explica para qué se usa el dato. | Los accesos son `<div>` sin teclado; íconos con degradado; el saludo a 40px en peso 300. |
| Mi perfil | Columna con cinco secciones (información general, contacto, emergencia, dependencias, historial de cambios) y los datos a la derecha. | **"Historial de cambios"** y **"Datos de emergencia"** como secciones propias. El lápiz al lado del único dato que se puede editar. | Datos a 13px; botón rojo "Ir a correo UNC" (el rojo, entre nosotros, es error). |
| Aplicaciones | 17 aplicaciones con buscador, contador y "Abrir aplicación" con el ícono de enlace externo. | El ícono que avisa que se sale del sitio. El contador. | Para filtrar 17 cosas hay que apretar "Buscar"; convendría que filtre al escribir. |
| Trámites | Dos grupos, cada trámite con su logo y "Iniciar trámite". | Los dos grupos y un solo botón por trámite. | Cada trámite trae su propio logo y color: la página parece un collage. Texto blanco sobre el botón: 3,12:1. |
| Seguridad | Contraseña y correo de recuperación; un recordatorio de que nunca se pide la contraseña. | El recordatorio contra el fraude, al lado del dato. | Está en cursiva, gris y a 13px: lo más importante es lo que menos se ve. |

En el celular MiUNC se acomoda bien: las tarjetas pasan a una columna, la navegación del perfil sube y los botones ocupan el ancho.

Por las rutas del programa se ve cómo crece: comedor (reservas, saldo, movimientos, pagos), deportes (explorar, inscripción, estudios médicos, pagos), compromiso social (proyectos, postulación, certificados), más Guaraní, GDE y Google. Cada trámite es un módulo con su página de ayuda y su paso "habilitar trámite". Es la misma idea que nuestros módulos.

### Piezas que ellos tienen y nosotros no

Candidatas para un módulo de portal (acción 5):

| Pieza | Quién la tiene | Nota |
|---|---|---|
| Portada con entradas por tarea | UNC (tres entradas), UBA (mosaico) | Acciones 6 y 7. |
| Tarjeta de noticia: foto, categoría, título, bajada | los dos | En la UNC la foto y el título son dos enlaces; tiene que ser uno. |
| Página de noticia: categoría, volanta, título, fecha, bajada, foto con epígrafe, compartir | UBA la más completa | Con tope de ancho de renglón. |
| Lista de enlaces a trámites, con flecha | los dos | Ya se arma con lo que hay. |
| Recuadro de contacto: oficina, dirección, horario, teléfono, correo | UNC, en becas | Útil también dentro de las herramientas. |
| Pie con mapa del sitio y redes | UBA | El nuestro es de una línea (6.C): haría falta una variante. |
| Acceso a la cuenta desde la cabecera del portal | UNC | — |
| Buscador de carreras | UBA | El combobox (7.K) lo cubre. |
| Sub-marca con color propio ("UBA Noticias" en verde) | UBA | Entre nosotros la herramienta se nombra en la banda; no cambia de color. |

---

## Qué falta decidir

1. Si se va a hacer un portal de la Delegación. De eso depende la acción 5, que es la grande, y las 6 y 7.
2. Si las acciones 1 a 4 (inicio de cuenta, trámites, lanzador, perfil) entran en la próxima versión. Son chicas y se arman con piezas que ya existen.
3. Las acciones 8 y 9 son reglas escritas: se pueden sumar a `DESIGN.md` sin tocar la hoja de estilos.
