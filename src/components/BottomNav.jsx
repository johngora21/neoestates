import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Store, MapPin } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/houses', icon: Building2, label: 'Residential' },
    { path: '/commercial', icon: Store, label: 'Commercial' },
    { path: '/plots', icon: MapPin, label: 'Plots' }
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav; 