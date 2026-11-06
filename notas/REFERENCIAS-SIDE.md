# Estudio de referencia: el sitio de la SIDE

Hecho el 2026-11-03. Se miraron dos páginas de **side.gob.ar**, el sitio de la Secretaría de Inteligencia de Estado: la portada (`/`) y la de carreras (`/carreras`). Está hecho con Tailwind. Se miró en Chrome a 1568 px de ancho. No se guardaron capturas: son de terceros.

A Agustín le gustaron las dos páginas para el diseño de una universidad. Por eso se estudiaron, aunque no sean de una universidad.

**Estado al 2026-11-03: aplicado en la rama `portada-publica`, sin número de versión.** Pasó a `DESIGN.md` (3.G, 4.B, 6.C, 7.C, 10.A, 13, 17.B, 17.C y la sección nueva 17.E), a `unpsjb.css` y a la portada de `muestra-portal.html`.

> Como en el estudio de la UNC y la UBA, lo que se toma es estructura. Los colores, las letras y las reglas de texto siguen siendo las del sistema.

## Qué tiene

**Portada**, de arriba abajo:

1. Una cabecera negra con el logo, cinco secciones y dos botones grises ("Reportar información", "Contacto").
2. Una frase grande sobre una foto ("Defendemos los intereses de la República Argentina"), en Lora 60 px, en mayúsculas. La foto pesa 134 KB (`home-hero.webp`) y ocupa casi toda la ventana (799 px de 871).
3. La misión, con el sello grande a la izquierda y el texto a la derecha.
4. Cuatro tarjetas con foto (Institucional, Comunicaciones, Escuela, Carreras), con título y una línea.
5. "Últimas novedades": tres tarjetas con foto y un botón "Ver más".
6. Una franja gris oscura con un solo llamado ("Canal de información" y el botón "Reportar información") y el sello como marca de agua detrás.
7. Una sección mitad foto, mitad texto.
8. Un pie negro con el logo, una frase, el menú repetido, las redes y "Subir".

**Carreras:** foto de apertura con el título ("Trabajá con nosotros") y un botón blanco; requisitos en mitad foto y mitad texto; el proceso de ingreso en cuatro pasos numerados; seis perfiles en paneles de dos columnas, con borde y sin ícono. Las secciones alternan el fondo (blanco, crema `#f0ede8`, crema `#e8e5e1`) y cada título lleva debajo una línea bordó de 2 px (`#8f1918`).

## Medidas

| Qué | Valor |
|---|---|
| Peso de la portada | 1,7 MB. Lo más pesado es el logo, un SVG de 260 KB. |
| Foto de apertura | `home-hero.webp`, 134 KB. En carreras, `auditorio_ingreso_carreras.webp`, 952×1080. |
| Capa sobre la foto | Negro al 40%. Sobre una parte clara de la foto, el texto blanco da 2,85:1. |
| Títulos | Lora, 60 px en la apertura y 36 px en las secciones, en mayúsculas, con letras separadas. |
| Texto | Montserrat, 16 px, **justificado**. |
| Enlaces del pie | 11 px, en mayúsculas, con letras separadas 2,2 px, blanco al 60%. |
| Botones de la cabecera | 12 px, blanco sobre `#747475` (4,6:1). |
| Marca de agua | El sello, a muy baja opacidad, detrás de "Proceso de ingreso" y del "Canal de información". |

## Qué se tomó y qué no

| Qué | Qué se hizo |
|---|---|
| El orden de la portada | Igual, con las entradas antes que la presentación (17.E). |
| La foto de apertura | Permitida en páginas públicas, con una capa al 55% y sin tapar toda la ventana. Antes estaba prohibida. |
| Las secciones que alternan el fondo | Franjas en `fondo`, `panel` y `capa`. |
| La línea bajo los títulos | El título con filete, en azul. |
| La marca de agua | Permitida en la franja oscura y en el pie oscuro, al 8% como máximo. Antes estaba prohibida. |
| La misión con el sello grande | La presentación, con el escudo. |
| Las tarjetas y las novedades con foto | Entradas y novedades con foto. Cada tarjeta es un solo enlace. |
| La franja oscura con un llamado | La franja oscura, una por página. |
| Mitad foto, mitad texto | Las mitades, con el contacto. |
| El pie oscuro | El pie oscuro, con las redes escritas con su nombre. |
| Títulos en mayúsculas, serif y centrados | No: mayúscula solo inicial, Montserrat y alineados a la izquierda. |
| Texto justificado | No. |
| Enlaces del pie a 11 px | No: 14 px como mínimo. |
| Los pasos numerados y los perfiles de carreras | Quedan para una página de carrera, cuando haya una de verdad. |

## Por qué se levantaron las dos prohibiciones

- **"Sin foto de apertura" (17.C)** salió del estudio de la UNC y la UBA. Lo que se había medido ahí era el peso (22 MB y 14,5 MB, casi todo fotos sin achicar y un video) y el carrusel. Una sola foto con los topes de 2.C no tiene ninguno de los dos problemas.
- **"Sin marcas de agua" (3.G)** venía del primer borrador (`notas/FRAMEWORK.md`) y nunca se había medido. Al 8%, el texto más claro del sistema (`tinta-2`) da 4,9:1 o más sobre cualquier fondo de la paleta.
