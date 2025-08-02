import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Home, CheckCircle, XCircle, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingProperties: 0,
    approvedProperties: 0,
    rejectedProperties: 0
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 156,
      totalProperties: 89,
      pendingProperties: 12,
      approvedProperties: 67,
      rejectedProperties: 10
    });
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users'
    },
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Home,
      color: 'bg-green-500',
      link: '/admin/properties'
    },
    {
      title: 'Pending Approval',
      value: stats.pendingProperties,
      icon: Eye,
      color: 'bg-yellow-500',
      link: '/admin/pending-properties'
    },
    {
      title: 'Approved',
      value: stats.approvedProperties,
      icon: CheckCircle,
      color: 'bg-green-600',
      link: '/admin/approved-properties'
    },
    {
      title: 'Rejected',
      value: stats.rejectedProperties,
      icon: XCircle,
      color: 'bg-red-500',
      link: '/admin/rejected-properties'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
      paddingBottom: '80px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          Admin Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div style={{
        padding: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.link)}
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid var(--border)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <card.icon size={24} />
              </div>
            </div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: '0 0 0.5rem 0',
              color: 'var(--foreground)'
            }}>
              {card.value}
            </h3>
            <p style={{
              margin: 0,
              color: 'var(--muted-foreground)',
              fontSize: '0.9rem'
            }}>
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '1rem' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'var(--foreground)'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/admin/add-property')}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--primary)';
            }}
          >
            <Plus size={20} />
            Add New Property
          </button>
          <button
            onClick={() => navigate('/admin/pending-properties')}
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--secondary-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--secondary)';
            }}
          >
            <Eye size={20} />
            Review Pending Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 