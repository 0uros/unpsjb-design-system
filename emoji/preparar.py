"""Prepara los SVG de Twemoji para construir la fuente "Twemoji UNPSJB".

Uso: python3 preparar.py <carpeta assets/svg de jdecked/twemoji> <emoji-test.txt> <salida>

Twemoji nombra sus archivos quitando el selector de variante FE0F cuando
el emoji no tiene ZWJ (200D). Pero al escribir, los teclados suelen mandar
la secuencia con FE0F. Para que la fuente reconozca las dos formas, se crea
una entrada por cada forma de escritura que lista Unicode en emoji-test.txt.
"""
import os, re, shutil, sys

svg_dir, test_file, out_dir = sys.argv[1:4]
limite = int(sys.argv[4]) if len(sys.argv) > 4 else None

archivos = {f[:-4]: os.path.join(svg_dir, f) for f in os.listdir(svg_dir) if f.endswith(".svg")}

def clave_twemoji(cps):
    # Misma regla que twemoji.parse: sin ZWJ, se quita FE0F
    if "200d" not in cps:
        cps = [c for c in cps if c != "fe0f"]
    return "-".join(cps)

secuencias = {}
for linea in open(test_file, encoding="utf-8"):
    m = re.match(r"^([0-9A-F ]+?)\s*;\s*(fully-qualified|minimally-qualified|unqualified)", linea)
    if not m:
        continue
    cps = [c.lower().lstrip("0") or "0" for c in m.group(1).split()]
    # Un solo carácter + FE0F: alcanza con el carácter base (el navegador
    # ignora el FE0F sobrante), así no se duplica el dibujo.
    if len(cps) == 2 and cps[1] == "fe0f":
        cps = cps[:1]
    clave = clave_twemoji(cps)
    if clave in archivos:
        secuencias["_".join(cps)] = archivos[clave]

# Archivos de Twemoji que no están en la lista de Unicode (por ejemplo,
# versiones propias): se incluyen con su nombre tal cual.
for clave, ruta in archivos.items():
    secuencias.setdefault(clave.replace("-", "_"), ruta)

if os.path.exists(out_dir):
    shutil.rmtree(out_dir)
os.makedirs(out_dir)
items = sorted(secuencias.items())
if limite:
    items = items[:limite]
for seq, ruta in items:
    # Los emojis de texto como © ® ™ y los dígitos sueltos no se incluyen:
    # la fuente no debe reemplazar letras ni números comunes.
    cps = seq.split("_")
    if len(cps) == 1 and int(cps[0], 16) < 0x2000 and cps[0] not in ("a9", "ae"):
        continue
    shutil.copy(ruta, os.path.join(out_dir, f"emoji_u{seq}.svg"))
print(len(os.listdir(out_dir)), "archivos preparados de", len(archivos), "SVG de Twemoji")
