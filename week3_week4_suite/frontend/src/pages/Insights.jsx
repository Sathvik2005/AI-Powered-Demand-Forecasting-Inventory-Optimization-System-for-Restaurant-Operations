import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';

export function Insights() {
  const { summary, loading, error } = useApi();

  if (error) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <section className="hero">
          <h1>💡 Business Insights</h1>
          <p className="error-banner">⚠️ Cannot connect to backend: {error}</p>
        </section>
      </motion.main>
    );
  }

  if (loading) {
    return (
      <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="aurora aurora-1" />
        <div className="loading-banner">📡 Loading insights...</div>
      </motion.main>
    );
  }

  const insights = summary?.insights ?? {};
  const features = summary?.feature_importance ?? [];
  const forecast = summary?.forecast ?? [];

  const bestFeatures = features.slice(0, 5);
  const errors = forecast.map((r) => Math.abs(r.actual - r.predicted));
  const avgError = errors.length > 0 ? errors.reduce((a, b) => a + b, 0) / errors.length : 0;
  const maxError = errors.length > 0 ? Math.max(...errors) : 0;
  const minError = errors.length > 0 ? Math.min(...errors) : 0;

  return (
    <motion.main className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="noise" />

      <section className="hero">
        <div>
          <p className="eyebrow">Week 4: Business Translation</p>
          <h1>💡 Business Insights & Recommendations</h1>
          <p className="hero-copy">Stakeholder-ready findings from model evaluation and feature analysis.</p>
        </div>
      </section>

      <section className="grid two-col">
        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-header">
            <h2>Demand Patterns</h2>
            <span>Key metrics from test period</span>
          </div>
          <div className="insight-list">
            <div className="insight-card">
              <label>Average daily demand</label>
              <strong>{insights.avg_daily_demand?.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="insight-card">
              <label>Peak demand observed</label>
              <strong>{insights.peak_demand?.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="insight-card">
              <label>Weekend uplift %</label>
              <strong>{insights.weekend_uplift_pct?.toFixed?.(1) ?? '—'}%</strong>
            </div>
            <div className="insight-card">
              <label>Most responsive day</label>
              <strong>Day {insights.top_weekday ?? '—'}</strong>
            </div>
          </div>
          <div className="narrative">
            <p>
              <strong>Recommendation:</strong> Allocate more inventory for weekend periods. The {insights.weekend_uplift_pct?.toFixed?.(1)}%
              uplift requires proactive restocking before Friday/Saturday.
            </p>
          </div>
        </motion.article>

        <motion.article
          className="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="panel-header">
            <h2>Forecast Accuracy</h2>
            <span>Error analysis from test period</span>
          </div>
          <div className="insight-list">
            <div className="insight-card">
              <label>Average absolute error</label>
              <strong>{avgError.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="insight-card">
              <label>Maximum error observed</label>
              <strong>{maxError.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="insight-card">
              <label>Minimum error observed</label>
              <strong>{minError.toLocaleString?.('en', { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="insight-card">
              <label>Detected anomalies</label>
              <strong>{insights.anomaly_days ?? '—'} days</strong>
            </div>
          </div>
          <div className="narrative">
            <p>
              <strong>Recommendation:</strong> Monitor the {insights.anomaly_days ?? 0} flagged anomaly days. These may
              indicate special events, holidays, or supply chain disruptions requiring manual intervention.
            </p>
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
            <h2>Top Demand Drivers</h2>
            <span>Features with highest importance scores</span>
          </div>
          <div className="feature-list">
            {bestFeatures.map((f, idx) => (
              <div key={idx} className="feature-item">
                <div className="feature-label">{f.feature}</div>
                <div className="feature-bar">
                  <div className="feature-fill" style={{ width: `${f.importance * 100}%` }} />
                </div>
                <div className="feature-value">{(f.importance * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
          <div className="narrative">
            <p>
              <strong>Interpretation:</strong> The top feature explains approximately{' '}
              {(bestFeatures[0]?.importance * 100).toFixed(0)}% of demand variance. Recency effects (EMA-7, momentum)
              dominate over seasonal or cyclic features, indicating demand is highly reactive to recent trends.
            </p>
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
            <h2>Strategic Recommendations</h2>
            <span>Action items for stakeholders</span>
          </div>
          <div className="recommendation-list">
            <div className="recommendation-item">
              <div className="rec-title">📦 Inventory Management</div>
              <p>
                Use predicted demand to set minimum/maximum stock levels. Increase safety stock for weekends by{' '}
                {Math.round(insights.weekend_uplift_pct ?? 10)}%.
              </p>
            </div>
            <div className="recommendation-item">
              <div className="rec-title">👥 Staffing Planning</div>
              <p>
                Align shift schedules with forecasted demand. Peak days (Day {insights.top_weekday}) need full team.
                Off-peak days allow for cross-training or lighter shifts.
              </p>
            </div>
            <div className="recommendation-item">
              <div className="rec-title">🎯 Marketing Campaigns</div>
              <p>
                Target promotions on low-demand days (weekdays) to smooth demand curve. This reduces inventory costs
                and improves unit economics.
              </p>
            </div>
            <div className="recommendation-item">
              <div className="rec-title">⚠️ Risk Mitigation</div>
              <p>
                {insights.anomaly_days ?? 0} anomalies detected. Investigate root causes (holidays, supply issues,
                competitor actions) and incorporate into forecast updates.
              </p>
            </div>
          </div>
        </motion.article>
      </section>
    </motion.main>
  );
}
