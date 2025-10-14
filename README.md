# Yet Another Tonestack Calculator (YATSC)

Browser-based tonestack calculator, available at [tonestack.yuriturov.com](https://tonestack.yuriturov.com/).

Based on the legendary [Duncan Amps TSC](https://www.duncanamps.com/tsc/) and its web counterpart [TSC in the Web](https://www.guitarscience.net/tsc/info.htm).
Most of the tonestack models have been adapted from [TSC in the Web repo](https://github.com/jatalahd/tsc) with some tweaks, including optimized calculations of the transfer function coefficients, and a couple of new models added.
More info [here](https://tonestack.yuriturov.com/about).


- Built with Nuxt, Tailwind and ECharts.
- Vitest for a bit of testing.
- CircuiTikZ for SVG schematics.
- SymPy for calculation optimization (factor, collect, CSE).

The project was somewhat haphazardly hacked together to just work, so it sure isn't an example of good software engineering practices.

## Running Locally

Requirements:
- Node.js 18.20+ or 20+
- npm

Quick start:
- npm install
- npm run dev
- Open the URL printed by Nuxt (typically http://localhost:3000)

Static build and preview:
- npm run generate
- npm run preview

Notes:
- The prebuild, predev, and pregenerate scripts run scripts/optimize-schematics.js to optimize SVG schematics under src/public/images/schematics.
- If that folder is empty, the script will simply log "No SVG files found." and continue.

## Developing Circuits: Installing Dependencies

Some of the circuits are defined via
[lcapy](https://lcapy.readthedocs.io/en/latest/).


Read `resources/lcapy/circuits/README.md` for important info on the circuit file format!

Read `resources/lcapy/README.md` for instructions on using the scripts.

If you want to run those scripts - eg. because you added or modified a circuit -
you will need pdflatex, pdf2svg, and circuitikz (and TeX!) installed on your system.

Follow the [lcapy installation instructions](https://lcapy.readthedocs.io/en/latest/install.html)
for your platform.

### Example: mac with homebrew

```console
brew install basictex
eval "$(/usr/libexec/path_helper)"
sudo tlmgr update --self
sudo tlmgr install collection-latexextra
sudo tlmgr install circuitikz
brew install pdf2svg
brew install pdflatex
```

### Python dependencies

Install these via your preferred python package manager:

- lcapy
- sympy
- PyYaml
- watchdog
- pdflatex
