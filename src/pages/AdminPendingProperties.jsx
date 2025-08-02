import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Eye, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPendingProperties = () => {
  const navigate = useNavigate();
  const [pendingProperties, setPendingProperties] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setPendingProperties([
      {
        id: 1,
        title: 'Beautiful Villa in Masaki',
        propertyType: 'residence',
        subType: 'Villa',
        listingType: 'For Sale',
        price: 25000000,
        location: 'Masaki, Dar es Salaam',
        owner: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        submittedAt: '2024-01-20T10:30:00Z',
        description: 'Beautiful villa with modern amenities...'
      },
      {
        id: 2,
        title: 'Office Space in City Centre',
        propertyType: 'commercial',
        subType: 'Office',
        listingType: 'For Rent',
        price: 500000,
        location: 'City Centre, Dar es Salaam',
        owner: {
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        submittedAt: '2024-01-19T15:45:00Z',
        description: 'Prime office space in the heart of the city...'
      },
      {
        id: 3,
        title: 'Residential Plot in Mbezi Beach',
        propertyType: 'plot',
        subType: 'Residential',
        listingType: 'For Sale',
        price: 15000000,
        location: 'Mbezi Beach, Dar es Salaam',
        owner: {
          name: 'Mike Johnson',
          email: 'mike@example.com'
        },
        submittedAt: '2024-01-18T09:15:00Z',
        description: 'Large residential plot with road access...'
      }
    ]);
  }, []);

  const handleApprove = (propertyId) => {
    if (window.confirm('Are you sure you want to approve this property?')) {
      setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      // Here you would make an API call to approve the property
      alert('Property approved successfully!');
    }
  };

  const handleReject = (propertyId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      // Here you would make an API call to reject the property
      alert('Property rejected successfully!');
    }
  };

  const getPropertyTypeBadge = (type) => {
    const colors = {
      residence: 'bg-green-500',
      commercial: 'bg-blue-500',
      plot: 'bg-yellow-500'
    };
    return (
      <span style={{
        backgroundColor: colors[type] || 'bg-gray-500',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500'
      }}>
        {type.toUpperCase()}
      </span>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          Pending Properties ({pendingProperties.length})
        </h1>
      </div>

      {/* Properties List */}
      <div style={{ padding: '1rem' }}>
        {pendingProperties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'var(--muted-foreground)'
          }}>
            <Clock size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No Pending Properties</h3>
            <p style={{ margin: 0 }}>All properties have been reviewed.</p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {pendingProperties.map(property => (
              <div
                key={property.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--foreground)'
                      }}>
                        {property.title}
                      </h3>
                      {getPropertyTypeBadge(property.propertyType)}
                    </div>
                    <p style={{
                      margin: '0.5rem 0',
                      color: 'var(--muted-foreground)',
                      fontSize: '0.875rem'
                    }}>
                      {property.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginTop: '1rem',
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)'
                    }}>
                      <span><strong>Price:</strong> {formatPrice(property.price)}</span>
                      <span><strong>Type:</strong> {property.subType}</span>
                      <span><strong>Listing:</strong> {property.listingType}</span>
                      <span><strong>Location:</strong> {property.location}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)'
                    }}>
                      <User size={14} />
                      <span><strong>Owner:</strong> {property.owner.name} ({property.owner.email})</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)'
                    }}>
                      <Clock size={14} />
                      <span><strong>Submitted:</strong> {formatDate(property.submittedAt)}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => navigate(`/admin/property-detail/${property.id}`)}
                      style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Eye size={14} />
                      View Details
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => handleApprove(property.id)}
                    style={{
                      backgroundColor: 'var(--green-500)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(property.id)}
                    style={{
                      backgroundColor: 'var(--destructive)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPendingProperties; 