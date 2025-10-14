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

## How to run locally

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

## Regenerating from circuit definitions

Some of the circuits are defined via [lcapy](https://lcapy.readthedocs.io/en/latest/).

To generate these, eg if you added a new one, install Python requirements:
- lcapy
- sympy
- PyYaml

Then look at `resources/lcapy/README.md` for instructions on using the scripts.

