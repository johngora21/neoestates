import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Menu,
  Plus,
  Phone,
  MessageSquare
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PropertySubmissionForm from '../components/PropertySubmissionForm';
import { propertiesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [playingVideos, setPlayingVideos] = useState({});
  const [savedProperties, setSavedProperties] = useState([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await propertiesAPI.getAll();
      setProperties(data.data || data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (propertyId) => {
    try {
      await propertiesAPI.toggleFavorite(propertyId);
      
      // Update saved properties list
      if (savedProperties.includes(propertyId)) {
        setSavedProperties(prev => prev.filter(id => id !== propertyId));
      } else {
        setSavedProperties(prev => [...prev, propertyId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const nextMedia = (propertyId) => {
    const property = properties.find(p => p._id === propertyId);
    if (property && property.media.length > 1) {
      setCurrentMediaIndex(prev => ({
        ...prev,
        [propertyId]: ((prev[propertyId] || 0) + 1) % property.media.length
      }));
    }
  };

  const prevMedia = (propertyId) => {
    const property = properties.find(p => p._id === propertyId);
    if (property && property.media.length > 1) {
      setCurrentMediaIndex(prev => ({
        ...prev,
        [propertyId]: prev[propertyId] === 0 
          ? property.media.length - 1 
          : (prev[propertyId] || 0) - 1
      }));
    }
  };

  const toggleVideoPlay = (propertyId) => {
    setPlayingVideos(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchProperties}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button
            className="action-btn"
            onClick={() => setShowSidebar(true)}
          >
            <Menu size={18} />
          </button>
          <div className="header-title">
            <span>Neo Estates</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Stories Section */}
      <div className="stories-section">
        <div className="stories-container">
          {['Villa', 'Apartment', 'Townhouse', 'Duplex', 'Office', 'Shop', 'Warehouse', 'Restaurant', 'Hotel', 'Residential Plot', 'Commercial Plot', 'Agricultural', 'Mixed Use'].map((subType, index) => (
            <div key={index} className="story-item">
              <div className="story-avatar">
                <div className="story-avatar-inner">
                  <span>{subType.charAt(0)}</span>
                </div>
              </div>
              <div className="story-title">{subType}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="properties-container">
        {properties.map((property) => {
          const currentIndex = currentMediaIndex[property._id] || 0;
          const currentMedia = property.media[currentIndex];
          const isVideo = currentMedia?.type === 'video';

          return (
            <div
              key={property._id}
              className="property-card"
              onClick={() => handlePropertyClick(property._id)}
            >
              {/* Card Header */}
            <div className="card-header">
              <div className="agent-info">
                <div className="agent-avatar">
                    <img
                      src={property.owner?.avatar?.url || 'https://via.placeholder.com/40'}
                      alt={property.owner?.name || 'Agent'}
                    />
                </div>
                <div className="agent-details">
                    <h4>{property.owner?.name || 'Neo Estates'}</h4>
                  <p>{property.location}</p>
                </div>
              </div>
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(property._id);
                  }}
                  className={`action-btn-small ${savedProperties.includes(property._id) ? 'liked' : ''}`}
              >
                <Bookmark size={18} />
              </button>
            </div>

              {/* Media Carousel */}
            <div className="property-image-container">
                {isVideo ? (
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.thumbnail}
                    controls={playingVideos[property._id]}
                    autoPlay={playingVideos[property._id]}
                    className="property-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay(property._id);
                    }}
                  />
                ) : (
                  <img
                    src={currentMedia?.url || 'https://via.placeholder.com/400x300'}
                alt={property.title}
                className="property-image"
              />
                )}

                {/* Video Play Button */}
                {isVideo && !playingVideos[property._id] && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay(property._id);
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
                        prevMedia(property._id);
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
                        nextMedia(property._id);
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
            <div className="card-content">
                <div className="property-title">
                  {property.title}
                </div>
                <div className="property-price">
                  {property.price?.toLocaleString()} TZS
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

              <div className="property-location">
                  <span>{property.location}</span>
              </div>

              <div className="property-features">
                  {property.propertyType === 'residence' && (
                    <>
                      {property.bedrooms && (
                        <div className="feature-item">
                          <span>🛏️</span>
                          {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms && (
                    <div className="feature-item">
                          <span>🚿</span>
                          {property.bathrooms}
                    </div>
                      )}
                    </>
                  )}
                  {property.size && (
                    <div className="feature-item">
                      <span>📐</span>
                      {property.size}
                    </div>
                )}
                </div>

                <div className="property-description">
                  {property.description}
              </div>

              {/* Contact Buttons */}
              <div className="contact-buttons">
                <a
                  href={`https://wa.me/255123456789?text=Hi, I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking WhatsApp button
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
                  <a
                    href={`tel:+255123456789`}
                    className="btn btn-primary"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking call button
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Property Submission Form */}
      <PropertySubmissionForm 
        isOpen={showPropertyForm} 
        onClose={() => setShowPropertyForm(false)} 
        propertyType="house"
      />
      
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        userRole={user?.role}
      />
    </div>
  );
};

export default Home; 