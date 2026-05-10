import { motion } from 'framer-motion';
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useApi } from '../hooks/useApi';

export function Models() {
  const { summary, loading, error } = useApi();

  if (error) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <section className="hero">
          <h1>🤖 Model Comparison</h1>
          <p className="error-banner">⚠️ Cannot connect to backend: {error}</p>
        </section>
      </motion.main>
    );
  }

  if (loading) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="loading-banner">📡 Loading model details...</div>
      </motion.main>
    );
  }

  const comparisonData = summary?.comparison ?? [];

  return (
    <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="noise" />

      <section className="hero">
        <div>
          <p className="eyebrow">Week 3: Model Selection & Tuning</p>
          <h1>🤖 Model Comparison</h1>
          <p className="hero-copy">
            Baseline → Random Forest → XGBoost → Tuned XGBoost with TimeSeriesSplit cross-validation.
          </p>
        </div>
      </section>

      {summary && (
        <div className="content">
          <section className="grid one-col">
            <motion.article className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="panel-header">
                <h2>Model Performance Metrics</h2>
                <span>MAE & RMSE comparison across all candidates</span>
              </div>
              <div className="chart-wrap" style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="model" tick={{ fill: '#c6d1ff', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#c6d1ff' }} />
                    <Tooltip contentStyle={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <Legend />
                    <Bar dataKey="mae" fill="#78f0c4" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="rmse" fill="#7aa7ff" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.article>
          </section>

          <section className="grid one-col">
            <motion.article
              className="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="panel-header">
                <h2>Model Details</h2>
                <span>Configuration and performance summary</span>
              </div>
              <div className="table-container">
                <table className="model-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>MAE</th>
                      <th>RMSE</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.model} className={row.model === summary.best_model_name ? 'best-model' : ''}>
                        <td>
                          <strong>{row.model}</strong>
                        </td>
                        <td>{row.mae.toLocaleString()}</td>
                        <td>{row.rmse.toLocaleString()}</td>
                        <td>{row.model === summary.best_model_name ? '⭐ Production' : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.article>
          </section>

          <section className="grid one-col">
            <motion.article
              className="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="panel-header">
                <h2>Hyperparameter Tuning Strategy</h2>
                <span>TimeSeriesSplit + GridSearchCV</span>
              </div>
              <div className="insight-list">
                <div className="insight-card">
                  <label>Cross-validation method</label>
                  <strong>TimeSeriesSplit (5 folds)</strong>
                </div>
                <div className="insight-card">
                  <label>Tuning algorithm</label>
                  <strong>GridSearchCV</strong>
                </div>
                <div className="insight-card">
                  <label>Best model</label>
                  <strong>{summary.best_model_name}</strong>
                </div>
                <div className="insight-card">
                  <label>Optimization metric</label>
                  <strong>Negative MAE</strong>
                </div>
              </div>
              <div className="narrative">
                <p>
                  TimeSeriesSplit ensures no future data leakage. Each fold's test set comes after training set
                  chronologically. Best hyperparameters selected based on cross-validation performance, then model
                  re-evaluated on final hold-out test set.
                </p>
              </div>
            </motion.article>
          </section>
        </div>
      )}
    </motion.main>
  );
}
