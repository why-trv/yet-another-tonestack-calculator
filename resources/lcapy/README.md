## process-circuit.py

This script, powered by [lcapy](https://github.com/mph-/lcapy), supposedly takes a rather concise circuit definition file (`circuits/README.md`), performs circuit analysis to find the transfer function, and generates JavaScript code as well as schematics. Look inside the script for the list of supported arguments.

## watch-netlist.py

This script watches the contents of the `circuits` directory and runs `process-circuit.py` on modified files, forwarding the arguments to it.