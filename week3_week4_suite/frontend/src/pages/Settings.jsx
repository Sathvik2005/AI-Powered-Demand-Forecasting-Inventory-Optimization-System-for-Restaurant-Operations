import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';

export function Settings() {
  const { summary, loading, error } = useApi();

  if (error) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <section className="hero">
          <h1>Settings & Configuration</h1>
          <p className="error-banner">Error: Cannot connect to backend: {error}</p>
        </section>
      </motion.main>
    );
  }

  if (loading) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="loading-banner">Loading settings...</div>
      </motion.main>
    );
  }

  return (
    <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="noise" />

      <section className="hero">
        <div>
          <p className="eyebrow">Configuration & Environment</p>
          <h1>Settings & System Information</h1>
          <p className="hero-copy">Dataset, model, and API configuration details.</p>
        </div>
      </section>

      <section className="grid one-col">
        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-header">
            <h2>Dataset Configuration</h2>
            <span>Kaggle Food Demand Forecasting</span>
          </div>
          <div className="insight-list">
            <div className="insight-card">
              <label>Dataset ID</label>
              <strong>kannanaikkal/food-demand-forecasting</strong>
            </div>
            <div className="insight-card">
              <label>Total rows (original)</label>
              <strong>{summary?.dataset_rows?.toLocaleString?.()}</strong>
            </div>
            <div className="insight-card">
              <label>Training rows</label>
              <strong>{summary?.train_rows?.toLocaleString?.()}</strong>
            </div>
            <div className="insight-card">
              <label>Test rows</label>
              <strong>{summary?.test_rows?.toLocaleString?.()}</strong>
            </div>
            <div className="insight-card">
              <label>Features engineered</label>
              <strong>16+</strong>
            </div>
            <div className="insight-card">
              <label>Train/test split</label>
              <strong>80 / 20 (time-series)</strong>
            </div>
          </div>
          <div className="narrative">
            <p>
              <strong>Note:</strong> Data aggregated to daily level for time-series consistency. Original dataset
              contains transaction-level rows (85K+). Final model trained on 68 days of training data, evaluated on 17
              days.
            </p>
          </div>
        </motion.article>
      </section>

      <section className="grid one-col">
        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="panel-header">
            <h2>Model Training Configuration</h2>
            <span>Hyperparameters and cross-validation strategy</span>
          </div>
          <div className="config-table">
            <div className="config-row">
              <div className="config-key">Cross-validation</div>
              <div className="config-value">TimeSeriesSplit (5 folds)</div>
            </div>
            <div className="config-row">
              <div className="config-key">Tuning algorithm</div>
              <div className="config-value">GridSearchCV with TimeSeriesSplit</div>
            </div>
            <div className="config-row">
              <div className="config-key">Selected model</div>
              <div className="config-value">{summary?.best_model_name}</div>
            </div>
            <div className="config-row">
              <div className="config-key">Tuned hyperparameters</div>
              <div className="config-value">max_depth: 4-6, learning_rate: 0.03-0.05, n_estimators: 250</div>
            </div>
            <div className="config-row">
              <div className="config-key">Optimization metric</div>
              <div className="config-value">Negative MAE</div>
            </div>
            <div className="config-row">
              <div className="config-key">Performance</div>
              <div className="config-value">
                MAE: {summary?.best_metrics?.mae?.toLocaleString?.('en', { maximumFractionDigits: 0 })} | RMSE:{' '}
                {summary?.best_metrics?.rmse?.toLocaleString?.('en', { maximumFractionDigits: 0 })}
              </div>
            </div>
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
            <h2>API & System Information</h2>
            <span>Backend and frontend endpoints</span>
          </div>
          <div className="config-table">
            <div className="config-row">
              <div className="config-key">Backend URL</div>
              <div className="config-value">http://127.0.0.1:8000</div>
            </div>
            <div className="config-row">
              <div className="config-key">Frontend URL</div>
              <div className="config-value">http://127.0.0.1:5173</div>
            </div>
            <div className="config-row">
              <div className="config-key">API Endpoint</div>
              <div className="config-value">/api/summary (GET)</div>
            </div>
            <div className="config-row">
              <div className="config-key">API Response Time</div>
              <div className="config-value">&lt; 100ms (cached)</div>
            </div>
            <div className="config-row">
              <div className="config-key">Framework (Backend)</div>
              <div className="config-value">FastAPI + Uvicorn</div>
            </div>
            <div className="config-row">
              <div className="config-key">Framework (Frontend)</div>
              <div className="config-value">React 18 + Vite + Recharts</div>
            </div>
          </div>
        </motion.article>
      </section>

      <section className="grid one-col">
        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="panel-header">
            <h2>Feature Engineering Pipeline</h2>
            <span>Engineered features used in model training</span>
          </div>
          <div className="feature-groups">
            <div className="feature-group">
              <h3>Temporal Features</h3>
              <div className="feature-grid">
                <span>day_of_week</span>
                <span>month</span>
                <span>year</span>
                <span>day_of_month</span>
              </div>
            </div>
            <div className="feature-group">
              <h3>Lagged Features</h3>
              <div className="feature-grid">
                <span>lag_1</span>
                <span>lag_7</span>
                <span>lag_14</span>
                <span>lag_30</span>
              </div>
            </div>
            <div className="feature-group">
              <h3>Rolling Statistics</h3>
              <div className="feature-grid">
                <span>rolling_mean_7</span>
                <span>rolling_mean_14</span>
                <span>rolling_mean_30</span>
                <span>rolling_std_7</span>
              </div>
            </div>
            <div className="feature-group">
              <h3>Advanced Features</h3>
              <div className="feature-grid">
                <span>ema_7</span>
                <span>momentum_7</span>
                <span>is_weekend</span>
              </div>
            </div>
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
            <h2>Data Security & Privacy</h2>
            <span>Compliance and best practices</span>
          </div>
          <div className="security-checklist">
            <div className="check-item">
              <span>✓</span>
              <div>
                <strong>No hardcoded credentials</strong>
                <p>All sensitive data via environment variables (.env)</p>
              </div>
            </div>
            <div className="check-item">
              <span>✓</span>
              <div>
                <strong>.gitignore protection</strong>
                <p>*.csv, *.pkl, *.h5 excluded from version control</p>
              </div>
            </div>
            <div className="check-item">
              <span>✓</span>
              <div>
                <strong>CORS configured</strong>
                <p>Backend only accepts requests from localhost:5173</p>
              </div>
            </div>
            <div className="check-item">
              <span>✅</span>
              <div>
                <strong>Model caching</strong>
                <p>@lru_cache on forecast generation (prevents re-computation)</p>
              </div>
            </div>
          </div>
        </motion.article>
      </section>
    </motion.main>
  );
}
