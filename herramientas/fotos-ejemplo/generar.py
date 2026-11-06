"""Genera las fotos de ejemplo de las muestras (muestras/fotos-ejemplo/).

No son fotos de verdad: son paisajes de meseta dibujados por código, para que las
muestras tengan imágenes con el peso, el tamaño y la luz de una foto sin usar
fotos de terceros ni de la Sede. En una página real se reemplazan por fotos propias.

La de apertura tiene a propósito un cielo casi blanco: es el peor caso para el
texto blanco encima, y sirve para comprobar que la capa oscura alcanza (DESIGN.md, 17.E).

Uso:  python3 herramientas/fotos-ejemplo/generar.py
Requiere: Pillow (PIL).
"""
import os
import random
from PIL import Image, ImageDraw, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, '..', '..', 'muestras', 'fotos-ejemplo')
TOPE = 200 * 1024   # DESIGN.md, 2.C: cada foto, 200 KB como máximo

# Paletas: cielo arriba, cielo en el horizonte, y tres planos de meseta (del más lejano al más cercano)
PALETAS = {
    'mediodia':  ((214, 230, 245), (250, 251, 252), [(170, 160, 140), (150, 130, 100), (110, 92, 66)]),
    'tarde':     ((120, 160, 205), (236, 214, 178), [(160, 130, 110), (125, 98, 75), (82, 64, 48)]),
    'nublado':   ((176, 186, 198), (222, 226, 230), [(140, 140, 132), (112, 108, 96), (78, 74, 64)]),
    'amanecer':  ((70, 96, 150), (244, 186, 132), [(120, 96, 110), (88, 70, 80), (52, 42, 48)]),
    'invierno':  ((150, 180, 210), (232, 238, 244), [(200, 205, 210), (150, 150, 145), (96, 92, 84)]),
}


def cielo(ancho, alto, arriba, horizonte):
    img = Image.new('RGB', (ancho, alto))
    d = ImageDraw.Draw(img)
    for y in range(alto):
        t = y / max(alto - 1, 1)
        d.line([(0, y), (ancho, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(arriba, horizonte)))
    return img


def meseta(d, ancho, alto, base, color, rnd, escalon):
    """Un plano de meseta: una línea casi horizontal con escalones y bordes caídos."""
    puntos, x, y = [], 0, base
    while x <= ancho:
        puntos.append((x, y))
        x += rnd.randint(ancho // 40, ancho // 12)
        if rnd.random() < 0.25:
            y = base + rnd.randint(-escalon, escalon)
    puntos += [(ancho, y), (ancho, alto), (0, alto)]
    d.polygon(puntos, fill=color)


def edificio(d, ancho, alto, base, rnd):
    """Un edificio bajo y largo, para las fotos de la Sede."""
    x0 = int(ancho * rnd.uniform(0.18, 0.32))
    x1 = int(ancho * rnd.uniform(0.68, 0.86))
    techo = base - int(alto * 0.22)
    d.rectangle([x0, techo, x1, base], fill=(196, 190, 180))
    d.rectangle([x0, techo, x1, techo + int(alto * 0.03)], fill=(120, 116, 110))
    paso = max((x1 - x0) // 14, 12)
    for x in range(x0 + paso // 2, x1 - paso // 2, paso):
        for fila in range(2):
            y = techo + int(alto * (0.06 + fila * 0.07))
            d.rectangle([x, y, x + paso // 2, y + int(alto * 0.04)], fill=(70, 84, 100))
    puerta = (x0 + x1) // 2
    d.rectangle([puerta - paso // 2, base - int(alto * 0.08), puerta + paso // 2, base], fill=(60, 70, 84))


def foto(nombre, ancho, alto, paleta, semilla, con_edificio=False, sol=None):
    rnd = random.Random(semilla)
    arriba, horizonte, planos = PALETAS[paleta]
    img = cielo(ancho, alto, arriba, horizonte)
    d = ImageDraw.Draw(img)
    if sol:
        cx, cy, r = int(ancho * sol[0]), int(alto * sol[1]), int(min(ancho, alto) * 0.06)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 250, 236))
    for i, color in enumerate(planos):
        base = int(alto * (0.55 + i * 0.12))
        if con_edificio and i == 2:
            edificio(d, ancho, alto, base + int(alto * 0.02), rnd)
        meseta(d, ancho, alto, base, color, rnd, int(alto * 0.03))
    img = img.filter(ImageFilter.GaussianBlur(radius=max(ancho / 900, 0.6)))
    # Grano, como en una foto
    grano = Image.effect_noise((ancho, alto), 18).convert('RGB')
    img = Image.blend(img, grano, 0.05)
    ruta = os.path.join(SALIDA, nombre)
    calidad = 78
    while True:
        img.save(ruta, 'WEBP', quality=calidad, method=6)
        if os.path.getsize(ruta) <= TOPE or calidad <= 40:
            break
        calidad -= 6
    print(f'{nombre}: {ancho}x{alto}, {os.path.getsize(ruta) // 1024} KB')


os.makedirs(SALIDA, exist_ok=True)
# Apertura: dos anchos para srcset. Cielo casi blanco: el peor caso para el texto encima.
for ancho in (960, 1600):
    foto(f'apertura-{ancho}.webp', ancho, ancho * 9 // 20, 'mediodia', 1, con_edificio=True)
# Entradas de la portada (3:2)
foto('entrada-estudiar.webp', 640, 427, 'tarde', 2, sol=(0.78, 0.30))
foto('entrada-tramites.webp', 640, 427, 'nublado', 3, con_edificio=True)
foto('entrada-herramientas.webp', 640, 427, 'invierno', 4)
foto('entrada-sede.webp', 640, 427, 'amanecer', 5, con_edificio=True, sol=(0.2, 0.38))
# Novedades (16:9)
foto('novedad-1.webp', 640, 360, 'mediodia', 6, con_edificio=True)
foto('novedad-2.webp', 640, 360, 'tarde', 7, sol=(0.3, 0.32))
foto('novedad-3.webp', 640, 360, 'nublado', 8)
# Mitad foto, mitad texto (3:2: se recorta a los costados según el alto del texto)
foto('mitad-sede.webp', 960, 640, 'invierno', 9, con_edificio=True)
