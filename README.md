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