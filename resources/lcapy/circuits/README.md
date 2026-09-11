# Circuit File Format Notes

Circuit files consist of optional YAML frontmatter and a netlist.
Netlist can be created manually or using [**lcapy-gui**](https://github.com/mph-/lcapy-gui).

Example:
```
---
id: muf0
name: Big Muff
controls:
  RT: Linear
---
RIN IN 2 15e3; right
R1 2b 3 39e3; right
R2 4 0a 22e3; up
C1 3 0 10e-9; down, _
C2 2a 4 4e-9; right
C3 5 OUTa 1e-6; right=0.525
RV_T 4 3 5 100e3; down
RL OUT 0 100e3; down
W 2 2a; up=0.5
W 2 2b; down=0.5
W 0a 0b; right=0.5
W 0b 0; down=0.25
W OUTa OUT; right=0.1
```

## Frontmatter

Frontmatter is optional. If it's there, it defines the properties to be returned from the tonestack class `definition()` method.

For controls, it's enough to specify just the taper. By default, YATSC should think it's a pot, and the variable resistor role will be inferred if the netlist component has a `variable` option set.

### Ganged controls (dual-gang, one slider)

When two or more `variable` resistors or pots must track the same UI position (e.g. a dual-gang frequency control), declare **`gangedControls`** in frontmatter:

- **Primary** — mapping key: the component name that has the `controls:` entry and the single slider.
- **Followers** — list value: netlist names that mirror the primary’s resistance; each must **not** have its own `controls:` entry.

Taper and `reverse` apply only to the primary; followers receive the same numeric values as the primary at runtime.

Symbolic analysis substitutes each follower’s symbol with the primary’s so the generated transfer function uses one variable per gang. The netlist is unchanged (still separate branches).

Example: [`Basic/SallenKeyLowpass.sch`](Basic/SallenKeyLowpass.sch).

The analysis cache key includes `gangedControls`; change only ganging without changing the netlist still forces re-analysis (or use `--force`).

## Netlist
The netlist is mostly in `lcapy` format, but with some considerations:

- `lcapy` uses `RV` as potentiometer symbol. Thus, if we want to have a variable resistor starting with `RV`, there must be an underscore: `R_V`, or if it's a pot, `RV_V`.
- Thus, it may be a good idea to use underscore in all pot and variable resistor names for consistency.
- There's a custom shorthand option `_` to flip the label without having to redefine it with `l_=<smth>`.
- Another shorthand option `*` to logically flip the pot (i.e. the direction of the taper) for the analysis (drawing stays the same).
- Input node **must** be named `IN`
- Load **must** be named `RL`
- Labels for input and output nodes are added automatically, so omit them unless they need to be positioned in a specific way.
- For the analysis to work, `VIN` is going to be removed, so you really want input voltage source to be drawn, it must be named `VIN`. But it's better to just omit it.

## Component Values

Component values can be specified in any of (or both, but don't do it) netlist (inline) and YAML frontmatter, with frontmatter taking precedence over the netlist. The former is more concise though, and it's easier to see that all components have values.

## Global attributes not supported

Currently because of implementation details, there is no way to provide global
drawing control attributes such as
`;help_lines=1` that you might see in lcapy netlist docs.
