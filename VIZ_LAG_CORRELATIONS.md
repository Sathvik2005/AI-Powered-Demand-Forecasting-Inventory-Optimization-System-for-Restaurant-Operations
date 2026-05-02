# Visualization - Lag Relationships and Feature Correlations

## Lag Feature Visualization

### Purpose
Visualize how demand from previous days/weeks correlates with current demand to validate feature engineering.

### Scatter Plot: Current vs Lag-1
```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Lag-1 vs Current
axes[0].scatter(df_clean['lag_1'], df_clean['num_orders'], alpha=0.6)
axes[0].set_xlabel('Demand Lag-1 (Previous Day)')
axes[0].set_ylabel('Current Demand')
axes[0].set_title('Lag-1 Correlation')
axes[0].plot([df_clean['lag_1'].min(), df_clean['lag_1'].max()], 
             [df_clean['lag_1'].min(), df_clean['lag_1'].max()], 
             'r--', label='Perfect Correlation')
axes[0].legend()

# Lag-7 vs Current
axes[1].scatter(df_clean['lag_7'], df_clean['num_orders'], alpha=0.6, color='orange')
axes[1].set_xlabel('Demand Lag-7 (Same Day Last Week)')
axes[1].set_ylabel('Current Demand')
axes[1].set_title('Lag-7 Correlation')

# Lag-14 vs Current
axes[2].scatter(df_clean['lag_14'], df_clean['num_orders'], alpha=0.6, color='green')
axes[2].set_xlabel('Demand Lag-14 (Two Weeks Ago)')
axes[2].set_ylabel('Current Demand')
axes[2].set_title('Lag-14 Correlation')

plt.tight_layout()
plt.show()
```

### Interpretation
- **Strong Linear Pattern**: Good lag feature (predictive)
- **Scattered Points**: Weak correlation (less predictive)
- **Horizontal/Vertical Spread**: Non-linear relationship

## Heatmap: Feature Correlations

### Complete Correlation Matrix
```python
# Calculate correlations
correlation_matrix = df_clean.corr()

# Create heatmap
plt.figure(figsize=(14, 10))
sns.heatmap(correlation_matrix, 
            annot=True,           # Show values
            fmt='.2f',            # 2 decimal places
            cmap='coolwarm',      # Color scheme
            center=0,             # Center at 0
            square=True,          # Square cells
            cbar_kws={'label': 'Correlation'})
plt.title('Feature Correlation Heatmap')
plt.tight_layout()
plt.show()
```

### Key Insights from Heatmap
- **Positive correlations** (red): Features move together
- **Negative correlations** (blue): Features move opposite
- **White**: No correlation
- **Saturation**: Strength of relationship

### Correlation Strength Guide
| Range | Interpretation |
|-------|----------------|
| 0.9-1.0 | Very Strong Positive |
| 0.7-0.9 | Strong Positive |
| 0.5-0.7 | Moderate Positive |
| 0.3-0.5 | Weak Positive |
| -0.3-0.3 | No/Weak Correlation |
| -0.5--0.3 | Weak Negative |
| -0.7--0.5 | Moderate Negative |
| -0.9--0.7 | Strong Negative |

## Lag Features Analysis

### Distribution of Lag Correlations
```python
# Calculate correlation of each lag with target
lags = ['lag_1', 'lag_7', 'lag_14', 'lag_30']
correlations = []

for lag in lags:
    corr = df_clean[lag].corr(df_clean['num_orders'])
    correlations.append(corr)

# Plot
fig, ax = plt.subplots(figsize=(10, 5))
ax.bar(lags, correlations, color=['blue', 'orange', 'green', 'red'])
ax.set_ylabel('Correlation with Target')
ax.set_title('Lag Features - Correlation with Demand')
ax.axhline(y=0.8, color='r', linestyle='--', label='Strong Threshold')
ax.legend()
plt.show()

# Print values
for lag, corr in zip(lags, correlations):
    print(f"{lag}: {corr:.3f}")
```

### Expected Output
```
lag_1: 0.924
lag_7: 0.888
lag_14: 0.824
lag_30: 0.756
```

## Rolling Statistics Visualization

### Multiple Rolling Means
```python
fig, ax = plt.subplots(figsize=(14, 5))

# Plot original and rolling averages
ax.plot(df_clean.index, df_clean['num_orders'], 
        label='Actual Demand', linewidth=1, alpha=0.7)
ax.plot(df_clean.index, df_clean['rolling_mean_7'], 
        label='7-Day Average', linewidth=2)
ax.plot(df_clean.index, df_clean['rolling_mean_14'], 
        label='14-Day Average', linewidth=2)
ax.plot(df_clean.index, df_clean['rolling_mean_30'], 
        label='30-Day Average', linewidth=2)

ax.set_xlabel('Time')
ax.set_ylabel('Number of Orders')
ax.set_title('Demand Smoothing with Different Rolling Windows')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### Volatility Over Time
```python
fig, ax = plt.subplots(figsize=(14, 5))

# Plot rolling standard deviation
ax.fill_between(df_clean.index, 
                df_clean['rolling_mean_7'] - df_clean['rolling_std_7'],
                df_clean['rolling_mean_7'] + df_clean['rolling_std_7'],
                alpha=0.3, label='±1 Std Dev (7-day)')
ax.plot(df_clean.index, df_clean['rolling_mean_7'], 
        label='Mean (7-day)', linewidth=2)

ax.set_xlabel('Time')
ax.set_ylabel('Number of Orders')
ax.set_title('Demand Volatility - Mean ± 1 Standard Deviation')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Feature Distribution Plots

### Individual Feature Distributions
```python
# Select engineered features
features_to_plot = ['lag_1', 'lag_7', 'rolling_mean_7', 'rolling_std_7', 
                    'day_sin', 'day_cos', 'month_sin', 'month_cos']

fig, axes = plt.subplots(2, 4, figsize=(16, 8))
axes = axes.ravel()

for idx, feature in enumerate(features_to_plot):
    axes[idx].hist(df_clean[feature], bins=50, edgecolor='black', alpha=0.7)
    axes[idx].set_title(f'Distribution: {feature}')
    axes[idx].set_xlabel('Value')
    axes[idx].set_ylabel('Frequency')

plt.tight_layout()
plt.show()
```

## Feature Engineering Validation Dashboard

### Complete 4-Panel Dashboard
```python
fig = plt.figure(figsize=(16, 10))
gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.3)

# Panel 1: Lag Correlations
ax1 = fig.add_subplot(gs[0, 0])
lags_corr = [df_clean[f'lag_{i}'].corr(df_clean['num_orders']) 
             for i in [1, 7, 14, 30]]
ax1.bar(['lag_1', 'lag_7', 'lag_14', 'lag_30'], lags_corr)
ax1.set_title('Lag Feature Correlations')
ax1.set_ylabel('Correlation')

# Panel 2: Time Series with Rolling Means
ax2 = fig.add_subplot(gs[0, 1])
ax2.plot(df_clean.index, df_clean['num_orders'], alpha=0.5, label='Actual')
ax2.plot(df_clean.index, df_clean['rolling_mean_7'], label='7-day MA')
ax2.plot(df_clean.index, df_clean['rolling_mean_30'], label='30-day MA')
ax2.set_title('Demand Trend with Rolling Averages')
ax2.legend()

# Panel 3: Correlation Heatmap (subset)
ax3 = fig.add_subplot(gs[1, 0])
corr_subset = df_clean[['num_orders', 'lag_1', 'lag_7', 'rolling_mean_7', 
                         'rolling_std_7', 'day_of_week', 'month']].corr()
sns.heatmap(corr_subset, annot=True, fmt='.2f', cmap='coolwarm', ax=ax3)
ax3.set_title('Key Feature Correlations')

# Panel 4: Feature Statistics
ax4 = fig.add_subplot(gs[1, 1])
feature_stats = df_clean[['num_orders', 'lag_1', 'lag_7', 'rolling_mean_7']].describe()
ax4.axis('off')
ax4.table(cellText=feature_stats.round(1).values,
          rowLabels=feature_stats.index,
          colLabels=feature_stats.columns,
          cellLoc='center', loc='center')
ax4.set_title('Feature Statistics')

plt.suptitle('Feature Engineering Validation Dashboard', fontsize=16, y=0.995)
plt.show()
```

## Best Practices for Visualization

### 1. Always Label Axes
```python
plt.xlabel('Time (Days)')
plt.ylabel('Demand (Orders)')
plt.title('Demand Forecast vs Actual')
```

### 2. Include Legend
```python
ax.legend(loc='best', fontsize=10)
```

### 3. Use Appropriate Colors
```python
# Use colorblind-friendly palette
sns.set_palette("colorblind")
```

### 4. Adjust Figure Size
```python
plt.figure(figsize=(14, 6))  # Width, Height
```

### 5. Save for Reports
```python
plt.savefig('demand_forecast.png', dpi=300, bbox_inches='tight')
```
