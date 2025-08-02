import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Edit, Trash2, UserPlus, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

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
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
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
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            Manage Users
          </h1>
        </div>
        <button
          onClick={() => navigate('/admin/add-user')}
          style={{
            backgroundColor: 'white',
            color: 'var(--primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500'
          }}
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div style={{
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted-foreground)'
          }} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem'
            }}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            backgroundColor: 'white'
          }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Users List */}
      <div style={{ padding: '0 1rem 1rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
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
    </div>
  );
};

export default AdminUsers; 