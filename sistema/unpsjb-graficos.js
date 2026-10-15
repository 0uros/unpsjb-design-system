/* ==========================================================================
   unpsjb-graficos.js — Módulo de gráficos · v0.4.5
   Sistema de Diseño Digital UNPSJB (MII 2.0). Reglas: DESIGN.md, sección 15.

   Dibuja un gráfico A PARTIR DE UNA TABLA. Los datos se escriben una sola vez,
   en la tabla; el gráfico se arma solo. Sin JavaScript queda la tabla.

     <figure class="grafico panel">
       <figcaption class="grafico__cabecera"><h3 class="grafico__titulo">Solicitudes por mes</h3></figcaption>
       <div class="tabla-marco" tabindex="0" role="region" aria-label="Solicitudes por mes y sede">
         <table class="tabla tabla--compacta" data-grafico="lineas"
                data-descripcion="Solicitudes por mes: Trelew sube de 310 a 412…">
           <thead><tr><th scope="col">Mes</th><th scope="col" class="num">Trelew</th>…</tr></thead>
           <tbody><tr><th scope="row">Abril</th><td class="num">310</td>…</tr>…</tbody>
         </table>
       </div>
       <p class="grafico__nota">Abril a septiembre de 2026.</p>
     </figure>

   Tres gráficos, según lo que haya que mostrar (data-grafico):
   - "lineas": algo que cambia en el tiempo. Primera columna, el momento.
   - "barras": cantidades de cosas para comparar. Primera columna, la cosa.
     Horizontales; con data-orientacion="vertical", columnas (en pantallas
     angostas vuelven a ser horizontales).
   - "torta": partes de un total. Una sola columna de valores, hasta 5 partes
     más "Otros" (si hay más filas, las que sobran se suman en "Otros").

   Qué lee de la tabla
   - Primera columna: el nombre de cada fila. Las demás: una serie cada una,
     hasta 5. Los colores se asignan en orden (serie-1, serie-2…); para fijar el
     color de una serie, la clase va en su encabezado: <th class="num serie-3">.
   - data-descripcion: lo que dice el gráfico, en una oración. Es lo que lee el
     lector de pantalla. Obligatorio.
   - data-unidad (opcional): lo que acompaña a cada valor, por ejemplo "%".
   - data-desde-cero="no" (opcional, solo líneas): el eje no arranca en cero.
     Solo cuando el cero no significa nada (una temperatura, un índice). Las
     barras arrancan siempre en cero.
   - data-alto (opcional, líneas y columnas): alto del gráfico en px. 260 por defecto.

   Qué agrega a la página
   - El selector "Gráfico | Tabla" en la cabecera de la figura.
   - El gráfico (.dibujo), con su lectura o su leyenda. En líneas y columnas, con
     el mouse o el dedo se elige un momento; con el teclado, con las flechas.

   También se puede llamar a mano, después de cambiar los datos de la tabla:
     unpsjbGraficos.dibujar(tabla)
   ========================================================================== */
(function () {
  'use strict';
  const SVG = 'http://www.w3.org/2000/svg';
  const MAX_SERIES = 5;
  const ANCHO_PAPEL = 640;      // al imprimir, los gráficos se trazan a este ancho
  let cuenta = 0;

  const crear = (nombre, atributos, padre) => {
    const e = document.createElementNS(SVG, nombre);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (padre) padre.append(e);
    return e;
  };
  const html = (nombre, clase, texto) => {
    const e = document.createElement(nombre);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  };

  // "1.250" → 1250 · "98,5 %" → 98.5 · "" → null (formato argentino)
  const leerNumero = texto => {
    const limpio = texto.replace(/\./g, '').replace(',', '.').replace(/[^\d.\-−]/g, '').replace('−', '-');
    return limpio === '' || isNaN(limpio) ? null : Number(limpio);
  };

  // Marcas del eje en números redondos: 0, 100, 200… (nunca 0, 87, 174…)
  const marcas = (minimo, maximo, cuantas) => {
    const rango = (maximo - minimo) || 1;
    const bruto = rango / cuantas;
    const potencia = Math.pow(10, Math.floor(Math.log10(bruto)));
    const paso = [1, 2, 2.5, 5, 10].map(m => m * potencia).find(p => Math.ceil(rango / p) <= cuantas + 1);
    const desde = Math.floor(minimo / paso) * paso;
    const lista = [];
    for (let v = desde; v < maximo + paso * 0.999; v += paso) lista.push(Number(v.toFixed(10)));
    return lista;
  };
  // Las marcas del eje llevan decimales solo si alguna los necesita (100, no 100,0)
  const formatoEje = eje => new Intl.NumberFormat('es-AR', { minimumFractionDigits: eje.some(v => v % 1 !== 0) ? 1 : 0, maximumFractionDigits: 1 });

  function leerTabla(tabla) {
    const encabezados = [...tabla.tHead.rows[0].cells];
    const series = encabezados.slice(1, 1 + MAX_SERIES).map((th, i) => {
      const fijada = [...th.classList].find(c => /^serie-(\d|otros)$/.test(c));
      return { nombre: th.textContent.trim(), clase: fijada || 'serie-' + (i + 1), valores: [] };
    });
    const momentos = [];
    for (const fila of tabla.tBodies[0].rows) {
      momentos.push(fila.cells[0].textContent.trim());
      series.forEach((s, i) => s.valores.push(fila.cells[i + 1] ? leerNumero(fila.cells[i + 1].textContent) : null));
    }
    return { columna: encabezados[0].textContent.trim(), momentos, series };
  }

  // Una barra: recta en la base (el cero) y con 4px de radio en la punta.
  // hacia: 'arriba' o 'abajo' (columnas), 'derecha' o 'izquierda' (barras)
  const barra = (x, y, ancho, alto, hacia) => {
    const vertical = hacia === 'arriba' || hacia === 'abajo';
    const r = Math.min(4, vertical ? alto : ancho, (vertical ? ancho : alto) / 2);
    switch (hacia) {
      case 'arriba': return `M${x} ${y + alto}V${y + r}a${r} ${r} 0 0 1 ${r} ${-r}H${x + ancho - r}a${r} ${r} 0 0 1 ${r} ${r}V${y + alto}Z`;
      case 'abajo': return `M${x} ${y}V${y + alto - r}a${r} ${r} 0 0 0 ${r} ${r}H${x + ancho - r}a${r} ${r} 0 0 0 ${r} ${-r}V${y}Z`;
      case 'izquierda': return `M${x + ancho} ${y}H${x + r}a${r} ${r} 0 0 0 ${-r} ${r}V${y + alto - r}a${r} ${r} 0 0 0 ${r} ${r}H${x + ancho}Z`;
      default: return `M${x} ${y}H${x + ancho - r}a${r} ${r} 0 0 1 ${r} ${r}V${y + alto - r}a${r} ${r} 0 0 1 ${-r} ${r}H${x}Z`;
    }
  };

  /* ------------------------------------------------------------------------
     Líneas y columnas comparten casi todo: un eje de valores a la izquierda,
     los nombres abajo, la lectura arriba y un momento elegido que se recorre.
     ------------------------------------------------------------------------ */
  function conEjes(c, columnas) {
    const { tabla, datos, n, todos, formato, escribir, caja, svg, medir } = c;

    // Lectura: el momento elegido y el valor de cada serie. Es también la leyenda.
    const lectura = html('div', 'dibujo__lectura');
    const momento = html('p', 'dibujo__momento');
    const leyenda = html('ul', 'leyenda');
    const valoresLeyenda = datos.series.map(s => {
      const li = html('li', s.clase);
      const b = html('b');
      li.append(s.nombre + ' ', b);
      leyenda.append(li);
      return b;
    });
    lectura.append(momento, leyenda);
    c.lienzo.before(lectura);

    // Con teclado: un control de rango, como la línea de tiempo del visor de cámaras
    const rango = html('input', 'dibujo__recorrer');
    Object.assign(rango, { type: 'range', min: 0, max: n - 1, step: 1, value: n - 1 });
    rango.setAttribute('aria-label', 'Recorrer el gráfico por ' + datos.columna.toLowerCase());
    c.lienzo.append(rango);

    let elegido = n - 1, activo = false, geo = null;

    function trazar(ancho) {
      const alto = Number(tabla.dataset.alto) || (ancho < 480 ? 220 : 260);
      const desdeCero = columnas || tabla.dataset.desdeCero !== 'no';      // las barras arrancan siempre en cero
      // Desde cero, el cero entra siempre en el eje: también si todo es negativo
      const minimo = desdeCero ? Math.min(0, ...todos) : Math.min(...todos);
      const maximo = desdeCero ? Math.max(0, ...todos) : Math.max(...todos);
      const eje = marcas(minimo, maximo, 4);
      const y0 = eje[0], y1 = eje[eje.length - 1];
      const enEje = formatoEje(eje);

      const ultimos = datos.series.map(s => s.valores[n - 1]);
      const izq = Math.ceil(Math.max(...eje.map(v => medir(enEje.format(v))))) + 10;
      const der = columnas ? 4 : Math.ceil(Math.max(...ultimos.map(v => v == null ? 0 : medir(escribir(v), true)))) + 16;
      // Columnas con negativos: el valor va debajo de la punta, y necesita lugar abajo
      const conValores = columnas && datos.series.length === 1;
      const arriba = columnas ? 22 : 12, abajo = 30 + (conValores && minimo < 0 ? 16 : 0);
      const pw = ancho - izq - der, ph = alto - arriba - abajo;
      const banda = pw / n;                                                  // columnas: el lugar de cada grupo
      const x = i => columnas ? izq + banda * (i + 0.5) : izq + (n === 1 ? pw / 2 : i * pw / (n - 1));
      const y = v => arriba + ph - (v - y0) / (y1 - y0) * ph;
      geo = { izq, pw, x, banda };

      svg.replaceChildren();
      svg.setAttribute('viewBox', '0 0 ' + ancho + ' ' + alto);
      svg.setAttribute('width', ancho);
      svg.setAttribute('height', alto);

      // Columnas: la franja del grupo elegido, por detrás de todo
      if (columnas) crear('rect', { class: 'dibujo__franja', y: arriba, height: ph, width: Math.max(0, banda - 4) }, svg);

      // Grilla y eje: líneas finas y continuas. En líneas el eje es la base; en
      // columnas, el cero (con negativos queda en el medio o arriba).
      eje.forEach(v => {
        const yy = Math.round(y(v)) + 0.5;
        crear('line', { class: (columnas ? v === 0 : v === y0) ? 'dibujo__eje' : 'dibujo__grilla', x1: izq, x2: izq + pw, y1: yy, y2: yy }, svg);
        crear('text', { class: 'dibujo__marca', x: izq - 8, y: yy + 4, 'text-anchor': 'end' }, svg).textContent = enEje.format(v);
      });

      // Nombres del eje de abajo: si no entran todos, uno cada tantos, siempre con el último
      const lugar = columnas ? banda : (n === 1 ? pw : pw / (n - 1));
      const paso = Math.max(1, Math.ceil((Math.max(...datos.momentos.map(m => medir(m))) + 16) / lugar));
      datos.momentos.forEach((m, i) => {
        if ((n - 1 - i) % paso) return;
        const ancla = !columnas && i === n - 1 && der < medir(m) / 2 ? 'end' : 'middle';
        crear('text', { class: 'dibujo__marca', x: x(i), y: alto - 8, 'text-anchor': ancla }, svg).textContent = m;
      });

      if (columnas) {
        // Columnas: de hasta 24px de ancho, separadas por 2px, con la punta redondeada
        const k = datos.series.length;
        const grosor = Math.max(3, Math.min(24, Math.floor((banda - 12 - (k - 1) * 2) / k)));
        const grupo = k * grosor + (k - 1) * 2;
        datos.series.forEach((s, j) => s.valores.forEach((v, i) => {
          if (v == null) return;
          const bx = x(i) - grupo / 2 + j * (grosor + 2), tope = Math.min(y(v), y(0)), base = Math.max(y(v), y(0));
          crear('path', { class: 'dibujo__barra ' + s.clase, 'data-i': i, d: barra(bx, tope, grosor, Math.max(1, base - tope), v < 0 ? 'abajo' : 'arriba') }, svg);
          // Con una sola serie, el valor va escrito en la punta de cada columna si
          // entra: arriba si es positivo, abajo si es negativo
          if (conValores && medir(escribir(v), true) <= banda - 4) {
            crear('text', { class: 'dibujo__valor', x: x(i), y: v < 0 ? base + 15 : tope - 6, 'text-anchor': 'middle' }, svg).textContent = escribir(v);
          }
        }));
      } else {
        // La guía vertical del momento elegido (solo se ve mientras se recorre)
        crear('line', { class: 'dibujo__guia', y1: arriba, y2: arriba + ph }, svg);
        // Líneas: tramos rectos entre los datos. Donde falta un dato, la línea se corta.
        const conPuntos = n === 1 || pw / (n - 1) >= 20;
        datos.series.forEach(s => {
          let d = '', pluma = false;
          s.valores.forEach((v, i) => {
            if (v == null) { pluma = false; return; }
            d += (pluma ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
            pluma = true;
          });
          crear('path', { class: 'dibujo__linea ' + s.clase, d }, svg);
        });
        // Puntos: encima de todas las líneas, con su aro del color del fondo
        datos.series.forEach(s => s.valores.forEach((v, i) => {
          if (v == null) return;
          const fijo = conPuntos || i === n - 1;
          crear('circle', { class: 'dibujo__punto ' + s.clase + (fijo ? '' : ' dibujo__punto--suelto'), 'data-i': i, cx: x(i).toFixed(1), cy: y(v).toFixed(1), r: 5 }, svg);
        }));
        // El último valor de cada serie, escrito en la punta. Si dos quedan
        // encimados se separan; si hay que correrlos mucho, no se escriben (el
        // valor ya está en la lectura de arriba).
        const puntas = ultimos.map(v => ({ v, y: v == null ? null : y(v) })).filter(p => p.v != null).sort((a, b) => a.y - b.y);
        puntas.forEach(p => { p.lugar = p.y; });
        for (let i = 1; i < puntas.length; i++) puntas[i].lugar = Math.max(puntas[i].lugar, puntas[i - 1].lugar + 15);
        const exceso = puntas.length ? puntas[puntas.length - 1].lugar - (arriba + ph) : 0;
        if (exceso > 0) {
          puntas[puntas.length - 1].lugar -= exceso;
          for (let i = puntas.length - 2; i >= 0; i--) puntas[i].lugar = Math.min(puntas[i].lugar, puntas[i + 1].lugar - 15);
        }
        if (puntas.every(p => Math.abs(p.lugar - p.y) <= 14)) {
          puntas.forEach(p => {
            crear('text', { class: 'dibujo__valor', x: x(n - 1) + 10, y: p.lugar + 4.5 }, svg).textContent = escribir(p.v);
          });
        }
      }
      pintar();
    }

    function pintar() {
      momento.textContent = datos.momentos[elegido];
      datos.series.forEach((s, k) => { valoresLeyenda[k].textContent = escribir(s.valores[elegido]); });
      rango.value = elegido;
      rango.setAttribute('aria-valuetext', datos.momentos[elegido] + ': ' + datos.series.map(s => s.nombre + ' ' + escribir(s.valores[elegido])).join(', '));
      if (!geo) return;
      caja.classList.toggle('dibujo--recorriendo', activo);
      const guia = svg.querySelector('.dibujo__guia'), franja = svg.querySelector('.dibujo__franja');
      if (guia) { const gx = Math.round(geo.x(elegido)) + 0.5; guia.setAttribute('x1', gx); guia.setAttribute('x2', gx); }
      if (franja) franja.setAttribute('x', geo.x(elegido) - geo.banda / 2 + 2);
      svg.querySelectorAll('.dibujo__punto').forEach(p => p.classList.toggle('dibujo__punto--elegido', activo && Number(p.dataset.i) === elegido));
    }

    const elegir = (i, recorriendo) => { elegido = Math.max(0, Math.min(n - 1, i)); activo = recorriendo; pintar(); };
    const alMover = e => {
      if (!geo) return;
      const px = e.clientX - svg.getBoundingClientRect().left;
      elegir(columnas ? Math.floor((px - geo.izq) / geo.banda) : Math.round((px - geo.izq) / (geo.pw / Math.max(1, n - 1))), true);
    };
    svg.addEventListener('pointermove', alMover);
    svg.addEventListener('pointerdown', alMover);
    // Al sacar el mouse vuelve al último dato. Con el dedo no: lo tocado queda elegido.
    svg.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch' && document.activeElement !== rango) elegir(n - 1, false); });
    rango.addEventListener('input', () => elegir(Number(rango.value), true));
    rango.addEventListener('focus', () => elegir(elegido, true));
    rango.addEventListener('blur', () => elegir(n - 1, false));
    return trazar;
  }

  /* ------------------------------------------------------------------------
     Barras horizontales: los nombres a la izquierda (pueden ser largos) y el
     valor escrito en la punta de cada barra. No hay nada que recorrer: todo
     está a la vista. Con dos series o más, la leyenda va arriba.
     ------------------------------------------------------------------------ */
  function barrasHorizontales(c) {
    const { datos, n, todos, escribir, svg, medir } = c;
    const k = datos.series.length;
    if (k > 1) {
      const leyenda = html('ul', 'leyenda');
      datos.series.forEach(s => leyenda.append(html('li', s.clase, s.nombre)));
      const lectura = html('div', 'dibujo__lectura');
      lectura.append(leyenda);
      c.lienzo.before(lectura);
    }
    return function trazar(ancho) {
      const GROSOR = 16, grupo = k * GROSOR + (k - 1) * 2, paso = grupo + 14;
      // El cero entra siempre en el eje: también si todo es negativo
      const eje = marcas(Math.min(0, ...todos), Math.max(0, ...todos), ancho < 480 ? 3 : 4);
      const x0 = eje[0], x1 = eje[eje.length - 1];
      const enEje = formatoEje(eje);
      // Los nombres ocupan lo que necesitan, hasta el 42 % del ancho; lo que no entra se corta con "…"
      const tope = Math.floor(ancho * 0.42);
      const izq = Math.min(tope, Math.ceil(Math.max(...datos.momentos.map(m => medir(m))))) + 10;
      // El valor va en la punta: a la derecha de las positivas y a la izquierda de las negativas
      const lugarValores = lista => lista.length ? Math.ceil(Math.max(...lista.map(v => medir(escribir(v), true)))) + 12 : 6;
      const negativos = lugarValores(todos.filter(v => v < 0)) - 6;
      // A la derecha, al menos media marca del eje: el último número va centrado en el borde
      const der = Math.max(lugarValores(todos.filter(v => v >= 0)), Math.ceil(medir(enEje.format(x1)) / 2) + 2);
      const arriba = 4, abajo = 26;
      const pw = ancho - izq - negativos - der, alto = arriba + n * paso + abajo;
      const x = v => izq + negativos + (v - x0) / (x1 - x0) * pw;

      svg.replaceChildren();
      svg.setAttribute('viewBox', '0 0 ' + ancho + ' ' + alto);
      svg.setAttribute('width', ancho);
      svg.setAttribute('height', alto);

      eje.forEach(v => {
        const xx = Math.round(x(v)) + 0.5;
        crear('line', { class: v === 0 ? 'dibujo__eje' : 'dibujo__grilla', x1: xx, x2: xx, y1: arriba, y2: alto - abajo }, svg);
        crear('text', { class: 'dibujo__marca', x: xx, y: alto - 8, 'text-anchor': 'middle' }, svg).textContent = enEje.format(v);
      });
      datos.momentos.forEach((m, i) => {
        const cy = arriba + i * paso + 7;
        let texto = m;
        while (texto.length > 3 && medir(texto) > izq - 10) texto = texto.slice(0, -2).trimEnd() + '…';
        const t = crear('text', { class: 'dibujo__nombre', x: izq - 10, y: cy + grupo / 2 + 4.5, 'text-anchor': 'end' }, svg);
        t.textContent = texto;
        if (texto !== m) crear('title', {}, t).textContent = m;
        datos.series.forEach((s, j) => {
          const v = s.valores[i];
          if (v == null) return;
          const by = cy + j * (GROSOR + 2), desde = Math.min(x(0), x(v)), largo = Math.max(1, Math.abs(x(v) - x(0)));
          crear('path', { class: 'dibujo__barra ' + s.clase, d: barra(desde, by, largo, GROSOR, v < 0 ? 'izquierda' : 'derecha') }, svg);
          crear('text', v < 0
            ? { class: 'dibujo__valor', x: desde - 6, y: by + GROSOR / 2 + 4.5, 'text-anchor': 'end' }
            : { class: 'dibujo__valor', x: desde + largo + 6, y: by + GROSOR / 2 + 4.5 }, svg).textContent = escribir(v);
        });
      });
    };
  }

  /* ------------------------------------------------------------------------
     Torta: partes de un total. Hasta 5 partes más "Otros". No lleva textos
     encima: al lado va la lista con el nombre, el valor y el porcentaje de
     cada parte, en el mismo orden que el dibujo (desde arriba, en el sentido
     del reloj).
     ------------------------------------------------------------------------ */
  function torta(c) {
    const { datos, escribir, svg, tabla } = c;
    const serie = datos.series[0];
    // "Otros" va una sola vez y al final: junta las filas que se llaman así en la
    // tabla y, si quedan más de 5 partes, las que sobran
    const esOtros = p => /^otr[oa]s\b/i.test(p.nombre);
    let partes = datos.momentos.map((nombre, i) => ({ nombre, valor: serie.valores[i] })).filter(p => p.valor > 0);
    let resto = partes.filter(esOtros);
    partes = partes.filter(p => !esOtros(p));
    if (partes.length + (resto.length ? 1 : 0) > MAX_SERIES + 1) {
      resto = resto.concat(partes.slice(MAX_SERIES));
      partes = partes.slice(0, MAX_SERIES);
    }
    if (resto.length) {
      const nombre = resto.length === 1 ? resto[0].nombre : resto.some(esOtros) ? 'Otros' : 'Otros (' + resto.length + ')';
      partes.push({ nombre, valor: resto.reduce((t, p) => t + p.valor, 0), otros: true });
    }
    const total = partes.reduce((t, p) => t + p.valor, 0);
    let color = 0;
    partes.forEach(p => { p.clase = p.otros ? 'serie-otros' : 'serie-' + (++color); });
    // Porcentajes enteros que suman 100: se reparte lo que sobra del redondeo entre los que más perdieron
    partes.forEach(p => { p.exacto = p.valor / total * 100; p.pct = Math.floor(p.exacto); });
    [...partes].sort((a, b) => (b.exacto - b.pct) - (a.exacto - a.pct)).slice(0, 100 - partes.reduce((t, p) => t + p.pct, 0)).forEach(p => { p.pct++; });

    const yaEsPorcentaje = (tabla.dataset.unidad || '').trim() === '%';
    const leyenda = html('ul', 'leyenda leyenda--columna');
    partes.forEach(p => {
      const li = html('li', p.clase);
      li.append(html('span', 'leyenda__nombre', p.nombre), html('b', null, escribir(p.valor)));
      // Una parte que se ve en el dibujo nunca dice "0 %", y si hay otras, ninguna dice "100 %"
      const pct = p.pct === 0 ? '<1' : p.pct === 100 && partes.length > 1 ? '>99' : p.pct;
      li.append(html('span', 'leyenda__dato', yaEsPorcentaje ? '' : pct + '\u00a0%'));     // siempre, para que la grilla no se corra
      leyenda.append(li);
    });
    c.lienzo.after(leyenda);

    return function trazar(ancho) {
      const lado = Math.round(Math.max(150, Math.min(220, ancho * 0.42)));
      const r = lado / 2 - 1, cx = lado / 2, cy = lado / 2;
      svg.replaceChildren();
      svg.setAttribute('viewBox', '0 0 ' + lado + ' ' + lado);
      svg.setAttribute('width', lado);
      svg.setAttribute('height', lado);
      let angulo = -Math.PI / 2;
      partes.forEach(p => {
        const giro = p.valor / total * Math.PI * 2;
        if (partes.length === 1) { crear('circle', { class: 'dibujo__porcion ' + p.clase, cx, cy, r }, svg); return; }
        const x1 = cx + r * Math.cos(angulo), y1 = cy + r * Math.sin(angulo);
        const x2 = cx + r * Math.cos(angulo + giro), y2 = cy + r * Math.sin(angulo + giro);
        crear('path', { class: 'dibujo__porcion ' + p.clase, d: `M${cx} ${cy}L${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${giro > Math.PI ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}Z` }, svg);
        angulo += giro;
      });
    };
  }

  /* ------------------------------------------------------------------------
     Lo común a los tres: leer la tabla, armar la caja y el selector, y volver
     a trazar cuando cambia el ancho o se imprime.
     ------------------------------------------------------------------------ */
  function dibujar(tabla) {
    const tipo = tabla.dataset.grafico;
    const figura = tabla.closest('.grafico') || tabla.parentElement;
    const marco = tabla.closest('.tabla-marco') || tabla;
    const datos = leerTabla(tabla);
    const n = datos.momentos.length;
    const todos = datos.series.flatMap(s => s.valores).filter(v => v != null);
    // Sin nada que dibujar queda la tabla, también si antes había un gráfico
    const sinGrafico = () => {
      figura.querySelector('.dibujo')?.remove();
      figura.querySelector('.dibujo-selector')?.remove();
      marco.hidden = false;
    };
    if (!n || !datos.series.length || !todos.length) return sinGrafico();
    if (tipo === 'lineas' && n < 2) return sinGrafico();       // con un solo dato no hay línea
    if (tipo === 'torta' && !datos.series[0].valores.some(v => v > 0)) return sinGrafico();   // todo en cero

    const unidad = tabla.dataset.unidad ? ' ' + tabla.dataset.unidad : '';
    const decimales = todos.some(v => v % 1 !== 0) ? 1 : 0;
    const formato = new Intl.NumberFormat('es-AR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
    const escribir = v => v == null ? 'sin dato' : formato.format(v) + unidad;

    // Si ya estaba dibujado (se llamó de nuevo con datos nuevos), se rehace
    let caja = figura.querySelector('.dibujo');
    if (caja) caja.replaceChildren(); else { caja = html('div'); marco.before(caja); }
    caja.className = 'dibujo dibujo--' + tipo;
    const id = caja.id || (caja.id = 'dibujo-' + (++cuenta));
    const lienzo = html('div', 'dibujo__lienzo');
    const svg = crear('svg', { role: 'img', 'aria-label': tabla.dataset.descripcion || figura.querySelector('.grafico__titulo')?.textContent || 'Gráfico' });
    lienzo.append(svg);
    caja.append(lienzo);

    const medir = (() => {
      const lapiz = document.createElement('canvas').getContext('2d');
      return (texto, negrita) => {
        lapiz.font = (negrita ? '700' : '400') + ' 13px ' + getComputedStyle(caja).fontFamily;
        return lapiz.measureText(texto).width;
      };
    })();
    const c = { tabla, figura, datos, n, todos, formato, escribir, caja, lienzo, svg, medir };
    // La torta va al lado de su leyenda: su ancho disponible es el de la caja, no el del dibujo
    const medido = tipo === 'torta' ? caja : lienzo;

    // Columnas en una pantalla angosta: pasan a barras horizontales (15.C)
    const vertical = tipo === 'barras' && tabla.dataset.orientacion === 'vertical';
    let trazador = null, comoColumnas = null;
    const preparar = ancho => {
      if (tipo === 'torta') return trazador || (trazador = torta(c));
      if (tipo === 'lineas') return trazador || (trazador = conEjes(c, false));
      const columnas = vertical && ancho >= 480;
      if (columnas !== comoColumnas) {
        caja.replaceChildren(lienzo); lienzo.replaceChildren(svg);
        const limpio = svg.cloneNode(false); svg.replaceWith(limpio); c.svg = limpio;     // sin los eventos del trazador anterior
        trazador = columnas ? conEjes(c, true) : barrasHorizontales(c);
        comoColumnas = columnas;
      }
      return trazador;
    };
    // anchoPapel: al imprimir se traza a un ancho fijo, para que la letra salga a su tamaño
    const trazar = anchoPapel => {
      const ancho = typeof anchoPapel === 'number' ? anchoPapel : Math.max(240, Math.floor(medido.clientWidth));
      preparar(ancho)(ancho);
    };

    // Selector "Gráfico | Tabla": se agrega una sola vez por figura
    let selector = figura.querySelector('.dibujo-selector');
    if (!selector) {
      selector = html('fieldset', 'segmentado segmentado--compacto dibujo-selector');
      const titulo = figura.querySelector('.grafico__titulo');
      selector.append(html('legend', 'solo-lector', 'Ver ' + (titulo ? titulo.textContent.trim() : 'los datos') + ' como'));
      [['grafico', 'Gráfico'], ['tabla', 'Tabla']].forEach(([valor, texto]) => {
        const etiqueta = html('label');
        const radio = html('input');
        Object.assign(radio, { type: 'radio', name: 'vista-' + id, value: valor, checked: valor === 'grafico' });
        radio.addEventListener('change', () => { caja.hidden = valor !== 'grafico'; marco.hidden = valor === 'grafico'; if (valor === 'grafico') trazar(); });
        etiqueta.append(radio, ' ' + texto);
        selector.append(etiqueta);
      });
      (figura.querySelector('.grafico__cabecera') || figura).append(selector);
    }
    const comoTabla = selector.querySelector('input[value="tabla"]').checked;
    caja.hidden = comoTabla;
    marco.hidden = !comoTabla;

    // Se vuelve a trazar cuando cambia el ancho (el texto no se achica: se redibuja)
    if (caja._observador) caja._observador.disconnect();
    let pendiente = 0, anchoPrevio = 0;
    caja._observador = new ResizeObserver(() => {
      if (medido.clientWidth === anchoPrevio || caja.hidden) return;
      anchoPrevio = medido.clientWidth;
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => trazar());
    });
    caja._observador.observe(medido);
    if (!caja.hidden) { anchoPrevio = medido.clientWidth; trazar(); }
    caja._trazar = trazar;
    // El ancho del texto se mide con la fuente real: cuando termina de cargar, se rehace
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => { if (!caja.hidden) trazar(); });
  }

  // Al imprimir, cada gráfico se vuelve a trazar al ancho de la hoja (y después, al de la pantalla)
  const retrazar = ancho => document.querySelectorAll('.dibujo').forEach(c => { if (!c.hidden && c._trazar) c._trazar(ancho); });
  window.addEventListener('beforeprint', () => retrazar(ANCHO_PAPEL));
  window.addEventListener('afterprint', () => retrazar());

  const iniciar = () => document.querySelectorAll('table[data-grafico]').forEach(t => { if (['lineas', 'barras', 'torta'].includes(t.dataset.grafico)) dibujar(t); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.unpsjbGraficos = { dibujar };
})();
