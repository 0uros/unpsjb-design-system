// Captura y mide las páginas de referencia (UNC y UBA) con Chrome sin ventana.
// Uso: node medir.js <carpeta de salida> <axe.min.js>
const { chromium } = require('/home/agustin/Documents/antigravity/charming-bohr/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

const SALIDA = process.argv[2];
const AXE = fs.readFileSync(process.argv[3], 'utf8');

const PAGINAS = {
  unc: {
    portada: 'https://www.unc.edu.ar/',
    noticia: 'https://www.unc.edu.ar/comunicaci%C3%B3n/la-unc-pone-en-marcha-una-aceleradora-para-internacionalizar-el-curr%C3%ADculo',
    noticias: 'https://www.unc.edu.ar/noticias',
    listado: 'https://www.unc.edu.ar/acad%C3%A9micas/facultades-de-la-unc',
    perfil: 'https://www.unc.edu.ar/estudiantes',
    tramite: 'https://www.unc.edu.ar/vida-estudiantil/becas-0',
  },
  uba: {
    portada: 'https://www.uba.ar/',
    noticia: 'https://www.uba.ar/ubanoticias/noticias/1385',
    noticias: 'https://www.uba.ar/ubanoticias/home',
    listado: 'https://www.uba.ar/facultades',
    perfil: 'https://www.uba.ar/ingresouba',
    tramite: 'https://www.uba.ar/tramites',
  },
};
const ANCHOS = [1280, 390, 320];

function medir() {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const els = [...document.querySelectorAll('body *')].filter(vis);
  const cnt = (o, k) => { o[k] = (o[k] || 0) + 1; };
  const bg = {}, fg = {}, bd = {}, ff = {}, fs = {}, rad = {}, sh = {}, grad = {};
  for (const e of els) {
    const s = getComputedStyle(e);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') cnt(bg, s.backgroundColor);
    if (s.backgroundImage.includes('gradient')) cnt(grad, s.backgroundImage.slice(0, 100));
    const txt = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (txt) {
      cnt(fg, s.color);
      cnt(ff, s.fontFamily.split(',')[0].replace(/"/g, '').trim());
      cnt(fs, s.fontSize + '/' + s.fontWeight + '/' + s.lineHeight);
    }
    if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') cnt(bd, s.borderTopWidth + ' ' + s.borderTopColor);
    if (s.borderRadius !== '0px') cnt(rad, s.borderRadius);
    if (s.boxShadow !== 'none') cnt(sh, s.boxShadow.slice(0, 90));
  }
  const top = (o, n = 12) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map((x) => x[0] + '  x' + x[1]);
  const caja = (sel) => {
    const e = document.querySelector(sel); if (!e) return null;
    const s = getComputedStyle(e); const r = e.getBoundingClientRect();
    return { alto: Math.round(r.height), ancho: Math.round(r.width), pos: s.position, fondo: s.backgroundColor };
  };
  // Párrafo más largo: tamaño, interlineado y ancho de renglón
  const ps = [...document.querySelectorAll('p')].filter(vis).sort((a, b) => b.innerText.length - a.innerText.length);
  let parrafo = null;
  if (ps[0]) {
    const s = getComputedStyle(ps[0]);
    const ancho = ps[0].getBoundingClientRect().width;
    parrafo = { tam: s.fontSize, inter: s.lineHeight, color: s.color, familia: s.fontFamily.split(',')[0], ancho: Math.round(ancho), caracteresPorRenglon: Math.round(ancho / (parseFloat(s.fontSize) * 0.5)) };
  }
  const fijos = els.filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position))
    .map((e) => e.tagName + '.' + [...e.classList].slice(0, 2).join('.') + ' ' + Math.round(e.getBoundingClientRect().height) + 'px').slice(0, 8);
  const inter = [...document.querySelectorAll('a,button,input,select,textarea,[role=button],[tabindex]')].filter(vis);
  return {
    elementos: els.length,
    colores: { fondos: Object.keys(bg).length, textos: Object.keys(fg).length },
    fondos: top(bg), textos: top(fg), bordes: top(bd, 6), degradados: top(grad, 6),
    familias: top(ff, 6), tamanios: top(fs, 16), radios: top(rad, 8), sombras: top(sh, 6),
    tamaniosDistintos: new Set(Object.keys(fs).map((k) => k.split('/')[0])).size,
    header: caja('header') || caja('#header') || caja('.navbar'),
    nav: caja('nav'), footer: caja('footer') || caja('#footer'),
    fijos, parrafo,
    h: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map((x) => x.tagName).join(' ').slice(0, 300),
    h1: document.querySelectorAll('h1').length,
    lang: document.documentElement.lang,
    landmarks: [...document.querySelectorAll('header,nav,main,footer,aside,[role=main],[role=navigation],[role=banner],[role=search]')].filter(vis).map((e) => e.tagName.toLowerCase()).join(' '),
    saltar: !!([...document.querySelectorAll('a[href^="#"]')].find((a) => /saltar|skip|ir al contenido|contenido principal/i.test(a.textContent))),
    enlacesMenu: document.querySelectorAll('nav a, header a').length,
    interactivos: inter.length,
    chicos: inter.filter((e) => { const r = e.getBoundingClientRect(); return r.width < 24 || r.height < 24; }).length,
    imgs: document.querySelectorAll('img').length,
    imgsSinAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    scrollW: document.documentElement.scrollWidth, innerW: innerWidth, altoPagina: document.documentElement.scrollHeight,
    viewport: (document.querySelector('meta[name=viewport]') || {}).content || null,
    varsCss: [...document.styleSheets].flatMap((ss) => { try { return [...ss.cssRules]; } catch (e) { return []; } })
      .filter((r) => r.selectorText === ':root').map((r) => r.style.length).reduce((a, b) => a + b, 0),
  };
}

(async () => {
  const navegador = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const todo = {};
  for (const [sitio, paginas] of Object.entries(PAGINAS)) {
    fs.mkdirSync(path.join(SALIDA, sitio), { recursive: true });
    todo[sitio] = {};
    for (const [nombre, url] of Object.entries(paginas)) {
      todo[sitio][nombre] = { url };
      for (const ancho of ANCHOS) {
        const ctx = await navegador.newContext({
          viewport: { width: ancho, height: ancho === 1280 ? 800 : 780 },
          deviceScaleFactor: 1, isMobile: ancho < 500, hasTouch: ancho < 500, locale: 'es-AR',
          userAgent: ancho < 500
            ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'
            : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        });
        const pag = await ctx.newPage();
        const red = { pedidos: 0, bytes: 0, porTipo: {} };
        pag.on('response', async (r) => {
          red.pedidos++;
          const t = r.request().resourceType();
          let n = Number(r.headers()['content-length'] || 0);
          if (!n) { try { n = (await r.body()).length; } catch (e) { n = 0; } }
          red.bytes += n; red.porTipo[t] = (red.porTipo[t] || 0) + n;
        });
        const r = { ancho };
        try {
          const resp = await pag.goto(url, { waitUntil: 'load', timeout: 60000 });
          r.http = resp && resp.status();
          await pag.waitForTimeout(2500);
          // Recorrer la página para que carguen las imágenes diferidas
          await pag.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((f) => setTimeout(f, 120)); } scrollTo(0, 0); });
          await pag.waitForTimeout(800);
          r.titulo = await pag.title();
          r.medidas = await pag.evaluate(medir);
          r.red = { pedidos: red.pedidos, kB: Math.round(red.bytes / 1024), porTipoKB: Object.fromEntries(Object.entries(red.porTipo).map(([k, v]) => [k, Math.round(v / 1024)])) };
          await pag.screenshot({ path: path.join(SALIDA, sitio, `${nombre}-${ancho}.jpg`), fullPage: true, type: 'jpeg', quality: 62 });
          await pag.screenshot({ path: path.join(SALIDA, sitio, `${nombre}-${ancho}-arriba.jpg`), fullPage: false, type: 'jpeg', quality: 75 });
          if (ancho !== 320) {
            await pag.evaluate(AXE);
            const ax = await pag.evaluate(async () => {
              const res = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
              return res.violations.map((v) => ({ id: v.id, impacto: v.impact, nodos: v.nodes.length, ayuda: v.help, tags: v.tags.filter((t) => /^wcag\d|best/.test(t)).join(','), ej: v.nodes.slice(0, 2).map((n) => n.html.slice(0, 140)) }));
            });
            r.axe = ax;
          }
          if (ancho === 1280) {
            // Foco: avanzar con Tab y ver si el elemento enfocado tiene alguna marca visible
            const foco = [];
            for (let i = 0; i < 12; i++) {
              await pag.keyboard.press('Tab');
              foco.push(await pag.evaluate(() => {
                const e = document.activeElement; if (!e || e === document.body) return null;
                const s = getComputedStyle(e);
                return { el: e.tagName.toLowerCase() + '.' + [...e.classList].slice(0, 1).join(''), texto: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 30), contorno: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 ? s.outlineWidth + ' ' + s.outlineColor : 'no', sombra: s.boxShadow !== 'none' };
              }));
            }
            r.foco = foco;
          }
        } catch (e) { r.error = String(e).slice(0, 300); }
        todo[sitio][nombre]['a' + ancho] = r;
        await ctx.close();
        console.log(sitio, nombre, ancho, r.error ? 'ERROR ' + r.error : 'ok', r.red ? r.red.kB + ' kB' : '', r.axe ? r.axe.length + ' reglas axe' : '');
      }
    }
  }
  fs.writeFileSync(path.join(SALIDA, 'medidas.json'), JSON.stringify(todo, null, 1));
  await navegador.close();
})();
