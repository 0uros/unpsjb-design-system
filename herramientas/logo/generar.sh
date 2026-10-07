#!/usr/bin/env bash
# Genera las versiones web del logo de la Sede Trelew a partir del EPS original.
# La gaviota plana sale de herramientas/logo/gaviota-plana.svg (si cambia el EPS, correr antes
# ./logo/vectorizar.sh); la versión completa usa la foto original del EPS.
# Uso:  ./herramientas/logo/generar.sh "herramientas/logo/logo unpsjb_SEDE TW.eps"
# Salida: sistema/assets/logo-unpsjb-trelew.svg, sistema/assets/logo-unpsjb-trelew-blanco.svg (sin texto curvo),
#         sistema/assets/escudo-unpsjb-blanco.svg (solo el óvalo),
#         sistema/assets/logo-unpsjb-trelew-completo.svg (con el texto curvo, para usos grandes) y
#         sistema/assets/logo-unpsjb-trelew-una-tinta.svg (todo en negro, para impresión a una tinta)
# Requiere: ghostscript (gs), poppler (pdftocairo), ImageMagick (magick), python3.
set -euo pipefail
EPS="${1:?Falta el archivo EPS del logo}"
AQUI="$(cd "$(dirname "$0")" && pwd)"
cd "$AQUI/../.."
export TMPLOGO="$(mktemp -d)"
trap 'rm -rf "$TMPLOGO"' EXIT
mkdir -p sistema/assets

# 1. EPS -> PDF -> SVG (para leer los trazos vectoriales de los textos y la forma del óvalo)
gs -q -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=pdfwrite -sOutputFile="$TMPLOGO/logo.pdf" "$EPS"
pdftocairo -svg "$TMPLOGO/logo.pdf" "$TMPLOGO/logo.svg"
sed 's/xlink:href="data:[^"]*"/xlink:href="DATA"/' "$TMPLOGO/logo.svg" > "$TMPLOGO/logo-nodata.svg"
python3 - <<'PY'
import os, re
T = os.environ['TMPLOGO']
s = open(T + '/logo-nodata.svg').read()
open(T + '/oval.d', 'w').write(re.search(r'<clipPath id="clip-2">\s*<path clip-rule="nonzero" d="([^"]+)"', s).group(1))
PY

# 2. Versión completa: la gaviota es una foto en CMYK; se renderiza con Ghostscript (convierte bien el color)
#    y se recorta el rectángulo del óvalo (82.75 x 103.34 pt a 1200 dpi).
gs -q -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r1200 -sOutputFile="$TMPLOGO/logo-1200.png" "$EPS"
magick "$TMPLOGO/logo-1200.png" -crop 1379x1722+0+0 +repage "$TMPLOGO/oval-full.png"
magick "$TMPLOGO/oval-full.png" -resize x800 -strip -quality 88 -sampling-factor 4:4:4 "$TMPLOGO/oval-800.jpg"

# 3. Armar los SVG
python3 "$AQUI/armar.py"
