# 🚀 First-Time Setup Guide

Complete beginner-friendly setup for the Food Demand Forecasting project.

---

## Prerequisites

Before starting, ensure you have:
- **Python** 3.8+ installed ([python.org](https://www.python.org/downloads/))
- **Git** installed ([git-scm.com](https://git-scm.com/))
- **~2GB free disk space** (for dataset + dependencies)
- **Internet connection** (for kagglehub downloads)

### Verify Prerequisites

```bash
# Check Python version (should be 3.8+)
python --version

# Check Git is installed
git --version
```

---

## Option 1: Local Setup (Recommended for Development)

### Step 1: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/projects/  # or your preferred location

# Clone the repository
git clone https://github.com/yourusername/food-demand-forecasting.git
cd food-demand-forecasting
```

### Step 2: Create Virtual Environment

**Why?** Virtual environments isolate project dependencies from your system Python.

```bash
# Create virtual environment named 'venv'
python -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate

# On Windows (Command Prompt):
venv\Scripts\activate

# On Windows (PowerShell):
venv\Scripts\Activate.ps1
```

**You should see `(venv)` at the start of your terminal line.**

### Step 3: Install Dependencies

```bash
# Upgrade pip (package manager)
pip install --upgrade pip

# Install all project dependencies
pip install -r requirements.txt
```

Expected output: `Successfully installed [60+ packages]`

### Step 4: Verify Installation

```bash
# Test Python imports
python -c "import pandas, numpy, statsmodels, kagglehub; print('✓ All imports successful!')"

# Check Jupyter
jupyter --version
```

### Step 5: Launch Jupyter Notebook

```bash
# Start Jupyter
jupyter notebook

# This opens http://localhost:8888 in your browser
# Navigate to week1_food_demand_eda.ipynb and open it
```

---

## Option 2: Google Colab Setup (Quickest, No Installation)

### Step 1: Go to Google Colab

Open [colab.research.google.com](https://colab.research.google.com)

### Step 2: Open from GitHub

1. Click **File** → **Open Notebook**
2. Select **GitHub** tab
3. Paste: `yourusername/food-demand-forecasting`
4. Select `week1_food_demand_eda.ipynb`

### Step 3: Run First Cell

The notebook automatically installs dependencies in Colab.

**First cell will be:**
```python
# Install dependencies (auto in Colab)
import subprocess
subprocess.run(["pip", "install", "-q", "kagglehub"], check=True)
```

**Google Colab Advantages:**
- ✓ No installation needed
- ✓ Free GPU/TPU access
- ✓ Automatic dependency installation
- ✓ Saves work to Google Drive

**Limitations:**
- ✗ Session times out after 12 hours
- ✗ Limited storage (compared to local)

---

## Step 6: Prepare Kaggle Credentials (One-time Setup)

The notebook uses **kagglehub** to download data automatically, but you need Kaggle API credentials.

### Get Kaggle API Key

1. Go to [kaggle.com](https://www.kaggle.com/) and login (create account if needed)
2. Click **Settings** → **API** → **Create New API Token**
3. This downloads `kaggle.json`

### Place Credentials (Choose One)

**Option A: Recommended - Use Environment Variable**

```bash
# Set KAGGLE_USERNAME and KAGGLE_KEY (one-time setup)

# macOS/Linux - Add to ~/.bash_profile or ~/.zshrc:
export KAGGLE_USERNAME="your-kaggle-username"
export KAGGLE_KEY="your-api-key-here"

# Windows - Set environment variables:
# Control Panel → System → Advanced → Environment Variables → New
# Variable: KAGGLE_USERNAME, Value: your-username
# Variable: KAGGLE_KEY, Value: your-api-key
```

**Option B: Automatic - Place kaggle.json**

```bash
# Move downloaded kaggle.json to:
# macOS/Linux:
~/.kaggle/kaggle.json
chmod 600 ~/.kaggle/kaggle.json

# Windows:
C:\Users\YourUsername\.kaggle\kaggle.json
```

**Option C: Colab - Upload Manually**

```python
# In Colab, run this in first cell:
from google.colab import files
files.upload()  # Select kaggle.json
```

---

## Verify Everything Works

### Quick Test (5 minutes)

```bash
# Activate environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run verification script
python -c "
import pandas as pd
import numpy as np
import kagglehub

print('✓ All imports working')
print('✓ Ready to run notebooks')
"
```

### Full Test (15 minutes)

1. Open `week1_food_demand_eda.ipynb` in Jupyter
2. Run **Cell 1** (Imports) - should complete without errors
3. Run **Cell 2** (Download Data) - should download Kaggle dataset
4. Run **Cell 3** (Data Cleaning) - should process data
5. Check for output confirmation messages

---

## Common Issues & Solutions

### Issue 1: Python version too old
```bash
# Error: "Python 3.8+ required"

# Solution: Download Python 3.10+ from python.org
# Then use full path:
/usr/local/bin/python3.10 -m venv venv
```

### Issue 2: Pip/kagglehub permission denied
```bash
# Error: "Permission denied" or "No module named pip"

# Solution: Upgrade pip
python -m pip install --upgrade pip

# Then retry:
pip install -r requirements.txt
```

### Issue 3: Kaggle credentials not found
```bash
# Error: "Kaggle credentials not found"

# Solution 1: Set environment variables (see Step 6)
export KAGGLE_USERNAME="username"
export KAGGLE_KEY="key"

# Solution 2: Create ~/.kaggle/kaggle.json manually
mkdir -p ~/.kaggle
cp ~/Downloads/kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json
```

### Issue 4: Jupyter not found
```bash
# Error: "jupyter: command not found"

# Solution: Reinstall jupyter
pip install jupyter --upgrade

# Then try:
jupyter notebook
```

### Issue 5: Dataset download fails
```bash
# Error: "Failed to download from kagglehub"

# Solution 1: Check internet connection
ping google.com

# Solution 2: Verify Kaggle credentials (see Issue 3)

# Solution 3: Manual download
# Visit: https://www.kaggle.com/datasets/kannanaikkal/food-demand-forecasting
# Download train.csv manually to data/raw/ folder
```

### Issue 6: Out of memory (Kaggle dataset too large)

```bash
# Error: "MemoryError" when loading data

# This rarely happens with ~100MB dataset, but if it does:

# Solution: Increase virtual memory or use Colab (more RAM available)
```

---

## Folder Structure After Setup

```
food-demand-forecasting/
├── venv/                              # Virtual environment (created by you)
├── week1_food_demand_eda.ipynb       # Notebook ready to run
├── requirements.txt                   # Dependencies installed ✓
├── data/
│   ├── raw/
│   │   └── train.csv                 # Downloaded automatically
│   ├── processed/
│   └── outputs/
├── README.md
├── FIRST_TIME_SETUP.md               # This file
├── COMMIT_GUIDE.md
└── ... (other docs)
```

---

## Next Steps

### If Setup Successful ✓

1. **Read Project Overview**
   ```bash
   cat README.md
   ```

2. **Run Week 1 Notebook**
   ```bash
   jupyter notebook week1_food_demand_eda.ipynb
   ```

3. **Make Your First Commit**
   ```bash
   git add week1_food_demand_eda.ipynb
   git commit -m "data-clean: completed Week 1 EDA"
   git push origin main
   ```

4. **Review Next Steps**
   Read `WEEK1_SUMMARY.md` for Week 2 goals

### If Stuck ❌

1. **Check Prerequisites** - Do you have Python 3.8+, Git, and internet?
2. **Check Virtual Environment** - Is `(venv)` showing in terminal?
3. **Verify Dependencies** - Did `pip install -r requirements.txt` complete without errors?
4. **Test Imports** - Can Python import pandas, numpy, kagglehub?
5. **Check Kaggle Credentials** - Did you set environment variables or place kaggle.json?
6. **Ask for Help** - Check GitHub Issues or ask team members

---

## Environment Variables Cheat Sheet

### macOS/Linux - Add to ~/.zshrc or ~/.bash_profile

```bash
# Kaggle credentials
export KAGGLE_USERNAME="your-username"
export KAGGLE_KEY="your-api-key"

# Python path (optional)
export PYTHONPATH="${PYTHONPATH}:~/projects/food-demand-forecasting"

# Then reload:
source ~/.zshrc
```

### Windows - Set System Environment Variables

1. Press `Win + X` → **System**
2. **Advanced system settings** → **Environment Variables**
3. Click **New** under User variables
4. Variable name: `KAGGLE_USERNAME` | Value: `your-username`
5. Click **New** again
6. Variable name: `KAGGLE_KEY` | Value: `your-api-key`
7. Click **OK** → **OK** → Restart terminal

---

## Cleanup (If Starting Over)

```bash
# Deactivate environment
deactivate

# Remove virtual environment
rm -rf venv  # macOS/Linux
# or
rmdir /s venv  # Windows

# Clear pip cache (optional)
pip cache purge

# Remove downloaded data (optional)
rm -rf data/raw/*.csv
```

---

## Performance Tips

### Speed Up Jupyter Launch
```bash
# Use Jupyter Lab (faster than notebook)
pip install jupyterlab
jupyter lab
```

### Speed Up Data Processing
```bash
# The notebook uses CSV - for faster processing, use Parquet
# Add to notebook:
df.to_parquet('data/processed/train.parquet')
df = pd.read_parquet('data/processed/train.parquet')  # 10x faster
```

### Speed Up Dependencies
```bash
# Use mamba (2-3x faster than pip)
# Install: conda install -c conda-forge mamba
# Then: mamba install -r requirements.txt
```

---

## Getting Help

| Problem | Resource |
|---------|----------|
| Setup issues | → This file |
| Git/GitHub | → See COMMIT_GUIDE.md |
| Notebook errors | → Check cell output + PREFLIGHT_CHECKLIST.md |
| Kaggle dataset | → See README.md "Data Source" section |
| Google Colab | → See COLAB_SETUP.md |

---

## Estimated Time to First Run

- **Setup**: 10-15 minutes (Python + venv + pip install)
- **Kaggle credentials**: 5 minutes (one-time)
- **First notebook run**: 5-10 minutes (dataset download + processing)
- **Total**: ~20-30 minutes first time, then 30 seconds on subsequent runs

---

**Status**: ✅ Ready to start development!

**Questions?** Check the [GitHub Issues](https://github.com/yourusername/food-demand-forecasting/issues) or ask your team lead.

---

*Last Updated: January 2024*
