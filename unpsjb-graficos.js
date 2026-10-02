/* ==========================================================================
   unpsjb-graficos.js — Módulo de gráficos de líneas · v0.4.3
   Sistema de Diseño Digital UNPSJB (MII 2.0). Reglas: DESIGN.md, sección 15.

   Dibuja un gráfico de líneas A PARTIR DE UNA TABLA. Los datos se escriben una
   sola vez, en la tabla; el gráfico se arma solo. Sin JavaScript queda la tabla.

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

   Qué lee de la tabla
   - Primera columna: el momento (mes, día, año). Las demás: una serie cada una,
     hasta 5. Los colores se asignan en orden (serie-1, serie-2…); para fijar el
     color de una serie, la clase va en su encabezado: <th class="num serie-3">.
   - data-descripcion: lo que dice el gráfico, en una oración. Es lo que lee el
     lector de pantalla. Obligatorio.
   - data-unidad (opcional): lo que acompaña a cada valor, por ejemplo "%".
   - data-desde-cero="no" (opcional): el eje no arranca en cero. Solo cuando el
     cero no significa nada (una temperatura, un índice).
   - data-alto (opcional): alto del gráfico en px. 260 por defecto.

   Qué agrega a la página
   - El selector "Gráfico | Tabla" en la cabecera de la figura.
   - El gráfico, con la lectura arriba: el momento elegido y el valor de cada serie.
     Con el mouse o el dedo se elige un momento; con el teclado, con las flechas.

   También se puede llamar a mano, después de cambiar los datos de la tabla:
     unpsjbGraficos.dibujar(tabla)
   ========================================================================== */
(function () {
  'use strict';
  const SVG = 'http://www.w3.org/2000/svg';
  const MAX_SERIES = 5;
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

  function dibujar(tabla) {
    const figura = tabla.closest('.grafico') || tabla.parentElement;
    const marco = tabla.closest('.tabla-marco') || tabla;
    const datos = leerTabla(tabla);
    const n = datos.momentos.length;
    if (n < 2 || !datos.series.length) return;   // con un solo dato no hay línea: queda la tabla

    const unidad = tabla.dataset.unidad ? ' ' + tabla.dataset.unidad : '';
    const todos = datos.series.flatMap(s => s.valores).filter(v => v != null);
    const decimales = todos.some(v => v % 1 !== 0) ? 1 : 0;
    const formato = new Intl.NumberFormat('es-AR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
    const escribir = v => v == null ? 'sin dato' : formato.format(v) + unidad;

    // Si ya estaba dibujado (se llamó de nuevo con datos nuevos), se rehace
    let caja = figura.querySelector('.lineas');
    if (caja) caja.replaceChildren(); else { caja = html('div', 'lineas'); marco.before(caja); }
    const id = caja.id || (caja.id = 'lineas-' + (++cuenta));

    // Lectura: el momento elegido y el valor de cada serie. Es también la leyenda.
    const lectura = html('div', 'lineas__lectura');
    const momento = html('p', 'lineas__momento');
    const leyenda = html('ul', 'leyenda');
    const valoresLeyenda = datos.series.map(s => {
      const li = html('li', s.clase);
      const b = html('b');
      li.append(s.nombre + ' ', b);
      leyenda.append(li);
      return b;
    });
    lectura.append(momento, leyenda);

    const lienzo = html('div', 'lineas__lienzo');
    const svg = crear('svg', { role: 'img', 'aria-label': tabla.dataset.descripcion || figura.querySelector('.grafico__titulo')?.textContent || 'Gráfico de líneas' });
    // Con teclado: un control de rango, como la línea de tiempo del visor de cámaras
    const rango = html('input', 'lineas__recorrer');
    Object.assign(rango, { type: 'range', min: 0, max: n - 1, step: 1, value: n - 1 });
    rango.setAttribute('aria-label', 'Recorrer el gráfico por ' + datos.columna.toLowerCase());
    lienzo.append(svg, rango);
    caja.append(lectura, lienzo);

    let elegido = n - 1, activo = false, geo = null;

    const medir = (() => {
      const lapiz = document.createElement('canvas').getContext('2d');
      return (texto, negrita) => {
        const e = getComputedStyle(caja);
        lapiz.font = (negrita ? '700' : '400') + ' 13px ' + e.fontFamily;
        return lapiz.measureText(texto).width;
      };
    })();

    // anchoPapel: al imprimir se traza a un ancho fijo, para que la letra salga a su tamaño
    function trazar(anchoPapel) {
      const ancho = typeof anchoPapel === 'number' ? anchoPapel : Math.max(240, Math.floor(lienzo.clientWidth));
      const alto = Number(tabla.dataset.alto) || (ancho < 480 ? 220 : 260);
      const desdeCero = tabla.dataset.desdeCero !== 'no';
      const minimo = desdeCero ? Math.min(0, ...todos) : Math.min(...todos);
      const eje = marcas(minimo, Math.max(...todos), 4);
      const y0 = eje[0], y1 = eje[eje.length - 1];
      // Las marcas del eje llevan decimales solo si alguna los necesita (100, no 100,0)
      const enEje = new Intl.NumberFormat('es-AR', { minimumFractionDigits: eje.some(v => v % 1 !== 0) ? 1 : 0, maximumFractionDigits: 1 });

      const ultimos = datos.series.map(s => s.valores[n - 1]);
      const izq = Math.ceil(Math.max(...eje.map(v => medir(enEje.format(v))))) + 10;
      const der = Math.ceil(Math.max(...ultimos.map(v => v == null ? 0 : medir(escribir(v), true)))) + 16;
      const arriba = 12, abajo = 30;
      const pw = ancho - izq - der, ph = alto - arriba - abajo;
      const x = i => izq + (n === 1 ? pw / 2 : i * pw / (n - 1));
      const y = v => arriba + ph - (v - y0) / (y1 - y0) * ph;
      geo = { izq, pw, x };

      svg.replaceChildren();
      svg.setAttribute('viewBox', '0 0 ' + ancho + ' ' + alto);
      svg.setAttribute('width', ancho);
      svg.setAttribute('height', alto);

      // Grilla y eje: líneas finas y continuas. La base (el cero) es el eje.
      eje.forEach(v => {
        const yy = Math.round(y(v)) + 0.5;
        crear('line', { class: v === y0 ? 'lineas__eje' : 'lineas__grilla', x1: izq, x2: izq + pw, y1: yy, y2: yy }, svg);
        crear('text', { class: 'lineas__marca', x: izq - 8, y: yy + 4, 'text-anchor': 'end' }, svg).textContent = enEje.format(v);
      });

      // Nombres del eje de abajo: si no entran todos, uno cada tantos, siempre con el último
      const paso = n === 1 ? 1 : Math.max(1, Math.ceil((Math.max(...datos.momentos.map(m => medir(m))) + 16) / (pw / (n - 1))));
      datos.momentos.forEach((m, i) => {
        if ((n - 1 - i) % paso) return;
        const ancla = i === n - 1 && der < medir(m) / 2 ? 'end' : 'middle';
        crear('text', { class: 'lineas__marca', x: x(i), y: alto - 8, 'text-anchor': ancla }, svg).textContent = m;
      });

      // La guía vertical del momento elegido (solo se ve mientras se recorre)
      crear('line', { class: 'lineas__guia', y1: arriba, y2: arriba + ph }, svg);

      // Líneas: tramos rectos entre los datos. Donde falta un dato, la línea se corta.
      const conPuntos = pw / (n - 1) >= 20;
      datos.series.forEach(s => {
        let d = '', pluma = false;
        s.valores.forEach((v, i) => {
          if (v == null) { pluma = false; return; }
          d += (pluma ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
          pluma = true;
        });
        crear('path', { class: 'lineas__linea ' + s.clase, d }, svg);
      });
      // Puntos: encima de todas las líneas, con su aro del color del fondo
      datos.series.forEach((s, k) => s.valores.forEach((v, i) => {
        if (v == null) return;
        const fijo = conPuntos || i === n - 1;
        crear('circle', { class: 'lineas__punto ' + s.clase + (fijo ? '' : ' lineas__punto--suelto'), 'data-i': i, cx: x(i).toFixed(1), cy: y(v).toFixed(1), r: 5 }, svg);
      }));

      // El último valor de cada serie, escrito en la punta. Si dos quedan
      // encimados se separan; si hay que correrlos mucho, no se escriben (el
      // valor ya está en la lectura de arriba).
      const puntas = ultimos.map((v, k) => ({ k, v, y: v == null ? null : y(v) })).filter(p => p.v != null).sort((a, b) => a.y - b.y);
      puntas.forEach(p => { p.lugar = p.y; });
      for (let i = 1; i < puntas.length; i++) puntas[i].lugar = Math.max(puntas[i].lugar, puntas[i - 1].lugar + 15);
      const exceso = puntas.length ? puntas[puntas.length - 1].lugar - (arriba + ph) : 0;
      if (exceso > 0) {
        puntas[puntas.length - 1].lugar -= exceso;
        for (let i = puntas.length - 2; i >= 0; i--) puntas[i].lugar = Math.min(puntas[i].lugar, puntas[i + 1].lugar - 15);
      }
      if (puntas.every(p => Math.abs(p.lugar - p.y) <= 14)) {
        puntas.forEach(p => {
          crear('text', { class: 'lineas__valor', x: x(n - 1) + 10, y: p.lugar + 4.5 }, svg).textContent = escribir(p.v);
        });
      }
      pintar();
    }

    function pintar() {
      momento.textContent = datos.momentos[elegido];
      datos.series.forEach((s, k) => { valoresLeyenda[k].textContent = escribir(s.valores[elegido]); });
      rango.value = elegido;
      rango.setAttribute('aria-valuetext', datos.momentos[elegido] + ': ' + datos.series.map(s => s.nombre + ' ' + escribir(s.valores[elegido])).join(', '));
      const guia = svg.querySelector('.lineas__guia');
      if (!guia || !geo) return;
      const gx = Math.round(geo.x(elegido)) + 0.5;
      guia.setAttribute('x1', gx); guia.setAttribute('x2', gx);
      caja.classList.toggle('lineas--recorriendo', activo);
      svg.querySelectorAll('.lineas__punto').forEach(p => p.classList.toggle('lineas__punto--elegido', activo && Number(p.dataset.i) === elegido));
    }

    const elegir = (i, recorriendo) => { elegido = Math.max(0, Math.min(n - 1, i)); activo = recorriendo; pintar(); };
    const alMover = e => {
      if (!geo) return;
      const px = e.clientX - svg.getBoundingClientRect().left;
      elegir(Math.round((px - geo.izq) / (geo.pw / (n - 1))), true);
    };
    svg.addEventListener('pointermove', alMover);
    svg.addEventListener('pointerdown', alMover);
    // Al sacar el mouse vuelve al último dato. Con el dedo no: lo tocado queda elegido.
    svg.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch' && document.activeElement !== rango) elegir(n - 1, false); });
    rango.addEventListener('input', () => elegir(Number(rango.value), true));
    rango.addEventListener('focus', () => elegir(elegido, true));
    rango.addEventListener('blur', () => elegir(n - 1, false));

    // Selector "Gráfico | Tabla": se agrega una sola vez por figura
    let selector = figura.querySelector('.lineas-selector');
    if (!selector) {
      selector = html('fieldset', 'segmentado segmentado--compacto lineas-selector');
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
      if (lienzo.clientWidth === anchoPrevio || caja.hidden) return;
      anchoPrevio = lienzo.clientWidth;
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => trazar());
    });
    caja._observador.observe(lienzo);
    if (!caja.hidden) { anchoPrevio = lienzo.clientWidth; trazar(); }
    caja._trazar = trazar;
    // El ancho del texto se mide con la fuente real: cuando termina de cargar, se rehace
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => { if (!caja.hidden) trazar(); });
  }

  // Al imprimir, cada gráfico se vuelve a trazar al ancho de la hoja (y después, al de la pantalla)
  const ANCHO_PAPEL = 640;
  const retrazar = ancho => document.querySelectorAll('.lineas').forEach(c => { if (!c.hidden && c._trazar) c._trazar(ancho); });
  window.addEventListener('beforeprint', () => retrazar(ANCHO_PAPEL));
  window.addEventListener('afterprint', () => retrazar());

  const iniciar = () => document.querySelectorAll('table[data-grafico="lineas"]').forEach(dibujar);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.unpsjbGraficos = { dibujar };
})();
