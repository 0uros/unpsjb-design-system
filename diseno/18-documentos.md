# 18. Documentos e impresión

Casi toda herramienta termina en un papel: una constancia, un certificado, un comprobante. El módulo `unpsjb-documentos.css` (ejemplo: `muestra-documentos.html`) da la hoja y sus partes. Imprimir una pantalla cualquiera (una tabla, una agenda) no necesita este módulo: eso ya lo hace `unpsjb.css` (6.G).

| Documento | Hoja | Letra del texto | Trato |
|---|---|---|---|
| Constancia, nota, resolución | A4 vertical | Serif (`.fuente-academica`) | Formal, en tercera persona |
| Certificado, diploma | A4 apaisada | Serif | Formal |
| Comprobante de un trámite | A4 vertical | La del sistema | De vos, como la herramienta |
| Planilla para firmar | A4 vertical | La del sistema | — |

## A. La hoja

- **En pantalla se ve la misma hoja que sale impresa** (`article.hoja`): mide un A4 y tiene sus márgenes. Quien la mira sabe qué va a salir, sin abrir la vista previa.
- **La hoja es papel:** blanca con tinta negra, también en modo oscuro. Es la segunda excepción al tema, junto con el video sobre negro (16.B). Usa los colores de papel, los mismos con que `unpsjb.css` imprime cualquier pantalla (6.G): `papel` `#ffffff`, `papel-tinta` `#000000`, `papel-tinta-2` `#333d49` y `papel-linea` `#b9c6d6`.
- **Márgenes:** 20 mm arriba, a la derecha y abajo, y 30 mm a la izquierda, para encuadernar o perforar. La hoja apaisada (`.hoja--apaisada`), 15 mm parejos. Son un punto de partida: **falta confirmar si la universidad tiene una norma propia.** Se cambian en dos lugares de la hoja de estilos (los tokens `--hoja-margen-*` y las reglas `@page`), porque `@page` no acepta variables.
- **En celular** la hoja ocupa el ancho de la pantalla y el texto sigue en 16px. Se lee cómodo, aunque los renglones no corten donde cortan en el papel. La hoja apaisada se ve a tamaño real desde 1220px de ancho.
- **Borrador:** lo dice arriba, con palabras (`.hoja__borrador`: "Borrador: sin validez"). No hay marcas de agua (3.G).
- **Texto real, nunca una imagen:** se puede seleccionar, buscar y leer con lector de pantalla.

## B. Membrete

- **El logo original** (`logo-unpsjb-trelew-completo.svg`): la gaviota con su detalle y el texto curvo con el nombre de la universidad, a 26 mm de alto, el mínimo al que ese logo se lee (nivel L, 10.A). Al lado, la dependencia que emite el documento ("Secretaría Académica", y debajo "Delegación Trelew"). El nombre de la universidad ya lo dice el logo, así que no se repite.
- Abajo, una línea `primario` de 2px: la misma que deja la banda al imprimir (6.G).
- Va en la primera hoja. Las siguientes llevan el número de página.

## C. El texto

- **Serif, 12 pt, interlineado 1,5, alineado a la izquierda.** No se justifica: sin cortar palabras, el texto justificado deja ríos de blanco y se lee peor.
- **Lugar y fecha** arriba a la derecha (`.documento__dato`), con la fecha en texto: "Trelew, 2 de octubre de 2026".
- **Título centrado** (`.documento__titulo`), con mayúscula solo inicial: "Constancia de alumna regular".
- **Trato formal** (sección 12): tercera persona o usted. La herramienta que rodea a la hoja sigue hablando de vos.
- **Las fórmulas de una resolución** (Visto, Considerando, Resuelve, Artículo 1.º) van en mayúsculas, porque así las escribe la norma: es la única mayúscula sostenida del sistema. En el HTML se escriben con mayúscula inicial y las mayúsculas las pone la clase `.documento__formula`, para que el lector de pantalla no las deletree.

## D. Firmas

- Hasta tres en un renglón (`.firmas`). Cada una: 22 mm para firmar y sellar, una línea, el nombre y el cargo.
- **Firma digital** (`.firma--digital`): no hay línea. Un recuadro con el nombre, el cargo y "Firmado digitalmente el 02/10/2026 a las 10:32 h". Se dice con palabras, no con el dibujo de un sello.
- **Una firma nunca queda sola en una hoja:** si no entra, se lleva con ella el final del texto.

## E. Pie de verificación y QR

- Al pie de la hoja (`.verificacion`): dónde se comprueba que el documento es auténtico. **La dirección y el código van escritos**; el QR es un atajo a esa misma dirección.
- El QR mide 20 mm: es el mínimo para escanear en papel con comodidad. Lleva `alt=""`, porque lo que dice ya está en el texto.
- Todo QR del sistema se genera con `herramientas/qr/generar.sh <dirección> <archivo.svg>`: negro sobre blanco, con su margen de 4 módulos y corrección de errores media. La dirección, lo más corta posible: cuanto más corta, más grandes los cuadraditos.
- **En espera:** la pieza está diseñada pero no se usa hasta que exista el servicio que verifica un documento. Los ejemplos de `muestra-documentos.html` la tienen apagada; la dirección de los ejemplos (`verificar.tw.unp.edu.ar`) no existe.

## F. Certificado

- Hoja apaisada con todo centrado (`.certificado`): es el único documento que se centra, como el login entre las pantallas.
- El nombre de la persona en 28 pt; el tipo de certificado en 22 pt.
- Sin marcos, orlas ni fondos (3.G). Lo que lo hace solemne es la hoja, el membrete y el espacio.

## G. Planilla para firmar

- Una tabla común con `.tabla--planilla`: renglones de 10 mm y todas las celdas con borde, para que se vea dónde escribir a mano.
- La cabecera se repite en cada hoja y las filas no se cortan (6.G).

## H. Al imprimir

- **Sale solo la hoja.** En una página que tiene una `.hoja`, al imprimir se esconde todo lo demás: banda, botones, pie. No hay que marcar nada con `.no-imprimir`.
- **El tamaño y la orientación los pone la hoja** (reglas `@page` con nombre): quien imprime no tiene que elegir "apaisado". Chrome, Edge y Firefox lo respetan; en Safari hay que elegir la orientación a mano.
- **Numeración** (`.hoja--numerada`): "Página 2 de 3", abajo a la derecha, para documentos de más de una hoja. Hoy lo dibujan Chrome y Edge; en los demás navegadores la hoja sale sin número.
- **A una tinta** (`.hoja--una-tinta`): el logo cambia por su versión en negro (10.A) y todo lo que era azul pasa a negro.
- **Cortes:** `.salto-pagina` empieza una hoja nueva y `.sin-cortes` evita que un bloque se parta. Sirven en cualquier página, no solo dentro de una hoja.
- **PDF:** el mismo camino. "Imprimir o guardar como PDF" abre la impresión del navegador. Si una herramienta necesita generar el PDF en el servidor, usa esta misma hoja con un navegador sin ventana.
