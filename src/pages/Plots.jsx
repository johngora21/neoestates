import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MapPin, Bed, Bath, Square, Phone, MessageSquare, Search, SlidersHorizontal, Building2, Bookmark, User, Plus, Menu } from 'lucide-react';
import { getRegionNames, getDistrictNames } from '../utils/tanzaniaRegions';
import PropertySubmissionForm from '../components/PropertySubmissionForm';
import Sidebar from '../components/Sidebar';

const Plots = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProperties, setLikedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedListingType, setSelectedListingType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [areaRange, setAreaRange] = useState('');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (propertyId) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

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

  const plots = [
    {
      id: 1,
      title: 'Residential Plot in Masaki',
      price: 'TZS 180,000,000',
      location: 'Masaki, Dar es Salaam',
      type: 'Residential Plot',
      listingType: 'For Sale',
      area: '500 sqm',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Prime residential plot in upscale neighborhood with excellent infrastructure and security.'
    },
    {
      id: 2,
      title: 'Commercial Plot for Rent',
      price: 'TZS 150,000',
      pricePeriod: 'per month',
      leaseTerm: '2 years',
      location: 'Industrial Area, Dar es Salaam',
      type: 'Commercial Plot',
      listingType: 'For Rent',
      area: '1000 sqm',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Large commercial plot available for long-term lease, perfect for industrial development.'
    },
    {
      id: 3,
      title: 'Farm Land in Mbezi',
      price: 'TZS 120,000,000',
      location: 'Mbezi Beach, Dar es Salaam',
      type: 'Farm Land',
      listingType: 'For Rent',
      area: '2000 sqm',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Large agricultural plot with fertile soil, ideal for farming or future residential development.'
    },
    {
      id: 4,
      title: 'Residential Plot in Kinondoni',
      price: 'TZS 95,000,000',
      location: 'Kinondoni, Dar es Salaam',
      type: 'Residential Plot',
      listingType: 'For Sale',
      area: '300 sqm',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Affordable residential plot in growing neighborhood with good access to amenities.'
    }
  ];

  const filteredPlots = plots.filter(plot => {
    const matchesSearch = plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || plot.type === selectedType;
    const matchesListingType = !selectedListingType || plot.listingType === selectedListingType;
    const matchesLocation = !selectedRegion || plot.location.includes(selectedRegion) || 
                           !selectedDistrict || plot.location.includes(selectedDistrict);
    
    // Price range filtering
    let matchesPrice = true;
    if (priceRange.min || priceRange.max) {
      const price = parseInt(plot.price.replace(/[TZS,\s]/g, ''));
      const minPrice = priceRange.min ? parseInt(priceRange.min.replace(/[TZS,\s]/g, '')) : 0;
      const maxPrice = priceRange.max ? parseInt(priceRange.max.replace(/[TZS,\s]/g, '')) : Infinity;
      
      matchesPrice = price >= minPrice && price <= maxPrice;
    }
    
    // Area range filtering
    let matchesArea = true;
    if (areaRange) {
      const area = parseInt(plot.area.split(' ')[0]);
      switch (areaRange) {
        case 'under-500':
          matchesArea = area < 500;
          break;
        case '500-1000':
          matchesArea = area >= 500 && area < 1000;
          break;
        case '1000-2000':
          matchesArea = area >= 1000 && area < 2000;
          break;
        case 'over-2000':
          matchesArea = area >= 2000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesListingType && matchesLocation && matchesPrice && matchesArea;
  });

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
            <span>Plots</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={20} />
            <input
              type="text"
              placeholder="Search plots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                background: 'var(--bg-secondary)',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <button 
            className={`action-btn ${showFilters ? 'primary' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Filter Popup */}
      {showFilters && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setShowFilters(false)}
          />
          
          {/* Filter Sheet */}
          <div 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'var(--bg-primary)',
              borderTopLeftRadius: 'var(--radius-lg)',
              borderTopRightRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              zIndex: 1001,
              maxHeight: '80vh',
              overflowY: 'auto',
              animation: 'slideUp 0.3s ease',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Handle */}
            <div style={{ 
              width: '40px', 
              height: '4px', 
              background: 'var(--border-light)', 
              borderRadius: '2px', 
              margin: '0 auto 1.5rem',
              cursor: 'pointer'
            }} />
            
            {/* Filter Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Filters
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              
              {/* Property Type and Listing Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Property Type
                  </label>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Mixed Use">Mixed Use</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Listing Type
                  </label>
                  <select 
                    value={selectedListingType} 
                    onChange={(e) => setSelectedListingType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <option value="">All</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
              </div>

              {/* Location Filter */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Region
                  </label>
                  <select 
                    value={selectedRegion} 
                    onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      setSelectedDistrict(''); // Reset district when region changes
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <option value="">All Regions</option>
                    {getRegionNames().map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    District
                  </label>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedRegion}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: selectedRegion ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                      opacity: selectedRegion ? 1 : 0.6
                    }}
                  >
                    <option value="">All Districts</option>
                    {selectedRegion && getDistrictNames(selectedRegion).map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Min Price (TZS)
                  </label>
                  <input
                    type="text"
                    placeholder="Min Price"
                    value={priceRange.min || ''}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: 'var(--bg-secondary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Max Price (TZS)
                  </label>
                  <input
                    type="text"
                    placeholder="Max Price"
                    value={priceRange.max || ''}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      background: 'var(--bg-secondary)'
                    }}
                  />
                </div>
              </div>

              {/* Area Range Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Area Range
                </label>
                <select 
                  value={areaRange} 
                  onChange={(e) => setAreaRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    background: 'var(--bg-secondary)'
                  }}
                >
                  <option value="">All Areas</option>
                  <option value="under-500">Under 500 sqm</option>
                  <option value="500-1000">500 - 1000 sqm</option>
                  <option value="1000-2000">1000 - 2000 sqm</option>
                  <option value="over-2000">Over 2000 sqm</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <button 
                onClick={() => {
                  setSelectedType('');
                  setSelectedListingType('');
                  setSelectedRegion('');
                  setSelectedDistrict('');
                  setPriceRange({ min: '', max: '' });
                  setAreaRange('');
                }}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Plots Feed */}
      <div className="properties-container">
        {filteredPlots.map((plot) => (
          <div 
            key={plot.id} 
            className="property-card"
            onClick={() => handlePropertyClick(plot.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Plot Header */}
            <div className="card-header">
              <div className="agent-info">
                <div className="agent-avatar">
                  <MapPin size={16} />
                </div>
                <div className="agent-details">
                  <h4>{plot.company}</h4>
                  <p>{plot.location}</p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when clicking bookmark
                  toggleSave(plot.id);
                }}
                className={`action-btn-small ${savedProperties.includes(plot.id) ? 'liked' : ''}`}
              >
                <Bookmark size={18} />
              </button>
            </div>

            {/* Plot Image */}
            <div className="property-image-container">
              <img
                src={plot.image}
                alt={plot.title}
                className="property-image"
              />
              <div className="property-badge">
                {plot.type}
              </div>
            </div>

            {/* Plot Info */}
            <div className="card-content">
              <div className="property-title">{plot.title}</div>
                                    <div className="property-price">
                        {plot.price}
                        {plot.listingType === 'For Rent' && plot.pricePeriod && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>
                            {plot.pricePeriod}
                          </span>
                        )}
                        {plot.listingType === 'For Rent' && plot.leaseTerm && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Term: {plot.leaseTerm}
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
                background: plot.listingType === 'For Sale' ? 'var(--primary-gradient)' : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                color: 'white',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {plot.listingType}
              </div>

              <div className="property-location">
                <MapPin size={16} />
                {plot.location}
              </div>

              <div className="property-features">
                <div className="feature-item">
                  <Square size={16} />
                  {plot.area}
                </div>
                <div className="feature-item">
                  <MapPin size={16} />
                  {plot.type}
                </div>
              </div>

              <div className="property-description">{plot.description}</div>

              {/* Contact Buttons */}
              <div className="contact-buttons">
                <a
                  href={`tel:+255123456789`}
                  className="btn btn-primary"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking call button
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/255123456789?text=Hi, I'm interested in ${plot.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking WhatsApp button
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredPlots.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ width: '4rem', height: '4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Search size={32} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No plots found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Property Submission Form */}
      <PropertySubmissionForm 
        isOpen={showPropertyForm}
        onClose={() => setShowPropertyForm(false)}
        propertyType="plot"
      />
      
            <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        userRole="admin"
      />
    </div>
  );
};

export default Plots; 