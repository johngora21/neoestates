import { useState } from 'react';
import { User, Settings, LogOut, Edit, Camera, Shield, Bell, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Admin User',
    email: 'admin@neoestates.co.tz',
    phone: '+255 123 456 789',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
  });

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button 
            className="action-btn" 
            onClick={() => navigate(-1)}
            style={{ marginRight: '1rem' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="logo">
            <span>Profile</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        {/* Profile Header */}
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <img 
              src={user.avatar} 
              alt="Profile" 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                boxShadow: 'var(--shadow-green)'
              }}
            />
            <button style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: 'var(--primary-gradient)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-green)'
            }}>
              <Camera size={16} />
            </button>
          </div>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {user.name}
          </h2>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>
            {user.role}
          </p>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {user.email}
          </p>
        </div>

        {/* Profile Information */}
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Personal Information
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Name</p>
                <p style={{ margin: '0', fontWeight: '500' }}>{user.name}</p>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                padding: '0.5rem'
              }}>
                <Edit size={16} />
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</p>
                <p style={{ margin: '0', fontWeight: '500' }}>{user.email}</p>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                padding: '0.5rem'
              }}>
                <Edit size={16} />
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Phone</p>
                <p style={{ margin: '0', fontWeight: '500' }}>{user.phone}</p>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                padding: '0.5rem'
              }}>
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Settings
          </h3>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              <Shield size={18} color="var(--text-secondary)" />
              <span>Privacy & Security</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              <Bell size={18} color="var(--text-secondary)" />
              <span>Notifications</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              <Globe size={18} color="var(--text-secondary)" />
              <span>Language & Region</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.875rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 