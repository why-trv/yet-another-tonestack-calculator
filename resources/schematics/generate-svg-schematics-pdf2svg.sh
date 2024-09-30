#!/bin/bash

# !!!: You should use generate-svg-schematics.sh instead as it generates smaller SVGs
#
# This script:
# - Generates circuit schematics PDFs from CircuiTikZ TeX files
#   in directory `tex` using `latexmk` and saves them to `tex/output`
# - Converts the PDFs to SVG and saves them to Nuxt's `public` directory
#
cd "$(dirname "$0")"
SCRIPT_DIR="$(pwd)"

cd "$SCRIPT_DIR/tex"
echo "--- Generating PDFs from $SCRIPT_DIR/tex/*.tex ---"

for file in *.tex; do
  [ -f "$file" ] || continue
  latexmk -synctex=1 -interaction=nonstopmode -file-line-error -pdf -outdir="output" "$file"
done

cd "$SCRIPT_DIR/tex/output"
echo "--- Converting PDFs to SVGs ---"

mkdir -p "$SCRIPT_DIR/../../src/public/images/schematics"

for file in *.pdf; do
  [ -f "$file" ] || continue
  noextension="${file%.*}"  
  pdf2svg "$file" "$SCRIPT_DIR/../../src/public/images/schematics/$noextension.svg" 
  echo "$noextension.svg"
done

echo "--- DONE! ---"
