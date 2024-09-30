## Disclaimer
The schematics here don't respresent the right way to draw schematics in CurcuiTikZ, but they kinda do the job.

## Software
For LaTeX packages, on my Mac I've used the smaller **[BasicTeX](https://www.tug.org/mactex/morepackages.html)** distribution and **TeX Live Utility** to install missing packages (`standalone`, `curcuitikz`, maybe something else).

Nice to haves:
- **[CircuiTikZ Designer](https://circuit2tikz.tf.fau.de/designer/)** for WYSIWYG circuit drawing, then export and add labels manually.
- **[LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)** VSCode extension to automatically generate previews while working on the schematics.

## Generating SVGs
First of all, I'm a total noob to LaTeX or TikZ, so perhaps there's a better way to do it, but here's what I did here.

### Using `dvisvgm` (preferred)
(see `generate-svg-schematics.sh`)
- **latex** to generate DVIs
- **dvisvgm** to generate SVGs from those DVIs

I guess this is the preferred way, because seems to produce smaller size SVGs, though it requires more stuff to be installed, namely **Ghostscript**.

I couldn't make it work with **Ghostscript** and **Ghostscript Extras** packages from [](https://www.tug.org/mactex/morepackages.html). For some reason `dvisvgm` couldn't see Ghostscript's `libgs.dylib` even though it was installed and `--libgs=/usr/local/lib/libgs.dylib` flag was supplied. Could be security thingies in macOS, I guess.

My solution was to install Ghostscript with Homebrew and run `dvisvgm` with `--libgs=/opt/homebrew/lib/libgs.dylib`

### Using `pdf2svg`
(see `generate-svg-schematics-pdf2svg.sh`)
- **latexmk** to generate PDFs
- **pdf2svg** to convert those PDFs to SVG