# 📝 Git Commit Guide - Restaurant AI Demand Forecasting

**CRITICAL**: Evaluation will ONLY be completed if all 4 weeks have meaningful commits with proper Git history.

---

## ⚠️ DO NOT DO THIS ❌

```bash
# ❌ DISQUALIFYING: Single massive commit at the end
git add .
git commit -m "Upload everything"
git push

# ❌ DISQUALIFYING: Week-level commits (not granular enough)
git commit -m "Week 1 done"

# ❌ DISQUALIFYING: Vague, non-informative messages
git commit -m "Update"
git commit -m "Changes"
git commit -m "Fix bug"
```

**Result**: IMMEDIATE DISQUALIFICATION ❌

---

## ✅ DO THIS INSTEAD ✓

Commits should be **granular, meaningful, and semantic** - representing isolated units of work.

### Commit Frequency
- **Minimum**: 3-5 commits per active development day
- **Ideal**: 5-8 commits per day (representing focused changes)
- **Total for Week 1**: 12-20 commits minimum

---

## 📌 Semantic Commit Prefixes

Use consistent prefixes to categorize your work:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `data-clean:` | Data loading, cleaning, validation | `data-clean: removed missing dates using forward fill` |
| `eda:` | Exploratory analysis, statistics | `eda: added seasonal decomposition analysis` |
| `feature-eng:` | Feature creation, transformation | `feature-eng: created 7-day lag features` |
| `viz:` | Visualizations, plots | `viz: added rolling average comparison charts` |
| `model-train:` | Model training, fitting | `model-train: trained XGBoost with depth=5` |
| `model-tuning:` | Hyperparameter optimization | `model-tuning: optimized learning rate using GridSearch` |
| `eval:` | Evaluation, metrics, validation | `eval: calculated MAE and RMSE on test set` |
| `report:` | Documentation, insights | `report: generated business recommendations` |
| `refactor:` | Code cleanup, organization | `refactor: reorganized notebook sections` |
| `fix:` | Bug fixes | `fix: corrected date index frequency specification` |

---

## 📋 Example Week 1 Commit Sequence

Here's what a professional Week 1 commit history should look like:

### Day 1: Data Loading & Cleaning
```bash
# Commit 1: Load data
git commit -m "data-clean: initial dataset loading from Kaggle retail_sales_2022-2023"
git push

# Commit 2: Validate data types
git commit -m "data-clean: validated datetime conversion and chronological sorting"
git push

# Commit 3: Handle outliers
git commit -m "data-clean: implemented IQR-based outlier capping (95th/5th percentile)"
git push

# Commit 4: Handle missing values
git commit -m "data-clean: verified date continuity across store-item combinations"
git push
```

### Day 2-3: Exploratory Data Analysis
```bash
# Commit 5: Aggregate data
git commit -m "eda: aggregated daily sales across store-item combinations"
git push

# Commit 6: Trend analysis
git commit -m "eda: calculated rolling averages (7-day, 14-day, 30-day) to reveal trends"
git push

# Commit 7: Decomposition
git commit -m "eda: performed seasonal decomposition (additive model, period=7)"
git push

# Commit 8: Day-of-week patterns
git commit -m "eda: analyzed weekday vs weekend demand patterns (+35% weekend spike)"
git push

# Commit 9: Monthly trends
git commit -m "eda: identified monthly seasonality with summer peaks"
git push
```

### Day 4: Autocorrelation & Advanced EDA
```bash
# Commit 10: ACF/PACF analysis
git commit -m "eda: plotted ACF/PACF to identify temporal dependencies at lag-7"
git push

# Commit 11: Stationarity testing
git commit -m "eda: performed ADF test confirming non-stationary series (p=0.15)"
git push

# Commit 12: Anomaly detection
git commit -m "eda: implemented Z-score based anomaly detection (threshold=2.5)"
git push
```

### Day 5: Feature Engineering & Finalization
```bash
# Commit 13: Lag features
git commit -m "feature-eng: created lag features (t-1, t-7, t-14, t-30 day sales)"
git push

# Commit 14: Rolling statistics
git commit -m "feature-eng: computed rolling mean, std, min, max (windows: 7, 14, 30 days)"
git push

# Commit 15: Chronological features
git commit -m "feature-eng: added day_of_week, month, quarter, is_weekend features"
git push

# Commit 16: Correlation analysis
git commit -m "viz: generated correlation heatmap identifying multicollinearity (r > 0.95)"
git push

# Commit 17: Visualization suite
git commit -m "viz: created 9 publication-quality charts for trend/seasonality analysis"
git push

# Commit 18: Business insights
git commit -m "report: extracted key findings for supply chain optimization (20-30% waste reduction potential)"
git push

# Commit 19: Documentation
git commit -m "docs: updated README with Week 1 findings and next steps"
git push

# Commit 20: Final cleanup
git commit -m "refactor: cleared notebook outputs and organized code sections"
git push
```

---

## ✍️ Commit Message Format

### Standard Format
```
<prefix>: <short description>

<optional detailed explanation>
```

### Examples

#### ✅ GOOD
```bash
git commit -m "data-clean: removed outliers using IQR method (Q1-1.5*IQR, Q3+1.5*IQR)

- Applied to 'sales' column
- Capped at 95th/5th percentile to preserve temporal continuity
- Reduced extreme values by 8% without losing data
- Visualized before/after distribution"
```

#### ✅ GOOD
```bash
git commit -m "eda: identified strong 7-day autocorrelation pattern in sales data

- ACF lag-7 significant at 0.75 correlation
- Indicates weekly seasonality driven by weekday patterns
- Weekend sales +35% higher than weekdays
- Informs lag feature selection for ML models"
```

#### ✅ GOOD
```bash
git commit -m "feature-eng: created 20 time-series features for predictive modeling

Features added:
- Chronological: day_of_week, month, quarter, is_weekend (4)
- Lag: t-1, t-7, t-14, t-30 (4)
- Rolling stats: rolling_mean, rolling_std, rolling_min, rolling_max (12)

All lags/rolling windows align with ACF analysis findings"
```

#### ❌ AVOID
```bash
# Too vague
git commit -m "updated notebook"

# No semantic prefix
git commit -m "added code"

# Incomplete information
git commit -m "eda: analysis"

# All caps (unprofessional)
git commit -m "DATA-CLEAN: REMOVED ALL OUTLIERS"
```

---

## 🔄 Integration with Jupyter Notebooks

### Before Committing
Always clear Jupyter notebook outputs to keep repository lean:

```python
# In notebook, before commit:
# 1. Click Kernel → Restart & Clear Output (or)
# 2. Run in terminal:
nbstripout week1_eda.ipynb
```

### Commit the Notebook
```bash
# Add only the cleared notebook (no huge output files)
git add week1_eda.ipynb
git commit -m "eda: added correlation heatmap and anomaly detection analysis"
git push
```

---

## 🚀 GitHub Workflow

### Setup (First Time)
```bash
# Initialize local repository
git init
git branch -M main

# Connect to remote
git remote add origin https://github.com/yourusername/restaurant-ai-forecasting.git
git push -u origin main
```

### Daily Workflow
```bash
# Check status
git status

# Stage specific files
git add week1_eda.ipynb
git add docs/findings.md

# Commit with semantic message
git commit -m "eda: completed trend and seasonality analysis for Week 1"

# Push to GitHub
git push

# Verify on GitHub
# https://github.com/yourusername/restaurant-ai-forecasting/commits/main
```

### After Each Major Task
```bash
# Example after completing outlier detection
git add week1_eda.ipynb
git commit -m "data-clean: implemented outlier detection with visualization (before/after comparison)"
git push
```

---

## 📊 Commit History Expectations

### Week 1 Expected History
```
20 commits | Dates: Jan 5-Jan 12
  ├─ data-clean: 5 commits (loading, validation, cleaning)
  ├─ eda: 8 commits (trends, seasonality, decomposition, ACF/PACF)
  ├─ feature-eng: 5 commits (lags, rolling stats, chronological)
  ├─ viz: 4 commits (visualizations)
  └─ report: 2 commits (insights, documentation)
```

### Week 2 Expected History
```
20+ commits | Dates: Jan 13-Jan 19
  ├─ feature-eng: 8 commits (advanced features, handling)
  ├─ data-clean: 3 commits (additional validation)
  ├─ eda: 5 commits (cross-validation splits)
  └─ report: 4 commits (feature importance analysis)
```

### Week 3 Expected History
```
25+ commits | Dates: Jan 20-Jan 26
  ├─ model-train: 12 commits (different algorithms, iterations)
  ├─ model-tuning: 8 commits (hyperparameter optimization)
  ├─ eval: 3 commits (validation, cross-validation)
  └─ report: 2 commits (model comparison report)
```

### Week 4 Expected History
```
20+ commits | Dates: Jan 27-Feb 02
  ├─ eval: 8 commits (final metrics, validation)
  ├─ report: 7 commits (business recommendations)
  ├─ viz: 3 commits (final visualizations)
  └─ refactor: 2 commits (final code cleanup)
```

---

## ⚡ Pro Tips for Success

### 1. Commit Early, Commit Often
```bash
# Good: Multiple small commits
git commit -m "eda: calculated weekly average sales"
git commit -m "eda: compared weekend vs weekday demand"
git commit -m "eda: created bar chart visualization"

# Bad: One large commit
git commit -m "eda: all analysis done"
```

### 2. Use Feature Branches for Experiments
```bash
# Create branch for experimentation
git checkout -b experiment/isolation-forest-anomaly

# Develop and commit on branch
git commit -m "experiment: tested isolation forest for anomaly detection"

# Merge successful experiments to main
git checkout main
git merge experiment/isolation-forest-anomaly
```

### 3. Check Your History
```bash
# View commit log
git log --oneline

# View detailed history
git log --graph --all --decorate

# View contributions per author
git shortlog -sn
```

### 4. Keep Sensitive Data OUT
```bash
# Always check git status before committing
git status

# Never commit these:
# ❌ .csv files (raw data)
# ❌ .pkl files (trained models)
# ❌ API keys or credentials
# ❌ Large output files

# Use .gitignore to prevent accidents
cat .gitignore  # Verify all sensitive patterns
```

---

## 🎯 Evaluation Rubric

| Criterion | Excellent | Good | Fair | Poor |
|-----------|-----------|------|------|------|
| **Commit Frequency** | 20+ commits/week | 12-20 commits/week | 8-12 commits/week | <8 commits/week ❌ |
| **Commit Granularity** | Highly focused (1-2 changes/commit) | Focused (2-4 changes) | Moderate (4-6 changes) | Large multi-topic commits ❌ |
| **Commit Messages** | Semantic + detailed (80+ chars) | Semantic + brief (50-80 chars) | Mostly semantic | Vague/unclear ❌ |
| **Git Workflow** | Feature branches + main | Direct to main (clean) | Mixed approach | Poor practice ❌ |
| **Notebook Management** | Outputs cleared, reproducible | Mostly cleared | Some outputs remain | Large outputs committed ❌ |

---

## 💡 Final Checklist Before Pushing

```bash
# ✓ Verify commit message is semantic and descriptive
# ✓ Ensure notebook outputs are cleared
# ✓ Check no sensitive data in diff
git diff --stat

# ✓ Verify file list looks correct
git status

# ✓ Run one final check on file sizes
git ls-files -l | grep -E '\.(csv|pkl|h5|xlsx)$'

# ✓ Push to GitHub
git push
```

---

**Remember**: Your Git history is a portfolio of your work. Make it count! 🚀
