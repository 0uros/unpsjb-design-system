#!/usr/bin/env bash
# Arma skill/design-md-unpsjb/ desde DESIGN.md y diseno/.
# Se corre desde la raíz del proyecto: bash herramientas/skill/armar.sh
# Después hay que volver a subir la carpeta como skill en claude.ai.
set -euo pipefail

raiz="$(cd "$(dirname "$0")/../.." && pwd)"
destino="$raiz/skill/design-md-unpsjb"

[ -f "$raiz/DESIGN.md" ] || { echo "No encuentro DESIGN.md en $raiz" >&2; exit 1; }

version="$(sed -n 's/^version: *//p' "$raiz/DESIGN.md" | head -1)"

rm -rf "$destino/diseno"
mkdir -p "$destino/diseno"

{
  printf -- '---\n'
  printf 'name: design-md-unpsjb\n'
  printf 'description: "Design.md para generar páginas para la universidad (UNPSJB, Delegación Trelew), versión %s. El núcleo trae los tokens y las secciones 1 a 13; las secciones 14 a 21 (gobernanza, gráficos, agenda y cámaras, páginas públicas, documentos, mesa de ayuda, cartelera y planos) están en diseno/ y se leen solo cuando la pantalla las usa."\n' "$version"
  printf -- '---\n\n'
  cat "$raiz/DESIGN.md"
} > "$destino/SKILL.md"

cp "$raiz"/diseno/*.md "$destino/diseno/"

echo "Skill armado en skill/design-md-unpsjb/ (versión $version): SKILL.md y $(ls "$destino/diseno" | wc -l) archivos en diseno/."
