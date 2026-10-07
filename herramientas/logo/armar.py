"""Arma los SVG del logo (ver herramientas/logo/generar.sh). Lee los archivos intermedios de $TMPLOGO.

Desde la sesión 11 la gaviota de las versiones web es la PLANA y vectorial
(herramientas/logo/gaviota-plana.svg, hecha con herramientas/logo/vectorizar.sh): óvalo azul, gaviota blanca,
puntas oscuras y pico amarillo. La versión completa conserva la foto original.

Desde la sesión 9 las versiones web van SIN el texto curvo ("Universidad Nacional
de la Patagonia San Juan Bosco"): a 48px no se lee. La barra y "Sede Trelew" se
acercan al óvalo y la barra queda centrada con él. La versión completa, con el
texto, se genera aparte para usos grandes (impresos, carteles)."""
import re, os, base64
T = os.environ['TMPLOGO']
src = open(T + '/logo-nodata.svg').read()
oval_d = open(T + '/oval.d').read()
defs_extra = re.findall(r'<clipPath id="clip-[34]">.*?</clipPath>', src, re.S)
body = src.split('</defs>', 1)[1].rsplit('</svg>', 1)[0]
# quitar el bloque de la imagen original y el grupo vacío
body = re.sub(r'<g clip-path="url\(#clip-1\)">.*?</g>\s*</g>', '@@OVALO@@', body, flags=re.S)
body = re.sub(r'<g clip-path="url\(#clip-0\)">\s*</g>', '', body)
GRIS_TEXTO = 'rgb(23.181152%, 22.824097%, 21.058655%)'   # barra + "Sede Trelew"
GRIS_CURVO = 'rgb(13.729858%, 12.159729%, 12.548828%)'   # texto curvo

# Medidas del original (puntos del EPS)
OVALO_ANCHO, OVALO_ALTO = 82.75, 103.33
BARRA_X, BARRA_ANCHO, BARRA_Y1, BARRA_Y2 = 103.32, 2.5, 9.13, 110.33
TEXTO_X, TEXTO_FIN = 120.05, 223.46   # "Sede Trelew", de punta a punta
# Versión compacta: el aire óvalo→barra igual al aire barra→texto
AIRE = TEXTO_X - (BARRA_X + BARRA_ANCHO)
DX = (OVALO_ANCHO + AIRE) - BARRA_X
DY = OVALO_ALTO / 2 - (BARRA_Y1 + BARRA_Y2) / 2

AZUL_OVALO = '#347ebb'
gaviota = re.findall(r'<path [^>]*/>', open(os.path.join(os.path.dirname(__file__), 'gaviota-plana.svg')).read())

def ovalo_plano(tinta=None):
    """El óvalo con la gaviota plana. Con `tinta`, la versión a una tinta: el óvalo
    en ese color y toda la gaviota (cuerpo, puntas y pico) en blanco, sin gris ni amarillo."""
    if tinta:
        silueta = [re.sub(r'fill="#[0-9a-f]{6}"', 'fill="#ffffff"', p) for p in gaviota]
        return f'<path fill="{tinta}" d="{oval_d}"/>\n' + '\n'.join(silueta) + '\n'
    return f'<path fill="{AZUL_OVALO}" d="{oval_d}"/>\n' + '\n'.join(gaviota) + '\n'

def img(jpg):
    b64 = base64.b64encode(open(jpg, 'rb').read()).decode()
    return (f'<image x="0" y="0.02" width="82.75" height="103.32" preserveAspectRatio="none" '
            f'clip-path="url(#ovalo)" href="data:image/jpeg;base64,{b64}"/>')

def marca():
    """Solo la barra y "Sede Trelew", sin los recortes del EPS."""
    paths = re.findall(r'<path[^>]*fill="' + re.escape(GRIS_TEXTO) + r'"[^>]*/>', body)
    return '\n'.join(paths)

def armar(nombre, titulo, jpg, color_texto, color_curvo=None, forma='compacto', tinta=None):
    if forma == 'completo':
        b = body.replace('@@OVALO@@', img(jpg))
        b = b.replace(GRIS_CURVO, color_curvo)
        # clip-0 no está en el EPS convertido: se deja el trazo sin recorte
        b = re.sub(r'<g clip-path="url\(#clip-0\)">\s*(.*?)\s*</g>', r'\1', b, flags=re.S)
        defs = '\n'.join(defs_extra)
        vb = '0 0 224.23 112.66'
    elif forma == 'compacto':
        b = (ovalo_plano(tinta) + f'<g transform="translate({DX:.2f} {DY:.2f})">\n' + marca() + '\n</g>\n')
        defs = ''
        vb = f'0 0 {TEXTO_FIN + DX + 0.8:.2f} {OVALO_ALTO}'
    else:   # escudo: solo el óvalo
        b = ovalo_plano(tinta)
        defs = ''
        vb = f'0 0 {OVALO_ANCHO} {OVALO_ALTO}'
    b = b.replace(GRIS_TEXTO, color_texto)
    b = re.sub(r' fill-opacity="1"| fill-rule="nonzero"', '', b)
    b = re.sub(r'\n\s*\n', '\n', b)
    recorte = (f'<defs>\n<clipPath id="ovalo"><path d="{oval_d}"/></clipPath>\n' + defs + '\n</defs>\n'
               if forma == 'completo' else '')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="t">\n'
           f'<title id="t">{titulo}</title>\n' + recorte + b + '</svg>\n')
    svg = re.sub(r'(\d+\.\d{2})\d+', r'\1', svg)  # la foto en base64 no tiene puntos
    open(nombre, 'w').write(svg)
    print(nombre, len(svg), 'bytes')

t = 'Universidad Nacional de la Patagonia San Juan Bosco, Sede Trelew'
armar('sistema/assets/logo-unpsjb-trelew.svg', t, None, '#3b3a36')
armar('sistema/assets/logo-unpsjb-trelew-blanco.svg', t, None, '#ffffff')
armar('sistema/assets/escudo-unpsjb-blanco.svg', 'Universidad Nacional de la Patagonia San Juan Bosco', None, '#ffffff', forma='escudo')
armar('sistema/assets/logo-unpsjb-trelew-completo.svg', t, T + '/oval-800.jpg', '#3b3a36', '#231f20', forma='completo')
# A una tinta (documentos impresos en negro, sellos): óvalo, barra y "Sede Trelew" en negro
armar('sistema/assets/logo-unpsjb-trelew-una-tinta.svg', t, None, '#000000', tinta='#000000')
