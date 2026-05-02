# Feature Engineering - Holiday Features

## India Holiday Calendar Implementation

### Holiday List (2023-2024)
- **Republic Day**: January 26
- **Holi**: March (varies - 2024: March 25)
- **Good Friday**: March (Christian, varies)
- **Diwali**: October-November (Hindu, varies)
- **Ganesh Chaturthi**: August-September (varies)
- **Independence Day**: August 15
- **Janmashtami**: August-September (varies)
- **Durga Puja**: September-October (Bengali festival)
- **Navratri**: September-October (9 days)
- **Eid**: Multiple occurrences (Islamic calendar)
- **Christmas**: December 25
- **New Year**: January 1

### Feature Engineering Strategy

#### 1. Holiday Indicator (Binary)
```python
holidays = ['2024-01-26', '2024-03-25', ...]  # India holidays
df['is_holiday'] = df['date'].isin(holidays).astype(int)
```
- **Value**: 1 for holiday, 0 otherwise
- **Impact**: Holiday demand typically 20-40% higher

#### 2. Days Until/Since Holiday
```python
df['days_to_holiday'] = df['date'].apply(lambda x: min_days_to_next_holiday(x))
df['days_since_holiday'] = df['date'].apply(lambda x: min_days_since_last_holiday(x))
```
- **Pre-holiday Effect**: Increased demand 3-7 days before
- **Post-holiday Effect**: Decreased demand 1-3 days after

#### 3. Holiday Type Encoding
```python
# One-hot encoding for festival types
df['is_hindu_festival'] = ...
df['is_islamic_festival'] = ...
df['is_national_holiday'] = ...
df['is_christian_holiday'] = ...
```

### Impact Analysis
- **Holiday Effect**: 15-35% higher demand on holidays
- **Pre-Holiday Surge**: 10-20% increase 2-3 days before
- **Post-Holiday Slump**: 5-10% decrease after holidays
- **Regional Impact**: Some holidays affect certain regions more

### Recommendations
1. Use holiday calendar specific to restaurant location
2. Create lagged holiday features (2-7 days before)
3. Consider holiday type for targeted promotions
4. Monitor emerging holiday patterns from sales data
5. Update calendar annually for changing festival dates
