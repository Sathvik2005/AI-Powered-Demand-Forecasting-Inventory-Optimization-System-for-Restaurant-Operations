import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiCpu, FiTrendingUp, FiZap, FiSettings, FiBox } from 'react-icons/fi';

export function Navigation() {
  const location = useLocation();

  const links = [
    { href: '/', label: 'Dashboard', icon: <FiGrid /> },
    { href: '/models', label: 'Models', icon: <FiCpu /> },
    { href: '/forecast', label: 'Forecast', icon: <FiTrendingUp /> },
    { href: '/insights', label: 'Insights', icon: <FiZap /> },
    { href: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1><FiBox style={{ marginRight: '10px' }} />Food Demand AI</h1>
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
                  <span className="nav-icon">{link.icon}</span>
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
