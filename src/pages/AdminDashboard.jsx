import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Home, CheckCircle, XCircle, Plus, Eye, TrendingUp, AlertCircle, Shield, DollarSign, MapPin, BarChart3, PieChart, Activity } from 'lucide-react';
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

  const [analytics, setAnalytics] = useState({
    revenue: {
      total: 24500000,
      sales: 18000000,
      rentals: 6500000,
      monthly: [1200000, 1350000, 1420000, 1580000, 1650000, 1720000, 1800000, 1850000, 1900000, 1950000, 2000000, 2100000]
    },
    properties: {
      total: 89,
      residential: 45,
      commercial: 28,
      plots: 16,
      sales: 67,
      rentals: 22
    },
    locations: [
      { name: 'Dar es Salaam', count: 32, revenue: 8500000 },
      { name: 'Arusha', count: 18, revenue: 5200000 },
      { name: 'Mwanza', count: 15, revenue: 4200000 },
      { name: 'Dodoma', count: 12, revenue: 3200000 },
      { name: 'Tanga', count: 8, revenue: 2400000 },
      { name: 'Others', count: 4, revenue: 1200000 }
    ],
    agents: [
      { name: 'John Mwangi', sales: 12, revenue: 4200000, rating: 4.8 },
      { name: 'Sarah Kimani', sales: 10, revenue: 3800000, rating: 4.7 },
      { name: 'David Ochieng', sales: 8, revenue: 3200000, rating: 4.6 },
      { name: 'Mary Wanjiku', sales: 7, revenue: 2800000, rating: 4.5 },
      { name: 'Peter Kiprop', sales: 6, revenue: 2400000, rating: 4.4 }
    ],
    propertyTypes: [
      { type: 'Villas', count: 18, revenue: 7200000 },
      { type: 'Apartments', count: 22, revenue: 5500000 },
      { type: 'Houses', count: 15, revenue: 4500000 },
      { type: 'Commercial', count: 20, revenue: 4800000 },
      { type: 'Plots', count: 14, revenue: 2500000 }
    ]
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
      title: 'Total Revenue',
      value: `TZS ${(analytics.revenue.total / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: '#16a34a',
      link: '/admin/revenue'
    },
    {
      title: 'Total Properties',
      value: analytics.properties.total,
      icon: Home,
      color: '#2563eb',
      link: '/admin/properties'
    },
    {
      title: 'Sales vs Rentals',
      value: `${analytics.properties.sales}/${analytics.properties.rentals}`,
      icon: BarChart3,
      color: '#f59e0b',
      link: '/admin/analytics'
    },
    {
      title: 'Active Agents',
      value: analytics.agents.length,
      icon: Users,
      color: '#dc2626',
      link: '/admin/users'
    }
  ];

  const formatCurrency = (amount) => {
    return `TZS ${(amount / 1000000).toFixed(1)}M`;
  };

  const renderRevenueChart = () => {
    const maxValue = Math.max(...analytics.revenue.monthly);
    return (
      <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '4px', padding: '1rem 0' }}>
        {analytics.revenue.monthly.map((value, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: `${(value / maxValue) * 100}%`,
              backgroundColor: 'var(--primary)',
              borderRadius: '4px 4px 0 0',
              minHeight: '20px',
              position: 'relative'
            }}
            title={`Month ${index + 1}: ${formatCurrency(value)}`}
          />
        ))}
      </div>
    );
  };

  const renderLocationChart = () => {
    const maxCount = Math.max(...analytics.locations.map(l => l.count));
    return (
      <div style={{ padding: '1rem 0' }}>
        {analytics.locations.map((location, index) => (
          <div key={index} style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{location.name}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {location.count} properties
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--border)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(location.count / maxCount) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--primary)',
                borderRadius: '4px'
              }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Revenue: {formatCurrency(location.revenue)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAgentPerformance = () => {
    return (
      <div style={{ padding: '1rem 0' }}>
        {analytics.agents.map((agent, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderBottom: index < analytics.agents.length - 1 ? '1px solid var(--border)' : 'none'
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{agent.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {agent.sales} sales • {formatCurrency(agent.revenue)}
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              ⭐ {agent.rating}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-primary)',
      paddingBottom: '80px'
    }}>
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
            <span>Analytics Dashboard</span>
          </div>
          <div className="header-actions">
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {statCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid var(--border)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: `${card.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color
                }}>
                  <card.icon size={20} />
                </div>
              </div>
              
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: '0 0 0.25rem 0',
                color: 'var(--foreground)'
              }}>
                {card.value}
              </div>
              
              <p style={{
                margin: 0,
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                {card.title}
              </p>
            </div>
          ))}
        </div>

        {/* Analytics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Revenue Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <DollarSign size={18} color="var(--primary)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--foreground)'
              }}>
                Monthly Revenue
              </h3>
            </div>
            {renderRevenueChart()}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: '0.5rem'
            }}>
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Property Types */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <PieChart size={18} color="var(--primary)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--foreground)'
              }}>
                Property Types
              </h3>
            </div>
            <div style={{ padding: '1rem 0' }}>
              {analytics.propertyTypes.map((type, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: index < analytics.propertyTypes.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{type.type}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{type.count}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {formatCurrency(type.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Agent Performance */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Location Performance */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <MapPin size={18} color="var(--primary)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--foreground)'
              }}>
                Location Performance
              </h3>
            </div>
            {renderLocationChart()}
          </div>

          {/* Agent Performance */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <Users size={18} color="var(--primary)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--foreground)'
              }}>
                Top Agents
              </h3>
            </div>
            {renderAgentPerformance()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 