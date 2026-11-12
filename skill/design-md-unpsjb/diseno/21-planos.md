# 21. Planos

Las plantas de un edificio con lo que se marca encima: **antenas de wifi** (puntos) y **aulas** (zonas). Sirve cuando lo que importa es **dónde** está algo. Módulo: `unpsjb-planos.css` (32 KB) y `unpsjb-planos.js` (51 KB; 16 KB comprimido), más el modo edición, opcional (21.G). Ejemplo: `muestra-planos.html`.

El plano muestra **el estado de ahora**. Para elegir un aula y un horario está la agenda (16.A): desde el aula elegida se llega a su agenda con un enlace (`data-agenda`).

## A. El dibujo

- **Es un mapa, no un plano de obra.** El lienzo es el piso (pasillos, exterior) y va en un tono; los locales con nombre se rellenan en otro, más claro (21.D). Así el edificio tiene cuerpo y se ve de un vistazo qué es local y qué es paso. Un plano de arquitectura puesto tal cual sobre blanco no cumple ese trabajo: todo pesa lo mismo.
- **El dibujo queda de fondo, apagado.** Muros en `linea-control`; el resto (escaleras, cotas, mobiliario, textos del original) en el mismo tono al 45 %. La forma del edificio la dan los locales rellenos, no los muros.
- **El detalle aparece al acercar.** Con el plano entero se ven solo los muros (`.plano-trazo`); lo demás (`--suave` y `--rotulo`) aparece desde el doble de acercamiento (`.plano--cerca`, que pone el script). De lejos ese detalle no se lee y compite con los rótulos. En papel va el dibujo entero.
- **Nunca con los colores de CAD** (rojo, verde, cian, amarillo puros): chocan con el semáforo y no se ven en modo oscuro. El color queda para lo que se marca encima.
- **Es un SVG de solo trazos,** con tres clases: `.plano-trazo` (muros, columnas, aberturas), `.plano-trazo--suave` (lo demás) y `.plano-trazo--rotulo` (los nombres escritos en el plano original). El color lo pone la hoja con `currentColor`; el archivo no trae colores.
- **Nunca una imagen** (PNG, JPG) ni un PDF incrustado: se pixelan al acercar, no cambian con el tema y pesan más.
- **Las líneas no engordan al acercar:** miden 1px a cualquier distancia. Es un plano, no una foto.
- **Cómo se obtiene:** de un PDF de AutoCAD, con `pdftocairo -svg` y un paso de limpieza que cambia los colores por las tres clases, junta los trazos y recorta la hoja. Cada herramienta guarda su conversor junto a sus planos (el de Trelew: `herramientas/limpiar_svg.py`). Un plano de 9.000 trazos queda en menos de 500 KB (130 KB comprimido), y se trae solo la planta que se mira.
- El rótulo de la hoja ("PLANTA BAJA") se quita del dibujo: el nombre de la planta lo dice la pantalla.

## B. La pantalla

**Un panel a la izquierda para buscar y elegir, y el plano a la derecha con sus controles encima,** como en los mapas de interiores. Desde 1024px van lado a lado y ocupan el alto de la ventana; el panel mide 320px.

| Pieza | Clase | Regla |
|---|---|---|
| Panel | `.plano__panel` | Arriba, el buscador (`.plano__buscar`) y qué se muestra (`.plano__capas`: "Aulas y espacios" y "Antenas", dos filtros que se prenden y se apagan). Debajo, el resumen de la planta y la lista. **Nunca queda vacío.** |
| Resumen | `.plano__resumen` | Una línea con la planta y lo que hay: "Planta baja · 15 espacios · 3 libres · 3 ocupadas · 17 antenas sin ubicar". Mientras se busca, cuántos resultados hay. Es `role="status"`. |
| Lista | `.plano__lista` | Grupos con su título y cuántos son (`.plano__subtitulo`, un `h2` que queda fijo al bajar): aulas y espacios, antenas, puntos de referencia y, aparte, las antenas sin ubicar. Cada fila es un botón (`.plano__item`) con el nombre, un dato (tipo, modelo) y la insignia de estado si dice algo. |
| Detalle | `.plano__detalle` | La ficha de lo elegido **reemplaza a la lista en el panel**, con "Volver a la lista" arriba, en una lista de resumen (7.L). `Esc` también vuelve. **Sin cartel flotante** (7.P). |
| Lienzo | `.plano__lienzo` | Fondo `--plano-suelo` (`capa` en claro, `fondo` en oscuro), borde `linea`. Desde 1024px toma el alto del panel; más angosto, el alto sale de la proporción del plano, sin pasar del 65 % de la ventana. |
| Planta | `.plano__plantas` | Arriba a la izquierda, sobre el plano: una columna con las plantas de arriba hacia abajo ("2", "1", "PB"), como los botones de un ascensor. |
| Acercar | `.plano__zoom` | Abajo a la derecha: "Acercar" y "Alejar" juntos, y "Ver todo" debajo. |
| Ayuda | `.plano__ayuda` | Arriba a la derecha: un botón "?" que abre cómo se mueve el plano (`details`). |
| Referencias | `.plano__referencias` | En una tira debajo del plano, no encima: el ícono de cada estado y tipo con su nombre. Solo los que hay en esa planta. |

- **Los controles van sobre el plano, pero fuera del lienzo:** tocarlos no lo mueve. Todos tienen la misma superficie: fondo `panel`, borde y la sombra de lo que flota.
- **Con el plano entero, los controles no tapan nada:** en un lienzo de 600px o más se deja lugar a los costados. Más angosto el plano se agranda y los controles quedan encima; se puede mover.
- **El buscador busca en todo el edificio,** no solo en la planta que se ve: cada resultado dice en qué planta está, y elegirlo lleva a esa planta. `Esc` borra la búsqueda.
- **Por debajo de 1024px se ve la lista o el plano** ("Lista \| Plano", `.plano__modo`). Con menos de 768px se abre en la lista. Con el plano a la vista, del panel queda solo la ficha de lo elegido, debajo del plano.
- **En papel** van el plano entero, en una hoja, y después la lista; sin buscador, filtros ni controles.

- **Mover y acercar no dependen de arrastrar** (WCAG 2.2, 2.5.7). Se puede arrastrar y pellizcar, pero están siempre los botones "Acercar", "Alejar" y "Ver todo", y el teclado: con `Tab` se llega al plano, las flechas lo mueven, `+` y `−` acercan y alejan, y `0` muestra todo.
- **La rueda del mouse sola mueve la página,** no el plano: si no, al bajar por la pantalla el plano atrapa el scroll. Para acercar con la rueda, `Ctrl` + rueda. Lo explica la ayuda ("?") sobre el plano.
- **"Ver todo" es un botón con texto,** no el ícono `maximize`: ese ícono ya significa "pantalla completa" en el visor de cámaras (16.B).
- **Todo plano tiene su lista,** igual que todo gráfico tiene su tabla (15.D). Es la forma de usarlo con lector de pantalla y **en celular, donde se abre primero la lista**. Cada fila es un botón que la elige.
- **La planta y lo elegido van en la dirección** (`#planta=pb&antena=ap-03`), para poder mandarle a alguien el enlace a una antena.
- El dibujo lleva `aria-hidden`: para el lector de pantalla, lo que informa son los botones y la lista.

## C. Antenas

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

## D. Aulas

Cada aula es una **zona** (`.plano-zona`, un polígono) con su **rótulo** (`.plano-rotulo`, un botón). **Toda zona se rellena con el tono de local** (`--plano-local`: `panel` en claro, `capa` en oscuro): tapa el dibujo que tiene debajo y se despega del piso. Encima de eso, **pesa según lo que tiene para decir:** lo que resalta es lo libre y lo elegido.

| Estado | Zona | Rótulo |
|---|---|---|
| Libre | `exito-texto`: borde de 1,5px y relleno al 16 % sobre el tono de local | **Caja llena** en `exito` con el texto en blanco (5.5:1), ícono `check`, nombre y hasta cuándo. Es lo que se busca: es lo que primero se ve |
| Ocupada | `tinta-2`: borde de 1px y relleno al 14 %. **No en rojo:** un aula ocupada no es un error | **Caja hueca:** fondo `panel`, borde `linea-control`, ícono `clock` en `tinta-2`, nombre y hasta cuándo |
| Sin dato | El tono de local, con borde `--plano-borde` de 1px | El nombre solo, sin caja ni ícono |
| No se reserva | A medio camino entre el local y el piso, con borde `--plano-borde` de 1px | El nombre solo, en `tinta-2` y sin negrita |

- **El borde de un local da 3:1 contra el piso y contra el local** (WCAG 1.4.11): es lo que los separa. `--plano-borde` es `linea-control` al 70 % con `tinta-2`: 3.6:1 sobre `capa` y 4.2:1 sobre `panel`; en oscuro, 5.7:1 y 4.5:1. `linea-control` sola da 2.9:1 sobre `capa`.
- **El rótulo va donde hay lugar para un nombre.** En un rectángulo, en el medio. En un local en L o en U el medio puede caer afuera: va al punto más ancho entre los que están bien adentro (se parte del "polo de inaccesibilidad", el punto más alejado de todos los bordes). El lugar disponible se mide ahí, no en la caja que rodea al local.
- **Un local sin estado puede llevar el color de su tipo.** Biblioteca (`cat-1`), laboratorio (`cat-2`) y sala (`cat-4`) llevan un tinte de su categoría (3.H) al 14 % y el borde hacia ese tono. **Las aulas y las oficinas no llevan color:** son casi todo el edificio, y si todo tiene color nada se distingue. Máximo cuatro tipos con color, y cada uno con su nombre en las referencias. Una herramienta puede definir los suyos en los datos (`"tipos"`).
- **El estado manda sobre el tipo.** Un laboratorio libre va en verde y uno ocupado en neutro, no en su color: el relleno dice una sola cosa por vez. Su tipo sigue en el nombre, en el panel y en la lista.
- **"Sin dato" suele ser casi todo el plano:** por eso no lleva color, ni ícono, ni dice "Sin dato" en cada aula. El estado está en el panel, en la lista y en el nombre del botón.
- **El azul (`primario-texto`) es solo para lo elegido:** borde de 2,5px y relleno al 16 % en la zona, y el rótulo con borde y fondo azulados. Ningún estado lo usa.
- **Libre y ocupada se distinguen también sin color:** una caja es llena y la otra hueca, y cada una tiene su ícono.
- El texto dice hasta cuándo, si se sabe: "Ocupada hasta las 16:00", "Libre hasta las 14:00".
- **El rótulo nunca se sale de su aula, y el nombre es lo último que se pierde.** Si no entra entero, se acorta de a un paso: sin el estado (`--medio`); con el ícono y el **nombre breve** (`--corto`); el nombre breve solo (`--chico`). **Nunca queda el ícono solo.** En el paso más chico el estado se ve por la caja (llena, hueca o sin caja). Lo que deja de verse sigue en el nombre del botón, en el panel y en la lista. Al acercar, vuelve.
- **El nombre breve** sale solo: "17" por "Aula 17", "Lab. Física" por "Laboratorio de Física". Para los demás, los datos pueden traer el suyo en `"corto"` ("Jurídicas" por "Facultad de Ciencias Jurídicas"). Si ni el breve entra, se corta con puntos suspensivos; el nombre entero aparece al pasar el mouse.
- **En un local angosto y alto, el nombre va de pie** (`--de-pie`), de abajo hacia arriba, como en un plano.
- **No todo lo que tiene nombre se reserva.** La biblioteca, una oficina o un laboratorio de investigación también se marcan, para ubicarse, pero **sin estado**: llevan `"reservable": false` y `"tipo"` ("Oficina", "Laboratorio"…), y en la lista dicen su tipo.
- La zona también responde al clic, pero es un **atajo para el mouse**: con el teclado se llega al rótulo.
- Sin tramas de relleno (15.C).
- **Las referencias de abajo del plano** muestran un recorte de cada zona (`.plano__muestra`), con su ícono si lo lleva.
- **El estado es un dato aparte** (`data-ocupacion`): el plano no sabe de reservas. Quien tenga las reservas arma `{ "id-del-aula": { "estado": "ocupada", "hasta": "16:00", "evento": "Álgebra I" } }` y se lo pasa (`plano.ocupacion(datos)`), sin volver a cargar la pantalla. Un aula que no figura queda "Sin dato".

## H. Puntos de referencia

Escaleras, ascensores, baños y entradas: lo que se busca con la vista para ubicarse. Es lo que más ayuda a encontrar un lugar cuando no hay posicionamiento (hay estudios con usuarios que lo miden).

- Cada uno es un **botón** (`.plano-lugar`): un cuadrado de 24px, fondo `panel` y borde `--plano-borde`, con su dibujo. **Cuadrado y en neutro,** para no confundirlo con una antena (redonda, con el color de su estado): un punto de referencia no tiene estado.
- **El nombre aparece al acercar** (`.plano--cerca`); de lejos va el dibujo solo. El nombre entero está siempre en el nombre del botón, al pasar el mouse y en la lista.
- **Siempre se ven:** no son una capa que se apaga.
- Tipos: `escalera`, `ascensor`, `sanitario` y `entrada`. Los dibujos de la escalera y del ascensor son propios del módulo. Sin tipo conocido, un marcador genérico.
- El nombre es opcional: "Escalera" alcanza; "Entrada principal" o "Escalera norte" cuando hay más de una.
- Figuran en las referencias (los tipos que hay en esa planta) y en la lista, en su propio grupo. Se pueden enlazar: `#planta=pb&lugar=pb-lugar-01`.

## E. Los datos

Un solo archivo con las plantas, las antenas y las aulas (todos los espacios con nombre); las posiciones van en las unidades del `viewBox` de cada dibujo. El formato completo está al principio de `unpsjb-planos.js`.

- **El dibujo conserva las coordenadas de la hoja original** (su `viewBox` no arranca en cero). Así se puede **simplificar un plano** (quitarle una parte que no interesa) o volver a una versión más completa sin mover nada de lo marcado. Cada versión anterior de un plano se guarda: nunca se pisa.
- `"lugares"` (opcional) son los puntos de referencia (21.H): `{ "id", "tipo", "nombre", "planta", "x", "y" }`. `"tipos"` (opcional) dice qué tipos de local llevan color: `{ "Taller": 3 }`.
- Un espacio sin `puntos` figura en la lista pero no en el plano: sirve para cargar primero los nombres y ubicarlos después.
- `"corto"` (opcional) es el nombre que se muestra cuando el aula se ve chica (21.D).
- **El identificador de un aula no se cambia** una vez que lo usan las reservas: es lo que une el plano con la agenda. El nombre sí.
- **Editar las posiciones es cosa de cada herramienta,** no del módulo: el módulo avisa dónde se hizo clic (`plano:clic`), deja sumar un formulario al panel (`plano:detalle`) y se vuelve a pintar (`plano.pintar()`). Un editor nunca depende solo de arrastrar: ofrece también "reubicar" con un clic y campos con la posición.
- En React se puede usar el mismo script (`unpsjbPlanos.dibujar(elemento, datos)`) o armar un componente con estas clases.

## F. Lo que no va

| No va | Por qué |
|---|---|
| El plano con los colores de CAD, o como imagen | No funciona en oscuro, choca con el semáforo y se pixela (21.A) |
| Cartel flotante al pasar el mouse | No existe en celular y tapa el plano (7.P): va el panel de detalle |
| Mapa de calor o círculos de cobertura | Inventan una precisión que los datos no tienen |
| Un mapa de calles de fondo (Leaflet, Google Maps) | Adentro de un edificio no aporta, y suma cientos de KB y un servicio externo |
| Naranja para lo elegido | El naranja es foco y "estás acá" (sección 1) |
| El estado solo con color | Siempre ícono y texto (3.E) |
| Elegir horarios sobre el plano | Para eso está la agenda (16.A); el plano enlaza a ella |

## G. Modo edición

Para marcar antenas y aulas sobre el plano sin tocar el archivo de datos a mano. Es **opcional**: `unpsjb-planos-editor.js` (23 KB; 7 KB comprimido) se carga después de `unpsjb-planos.js` y solo hace algo cuando la dirección lleva `?editar`. Sus estilos están en `unpsjb-planos.css`. Ejemplo: `muestra-planos.html?editar`.

- **Se entra con un botón secundario en el encabezado** ("Editar antenas y aulas", `#ir-a-editar`), que en modo edición pasa a "Salir de la edición".
- **La barra (`.plano-editor`) es una tira pegada al plano,** no un panel aparte: **el plano no se va de la vista mientras se edita.** Arriba, en una fila de botones compactos: qué agregar ("Antena", "Aula", "Aula de forma irregular"), lo que falta ubicar, y contra el borde derecho "Descartar" y "Descargar planos.json" (el único primario). Abajo, una franja (`.plano-editor__ahora`, con `role="status"`) dice qué está pasando y cómo se publica; mientras se marca cambia de color y muestra "Cerrar la forma" y "Cancelar".
- **Las antenas que están en los datos pero no tienen lugar** se eligen de un desplegable ("Antenas sin ubicar") y se ubican con un clic en el plano.
- **Un punto de referencia se agrega con un clic** ("Punto de referencia") y en el panel se elige qué es. El nombre es opcional.
- **Un aula se marca con dos clics** (una esquina y la opuesta). Para una forma irregular, un clic por esquina y "Cerrar la forma". Lo que se va marcando se dibuja en `primario-texto` (`.plano-borrador`).
- **Los datos de lo elegido se editan en el panel de detalle** (`.plano-form`): no hay ventana aparte. **En edición el panel muestra el formulario y no la ficha:** ningún dato va dos veces. El tipo de equipo de una antena se elige entre tres opciones en una fila, cada una con su dibujo (`.plano-form__equipo`). Un aula puede llevar su nombre corto.
- **Todo se puede hacer sin mouse** (WCAG 2.2, 2.5.7): con el teclado, lo nuevo aparece en el centro de lo que se ve y se ajusta con los campos de posición. `Esc` cancela lo que se está marcando.
- **No hay servidor.** Los cambios quedan como borrador en el navegador y "Descargar planos.json" entrega el archivo que reemplaza al publicado. Si lo publicado cambió después de empezar el borrador, manda lo publicado y se ofrece recuperar el borrador.
- **Borrar y descartar piden confirmación** en un modal (7.G), nunca con `confirm()`.
- Todavía no tiene: mover arrastrando, corregir una forma irregular esquina por esquina, ni deshacer.
