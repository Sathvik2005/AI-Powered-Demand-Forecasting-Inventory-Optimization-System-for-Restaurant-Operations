# 🏗️ Project Structure & Organization

```
food-demand-forecasting/
│
├── 📖 Documentation
│   ├── README.md                      # Project overview & setup instructions
│   ├── COMMIT_GUIDE.md                # Git commit standards & semantic prefixes
│   ├── COLAB_SETUP.md                 # Google Colab quick-start guide
│   ├── PREFLIGHT_CHECKLIST.md         # Pre-flight checks before development
│   ├── WEEK1_SUMMARY.md               # Week 1 findings & deliverables
│   ├── PROJECT_STRUCTURE.md           # This file - folder organization
│   └── FIRST_TIME_SETUP.md            # Complete setup instructions
│
├── 📊 Notebooks (Active Development)
│   ├── week1_food_demand_eda.ipynb    # ✓ WEEK 1: Data loading & EDA
│   ├── week2_feature_engineering.ipynb # 🔜 WEEK 2: Feature engineering
│   ├── week3_model_training.ipynb     # 🔜 WEEK 3: Model training & tuning
│   └── week4_evaluation.ipynb         # 🔜 WEEK 4: Results & deployment
│
├── 📁 Data Directories (Not Committed - see .gitignore)
│   ├── data/                          # Processed data for modeling
│   ├── raw_data/                      # Original Kaggle downloads
│   └── outputs/                       # Generated visualizations & results
│
├── 🔧 Configuration & Setup
│   ├── requirements.txt                # Python dependencies (pip install)
│   ├── .gitignore                      # Security: Excludes data/models/credentials
│   ├── .env.example                    # Template for environment variables
│   └── setup.py                        # (Optional) Package installation
│
├── 📈 Models & Artifacts (Not Committed)
│   ├── models/                         # Saved model weights (.pkl, .h5, .joblib)
│   ├── results/                        # Performance metrics & evaluations
│   └── logs/                           # Training logs & experiment tracking
│
└── 📚 Supporting Files
    ├── .github/                        # (Optional) GitHub Actions workflows
    ├── LICENSE                         # Project license (MIT recommended)
    └── CITATION.bib                    # Citation format
```

---

## 📋 File Descriptions

### Documentation Files

| File | Purpose | For Whom |
|------|---------|----------|
| `README.md` | Project overview, setup, usage | Everyone (first read) |
| `FIRST_TIME_SETUP.md` | Step-by-step environment setup | New contributors |
| `COMMIT_GUIDE.md` | Git standards & semantic commits | Developers |
| `PREFLIGHT_CHECKLIST.md` | Verification before starting | QA/reviewers |
| `COLAB_SETUP.md` | Google Colab instructions | Cloud users |
| `WEEK1_SUMMARY.md` | Week 1 findings & next steps | Stakeholders |
| `PROJECT_STRUCTURE.md` | This file - project organization | Project leads |

### Notebook Files

| Notebook | Status | Purpose | Output |
|----------|--------|---------|--------|
| `week1_food_demand_eda.ipynb` | ✅ Complete | Data loading, cleaning, EDA | 6 visualizations + engineered features |
| `week2_feature_engineering.ipynb` | 🔄 In Progress | Advanced features, train/test split | Prepared datasets for modeling |
| `week3_model_training.ipynb` | 📅 Planned | Model training & hyperparameter tuning | Trained models + performance metrics |
| `week4_evaluation.ipynb` | 📅 Planned | Final evaluation & business reporting | Forecasts + business recommendations |

### Data Organization

**Important**: Raw data and models are **NOT committed** to GitHub (see `.gitignore`)

```
data/
├── raw/
│   └── train.csv          # Original Kaggle dataset
│
├── processed/
│   ├── train_clean.csv    # Cleaned training data
│   ├── train_features.csv # Feature-engineered data
│   └── test_features.csv  # Test set with features
│
└── splits/
    ├── train_split.csv    # Training set (80% / 10 months)
    └── test_split.csv     # Test set (20% / 2 months)
```

---

## 🔄 Workflow & Development Cycle

### Before Starting Work
1. ✓ Read `README.md`
2. ✓ Follow `FIRST_TIME_SETUP.md`
3. ✓ Check `PREFLIGHT_CHECKLIST.md`

### During Development
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes in notebooks
3. Commit frequently with semantic messages (see `COMMIT_GUIDE.md`)
4. Push: `git push origin feature/your-feature`

### Before Pushing to Main
1. Clear notebook outputs
2. Verify `.gitignore` working
3. Run `PREFLIGHT_CHECKLIST.md`
4. Create semantic commit message
5. Push to GitHub

### Code Review Standards
- ✓ All sections documented
- ✓ Outputs cleared in notebooks
- ✓ No sensitive data in commits
- ✓ Semantic commit messages
- ✓ 12+ commits per week minimum

---

## 📊 Kaggle Dataset Integration

**Dataset**: Food Demand Forecasting  
**Source**: `https://www.kaggle.com/datasets/kannanaikkal/food-demand-forecasting`  
**Download Method**: kagglehub (automatic in notebook)

### Dataset Columns
```
- id: Unique identifier
- date: Date of order
- center_id: Restaurant/delivery center ID
- meal_id: Food item identifier
- checkout_price: Actual price paid
- base_price: Listed price
- num_orders: Daily demand (TARGET)
- ... additional columns
```

**Note**: Large CSV files are in `.gitignore` - downloaded automatically via kagglehub

---

## 🚀 Quick Start Commands

### Setup Environment
```bash
# Clone repository
git clone https://github.com/yourusername/food-demand-forecasting.git
cd food-demand-forecasting

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Run Notebook Locally
```bash
jupyter notebook week1_food_demand_eda.ipynb
```

### Run in Google Colab
```
1. Go to colab.research.google.com
2. GitHub → Select this repo → week1_food_demand_eda.ipynb
```

### Make a Commit
```bash
# Follow COMMIT_GUIDE.md standards
git add week1_food_demand_eda.ipynb
git commit -m "eda: completed seasonal decomposition analysis"
git push origin main
```

---

## 📈 Project Milestones

| Week | Status | Deliverable | Commits |
|------|--------|-------------|---------|
| Week 1 | ✅ Complete | EDA + feature engineering | 12-20 |
| Week 2 | 🔄 In Progress | Advanced features + splits | 12-20 |
| Week 3 | 📅 Planned | Model training & tuning | 15-25 |
| Week 4 | 📅 Planned | Evaluation & reporting | 10-15 |
| **Total** | **In Progress** | **Production ML Pipeline** | **60-80** |

---

## 📚 Related Files

- **Dependencies**: See `requirements.txt` for pip install
- **Security**: See `.gitignore` for what's excluded  
- **Git Standards**: See `COMMIT_GUIDE.md` for commit conventions
- **Setup Help**: See `FIRST_TIME_SETUP.md` for detailed instructions

---

## 🆘 Need Help?

| Question | Answer |
|----------|--------|
| How do I set up locally? | → See `FIRST_TIME_SETUP.md` |
| How do I use in Google Colab? | → See `COLAB_SETUP.md` |
| What git practices should I follow? | → See `COMMIT_GUIDE.md` |
| What are the project goals? | → See `README.md` |
| What should I check before starting? | → See `PREFLIGHT_CHECKLIST.md` |

---

**Last Updated**: January 2024  
**Project Owner**: Your Name  
**Status**: 🟢 Active Development