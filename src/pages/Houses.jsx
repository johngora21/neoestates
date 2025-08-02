import { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Bed, Bath, Square, Phone, MessageSquare, Search, SlidersHorizontal, Building2, Bookmark, User, Plus, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getRegionNames, getDistrictNames } from '../utils/tanzaniaRegions';
import PropertySubmissionForm from '../components/PropertySubmissionForm';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const Houses = () => {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedListingType, setSelectedListingType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [areaRange, setAreaRange] = useState('');
  const [furnishedStatus, setFurnishedStatus] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedBathrooms, setSelectedBathrooms] = useState('');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
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
      furnishedStatus: 'Fully Furnished',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Beautiful modern villa with stunning ocean views. Perfect for families looking for luxury living.'
    },
    {
      id: 2,
      title: 'Luxury Apartment',
      price: 'TZS 320,000',
      pricePeriod: 'per month',
      leaseTerm: '6 months',
      location: 'City Centre, Dar es Salaam',
      type: 'house',
      listingType: 'For Rent',
      beds: 3,
      baths: 2,
      area: '180 sqm',
      furnishedStatus: 'Semi Furnished',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Spacious apartment in the heart of the city with modern amenities and security.'
    },
    {
      id: 3,
      title: 'Family Townhouse',
      price: 'TZS 280,000,000',
      location: 'Oyster Bay, Dar es Salaam',
      type: 'house',
      listingType: 'For Sale',
      beds: 5,
      baths: 4,
      area: '300 sqm',
      furnishedStatus: 'Unfurnished',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
      company: 'Neo Estates',
      description: 'Spacious townhouse perfect for large families with garden and parking.'
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || property.type === selectedType;
    const matchesLocation = !selectedRegion || property.location.includes(selectedRegion) || 
                           !selectedDistrict || property.location.includes(selectedDistrict);
    const matchesListingType = !selectedListingType || property.listingType === selectedListingType;
    
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
        case 'under-200':
          matchesArea = area < 200;
          break;
        case '200-300':
          matchesArea = area >= 200 && area < 300;
          break;
        case '300-500':
          matchesArea = area >= 300 && area < 500;
          break;
        case 'over-500':
          matchesArea = area >= 500;
          break;
      }
    }
    
    // Bedrooms filtering
    let matchesBedrooms = true;
    if (selectedBedrooms) {
      const beds = property.beds;
      switch (selectedBedrooms) {
        case '1':
          matchesBedrooms = beds === 1;
          break;
        case '2':
          matchesBedrooms = beds === 2;
          break;
        case '3':
          matchesBedrooms = beds === 3;
          break;
        case '4+':
          matchesBedrooms = beds >= 4;
          break;
      }
    }
    
    // Bathrooms filtering
    let matchesBathrooms = true;
    if (selectedBathrooms) {
      const baths = property.baths;
      switch (selectedBathrooms) {
        case '1':
          matchesBathrooms = baths === 1;
          break;
        case '2':
          matchesBathrooms = baths === 2;
          break;
        case '3+':
          matchesBathrooms = baths >= 3;
          break;
      }
    }
    
    // Furnished status filtering
    let matchesFurnished = true;
    if (furnishedStatus && property.furnishedStatus) {
      matchesFurnished = property.furnishedStatus === furnishedStatus;
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesListingType && matchesPrice && matchesArea && matchesBedrooms && matchesBathrooms && matchesFurnished;
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
            <span>Houses</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={20} />
            <input
              type="text"
              placeholder="Search houses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="townhouse">Townhouse</option>
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

              {/* Price Range */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Min Price (TZS)
                  </label>
                  <input
                    type="text"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Max Price (TZS)
                  </label>
                  <input
                    type="text"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="Any"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              {/* Area Range and Furnished Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Any Area</option>
                    <option value="under-200">Under 200 sqm</option>
                    <option value="200-300">200-300 sqm</option>
                    <option value="300-500">300-500 sqm</option>
                    <option value="over-500">Over 500 sqm</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Furnished Status
                  </label>
                  <select 
                    value={furnishedStatus} 
                    onChange={(e) => setFurnishedStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms and Bathrooms */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Bedrooms
                  </label>
                  <select 
                    value={selectedBedrooms} 
                    onChange={(e) => setSelectedBedrooms(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Bathrooms
                  </label>
                  <select 
                    value={selectedBathrooms} 
                    onChange={(e) => setSelectedBathrooms(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1 Bathroom</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="3+">3+ Bathrooms</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                onClick={() => {
                  setSelectedType('');
                  setSelectedRegion('');
                  setSelectedDistrict('');
                  setSelectedListingType('');
                  setPriceRange({ min: '', max: '' });
                  setAreaRange('');
                  setFurnishedStatus('');
                  setSelectedBedrooms('');
                  setSelectedBathrooms('');
                }}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Properties Grid */}
      <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card" onClick={() => handlePropertyClick(property.id)}>
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

              {/* Property Image */}
              <div className="property-image-container">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <div className="property-badge">House</div>
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
                  <span>{property.location}</span>
                </div>
                <div className="property-features">
                  <div className="feature-item">
                    <Bed size={16} />
                    <span>{property.beds} beds</span>
                  </div>
                  <div className="feature-item">
                    <Bath size={16} />
                    <span>{property.baths} baths</span>
                  </div>
                  <div className="feature-item">
                    <Square size={16} />
                    <span>{property.area}</span>
                  </div>
                </div>
                <div className="property-description">{property.description}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ width: '4rem', height: '4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Building2 size={32} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No houses found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Property Submission Form */}
      <PropertySubmissionForm 
        isOpen={showPropertyForm}
        onClose={() => setShowPropertyForm(false)}
        propertyType="residence"
      />

      {/* Sidebar */}
              <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} userRole={user.role} />
    </div>
  );
};

export default Houses; 