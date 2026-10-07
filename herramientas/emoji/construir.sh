#!/usr/bin/env bash
# Construye la fuente "Twemoji UNPSJB" (sistema/fonts/TwemojiUNPSJB.woff2) a partir
# de los SVG de jdecked/twemoji, el fork mantenido de los emojis de Twitter.
#
# Uso:   ./herramientas/emoji/construir.sh 17.0.3 17.0.0
#        (versión de Twemoji y versión de Unicode que cubre)
# Cuándo: cada vez que jdecked/twemoji publique una versión nueva
#        (https://github.com/jdecked/twemoji/releases).
# Requiere: git, curl, python3 y conexión a internet. Tarda unos minutos.
set -euo pipefail

TWEMOJI="${1:?Falta la versión de Twemoji, ej.: 17.0.3}"
UNICODE="${2:?Falta la versión de Unicode, ej.: 17.0.0}"
AQUI="$(cd "$(dirname "$0")" && pwd)"
DESTINO="$AQUI/../../sistema/fonts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "1/5 Preparando herramientas (nanoemoji)…"
python3 -m venv "$TMP/venv"
"$TMP/venv/bin/pip" install -q nanoemoji ninja brotli
export PATH="$TMP/venv/bin:$PATH"

echo "2/5 Bajando los SVG de Twemoji $TWEMOJI…"
git clone -q --depth 1 --filter=blob:none --sparse --branch "v$TWEMOJI" \
  https://github.com/jdecked/twemoji.git "$TMP/tw"
git -C "$TMP/tw" sparse-checkout set --no-cone /assets/svg/

echo "3/5 Bajando la lista oficial de emojis de Unicode $UNICODE…"
curl -sfL -o "$TMP/emoji-test.txt" "https://unicode.org/Public/$UNICODE/emoji/emoji-test.txt"

echo "4/5 Preparando y compilando la fuente (tarda)…"
python3 "$AQUI/preparar.py" "$TMP/tw/assets/svg" "$TMP/emoji-test.txt" "$TMP/prep"
(cd "$TMP/prep" && nanoemoji --color_format glyf_colr_0 --family "Twemoji UNPSJB" \
  --output_file TwemojiUNPSJB.ttf --build_dir "$TMP/build" ./*.svg > "$TMP/build.log" 2>&1)

echo "5/5 Comprimiendo a woff2…"
"$TMP/venv/bin/python3" - "$TMP/build/TwemojiUNPSJB.ttf" "$DESTINO/TwemojiUNPSJB.woff2" <<'PY'
import sys
from fontTools.ttLib import TTFont
f = TTFont(sys.argv[1])
f.flavor = "woff2"
f.save(sys.argv[2])
cps = sorted(c for c in f.getBestCmap() if c > 0x7F or c in (0x23, 0x2A) or 0x30 <= c <= 0x39)
# unicode-range para @font-face: la fuente solo se descarga si la página tiene emojis
rangos, ini, fin = [], cps[0], cps[0]
for c in cps[1:]:
    if c == fin + 1: fin = c
    else: rangos.append((ini, fin)); ini = fin = c
rangos.append((ini, fin))
print("unicode-range:", ", ".join(f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}" for a, b in rangos))
PY
ls -la "$DESTINO/TwemojiUNPSJB.woff2"
echo "Listo. Si cambió la línea unicode-range de arriba, copiala en el @font-face de unpsjb.css."
