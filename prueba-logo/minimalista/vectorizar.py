"""PRUEBA: gaviota minimalista y vectorial a partir de la foto del EPS.

1. Separa por color: cuerpo (todo lo que no es azul), puntas oscuras de las alas,
   pico y patas amarillos.
2. Suaviza cada máscara (desenfoque + umbral) para borrar el detalle de las plumas.
3. La vectoriza con potrace y arma los SVG con la barra y "Sede Trelew" de assets/.

Uso (desde la carpeta del proyecto):
  python3 -m venv /tmp/venv && /tmp/venv/bin/pip install numpy pillow potracer
  gs -q -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r1200 \
     -sOutputFile=/tmp/logo-1200.png "logo unpsjb_SEDE TW.eps"
  magick /tmp/logo-1200.png -crop 1379x1722+0+0 +repage /tmp/oval.png
  /tmp/venv/bin/python prueba-logo/minimalista/vectorizar.py /tmp/oval.png
"""
import re, sys
import numpy as np
from PIL import Image, ImageFilter
import potrace

SALIDA = 'prueba-logo/minimalista/'
AZUL_OVALO = '#347ebb'
OSCURO = '#4e4d49'
AMARILLO = '#eab645'
TRABAJO = 400          # alto en px al que se reduce antes de suavizar

a = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
h, w, _ = a.shape
s = w / 82.75                                   # px por punto del EPS
r, cx, y1, y2 = 41.37 * s, 41.37 * s, 41.39 * s, 61.96 * s
Y, X = np.mgrid[0:h, 0:w]
dentro = ((X - cx) ** 2 + (Y - np.clip(Y, y1, y2)) ** 2) <= (r - 6) ** 2
R, G, B = a[..., 0], a[..., 1], a[..., 2]
azul = (B > R + 50) & (B > G + 10)
lum = 0.299 * R + 0.587 * G + 0.114 * B
gaviota = dentro & ~azul
oscuro = gaviota & (lum < 110)
amarillo = gaviota & (R > 170) & (G > 120) & (B < 110) & (R - B > 90)
# solo el pico (a la izquierda): las patas a este tamaño son dos rayitas sueltas
amarillo &= X < 0.45 * w

def suavizar(m, radio, umbral=0.5):
    """Reduce, desenfoca y vuelve a cortar: cuanto más radio, menos detalle."""
    img = Image.fromarray((m * 255).astype(np.uint8))
    img = img.resize((round(w * TRABAJO / h), TRABAJO), Image.LANCZOS)
    img = img.filter(ImageFilter.GaussianBlur(radio))
    return np.asarray(img) > umbral * 255

def trazar(m, suciedad=40):
    """Máscara -> 'd' de un path SVG en coordenadas del EPS (evenodd para huecos)."""
    esc = 82.75 / m.shape[1]
    # potracer rellena lo "oscuro" (False): se invierte la máscara
    p = potrace.Bitmap(~m).trace(turdsize=suciedad, alphamax=1.2, opticurve=True, opttolerance=0.6)
    f = lambda pt: f'{pt.x * esc:.2f} {pt.y * esc:.2f}'
    d = []
    for c in p:
        d.append('M' + f(c.start_point))
        for seg in c.segments:
            if seg.is_corner:
                d.append('L' + f(seg.c) + ' L' + f(seg.end_point))
            else:
                d.append('C' + f(seg.c1) + ' ' + f(seg.c2) + ' ' + f(seg.end_point))
        d.append('Z')
    return ' '.join(d)

# Rellenar huecos chicos del cuerpo (sombras grises de las plumas) antes de suavizar
cuerpo = suavizar(gaviota, 2.2)
puntas = suavizar(oscuro, 2.0, 0.45)
pico = suavizar(amarillo, 1.2, 0.3)

d_cuerpo = trazar(cuerpo, 60)
d_puntas = trazar(puntas, 400)   # sin la mancha de la cola: solo las puntas de las alas
d_pico = trazar(pico, 8)

oval_d = re.search(r'<clipPath id="ovalo"><path d="([^"]+)"', open('assets/logo-unpsjb-trelew.svg').read()).group(1)
marca = re.search(r'<g transform=.*?</g>', open('assets/logo-unpsjb-trelew.svg').read(), re.S).group(0)
TITULO = 'Universidad Nacional de la Patagonia San Juan Bosco, Sede Trelew'

def ovalo(nivel):
    capas = [f'<path fill="{AZUL_OVALO}" d="{oval_d}"/>',
             f'<path fill="#ffffff" fill-rule="evenodd" d="{d_cuerpo}"/>']
    if nivel == 'plano':
        capas += [f'<path fill="{OSCURO}" fill-rule="evenodd" d="{d_puntas}"/>',
                  f'<path fill="{AMARILLO}" fill-rule="evenodd" d="{d_pico}"/>']
    return '\n'.join(capas)

def escribir(nombre, nivel, con_marca, color_marca='#3b3a36'):
    vb = '0 0 217.92 103.33' if con_marca else '0 0 82.75 103.33'
    cuerpo = ovalo(nivel)
    if con_marca:
        cuerpo += '\n' + marca.replace('#3b3a36', color_marca)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="t">\n'
           f'<title id="t">{TITULO}</title>\n{cuerpo}\n</svg>\n')
    open(SALIDA + nombre, 'w').write(svg)
    print(nombre, round(len(svg) / 1024, 1), 'KB')

for nivel in ('plano', 'mono'):
    escribir(f'escudo-{nivel}.svg', nivel, False)
    escribir(f'logo-{nivel}-color.svg', nivel, True)
    escribir(f'logo-{nivel}-blanco.svg', nivel, True, '#ffffff')
