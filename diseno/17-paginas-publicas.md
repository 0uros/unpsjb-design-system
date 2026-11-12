# 17. Páginas de entrada y públicas

## A. Portal del wifi

Es la pantalla que aparece al conectarse a la red. Antes de aceptar, la red suele bloquear todo lo demás, y se abre en un navegador mínimo del celular. Hay una plantilla lista: `portal-wifi.html`.

- **Un solo archivo.** Los estilos y el escudo van adentro del HTML. No carga `unpsjb.css`, ni fuentes, ni imágenes de afuera. La plantilla pesa 9 KB (4 KB comprimida).
- **Fuentes del sistema** (`system-ui`…). Es el único caso donde no van Montserrat ni Atkinson.
- **Sin JavaScript.** Algunos de esos navegadores lo limitan.
- **Una sola cosa:** qué es, para quién y el botón. Sin menús ni links que saquen de la página.
- **Las condiciones, en dos niveles:** un resumen de 3 o 4 puntos en lenguaje claro ("Antes de conectarte") y el texto completo en un desplegable (`<details>`). Nunca un cuadro con scroll adentro.
- **Aceptación:** una frase y el botón: "Al tocar 'Conectar al wifi' aceptás las condiciones de uso". **Pendiente de confirmar con quien corresponda en lo legal:** si piden una aceptación expresa, se agrega una casilla obligatoria antes del botón (la plantilla marca dónde).
- **Botón de 48px, a todo el ancho.** Dice lo que hace: "Conectar al wifi".
- **Español e inglés,** con un link arriba a la derecha. Funciona sin JavaScript.
- **Modo oscuro** según el sistema. No hay selector: no hay dónde guardar la elección.
- Los valores (colores, radios, tamaños) son los de `unpsjb.css`, copiados a mano: si cambian allá, se actualizan en la plantilla.
- Falta completar, según el equipo que maneje la red: la dirección a la que envía el formulario y sus campos ocultos.

## B. Páginas públicas

Las que ve gente de afuera de la universidad: la agenda de eventos, una inscripción abierta.

- **La misma banda** que las herramientas: es la identidad. No hay un header distinto para lo público.
- **Sin sub-barra** si es una sola página; sin "Mi cuenta" si no hay ingreso.
- **Contenido de lectura:** `.contenedor` con los textos a 70 caracteres por línea, sin densidad compacta.
- **Pueden ir en franjas** a todo el ancho, con foto de apertura y pie oscuro (17.E).
- **Pie de páginas públicas** (6.C), con dirección, contacto y enlaces legales.
- **El logo completo** (nivel L, 10.A) solo donde hay lugar para mostrarlo a 96px o más: una portada, no la banda.
- **Sin siglas internas** sin explicar (sección 12): quien llega de afuera no sabe qué es SIU ni SUDOCU.

## C. Portal de la Delegación

El portal institucional de la universidad lo maneja Comodoro. El de la Delegación es otra cosa: **chico, informativo y de consulta rápida**. Sirve para encontrar en un minuto dónde queda algo, a quién escribirle y por dónde se hace un trámite. No es un diario ni repite lo que ya está en el portal de la universidad: lo enlaza.

Hay un prototipo: `muestra-portal.html`. Las reglas salen del estudio de los sitios de la UNC y la UBA (`REFERENCIAS-UNC-UBA.md`).

- **Vale todo lo de las páginas públicas** (17.B): la misma banda, textos a 70 caracteres, pie de páginas públicas.
- **Abre con las entradas** (`ul.entradas`): de **dos a cuatro** bloques grandes, nombrados por lo que la persona viene a hacer ("Estudiar en Trelew", "Trámites", "Herramientas"), no por el organigrama. Es la idea de las tres entradas del portal de la UNC.
  - Son planos, sin ícono y sin sombra. Pueden llevar foto (`.entradas--foto`, 17.E): todos o ninguno. El **principal** (`.entradas__principal`) va en azul con texto blanco; los demás, en `capa` (o en `panel`, con foto) con texto `tinta`. Junto con la franja oscura (17.E), es la excepción a "la banda es el único bloque grande de color" (13), y solo en páginas públicas.
  - Cada uno lleva el título y una línea que dice qué hay adentro.
  - **El naranja no se usa de relleno** (3.B). Texto blanco sobre celeste o naranja, como en los mosaicos de otros sitios, da 2:1.
  - Con más de cuatro destinos no se suman bloques: va una lista de accesos (7.Q).
- **Avisos antes que noticias.** Lo que cambia el día de alguien ("El lunes no hay clases") va como aviso (8.A), arriba. Las novedades, como una lista corta de título y fecha o, en la portada, hasta tres con foto (`.novedades`, 17.E), con un enlace a "todas". Sin carrusel (7.P).
- **Foto de apertura, si se quiere** (17.E): una sola, con la capa oscura, y sin tapar toda la ventana, así las entradas se ven sin bajar. El peso de las fotos y el carrusel ya lo resuelven los topes de 2.C.
- **El acceso a la cuenta va en la banda,** en todas las páginas (el botón "Mi cuenta"). Es el puente entre informarse y hacer un trámite.
- **Navegación de un solo nivel:** la sub-barra (6.A), con hasta 6 secciones. En el estudio había páginas con tres filas de menú antes del título.
- **Contacto a la vista:** oficina, dirección, horario, teléfono y correo, como lista de resumen (7.L) dentro de un panel. Los teléfonos y correos son enlaces (`tel:`, `mailto:`).
- **Pesa poco:** una página del portal no pasa de 1 MB (2.C).

## D. Página de inicio de una cuenta

Lo primero que ve alguien al ingresar a un portal de cuenta o a una herramienta con varias partes. Responde tres preguntas, en este orden. Es el orden de la página de inicio de MiUNC, con nuestras piezas:

1. **Quién sos.** El título de la pantalla (6.D) saluda con el nombre de pila: "Hola, Rocío". En `titulo-1`, como cualquier otro título: no es más grande ni más fino.
2. **Qué tenés pendiente.** Si falta algo que le puede traer un problema (un correo de recuperación sin confirmar, un turno por vencer), va **un** aviso (8.A) que diga qué falta, para qué sirve y el botón para resolverlo. Si no hay nada pendiente, no va nada: no se inventa un aviso.
3. **A dónde ir.** Una lista de accesos (7.Q) con lo más usado, de 3 a 6 renglones.

- **Los datos de la cuenta** van en otra pantalla: menú lateral (6.A) con las secciones y, a la derecha, una lista de resumen (7.L). Solo llevan "Cambiar" los datos que la persona puede cambiar; de los demás se dice quién los corrige.
- **Avisos de seguridad** ("Nunca te vamos a pedir la contraseña") van como aviso, al lado del dato que protegen. No en letra chica ni en cursiva.
- **No va:** una grilla de tarjetas con ícono (7.C), contadores o gráficos de relleno, ni un saludo con la hora del día.

## E. Piezas de las páginas públicas

Salen del estudio del sitio de la SIDE (`notas/REFERENCIAS-SIDE.md`): una portada que se recorre en franjas, con una foto arriba, un solo llamado fuerte y un pie oscuro. Se toma el orden y las piezas; los colores, las letras y las reglas de texto siguen siendo los del sistema. Hay un ejemplo armado en la portada de `muestra-portal.html`.

Sirven para dos clases de página: la **portada** del portal (17.C) y las **páginas de difusión** (una carrera, el ingreso, una jornada o una convocatoria), que se arman con las mismas piezas. La SIDE es el punto de partida; se pueden sumar piezas de los sitios de otras universidades, siempre que respeten lo de abajo.

**Solo en páginas públicas** (17.B y 17.C). Ninguna de estas piezas va en una herramienta de trabajo.

**La página va a todo el ancho.** No usa `<main class="contenedor">`: cada franja lleva su `.contenedor` adentro, y el pie oscuro cierra `<main>`.

| Pieza | Clase | Reglas |
|---|---|---|
| **Foto de apertura** | `.apertura`, `.apertura__foto`, `.apertura__texto` | Una sola foto, sin carrusel ni video. El título va encima, en `apertura` (40px; 32px en celular), con una línea de texto, como mucho un botón (`.boton--secundario`) y, si hay, el plazo. La capa negra al 55% (`--color-velo-foto`) es fija detrás del texto: con 40%, como en la SIDE, el texto blanco baja a 2,9:1 sobre una zona clara. **Desde 1024px, después del texto la capa se aclara hasta el 15%**: la foto respira donde no hay nada que leer. Si hay fecha límite, va al lado del botón (`.apertura__accion`, `.apertura__plazo`, con el ícono `calendar`): "Inscripción hasta el 18 de diciembre", sin el año si se sobreentiende. Mide la mitad del alto de la ventana, entre 280 y 480px (más, solo si el texto lo pide en un celular angosto), así lo que sigue se ve sin bajar. **Si lo que sigue también lleva foto, la apertura ocupa la primera pantalla** (`.apertura--pantalla`, con el texto al medio): nunca se ven dos fotos a la vez, ni una cortada debajo de la otra. Es el caso de la página de difusión. La foto lleva `alt=""` (el texto ya dice lo importante), `fetchpriority="high"` y dos anchos (2.C). Al imprimir se oculta la foto y el texto pasa a `tinta`. |
| **Franjas** | `.franja`, `--panel`, `--capa`, `--oscura` | Secciones a todo el ancho que separan con el cambio de fondo, sin bordes ni tarjetas. Alternan `fondo`, `panel` y `capa`; dos seguidas no llevan el mismo. La **oscura** (`--color-oscuro`), **una por página**, para el llamado más importante ("Inscripciones 2027"): un título, una o dos líneas y un botón. Adentro valen los tokens del modo oscuro. |
| **Título con filete** | `.titulo-filete` | Una línea de 2px del ancho del título, en `primario-texto`, nunca en naranja. Para los títulos de las franjas. Alineado a la izquierda, como todo (5.F), y con mayúscula solo inicial (4.C). |
| **Marca de agua** | `.marca-agua` | El escudo de un solo color (`marca-agua-unpsjb.svg`, 10.A) detrás del contenido, del lado derecho en escritorio. Toma el color del texto y la opacidad de `--marca-agua-opacidad`: 6%, con un tope de 8%. Solo en una franja con poco texto (la oscura) o en el pie oscuro. Medido en la muestra: el texto encima da 6,7:1 en claro y 5:1 en oscuro. No se imprime ni aparece en alto contraste. |
| **Presentación** | `.presentacion`, `.presentacion__destacado` | Quién es la Sede, con el escudo grande al lado (160px; 200px desde 768px). Va el óvalo solo (`escudo-unpsjb-blanco.svg`), que se ve igual en claro y en oscuro: el logo completo tiene el texto en gris oscuro y desaparece sobre fondo oscuro. La primera línea en negrita y dos o tres oraciones más. |
| **Mitad foto, mitad texto** | `.mitades`, `--invertida` | La foto hasta el borde de la ventana y, al lado, un texto corto: el contacto (7.L) o cómo llegar. En celular, la foto arriba, de 240px. Foto en 3:2, con `loading="lazy"`. |
| **Entradas con foto** | `.entradas--foto` | Las entradas de 17.C con una foto arriba (3:2, `alt=""`), el título en `titulo-3` y una línea. Todas llevan foto, o ninguna. La principal sigue en azul. |
| **Novedades con foto** | `.novedades`, `.novedades__titulo` | De una a tres, cada una con foto (16:9, `alt=""`), título y fecha. Toda la tarjeta es **un solo enlace**: en la UNC la foto y el título eran dos. Debajo, un botón a "Todas las novedades". |
| **Etapas con fecha** | `.etapas`, `.etapas__fecha` | "Cómo se entra": de dos a seis pasos numerados (`<ol>`), cada uno con su fecha (`<time>`), un título y una línea. El número en Montserrat y en `tinta-2`, sin círculos de color; arriba de cada etapa, una línea de 2px. Una columna en celular, dos desde 768px y hasta cuatro desde 1024px. No es el indicador de un formulario (`.pasos`, 8.F). |
| **Aparecer al entrar** | `.aparece` y `unpsjb-aparece.js` | La única animación de entrada del sistema (excepción de 5.E). Una franja entera aparece **una vez** al llegar a la pantalla: de transparente a visible, subiendo 8px, en 240ms con la curva del sistema. Sin escalonar sus partes ni repetir al volver a subir. **La apertura nunca,** ni lo que ya se ve al cargar. El contenido no depende de la animación: lo esconde el script y solo si va a poder mostrarlo. Sin script, sin `IntersectionObserver` o con `prefers-reduced-motion`, la página se ve completa y quieta. Al imprimir, todo visible. |
| **Pie oscuro** | `.pie--oscuro`, `.pie__interior`, `.pie__frase` | El pie público a todo el ancho (6.C), con una frase, el menú repetido, las redes con su nombre y "Subir". |

**Orden de la portada,** como en la muestra: foto de apertura → aviso, si hay (8.A) → entradas → presentación → novedades → franja oscura → mitad foto y mitad texto con el contacto → pie oscuro. Las entradas van antes que la presentación, porque la persona viene a hacer algo.

**Orden de una página de difusión,** como en `muestra-difusion.html`. Su trabajo es que alguien de afuera entienda en un minuto qué se ofrece, se imagine acá y dé un paso:

1. **Foto de apertura a pantalla completa** (`.apertura--pantalla`): el título dice qué es y para quién ("Licenciatura en Sistemas, en Trelew"), una línea con lo esencial (duración, modalidad, si es gratuita), un botón ("Inscribite") y el plazo. Ocupa la primera pantalla porque lo que sigue también lleva foto: la siguiente aparece recién al bajar.
2. **Qué vas a hacer:** una lista de accesos (7.Q) o mitad foto y mitad texto, con lo concreto (materias, salida laboral). Sin íconos de relleno.
3. **En números:** una fila de indicadores (15.B) con cifras verificables, escritas: sin contadores que suben solos.
4. **Cómo se entra:** etapas con fecha.
5. **Franja oscura** con el mismo botón de la apertura, justo después de las etapas: ahí la persona ya sabe qué hacer.
6. **Preguntas frecuentes:** acordeón (7.M), y el pie oscuro. La franja oscura no va al final: pegada al pie oscuro, las dos se ven como un solo bloque.

**Lo único que se mueve es `.aparece`.** Siguen sin ir, también acá: video que arranca solo, nada que se repita en bucle, parallax, texto que se escribe o que rota, efectos de cursor, números que suben solos, fondos animados (shaders, WebGL), librerías de animación, carrusel y ventana al entrar (7.P).

**Lo que no se toma de la SIDE:**

- **Títulos en mayúsculas y en serif.** Van con mayúscula solo inicial (4.C) y en Montserrat.
- **Texto justificado.** Deja huecos entre las palabras y cuesta más con dislexia o baja visión: siempre alineado a la izquierda.
- **Títulos centrados.** Van alineados a la izquierda, como el resto del contenido (5.F).
- **Enlaces del pie a 11px, en mayúsculas, con letras separadas y blanco a medio tono.** Van a 14px como mínimo, con mayúscula solo inicial.
- **Una foto que tapa toda la ventana al entrar** y una capa al 40%.
- **Un logo de 260 KB.** Es casi todo lo que pesa esa portada (1,7 MB). El escudo nuestro pesa 2 KB.
