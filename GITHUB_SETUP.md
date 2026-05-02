# 🐙 GitHub Repository Setup Guide

Complete step-by-step guide to create and push this project to GitHub.

---

## Part 1: Create GitHub Repository

### Step 1: Create Repository on GitHub.com

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `food-demand-forecasting`
3. **Description**: "🍽️ AI-powered demand forecasting and inventory optimization for restaurant/food delivery services using real Kaggle data"
4. **Visibility**: `Public` (for portfolio) or `Private` (for enterprise)
5. **Initialize with**:
   - ❌ Do NOT check "Add a README file"
   - ❌ Do NOT check ".gitignore"
   - ❌ Do NOT check "Choose a license"
   
   *You already have these files locally*

6. Click **Create repository**

### Step 2: Copy Repository URL

After creation, you see:
```
https://github.com/yourusername/food-demand-forecasting.git
```

Save this for next steps.

---

## Part 2: Initialize Local Git & Push

### Step 3: Navigate to Project Directory

```bash
# Go to your project folder
cd "e:\infotact internship\resetaurant servies  Ai demand Forecasting and Inventory Optimization"
```

### Step 4: Initialize Git Repository

```bash
# Initialize git
git init

# Verify it worked
git status
# Output should show: "nothing to commit, but working tree has changes"
```

### Step 5: Configure Git (First-Time Only)

```bash
# Set your name and email (global, one-time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

### Step 6: Create Initial Commit

```bash
# Stage all files (respects .gitignore)
git add .

# Verify what will be committed
git status
# Should show green "added" files, NOT show *.csv or .env files

# Make first commit with semantic message
git commit -m "data-clean: Week 1 complete - Kaggle food demand EDA with kagglehub integration"
```

**Expected staged files**:
- ✓ week1_food_demand_eda.ipynb
- ✓ README.md
- ✓ requirements.txt
- ✓ .gitignore
- ✓ COMMIT_GUIDE.md
- ✓ COLAB_SETUP.md
- ✓ WEEK1_SUMMARY.md
- ✓ PREFLIGHT_CHECKLIST.md
- ✓ PROJECT_STRUCTURE.md
- ✓ FIRST_TIME_SETUP.md

**Should NOT be staged**:
- ❌ *.csv files
- ❌ *.pkl files
- ❌ .env files
- ❌ kaggle.json
- ❌ venv/ folder
- ❌ __pycache__/ folders

### Step 7: Add Remote Repository

```bash
# Replace yourusername with your GitHub username
git remote add origin https://github.com/yourusername/food-demand-forecasting.git

# Verify it worked
git remote -v
# Output should show fetch and push URLs
```

### Step 8: Push to GitHub

```bash
# Push main branch to GitHub
git branch -M main
git push -u origin main

# This might ask for GitHub credentials:
# - Username: your GitHub username
# - Password: your GitHub personal access token (NOT password)
```

**⚠️ If Authentication Fails**:

You need a **Personal Access Token** (passwords don't work with git CLI):

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. **Token name**: "food-demand-forecasting"
4. **Expiration**: 90 days (or custom)
5. **Scopes**: Check `repo` and `workflow`
6. Click **Generate token**
7. Copy token (you won't see it again!)
8. Paste as password when `git push` asks

### Step 9: Verify Push Succeeded

```bash
# Check GitHub branch
git branch -r

# Should show:
# origin/main

# Verify on GitHub.com
# Visit: https://github.com/yourusername/food-demand-forecasting
# You should see all files!
```

---

## Part 3: Repository Configuration

### Step 10: Add GitHub Badges to README

Edit README.md header to include status badges:

```markdown
# 🍽️ Food Demand Forecasting & Inventory Optimization

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/yourusername/food-demand-forecasting)
[![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/food-demand-forecasting)](https://github.com/yourusername/food-demand-forecasting/commits/main)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8+-green)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

AI-powered demand forecasting and inventory optimization for restaurant/food delivery services using real Kaggle data.
```

### Step 11: Create LICENSE File

```bash
# Create MIT License (recommended for open source)
# File: LICENSE

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### Step 12: Add .editorconfig (Optional but Recommended)

```bash
# File: .editorconfig

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{py,ipynb}]
indent_style = space
indent_size = 4

[*.md]
trim_trailing_whitespace = false
```

---

## Part 4: Continuous Workflow

### Making Commits Moving Forward

```bash
# After making changes to notebook:
git add week1_food_demand_eda.ipynb

# Use semantic commit messages (see COMMIT_GUIDE.md)
git commit -m "eda: added seasonal decomposition analysis"

# Push to GitHub
git push origin main
```

### Semantic Commit Prefix Guide

| Prefix | Use Case | Example |
|--------|----------|---------|
| `data-clean` | Data loading, cleaning, preprocessing | `data-clean: removed NaN values using forward fill` |
| `eda` | Exploratory analysis, visualizations | `eda: added lag features analysis` |
| `feature` | Feature engineering | `feature: created rolling average features` |
| `eda` | Charts, plots, visualizations | `eda: added decomposition plots` |
| `docs` | Documentation updates | `docs: updated README with Kaggle instructions` |
| `config` | Dependencies, configs, setup | `config: updated requirements.txt with kagglehub` |
| `fix` | Bug fixes, corrections | `fix: handled missing values in date column` |

### Weekly Workflow Example

```bash
# Week 1 (You are here!)
git commit -m "data-clean: Week 1 complete - full EDA pipeline"

# Week 2 starts
git add week2_feature_engineering.ipynb
git commit -m "feature: added external variables (weather, holidays)"
git commit -m "eda: analyzed feature correlations"
git push origin main

# Week 3 starts
git add week3_model_training.ipynb
git commit -m "model: trained baseline linear regression"
git commit -m "model: implemented XGBoost with hyperparameter tuning"
git push origin main
```

---

## Part 5: Repository Structure on GitHub

After push, your GitHub repo should look like:

```
food-demand-forecasting/
├── 📄 README.md                       # Main project documentation
├── 📄 requirements.txt                # Dependencies list
├── 📄 .gitignore                      # Security: Exclude sensitive files
├── 📄 LICENSE                         # MIT License
├── 📄 .editorconfig                   # Editor configuration
│
├── 📚 Documentation/
│   ├── FIRST_TIME_SETUP.md            # Setup guide
│   ├── COMMIT_GUIDE.md                # Git standards
│   ├── COLAB_SETUP.md                 # Google Colab instructions
│   ├── PREFLIGHT_CHECKLIST.md         # Pre-flight verification
│   ├── WEEK1_SUMMARY.md               # Week 1 findings
│   ├── PROJECT_STRUCTURE.md           # Folder organization
│   └── GITHUB_SETUP.md                # This file
│
└── 📊 Notebooks/
    ├── week1_food_demand_eda.ipynb    # ✓ Week 1 complete
    └── week2_feature_engineering.ipynb # 🔄 Week 2 (coming soon)
```

---

## Part 6: GitHub Best Practices

### 1. Update README Every Week

```markdown
### 📊 Project Status

| Week | Status | Deliverable |
|------|--------|-------------|
| Week 1 | ✅ Complete | Data loading & EDA |
| Week 2 | 🔄 In Progress | Feature engineering |
| Week 3 | 📅 Planned | Model training |
| Week 4 | 📅 Planned | Evaluation & reporting |
```

### 2. Create GitHub Issues for Tasks

Example issue:

```markdown
Title: Week 2: Add external variables (weather, holidays)

Description:
- [ ] Download weather data for date range
- [ ] Merge weather with demand data
- [ ] Add holiday flags (national, local)
- [ ] Analyze correlation with demand
- [ ] Create visualization comparing weather impact

Acceptance Criteria:
- Code passes pytest
- New features documented in notebook
- At least 2 visualizations showing weather/holiday impact
```

### 3. Enable GitHub Actions (CI/CD) - Optional

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest
      - name: Test imports
        run: python -c "import pandas, numpy, statsmodels; print('✓ OK')"
```

### 4. Create GitHub Projects (Optional)

[GitHub Projects](https://github.com/yourusername/food-demand-forecasting/projects):

Create a **Kanban board** with columns:
- 📋 Backlog (Week 2, 3, 4 tasks)
- 🔄 In Progress (Current tasks)
- ✅ Done (Completed tasks)

---

## Part 7: Visibility & Discovery

### Add Topics (GitHub: Settings → Options)

```
kaggle, time-series, forecasting, demand-prediction, 
inventory-optimization, machine-learning, pandas, 
food-delivery, ai, data-science
```

### Create Releases (Optional)

```bash
# Tag a release after each week
git tag -a v0.1.0 -m "Week 1: Data loading and EDA complete"
git push origin v0.1.0

# View on GitHub: Releases section
```

### Share on Social Media

```
🚀 Just pushed Week 1 of my Food Demand Forecasting project to GitHub!

📊 What it does:
- Kaggle dataset integration with kagglehub
- Complete data cleaning pipeline
- 16+ engineered features
- Time-series decomposition analysis

📈 Tech: Python, Pandas, Statsmodels, Plotly

🔗 GitHub: github.com/yourusername/food-demand-forecasting

#MachineLearning #DataScience #TimeSeries #OpenSource
```

---

## Common Issues & Troubleshooting

### Issue 1: "fatal: Cannot reread config file"

```bash
# Solution: Remove corrupted .git/config
rm -f .git/config

# Reconfigure:
git remote add origin https://github.com/yourusername/food-demand-forecasting.git
```

### Issue 2: "rejected ... because the remote contains work that you do not have locally"

```bash
# Solution: Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Issue 3: Large files (.csv) accidentally committed

```bash
# Solution: Use git-lfs (Large File Storage)
# OR simply ensure files are in .gitignore before first commit

# To remove from history:
git rm --cached *.csv
git commit --amend -m "Remove CSV files from tracking"
git push origin main --force-with-lease
```

### Issue 4: Forgot to add .gitignore before committing secrets

```bash
# Solution: Regenerate credentials + use git secrets scanner
# For Kaggle: Regenerate API token
# For .env: Regenerate all secrets

# Then use:
git filter-branch --tree-filter 'rm -f .env kaggle.json' HEAD
```

---

## Verification Checklist

After pushing to GitHub, verify:

- ✅ All 10 files visible in repo root
- ✅ `.gitignore` working (no `.csv` files visible)
- ✅ Commit history shows proper semantic messages
- ✅ README renders correctly with badges
- ✅ LICENSE file present
- ✅ No sensitive data visible (search browser for "password", "key", etc.)
- ✅ Notebooks display properly (GitHub renders .ipynb)

---

## Next Steps After GitHub Upload

1. **Share Repository URL** with team/stakeholders
2. **Add Collaborators** (Settings → Collaborators)
3. **Enable Branch Protection** (Settings → Branches)
4. **Create GitHub Issues** for Week 2 tasks
5. **Monitor Engagement** (Stars, forks, watchers)
6. **Update README** weekly with progress

---

## Keep Your Local Git Updated

```bash
# Pull latest changes (if multiple people work on this)
git pull origin main

# Make changes...
git add .

# Commit
git commit -m "your semantic message"

# Push
git push origin main
```

---

## Resources

| Resource | Link |
|----------|------|
| GitHub Docs | [docs.github.com](https://docs.github.com) |
| Semantic Versioning | [semver.org](https://semver.org) |
| Conventional Commits | [conventionalcommits.org](https://www.conventionalcommits.org) |
| MIT License Info | [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT) |
| Git Cheat Sheet | [github.com/joshnh/Git-Commands](https://github.com/joshnh/Git-Commands) |

---

## Quick Reference: Git Commands

```bash
# Clone a repo
git clone https://github.com/user/repo.git

# Check status
git status

# Stage all changes
git add .

# Make commit
git commit -m "semantic: description"

# Push to GitHub
git push origin main

# Pull latest
git pull origin main

# Create branch
git checkout -b feature/name

# Switch branch
git checkout main

# View history
git log --oneline
```

---

**Status**: ✅ Ready to push to GitHub!

**Next**: Follow [FIRST_TIME_SETUP.md](FIRST_TIME_SETUP.md) to verify everything works before pushing.

---

*Last Updated: January 2024*