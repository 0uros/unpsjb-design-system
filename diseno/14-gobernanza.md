# 14. Gobernanza: quién decide y cómo se versiona

Un sistema de diseño sin dueño se desarma: cada herramienta agrega "solo un color más" y al año hay tres azules. Esta sección dice quién decide qué, sin volverlo un trámite.

## A. Modelo

- **Hoy: centralizado.** Soporte Informático de la Delegación Trelew es el **núcleo**: mantiene `DESIGN.md`, `unpsjb.css`, `muestra.html` y los assets, y es el único que publica versiones.
- **Si otras sedes lo adoptan** (Comodoro Rivadavia, Esquel, Puerto Madryn): **núcleo común + extensiones.** Todas usan el mismo `unpsjb.css`; si una sede necesita algo propio, lo agrega en un archivo aparte (`unpsjb-madryn.css`) que **solo** cambia tokens puntuales, nunca componentes. Lo que sirva para todas, se sube al núcleo.

## B. Quién hace qué (matriz RACI)

| Tarea | Núcleo (Soporte Trelew) | Quien hace una herramienta | Comunicación / marca | Autoridad de la sede |
|---|---|---|---|---|
| Agregar o cambiar un token | **A** · R | C | I | I |
| Agregar un componente | **A** · R | R si lo propone · C | I | I |
| Cambiar el logo o sus versiones | R | I | **A** | I |
| Publicar una versión | **A** · R | I | I | I |

**R** hace el trabajo · **A** aprueba (hay una sola por fila) · **C** se le consulta antes · **I** se le avisa después.

- Quien hace una herramienta y necesita algo que no existe, **primero pregunta** (C). Si lo resuelve con estilos sueltos, es deuda: se anota y se lleva al núcleo en la próxima versión.
- Pendiente: definir quién cumple el rol de "Comunicación / marca" en la UNPSJB.

## C. Versiones

`unpsjb.css` y este documento llevan **el mismo número de versión**, con el formato `MAYOR.MENOR.ARREGLO`:

| Cambia… | Cuándo | Ejemplo |
|---|---|---|
| **ARREGLO** (1.0.**1**) | Se corrige algo sin cambiar cómo se usa. | Un contraste, un espaciado mal puesto. |
| **MENOR** (1.**1**.0) | Se agrega algo; lo anterior sigue funcionando igual. | Un componente nuevo, un token nuevo. |
| **MAYOR** (**2**.0.0) | Hay que tocar el HTML de las herramientas para actualizar. | Una clase que cambia de nombre o de estructura. |

**Hoy el primer número es 0**, y eso quiere decir "todavía no se publicó: puede cambiar sin aviso".

- **Mientras sea 0:** el número del medio sube con cada borrador de diseño, aunque obligue a tocar el HTML. El último sube con arreglos y agregados chicos.
- **La 1.0.0** es la primera que se publique en el servidor de recursos y use una herramienta real. Desde ahí rige la tabla de arriba, porque recién entonces alguien depende de que nada se rompa.
- Lo que haya que renombrar o eliminar (por ejemplo, unificar el idioma de los nombres de las clases) conviene hacerlo **antes** de la 1.0.0.

- **Registro de cambios:** `CHANGELOG.md`, con las secciones Nuevo, Cambiado, Obsoleto, Eliminado y Corregido, y para cada cambio mayor, **cómo migrar**.
- **Obsoleto antes que eliminado:** lo que se va a quitar se marca como **obsoleto** (en el CSS con un comentario `@deprecated` y en el registro), sigue funcionando al menos una versión y se elimina recién en la siguiente versión mayor. Ejemplo: `.banda__nav` se marcó obsoleta antes de quitarse.
- **Dónde vive:** `unpsjb.css` en `https://recursos.tw.unp.edu.ar/css/unpsjb.css` (la versión actual) y `…/css/unpsjb-1.0.0.css` (fija, con el número de cada versión publicada, para herramientas que no pueden actualizar enseguida). `muestra.html` publicada en el mismo servidor, como referencia viva.

## D. Cómo saber si se usa

Tres números, que se miran una vez por cuatrimestre:

1. **Herramientas que cargan `unpsjb.css`** sobre el total de herramientas de la Delegación.
2. **Estilos sueltos:** colores hex o tamaños en px escritos a mano en el código de las herramientas (se buscan con `grep`). Cuantos menos, mejor.
3. **Tiempo para armar una pantalla nueva** con el sistema, comparado con el de antes.

## E. Estilos propios de una herramienta

A veces una herramienta necesita algo que el sistema no tiene (un control de cámara, una grilla especial). Para que eso no se vuelva deuda escondida:

- Va en una hoja o un bloque `<style>` **de la herramienta**, nunca en `unpsjb.css`.
- Todas sus clases llevan el prefijo **`.ext-<herramienta>-`**: `.ext-camaras-muro`, `.ext-eventos-mapa`. Así se encuentran con una búsqueda.
- Usan los tokens del sistema (`var(--color-linea)`, `var(--espacio-4)`), no colores ni medidas sueltas.
- En el atributo `style` solo van **variables del sistema** que un componente espera (`style="--grilla-min: 200px"`, `style="--valor: 0.4"`). Nunca colores ni tamaños.
- Se anota en el registro de la herramienta. Si dos herramientas necesitan lo mismo, pasa al núcleo en la versión siguiente.

`muestra.html` hace lo mismo: sus fichas usan clases `.ext-muestra-…`.

## F. Fichas de componentes y reportes

- **Cada componente tiene su ficha** en `muestra.html`, al final de su sección, con cuatro partes: **cuándo usarlo**, **cuándo no** (y qué va en su lugar), **accesibilidad** y un **ejemplo de código**. Un componente nuevo no entra al sistema sin su ficha.
- **Reportes** (los del botón "Reportar un problema", 6.C):
  - "Algo no funciona" y "Me cuesta usarlo o leerlo" se corrigen en la versión de arreglo siguiente. Los de accesibilidad, primero.
  - Las sugerencias se anotan. Lo que piden dos o más herramientas entra en la próxima versión menor.
  - A quien reportó se le contesta, aunque sea para decir que no se va a hacer.

## G. Revisión de diseño de una pantalla

Antes de las pruebas con personas (9) y antes de publicar una pantalla nueva o un cambio grande. La lista "Antes de publicar" dice si una pantalla es accesible; esta dice si cumple este documento y si se entiende.

1. **Capturas, no el código.** Celular (390px), tablet (768px) y escritorio (1280px), en claro y en oscuro. **Con datos como los reales:** nombres largos, listas vacías y llenas, el peor caso. Con datos de ejemplo cortos todo entra: en el plano, recién con los datos de la sede apareció que 12 de 31 rótulos quedaban sin nombre.
2. **Cinco segundos por captura.** ¿Se sabe qué herramienta es y dónde se está (la banda y el marcador naranja)? ¿Cuál es la acción principal? Si hay que buscarla, ya es un hallazgo.
3. **Contra el documento.** Se recorre la tabla de la sección 13 y las reglas de los componentes que aparecen en la pantalla.
4. **Cada hallazgo, con su nivel:**

| Nivel | Qué es | Cuándo se arregla |
|---|---|---|
| **Bloquea** | No se puede terminar la tarea, o falla WCAG 2.2 AA. | Antes de publicar, sin excepción. |
| **Importante** | Confunde, o va contra una regla de este documento. | Antes de publicar. Si no se llega, se anota con fecha. |
| **Detalle** | Se nota, pero no traba a nadie. | En la próxima versión de arreglo. |
| **Gusto** | Una preferencia, sin regla que la respalde. | Se anota y no se discute de nuevo. Si se repite en varias revisiones, se propone como regla (14.B). |

5. **Se anota en la bitácora de la herramienta:** la captura, el nivel, la regla que toca (con su número de sección) y el arreglo en una frase. Cada arreglo se comprueba con una captura nueva, en los mismos tamaños.
