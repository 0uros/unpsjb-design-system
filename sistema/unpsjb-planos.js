/* ==========================================================================
   unpsjb-planos.js — Módulo de planos · v0.4.4
   Sistema de Diseño Digital UNPSJB. Reglas: DESIGN.md, sección 21.

   Muestra las plantas de un edificio con lo que se marca encima: antenas de
   wifi (puntos) y aulas (zonas). Arma la barra, el plano, la lista y el panel
   de detalle a partir de UN archivo de datos.

     <section class="plano" aria-label="Plano de la sede"
              data-plano="datos/planos.json"
              data-ocupacion="datos/ocupacion.json"
              data-agenda="agenda.html?aula={id}">
       <p>Para ver el plano hace falta JavaScript.</p>
     </section>

   Qué lee
   - data-plano: dónde están los datos. Una dirección ("datos/planos.json") o
     "#id" de un <script type="application/json"> de la misma página.
   - data-ocupacion (opcional): igual, con el estado de cada aula.
   - data-agenda (opcional): enlace a la agenda de un aula; {id} se reemplaza.

   Los datos
     { "plantas": [{ "id": "pb", "nombre": "Planta baja", "svg": "planos/pb.svg" }],
       "antenas": [{ "id": "ap-01", "nombre": "AP Hall", "planta": "pb", "x": 412, "y": 301,
                     "estado": "activa", "modelo": "", "nota": "" }],
       "aulas":   [{ "id": "pb-aula-1", "nombre": "Aula 1", "planta": "pb", "capacidad": 60,
                     "puntos": [[120,340],[230,340],[230,400],[120,400]] },
                   { "id": "pb-biblioteca", "nombre": "Biblioteca", "planta": "pb",
                     "tipo": "Biblioteca", "reservable": false, "puntos": [ … ] }] }
   - "svg" es la dirección del dibujo, o "#id" de un <template> con el <svg>.
     El dibujo usa las clases .plano-trazo (herramienta que las pone: la de
     cada proyecto; ver la sección 21).
   - x, y y puntos van en las unidades del viewBox de ese dibujo.
   - estado de una antena: "activa", "sin-conexion" o "mantenimiento".
   - equipo de una antena (opcional): "plato", "exterior" o "router". Es el
     dibujo de su marca en el plano. Los dibujos están en unpsjbPlanos.equipos.
   - "ip" (opcional): se muestra en el detalle y en la lista. Solo para
     herramientas que se ven desde la red interna.
   - "aulas" son todos los espacios con nombre. "tipo" (opcional) dice qué es:
     "Laboratorio", "Oficina"… Sin tipo, es un aula. Con "reservable": false no
     lleva estado. Sin "puntos" figura en la lista pero no en el plano.

   La ocupación
     { "pb-aula-1": { "estado": "ocupada", "hasta": "16:00", "evento": "Álgebra I" },
       "pb-aula-3": { "estado": "libre" } }
   Un aula que no figura queda "Sin dato".

   Para manejarlo desde el código
     const plano = unpsjbPlanos.dibujar(elemento)     // o unpsjbPlanos.de(elemento)
     plano.ocupacion(datos)        cambia los estados de las aulas sin recargar
     plano.elegir('antena', id)    elige (y muestra) una antena o un 'aula'
     plano.pintar()                vuelve a dibujar después de cambiar plano.datos
     plano.aPlano(evento)          el punto del plano [x, y] que se tocó
   Eventos, sobre el elemento: plano:listo, plano:planta, plano:elegir,
   plano:detalle (se rearmó el panel de detalle) y plano:clic (un clic sobre
   el plano; detail.x, detail.y; se puede cancelar).
   ========================================================================== */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const ZOOM_MAX = 12;
  const ICONOS = {
    'wifi': '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
    'wifi-off': '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
    'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'square': '<rect width="18" height="18" x="3" y="3" rx="2"/>',
    'door-closed': '<path d="M10 12h.01"/><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'minus': '<path d="M5 12h14"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'circle-x': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'
  };
  const ESTADOS_ANTENA = {
    'activa': { texto: 'Activa', icono: 'wifi', tono: 'exito', aviso: '' },
    'sin-conexion': { texto: 'Sin conexión', icono: 'wifi-off', tono: 'error', aviso: 'x' },
    'mantenimiento': { texto: 'En mantenimiento', icono: 'wrench', tono: 'advertencia', aviso: 'wrench' }
  };
  // El tipo de equipo de una antena, con su dibujo. No es un estado: dice qué buscar en el techo o en la pared.
  const EQUIPOS = {
    'plato': { texto: 'De plato', ayuda: 'Redonda, en el techo', dibujo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>' },
    'exterior': { texto: 'Exterior', ayuda: 'Rectangular, de bordes redondeados', dibujo: '<rect x="7.5" y="2.5" width="9" height="19" rx="3"/><path d="M12 17.5h.01"/>' },
    'router': { texto: 'Módem o router', ayuda: 'De mesa, con dos antenas', dibujo: '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 13V4"/><path d="M17 13V4"/><path d="M7 16.5h.01"/><path d="M10.5 16.5h.01"/>' }
  };
  // La marca de una antena: el dibujo de su equipo (o el ícono de wifi si no se sabe cuál es) y,
  // si no está activa, un aviso chico en la esquina. El estado no queda solo en el color.
  const marca = (a, e) => (EQUIPOS[a.equipo] ? `<svg class="icono" viewBox="0 0 24 24" aria-hidden="true">${EQUIPOS[a.equipo].dibujo}</svg>` : icono('wifi')) +
    (e.aviso ? `<span class="plano-marca__aviso">${icono(e.aviso)}</span>` : '');
  const dibujoEquipo = clave => EQUIPOS[clave] ? `<svg class="icono plano__dibujo" viewBox="0 0 24 24" aria-hidden="true">${EQUIPOS[clave].dibujo}</svg>` : '';
  const ESTADOS_AULA = {
    'libre': { texto: 'Libre', icono: 'check', tono: 'exito' },
    'ocupada': { texto: 'Ocupada', icono: 'clock', tono: '' },
    '': { texto: 'Sin dato', icono: 'square', tono: '' }
  };

  let cuenta = 0;
  const instancias = new WeakMap();

  const icono = nombre => `<svg class="icono" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[nombre] || ''}</svg>`;
  const limpio = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const entre = (v, min, max) => Math.min(max, Math.max(min, v));
  function crear(etiqueta, clase, html) {
    const e = document.createElement(etiqueta);
    if (clase) e.className = clase;
    if (html != null) e.innerHTML = html;
    return e;
  }
  const insignia = e => `<span class="insignia${e.tono ? ' insignia--' + e.tono : ''}">${icono(e.icono)}${limpio(e.texto)}</span>`;

  // Datos desde una dirección o desde un elemento de la página ("#id")
  function leerJSON(donde) {
    if (!donde) return Promise.resolve(null);
    if (donde[0] === '#') {
      const e = document.getElementById(donde.slice(1));
      return e ? Promise.resolve(JSON.parse(e.textContent)) : Promise.reject(new Error('No existe ' + donde));
    }
    return fetch(donde, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(donde + ': ' + r.status); return r.json(); });
  }
  function leerDibujo(donde) {
    if (donde[0] === '#') {
      const e = document.getElementById(donde.slice(1));
      return e ? Promise.resolve(e.innerHTML) : Promise.reject(new Error('No existe ' + donde));
    }
    return fetch(donde, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(donde + ': ' + r.status); return r.text(); });
  }

  function dibujar(raiz, datosDados) {
    if (instancias.has(raiz)) return instancias.get(raiz);
    const n = ++cuenta;
    const nombrePlano = raiz.getAttribute('aria-label') || 'Plano';

    const plano = {
      el: raiz, datos: { plantas: [], antenas: [], aulas: [] }, planta: null, elegido: null,
      extra: null, detalle: null,
      ocupacion, elegir, pintar, aPlano, irA, verTodo
    };
    instancias.set(raiz, plano);

    let estados = {};                 // ocupación de las aulas
    let tam = { x: 0, y: 0, ancho: 100, alto: 100 };   // el viewBox del dibujo de la planta actual
    let vista = { x: 0, y: 0, w: 100, h: 100 };
    let modo = window.matchMedia('(max-width: 767px)').matches ? 'lista' : 'plano';
    const capas = { antenas: true, aulas: true };
    const dibujos = {};               // dibujos ya traídos, por planta

    // --- Estructura -------------------------------------------------------
    raiz.textContent = '';
    const barra = crear('div', 'plano__barra');
    const selPlanta = crear('fieldset', 'segmentado', '<legend class="solo-lector">Planta</legend>');
    const selCapas = crear('div', 'plano__capas');
    selCapas.setAttribute('role', 'group');
    selCapas.setAttribute('aria-label', 'Qué se muestra');
    selCapas.innerHTML = '<label class="casilla"><input type="checkbox" value="antenas" checked> Antenas</label>' +
      '<label class="casilla"><input type="checkbox" value="aulas" checked> Aulas</label>';
    const zoom = crear('div', 'plano__zoom');
    zoom.setAttribute('role', 'group');
    zoom.setAttribute('aria-label', 'Acercar y alejar');
    zoom.innerHTML = `<button class="boton boton--icono" type="button" data-zoom="1.5" aria-label="Acercar">${icono('plus')}</button>` +
      `<button class="boton boton--icono" type="button" data-zoom="0.667" aria-label="Alejar">${icono('minus')}</button>` +
      '<button class="boton boton--secundario boton--compacto" type="button" data-zoom="todo">Ver todo</button>';
    const selModo = crear('fieldset', 'segmentado', '<legend class="solo-lector">Forma de verlo</legend>' +
      `<label><input type="radio" name="plano-modo-${n}" value="plano"> Plano</label>` +
      `<label><input type="radio" name="plano-modo-${n}" value="lista"> Lista</label>`);
    barra.append(selPlanta, selCapas, zoom, selModo);

    const cuerpo = crear('div', 'plano__cuerpo');
    const principal = crear('div', 'plano__principal');
    const vistaPlano = crear('div', 'plano__vista');
    const lienzo = crear('div', 'plano__lienzo');
    lienzo.tabIndex = 0;
    lienzo.setAttribute('role', 'group');
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'plano__svg');
    svg.setAttribute('aria-hidden', 'true');
    const gDibujo = document.createElementNS(NS, 'g');
    const gZonas = document.createElementNS(NS, 'g');
    const gExtra = document.createElementNS(NS, 'g');   // para lo que dibuje una herramienta (un editor)
    svg.append(gDibujo, gZonas, gExtra);
    const encima = crear('div', 'plano__encima');        // rótulos y marcas, por encima del dibujo
    const cargando = crear('p', 'plano__cargando', 'Cargando el plano…');
    cargando.setAttribute('role', 'status');
    lienzo.append(svg, encima, cargando);
    const referencias = crear('ul', 'plano__referencias');
    referencias.setAttribute('aria-label', 'Referencias');
    const nota = crear('p', 'plano__nota', 'Arrastrá para mover el plano. Para acercar: los botones, <kbd>Ctrl</kbd> + la rueda del mouse o dos dedos. Con el teclado: las flechas mueven, <kbd>+</kbd> y <kbd>−</kbd> acercan y alejan.');
    vistaPlano.append(lienzo, referencias, nota);
    const lista = crear('div', 'plano__lista');
    principal.append(vistaPlano, lista);
    const detalle = crear('aside', 'plano__detalle panel');
    detalle.setAttribute('aria-live', 'polite');
    detalle.setAttribute('aria-label', 'Datos de lo elegido');
    cuerpo.append(principal, detalle);
    raiz.append(barra, cuerpo);
    plano.extra = gExtra;
    plano.detalle = detalle;

    // --- Vista: qué parte del plano se ve ---------------------------------
    const escala = () => (lienzo.clientWidth || 1) / vista.w;
    const proporcion = () => (lienzo.clientHeight || 1) / (lienzo.clientWidth || 1);
    // El ancho de vista con el que el plano entra entero
    const anchoTodo = () => Math.max(tam.ancho, tam.alto / proporcion());
    function ajustar() {
      // La vista siempre tiene la proporción del lienzo; el centro no se sale del plano
      const cx = entre(vista.x + vista.w / 2, tam.x, tam.x + tam.ancho);
      const cy = entre(vista.y + vista.h / 2, tam.y, tam.y + tam.alto);
      vista.w = entre(vista.w, anchoTodo() / ZOOM_MAX, anchoTodo());
      vista.h = vista.w * proporcion();
      vista.x = cx - vista.w / 2;
      vista.y = cy - vista.h / 2;
      svg.setAttribute('viewBox', `${vista.x} ${vista.y} ${vista.w} ${vista.h}`);
      ubicar();
    }
    function centrar(cx, cy, w) {
      vista = { x: cx - w / 2, y: cy - vista.h / 2, w, h: vista.h };
      ajustar();
    }
    function verTodo() {
      vista.w = anchoTodo();
      vista.h = vista.w * proporcion();
      centrar(tam.x + tam.ancho / 2, tam.y + tam.alto / 2, vista.w);
    }
    function acercar(factor, px, py) {
      // (px, py): el punto del plano que queda quieto. Por defecto, el centro.
      if (px == null) { px = vista.x + vista.w / 2; py = vista.y + vista.h / 2; }
      const w = entre(vista.w / factor, anchoTodo() / ZOOM_MAX, anchoTodo());
      const r = w / vista.w;
      vista = { x: px - (px - vista.x) * r, y: py - (py - vista.y) * r, w, h: vista.h * r };
      ajustar();
    }
    function mover(dx, dy) { vista.x += dx; vista.y += dy; ajustar(); }
    function aPlano(evento) {
      const r = lienzo.getBoundingClientRect(), e = escala();
      return [vista.x + (evento.clientX - r.left) / e, vista.y + (evento.clientY - r.top) / e];
    }
    function irA(x, y) {
      // Si el punto no se ve (o está pegado al borde), el plano se centra ahí
      const m = 30 / escala();
      if (x < vista.x + m || x > vista.x + vista.w - m || y < vista.y + m || y > vista.y + vista.h - m) {
        centrar(x, y, vista.w);
      }
    }

    // Rótulos y marcas: se reubican cada vez que cambia la vista
    function ubicar() {
      const e = escala();
      encima.querySelectorAll('[data-x]').forEach(b => {
        b.style.setProperty('--x', ((+b.dataset.x - vista.x) * e).toFixed(1) + 'px');
        b.style.setProperty('--y', ((+b.dataset.y - vista.y) * e).toFixed(1) + 'px');
        if (b.dataset.ancho) {
          // El rótulo no se sale de su aula. Si no entra entero se va el estado; después
          // el ícono; y si tampoco entra el nombre, queda el ícono solo.
          const lugar = +b.dataset.ancho * e - 6;
          const talla = lugar >= +b.dataset.entero ? '' : lugar >= +b.dataset.medio ? 'medio' : lugar >= +b.dataset.corto ? 'corto' : 'chico';
          ['medio', 'corto', 'chico'].forEach(t => b.classList.toggle('plano-rotulo--' + t, t === talla));
        }
      });
    }

    // --- Datos ------------------------------------------------------------
    const plantaActual = () => plano.datos.plantas.find(p => p.id === plano.planta) || {};
    const deLaPlanta = lista_ => (lista_ || []).filter(x => x.planta === plano.planta);
    function estadoAntena(a) { return ESTADOS_ANTENA[a.estado] || { texto: 'Sin dato', icono: 'wifi', tono: '' }; }
    const tipoDe = a => a.tipo || 'Aula';
    function estadoAula(a) {
      // Lo que no se reserva (una oficina, la biblioteca) no tiene estado
      if (a.reservable === false) return { clave: 'fija', icono: 'door-closed', tono: '', evento: '', texto: '' };
      const o = estados[a.id] || {};
      const base = ESTADOS_AULA[o.estado] || ESTADOS_AULA[''];
      return {
        clave: ESTADOS_AULA[o.estado] ? o.estado : '', icono: base.icono, tono: base.tono, evento: o.evento || '',
        texto: base.texto + (o.hasta && base !== ESTADOS_AULA[''] ? ' hasta las ' + o.hasta : '')
      };
    }
    function centro(puntos) {
      const xs = puntos.map(p => p[0]), ys = puntos.map(p => p[1]);
      const x1 = Math.min(...xs), x2 = Math.max(...xs), y1 = Math.min(...ys), y2 = Math.max(...ys);
      return { x: (x1 + x2) / 2, y: (y1 + y2) / 2, ancho: x2 - x1 };
    }

    // --- Pintar: zonas, marcas, referencias y lista de la planta actual ----
    function pintar() {
      const antenas = capas.antenas ? deLaPlanta(plano.datos.antenas) : [];
      const aulas = capas.aulas ? deLaPlanta(plano.datos.aulas) : [];
      const es = (tipo, id) => !!plano.elegido && plano.elegido.tipo === tipo && plano.elegido.id === id;

      gZonas.textContent = '';
      encima.textContent = '';
      aulas.forEach(a => {
        if (!a.puntos || a.puntos.length < 3) return;
        const e = estadoAula(a);
        const p = document.createElementNS(NS, 'polygon');
        p.setAttribute('points', a.puntos.map(q => q.join(',')).join(' '));
        p.setAttribute('class', 'plano-zona' + (e.clave ? ' plano-zona--' + e.clave : '') + (es('aula', a.id) ? ' plano-zona--elegida' : ''));
        p.dataset.id = a.id;
        gZonas.append(p);
        const c = centro(a.puntos);
        const b = crear('button', 'plano-rotulo' + (e.clave ? ' plano-rotulo--' + e.clave : ''),
          icono(e.icono) + `<span class="plano-rotulo__nombre">${limpio(a.nombre)}</span>` +
          (e.texto ? `<span class="plano-rotulo__estado">${limpio(e.texto)}</span>` : ''));
        b.type = 'button';
        b.dataset.tipo = 'aula'; b.dataset.id = a.id;
        b.dataset.x = c.x; b.dataset.y = c.y; b.dataset.ancho = c.ancho;
        b.setAttribute('aria-label', a.nombre + (e.texto ? ', ' + e.texto.toLowerCase() : ''));
        b.setAttribute('aria-pressed', es('aula', a.id));
        encima.append(b);
      });
      antenas.forEach(a => {
        if (typeof a.x !== 'number' || typeof a.y !== 'number') return;    // sin ubicar: solo en la lista
        const e = estadoAntena(a);
        const b = crear('button', 'plano-marca' + (ESTADOS_ANTENA[a.estado] ? ' plano-marca--' + a.estado : ''), marca(a, e));
        b.type = 'button';
        b.dataset.tipo = 'antena'; b.dataset.id = a.id;
        b.dataset.x = a.x; b.dataset.y = a.y;
        b.setAttribute('aria-label', `Antena ${a.nombre || a.id}, ${e.texto.toLowerCase()}`);
        b.setAttribute('aria-pressed', es('antena', a.id));
        encima.append(b);
      });
      // Cuánto mide cada rótulo en cada talla, para saber cuál entra en su aula
      const rotulos = Array.from(encima.querySelectorAll('.plano-rotulo'));
      const medir = (talla, dato) => {
        rotulos.forEach(b => { b.className = b.className.replace(/ plano-rotulo--(medio|corto|chico)/g, '') + (talla ? ' plano-rotulo--' + talla : ''); });
        rotulos.forEach(b => { b.dataset[dato] = b.offsetWidth; });
      };
      medir('', 'entero'); medir('medio', 'medio'); medir('corto', 'corto');
      ubicar();

      // Referencias: solo de lo que hay en esta planta
      const refs = [];
      const vistos = new Set();
      antenas.forEach(a => {
        const e = estadoAntena(a);
        if (typeof a.x !== 'number' || vistos.has('n' + e.texto)) return;
        vistos.add('n' + e.texto);
        // La referencia de una antena es su misma marca, en chico
        refs.push([{ tono: '', html: `<span class="plano-marca plano-marca--muestra${ESTADOS_ANTENA[a.estado] ? ' plano-marca--' + a.estado : ''}">${marca({ equipo: 'plato' }, e)}</span>` }, 'Antena: ' + e.texto.toLowerCase()]);
      });
      aulas.forEach(a => { const e = ESTADOS_AULA[estadoAula(a).clave]; if (e && !vistos.has('u' + e.texto)) { vistos.add('u' + e.texto); refs.push([e, 'Aula: ' + e.texto.toLowerCase()]); } });
      referencias.innerHTML = refs.map(([e, t]) => `<li class="${e.tono ? 'plano__referencia--' + e.tono : ''}">${e.html || icono(e.icono)}${limpio(t)}</li>`).join('');
      referencias.hidden = !refs.length;

      // Lista
      const nombre = plantaActual().nombre || '';
      const fila = (tipo, a, celdas) => `<tr aria-selected="${es(tipo, a.id)}" data-tipo="${tipo}" data-id="${limpio(a.id)}">` +
        `<th scope="row"><button type="button" class="plano__ir">${limpio(a.nombre || a.id)}</button></th>${celdas}</tr>`;
      const tabla = (titulo, cabeza, filas, vacio) => `<section><h3 class="plano__subtitulo">${limpio(titulo)}</h3>` +
        (filas.length
          ? `<div class="tabla-marco" tabindex="0" role="region" aria-label="${limpio(titulo)}"><table class="tabla"><thead><tr>${cabeza}</tr></thead><tbody>${filas.join('')}</tbody></table></div>`
          : `<p class="plano__vacio">${vacio}</p>`) + '</section>';
      let html = '';
      if (capas.antenas) {
        html += tabla(`Antenas de ${nombre}`, '<th scope="col">Antena</th><th scope="col">Estado</th><th scope="col">Equipo</th><th scope="col">Modelo</th><th scope="col">IP</th><th scope="col">Nota</th>',
          antenas.map(a => fila('antena', a, `<td>${insignia(estadoAntena(a))}</td><td>${EQUIPOS[a.equipo] ? EQUIPOS[a.equipo].texto : '—'}</td><td>${limpio(a.modelo) || '—'}</td><td>${limpio(a.ip) || '—'}</td><td>${limpio(a.nota) || '—'}</td>`)),
          'No hay antenas marcadas en esta planta.');
      }
      if (capas.aulas) {
        html += tabla(`Aulas y otros espacios de ${nombre}`, '<th scope="col">Espacio</th><th scope="col">Tipo</th><th scope="col">Estado</th><th scope="col" class="num">Lugares</th><th scope="col">Evento</th>',
          aulas.map(a => { const e = estadoAula(a); return fila('aula', a, `<td>${limpio(tipoDe(a))}</td><td>${e.texto ? insignia(e) : '—'}</td><td class="num">${a.capacidad || '—'}</td><td>${limpio(e.evento) || '—'}</td>`); }),
          'No hay aulas marcadas en esta planta.');
      }
      lista.innerHTML = html || '<p class="plano__vacio">Elegí qué mostrar: antenas, aulas o las dos.</p>';

      pintarDetalle();
    }

    function buscar(tipo, id) {
      return (tipo === 'antena' ? plano.datos.antenas : plano.datos.aulas).find(x => x.id === id);
    }
    function pintarDetalle() {
      armarDetalle();
      // Una herramienta puede sumar lo suyo al panel (un formulario de edición)
      raiz.dispatchEvent(new CustomEvent('plano:detalle', { detail: { tipo: plano.elegido && plano.elegido.tipo, dato: plano.elegido && buscar(plano.elegido.tipo, plano.elegido.id) } }));
    }
    function armarDetalle() {
      const el = plano.elegido && buscar(plano.elegido.tipo, plano.elegido.id);
      if (!el) {
        plano.elegido = null;
        detalle.innerHTML = '<p class="plano__vacio">Elegí una antena o un aula, en el plano o en la lista, para ver sus datos.</p>';
        return;
      }
      const planta = (plano.datos.plantas.find(p => p.id === el.planta) || {}).nombre || '';
      const par = (dt, dd) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`;
      let filas, acciones = '';
      if (plano.elegido.tipo === 'antena') {
        filas = par('Estado', insignia(estadoAntena(el))) + par('Planta', limpio(planta)) +
          (EQUIPOS[el.equipo] ? par('Equipo', `<span class="plano__equipo">${dibujoEquipo(el.equipo)}${EQUIPOS[el.equipo].texto}</span>`) : '') +
          (el.modelo ? par('Modelo', limpio(el.modelo)) : '') + (el.ip ? par('IP', limpio(el.ip)) : '') + (el.nota ? par('Nota', limpio(el.nota)) : '');
      } else {
        const e = estadoAula(el);
        filas = (e.texto ? par('Estado', insignia(e)) : '') + (e.evento ? par('Evento', limpio(e.evento)) : '') + par('Planta', limpio(planta)) +
          (el.capacidad ? par('Lugares', limpio(el.capacidad)) : '');
        const agenda = raiz.dataset.agenda;
        if (agenda && el.reservable !== false) acciones = `<a class="boton boton--secundario" href="${limpio(agenda.replace('{id}', encodeURIComponent(el.id)))}">Ver la agenda del aula</a>`;
      }
      detalle.innerHTML = `<h2 class="plano__titulo">${limpio(el.nombre || el.id)}</h2>` +
        `<p class="plano__tipo">${plano.elegido.tipo === 'antena' ? 'Antena de wifi' : limpio(tipoDe(el))}</p>` +
        `<dl class="resumen">${filas}</dl><div class="plano__acciones">${acciones}</div>`;
    }

    // --- Elegir ------------------------------------------------------------
    function elegir(tipo, id, opciones) {
      const el = tipo ? buscar(tipo, id) : null;
      plano.elegido = el ? { tipo, id } : null;
      const sigue = () => {
        pintar();
        if (el && modo === 'plano') {
          const c = tipo === 'antena' ? (typeof el.x === 'number' ? el : null) : el.puntos && el.puntos.length ? centro(el.puntos) : null;
          if (c) irA(c.x, c.y);
        }
        if (opciones && opciones.foco) {
          const b = encima.querySelector(`[data-tipo="${tipo}"][data-id="${CSS.escape(id)}"]`);
          if (b) b.focus({ preventScroll: true });
        }
        enlace();
        raiz.dispatchEvent(new CustomEvent('plano:elegir', { detail: { tipo: plano.elegido && tipo, dato: el || null } }));
      };
      if (el && el.planta !== plano.planta) return cambiarPlanta(el.planta).then(sigue);
      sigue();
      return Promise.resolve();
    }

    // La planta y lo elegido van en la dirección, para poder compartir el enlace
    function enlace() {
      if (raiz.dataset.enlace === 'no') return;
      let h = 'planta=' + encodeURIComponent(plano.planta);
      if (plano.elegido) h += `&${plano.elegido.tipo}=` + encodeURIComponent(plano.elegido.id);
      try { history.replaceState(null, '', '#' + h); } catch (e) { /* sin historial (archivo local): no pasa nada */ }
    }

    // --- Plantas -----------------------------------------------------------
    function cambiarPlanta(id) {
      const p = plano.datos.plantas.find(x => x.id === id) || plano.datos.plantas[0];
      if (!p) return Promise.resolve();
      plano.planta = p.id;
      selPlanta.querySelectorAll('input').forEach(r => { r.checked = r.value === p.id; });
      lienzo.setAttribute('aria-label', `Plano de ${p.nombre}. Las flechas lo mueven; más y menos lo acercan y lo alejan.`);
      cargando.hidden = false;
      const trae = dibujos[p.id] ? Promise.resolve(dibujos[p.id]) : leerDibujo(p.svg).then(t => (dibujos[p.id] = t));
      return trae.then(texto => {
        if (plano.planta !== p.id) return;        // ya se pidió otra planta
        // Un archivo .svg se lee como XML; un <svg> escrito en la página (sin xmlns), como HTML
        const esXML = texto.indexOf('xmlns=') >= 0;
        const doc = esXML ? new DOMParser().parseFromString(texto.trim(), 'image/svg+xml').documentElement
          : new DOMParser().parseFromString(texto, 'text/html').querySelector('svg');
        const caja = (doc.getAttribute('viewBox') || '0 0 100 100').split(/[\s,]+/).map(Number);
        tam = { x: caja[0], y: caja[1], ancho: caja[2], alto: caja[3] };
        gDibujo.textContent = '';
        Array.from(doc.childNodes).forEach(h => gDibujo.append(document.importNode(h, true)));
        lienzo.style.setProperty('--plano-proporcion', `${tam.ancho} / ${tam.alto}`);
        cargando.hidden = true;
        pintar();
        verTodo();
        enlace();
        raiz.dispatchEvent(new CustomEvent('plano:planta', { detail: { planta: p } }));
      });
    }

    function ocupacion(datos) { estados = datos || {}; pintar(); }

    function ponerModo(m) {
      modo = m;
      selModo.querySelectorAll('input').forEach(r => { r.checked = r.value === m; });
      vistaPlano.hidden = m !== 'plano';
      lista.hidden = m !== 'lista';
      zoom.hidden = m !== 'plano';
      // Al volver al plano se pinta de nuevo: los rótulos se miden, y escondidos miden cero
      if (m === 'plano') { pintar(); ajustar(); }
    }

    // --- Lo que hace la persona -------------------------------------------
    selPlanta.addEventListener('change', e => { plano.elegido = null; cambiarPlanta(e.target.value); });
    selModo.addEventListener('change', e => ponerModo(e.target.value));
    selCapas.addEventListener('change', e => {
      capas[e.target.value] = e.target.checked;
      if (plano.elegido && !capas[plano.elegido.tipo === 'antena' ? 'antenas' : 'aulas']) plano.elegido = null;
      pintar();
      enlace();
    });
    zoom.addEventListener('click', e => {
      const b = e.target.closest('[data-zoom]');
      if (!b) return;
      if (b.dataset.zoom === 'todo') verTodo(); else acercar(+b.dataset.zoom);
    });
    encima.addEventListener('click', e => {
      const b = e.target.closest('[data-tipo]');
      if (b) elegir(b.dataset.tipo, b.dataset.id, { foco: true });
    });
    // Al llegar con Tab a algo que quedó fuera de la vista, el plano se mueve hasta ahí
    encima.addEventListener('focusin', e => {
      const b = e.target.closest('[data-x]');
      if (b && b.matches(':focus-visible')) irA(+b.dataset.x, +b.dataset.y);
    });
    lista.addEventListener('click', e => {
      const b = e.target.closest('.plano__ir');
      if (!b) return;
      const f = b.closest('tr');
      const { tipo, id } = f.dataset;
      elegir(tipo, id).then(() => {
        const otro = lista.querySelector(`tr[data-tipo="${tipo}"][data-id="${CSS.escape(id)}"] .plano__ir`);
        if (otro) otro.focus();
      });
    });

    // Arrastrar, pellizcar y clic
    const dedos = new Map();
    let arrastre = null;
    lienzo.addEventListener('pointerdown', e => {
      if (e.target.closest('button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
      dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
      lienzo.setPointerCapture(e.pointerId);
      arrastre = { x: e.clientX, y: e.clientY, movido: false, destino: e.target };
    });
    lienzo.addEventListener('pointermove', e => {
      const antes = dedos.get(e.pointerId);
      if (!antes) return;
      if (dedos.size === 2) {
        const otro = Array.from(dedos.entries()).find(([id]) => id !== e.pointerId)[1];
        const d0 = Math.hypot(antes.x - otro.x, antes.y - otro.y) || 1;
        const d1 = Math.hypot(e.clientX - otro.x, e.clientY - otro.y) || 1;
        const medio = aPlano({ clientX: (e.clientX + otro.x) / 2, clientY: (e.clientY + otro.y) / 2 });
        acercar(d1 / d0, medio[0], medio[1]);
        if (arrastre) arrastre.movido = true;
      } else if (arrastre) {
        if (!arrastre.movido && Math.hypot(e.clientX - arrastre.x, e.clientY - arrastre.y) < 5) return;
        arrastre.movido = true;
        lienzo.classList.add('plano__lienzo--moviendo');
        const es = escala();
        mover(-(e.clientX - antes.x) / es, -(e.clientY - antes.y) / es);
      }
      dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
    });
    const soltar = e => {
      if (!dedos.delete(e.pointerId)) return;
      lienzo.classList.remove('plano__lienzo--moviendo');
      const a = arrastre;
      if (dedos.size === 0) arrastre = null;
      if (e.type !== 'pointerup' || !a || a.movido) return;
      // Fue un clic: primero se avisa (un editor puede usarlo); si nadie lo toma, elige el aula
      const [x, y] = aPlano(e);
      const sigue = raiz.dispatchEvent(new CustomEvent('plano:clic', { cancelable: true, detail: { x, y, planta: plano.planta } }));
      const zona = a.destino.closest && a.destino.closest('.plano-zona');
      if (!sigue) return;
      // Un clic en un aula la elige; en cualquier otro lugar del plano, cierra la ficha
      if (zona) elegir('aula', zona.dataset.id);
      else if (plano.elegido) elegir(null);
    };
    lienzo.addEventListener('pointerup', soltar);
    lienzo.addEventListener('pointercancel', soltar);
    // La rueda sola mueve la página; con Ctrl (o el gesto de dos dedos del panel táctil) acerca
    lienzo.addEventListener('wheel', e => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const [x, y] = aPlano(e);
      acercar(Math.exp(-e.deltaY * 0.01), x, y);
    }, { passive: false });
    lienzo.addEventListener('keydown', e => {
      if (e.target !== lienzo || e.ctrlKey || e.metaKey || e.altKey) return;
      const paso = vista.w * 0.1;
      const teclas = {
        ArrowLeft: () => mover(-paso, 0), ArrowRight: () => mover(paso, 0),
        ArrowUp: () => mover(0, -paso), ArrowDown: () => mover(0, paso),
        '+': () => acercar(1.5), '=': () => acercar(1.5), '-': () => acercar(1 / 1.5), '0': verTodo
      };
      if (teclas[e.key]) { e.preventDefault(); teclas[e.key](); }
    });
    new ResizeObserver(() => { if (modo === 'plano') ajustar(); }).observe(lienzo);

    // --- Arranque ----------------------------------------------------------
    function fallo(error) {
      cuerpo.innerHTML = `<div class="aviso aviso--error" role="alert"><div class="aviso__placa">${icono('circle-x')}</div>` +
        '<div class="aviso__cuerpo"><p class="aviso__titulo">No se pudo cargar el plano</p>' +
        '<p>Probá de nuevo en unos minutos. Si sigue sin verse, avisá a Soporte Informático.</p></div></div>';
      barra.hidden = true;
      console.error('unpsjb-planos:', error);
    }
    Promise.all([
      datosDados ? Promise.resolve(datosDados) : leerJSON(raiz.dataset.plano),
      leerJSON(raiz.dataset.ocupacion).catch(() => null)     // sin ocupación, las aulas quedan "Sin dato"
    ]).then(([datos, ocup]) => {
      plano.datos = Object.assign({ plantas: [], antenas: [], aulas: [] }, datos);
      estados = ocup || {};
      selPlanta.insertAdjacentHTML('beforeend', plano.datos.plantas.map(p =>
        `<label><input type="radio" name="plano-planta-${n}" value="${limpio(p.id)}"> ${limpio(p.nombre)}</label>`).join(''));
      selPlanta.hidden = plano.datos.plantas.length < 2;
      ponerModo(modo);
      // Lo que diga la dirección: #planta=pb&antena=ap-03
      const pedido = new URLSearchParams(raiz.dataset.enlace === 'no' ? '' : location.hash.slice(1));
      const tipo = pedido.has('antena') ? 'antena' : pedido.has('aula') ? 'aula' : null;
      const el = tipo && buscar(tipo, pedido.get(tipo));
      return cambiarPlanta(el ? el.planta : pedido.get('planta')).then(() => {
        if (el) elegir(tipo, el.id);
        raiz.dispatchEvent(new CustomEvent('plano:listo', { detail: { plano } }));
      });
    }).catch(fallo);

    return plano;
  }

  const iniciar = () => document.querySelectorAll('.plano[data-plano]').forEach(e => dibujar(e));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.unpsjbPlanos = { dibujar, de: e => instancias.get(e), equipos: EQUIPOS, dibujoEquipo };
})();
