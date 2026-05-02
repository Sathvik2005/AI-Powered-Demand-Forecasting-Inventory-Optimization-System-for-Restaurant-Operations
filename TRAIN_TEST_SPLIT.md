# Train-Test Split - Time-Based Temporal Validation

## Why Time-Based Split?

### Problem with Random Split
```python
# ❌ WRONG - Random split causes data leakage
train, test = train_test_split(df, test_size=0.2, random_state=42)
# Future data leaks into training! Model learns future patterns!
```

### Correct Approach for Time Series
```python
# ✅ CORRECT - Temporal split (respects time order)
n = len(df)
split_point = int(0.8 * n)
train = df[:split_point]
test = df[split_point:]
```

## Split Strategies

### Strategy 1: Simple 80-20 Split

#### Implementation
```python
n = len(df_clean)  # Assume df_clean after NaN dropping
train_size = int(0.8 * n)

X_train = df_clean.iloc[:train_size].drop('num_orders', axis=1)
y_train = df_clean.iloc[:train_size]['num_orders']

X_test = df_clean.iloc[train_size:].drop('num_orders', axis=1)
y_test = df_clean.iloc[train_size:]['num_orders']

print(f"Train size: {len(X_train)}")  # e.g., 852 rows
print(f"Test size: {len(X_test)}")    # e.g., 213 rows
```

#### Pros & Cons
- ✅ Simple and intuitive
- ✅ ~80% training, ~20% testing (standard)
- ❌ Small test set might not capture all patterns
- ❌ Single split point (no cross-validation)

### Strategy 2: Time-Based with Margin

#### Implementation
```python
# Use first 70%, test on last 20%, ignore 10% (transition)
n = len(df_clean)
train_end = int(0.7 * n)
gap = int(0.1 * n)
test_start = train_end + gap
test_end = test_start + int(0.2 * n)

X_train = df_clean.iloc[:train_end].drop('num_orders', axis=1)
y_train = df_clean.iloc[:train_end]['num_orders']

X_test = df_clean.iloc[test_start:test_end].drop('num_orders', axis=1)
y_test = df_clean.iloc[test_start:test_end]['num_orders']
```

#### Advantages
- Transition gap prevents immediate future influence
- Cleaner temporal separation
- More conservative (less training data)

### Strategy 3: Rolling Window (Time Series Cross-Validation)

#### Implementation
```python
def time_series_cv_splits(df, n_splits=5, test_size=0.2):
    """Generate expanding window splits"""
    n = len(df)
    test_len = int(n * test_size)
    
    for i in range(n_splits):
        # Expanding train set
        train_end = n - test_len * (n_splits - i)
        test_start = train_end
        test_end = test_start + test_len
        
        X_train = df.iloc[:train_end].drop('num_orders', axis=1)
        y_train = df.iloc[:train_end]['num_orders']
        
        X_test = df.iloc[test_start:test_end].drop('num_orders', axis=1)
        y_test = df.iloc[test_start:test_end]['num_orders']
        
        yield X_train, X_test, y_train, y_test

# Usage
for fold, (X_tr, X_te, y_tr, y_te) in enumerate(time_series_cv_splits(df_clean, n_splits=5)):
    print(f"Fold {fold}: Train {len(X_tr)}, Test {len(X_te)}")
```

#### Example Output
```
Fold 0: Train 852, Test 213
Fold 1: Train 1065, Test 213
Fold 2: Train 1278, Test 213
Fold 3: Train 1491, Test 213
Fold 4: Train 1704, Test 213
```

#### Advantages
- ✅ Multiple test sets for robust evaluation
- ✅ Increasing training data (realistic scenario)
- ✅ Better generalization assessment
- ✅ Detects model drift over time

## Data Split Summary for Restaurant Data

### Dataset Characteristics
```
Total records (after NaN drop):  1,065
Observations per year:           ~365
Yearly frequency:                3 years of data
```

### Recommended Split (80-10-10)
```python
train_size = int(0.8 * 1065)    # 852 rows (~2.3 years)
val_size = int(0.1 * 1065)      # 107 rows (~3.5 months)
test_size = 1065 - train_size - val_size  # 106 rows (~3.5 months)

# Chronological assignment
X_train = df_clean.iloc[:train_size]
X_val = df_clean.iloc[train_size:train_size+val_size]
X_test = df_clean.iloc[train_size+val_size:]
```

### Alternative: 70-15-15 Split
```python
train = df_clean.iloc[:int(0.7*1065)]   # 745 rows (~2 years)
val = df_clean.iloc[745:int(0.85*1065)]  # 160 rows (~5 months)
test = df_clean.iloc[int(0.85*1065):]    # 160 rows (~5 months)
```

## Prevent Data Leakage

### What to Avoid
```python
# ❌ WRONG: Feature scaling on entire dataset
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df)  # Leaks test statistics into train!

# ✅ CORRECT: Fit scaler on training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Use training statistics
```

### Best Practice for Preprocessing
```python
from sklearn.preprocessing import StandardScaler

# 1. Split data
split_idx = int(0.8 * len(df_clean))
X_train = df_clean.iloc[:split_idx].drop('num_orders', axis=1)
y_train = df_clean.iloc[:split_idx]['num_orders']
X_test = df_clean.iloc[split_idx:].drop('num_orders', axis=1)
y_test = df_clean.iloc[split_idx:]['num_orders']

# 2. Fit scaler on training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 3. Train model
model.fit(X_train_scaled, y_train)

# 4. Evaluate on test
y_pred = model.predict(X_test_scaled)
```

## Complete Implementation Template

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Assume df_clean is prepared with all features and no NaN

# 1. Define split point (80% train, 20% test)
n_total = len(df_clean)
split_idx = int(0.8 * n_total)

# 2. Create splits
X_train = df_clean.iloc[:split_idx].drop('num_orders', axis=1)
y_train = df_clean.iloc[:split_idx]['num_orders']

X_test = df_clean.iloc[split_idx:].drop('num_orders', axis=1)
y_test = df_clean.iloc[split_idx:]['num_orders']

# 3. Fit preprocessor on training data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. Verify split
print(f"Total observations: {n_total}")
print(f"Train set: {len(X_train)} ({100*len(X_train)/n_total:.1f}%)")
print(f"Test set: {len(X_test)} ({100*len(X_test)/n_total:.1f}%)")
print(f"Features: {X_train_scaled.shape[1]}")

# ✅ Ready for model training!
```

## Validation Metrics for Time Series

### Key Metrics
- **MAE**: Mean Absolute Error (interpretable in units)
- **RMSE**: Root Mean Squared Error (penalizes large errors)
- **MAPE**: Mean Absolute Percentage Error (scale-independent)
- **SMAPE**: Symmetric MAPE (better for low values)

### Evaluation Code
```python
from sklearn.metrics import mean_absolute_error, mean_squared_error

y_pred = model.predict(X_test_scaled)

mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred) ** 0.5
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAPE: {mape:.2f}%")
```
