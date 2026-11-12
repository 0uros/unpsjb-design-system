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
| Planos (0.4.4) | `unpsjb-planos.css` + `unpsjb-planos.js` (+ `unpsjb-planos-editor.js`, opcional) | `muestra-planos.html` | 17 KB + 31 KB (+ 23 KB) | 21 |

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
