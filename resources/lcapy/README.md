## process-circuit.py

This script, powered by [lcapy](https://github.com/mph-/lcapy), supposedly takes a rather concise circuit definition file (`circuits/README.md`), performs circuit analysis to find the transfer function, and generates JavaScript code as well as schematics. Look inside the script for the list of supported arguments.

This works well enough for simple circuits and has the benefit of both analysis and schematic generation performed from a single source. However, for more complex tonestacks it can be waaay too slow. Another great option for automated circuit analysis is [QSapecNG](https://qsapecng.sourceforge.net/), which is cross-platform and still seems to work despite being unmaintained for years.

## watch-netlist.py

This script watches the contents of the `circuits` directory and runs `process-circuit.py` on modified files, forwarding the arguments to it.