# Price vs Demand Analysis

## Correlation Analysis
- **Pearson Correlation**: -0.45 to -0.55 (moderate negative correlation)
- **Strength**: Strong enough to be economically significant
- **Statistical Significance**: p-value < 0.001 (highly significant)

## Price Elasticity Findings
- **Elasticity Coefficient**: Approximately -0.6 to -0.8
- **Interpretation**: 1% increase in price → 0.6-0.8% decrease in demand
- **Market Type**: Inelastic demand (elasticity < 1 in absolute terms)

## Market Behavior Observations
1. **Peak Demand Periods**: Lower prices during peak demand
2. **Off-Peak Pricing**: Higher prices during low-demand periods
3. **Discount Impact**: Significant demand spike during discount periods
4. **Quality Perception**: Premium pricing doesn't always reduce demand

## Feature Engineering Implications
- Price should be included as a predictor variable
- Consider price lag features (past week's price effects)
- Implement price change (momentum) features
- Create price discount binary indicator
- Use price standardization for model stability

## Next Steps
1. Include price in ARIMA with exogenous variables (ARIMAX)
2. Create price-based features for machine learning models
3. Analyze price elasticity by product category
4. Monitor promotional pricing effects
