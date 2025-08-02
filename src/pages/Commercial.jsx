import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MapPin, Bed, Bath, Square, Phone, MessageSquare, Search, SlidersHorizontal, Building2, Bookmark, User, Plus, Menu, Store } from 'lucide-react';
import { getRegionNames, getDistrictNames } from '../utils/tanzaniaRegions';
import PropertySubmissionForm from '../components/PropertySubmissionForm';
import Sidebar from '../components/Sidebar';

const Commercial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProperties, setLikedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedListingType, setSelectedListingType] = useState('');
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

  const commercialProperties = [
    {
      id: 1,
      title: 'Office Building in City Centre',
      price: 'TZS 850,000',
      pricePeriod: 'per month',
      leaseTerm: '1 year',
      location: 'City Centre, Dar es Salaam',
      type: 'Office Building',
      listingType: 'For Rent',
      area: '500 sqm',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Modern office building with multiple floors, perfect for corporate headquarters.'
    },
    {
      id: 2,
      title: 'Retail Space in Shopping Mall',
      price: 'TZS 320,000,000',
      location: 'Masaki Mall, Dar es Salaam',
      type: 'Retail Space',
      listingType: 'For Sale',
      area: '200 sqm',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Prime retail space in high-traffic shopping mall with excellent visibility.'
    },
    {
      id: 3,
      title: 'Industrial Warehouse',
      price: 'TZS 650,000,000',
      location: 'Industrial Area, Dar es Salaam',
      type: 'Warehouse',
      listingType: 'For Sale',
      area: '1000 sqm',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f17f3f9c?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Large warehouse facility with loading docks and storage space for industrial use.'
    },
    {
      id: 4,
      title: 'Co-working Space',
      price: 'TZS 280,000',
      pricePeriod: 'per month',
      leaseTerm: '6 months',
      location: 'Oyster Bay, Dar es Salaam',
      type: 'Co-working',
      listingType: 'For Rent',
      area: '300 sqm',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Modern co-working space with meeting rooms and shared facilities for startups.'
    }
  ];

  const filteredProperties = commercialProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || property.type === selectedType;
    const matchesLocation = !selectedRegion || property.location.includes(selectedRegion) || 
                           !selectedDistrict || property.location.includes(selectedDistrict);
    
    // Price range filtering
    let matchesPrice = true;
    if (priceRange.min || priceRange.max) {
      const price = parseInt(property.price.replace(/[TZS,\s]/g, ''));
      const minPrice = priceRange.min ? parseInt(priceRange.min.replace(/[TZS,\s]/g, '')) : 0;
      const maxPrice = priceRange.max ? parseInt(priceRange.max.replace(/[TZS,\s]/g, '')) : Infinity;
      
      matchesPrice = price >= minPrice && price <= maxPrice;
    }
    
    // Area range filtering
    let matchesArea = true;
    if (areaRange) {
      const area = parseInt(property.area.split(' ')[0]);
      switch (areaRange) {
        case 'under-300':
          matchesArea = area < 300;
          break;
        case '300-500':
          matchesArea = area >= 300 && area < 500;
          break;
        case '500-1000':
          matchesArea = area >= 500 && area < 1000;
          break;
        case 'over-1000':
          matchesArea = area >= 1000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesArea;
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
            <span>Commercial</span>
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
              placeholder="Search commercial properties..."
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
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="Office Building">Office Building</option>
                    <option value="Retail Space">Retail Space</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Co-working">Co-working</option>
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
                      fontSize: '0.875rem'
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
                      fontSize: '0.875rem'
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
                      opacity: selectedRegion ? 1 : 0.6,
                      cursor: selectedRegion ? 'pointer' : 'not-allowed'
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
                  <option value="under-300">Under 300 sqm</option>
                  <option value="300-500">300 - 500 sqm</option>
                  <option value="500-1000">500 - 1000 sqm</option>
                  <option value="over-1000">Over 1000 sqm</option>
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

      {/* Commercial Properties Feed */}
      <div className="properties-container">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card" onClick={() => handlePropertyClick(property.id)}>
            {/* Property Header */}
            <div className="card-header">
              <div className="agent-info">
                <div className="agent-avatar">
                  <Store size={16} />
                </div>
                <div className="agent-details">
                  <h4>{property.company}</h4>
                  <p>{property.location}</p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  toggleSave(property.id);
                }}
                className={`action-btn-small ${savedProperties.includes(property.id) ? 'liked' : ''}`}
              >
                <Bookmark size={18} />
              </button>
            </div>

            {/* Property Image */}
            <div className="property-image-container">
              <img
                src={property.image}
                alt={property.title}
                className="property-image"
              />
              <div className="property-badge">
                {property.type}
              </div>
            </div>

            {/* Property Info */}
            <div className="card-content">
              <div className="property-title">{property.title}</div>
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
                <MapPin size={16} />
                {property.location}
              </div>

              <div className="property-features">
                <div className="feature-item">
                  <Square size={16} />
                  {property.area}
                </div>
                <div className="feature-item">
                  <Store size={16} />
                  {property.type}
                </div>
              </div>

              <div className="property-description">{property.description}</div>

              {/* Contact Buttons */}
              <div className="contact-buttons">
                <a
                  href={`tel:+255123456789`}
                  className="btn btn-primary"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/255123456789?text=Hi, I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ width: '4rem', height: '4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Search size={32} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No commercial properties found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Property Submission Form */}
      <PropertySubmissionForm 
        isOpen={showPropertyForm}
        onClose={() => setShowPropertyForm(false)}
        propertyType="commercial"
      />
      
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        userRole="admin"
      />
    </div>
  );
};

export default Commercial; 