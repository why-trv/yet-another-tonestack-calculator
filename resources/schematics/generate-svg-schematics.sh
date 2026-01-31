#!/bin/bash

# This script:
# - Generates circuit schematics DVIs from CircuiTikZ TeX files
#   in directory `tex` using `latex` and saves them to `tex/output`
# - Converts the DVIs to SVG using dvisvgm and saves them to Nuxt's `public` directory
#
cd "$(dirname "$0")"
SCRIPT_DIR="$(pwd)"

cd "$SCRIPT_DIR/tex"
echo "--- Generating DVIs from $SCRIPT_DIR/tex/*.tex ---"

DVI_DIR="$SCRIPT_DIR/tex/output"
mkdir -p "$DVI_DIR"

for file in *.tex; do
  [ -f "$file" ] || continue
  # latexmk -dvi -pdf- -latex="dvilualatex --shell-escape %O %S" -synctex=1 -interaction=nonstopmode -file-line-error -pdf -outdir="$DVI_DIR" "$file"
  latex -interaction=nonstopmode -output-directory="$DVI_DIR" -output-format=dvi "$file"
done

cd "$DVI_DIR"
echo "--- Converting DVIs to SVGs ---"

SVG_DIR="$SCRIPT_DIR/../../src/public/images/schematics"
mkdir -p "$SVG_DIR"

# Export libgs path for dvisvgm
export LIBGS=/opt/homebrew/lib/libgs.dylib

for file in *.dvi; do
  [ -f "$file" ] || continue
  noextension="${file%.*}"
  svg_path="$SVG_DIR/$noextension.svg"
  dvisvgm --no-fonts --optimize --output="$svg_path" "$file"
  echo "Generated $noextension.svg"

  # Optimize the SVG using svgo
  node -e "
    import { optimize } from 'svgo';
    import { promises as fs } from 'fs';
    const svg = await fs.readFile('$svg_path', 'utf8');
    const result = await optimize(svg, { path: '$svg_path', multipass: true });
    await fs.writeFile('$svg_path', result.data);
  "
  echo "Optimized $noextension.svg"
done

echo "--- DONE! ---"