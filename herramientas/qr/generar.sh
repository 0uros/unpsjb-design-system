#!/usr/bin/env bash
# Genera un código QR como SVG, para la cartelera (unpsjb-cartelera.css) y para
# el pie de verificación de los documentos (unpsjb-documentos.css).
# Uso:  ./herramientas/qr/generar.sh "https://direccion-a-codificar" sistema/assets/qr-cartelera.svg "Agenda de hoy en tu celular"
#       El tercer dato (opcional) es el texto que lee el lector de pantalla.
#
# Reglas (DESIGN.md, secciones 18.E y 20.D):
# - Siempre negro sobre blanco, con su margen blanco de 4 módulos: así lo leen
#   todas las cámaras, también con la página en modo oscuro.
# - La dirección, lo más corta posible: cuanto más corta, más grandes los cuadraditos.
# - Al lado del QR va siempre la dirección escrita, para quien no puede escanear.
#
# La primera vez instala la librería segno (libre, sin dependencias) en
# ~/.cache/unpsjb-qr/venv, fuera del proyecto para no copiarla al servidor.
# Requiere: python3.
set -euo pipefail
URL="${1:?Falta la dirección a codificar}"
SALIDA="${2:?Falta el archivo de salida (.svg)}"
TITULO="${3:-Código QR: $URL}"
VENV="$HOME/.cache/unpsjb-qr/venv"
if [ ! -x "$VENV/bin/python" ]; then
  python3 -m venv "$VENV"
  "$VENV/bin/python" -m pip install --quiet "segno>=1.6,<2"
fi
QR_URL="$URL" QR_SALIDA="$SALIDA" QR_TITULO="$TITULO" "$VENV/bin/python" - <<'PY'
import os, html, segno
url, salida, titulo = os.environ['QR_URL'], os.environ['QR_SALIDA'], os.environ['QR_TITULO']
# Corrección de errores M (15 %): el equilibrio entre tamaño y tolerancia a reflejos.
qr = segno.make(url, error='m', micro=False, boost_error=False)
borde = 4                                   # margen blanco obligatorio, en módulos
lado = qr.symbol_size(border=borde)[0]
tramos = []
for y, fila in enumerate(qr.matrix):
    x = 0
    while x < len(fila):                    # un rectángulo por cada tramo de módulos negros
        if fila[x]:
            fin = x
            while fin < len(fila) and fila[fin]:
                fin += 1
            tramos.append(f'M{x + borde} {y + borde}h{fin - x}v1h-{fin - x}z')
            x = fin
        else:
            x += 1
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lado} {lado}" role="img" '
       f'aria-labelledby="t" shape-rendering="crispEdges">\n'
       f'<title id="t">{html.escape(titulo)}</title>\n'
       f'<rect width="{lado}" height="{lado}" fill="#ffffff"/>\n'
       f'<path fill="#000000" d="{"".join(tramos)}"/>\n</svg>\n')
open(salida, 'w').write(svg)
print(f'{salida}: versión {qr.version}, {lado - 2 * borde} módulos por lado '
      f'({lado} con el margen), {len(svg)} bytes')
PY
