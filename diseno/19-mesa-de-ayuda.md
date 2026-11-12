## 19. Mesa de ayuda (nuevo en 0.4.3)

Una mesa de ayuda se arma casi entera con lo que ya hay: la bandeja es una tabla con filtros (7.D, 8.I), el pedido es un formulario (8.F) y su confirmación un comprobante (8.G). Lo único que faltaba es el **historial de una solicitud**: los mensajes que van y vienen, los cambios de estado y los adjuntos. Eso es el módulo `unpsjb-mesa-ayuda.css` (ejemplo: `muestra-mesa-ayuda.html`).

### A. La pantalla de una solicitud

- **El título es el asunto,** escrito por quien pidió ("No funciona el proyector del Aula 102"). Arriba, las migas con el número.
- **Debajo del título, un renglón de estado** (`.solicitud__estado`): la insignia, el número, cuándo se abrió y quién la atiende. Es lo que hay que saber antes de leer.
- **Dos columnas desde 1024px** (`.solicitud`): el historial y la respuesta a la izquierda; la ficha (`.solicitud__ficha`, una lista de resumen) a la derecha. En celular la ficha va al final: lo esencial ya está en el renglón de estado.

### B. El historial

- **De lo más viejo a lo más nuevo,** de arriba hacia abajo, y termina en el cuadro para responder. Lo nuevo aparece donde se está escribiendo.
- **Un título por día** (`.hilo__dia`: "Jueves 1 de octubre") y, debajo, la lista de ese día (`ol.hilo`). Dentro del día va solo la hora.
- **Un mensaje es un bloque** (`.hilo__mensaje`): nombre de quien escribe, su rol en una etiqueta ("Solicitante", "Soporte Informático") y la hora a la derecha. Cada mensaje es un `<article>` con ese nombre: con lector de pantalla se salta de uno a otro.
- **Un cambio es un renglón** (`.hilo__evento`): ícono, qué pasó y la hora. "Martín Evans tomó la solicitud. Estado: En curso". Sin recuadro, para que los mensajes, que son lo que se lee, pesen más que los avisos del sistema.
- **Quién habla se dice con palabras.** No hay globos de chat a izquierda y derecha, ni avatares, ni un color por persona: en una solicitud que pasa por tres personas, el color deja de alcanzar y el rol es lo que importa.
- **Nota interna** (`.hilo__mensaje--nota`): la ve solo el equipo que atiende. Fondo `capa`, y arriba un candado con el texto "Nota interna: no la ve quien solicita". El fondo solo no alcanza: un error ahí manda al solicitante algo que no era para él.
- **Adjuntos:** la lista de archivos de siempre (`.archivos`, 8.J), con el nombre como link y el peso.
- **Lo que escribe la persona entra como texto,** nunca como HTML. Los emojis que escriba se ven con Twemoji (10.D).

### C. Estados de una solicitud

Cinco, con las mismas palabras para quien pide y para quien atiende:

| Estado | Insignia | Ícono | Quiere decir |
|---|---|---|---|
| Nueva | neutra | `inbox` | Entró y nadie la tomó todavía |
| En curso | información | `clock` | Alguien la está atendiendo |
| Esperando respuesta | advertencia | `reply` | Falta que conteste quien la pidió |
| Resuelta | éxito | `circle-check` | Soporte la dio por resuelta; se puede reabrir respondiendo |
| Cerrada | neutra | `archive` | Terminó; para seguir hay que abrir otra |

- "Esperando respuesta" es la única en ámbar: es la que le pide algo a una persona.
- **La prioridad no es un estado** y no lleva semáforo. Va escrita, con su motivo ("Alta: hay un parcial el 02/10 a las 14:00 h"), y la ve solo el equipo.
- **El plazo** se muestra en la ficha con fecha y hora. Si se venció, una insignia de error "Vencida".

### D. Responder

- Al final del historial, en un panel (`form.respuesta`): el cuadro de texto con su label ("Tu respuesta"), los adjuntos y los botones.
- **La ayuda dice a quién le llega:** "La recibe Camila Ñancufil por correo y queda en este historial".
- **Quien atiende elige "Respuesta | Nota interna"** con un segmentado. Al elegir nota interna cambian el label, la ayuda, el fondo del cuadro y el botón ("Guardar nota interna"): cuatro señales, porque equivocarse acá es caro.
- **Botones que dicen lo que hacen:** "Enviar respuesta" (primario) y "Enviar y marcar como resuelta" (secundario, solo para quien atiende).
- Al enviar, el mensaje aparece al final del historial y un toast lo confirma: "Respuesta enviada".
- Una solicitud resuelta no se cierra en el momento: queda unos días abierta a una respuesta, que la reabre.
