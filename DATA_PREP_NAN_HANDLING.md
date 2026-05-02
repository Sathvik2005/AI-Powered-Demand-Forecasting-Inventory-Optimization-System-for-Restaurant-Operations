# Data Preparation - Handling Missing Values After Feature Engineering

## Challenge
After creating lag features, rolling statistics, and other derived features, the first N rows contain NaN values where N is the maximum lag or window size.

## NaN Distribution After Feature Engineering

### Lag-based NaNs
```python
df['lag_7']   # First 7 rows are NaN
df['lag_14']  # First 14 rows are NaN
df['lag_30']  # First 30 rows are NaN
```

### Rolling Statistics NaNs
```python
df['rolling_mean_7']   # First 6 rows are NaN
df['rolling_mean_14']  # First 13 rows are NaN
df['rolling_std_30']   # First 29 rows are NaN
```

### Total Impact
```
Maximum NaN rows = max(lag_period, rolling_window)
                 = max(30, 30)
                 = 30 rows
```

## Solution 1: Drop Missing Values (Recommended)

### Implementation
```python
# Drop rows with any NaN values
df_clean = df.dropna()

# After dropping
print(f"Original shape: {df.shape}")
print(f"After dropping NaN: {df_clean.shape}")
# Output: Original: (1095, 50), After: (1065, 50)
```

### Advantages
- ✅ Clean data, no imputation assumptions
- ✅ Preserves true relationships
- ✅ No data leakage from imputation
- ✅ Simpler for time series models

### Disadvantages
- ❌ Lose 30 days of data (3% if annual)
- ❌ Less training data for small datasets
- ❌ Might miss important seasonal patterns at start

## Solution 2: Forward Fill (Not Recommended for This Case)

### Implementation
```python
df_filled = df.fillna(method='ffill')
```

### Why Not Recommended
- ⚠️ Creates artificial patterns
- ⚠️ Data leakage from propagation
- ⚠️ Violates time series assumptions
- ⚠️ Misleading model performance

## Solution 3: Backward Fill + Forward Fill

### Implementation
```python
df_filled = df.fillna(method='bfill').fillna(method='ffill')
```

### When to Use
- Only for feature variables, not target
- After initial lag/rolling creation
- Combined with other strategies

## Solution 4: Interpolation

### Linear Interpolation
```python
df_interp = df.interpolate(method='linear')
```

### Polynomial Interpolation
```python
df_interp = df.interpolate(method='polynomial', order=2)
```

### Time-based Interpolation
```python
df_interp = df.interpolate(method='time')
```

### Limitations
- Creates synthetic values
- Assumes smooth transitions
- Not ideal for time series with jumps

## Recommended Strategy

### Step 1: Create All Features
```python
# Create lag features
df['lag_1'] = df['num_orders'].shift(1)
df['lag_7'] = df['num_orders'].shift(7)
df['lag_14'] = df['num_orders'].shift(14)

# Create rolling features
df['rolling_mean_7'] = df['num_orders'].rolling(7).mean()
df['rolling_std_14'] = df['num_orders'].rolling(14).std()

# Create EMA features
df['ema_7'] = df['num_orders'].ewm(span=7, adjust=False).mean()
```

### Step 2: Drop NaN Rows
```python
# For time series, dropping first rows is acceptable
df_clean = df.dropna()

# Verify deletion
print(f"Dropped {len(df) - len(df_clean)} rows")
# Output: Dropped 30 rows
```

### Step 3: Reset Index
```python
# Reset index for clean training
df_clean = df_clean.reset_index(drop=True)
```

### Step 4: Verify Data Quality
```python
# Check for remaining NaNs
assert df_clean.isnull().sum().sum() == 0, "Still have NaN values!"

# Check data types
print(df_clean.dtypes)

# Check value ranges
print(df_clean.describe())
```

## Data Loss Analysis

### Acceptable Loss Scenarios
- ✅ First 30 rows of 1095: 2.7% loss (acceptable)
- ✅ First 30 rows of 365: 8.2% loss (marginal)
- ✅ First 30 rows of 100: 30% loss (NOT acceptable)

### Decision Framework
```python
loss_percentage = 30 / len(df) * 100

if loss_percentage < 3:
    print("✅ Acceptable - drop NaN rows")
elif loss_percentage < 10:
    print("⚠️ Marginal - consider increasing training data")
else:
    print("❌ Unacceptable - need different strategy")
```

## Complete Implementation Template

```python
import pandas as pd
import numpy as np

# 1. Create features
df['lag_1'] = df['num_orders'].shift(1)
df['lag_7'] = df['num_orders'].shift(7)
df['lag_14'] = df['num_orders'].shift(14)
df['rolling_mean_7'] = df['num_orders'].rolling(7).mean()
df['rolling_std_14'] = df['num_orders'].rolling(14).std()
df['ema_7'] = df['num_orders'].ewm(span=7, adjust=False).mean()

# 2. Drop NaN rows
print(f"Before: {df.shape}")
df_clean = df.dropna()
print(f"After: {df_clean.shape}")

# 3. Reset index
df_clean = df_clean.reset_index(drop=True)

# 4. Verify
assert df_clean.isnull().sum().sum() == 0
print("✅ Data preparation complete!")
```

## Alternative: Use Recent Data Onwards

```python
# Drop first N rows explicitly
N = 30  # Based on maximum lag/window
df_clean = df.iloc[N:].reset_index(drop=True)
```

This ensures:
- All lag features are valid
- All rolling statistics are complete
- No NaN values in any feature
- Clean dataset ready for modeling
