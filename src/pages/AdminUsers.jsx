import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Edit, Trash2, UserPlus, Mail, Phone, Users, Shield, UserCheck, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('admin');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'agent'
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+255123456789',
        role: 'user',
        isVerified: true,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+255987654321',
        role: 'admin',
        isVerified: true,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+255555123456',
        role: 'agent',
        isVerified: false,
        createdAt: '2024-01-20'
      }
    ]);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = user.role === activeTab;
    return matchesSearch && matchesRole;
  });

  const getTabStats = () => {
    const allUsers = users.length;
    const adminUsers = users.filter(u => u.role === 'admin').length;
    const agentUsers = users.filter(u => u.role === 'agent').length;
    const regularUsers = users.filter(u => u.role === 'user').length;
    
    return { allUsers, adminUsers, agentUsers, regularUsers };
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.phone) {
      const userToAdd = {
        id: Date.now(),
        ...newUser,
        isVerified: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, userToAdd]);
      setNewUser({ name: '', email: '', phone: '', role: 'agent' });
      setShowAddUserModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleCancelAdd = () => {
    setNewUser({ name: '', email: '', phone: '', role: 'agent' });
    setShowAddUserModal(false);
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-red-500',
      agent: 'bg-blue-500',
      user: 'bg-green-500'
    };
    return (
      <span style={{
        backgroundColor: colors[role] || 'bg-gray-500',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500'
      }}>
        {role.toUpperCase()}
      </span>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
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
            <span>Manage Users</span>
          </div>
          <div className="header-actions">
            <button 
              className="action-btn"
              onClick={() => setShowAddUserModal(true)}
              style={{
                background: 'transparent',
                color: 'var(--text-secondary)',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div style={{
        padding: '1rem',
        background: 'var(--bg-primary)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          position: 'relative' 
        }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)'
          }} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem 0.875rem 3rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              background: 'var(--bg-secondary)',
              transition: 'all 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div style={{
        padding: '0 1rem',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto'
        }}>
          {(() => {
            const stats = getTabStats();
            return [
              { id: 'admin', label: 'Admins', icon: Shield, count: stats.adminUsers, color: '#dc2626' },
              { id: 'agent', label: 'Agents', icon: UserCheck, count: stats.agentUsers, color: '#2563eb' },
              { id: 'user', label: 'Users', icon: Users, count: stats.regularUsers, color: '#16a34a' }
                              ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        background: activeTab === tab.id ? 'var(--green-500)' : 'transparent',
                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                                                minWidth: 'fit-content'
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab.id) {
                          e.target.style.background = 'var(--green-50)';
                          e.target.style.color = 'var(--green-700)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab.id) {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                      <span style={{
                        backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)',
                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {tab.count}
                      </span>
                    </button>
            ));
          })()}
        </div>
      </div>

      {/* Users List */}
      <div style={{ 
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)'
        }}>
          {filteredUsers.map(user => (
            <div
              key={user.id}
              style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--foreground)'
                  }}>
                    {user.name}
                  </h3>
                  {getRoleBadge(user.role)}
                  {user.isVerified && (
                    <span style={{
                      backgroundColor: 'var(--green-500)',
                      color: 'white',
                      padding: '0.125rem 0.375rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem'
                    }}>
                      VERIFIED
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'var(--muted-foreground)',
                  fontSize: '0.875rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Mail size={14} />
                    {user.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Phone size={14} />
                    {user.phone}
                  </div>
                </div>
                <p style={{
                  margin: '0.25rem 0 0 0',
                  fontSize: '0.75rem',
                  color: 'var(--muted-foreground)'
                }}>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  style={{
                    backgroundColor: 'var(--destructive)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '450px',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: 'white',
              padding: '1.5rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button
                onClick={handleCancelAdd}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <ArrowLeft size={16} />
              </button>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}>
                    Add New User
                  </h2>
                  <p style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.875rem',
                    opacity: 0.9
                  }}>
                    Create agent or admin account
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  User Role *
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                >
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <button
                  onClick={handleCancelAdd}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: '12px',
                    background: 'white',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--gray-50)';
                    e.target.style.borderColor = 'var(--gray-300)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = 'var(--border-light)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'var(--primary)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary-dark)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <User size={16} />
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers; 