import { useState } from 'react';
import { Building2, MapPin, Edit, Trash2, Eye, Plus, Search, ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('residence');

  const myProperties = [
    {
      id: 1,
      title: 'Modern Villa in Masaki',
      type: 'House',
      location: 'Masaki, Dar es Salaam',
      price: 'TZS 450,000,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
      views: 245,
      inquiries: 12
    },
    {
      id: 2,
      title: 'Office Building in City Centre',
      type: 'Commercial',
      location: 'City Centre, Dar es Salaam',
      price: 'TZS 850,000,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
      views: 189,
      inquiries: 8
    },
    {
      id: 3,
      title: 'Residential Plot in Masaki',
      type: 'Plot',
      location: 'Masaki, Dar es Salaam',
      price: 'TZS 180,000,000',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop',
      views: 156,
      inquiries: 5
    },
    {
      id: 4,
      title: 'Luxury Apartment',
      type: 'House',
      location: 'City Centre, Dar es Salaam',
      price: 'TZS 320,000,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
      views: 203,
      inquiries: 15
    }
  ];

  const filteredProperties = myProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'var(--primary)';
      case 'Pending':
        return '#f59e0b';
      case 'Inactive':
        return '#ef4444';
      default:
        return 'var(--text-tertiary)';
    }
  };

  const handleAddProperty = () => {
    // Navigate to the new AddProperty page
    navigate('/add-property');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button 
            className="action-btn" 
            onClick={() => navigate('/')}
            style={{ marginRight: '1rem' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="logo">
            <span>My Properties</span>
          </div>
          <div className="header-actions">
            <button 
              className="action-btn primary" 
              onClick={handleAddProperty}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div style={{ padding: '1rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={20} />
            <input
              type="text"
              placeholder="Search your properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                background: 'white',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '0.875rem 1rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="">All Types</option>
            <option value="House">Houses</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plots</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              {/* Property Image */}
              <div className="property-image-container">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <div className="property-badge" style={{ background: getStatusColor(property.status) }}>
                  {property.status}
                </div>
              </div>

              {/* Property Info */}
              <div className="card-content">
                <div className="property-title">
                  {property.title}
                </div>
                
                <div className="property-location">
                  <Building2 size={16} />
                  <span>{property.type}</span>
                </div>

                <div className="property-location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>

                <div className="property-price">
                  {property.price}
                </div>

                <div className="property-features">
                  <div className="feature-item">
                    <Eye size={16} />
                    <span>{property.views} views</span>
                  </div>
                  <div className="feature-item">
                    <MessageSquare size={16} />
                    <span>{property.inquiries} inquiries</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button 
                    className="action-btn-small"
                    onClick={() => navigate(`/properties/${property.id}`)}
                    style={{ flex: 1 }}
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button className="action-btn-small">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn-small">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ width: '4rem', height: '4rem', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Building2 size={32} style={{ color: '#9ca3af' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>No properties found</h3>
            <p style={{ color: '#6b7280' }}>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties; 