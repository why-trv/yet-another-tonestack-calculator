import os
import subprocess
import argparse
import sys

def process_circuit(file_path, process_circuit_args):
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set the path to process-circuit.py relative to the script directory
    process_circuit_path = os.path.join(script_dir, 'process-circuit.py')
    
    command = [sys.executable, process_circuit_path, file_path] + process_circuit_args
    result = subprocess.run(command, capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print("Errors:", result.stderr, file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description='Process all .sch files in a directory.')
    
    # Get the directory of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set the default path to 'circuits' relative to the script directory
    default_path = os.path.join(script_dir, 'circuits')
    
    parser.add_argument('-d', '--directory', type=str, default=default_path,
                        help='Directory containing .sch files (default: ./circuits)')
    
    parser.add_argument("--draw", action="store_true", help="Draw the circuit diagram")
    parser.add_argument("--analyze", action="store_true", help="Perform circuit analysis")
    parser.add_argument("--all", action="store_true", help="Perform both drawing and analysis")
    parser.add_argument("--output", help="Output file for circuit diagram")
    parser.add_argument("--preview", action="store_true", help="Generate a preview PDF")
    
    args, unknown = parser.parse_known_args()

    process_circuit_args = []
    for arg, value in vars(args).items():
        if value is not None and arg != 'directory':
            if isinstance(value, bool) and value:
                process_circuit_args.append(f"--{arg}")
            elif not isinstance(value, bool):
                process_circuit_args.extend([f"--{arg}", str(value)])
    
    # Add any unknown arguments
    process_circuit_args.extend(unknown)

    path = args.directory
    print(f"Processing all .sch files in {path} directory...")
    print(f"Flags to be passed to process-circuit.py: {' '.join(process_circuit_args)}")

    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith('.sch'):
                file_path = os.path.join(root, file)
                print(f"---------\nProcessing file: {file_path}")
                process_circuit(file_path, process_circuit_args)

if __name__ == "__main__":
    main()