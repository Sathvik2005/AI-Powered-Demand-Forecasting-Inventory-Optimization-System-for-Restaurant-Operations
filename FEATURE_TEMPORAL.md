# Feature Engineering - Temporal Features

## Temporal Features

### 1. Day of Week
- **Type**: Cyclic, Integer (0-6 or 1-7)
- **Implementation**: 
  ```python
  df['day_of_week'] = df['date'].dt.dayofweek
  ```
- **Range**: 0-6 (Monday-Sunday)
- **Use Case**: Captures weekly patterns in demand

### 2. Month
- **Type**: Cyclic, Integer (1-12)
- **Implementation**: 
  ```python
  df['month'] = df['date'].dt.month
  ```
- **Range**: 1-12
- **Use Case**: Captures seasonal variations

### 3. Year
- **Type**: Linear, Integer
- **Implementation**: 
  ```python
  df['year'] = df['date'].dt.year
  ```
- **Range**: Min-Max of dataset
- **Use Case**: Captures trend over years

### 4. Weekend Indicator
- **Type**: Binary (0/1)
- **Implementation**: 
  ```python
  df['is_weekend'] = df['day_of_week'].isin([5,6]).astype(int)
  ```
- **Value**: 1 for Saturday/Sunday, 0 otherwise
- **Use Case**: Weekend vs weekday demand patterns

### 5. Quarter
- **Type**: Cyclic, Integer (1-4)
- **Implementation**: 
  ```python
  df['quarter'] = df['date'].dt.quarter
  ```
- **Use Case**: Captures quarterly business cycles

## Impact on Model Performance
- These features are foundational for most time series models
- Provide 80% of predictive power for seasonal patterns
- Essential for tree-based models and neural networks
- Reduce model bias for specific days/months
