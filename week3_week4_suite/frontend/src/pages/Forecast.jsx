import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';

export function Forecast() {
  const { summary, loading, error } = useApi();

  if (error) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <section className="hero">
          <h1>📈 Forecast Results</h1>
          <p className="error-banner">⚠️ Cannot connect to backend: {error}</p>
        </section>
      </motion.main>
    );
  }

  if (loading) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="loading-banner">📡 Loading forecast data...</div>
      </motion.main>
    );
  }

  const forecast = summary?.forecast ?? [];

  const downloadCSV = () => {
    const headers = ['Date', 'Actual', 'Predicted', 'Error', 'Error %'];
    const rows = forecast.map((row) => {
      const error = row.actual - row.predicted;
      const errorPct = ((error / row.actual) * 100).toFixed(2);
      return [row.date, row.actual, row.predicted.toFixed(0), error.toFixed(0), errorPct];
    });

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forecast_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="noise" />

      <section className="hero">
        <div>
          <p className="eyebrow">Week 4: Forecasting Results</p>
          <h1>📈 Forecast Details</h1>
          <p className="hero-copy">
            {forecast.length} test predictions with actual values. Real data from Kaggle Food Demand dataset.
          </p>
        </div>
        <button className="export-btn" onClick={downloadCSV}>
          📥 Download CSV
        </button>
      </section>

      {forecast.length > 0 && (
        <section className="grid one-col">
          <motion.article
            className="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="panel-header">
              <h2>Forecast Table</h2>
              <span>{forecast.length} predictions</span>
            </div>
            <div className="table-container">
              <table className="forecast-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Actual Demand</th>
                    <th>Predicted Demand</th>
                    <th>Absolute Error</th>
                    <th>Error %</th>
                  </tr>
                </thead>
                <tbody>
                  {forecast.map((row, idx) => {
                    const error = row.actual - row.predicted;
                    const errorPct = ((error / row.actual) * 100).toFixed(1);
                    const absErrorPct = Math.abs(errorPct);

                    return (
                      <tr
                        key={idx}
                        className={absErrorPct < 5 ? 'good' : absErrorPct < 10 ? 'medium' : 'poor'}
                      >
                        <td>{row.date}</td>
                        <td>{row.actual.toLocaleString()}</td>
                        <td>{row.predicted.toLocaleString('en', { maximumFractionDigits: 0 })}</td>
                        <td>{Math.abs(error).toLocaleString('en', { maximumFractionDigits: 0 })}</td>
                        <td>
                          <span className="error-pct">{absErrorPct.toFixed(1)}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.article>
        </section>
      )}

      <section className="grid one-col">
        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="panel-header">
            <h2>Forecast Summary</h2>
            <span>Statistical overview</span>
          </div>
          {forecast.length > 0 && (
            <div className="insight-list">
              <div className="insight-card">
                <label>Total predictions</label>
                <strong>{forecast.length}</strong>
              </div>
              <div className="insight-card">
                <label>Avg actual demand</label>
                <strong>
                  {(forecast.reduce((sum, r) => sum + r.actual, 0) / forecast.length).toLocaleString('en', {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </div>
              <div className="insight-card">
                <label>Avg predicted demand</label>
                <strong>
                  {(forecast.reduce((sum, r) => sum + r.predicted, 0) / forecast.length).toLocaleString('en', {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </div>
              <div className="insight-card">
                <label>MAE</label>
                <strong>{summary?.best_metrics?.mae?.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
              </div>
              <div className="insight-card">
                <label>RMSE</label>
                <strong>{summary?.best_metrics?.rmse?.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
              </div>
            </div>
          )}
        </motion.article>
      </section>
    </motion.main>
  );
}
