import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApi } from '../hooks/useApi';

function StatCard({ label, value, accent }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="stat-accent" style={{ background: accent }} />
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </motion.div>
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function Dashboard() {
  const { summary, loading, error } = useApi();

  const forecastData = useMemo(() => summary?.forecast ?? [], [summary]);
  const featureData = useMemo(() => summary?.feature_importance ?? [], [summary]);
  const comparisonData = useMemo(() => summary?.comparison ?? [], [summary]);
  const insights = summary?.insights ?? {};

  const statCards = [
    { key: 'dataset_rows', label: 'Dataset Rows', accent: '#78f0c4' },
    { key: 'train_rows', label: 'Training Rows', accent: '#7aa7ff' },
    { key: 'test_rows', label: 'Test Rows', accent: '#ffb86b' },
  ];

  return (
    <motion.main
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="noise" />

      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="eyebrow">Week 3 - 4 Forecasting Command Center</p>
          <h1>Food demand forecasting with model selection & business reporting.</h1>
          <p className="hero-copy">
            Real Kaggle data (85 daily rows). Time-series tuned XGBoost. Feature engineering + cross-validation.
          </p>
        </div>
        <div className="hero-meta">
          <MetricPill label="Best Model" value={summary?.best_model_name || 'Loading...'} />
          <MetricPill
            label="MAE"
            value={summary?.best_metrics?.mae ? summary.best_metrics.mae.toFixed(0) : '—'}
          />
          <MetricPill
            label="RMSE"
            value={summary?.best_metrics?.rmse ? summary.best_metrics.rmse.toFixed(0) : '—'}
          />
        </div>
      </motion.section>

      {error && (
        <div className="error-banner">
          ⚠️ Cannot connect to backend: {error}. Make sure Uvicorn is running on http://127.0.0.1:8000
        </div>
      )}
      {loading && <div className="loading-banner">📡 Fetching real data from backend...</div>}

      {summary && (
        <>
          <section className="stats-grid">
            {statCards.map((card) => (
              <StatCard
                key={card.key}
                label={card.label}
                value={summary[card.key]?.toLocaleString?.() || '—'}
                accent={card.accent}
              />
            ))}
          </section>

          <section className="grid two-col">
            <motion.article
              className="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="panel-header">
                <h2>Forecast Overlay</h2>
                <span>Actual vs predicted demand</span>
              </div>
              <div className="chart-wrap tall">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#78f0c4" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#78f0c4" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="predFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7aa7ff" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#7aa7ff" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#c6d1ff', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#c6d1ff' }} />
                    <Tooltip contentStyle={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#78f0c4"
                      fill="url(#actualFill)"
                      strokeWidth={2}
                      name="Actual"
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#7aa7ff"
                      fill="url(#predFill)"
                      strokeWidth={2}
                      name="Predicted"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.article>

            <motion.article
              className="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <div className="panel-header">
                <h2>Model Comparison</h2>
                <span>MAE by candidate model</span>
              </div>
              <div className="chart-wrap tall">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="model" tick={{ fill: '#c6d1ff', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#c6d1ff' }} />
                    <Tooltip contentStyle={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <Bar dataKey="mae" radius={[10, 10, 0, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell
                          key={entry.model}
                          fill={['#78f0c4', '#7aa7ff', '#ffb86b', '#c084fc'][index % 4]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.article>
          </section>

          <section className="grid two-col">
            <motion.article
              className="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="panel-header">
                <h2>Feature Importance</h2>
                <span>What drives demand</span>
              </div>
              <div className="chart-wrap tall">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureData} layout="vertical">
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#c6d1ff' }} />
                    <YAxis dataKey="feature" type="category" width={180} tick={{ fill: '#c6d1ff', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <Bar dataKey="importance" radius={[0, 12, 12, 0]} fill="#7aa7ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.article>

            <motion.article
              className="panel insight-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div className="panel-header">
                <h2>Business Reporting</h2>
                <span>Executive summary</span>
              </div>
              <div className="insight-list">
                <div className="insight-card">
                  <label>Average daily demand</label>
                  <strong>{insights.avg_daily_demand?.toFixed?.(0) ?? '—'}</strong>
                </div>
                <div className="insight-card">
                  <label>Peak demand</label>
                  <strong>{insights.peak_demand?.toFixed?.(0) ?? '—'}</strong>
                </div>
                <div className="insight-card">
                  <label>Weekend uplift %</label>
                  <strong>{insights.weekend_uplift_pct?.toFixed?.(1) ?? '—'}%</strong>
                </div>
                <div className="insight-card">
                  <label>Detected anomalies</label>
                  <strong>{insights.anomaly_days ?? '—'}</strong>
                </div>
              </div>
              <div className="narrative">
                <p>
                  Real data from Kaggle Food Demand dataset. Tuned XGBoost selected for production. Feature importance
                  shows EMA-7 and momentum-7 as top demand drivers.
                </p>
              </div>
            </motion.article>
          </section>
        </>
      )}

      <motion.section
        className="footer-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          ✅ Week 3: Model selection + tuning with TimeSeriesSplit. ✅ Week 4: Evaluation + business reporting.
        </div>
      </motion.section>
    </motion.main>
  );
}
