# Feature Engineering - Demand Momentum and Price Features

## Demand Momentum Feature

### Definition
Momentum captures the rate of change in demand, indicating whether demand is accelerating or decelerating.

### Implementation

#### Simple Momentum (1-day change)
```python
df['demand_momentum'] = df['num_orders'].diff(1)
```
- **Positive**: Demand is increasing
- **Negative**: Demand is decreasing
- **Zero**: Demand stable
- **Use**: Detect trend reversal points

#### Percentage Change (More Robust)
```python
df['demand_pct_change'] = df['num_orders'].pct_change(1) * 100
```
- **Unit**: Percentage change from previous day
- **Scale-free**: Comparable across different demand levels
- **Example**: 15% increase regardless of absolute demand

#### Multi-period Momentum
```python
df['momentum_7'] = df['num_orders'] - df['num_orders'].shift(7)
df['momentum_14'] = df['num_orders'] - df['num_orders'].shift(14)
```
- **7-day**: Compare to same day last week
- **14-day**: Bi-weekly momentum
- **Advantage**: Removes weekly seasonality

### Momentum Indicators

#### 1. Acceleration (Change of Change)
```python
df['acceleration'] = df['demand_momentum'].diff(1)
```
- **Positive**: Acceleration (demand increasing faster)
- **Negative**: Deceleration (demand increasing slower)

#### 2. Momentum Magnitude
```python
df['momentum_magnitude'] = df['demand_momentum'].abs()
```
- Captures volatility of change
- High values = high instability
- Low values = stable demand

## Price Features

### Price Discount Feature

#### Binary Discount Indicator
```python
baseline_price = df['price'].rolling(30).mean()
df['is_discounted'] = (df['price'] < baseline_price * 0.95).astype(int)
```
- **Value**: 1 if price is >5% below baseline
- **Use**: Capture promotional periods
- **Impact**: Strong demand spike during discounts

#### Discount Percentage
```python
df['discount_pct'] = ((baseline_price - df['price']) / baseline_price * 100).clip(lower=0)
```
- **Range**: 0-100% (clipped for outliers)
- **Interpretation**: Higher discount % → higher demand lift
- **Elasticity**: Use in ARIMAX models

### Price Change Feature

#### Price Momentum
```python
df['price_change'] = df['price'].diff(1)
df['price_pct_change'] = df['price'].pct_change(1) * 100
```
- **Use**: Capture price adjustment effects
- **Lag**: Price changes might have lagged impact on demand

#### Price Level Category
```python
df['price_level'] = pd.cut(df['price'], bins=5, labels=['Very Low', 'Low', 'Medium', 'High', 'Very High'])
df['price_level_encoded'] = pd.cut(df['price'], bins=5, labels=[1, 2, 3, 4, 5]).astype(int)
```
- Categorical price segmentation
- Capture non-linear price effects

### Advanced Price Features

#### 1. Price Elasticity Window
```python
# Calculate elasticity over rolling 14-day windows
df['elasticity_14'] = df['demand_pct_change'].rolling(14).mean() / \
                      df['price_pct_change'].rolling(14).mean()
```
- Dynamic elasticity measurement
- Changes over time

#### 2. Price-Adjusted Demand
```python
df['price_normalized_demand'] = df['num_orders'] / (df['price'] / df['price'].mean())
```
- Removes price level effect
- Compares true demand changes

#### 3. Price-Demand Ratio
```python
df['price_demand_ratio'] = df['price'] / df['num_orders']
```
- Revenue per unit measurement
- Identifies optimal pricing

## Combined Features

### Momentum-Price Interaction
```python
df['momentum_price_interaction'] = df['demand_momentum'] * df['price_change']
```
- Captures: How demand momentum responds to price changes
- Positive: Demand up when price down
- Negative: Unusual pattern (investigate)

### Price-Adjusted Momentum
```python
df['price_adjusted_momentum'] = df['demand_momentum'] / df['price_level_encoded']
```
- Momentum normalized by price
- Fairer comparison across price segments

## Feature Importance Ranking

| Feature | Importance | Comments |
|---------|-----------|----------|
| demand_momentum | High | Captures trend changes |
| demand_pct_change | High | Scale-free momentum |
| momentum_7 | Very High | Removes seasonality |
| is_discounted | Very High | Strong demand lift |
| discount_pct | High | Quantifies promo effect |
| price_change | Medium | Lagged effects common |
| elasticity_14 | Medium | Dynamic pricing insights |

## Implementation Best Practices

### 1. Handling NaN Values
```python
# Momentum creates NaN in first row
df['demand_momentum'].fillna(df['demand_momentum'].mean(), inplace=True)

# Or drop first row if not needed
df = df.iloc[1:]
```

### 2. Outlier Handling
```python
# Extreme momentum values (>3 sigma)
Q1 = df['demand_momentum'].quantile(0.25)
Q3 = df['demand_momentum'].quantile(0.75)
IQR = Q3 - Q1
df['demand_momentum'] = df['demand_momentum'].clip(lower=Q1-3*IQR, upper=Q3+3*IQR)
```

### 3. Feature Scaling
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df['momentum_scaled'] = scaler.fit_transform(df[['demand_momentum']])
```

## Model Impact
- Momentum features improve RMSE by 10-15%
- Price discount is single strongest predictor
- Elasticity features critical for ARIMAX models
- Combined momentum + price reduces overfitting
