# Estudio de referencia: National Design Studio, retire.opm.gov y beUI

Hecho el 2026-10-21. La pregunta era si vale la pena sumar al sistema cosas como **ndstudio.gov** (el National Design Studio, la oficina de diseño de la Casa Blanca) y **beui.dev** (una biblioteca de componentes animados), y si las "métricas de diseño" del National Design Studio se habían tenido en cuenta.

- **No se habían tenido en cuenta.** Ninguno de los dos aparecía en el repositorio ni en los cuadernos de Gemini Notebook (el del sistema de diseño, con 99 fuentes, y el de planos, con 59).
- **Qué se hizo:** se midieron cinco páginas con `medir.js`, el mismo método que en `REFERENCIAS-UNC-UBA.md`: tres de **retire.opm.gov** (ORA, el trámite de jubilación que hizo el National Design Studio) y dos de **ndstudio.gov**. Se sumaron seis fuentes al cuaderno del sistema de diseño (que ahora tiene 105) y se le hizo una consulta, la "Pregunta 9".
- **No se cambió nada del diseño.** `DESIGN.md`, `unpsjb.css` y las muestras quedaron como estaban. Esto es para decidir.

> Cómo leer este informe: el National Design Studio **no publica un sistema de diseño ni métricas de diseño** (tipografía, color, espaciado). Lo que publica son **metas de resultado**: horas que la gente pierde, clics, meses de espera. ORA es la referencia más cercana a lo nuestro porque es una herramienta de trámites; ndstudio.gov es una vitrina.

Las marcas son las de `FEEDBACK-NOTEBOOK.md` y `REFERENCIAS-UNC-UBA.md`: **[Ya está]**, **[Nuevo]**, **[Revisar]**, **[Descartar]** y **[Dudoso]**, este último cuando el cuaderno presenta como dato algo que no está en las fuentes.

---

## Resumen: qué hacer

### Lo más importante

De esta referencia sirve **la forma de medir un trámite** y **el patrón "mostrar y verificar"** de ORA. El aspecto no sirve: una foto a pantalla completa con un degradado oscuro encima, una serif de exhibición en los títulos, una fuente paga y una portada de 24 MB. Y beUI se descarta entero.

### Acciones propuestas

| # | Acción | Sección de DESIGN.md | Viene de | Marca |
|---|---|---|---|---|
| 1 | **Medir el trámite, no solo la pantalla.** Hoy las pruebas con personas (9) anotan si la persona terminó la tarea, dónde dudó y qué tan fácil le resultó, y 14.D mide la adopción del sistema. Nada mide si **el trámite** mejoró. Se propone que, antes de rediseñar un trámite, se anoten cinco números y se vuelvan a tomar después: pantallas o pasos; campos que la persona escribe; datos que la universidad ya tenía y se piden igual; minutos que tarda una persona en la prueba; y días hasta que el trámite se resuelve. Van en la bitácora de la herramienta, **sin metas fijas** (ver "Lo que no conviene tomar"). | 9 (pruebas con personas), 14.D | NDS: "90 clics pasan a 9", "de meses a días" | **[Nuevo]** |
| 2 | **"Mostrar y verificar" más allá de la cuenta.** 8.F ya muestra precargado lo que trae el ingreso único (nombre, legajo, correo). ORA va más lejos: trae de los sistemas oficiales los **datos del trámite** (el historial laboral completo) y le pide a la persona que solo los revise. El equivalente nuestro serían datos de SIU-Guaraní o Mapuche (materias aprobadas, antigüedad), si la herramienta puede leerlos. La regla de diseño es chica: una lista de resumen (7.L) que dice de dónde salen los datos ("Según SIU-Guaraní") y qué hacer si hay un error, como ya hace 17.D con los datos de la cuenta. | 8.F, 7.L | ORA ("show but verify") | **[Nuevo]** chico |
| 3 | **Resultado en vivo.** ORA muestra cómo cambia la jubilación mensual mientras la persona elige opciones, antes de enviar. Solo aplica cuando el resultado depende de lo que se elige (por ejemplo, la disponibilidad al reservar un aula). Se anota como patrón posible, sin pieza nueva. | 8 | ORA | **[Revisar]** baja prioridad |
| 4 | **Seguimiento del estado.** ORA permite ver en qué etapa está la solicitud. Ya lo cubren el indicador de pasos, el comprobante y la mesa de ayuda (sección 19). La "línea de tiempo de un trámite" se descartó a propósito (sección 7) y esto no cambia esa decisión. | 7, 19 | ORA | **[Ya está]** |

### Lo que confirma decisiones que ya tomamos

| Decisión nuestra | Qué se vio | Marca |
|---|---|---|
| Páginas de hasta 1 MB y ningún video que arranque solo (2.C). | La portada de ndstudio.gov baja **24 MB, 18 de ellos de video**. La nota de accesibilidad, 3 MB. ORA baja entre 1 y 1,5 MB por página, y **unos 900 kB son JavaScript**, aun en la página de ayuda, que casi no tiene contenido. | **[Ya está]** |
| Sin scroll horizontal a 320px (9, "Antes de publicar"). | La página de opciones de ORA mide **426px en un celular de 390**: la tarjeta queda cortada a la derecha. | **[Ya está]** |
| Colores fijos de la paleta, sin texto con transparencia. | ORA escribe texto en `#1E1E1E` al 50 % y al 70 %. Es justo lo que axe marca como **contraste insuficiente** (5 elementos en la portada). | **[Ya está]** |
| Objetivos de 24px o más (WCAG 2.2, 2.5.8). | ndstudio.gov falla `target-size` en 6 o 7 enlaces del menú, **en la misma página donde explica su política de accesibilidad**. En el celular, además, el menú oculto sigue recibiendo el foco (`aria-hidden-focus`). | **[Ya está]** |
| Enlace "Ir al contenido" y foco siempre visible. | ndstudio.gov lo hace bien: tiene el enlace para saltar y un contorno negro de 2px en todo. ORA no tiene el enlace; en sus enlaces el foco es un contorno de 1px semitransparente, y en los botones depende de un anillo hecho con sombra que no se verificó. | **[Ya está]** |
| Pocos tamaños de letra, por rol (4.B). | ndstudio.gov usa una sola familia en **4 o 5 tamaños** por página y se ve muy ordenado. La portada de ORA usa **14 tamaños** y cuatro familias (Inter, Geist, Geist Mono e Instrument Serif). | **[Ya está]** |
| Serif solo para documentos. | ORA usa una serif de exhibición (Instrument Serif) en los títulos grandes. Es su sello visual, pero contradice 4.A. | **[Ya está]** |

### Lo que no conviene tomar

| Qué | Dónde | Motivo |
|---|---|---|
| Foto a pantalla completa con un degradado oscuro encima y el texto en blanco. | ORA, portada | Contra el principio 1 (plano, sin degradados) y contra el tope de peso. |
| Video de fondo que arranca solo. | ndstudio.gov, portada | 2.C: ningún video arranca solo. 18 MB. |
| Fuente paga (PP Neue Montreal) y serif de exhibición. | ndstudio.gov, ORA | Nuestra identidad es Montserrat y Atkinson, libres y recortadas al español (4.A). |
| Transiciones de 600 ms en los enlaces del menú. | ndstudio.gov | 5.E: el movimiento responde a una acción y dura 120 o 180 ms. |
| **beUI entero.** | beui.dev | Necesita React 19, Tailwind 4 y Motion. Sus componentes se basan en física de resortes, tarjetas que se inclinan con el mouse, desenfoques e "islas" elásticas: es lo contrario de 5.E y del principio 1. Tampoco sirve como fuente de ideas, porque muestra componentes sin explicar por qué se diseñaron así. |
| **Metas numéricas que propuso el cuaderno:** reducir un 50 % los campos, menos de 10 clics por trámite, volver a medir a los 30 días, reportes "tendiendo a cero" en la primera semana. | Respuesta del cuaderno a la Pregunta 9 | **[Dudoso]**: no están en ninguna fuente, las inventó el cuaderno. Una meta fija para trámites tan distintos no se puede cumplir ni verificar. Alcanza con comparar antes y después (acción 1). |

---

## Detalle

### Cómo se midió

- **Páginas públicas:** el mismo programa que para UNC y UBA (`notas/referencias/medir.js`, que ahora acepta una lista de sitios y conserva lo que ya había en `medidas.json`). Chrome sin ventana a **1280, 390 y 320px**. De cada página se tomó una captura entera, los estilos efectivos, el peso de la descarga, **axe 4.10.2** (WCAG 2.0, 2.1 y 2.2 A/AA y buenas prácticas) a 1280 y 390px, y doce pasos de Tab a 1280px.
- **ORA pide iniciar sesión con Login.gov para empezar la solicitud:** se midieron solo las páginas públicas. No se inició ningún trámite.
- **Lo crudo:** `medidas.json` (claves `opm` y `nds`). Las capturas quedaron fuera de git, igual que las de UNC y UBA: están en `notas/referencias/opm/` y `notas/referencias/nds/` de la carpeta local.

Límites: el peso es aproximado (suma lo que declara cada respuesta). No se probó lector de pantalla, ni Firefox ni Safari. Son cinco páginas, no todo el sitio.

### Páginas

| | Dirección | Qué es |
|---|---|---|
| ORA, portada | `retire.opm.gov/portal` | Presentación del trámite, "cómo funciona", estimador de ejemplo y preguntas frecuentes |
| ORA, opciones | `retire.opm.gov/portal/former-federal` | Las tres solicitudes para ex empleados, cada una con su botón |
| ORA, ayuda | `retire.opm.gov/help` | Preguntas frecuentes con menú lateral |
| NDS, portada | `ndstudio.gov/` | Presentación del estudio y sus trabajos |
| NDS, nota | `ndstudio.gov/posts/accessibility-matters` | Su posición sobre accesibilidad |

### Accesibilidad

| | ORA | ndstudio.gov |
|---|---|---|
| Serias | contraste (5 en la portada, 1 en opciones) | blancos de menos de 24px (6 a 7 por página); en el celular, el menú oculto recibe el foco |
| Moderadas | orden de títulos roto (`h4` antes de `h2`), contenido fuera de regiones, la ayuda sin `<main>` | — |
| `lang` | `en` | `en` |
| Enlace para saltar al contenido | **no** | sí |
| Foco visible | contorno de 1px semitransparente en enlaces; en botones, un anillo de sombra sin verificar | contorno negro de 2px en todo |
| Scroll horizontal a 390 y 320px | **sí, en opciones (426px)** | no |
| Imágenes sin texto alternativo | 0 | 0 |

Lectura: ninguno de los dos pasaría nuestra lista de "Antes de publicar" (sección 9), pero los dos están mucho mejor que UNC y UBA (5 a 9 reglas de axe por página): acá fallan 1 a 3. La nota "Accessibility Matters" pide WCAG 2.1 AA en el texto y muestra "WCAG 2.2 AA" en la imagen; nosotros ya declaramos 2.2 AA.

### Peso

| Página | Total | Programa | Imágenes y video |
|---|---|---|---|
| ORA, portada | 1,5 MB (1,2 MB en celular) | 0,9 MB | 0,4 MB |
| ORA, opciones | 1,1 MB | 0,9 MB | 20 kB |
| ORA, ayuda | 1,0 MB | 0,9 MB | 1 kB |
| NDS, portada | **24 MB** | 0,9 MB | 4,5 MB de imágenes y **18 MB de video** |
| NDS, nota | 3 MB | 1,3 MB | 1 MB |

### Tipografía y forma

| | ORA | ndstudio.gov |
|---|---|---|
| Familias | Inter (texto), Instrument Serif (títulos), Geist y Geist Mono (detalles) | PP Neue Montreal (una sola, paga) |
| Tamaños distintos por página | 5 a 14 | 4 o 5 |
| Cuerpo | 16 a 20px; en opciones, **14px** | 16 y 18px |
| Radios | botones en píldora; tarjetas de 8, 10 y 32px | casi ninguno |
| Sombras y degradados | degradados sobre la foto de la portada | ninguno |

### Qué dice el National Design Studio con números

Lo que está en las fuentes, sin inferencias:

| Dato | Dónde |
|---|---|
| La gente pierde más de 10.000 millones de horas por año en trámites del gobierno. | Portada de ndstudio.gov |
| "Noventa clics pasan a ser nueve." | Portada de ndstudio.gov |
| La jubilación en papel tardaba más de seis meses, con pagos parciales mientras tanto. | "How We Automated Federal Retirements" |
| Probaron el cálculo automático con 500 solicitudes ya resueltas: en los casos simples coincidió al centavo con el cálculo oficial. | La misma nota |
| Miles de casos califican para el trámite "instantáneo": datos precargados que la persona confirma sin cambios y sin opciones que compliquen el cálculo. | La misma nota |
| El sistema lo hicieron dos programadores en semanas; preparado para 100.000 solicitudes digitales por año. | La misma nota |
| En cada versión grande de TrumpRx, una consultora hizo pruebas con usuarios. La nota no da resultados con números. | "Accessibility Matters" |

**No hay** métricas de diseño (tipografía, color, espaciado, puntajes de accesibilidad) ni cifras de errores, campos o tiempos después del lanzamiento.

### Consulta al cuaderno (Pregunta 9)

Se sumaron como fuentes las dos notas del National Design Studio, su portada, la orden "Improving Our Nation Through Better Design", la portada de ORA y beui.dev. Se le dio el contexto de la 0.4.5 y lo medido, y se preguntaron cuatro cosas. Resumen con opinión:

1. **Métricas:** separó bien los datos con número (horas, clics, meses a días, cálculo al centavo, volumen) de su inferencia: según el cuaderno, el National Design Studio mide "cuántos casos se resuelven sin intervención" y "cuántos datos se evita pedir". *Opinión:* razonable como lectura, pero es inferencia.
2. **Prácticas de ORA:** recomienda "mostrar y verificar" con datos del SIU y la estimación en vivo; dice que el ingreso único, el seguimiento del estado y las preguntas frecuentes ya los cubrimos. *Opinión:* de acuerdo (acciones 2 a 4). Ojo: lo de precargar "promedio y materias aprobadas" depende de que la herramienta pueda leer SIU-Guaraní, que hoy no es el caso.
3. **beUI:** "debe ser descartado completamente", por el framework, las animaciones y el peso. *Opinión:* de acuerdo.
4. **Regla de medición:** propuso medir antes y 30 días después cuatro cosas: campos manuales, clics, porcentaje de casos resueltos sin intervención y reportes del botón. Las acompañó con metas fijas. *Opinión:* las cuatro medidas sirven y la acción 1 las toma. El porcentaje "sin intervención" solo tiene sentido en trámites que revisa alguien de la oficina. Las metas se descartan (**[Dudoso]**).

---

## Qué falta decidir

1. Si la acción 1 (medir el trámite antes y después) entra en `DESIGN.md`. Es texto en las secciones 9 y 14, sin tocar la hoja de estilos.
2. Si la acción 2 se escribe ya como regla general, o se espera a tener una herramienta que lea datos de SIU.
3. Si vale la pena mirar otro trabajo del National Design Studio que sea un trámite (por ejemplo trumprx.gov o realfood.gov). Son vitrinas, no herramientas, así que es poco probable que sumen algo.
