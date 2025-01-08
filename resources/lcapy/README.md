## process-circuit.py

This script, powered by [lcapy](https://github.com/mph-/lcapy), supposedly takes a rather concise circuit definition file (`circuits/README.md`), performs circuit analysis to find the transfer function, and generates JavaScript code as well as schematics. Look inside the script for the list of supported arguments.

This works well enough for simple circuits and has the benefit of both analysis and schematic generation performed from a single source. However, for more complex tonestacks it can be waaay too slow. Another great option for automated circuit analysis is [QSapecNG](https://qsapecng.sourceforge.net/), which is cross-platform and still seems to work despite being unmaintained for years.

## watch-circuits.py

This script watches the contents of the `circuits` directory and runs `process-circuit.py` on modified files, forwarding the arguments to it.

## Example usage

While writing the circuit file, you may want to automatically generate a preview drawing of the circuit like this:

```
python3 resources/lcapy/watch-circuits.py --draw --overwrite --draft
```

Then, when you're ready to generate the code, run:

```
python3 ./resources/lcapy/process-circuit.py resources/lcapy/circuits/Sovtek/SovtekMIG100.sch --all --overwrite
```
