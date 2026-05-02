# 🚀 Google Colab Setup Guide

## How to Run Week 1 Notebook in Google Colab

### Option 1: Direct Upload (Recommended)

1. **Open Google Colab**
   - Go to [colab.research.google.com](https://colab.research.google.com)

2. **Upload the Notebook**
   - Click `File` → `Upload notebook`
   - Select `week1_eda.ipynb` from your computer
   - OR: Click `GitHub` tab, paste your repo URL

3. **Install Dependencies**
   - Copy-paste this into the first cell and run:
   ```python
   !pip install pandas numpy scipy matplotlib seaborn plotly statsmodels scikit-learn -q
   ```

4. **Run All Cells**
   - Click `Runtime` → `Run all`
   - Wait for execution to complete (~5-10 minutes)

5. **View Outputs**
   - All visualizations will display inline
   - HTML file (ACF/PACF) will auto-download

---

### Option 2: GitHub Direct Link

1. **Paste this URL in browser**
   ```
   https://colab.research.google.com/github/yourusername/restaurant-ai-forecasting/blob/main/week1_eda.ipynb
   ```

2. **Colab will auto-load the notebook**
   - Click the play button (▶️) to run cells

3. **First cell auto-installs dependencies** ✓

---

### Option 3: Clone from Command Line

```bash
# In Colab cell:
!git clone https://github.com/yourusername/restaurant-ai-forecasting.git
cd restaurant-ai-forecasting
!jupyter nbconvert --to notebook --execute week1_eda.ipynb
```

---

## 🔧 Troubleshooting

### Issue: Module not found (ImportError)
**Solution:**
```python
!pip install statsmodels plotly -q
```

### Issue: Memory limit (for large datasets)
**Solution:**
```python
# Colab provides 12.7GB RAM by default
# For very large datasets, use:
df_sample = df.sample(frac=0.5)  # Sample 50% of data
```

### Issue: Plots not displaying
**Solution:**
```python
import matplotlib.pyplot as plt
%matplotlib inline  # Add this at top of notebook
```

### Issue: HTML file not opening
**Solution:**
```python
# Plotly HTML downloads automatically in Colab
# Download from Files panel → right-click → Download
```

---

## 📊 Expected Runtime

| Section | Time | Dependencies |
|---------|------|--------------|
| Data Loading | 1-2 min | Basic |
| Data Cleaning | 2-3 min | NumPy, Pandas |
| EDA | 3-4 min | Matplotlib |
| Decomposition | 2-3 min | Statsmodels |
| ACF/PACF | 2-3 min | Statsmodels, Plotly |
| Feature Engineering | 3-4 min | Pandas, Scikit-learn |
| Anomaly Detection | 2-3 min | SciPy, NumPy |
| **Total** | **~20 minutes** | All libraries |

---

## 💾 Saving Your Work

### Save to Google Drive
```python
from google.colab import drive
drive.mount('/content/drive')

# Save notebook
!cp week1_eda.ipynb /content/drive/MyDrive/restaurant-ai/
```

### Save Visualizations
```python
# All PNG files auto-save to Files section
# Export to Drive:
!cp *.png /content/drive/MyDrive/restaurant-ai/results/
```

### Download All Outputs
```
Click Files panel → Select .png or .html → Download
```

---

## 🔐 Security Note

**Never** hardcode credentials in Colab notebooks. Use environment variables:

```python
import os
from dotenv import load_dotenv

# In Colab Secrets (🔑 icon):
# - Click "Secrets"
# - Add secret: DATA_PATH = ~/restaurant_sales.csv

data_path = os.getenv('DATA_PATH')
```

---

## 🎯 Quick Checklist

- [ ] Opened [colab.research.google.com](https://colab.research.google.com)
- [ ] Uploaded or linked to notebook
- [ ] Installed dependencies with pip
- [ ] Ran all cells successfully
- [ ] Visualizations displayed correctly
- [ ] Downloaded results (PNG files)
- [ ] Committed notebook to GitHub
- [ ] Pushed with proper commit message

---

## 📈 Next Steps After Week 1

1. **Commit to GitHub**
   ```bash
   git add week1_eda.ipynb
   git commit -m "eda: completed Week 1 time-series analysis and EDA"
   git push
   ```

2. **Document Findings**
   - Update README with Week 1 results
   - Save visualizations to `outputs/` folder

3. **Prepare for Week 2**
   - Review feature engineering requirements
   - Identify additional external data sources

---

**Ready?** Click that play button ▶️ and let's go! 🚀
