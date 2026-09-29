#!/usr/bin/env bash
# Vectoriza la gaviota del EPS (versión plana) y la guarda en logo/gaviota-plana.svg.
# Solo hace falta si cambia el EPS; después se corre logo/generar.sh.
# Uso:  ./logo/vectorizar.sh "logo unpsjb_SEDE TW.eps"
# Requiere: ghostscript (gs), ImageMagick (magick), python3. Las librerías de Python
# (numpy, pillow, potracer) se instalan solas la primera vez en ~/.cache/unpsjb-logo/
# (fuera del proyecto, para no copiarlas al servidor).
set -euo pipefail
EPS="${1:?Falta el archivo EPS del logo}"
AQUI="$(cd "$(dirname "$0")" && pwd)"
cd "$AQUI/.."
TMPV="$(mktemp -d)"
trap 'rm -rf "$TMPV"' EXIT

VENV="${XDG_CACHE_HOME:-$HOME/.cache}/unpsjb-logo/venv"
if [ ! -x "$VENV/bin/python" ]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q --disable-pip-version-check numpy pillow potracer
fi

# La foto del óvalo a 1200 dpi (82.75 x 103.34 pt)
gs -q -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r1200 -sOutputFile="$TMPV/logo-1200.png" "$EPS"
magick "$TMPV/logo-1200.png" -crop 1379x1722+0+0 +repage "$TMPV/oval.png"

"$VENV/bin/python" "$AQUI/vectorizar.py" "$TMPV/oval.png" "$AQUI/gaviota-plana.svg"
