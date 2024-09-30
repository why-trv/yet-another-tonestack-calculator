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
  latexmk -dvi -pdf- -latex="dvilualatex --shell-escape %O %S" -synctex=1 -interaction=nonstopmode -file-line-error -pdf -outdir="output" "$file"
  # latex -interaction=nonstopmode -output-directory="$DVI_DIR" -output-format=dvi "$file"
done

cd "$DVI_DIR"
echo "--- Converting DVIs to SVGs ---"

SVG_DIR="$SCRIPT_DIR/../../src/public/images/schematics"
mkdir -p "$SVG_DIR"

for file in *.dvi; do
  [ -f "$file" ] || continue
  noextension="${file%.*}"  
  dvisvgm --no-fonts --libgs=/opt/homebrew/lib/libgs.dylib --optimize --output="$SVG_DIR/$noextension.svg" "$file"
  echo "$noextension.svg"
done

echo "--- DONE! ---"