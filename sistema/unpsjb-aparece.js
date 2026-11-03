/* ==========================================================================
   unpsjb-aparece.js — Aparecer al entrar en pantalla · sin número todavía
   Sistema de Diseño Digital UNPSJB. Reglas: DESIGN.md, 5.E y 17.E.

   Solo en páginas públicas. Cada franja con .aparece aparece una vez al llegar a
   la pantalla (los estilos están en unpsjb.css). Se carga con defer:

     <script src="../sistema/unpsjb-aparece.js" defer></script>

   Solo esconde lo que va a poder mostrar: sin IntersectionObserver o con
   "reducir movimiento" no hace nada y la página queda quieta. Lo que ya se ve al
   cargar se marca visible antes de esconder nada, así no se anima.
   ========================================================================== */
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const franjas = [...document.querySelectorAll('.aparece')];
  if (!franjas.length) return;
  for (const f of franjas) if (f.getBoundingClientRect().top < innerHeight) f.classList.add('aparece--visible');
  document.documentElement.classList.add('aparece-js');
  const mirar = new IntersectionObserver(entradas => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('aparece--visible');
      mirar.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  for (const f of franjas) if (!f.classList.contains('aparece--visible')) mirar.observe(f);
})();
