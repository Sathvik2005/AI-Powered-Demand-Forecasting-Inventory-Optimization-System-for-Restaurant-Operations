# Feature Engineering - Cyclic Encoding

## Why Cyclic Encoding?

### Problem with Raw Temporal Features
- Day 7 (Sunday) and Day 0 (Monday) are adjacent but have raw values 7 and 0
- Models treat them as far apart (distance = 7)
- Month 12 (December) and Month 1 (January) are close but values differ by 11

### Solution: Sine/Cosine Transformation
Map cyclic features to a circle where opposite points are far and adjacent points are close.

## Mathematical Foundation

For a cyclic feature with period $P$:

$$\text{Feature}_{\sin} = \sin\left(\frac{2\pi \cdot \text{value}}{P}\right)$$

$$\text{Feature}_{\cos} = \cos\left(\frac{2\pi \cdot \text{value}}{P}\right)$$

## Implementation

### 1. Day of Week Encoding (Period = 7)
```python
df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
```

| Day | Raw | Sin | Cos |
|-----|-----|-----|-----|
| 0 (Mon) | 0 | 0.00 | 1.00 |
| 3 (Thu) | 3 | -1.00 | 0.00 |
| 6 (Sun) | 6 | 0.78 | 0.63 |

### 2. Month Encoding (Period = 12)
```python
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
```
- Captures seasonal cycles
- December (12) and January (1) are adjacent on the circle
- June (6) is opposite to December (12)

### 3. Quarter Encoding (Period = 4)
```python
df['quarter_sin'] = np.sin(2 * np.pi * df['quarter'] / 4)
df['quarter_cos'] = np.cos(2 * np.pi * df['quarter'] / 4)
```

### 4. Hour of Day (if applicable, Period = 24)
```python
df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
```

## Geometric Interpretation

### Visualization
```
Circle with Day of Week:
         Mon (0,1)
              |
Sun(0.78,0.63)---Tue
         \   |   /
          \ Wed /
           \   /
      Thu--CENTER--Fri
```

- Similar days are geometrically close
- Euclidean distance reflects actual similarity
- Models learn smoothly across cycle boundaries

## Combined Cyclic Features

### Distance Metric
For two cyclic values $a$ and $b$:
$$d = \sqrt{(\sin_a - \sin_b)^2 + (\cos_a - \cos_b)^2}$$

This captures true cyclic distance:
- Distance from Monday to Tuesday: 0.45 (small)
- Distance from Monday to Thursday: 1.73 (large)
- Distance from Monday to Sunday: 0.45 (small - adjacent!)

## Feature Importance

| Feature | Type | Importance |
|---------|------|-----------|
| day_sin + day_cos | Cyclic | Very High |
| month_sin + month_cos | Cyclic | Very High |
| Raw day_of_week | Linear | Medium |
| Raw month | Linear | Medium |

## Implementation Best Practices

### 1. Always Use Pairs
```python
# Always add both sin and cos
# Using only one loses directional information
df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
```

### 2. Normalize if Needed
```python
# Usually not needed as sin/cos are already [-1, 1]
# But can normalize for consistency
df['day_sin'] = (df['day_sin'] + 1) / 2  # Scale to [0, 1]
df['day_cos'] = (df['day_cos'] + 1) / 2
```

### 3. Include Raw Features Too
```python
# Redundant but helps tree-based models
df['day_of_week_raw'] = df['day_of_week']
df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
```

## Model Performance Impact

### Neural Networks (LSTM, Dense)
- Cyclic encoding: 5-10% RMSE improvement
- Critical for capturing seasonal patterns
- Enables smooth gradient flow

### Tree-Based Models (XGBoost, Random Forest)
- Benefit from cyclic encoding: 2-3% improvement
- Still effective with raw features
- Cyclic helps with boundary conditions

### Linear Models (SARIMA, Linear Regression)
- Cyclic encoding: 3-5% improvement
- Essential for capturing seasonal effects
- Enables interaction terms

## Common Mistakes

❌ **Wrong**: Using only sin without cos
```python
df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
# Missing direction information!
```

✅ **Right**: Using both sin and cos
```python
df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
```

❌ **Wrong**: Wrong period
```python
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 30)  # Should be 12!
```

✅ **Right**: Correct period
```python
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
```
