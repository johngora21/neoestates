import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Building2, Bookmark, MapPin, Bed, Bath, Square, User, Plus, Menu, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertySubmissionForm from '../components/PropertySubmissionForm';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [playingVideos, setPlayingVideos] = useState({});
  const navigate = useNavigate();

  const toggleSave = (propertyId) => {
    setSavedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const nextMedia = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] || 0) < property.media.length - 1 ? (prev[propertyId] || 0) + 1 : 0
    }));
  };

  const prevMedia = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
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

  const properties = [
    {
      id: 1,
      title: 'Modern Villa in Masaki',
      price: 'TZS 450,000,000',
      location: 'Masaki, Dar es Salaam',
      type: 'house',
      listingType: 'For Sale',
      beds: 4,
      baths: 3,
      area: '250 sqm',
      media: [
        { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop' }
      ],
      company: 'Neo Estates',
      description: 'Beautiful modern villa with stunning ocean views. Perfect for families looking for luxury living.'
    },
    {
      id: 2,
      title: 'Office Building in City Centre',
      price: 'TZS 850,000',
      pricePeriod: 'per month',
      leaseTerm: '1 year',
      location: 'City Centre, Dar es Salaam',
      type: 'commercial',
      listingType: 'For Rent',
      area: '500 sqm',
      media: [
        { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' }
      ],
      company: 'Neo Estates',
      description: 'Modern office building with multiple floors, perfect for corporate headquarters.'
    },
    {
      id: 3,
      title: 'Residential Plot in Masaki',
      price: 'TZS 180,000,000',
      location: 'Masaki, Dar es Salaam',
      type: 'plot',
      listingType: 'For Sale',
      area: '500 sqm',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop' }
      ],
      company: 'Neo Estates',
      description: 'Prime residential plot in upscale neighborhood with excellent infrastructure and security.'
    },
    {
      id: 4,
      title: 'Luxury Apartment',
      price: 'TZS 320,000,000',
      location: 'City Centre, Dar es Salaam',
      type: 'house',
      listingType: 'For Rent',
      beds: 3,
      baths: 2,
      area: '180 sqm',
      media: [
        { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop' }
      ],
      company: 'Neo Estates',
      description: 'Spacious apartment in the heart of the city with modern amenities and security.'
    }
  ];

  const stories = [
    { id: 1, title: 'Villa', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop' },
    { id: 2, title: 'Apartment', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop' },
    { id: 3, title: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
    { id: 4, title: 'Retail Space', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop' },
    { id: 5, title: 'Warehouse', image: 'https://images.unsplash.com/photo-1582407947304-fd86f17f3f9c?w=100&h=100&fit=crop' },
    { id: 6, title: 'Co-space', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
    { id: 7, title: 'Plots', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop' },
    { id: 8, title: 'Farms', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop' },
    { id: 9, title: 'Pet House', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop' }
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button 
            className="action-btn" 
            onClick={() => setShowSidebar(true)}
            style={{ marginRight: '1rem' }}
          >
            <Menu size={18} />
          </button>
          <div className="logo">
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
      <section className="stories-section">
        <div className="stories-container">
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <div className="story-avatar">
                <img src={story.image} alt={story.title} />
              </div>
              <div className="story-title">{story.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Properties Feed */}
      <div className="properties-container">
        {properties.map((property) => {
          const currentIndex = currentMediaIndex[property.id] || 0;
          const currentMedia = property.media[currentIndex];
          const isVideo = currentMedia?.type === 'video';
          
          return (
            <div 
              key={property.id} 
              className="property-card"
              onClick={() => handlePropertyClick(property.id)}
              style={{ cursor: 'pointer', marginBottom: '2rem' }}
            >
            {/* Property Header */}
            <div className="card-header">
              <div className="agent-info">
                <div className="agent-avatar">
                    <Building2 size={16} style={{ color: 'white' }} />
                </div>
                <div className="agent-details">
                    <h4>{property.company}</h4>
                  <p>{property.location}</p>
                </div>
              </div>
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(property.id);
                  }}
                className={`action-btn-small ${savedProperties.includes(property.id) ? 'liked' : ''}`}
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
                    controls={playingVideos[property.id]}
                    autoPlay={playingVideos[property.id]}
                    className="property-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay(property.id);
                    }}
                  />
                ) : (
                  <img
                    src={currentMedia.url}
                alt={property.title}
                className="property-image"
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
            <div className="card-content">
                <div className="property-title">
                  {property.title}
                </div>
                <div className="property-price">
                  {property.price}
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
                  <MapPin size={14} />
                  <span>{property.location}</span>
              </div>

              <div className="property-features">
                {property.type === 'house' && (
                  <>
                    <div className="feature-item">
                        <Bed size={14} />
                      {property.beds}
                    </div>
                    <div className="feature-item">
                        <Bath size={14} />
                      {property.baths}
                    </div>
                  </>
                )}
                <div className="feature-item">
                    <Square size={14} />
                  {property.area}
                </div>
              </div>

                <div className="property-description">
                  {property.description}
                </div>

              {/* Contact Buttons */}
                <div className="contact-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`tel:+255123456789`}
                  className="btn btn-primary"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'var(--primary)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Phone size={14} />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/255123456789?text=Hi, I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '2px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <MessageSquare size={14} />
                  WhatsApp
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
        userRole={user.role}
      />
    </div>
  );
};

export default Home; 