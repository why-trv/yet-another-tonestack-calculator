import sys
import argparse
import os
import json
import hashlib
import yaml
import re
import shutil
import math
import time
from lcapy import Circuit

# Output directories
FMT_OUTPUT_DIRS = {
    'svg': '../../src/public/images/schematics',
    'tex': 'tex',
    'js': '../../src/models/tonestacks'
}
CIRCUITS_DIR = 'circuits'
DRAFT_OUTPUT_DIR = 'output'
# Define which outputs should preserve the relative directory structure
# (ignored in draft mode)
PRESERVE_SUBDIRS = ['tex', 'js']

def get_output_path(filepath, fmt, draft=False):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    rel_path = os.path.relpath(os.path.dirname(filepath), os.path.join(script_dir, CIRCUITS_DIR))
    if draft:
        output_dir = os.path.join(script_dir, DRAFT_OUTPUT_DIR, rel_path)
    else:
        output_dir = os.path.join(script_dir, FMT_OUTPUT_DIRS[fmt])
        if fmt in PRESERVE_SUBDIRS:
            output_dir = os.path.join(output_dir, rel_path)

    os.makedirs(output_dir, exist_ok=True)
    base_name = os.path.splitext(os.path.basename(filepath))[0]
    output_file = f"{base_name}.{fmt}"
    path = os.path.join(output_dir, output_file)
    return os.path.normpath(path)

def get_aux_path(filepath, suffix):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, '.aux')
    os.makedirs(output_dir, exist_ok=True)

    return os.path.join(output_dir, f'{os.path.splitext(os.path.basename(filepath))[0]}{suffix}')    

def get_aux_netlist_path(filepath):
    return get_aux_path(filepath, '_netlist.txt')

def get_aux_analysis_path(filepath):
    return get_aux_path(filepath, '_analysis.json')

def draw_circuit(cct, input_file, formats=None, draft=False):
    if formats is None:
        formats = ['tex', 'svg']

    args = {
        'style': 'european',
        'autoground': 'tlground',
        'label_nodes': 'none',
        'draw_nodes': 'connections',
        'label_flip': True,
        'node_spacing': 2.7
    }

    for fmt in formats:
        output_file = get_output_path(input_file, fmt, draft)
        cct.draw(output_file, **args)
        pretty_print_path("Circuit schematic saved to", output_file)

def sort_symbols(symbols):
    def custom_sort_key(symbol):
        symbol_str = str(symbol)
        if symbol_str in ['RIN', 'CIN']:
            return (0, symbol_str)
        elif symbol_str.startswith('R') and symbol_str != 'RL':
            return (1, symbol_str)
        elif symbol_str == 'RL':
            return (2, symbol_str)
        elif symbol_str.startswith('C'):
            return (3, symbol_str)
        else:
            return (4, symbol_str)
    return sorted(symbols, key=custom_sort_key)

def analyze_circuit(cct, input_file, subs=None):    
    H = cct.transfer(('IN', 0), 'RL')    
    H = H.simplify()

    # If the final expressions should have different names for components, substitute:
    if subs:
        H = H.subs(subs)

    print(f"Simplified H(s) = {H}\n")

    num_coeffs = H.N.coeffs()
    den_coeffs = H.D.coeffs()

    coefficient_vars = set()
    for c in num_coeffs + den_coeffs:
        coefficient_vars.update(c.symbols)

    # Save analysis results
    analysis_results = {
        'numCoeffs': [str(c) for c in num_coeffs],
        'denCoeffs': [str(c) for c in den_coeffs],
        'coefficientVars': [str(symbol) for symbol in sort_symbols(coefficient_vars)]
    }

    analysis_file = get_aux_analysis_path(input_file)
    
    with open(analysis_file, 'w') as f:
        json.dump(analysis_results, f, indent=2)

    pretty_print_path("Analysis results saved to", analysis_file)

    return analysis_results

def extract_existing_code(file_content):
    def find_ending_brace(text, start):
        brace_count = 1
        string_delimiter = None

        for i, char in enumerate(text[start:], start):
            if char in ['"', "'"]:
                if not string_delimiter:
                    string_delimiter = char
                elif string_delimiter == char:
                    string_delimiter = None
            elif string_delimiter == None:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        return i
        return -1  # No matching brace found

    class_pattern = r'export class \w+ extends \w+\s*{\n*'
    definition_pattern = r'\s*static definition\(\)\s*{'
    calculate_coeffs_pattern = r'\s*calculateCoefficients\s*\([^)]*\)\s*{'

    class_match = re.search(class_pattern, file_content)
    if not class_match:
        return ""

    class_start = class_match.end()
    class_end = find_ending_brace(file_content, class_start)

    borders = [0]
    definition_match = re.search(definition_pattern, file_content[class_start:])
    if definition_match:
        borders.append(definition_match.start())
        borders.append(1 + find_ending_brace(file_content[class_start:], definition_match.end()))

    calculate_coeffs_match = re.search(calculate_coeffs_pattern, file_content[class_start:])
    if calculate_coeffs_match:
        borders.append(calculate_coeffs_match.start())
        borders.append(1 + find_ending_brace(file_content[class_start:], calculate_coeffs_match.end()))

    borders.sort()
    borders.append(class_end - class_start)
    custom_pieces = []

    for i in range(0, len(borders), 2):
        start = borders[i]
        end = borders[i + 1]
        piece = file_content[class_start + start:class_start + end].strip()
        if piece:
            custom_pieces.append('  ' + piece)

    return "\n\n".join(custom_pieces)

def generate_js_code(analysis_results, input_file, frontmatter, js_dir=None, overwrite=False, draft=False):
    num_coeffs = analysis_results['numCoeffs']
    den_coeffs = analysis_results['denCoeffs']
    coefficient_vars = analysis_results['coefficientVars']

    calculations = ''
    idt = '  '
    idt2 = idt * 2
    idt3 = idt * 3
    idt4 = idt * 4
    idt5 = idt * 5

    for i, c in reversed(tuple(enumerate(num_coeffs))):
        calculations += f"{idt2}const b{len(num_coeffs) - 1 - i} = {c};\n"

    calculations += "\n"

    for i, c in reversed(tuple(enumerate(den_coeffs))):
        calculations += f"{idt2}const a{len(den_coeffs) - 1 - i} = {c};\n"

    calculations += f"\n{idt2}return [\n{idt3}["
    calculations += ', '.join([f"b{i}" for i in range(len(num_coeffs))])
    calculations += f"],\n{idt3}["
    calculations += ', '.join([f"a{i}" for i in range(len(den_coeffs))])
    calculations += f"]\n{idt2}];"

    coefficient_vars_string = ', '.join(coefficient_vars)

    script_dir = os.path.dirname(__file__)
    template_path = os.path.join(script_dir, 'jstemplate.txt')
    with open(template_path, 'r') as template_file:
        template = template_file.read()

    class_name = os.path.splitext(os.path.basename(input_file))[0]

    # Handle BaseClass
    base_class = frontmatter.get('baseClass', 'BaseTonestack')
    js_code = template.replace('<%BaseClass%>', base_class)

    # Handle BaseClassPath
    output_dir = frontmatter.get('outputDir', '')
    if base_class == 'BaseTonestack':
        depth = len(output_dir.split(os.sep))
        base_class_path = '../' * depth + base_class
    else:
        base_class_path = './' + base_class
    js_code = js_code.replace('<%BaseClassPath%>', base_class_path)

    js_code = js_code.replace('<%ClassName%>', class_name)
    js_code = js_code.replace('<%Calculations%>', calculations)
    js_code = js_code.replace('<%CoefficientVariables%>', coefficient_vars_string)

    # Generate the definition object
    definition = "{\n"
    definition += f"{idt3}id: '{frontmatter.get('id', '')}',\n"
    definition += f"{idt3}name: '{frontmatter.get('name', '')}',\n"
    if 'description' in frontmatter:
        definition += f"{idt3}description: '{frontmatter['description']}',\n"

    # Components
    if 'components' in frontmatter:
        definition += idt3 + "components: {\n"
        sorted_components = sort_symbols(frontmatter['components'].keys())
        for component in sorted_components:
            value = frontmatter['components'][component]
            # Format component values with exponent in multiples of 3
            exponent = int(math.log10(abs(value)))
            mantissa = value / (10 ** exponent)
            adjusted_exponent = 3 * (exponent // 3)
            adjusted_mantissa = mantissa * (10 ** (exponent - adjusted_exponent))
            formatted_mantissa = f"{adjusted_mantissa:.3f}".rstrip('0').rstrip('.')
            if adjusted_exponent == 0:
                definition += f"{idt4}{component}: {formatted_mantissa},\n"
            else:
                definition += f"{idt4}{component}: {formatted_mantissa}e{adjusted_exponent:d},\n"

        definition += f"{idt3}}},\n"

    # Controls
    if 'controls' in frontmatter:
        definition += f"{idt3}controls: {{\n"
        for control, control_info in frontmatter['controls'].items():
            if isinstance(control_info, dict):
                taper = control_info.get('taper', 'Linear')
                role = control_info.get('role', 'Pot')
                definition += f"{idt4}{control}: {{\n{idt5}taper: Tapers.{taper},\n"
                if 'role' in control_info:
                    definition += f"{idt5}role: PotRole.{control_info['role']},\n"
                if 'reverse' in control_info:
                    definition += f"{idt5}reverse: {'true' if control_info['reverse'] else 'false'},\n"
                definition += f"{idt4}}},\n"
            else:
                definition += f"{idt4}{control}: Tapers.{control_info},\n"
        definition += f"{idt3}}}\n"

    definition += f"{idt2}}}"

    # Replace the placeholder in the template
    js_code = js_code.replace('<%Definition%>', definition)

    output_file = get_output_path(input_file, 'js', draft)

    existing_code = ""
    if os.path.exists(output_file):
        with open(output_file, 'r') as f:
            existing_content = f.read()
        existing_code = extract_existing_code(existing_content)

    js_code = js_code.replace('<%ExistingCode%>', f"\n{existing_code}\n" if existing_code else '')

    if os.path.exists(output_file) and not overwrite:
        user_input = input(f"File {output_file} already exists. Overwrite? (y/n): ")
        if user_input.lower() != 'y':
            print("Operation cancelled.")
            return

    with open(output_file, 'w') as f:
        f.write(js_code)

    pretty_print_path("JavaScript code saved to", output_file)

    # Print the coefficients for verification
    # print("\nNumerator coefficients:")
    # for i, coeff in enumerate(reversed(num_coeffs)):
    #     print(f"\033[90mb{i} = {coeff}\033[0m")
    # print("Denominator coefficients:")
    # for i, coeff in enumerate(reversed(den_coeffs)):
    #     print(f"\033[90ma{i} = {coeff}\033[0m")
    # print("")

def get_default_output_path(input_file):
    base_name = os.path.splitext(os.path.basename(input_file))[0]
    return os.path.join('output', base_name)

def read_combined_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Check if the content starts with '---' (indicating frontmatter)
    if content.startswith('---'):
        # Split the content into frontmatter and netlist
        parts = content.split('---', 2)
        if len(parts) < 3:
            raise ValueError("Invalid file format. Expected YAML frontmatter followed by '---' and then the netlist.")

        frontmatter = yaml.safe_load(parts[1])
        netlist = parts[2].strip()
    else:
        # If no frontmatter, treat the entire content as netlist
        frontmatter = {}
        netlist = content.strip()

    # Convert component values to floats
    if 'components' in frontmatter:
        for component, value in frontmatter['components'].items():
            if isinstance(value, str):
                frontmatter['components'][component] = float(value)

    return frontmatter, netlist

def pretty_print_path(message, file_path):
    dir_path = os.path.dirname(file_path)
    file_name = os.path.basename(file_path)
    print(f"{message} \033[90m{dir_path}/\033[0m{file_name}")

def print_netlists_side_by_side(original, drawing, analysis):
    terminal_width = shutil.get_terminal_size().columns

    # Calculate the maximum line length for each netlist
    max_original_length = max(len(line) for line in original.split('\n'))
    max_drawing_length = max(len(line) for line in drawing.split('\n'))
    max_analysis_length = max(len(line) for line in analysis.split('\n'))

    # Calculate the required width for each column
    column_width = max(max_original_length, max_drawing_length, max_analysis_length)
    total_required_width = column_width * 3 + 6  # 6 for padding and separators

    if terminal_width >= total_required_width:
        original_lines = original.split('\n')
        drawing_lines = drawing.split('\n')
        analysis_lines = analysis.split('\n')
        max_lines = max(len(original_lines), len(drawing_lines), len(analysis_lines))

        print("Original Netlist".center(column_width) + " | " + "Drawing Netlist".center(column_width) + " | " + "Analysis Netlist".center(column_width))
        print("-" * (column_width * 3 + 6))

        for i in range(max_lines):
            orig = original_lines[i] if i < len(original_lines) else ""
            draw = drawing_lines[i] if i < len(drawing_lines) else ""
            anal = analysis_lines[i] if i < len(analysis_lines) else ""
            print(f"{orig:<{column_width}} | {draw:<{column_width}} | {anal:<{column_width}}")

        print("-" * (column_width * 3 + 6) + "\n")
    else:
        print("Original netlist:\n")
        print(original + '\n')
        print("Drawing netlist:\n")
        print(drawing + '\n')
        print("Analysis netlist:\n")
        print(analysis + '\n\n')

def circuit_from_netlist(netlist):
    # Read and preprocess circuit from netlist
    cct = Circuit(netlist)

    # Process custom shorthand option '_' to flip the label without having to redefine it with l_=<smth>
    for cpt in cct.cpts:
        el = cct[cpt]
        opts = el.opts
        if '_' in opts:
            # Replace '_' option with 'l_' option
            opts['l_'] = f"{el.classname}_{{{cpt[len(el.classname):]}}}"
            del opts['_']

    # lcapy analysis will short-circuit AC sources, so VIN shouldn't be there in the first place,
    # but if it happended to be there, remove it
    if ('VIN' in cct.cpts):
      cct.remove('VIN')

    for cpt in cct.cpts:
        if cpt.startswith('RV'):
            opts = cct[cpt].opts
            # If label is not specified, autolabel potentiometers as R_smth, not RV_smth
            if not 'l' in opts and not 'l_' in opts:
              opts['l_'] = f"R_{{{cpt[2:].strip('_')}}}"

    # Auto-add labels for input and output nodes
    if (not 'A_IN' in cct.symbols):
      cct.add('A_IN IN; l=V_{IN}, anchor=south')
    if (not 'A_OUT' in cct.symbols):
      cct.add('A_OUT OUT; l=V_{OUT}, anchor=south')

    return cct

def circuit_for_drawing(cct):
    return cct.sympify()

def circuit_for_analysis(cct):
    # Remove component values from the circuit to perform analysis symbolically
    anCct = cct.sympify()

    for cpt in anCct.cpts:
        # Replace potentiometer (RV) components with two separate resistors
        if cpt.startswith('RV'):
            old_component = anCct[cpt]
            name = cpt_alias(cpt)
            # TODO: this breaks on RV_V, fix it
            nodes = old_component.nodes

            flip = ('*' in old_component.opts)

            # Add two new components
            anCct.add(f'{name}1 {nodes[1 if flip else 0]} {nodes[2]}')
            anCct.add(f'{name}2 {nodes[0 if flip else 1]} {nodes[2]}')

            # Remove the original RV component
            anCct.remove(cpt)
        elif cpt.startswith('A'):
            # Remove annonations 
            # (again, not necessary, but might prevent unnecessary re-analysis)
            anCct.remove(cpt)
        else:
            # This is not really necessary, but, since we store this netlist as a way to
            # check for changes in circuit, it prevents unnecessary re-analysis after
            # cosmetic changes (e.g. changing label position or ground type).
            # Console output looks a bit cleaner too.
            anCct[cpt].opts.clear()
            
    return anCct

def cpt_alias(cpt):
    # Takes lcapy component name and returns the name that will be used in the model
    # (e.g. RV_T -> RT, RVM -> RM, R_V -> RV)
    if cpt.startswith('RV_'):
        return 'R' + cpt[3:]
    elif cpt.startswith('RV'):
        return 'R' + cpt[2:]
    elif cpt.startswith('R_'):
        return 'R' + cpt[2:]
    else:
        return cpt

def main():
    start_time = time.time()

    parser = argparse.ArgumentParser(description="Analyze and draw circuit from combined file or netlist.")
    parser.add_argument("input_file", help="Path to the combined YAML+netlist file or just netlist file")
    parser.add_argument("--draw", action="store_true", help="Draw the circuit schematic")
    parser.add_argument("--analyze", action="store_true", help="Perform circuit analysis")
    parser.add_argument("--all", action="store_true", help="Perform both drawing and analysis")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing files without asking")
    parser.add_argument("--formats", nargs='+', choices=['tex', 'svg'], help="Output formats for circuit schematic (default: both tex and svg)")
    parser.add_argument("--output", help="Output file for circuit schematic (default: based on input filename)")
    parser.add_argument("--draft", action="store_true", help="Use draft output directory")
    parser.add_argument("--force", action="store_true", help="Force analysis even if netlist hasn't changed")

    args = parser.parse_args()

    if args.all:
        args.draw = True
        args.analyze = True

    input_file = os.path.abspath(args.input_file)

    print(f"\nProcessing \033[1;37m{os.path.basename(input_file)}\033[0m\n")
    frontmatter, netlist = read_combined_file(input_file)

    cct = circuit_from_netlist(netlist)

    # Component values can be specified both in netlist and in YAML frontmatter,
    # with frontmatter taking precedence over netlist. Merge and store them in frontmatter
    defs = cct.defs()
    defs.update(frontmatter.get('components', {}))

    # defs can contain numeric values or symbols (same as the component names),
    # make a new dict with numeric values only
    components = {}
    symbolic_cpts = []
    for (k, v) in defs.items():
        if k != v and isinstance(v, (str, int, float)):
            try:
                components[cpt_alias(k)] = float(v)
            except ValueError:
                symbolic_cpts.append(cpt_alias(k))
        else:
            symbolic_cpts.append(cpt_alias(k))
    
    if len(symbolic_cpts) > 0:
        print(f"\033[1;33mWarning: {len(symbolic_cpts)} component "
              f"value{'' if len(symbolic_cpts) == 1 else 's'} missing: "
              f"{', '.join(symbolic_cpts)}!\033[0m")

    frontmatter['components'] = components
     
    if 'controls' in frontmatter:
        controls = frontmatter['controls']

        # Gonna check that there are no dangling controls or pots and variable resistors without a control
        assigned_controls = list(controls.keys())

        for cpt in cct.cpts:
            alias = cpt_alias(cpt)
            is_vr = 'variable' in cct[cpt].opts
            # BTW, automatically set the role for variable resistors (as opposed to potentiometers)
            if is_vr and alias in controls:
                controls[alias] = {
                    'taper': controls[alias],
                    'role': 'VR'
                }
                if '*' in cct[cpt].opts:
                    controls[alias]['reverse'] = True
            
            if is_vr or cpt.startswith('RV'):
                if not cpt_alias(cpt) in controls:
                    print(f"\033[1;33mWarning: no control is defined for {cpt} in the frontmatter!\033[0m")
                else:
                    assigned_controls.remove(cpt_alias(cpt))

        if len(assigned_controls) > 0:
            print(f"\033[1;33mWarning: no component is defined for controls: {', '.join(assigned_controls)}!\033[0m")

    # Prepare circuit for drawing and analysis
    cct = circuit_for_drawing(cct)
    anCct = circuit_for_analysis(cct)

    print_netlists_side_by_side(netlist, cct.netlist(), anCct.netlist())

    netlist_file = get_aux_netlist_path(input_file)
    analysis_file = get_aux_analysis_path(input_file)

    if args.analyze:
        current_netlist = anCct.netlist()
        current_netlist_hash = hashlib.md5(current_netlist.encode()).hexdigest()

        # Collect substitutions for component names
        # (e.g. replace R_V with RV in the final expressions)
        subs = {}
        for cpt in anCct.cpts:
            if '_' in cpt:
                subs[cpt] = cpt_alias(cpt)

        if not args.force and os.path.exists(netlist_file) and os.path.exists(analysis_file):
            with open(netlist_file, 'r') as f:
                saved_netlist = f.read()
            saved_netlist_hash = hashlib.md5(saved_netlist.encode()).hexdigest()

            if current_netlist_hash == saved_netlist_hash:
                print("Netlist hasn't changed. Using previous analysis results...")
                with open(analysis_file, 'r') as f:
                    analysis_results = json.load(f)
            else:
                print("Netlist has changed. Performing analysis...")
                analysis_results = analyze_circuit(anCct, input_file, subs)
        else:
            if args.force:
                print("Forced mode, performing analysis...")
            else:
                print("No previous analysis found. Performing analysis...")
            analysis_results = analyze_circuit(anCct, input_file, subs)

        # Save current netlist
        with open(netlist_file, 'w') as f:
            f.write(current_netlist)

        # print("\nGenerating JavaScript code...")
        generate_js_code(analysis_results, input_file, frontmatter, overwrite=args.overwrite, draft=args.draft)
    else:
        print("Analysis skipped. Use --analyze or --all to perform analysis.")

    if args.draw:
        draw_circuit(cct, input_file, formats=args.formats, draft=args.draft)

    if not (args.draw or args.analyze):
        print("Error: Please specify at least one action (--draw, --analyze, or --all)")
        sys.exit(1)

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Elapsed time: {execution_time:.2f} seconds")

    print('')

if __name__ == "__main__":
    main()