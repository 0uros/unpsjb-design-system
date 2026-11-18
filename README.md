# unpsjb-design-system
Sistema de diseño web de la UNPSJB, Delegación Trelew. Las reglas están en `DESIGN.md` (tokens y secciones 1 a 13) y en `diseno/` (secciones 14 a 21, una por archivo); qué cambió en cada versión, en `CHANGELOG.md`.

| Carpeta | Qué tiene |
|---|---|
| `sistema/` | Lo que se publica en el servidor de recursos y lo que copia cada herramienta: `unpsjb.css`, los módulos (`unpsjb-*.css` y `.js`), `fonts/` y `assets/` |
| `muestras/` | Las páginas de ejemplo. `muestra.html` es la general; cada módulo tiene la suya |
| `diseno/` | Las secciones 14 a 21 de `DESIGN.md`: gobernanza, gráficos, agenda y cámaras, páginas públicas, documentos, mesa de ayuda, cartelera y planos |
| `herramientas/` | Lo que genera el logo, la fuente de emojis, los códigos QR y el skill. Se corren desde la raíz del proyecto |
| `notas/` | El marco de trabajo, la tabla de renombres, las devoluciones y el estudio de referencias |
| `skill/` | `DESIGN.md` y `diseno/` armados como skill. No se editan a mano: `bash herramientas/skill/armar.sh` |

`BITACORA.md` lleva el registro del trabajo, sesión por sesión.
