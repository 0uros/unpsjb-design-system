"""PRUEBA: versiones del logo sin el texto curvo "Universidad Nacional de la
Patagonia San Juan Bosco". Parte de sistema/assets/logo-unpsjb-trelew.svg (ahí el texto
curvo tiene su propio color, #231f20) y de la foto liviana de la versión blanca.
Uso: python3 herramientas/prueba-logo/armar_sin_texto.py  (desde la carpeta del proyecto)"""
import re

color = open('sistema/assets/logo-unpsjb-trelew.svg').read()
blanco = open('sistema/assets/logo-unpsjb-trelew-blanco.svg').read()
img_liviana = re.search(r'<image [^>]*/>', blanco).group(0)

# 1. Quitar el texto curvo y los recortes que solo usaba él
s = re.sub(r'<path fill="#231f20"[^>]*/>\s*', '', color)
# los recortes clip-N del EPS solo encuadraban letras: no hacen falta
s = re.sub(r'<clipPath id="clip-\d">.*?</clipPath>\s*', '', s, flags=re.S)

imagen = re.search(r'<image [^>]*/>', s).group(0)
marca = re.findall(r'<path fill="#3b3a36"[^>]*/>', s)   # barra + "Sede Trelew"
cabeza = s.split('</defs>', 1)[0] + '</defs>\n'
TITULO = 'Universidad Nacional de la Patagonia San Juan Bosco, Sede Trelew'

# Medidas del original (puntos del EPS)
OVALO_ANCHO, OVALO_ALTO = 82.75, 103.33
BARRA_X, BARRA_Y1, BARRA_Y2 = 103.32, 9.13, 110.33
TEXTO_X = 120.05          # donde empieza "Sede Trelew"
TEXTO_FIN = 223.46        # donde termina "Trelew"

def svg(nombre, vb, cuerpo, img, texto):
    out = re.sub(r'viewBox="[^"]*"', f'viewBox="{vb}"', cabeza)
    out = out.replace('#3b3a36', texto)
    cuerpo = cuerpo.replace('#3b3a36', texto)
    open(f'herramientas/prueba-logo/{nombre}', 'w').write(out + img + '\n' + cuerpo + '\n</svg>\n')
    print(nombre, len(out + img + cuerpo) // 1024, 'KB')

# A. Mismo lugar: solo se quita el texto
a = '\n'.join(marca)
vb_a = f'0 0 {TEXTO_FIN + 0.8:.2f} {BARRA_Y2 + 0.5:.2f}'
svg('logo-a-color.svg', vb_a, a, imagen, '#3b3a36')
svg('logo-a-blanco.svg', vb_a, a, img_liviana, '#ffffff')

# B. Compacto: el aire óvalo→barra igual al aire barra→texto, y la barra
#    centrada en la altura del óvalo
aire = TEXTO_X - (BARRA_X + 2.5)
dx = (OVALO_ANCHO + aire) - BARRA_X
dy = OVALO_ALTO / 2 - (BARRA_Y1 + BARRA_Y2) / 2
b = f'<g transform="translate({dx:.2f} {dy:.2f})">\n' + a + '\n</g>'
vb_b = f'0 0 {TEXTO_FIN + dx + 0.8:.2f} {OVALO_ALTO:.2f}'
svg('logo-b-color.svg', vb_b, b, imagen, '#3b3a36')
svg('logo-b-blanco.svg', vb_b, b, img_liviana, '#ffffff')

# Escudo solo (celular): el óvalo sin texto
svg('escudo-sin-texto.svg', f'0 0 {OVALO_ANCHO} {OVALO_ALTO}', '', img_liviana, '#ffffff')
