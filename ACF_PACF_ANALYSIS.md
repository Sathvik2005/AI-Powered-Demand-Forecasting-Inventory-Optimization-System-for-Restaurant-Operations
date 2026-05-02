# Autocorrelation and PACF Analysis

## ACF (Autocorrelation Function)
- **Significant Lags**: 1, 7, 14, 21 (multiples of 7 - weekly pattern)
- **Decay Pattern**: Slow decay suggests non-stationary series
- **Confidence Bands**: Many lags exceed 95% confidence level

## PACF (Partial Autocorrelation Function)
- **Significant Lags**: 1, 7, 14 (strongest autoregressive patterns)
- **AR Order Recommendation**: p=2 or p=3 for ARIMA models
- **SAR Order**: P=1 for seasonal ARIMA (SARIMA) models

## Stationarity Assessment
- Series appears **non-stationary** based on ACF pattern
- **Differencing Recommendation**: 
  - First differencing (d=1) for ARIMA
  - Seasonal differencing (D=1) for SARIMA with period=52
  
## Practical Implications
1. Use SARIMA(p,d,q)(P,D,Q,52) for forecasting
2. Lag-1 and Lag-7 features will be highly predictive
3. Consider exponential smoothing with trend and seasonality
4. Prophet model would handle seasonality well
