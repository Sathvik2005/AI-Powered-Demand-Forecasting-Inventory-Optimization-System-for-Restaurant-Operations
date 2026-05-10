import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Navigation() {
  const location = useLocation();

  const links = [
    { href: '/', label: '📊 Dashboard', icon: '📊' },
    { href: '/models', label: '🤖 Models', icon: '🤖' },
    { href: '/forecast', label: '📈 Forecast', icon: '📈' },
    { href: '/insights', label: '💡 Insights', icon: '💡' },
    { href: '/settings', label: '⚙️ Settings', icon: '⚙️' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>🍽️ Food Demand AI</h1>
          <p>Week 3-4 Forecasting System</p>
        </div>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
              >
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {link.label}
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
