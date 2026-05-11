#!/usr/bin/env python3
"""
Clean notebook outputs to prevent repository bloat.
Clears all output cells from Jupyter notebooks before committing.
"""
import json
import glob
from pathlib import Path

def clean_notebooks():
    # Find all ipynb files
    notebooks = glob.glob("**/*.ipynb", recursive=True)
    
    total_cleared = 0
    for nb_path in notebooks:
        if ".ipynb_checkpoints" in nb_path or "node_modules" in nb_path:
            continue
        
        try:
            with open(nb_path, 'r', encoding='utf-8') as f:
                nb = json.load(f)
            
            # Clear all outputs from code cells
            cells_cleared = 0
            for cell in nb.get('cells', []):
                if cell.get('cell_type') == 'code':
                    if cell.get('outputs'):
                        cell['outputs'] = []
                        cells_cleared += 1
                    # Reset execution count for clean state
                    cell['execution_count'] = None
            
            if cells_cleared > 0:
                with open(nb_path, 'w', encoding='utf-8') as f:
                    json.dump(nb, f, indent=1)
                print(f"✓ Cleared outputs from {cells_cleared} cells in {nb_path}")
                total_cleared += cells_cleared
        except Exception as e:
            print(f"✗ Error processing {nb_path}: {e}")
    
    print(f"\n✓ Notebook output cleaning complete! Total cells cleared: {total_cleared}")

if __name__ == "__main__":
    clean_notebooks()
