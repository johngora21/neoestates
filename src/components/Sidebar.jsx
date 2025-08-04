import { User, Plus, Home, Building2, MapPin, X, Settings, LogOut, Shield, Users, CheckCircle, Clock, BarChart3, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, userRole = 'user' }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
          }}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '300px',
          height: '100vh',
          background: 'var(--bg-primary)',
          zIndex: 1000,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-out',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Building2 size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Neo Estates</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Admin Panel</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div style={{ padding: '1rem 0' }}>
          {/* Profile */}
          <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}>
                <User size={18} />
                <span>Profile</span>
              </div>
            </Link>
          </div>

          {/* My Properties */}
          <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
            <Link to="/my-properties" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}>
                <Building2 size={18} />
                <span>My Properties</span>
              </div>
            </Link>
          </div>

          {/* Agent Request Section - Only show for regular users */}
          {userRole === 'user' && (
            <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
              <Link to="/become-agent" style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}>
                  <UserPlus size={18} />
                  <span>Become an Agent</span>
                </div>
              </Link>
            </div>
          )}

          {/* Admin Section */}
          {userRole === 'admin' && (
            <>
              <div style={{
                padding: '0 1.5rem',
                marginBottom: '1rem',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  <Shield size={16} />
                  <span>ADMIN PANEL</span>
                </div>
              </div>

              {/* Admin Dashboard */}
              <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }}>
                    <BarChart3 size={18} />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </div>

              {/* Manage Users */}
              <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <Link to="/admin/users" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }}>
                    <Users size={18} />
                    <span>Manage Users</span>
                  </div>
                </Link>
              </div>

              {/* Agent Requests */}
              <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <Link to="/admin/agent-requests" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }}>
                    <UserPlus size={18} />
                    <span>Agent Requests</span>
                  </div>
                </Link>
              </div>

              {/* Pending Properties */}
              <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <Link to="/admin/pending-properties" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }}>
                    <Clock size={18} />
                    <span>Pending Properties</span>
                  </div>
                </Link>
              </div>

              {/* Add Property (Admin) */}
              <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <Link to="/admin/add-property" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }}>
                    <Plus size={18} />
                    <span>Add Property</span>
                  </div>
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Sidebar; 