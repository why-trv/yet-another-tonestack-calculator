import time
import subprocess
import argparse
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os

class NetlistHandler(FileSystemEventHandler):
    def __init__(self, process_circuit_args):
        self.process_circuit_args = process_circuit_args

    def on_modified(self, event):
        if not event.is_directory and event.src_path.endswith('.sch'):
            print(f"---------\nFile {event.src_path} has been modified")
            self.run_process_circuit(event.src_path)

    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith('.sch'):
            print(f"---------\nFile {event.src_path} has been created")
            self.run_process_circuit(event.src_path)

    def run_process_circuit(self, file_path):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        process_script = os.path.join(script_dir, 'process-circuit.py')
        cmd = ['python', process_script, file_path] + self.process_circuit_args
        try:
            subprocess.run(cmd, check=True)
            print(f"Process-circuit script ran successfully for {file_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error running process-circuit script for {file_path}: {e}")

def main():
    parser = argparse.ArgumentParser(description="Watch for changes in netlist files and run process-circuit.py")
    parser.add_argument("--draw", action="store_true", help="Draw the circuit diagram")
    parser.add_argument("--analyze", action="store_true", help="Perform circuit analysis")
    parser.add_argument("--all", action="store_true", help="Perform both drawing and analysis")
    parser.add_argument("--output", help="Output file for circuit diagram")
    parser.add_argument("--preview", action="store_true", help="Generate a preview PDF")
    
    args, unknown = parser.parse_known_args()

    process_circuit_args = []
    for arg, value in vars(args).items():
        if value is not None:
            if isinstance(value, bool) and value:
                process_circuit_args.append(f"--{arg}")
            elif not isinstance(value, bool):
                process_circuit_args.extend([f"--{arg}", str(value)])
    
    # Add any unknown arguments
    process_circuit_args.extend(unknown)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(script_dir, "circuits")
    
    if not os.path.exists(path):
        print(f"Error: Circuits directory not found at {path}")
        exit(1)

    event_handler = NetlistHandler(process_circuit_args)
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()

    print(f"Watching for changes in {path} directory and its subdirectories...")
    print(f"Flags to be passed to process-circuit.py: {' '.join(process_circuit_args)}")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    main()