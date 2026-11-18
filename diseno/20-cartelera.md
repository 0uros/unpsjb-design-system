# 20. Cartelera

Una tele en un pasillo que muestra las actividades del día. Es la señalética del sistema en sentido literal, y se diseña al revés que una herramienta: se mira **de lejos y de paso**, y **no se toca**. Módulo `unpsjb-cartelera.css`; ejemplos: `muestra-cartelera.html` (la tele) y `muestra-cartelera-celular.html` (la vista de solo lectura a la que lleva el QR).

## A. Medidas para leer de lejos

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

## B. Qué muestra

- **La banda,** más alta (120 u): el logo, el lugar ("Edificio de Aulas") y, a la derecha, la fecha y la hora. La hora es lo más grande de la pantalla: es lo que se busca primero.
- **La tabla de actividades** (`.cartelera-tabla`), ordenada por hora: hora, actividad y lugar. Es una tabla de verdad.
- **Solo lo que le sirve a quien pasa:** las actividades públicas que están en curso o por empezar. Las que terminaron salen solas. Las tareas internas (mantenimiento) no van.
- **En curso:** la fila lleva fondo `tinte` y la insignia "En curso". **En azul, no en naranja:** el naranja es el foco y "estás acá", y en la tele no hay ninguno de los dos.
- **"Empieza en 15 min"** desde media hora antes.
- **Cambio de aula:** insignia de advertencia, el aula nueva en grande y debajo "Antes: Aula 101".
- **Suspendida:** insignia de error. El nombre se apaga, pero **no se tacha:** se tiene que poder leer qué se suspendió.
- **Avisos** (`.cartelera-aviso`): la misma placa de estado de las herramientas (8.A), con título y una o dos frases. Van arriba del QR.

## C. Cuando no entra todo

- **Las filas se reparten en páginas que rotan solas,** cada 12 segundos. El pie dice "Página 1 de 2".
- Se mide lo que entra: seis filas en una tele horizontal, menos si un nombre ocupa dos renglones. Un nombre largo sigue en otro renglón; no se corta con puntos suspensivos.
- El cambio de página es un corte, sin animación (5.E).
- Los avisos hacen lo mismo: si no entran todos arriba del QR, van por tandas.

## D. El QR y la vista de solo lectura

- **El QR lleva a las mismas actividades en el celular** (`.cartelera-qr`), para quien quiere mirar con calma, buscar su materia o ver otro día. Esa vista (`muestra-cartelera-celular.html`) es una página pública común que usa las piezas de la agenda (`.solo-lectura`): se mira, no se toca. Se adapta a la pantalla:
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

## E. Cuando algo falla

- **Sin actividades:** lo dice en grande ("No hay más actividades por hoy") y avisa cuál es la próxima. Nunca una tabla vacía.
- **Sin conexión:** la tele sigue mostrando lo último que recibió y **lo dice en el pie,** con ícono y palabras: "Sin conexión. Se muestran los datos de las 9:40 h". Una cartelera con datos viejos y sin aviso es peor que una apagada.
- El pie dice siempre a qué hora se actualizó.

## F. Tema y orientación

- **Claro u oscuro, fijo por pantalla.** La tele no tiene dónde elegirlo: se pone en la dirección (`?tema=oscuro`). Claro para pasillos con luz de día; oscuro para lugares con poca luz. La banda no cambia.
- **Tele en vertical:** la u pasa a medirse sobre 1080 de ancho; la tabla ocupa todo el ancho y los avisos y el QR van abajo.

## G. Lo que no va

| No va | Por qué |
|---|---|
| Animaciones, texto que corre, transiciones entre páginas | El movimiento sin motivo cansa y distrae en un pasillo (5.E) |
| Video o fotos de fondo | Fondos limpios (3.G); y bajan el contraste del texto |
| Algo que haya que tocar | Nadie se acerca a una tele a hacer clic; para eso está el QR |
| La grilla de la agenda | Es para comparar aulas sentado frente a una pantalla, no para leer de paso |
| Más de dos avisos largos | Lo que no se lee en diez segundos, no se lee |
