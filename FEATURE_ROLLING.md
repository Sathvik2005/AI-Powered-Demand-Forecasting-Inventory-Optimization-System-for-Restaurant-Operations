# Feature Engineering - Rolling Statistics

## Rolling Mean and Standard Deviation

### Rolling Mean (Moving Average)

#### 7-Day Rolling Mean
```python
df['rolling_mean_7'] = df['num_orders'].rolling(window=7, center=False).mean()
```
- **Purpose**: Smooths short-term fluctuations
- **Window**: 7 days (weekly average)
- **Advantage**: Highlights trend without noise
- **Lag Issue**: Creates lookahead bias if centered=True

#### 14-Day Rolling Mean
```python
df['rolling_mean_14'] = df['num_orders'].rolling(window=14, center=False).mean()
```
- **Purpose**: Captures bi-weekly trend
- **Smoother**: Less responsive to daily changes
- **Useful For**: Inventory planning (longer horizon)

#### 30-Day Rolling Mean (Monthly)
```python
df['rolling_mean_30'] = df['num_orders'].rolling(window=30, center=False).mean()
```
- **Purpose**: Long-term trend identification
- **Stability**: Highly stable, removes seasonal noise
- **Use Case**: Strategic planning

### Rolling Standard Deviation

#### 7-Day Rolling Std
```python
df['rolling_std_7'] = df['num_orders'].rolling(window=7).std()
```
- **Purpose**: Measure of demand volatility
- **Business Impact**: Defines safety stock levels
- **Formula**: sqrt(sum((x - mean)^2) / n)

#### 14-Day Rolling Std
```python
df['rolling_std_14'] = df['num_orders'].rolling(window=14).std()
```
- **Purpose**: Smoother volatility estimate
- **Inventory**: Determines buffer stock requirements

### Coefficient of Variation (Relative Volatility)
```python
df['cv_7'] = df['rolling_std_7'] / df['rolling_mean_7']
df['cv_14'] = df['rolling_std_14'] / df['rolling_mean_14']
```
- **Interpretation**: CV > 0.3 indicates high variability
- **Normalization**: Makes volatility comparable across different scales

## Advanced Rolling Statistics

### Rolling Min/Max (Range)
```python
df['rolling_min_7'] = df['num_orders'].rolling(window=7).min()
df['rolling_max_7'] = df['num_orders'].rolling(window=7).max()
df['rolling_range_7'] = df['rolling_max_7'] - df['rolling_min_7']
```
- **Use**: Identifies demand extremes for resource planning

### Rolling Median
```python
df['rolling_median_7'] = df['num_orders'].rolling(window=7).median()
```
- **Advantage**: Robust to outliers compared to mean
- **Smoothness**: Preserves sharp changes better than mean

### Rolling Quartiles
```python
df['rolling_q25_7'] = df['num_orders'].rolling(window=7).quantile(0.25)
df['rolling_q75_7'] = df['num_orders'].rolling(window=7).quantile(0.75)
df['rolling_iqr_7'] = df['rolling_q75_7'] - df['rolling_q25_7']
```

## Implementation Best Practices

### 1. Forward Fill for Missing Values
```python
# After rolling calculation, first n-1 values are NaN
df['rolling_mean_7'].fillna(method='ffill', inplace=True)
```

### 2. Avoid Lookahead Bias
- Set `center=False` to use only past data
- Never use centered windows for production forecasting

### 3. Combine Multiple Windows
```python
# Create features from different windows
rolling_features = ['rolling_mean_7', 'rolling_mean_14', 'rolling_std_7']
```

## Model Impact

| Feature | Importance | Comments |
|---------|-----------|----------|
| rolling_mean_7 | Very High | Strongest single feature |
| rolling_std_7 | High | Captures volatility |
| rolling_mean_14 | High | Smoother trend |
| cv_7 | Medium | Normalized volatility |
| rolling_range_7 | Medium | Demand extremes |

## Inventory Implications
- Mean: Expected demand level
- Std Dev: Safety stock calculation
- Min/Max: Warehouse capacity planning
- Range: Buffer inventory needs
