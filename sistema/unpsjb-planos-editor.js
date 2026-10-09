/* ==========================================================================
   unpsjb-planos-editor.js — Modo edición del módulo de planos · v0.4.4
   Sistema de Diseño Digital UNPSJB (MII 2.0). Reglas: DESIGN.md, sección 21.G.

   Para marcar antenas y aulas sobre el plano sin tocar el archivo de datos a
   mano. Es opcional: se carga DESPUÉS de unpsjb-planos.js y solo hace algo
   cuando la dirección lleva ?editar. Sus estilos están en unpsjb-planos.css
   (pieza 7). Ejemplo completo: muestra-planos.html?editar.

   No hay servidor:
   - Los cambios se guardan como borrador en este navegador (localStorage).
   - "Descargar planos.json" entrega el archivo, que reemplaza al publicado.

   Lo que la página tiene que traer
     <a class="boton boton--secundario" id="ir-a-editar" href="?editar">Editar antenas y aulas</a>
     <div id="editor" hidden></div>        acá se arma la barra, arriba del plano
     <section class="plano" …>             el plano, como siempre
     y los íconos #i-plus y #i-download en el <svg> de símbolos.

   Usa lo que el módulo ofrece: plano.datos, plano.pintar, plano.extra,
   plano.elegir, plano.aPlano y los eventos plano:listo, plano:clic y plano:detalle.
   ========================================================================== */
(function () {
  'use strict';
  if (!new URLSearchParams(location.search).has('editar')) return;

  // v2: las posiciones van en coordenadas de la hoja original. Un borrador anterior no sirve.
  const BORRADOR = 'planos-borrador-v2';
  try { localStorage.removeItem('planos-borrador'); } catch (e) { /* nada que borrar */ }
  const NS = 'http://www.w3.org/2000/svg';
  const raiz = document.querySelector('.plano');
  const caja = document.getElementById('editor');
  const irAEditar = document.getElementById('ir-a-editar');
  let plano = null;
  let modo = null;          // null | 'antena' | 'rectangulo' | 'forma' | 'reubicar'
  let puntos = [];          // esquinas ya marcadas del aula nueva
  let pendiente = null;     // la antena que se está ubicando
  let cambios = false;
  let borradorViejo = null; // un borrador hecho sobre datos publicados que ya cambiaron
  let base = '';            // huella de los datos publicados sobre los que se hizo el borrador

  const limpio = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const redondo = v => Math.round(v * 10) / 10;

  // --- Barra del editor ----------------------------------------------------
  irAEditar.href = location.pathname;
  irAEditar.textContent = 'Salir de la edición';
  caja.hidden = false;
  caja.className = 'plano-editor';
  caja.setAttribute('role', 'region');
  caja.setAttribute('aria-label', 'Edición del plano');
  // Una tira pegada al plano, para que el plano no se vaya de la vista: arriba las
  // herramientas (qué agregar | lo que falta ubicar | publicar) y abajo qué está pasando.
  caja.innerHTML =
    '<h2 class="solo-lector">Edición del plano</h2>' +
    '<div class="plano-editor__fila">' +
      '<div class="plano-editor__grupo" role="group" aria-label="Agregar">' +
        '<button class="boton boton--secundario boton--compacto" type="button" data-accion="antena"><svg class="icono" aria-hidden="true"><use href="#i-plus"/></svg>Antena</button>' +
        '<button class="boton boton--secundario boton--compacto" type="button" data-accion="rectangulo"><svg class="icono" aria-hidden="true"><use href="#i-plus"/></svg>Aula</button>' +
        '<button class="boton boton--tranquilo boton--compacto" type="button" data-accion="forma">Aula de forma irregular</button>' +
        '<button class="boton boton--secundario boton--compacto" type="button" data-accion="lugar"><svg class="icono" aria-hidden="true"><use href="#i-plus"/></svg>Punto de referencia</button>' +
      '</div>' +
      '<div class="plano-editor__grupo plano-editor__sin-ubicar" id="editor-sin-ubicar" role="group" aria-labelledby="editor-pendiente-nombre" hidden>' +
        '<label class="plano-editor__rotulo" id="editor-pendiente-nombre" for="editor-pendiente">Sin ubicar</label>' +
        '<select class="select select--compacto" id="editor-pendiente"></select>' +
        '<button class="boton boton--secundario boton--compacto" type="button" data-accion="ubicar">Ubicar acá</button>' +
      '</div>' +
      '<div class="plano-editor__grupo plano-editor__publicar" role="group" aria-label="Publicar">' +
        '<button class="boton boton--tranquilo boton--compacto" type="button" data-accion="recuperar" hidden>Recuperar el borrador anterior</button>' +
        '<button class="boton boton--tranquilo boton--compacto" type="button" data-accion="descartar">Descartar</button>' +
        '<button class="boton boton--primario boton--compacto" type="button" data-accion="descargar"><svg class="icono" aria-hidden="true"><use href="#i-download"/></svg>Descargar planos.json</button>' +
      '</div>' +
    '</div>' +
    '<div class="plano-editor__ahora">' +
      '<p class="plano-editor__estado" role="status" id="editor-estado"></p>' +
      '<button class="boton boton--secundario boton--compacto" type="button" data-accion="cerrar" hidden>Cerrar la forma</button>' +
      '<button class="boton boton--tranquilo boton--compacto" type="button" data-accion="cancelar" hidden>Cancelar</button>' +
    '</div>';
  raiz.classList.add('plano--editando');     // en edición, el panel muestra el formulario y no la ficha
  const estado = caja.querySelector('#editor-estado');
  const boton = accion => caja.querySelector(`[data-accion="${accion}"]`);

  // Modal de confirmación (nunca confirm())
  const modal = document.createElement('dialog');
  modal.className = 'modal';
  modal.setAttribute('aria-labelledby', 'editor-modal-titulo');
  modal.innerHTML = '<h2 class="modal__titulo" id="editor-modal-titulo"></h2><p></p>' +
    '<form method="dialog" class="modal__acciones">' +
    '<button class="boton boton--secundario" value="no">Cancelar</button>' +
    '<button class="boton boton--destructivo" value="si"></button></form>';
  document.body.append(modal);
  function confirmar(titulo, texto, accion) {
    modal.querySelector('h2').textContent = titulo;
    modal.querySelector('p').textContent = texto;
    modal.querySelector('[value="si"]').textContent = accion;
    modal.returnValue = 'no';
    modal.showModal();
    return new Promise(listo => modal.addEventListener('close', () => listo(modal.returnValue === 'si'), { once: true }));
  }

  // --- Borrador ------------------------------------------------------------
  function guardar() {
    cambios = true;
    if (borradorViejo) { borradorViejo = null; boton('recuperar').hidden = true; }
    try { localStorage.setItem(BORRADOR, JSON.stringify({ base, antenas: plano.datos.antenas, aulas: plano.datos.aulas, lugares: plano.datos.lugares || [] })); } catch (e) { /* sin lugar: queda en memoria */ }
    listarSinUbicar();
    decir();
  }
  // Las antenas que están en la base pero todavía no tienen lugar en el plano
  const sinUbicar = () => plano.datos.antenas.filter(a => typeof a.x !== 'number' || typeof a.y !== 'number');
  function listarSinUbicar() {
    const lista = sinUbicar();
    const sel = caja.querySelector('#editor-pendiente');
    const antes = sel.value;
    caja.querySelector('#editor-sin-ubicar').hidden = !lista.length;
    caja.querySelector('[for="editor-pendiente"]').textContent = `Sin ubicar (${lista.length})`;
    sel.innerHTML = lista.map(a => `<option value="${limpio(a.id)}">${limpio(a.nombre || a.id)}${a.modelo ? ' · ' + limpio(a.modelo) : ''}</option>`).join('');
    if (lista.some(a => a.id === antes)) sel.value = antes;
  }
  function ubicar(id, x, y) {
    const a = plano.datos.antenas.find(q => q.id === id);
    if (!a) return ponerModo(null);
    a.x = redondo(x); a.y = redondo(y); a.planta = plano.planta;
    guardar();
    ponerModo(null, `${a.nombre || a.id} quedó ubicada.`);
    plano.elegir('antena', id);
  }
  function decir(texto) {
    const base = cambios ? 'Hay cambios sin descargar. Para publicarlos, descargá planos.json y reemplazá el de la carpeta datos.'
      : 'Sin cambios todavía. Lo que marques queda guardado en este navegador.';
    estado.textContent = texto || base;
  }
  // Una línea por antena y por aula: el archivo se lee y se compara mejor
  function comoArchivo() {
    const lineas = lista => lista.length ? '[\n' + lista.map(x => '    ' + JSON.stringify(x)).join(',\n') + '\n  ]' : '[]';
    return '{\n  "plantas": ' + lineas(plano.datos.plantas) + ',\n  "antenas": ' + lineas(plano.datos.antenas) +
      ',\n  "aulas": ' + lineas(plano.datos.aulas) +
      // Lo que el archivo ya traía y el editor no toca ("tipos") se conserva
      (plano.datos.tipos ? ',\n  "tipos": ' + JSON.stringify(plano.datos.tipos) : '') +
      ((plano.datos.lugares || []).length ? ',\n  "lugares": ' + lineas(plano.datos.lugares) : '') + '\n}\n';
  }

  // --- Marcar en el plano --------------------------------------------------
  function ponerModo(m, texto) {
    modo = m;
    puntos = [];
    plano.extra.textContent = '';
    raiz.classList.toggle('plano--marcando', !!m);
    caja.classList.toggle('plano--marcando-barra', !!m);
    boton('cancelar').hidden = !m;
    boton('cerrar').hidden = m !== 'forma';
    decir(texto);
  }
  function siguienteId(lista, prefijo) {
    let n = 1;
    const dos = v => String(v).padStart(2, '0');
    while (lista.some(x => x.id === prefijo + dos(n))) n++;
    return [prefijo + dos(n), n];
  }
  function agregarAntena(x, y) {
    const [id, n] = siguienteId(plano.datos.antenas, 'ap-');
    plano.datos.antenas.push({ id, nombre: 'Antena ' + n, planta: plano.planta, x: redondo(x), y: redondo(y), estado: 'activa', equipo: 'plato', modelo: '', nota: '', origen: 'manual' });
    guardar();
    ponerModo(null, 'Antena agregada. Completá sus datos en el panel.');
    plano.elegir('antena', id).then(() => enfocar('nombre'));
  }
  function agregarAula(forma) {
    const [id, n] = siguienteId(plano.datos.aulas, plano.planta + '-aula-nueva-');
    plano.datos.aulas.push({ id, nombre: 'Aula nueva ' + n, planta: plano.planta, tipo: 'Aula', reservable: true, capacidad: null, puntos: forma.map(p => [redondo(p[0]), redondo(p[1])]) });
    guardar();
    ponerModo(null, 'Aula marcada. Completá sus datos en el panel.');
    plano.elegir('aula', id).then(() => enfocar('nombre'));
  }
  function agregarLugar(x, y) {
    if (!plano.datos.lugares) plano.datos.lugares = [];
    const [id] = siguienteId(plano.datos.lugares, plano.planta + '-lugar-');
    plano.datos.lugares.push({ id, tipo: 'escalera', nombre: '', planta: plano.planta, x: redondo(x), y: redondo(y) });
    guardar();
    ponerModo(null, 'Punto de referencia agregado. Elegí qué es en el panel.');
    plano.elegir('lugar', id).then(() => enfocar('tipo'));
  }
  const rectangulo = (a, b) => [[a[0], a[1]], [b[0], a[1]], [b[0], b[1]], [a[0], b[1]]];
  function dibujarBorrador() {
    plano.extra.textContent = '';
    if (!puntos.length) return;
    const forma = document.createElementNS(NS, puntos.length > 1 ? 'polygon' : 'circle');
    forma.setAttribute('class', 'plano-borrador');
    if (puntos.length > 1) forma.setAttribute('points', puntos.map(p => p.join(',')).join(' '));
    else { forma.setAttribute('cx', puntos[0][0]); forma.setAttribute('cy', puntos[0][1]); forma.setAttribute('r', 1.5); }
    plano.extra.append(forma);
  }

  raiz.addEventListener('plano:clic', e => {
    if (!modo) return;
    e.preventDefault();
    const p = [e.detail.x, e.detail.y];
    if (modo === 'antena') return agregarAntena(p[0], p[1]);
    if (modo === 'lugar') return agregarLugar(p[0], p[1]);
    if (modo === 'reubicar') return reubicar(p);
    if (modo === 'ubicar') return ubicar(pendiente, p[0], p[1]);
    puntos.push(p);
    if (modo === 'rectangulo' && puntos.length === 2) return agregarAula(rectangulo(puntos[0], puntos[1]));
    dibujarBorrador();
    decir(modo === 'rectangulo' ? 'Ahora hacé clic en la esquina opuesta.' : `${puntos.length} puntos. Seguí marcando o elegí "Cerrar la forma".`);
  });

  caja.addEventListener('click', e => {
    const b = e.target.closest('[data-accion]');
    if (!b || !plano) return;
    const conTeclado = e.detail === 0;      // sin mouse: lo nuevo aparece en el centro de lo que se ve
    const centro = () => { const r = raiz.querySelector('.plano__lienzo').getBoundingClientRect(); return plano.aPlano({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }); };
    switch (b.dataset.accion) {
      case 'antena':
        if (conTeclado) { const c = centro(); agregarAntena(c[0], c[1]); }
        else ponerModo('antena', 'Hacé clic en el plano, en el lugar donde está la antena.');
        break;
      case 'lugar':
        if (conTeclado) { const c = centro(); agregarLugar(c[0], c[1]); }
        else ponerModo('lugar', 'Hacé clic en el plano, donde está la escalera, el ascensor, el baño o la entrada.');
        break;
      case 'rectangulo':
        if (conTeclado) { const c = centro(); agregarAula(rectangulo([c[0] - 40, c[1] - 25], [c[0] + 40, c[1] + 25])); }
        else ponerModo('rectangulo', 'Hacé clic en una esquina del aula y después en la esquina opuesta.');
        break;
      case 'ubicar': {
        const id = caja.querySelector('#editor-pendiente').value;
        if (conTeclado) { const c = centro(); ubicar(id, c[0], c[1]); }
        else { ponerModo('ubicar', 'Hacé clic en el plano, en el lugar donde está esa antena.'); pendiente = id; }
        break;
      }
      case 'forma': ponerModo('forma', 'Hacé clic en cada esquina del aula, en orden. Al terminar, elegí "Cerrar la forma".'); break;
      case 'cerrar':
        if (puntos.length < 3) decir('Hacen falta al menos 3 puntos.');
        else agregarAula(puntos);
        break;
      case 'cancelar': ponerModo(null); break;
      case 'recuperar':
        plano.datos.antenas = borradorViejo.antenas;
        plano.datos.aulas = borradorViejo.aulas;
        if (Array.isArray(borradorViejo.lugares)) plano.datos.lugares = borradorViejo.lugares;
        borradorViejo = null;
        b.hidden = true;
        guardar();
        plano.elegir(null);
        decir('Borrador recuperado. Puede no coincidir con lo publicado: revisalo antes de descargar.');
        break;
      case 'descargar': {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([comoArchivo()], { type: 'application/json' }));
        a.download = 'planos.json';
        a.click();
        URL.revokeObjectURL(a.href);
        decir('Archivo descargado. Reemplazá con él datos/planos.json. El borrador sigue en este navegador hasta que lo descartes.');
        break;
      }
      case 'descartar':
        confirmar('¿Descartar los cambios?', 'Se pierde todo lo que marcaste desde la última vez que descargaste el archivo. El plano vuelve a lo publicado.', 'Descartar')
          .then(si => { if (si) { try { localStorage.removeItem(BORRADOR); } catch (err) { /* nada que borrar */ } location.reload(); } });
        break;
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modo && !modal.open) ponerModo(null); });

  // --- Formulario de lo elegido (va en el panel de detalle del módulo) -----
  function esRectangulo(p) {
    return !!p && p.length === 4 && p[0][1] === p[1][1] && p[1][0] === p[2][0] && p[2][1] === p[3][1] && p[3][0] === p[0][0];
  }
  function campo(nombre, etiqueta, valor, extra) {
    return `<div class="campo"><label class="label" for="ed-${nombre}">${etiqueta}</label>` +
      `<input class="input" id="ed-${nombre}" name="${nombre}" value="${limpio(valor)}" ${extra || ''}></div>`;
  }
  const numero = (nombre, etiqueta, valor) => campo(nombre, etiqueta, valor, 'type="number" step="0.5" inputmode="decimal"');
  function enfocar(nombre) {
    const c = plano.detalle.querySelector(`[name="${nombre}"]`);
    if (c) { c.focus(); if (c.select) c.select(); }
  }

  let elegido = null;
  raiz.addEventListener('plano:detalle', e => {
    elegido = e.detail.dato ? { tipo: e.detail.tipo, dato: e.detail.dato } : null;
    if (!elegido) return;
    const d = elegido.dato;
    const f = document.createElement('form');
    f.className = 'plano-form';
    f.setAttribute('aria-label', 'Editar ' + (d.nombre || d.id));
    let h = `<p class="plano-form__id">Identificador: ${limpio(d.id)}` +
      (d.origen === 'unifi' ? ' · viene de UniFi' : elegido.tipo === 'antena' ? ' · cargada a mano' : '') + '</p>' +
      campo('nombre', elegido.tipo === 'lugar' ? 'Nombre <span class="opcional">(opcional)</span>' : 'Nombre', d.nombre || '');
    if (elegido.tipo === 'aula') h += campo('corto', 'Nombre corto <span class="opcional">(opcional)</span>', d.corto || '', 'maxlength="12" aria-describedby="ed-corto-ayuda"') +
      '<p class="plano-form__ayuda" id="ed-corto-ayuda">El que se muestra cuando el aula se ve chica.</p>';
    if (elegido.tipo === 'antena') {
      const opcion = (v, t) => `<option value="${v}"${d.estado === v ? ' selected' : ''}>${t}</option>`;
      h += '<div class="campo"><label class="label" for="ed-estado">Estado</label><select class="select" id="ed-estado" name="estado">' +
        (d.estado && d.estado !== 'sin-dato' ? '' : '<option value="" selected>Sin dato</option>') + opcion('activa', 'Activa') + opcion('sin-conexion', 'Sin conexión') + opcion('mantenimiento', 'En mantenimiento') + '</select></div>' +
        '<fieldset class="plano-form__equipos"><legend class="label">Tipo de equipo</legend><div class="plano-form__equipos-fila">' +
        Object.keys(unpsjbPlanos.equipos).map(k => { const q = unpsjbPlanos.equipos[k]; return `<label class="plano-form__equipo"><input class="solo-lector" type="radio" name="equipo" value="${k}"${d.equipo === k ? ' checked' : ''}>` +
          `${unpsjbPlanos.dibujoEquipo(k)}<span>${k === 'router' ? 'Router' : q.texto}<span class="solo-lector">: ${q.ayuda}</span></span></label>`; }).join('') + '</div></fieldset>' +
        campo('modelo', 'Modelo <span class="opcional">(opcional)</span>', d.modelo) +
        campo('ip', 'IP <span class="opcional">(opcional)</span>', d.ip || '', 'inputmode="decimal" autocomplete="off" spellcheck="false"') +
        campo('nota', 'Nota <span class="opcional">(opcional)</span>', d.nota) +
        `<div class="plano-form__par">${numero('x', 'Posición X', d.x == null ? '' : d.x)}${numero('y', 'Posición Y', d.y == null ? '' : d.y)}</div>`;
    } else if (elegido.tipo === 'lugar') {
      const L = unpsjbPlanos.lugares;
      h += '<div class="campo"><label class="label" for="ed-tipo">Qué es</label><select class="select" id="ed-tipo" name="tipo">' +
        Object.keys(L).filter(k => k).map(k => `<option value="${k}"${d.tipo === k ? ' selected' : ''}>${L[k].texto}</option>`).join('') + '</select></div>' +
        `<div class="plano-form__par">${numero('x', 'Posición X', d.x == null ? '' : d.x)}${numero('y', 'Posición Y', d.y == null ? '' : d.y)}</div>`;
    } else {
      const tipos = ['Aula', 'Laboratorio', 'Sala', 'Oficina', 'Biblioteca', 'Servicio'];
      if (d.tipo && !tipos.includes(d.tipo)) tipos.push(d.tipo);
      h += '<div class="campo"><label class="label" for="ed-tipo">Tipo</label><select class="select" id="ed-tipo" name="tipo">' +
        tipos.map(t => `<option${(d.tipo || 'Aula') === t ? ' selected' : ''}>${limpio(t)}</option>`).join('') + '</select></div>' +
        `<label class="casilla"><input type="checkbox" name="reservable"${d.reservable === false ? '' : ' checked'}> Se puede reservar</label>` +
        (d.revisar ? '<label class="casilla"><input type="checkbox" name="revisar" checked> Falta revisar su ubicación</label>' : '');
      h += campo('capacidad', 'Lugares <span class="opcional">(opcional)</span>', d.capacidad == null ? '' : d.capacidad, 'type="number" min="0" step="1" inputmode="numeric"');
      if (esRectangulo(d.puntos)) {
        const x = Math.min(d.puntos[0][0], d.puntos[2][0]), y = Math.min(d.puntos[0][1], d.puntos[2][1]);
        const ancho = Math.abs(d.puntos[2][0] - d.puntos[0][0]), alto = Math.abs(d.puntos[2][1] - d.puntos[0][1]);
        h += `<div class="plano-form__par">${numero('x', 'Posición X', x)}${numero('y', 'Posición Y', y)}</div>` +
          `<div class="plano-form__par">${numero('ancho', 'Ancho', redondo(ancho))}${numero('alto', 'Alto', redondo(alto))}</div>`;
      }
    }
    h += '<div class="fila"><button class="boton boton--secundario boton--compacto" type="button" data-hacer="reubicar">Reubicar en el plano</button>' +
      '<button class="boton boton--destructivo boton--compacto" type="button" data-hacer="borrar">Borrar</button></div>';
    f.innerHTML = h;
    f.addEventListener('submit', ev => ev.preventDefault());
    f.addEventListener('change', aplicar);
    f.addEventListener('click', ev => {
      const b = ev.target.closest('[data-hacer]');
      if (!b) return;
      if (b.dataset.hacer === 'reubicar') ponerModo('reubicar', elegido.tipo === 'antena' ? 'Hacé clic en el lugar nuevo de la antena.' : elegido.tipo === 'lugar' ? 'Hacé clic en el lugar nuevo.' : 'Hacé clic donde va el centro del aula.');
      else borrar();
    });
    plano.detalle.append(f);
  });

  function aplicar(e) {
    const d = elegido.dato, c = e.target, v = c.value;
    if (['nombre', 'modelo', 'nota', 'estado', 'tipo', 'equipo', 'ip'].includes(c.name)) d[c.name] = v.trim();
    else if (c.name === 'corto') { if (v.trim()) d.corto = v.trim(); else delete d.corto; }
    else if (c.name === 'reservable') d.reservable = c.checked;
    else if (c.name === 'revisar') { if (c.checked) d.revisar = true; else delete d.revisar; }
    else if (c.name === 'capacidad') d.capacidad = v === '' ? null : Math.max(0, Math.round(+v));
    else if (v !== '' && isFinite(+v)) {
      if (elegido.tipo !== 'aula') d[c.name] = +v;
      else {
        const f = c.form, n = k => +f.elements[k].value;
        d.puntos = rectangulo([n('x'), n('y')], [n('x') + Math.max(1, n('ancho')), n('y') + Math.max(1, n('alto'))]);
      }
    }
    guardar();
    // El panel se rearma al pintar. Se espera a que el foco llegue al campo siguiente para devolvérselo.
    setTimeout(() => {
      const activo = document.activeElement;
      const enForm = activo && activo.form && activo.form.classList.contains('plano-form');
      const cual = !enForm ? null : activo.type === 'radio' ? `[name="${activo.name}"][value="${activo.value}"]`
        : activo.name ? `[name="${activo.name}"]` : `[data-hacer="${activo.dataset.hacer}"]`;
      plano.pintar();
      if (cual) { const n = plano.detalle.querySelector(cual); if (n) n.focus(); }
    }, 0);
  }
  function reubicar(p) {
    const d = elegido && elegido.dato;
    if (!d) return ponerModo(null);
    if (elegido.tipo !== 'aula') { d.x = redondo(p[0]); d.y = redondo(p[1]); d.planta = plano.planta; }
    else if (!d.puntos || d.puntos.length < 3) {
      // Estaba en la lista sin ubicar: aparece como un rectángulo, para ajustarlo con los campos
      d.puntos = rectangulo([redondo(p[0] - 25), redondo(p[1] - 15)], [redondo(p[0] + 25), redondo(p[1] + 15)]);
      d.planta = plano.planta;
    } else {
      const xs = d.puntos.map(q => q[0]), ys = d.puntos.map(q => q[1]);
      const dx = p[0] - (Math.min(...xs) + Math.max(...xs)) / 2, dy = p[1] - (Math.min(...ys) + Math.max(...ys)) / 2;
      d.puntos = d.puntos.map(q => [redondo(q[0] + dx), redondo(q[1] + dy)]);
    }
    guardar();
    ponerModo(null, 'Listo: quedó en el lugar nuevo.');
    plano.pintar();
  }
  function borrar() {
    const { tipo, dato } = elegido;
    confirmar(`¿Borrar ${dato.nombre || dato.id}?`, tipo === 'antena' ? 'La antena deja de aparecer en el plano.' : tipo === 'lugar' ? 'El punto de referencia deja de aparecer en el plano.' : 'El aula deja de aparecer en el plano. Su identificador puede estar en uso en las reservas.', 'Borrar')
      .then(si => {
        if (!si) return;
        const lista = tipo === 'antena' ? plano.datos.antenas : tipo === 'lugar' ? plano.datos.lugares : plano.datos.aulas;
        lista.splice(lista.indexOf(dato), 1);
        guardar();
        plano.elegir(null);
        decir(`Se borró ${dato.nombre || dato.id}.`);
      });
  }

  // --- Arranque ------------------------------------------------------------
  function huella(texto) {
    let h = 0;
    for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) | 0;
    return String(h);
  }
  function empezar(p) {
    plano = p;
    base = huella(JSON.stringify([plano.datos.antenas, plano.datos.aulas]));
    let viejo = false;
    try {
      const b = JSON.parse(localStorage.getItem(BORRADOR) || 'null');
      if (b && Array.isArray(b.antenas) && Array.isArray(b.aulas)) {
        viejo = b.base !== base;
        // Si lo publicado cambió después de empezar el borrador, manda lo publicado:
        // el borrador taparía lo nuevo (antenas precargadas, aulas corregidas). Se ofrece recuperarlo.
        if (viejo) borradorViejo = b;
        else { plano.datos.antenas = b.antenas; plano.datos.aulas = b.aulas; if (Array.isArray(b.lugares)) plano.datos.lugares = b.lugares; cambios = true; plano.pintar(); }
      }
    } catch (e) { /* borrador ilegible: se sigue con lo publicado */ }
    listarSinUbicar();
    boton('recuperar').hidden = !viejo;
    decir(viejo ? 'Hay un borrador anterior, hecho sobre datos que ya cambiaron. Estás viendo lo publicado. Si editás algo, ese borrador se pierde.'
      : cambios ? 'Se recuperó un borrador con cambios sin descargar.' : '');
  }
  // Con los datos dentro de la página, el plano puede estar listo antes de que cargue este archivo
  const ya = window.unpsjbPlanos && unpsjbPlanos.de(raiz);
  if (ya && ya.listo) { empezar(ya); if (ya.elegido) ya.pintar(); }
  else raiz.addEventListener('plano:listo', e => empezar(e.detail.plano));
})();
