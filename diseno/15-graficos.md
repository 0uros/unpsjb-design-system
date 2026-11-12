## 15. Gráficos e indicadores (nuevo en 0.4)

### A. Primero: ¿hace falta un gráfico?

| Lo que hay | Va | No va |
|---|---|---|
| Un número (y cómo cambió) | **Indicador** | Un gráfico de una barra |
| Unos pocos números principales | Una fila de indicadores | Barras agrupadas |
| Cantidades de pocas cosas para comparar | **Barras horizontales** | Torta |
| Partes de un total | **Barra apilada** o **torta** (15.G), hasta 6 partes contando "Otros" | Torta de muchas partes |
| Algo que cambia en el tiempo | **Líneas** | Barras apretadas |
| Más de 5 series o más de 7 clases | Una **tabla** | Más colores |

No se usan: tortas de más de 6 partes (desde la 0.4.5; antes el tope era 3), donas, gráficos en 3D, áreas apiladas y **dos ejes en un mismo gráfico** (dos escalas inventan una relación que los datos no tienen; van dos gráficos).

### B. Indicador

Nombre en `detalle`, el valor grande (32px, peso 700, en la misma fuente de texto: no en Montserrat) y, si hay, el cambio contra un período.

- El cambio lleva **ícono + signo + texto**: `trending-up`, "+12 %", "contra septiembre". Nunca solo color.
- El color dice si el cambio **conviene**, no si subió: que bajen los reclamos es bueno (`exito-texto`); que suban, malo (`error-texto`). Si no es ni bueno ni malo, va en `tinta-2`.
- Siempre se dice contra qué se compara.
- Los indicadores van sueltos, en fila. No se encierran cada uno en un panel.

### C. Cómo se dibuja

| Pieza | Medida |
|---|---|
| Barra | 16px de alto (nunca más de 24px). Recta en la base, 4px de radio en la punta. |
| Línea | 2px, con un punto de 8px o más en cada dato. |
| Separación entre partes que se tocan | 2px del color del fondo. Nunca un borde alrededor. |
| Ejes y grilla | Una línea fina y continua (`linea-control` el eje, `linea` la grilla). Nunca punteada. |

- **El valor va escrito**, en la punta de cada barra. En un gráfico de líneas se escribe el último valor de cada serie, no todos.
- **Una serie, un color** (`serie-1`). No se pinta cada barra distinta ni más oscura la más grande: el largo ya lo dice.
- **Dos series o más:** siempre con leyenda (cuadradito + nombre + valor), en el mismo orden que el gráfico.
- **Barras horizontales** cuando los nombres son largos, y siempre en celular.
- Sin tramas de relleno: con el valor escrito y la tabla, no hacen falta.

### D. Todo gráfico tiene su tabla

- El gráfico de barras (`.barras`) **es** una tabla: nombre y valor, dibujada como barras. El lector de pantalla la lee sin nada extra.
- Un selector **"Gráfico | Tabla"** (segmentado) arriba a la derecha la muestra como tabla común.
- Un gráfico que no se puede armar así (líneas, en SVG) lleva `role="img"` con un nombre que dice lo importante, y su tabla al lado o detrás del selector.
- Arriba del gráfico, un título que dice qué muestra; abajo, una nota con el período y el total.
- Los filtros van **una sola vez, arriba de todos los gráficos** que afectan, nunca dentro de cada uno.
- Al imprimir salen con sus colores, sin el selector.

Los colores están en la sección 3.I.

### E. Gráficos de líneas (nuevo en 0.4.3)

Lo que cambia en el tiempo. Necesita un dibujo (SVG), así que va en un módulo: `unpsjb-graficos.css` (8 KB) y `unpsjb-graficos.js` (29 KB; 9 KB comprimido), que desde la 0.4.5 dibujan también barras, columnas y torta (15.F y 15.G). Ejemplo: `muestra-graficos.html`; casos límite: `prueba-graficos.html`.

- **Los datos se escriben una sola vez, en una tabla.** La tabla lleva `data-grafico="lineas"`; el script arma el gráfico y el selector "Gráfico | Tabla". Sin JavaScript queda la tabla. La primera columna es el momento (mes, día, año) y cada una de las demás, una serie.
- **`data-descripcion` es obligatorio:** una oración que dice lo importante ("Trelew sube de 310 a 412"). Es el nombre de la imagen: lo que escucha quien usa lector de pantalla.
- Opcionales: `data-unidad="%"`, `data-alto` (260px por defecto) y `data-desde-cero="no"`.
- **El eje arranca en cero.** Sin el cero, una suba de 2 % parece el doble. La excepción es cuando el cero no significa nada (una temperatura, un índice): ahí va `data-desde-cero="no"` y la nota del gráfico lo dice.
- **Marcas del eje en números redondos** (0, 100, 200), cuatro o cinco. Si los datos son enteros, las marcas también: 0, 5, 10, 15 y no 0; 2,5; 5; 7,5. Los nombres del eje de abajo se saltean si no entran, y el último va siempre.
- **Un punto en cada dato** si hay 20px o más entre uno y otro. Con muchos datos, solo en el último y en el momento elegido: una fila de puntos pegados es una línea más gruesa, no información.
- **La lectura, arriba del gráfico** (`.dibujo__lectura`): el momento elegido y el valor de cada serie con su cuadradito. Es también la leyenda. Sin tocar nada muestra el último momento.
  - Con el mouse o el dedo se elige un momento; una guía vertical lo marca.
  - Con el teclado, `Tab` llega al gráfico y las flechas lo recorren. Es un control de rango, como la línea de tiempo del visor (16.B): el lector de pantalla dice el momento y todos los valores.
  - No hay cartel flotante (7.P): la lectura está siempre en el mismo lugar y no tapa nada.
- **El último valor de cada serie va escrito en la punta,** en `tinta`. Si dos quedan encimados y habría que separarlos mucho, no se escriben: ya están en la lectura.
- **Si falta un dato, la línea se corta.** No se une ni se inventa un valor; en la tabla dice "Sin dato".
- **Color de cada serie:** en orden, de `serie-1` a `serie-5`. Para que una serie conserve su color aunque cambie el orden de las columnas, la clase va en su encabezado: `<th class="num serie-3">`.
- **Sobre qué fondo:** los puntos llevan un aro del color del fondo. Dentro de un panel no hay que hacer nada; si el gráfico va suelto sobre la página, `style="--grafico-fondo: var(--color-fondo)"`.
- **Al imprimir,** un gráfico por renglón y vuelto a trazar al ancho de la hoja, para que la letra salga a su tamaño.
- **Lo que no hace:** áreas rellenas, líneas curvas (suavizar inventa valores entre dato y dato), dos ejes, más de cinco series.
- En una herramienta hecha en React se puede usar el mismo script (después de cambiar los datos de la tabla, `unpsjbGraficos.dibujar(tabla)`) o armar un componente que produzca el mismo SVG con estas clases.

### F. Barras y columnas con el módulo (nuevo en 0.4.5)

Para comparar cantidades de cosas. Se arman igual que las líneas, desde una tabla, con `data-grafico="barras"`. La tabla `.barras` de `unpsjb.css` (15.D) sigue sirviendo para una serie sola sin script; el módulo agrega varias series, columnas y el eje.

- **Barras horizontales** por defecto: los nombres a la izquierda (hasta el 42 % del ancho; lo que no entra se corta con "…" y se lee entero con el mouse encima) y el valor escrito en la punta de cada barra.
- **Columnas** con `data-orientacion="vertical"`, para pocos períodos uno al lado del otro. Con una serie, el valor va arriba de cada columna; con varias, en la lectura de arriba, que se recorre con el mouse, el dedo o las flechas, como en las líneas. **En pantallas de menos de 480px las columnas pasan solas a barras horizontales** (15.C).
- **Varias series:** hasta 5, una barra por serie en cada fila y la leyenda arriba. La sexta columna de la tabla no se dibuja (queda en la tabla).
- **Siempre desde cero,** también con negativos: el cero entra en el eje y es la línea fuerte. Una barra negativa va hacia la izquierda (o hacia abajo) y su valor, en su punta.
- **Si falta un dato,** no hay barra; en la tabla dice "Sin dato". Un cero lleva una barra mínima y "0".
- Opcionales: `data-unidad`, `data-alto` (solo columnas; 260px por defecto).

### G. Torta (nuevo en 0.4.5)

Para las partes de un total, cuando son pocas y lo que importa es cuánto del todo se lleva cada una. `data-grafico="torta"`, con una sola columna de valores.

- **Hasta 6 porciones: 5 de color y una gris.** La gris va al final y junta las filas que se llaman "Otros" en la tabla y las que no entran de color; si es una sola fila, conserva su nombre. En la tabla quedan todas.
- **Empieza arriba y gira en el sentido del reloj,** en el orden de la tabla. Conviene de mayor a menor.
- **Sin textos encima del dibujo.** Al lado (debajo, en pantallas angostas) va la lista con el nombre, el valor y el porcentaje de cada parte, en el mismo orden. Los porcentajes son enteros y suman 100; una parte que se ve nunca dice "0 %" (dice "<1 %"), y si hay otras, ninguna dice "100 %" (dice ">99 %"). Con `data-unidad="%"` los valores ya son porcentajes y no se repiten.
- **Con el mouse o el dedo sobre una porción, se resalta su renglón de la lista** (fondo `tinte` y el nombre en negrita) y las demás porciones se apagan. También al revés: sobre un renglón, se resalta su porción. Es una ayuda para cuando hay varias partes de color parecido; la información ya está toda en la lista.
- **Partes que valen cero no se dibujan.** Si todo vale cero, no hay gráfico: queda la tabla.
- **Lo que no hace:** donas, porciones separadas, 3D, dos tortas para comparar dos totales (van barras con dos series).
