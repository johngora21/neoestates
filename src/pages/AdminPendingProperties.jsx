import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Eye, Clock, User, MapPin, Bed, Bath, Square, Building2, Bookmark, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPendingProperties = () => {
  const navigate = useNavigate();
  const [pendingProperties, setPendingProperties] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [playingVideos, setPlayingVideos] = useState({});
  
  // Simple popup state
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API call
    setPendingProperties([
      {
        id: 1,
        title: "Modern Villa in Dar es Salaam",
        price: 250000000,
        location: "Masaki, Dar es Salaam",
        propertyType: "residence",
        listingType: "For Sale",
        beds: 4,
        baths: 3,
        size: 450,
        description: "Beautiful modern villa with stunning ocean views, high-end finishes, and premium amenities.",
        media: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop"
        ],
        owner: {
          name: "John Doe",
          email: "john.doe@example.com"
        },
        submittedAt: "2024-01-15T10:30:00Z",
        currentIndex: 0,
        playingVideos: false
      },
      {
        id: 2,
        title: "Commercial Office Space",
        price: 150000000,
        location: "City Centre, Dar es Salaam",
        propertyType: "commercial",
        listingType: "For Rent",
        pricePeriod: "per month",
        leaseTerm: "12 months",
        size: 800,
        description: "Prime commercial office space in the heart of the city with excellent accessibility.",
        media: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop"
        ],
        owner: {
          name: "Jane Smith",
          email: "jane.smith@example.com"
        },
        submittedAt: "2024-01-14T15:45:00Z",
        currentIndex: 0,
        playingVideos: false
      },
      {
        id: 3,
        title: "Residential Plot",
        price: 75000000,
        location: "Mbezi Beach, Dar es Salaam",
        propertyType: "plot",
        listingType: "For Sale",
        size: 1000,
        description: "Prime residential plot with road access and utilities available.",
        media: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop"
        ],
        owner: {
          name: "Mike Johnson",
          email: "mike.johnson@example.com"
        },
        submittedAt: "2024-01-13T09:20:00Z",
        currentIndex: 0,
        playingVideos: false
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
    setSelectedPropertyId(propertyId);
    setShowRejectPopup(true);
  };

  const handleRejectSubmit = () => {
    if (rejectionReason.trim()) {
      setPendingProperties(prev => prev.filter(p => p.id !== selectedPropertyId));
      alert(`Property rejected successfully!\nReason: ${rejectionReason}`);
      setShowRejectPopup(false);
      setRejectionReason('');
      setSelectedPropertyId(null);
    } else {
      alert('Please provide a reason for rejection.');
    }
  };

  const handleRejectCancel = () => {
    setShowRejectPopup(false);
    setRejectionReason('');
    setSelectedPropertyId(null);
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

  const nextMedia = (propertyId) => {
    const property = pendingProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) < property.media.length - 1 ? (prev[propertyId] || 0) + 1 : 0
    }));
  };

  const prevMedia = (propertyId) => {
    const property = pendingProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) > 0 ? (prev[propertyId] || 0) - 1 : property.media.length - 1
    }));
  };

  const toggleVideoPlay = (propertyId) => {
    setPlayingVideos(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
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
            <span>Pending Properties ({pendingProperties.length})</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
            padding: '0 1rem'
          }}>
            {pendingProperties.map(property => {
              const currentIndex = currentMediaIndex[property.id] || 0;
              const currentMedia = property.media[currentIndex];
              const isVideo = currentMedia?.includes('video') || false;

              return (
                <div
                  key={property.id}
                  className="property-card"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate(`/properties/${property.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-light)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <Building2 size={16} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600' }}>Neo Estates</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{property.location}</p>
                      </div>
                    </div>
                    <button 
                      className="action-btn-small"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Bookmark size={18} />
                    </button>
                  </div>

                  {/* Media Carousel */}
                  <div style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'hidden'
                  }}>
                    {isVideo ? (
                      <video
                        src={currentMedia}
                        controls={playingVideos[property.id]}
                        autoPlay={playingVideos[property.id]}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlay(property.id);
                        }}
                      />
                    ) : (
                      <img
                        src={currentMedia}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}

                    {/* Video Play Button */}
                    {isVideo && !playingVideos[property.id] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlay(property.id);
                        }}
                        className="action-btn-small"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(22, 163, 74, 0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '3rem',
                          height: '3rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: 'var(--shadow-green)'
                        }}
                      >
                        <Play size={24} style={{ color: 'white' }} />
                      </button>
                    )}

                    {/* Navigation Arrows */}
                    {property.media.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevMedia(property.id);
                          }}
                          className="action-btn-small"
                          style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(22, 163, 74, 0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            boxShadow: 'var(--shadow-green)'
                          }}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextMedia(property.id);
                          }}
                          className="action-btn-small"
                          style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(22, 163, 74, 0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            boxShadow: 'var(--shadow-green)'
                          }}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}

                    {/* Media Indicators */}
                    {property.media.length > 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '0.5rem'
                      }}>
                        {property.media.map((_, index) => (
                          <div
                            key={index}
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              borderRadius: '50%',
                              background: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Property Info */}
                  <div style={{ padding: '1rem' }}>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      {property.title}
                    </div>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--primary)',
                      marginBottom: '0.5rem'
                    }}>
                      {formatPrice(property.price)}
                      {property.listingType === 'For Rent' && property.pricePeriod && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>
                          {property.pricePeriod}
                        </span>
                      )}
                      {property.listingType === 'For Rent' && property.leaseTerm && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          Term: {property.leaseTerm}
                        </div>
                      )}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      background: property.listingType === 'For Sale' ? 'var(--primary-gradient)' : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                      color: 'white',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      {property.listingType}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem'
                    }}>
                      <MapPin size={14} />
                      <span>{property.location}</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      {property.propertyType === 'residence' && (
                        <>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem'
                          }}>
                            <Bed size={14} />
                            <span>{property.beds}</span>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem'
                          }}>
                            <Bath size={14} />
                            <span>{property.baths}</span>
                          </div>
                        </>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                      }}>
                        <Square size={14} />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem'
                    }}>
                      {property.description}
                    </div>

                    {/* Owner Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.5rem',
                      padding: '0.5rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <User size={14} />
                      <span><strong>Owner:</strong> {property.owner.name} ({property.owner.email})</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem',
                      padding: '0.5rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <Clock size={14} />
                      <span><strong>Submitted:</strong> {formatDate(property.submittedAt)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(property.id);
                        }}
                        className="action-btn-approve"
                        style={{
                          flex: 1,
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }}
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(property.id);
                        }}
                        className="action-btn-reject"
                        style={{
                          flex: 1,
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }}
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Reject Reason Popup */}
      {showRejectPopup && selectedPropertyId && (
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
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: 'white',
              padding: '1.5rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button
                onClick={handleRejectCancel}
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
                <X size={16} />
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
                  <XCircle size={24} />
                </div>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}>
                    Reject Property
                  </h2>
                  <p style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.875rem',
                    opacity: 0.9
                  }}>
                    Provide rejection reason
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  margin: '0 0 1rem 0',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  Please provide a detailed reason for rejecting this property. This will help the property owner understand the decision and make necessary improvements.
                </p>
                
                {/* Quick Reason Options */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)'
                  }}>
                    Common reasons:
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem'
                  }}>
                    {[
                      'Low quality photos',
                      'Incomplete information',
                      'Inappropriate content',
                      'Duplicate listing',
                      'Wrong category',
                      'Pricing issues'
                    ].map((reason, index) => (
                      <button
                        key={index}
                        onClick={() => setRejectionReason(reason)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          background: 'white',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          color: 'var(--text-secondary)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--green-50)';
                          e.target.style.borderColor = 'var(--green-500)';
                          e.target.style.color = 'var(--green-700)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    Detailed reason:
                  </label>
                  <textarea
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      border: '3px solid #e5e7eb',
                      borderRadius: '16px',
                      fontSize: '0.95rem',
                      resize: 'vertical',
                      minHeight: '120px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5'
                    }}
                    rows="5"
                    placeholder="✍️ Enter your detailed rejection reason here..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#dc2626';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>💡</span>
                    <span>Tip: Be specific about what needs to be improved</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  onClick={handleRejectCancel}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: '2px solid var(--border)',
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
                    e.target.style.borderColor = 'var(--border)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  disabled={!rejectionReason.trim()}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '12px',
                    background: rejectionReason.trim() ? 'var(--destructive)' : 'var(--gray-300)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: rejectionReason.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (rejectionReason.trim()) {
                      e.target.style.background = 'var(--destructive-dark)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (rejectionReason.trim()) {
                      e.target.style.background = 'var(--destructive)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <XCircle size={16} />
                  Reject Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPendingProperties; 