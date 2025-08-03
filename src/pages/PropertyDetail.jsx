import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Bed, Bath, Car, Star, Share2, Bookmark, Phone, MessageSquare, Eye, Edit, Trash2, ChevronDown, ChevronUp, Navigation, Square } from 'lucide-react';
import Map from '../components/Map';

const PropertyDetail = ({ addToFavorites, favorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    details: false,
    features: false,
    amenities: false,
    additionalFeatures: false
  });

  // Fetch property data based on ID
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate fetching from a properties array
        const properties = [
          {
            id: 1,
    title: 'Modern Villa in Masaki',
            type: 'Residence',
            propertyType: 'Villa',
    location: 'Masaki, Dar es Salaam',
            price: 'TZS 450,000,000',
            size: '250 sqm',
            bedrooms: 4,
            bathrooms: 3,
            parking: 2,
            furnished: 'Fully Furnished',
            commercialType: null,
            parkingSpaces: null,
            plotType: null,
            plotSize: null,
            roadAccess: null,
            description: 'This stunning modern villa offers luxury living in the heart of Masaki. Features include spacious bedrooms, modern kitchen, swimming pool, and beautiful garden. Perfect for families seeking comfort and style.',
    images: [
              'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop'
            ],
    features: [
      'Swimming Pool',
      'Garden',
      'Security System',
              'Air Conditioning',
      'Modern Kitchen',
      'Balcony'
    ],
            nearbyAmenities: [
              'Schools',
              'Hospitals',
              'Shopping Centers',
              'Restaurants',
              'Public Transport'
            ],
            // Additional features (Yes/No)
            spaceAvailability: true,
            swimmingPool: true,
            garden: true,
            securitySystem: true,
            internetWifi: true,
            airConditioning: true,
            waterHeater: true,
            kitchen: true,
            balconyTerrace: true,
            garageCarport: false,
            storageRoom: true,
            servantQuarters: false
          },
          {
            id: 2,
            title: 'Office Building in City Centre',
            type: 'Commercial',
            propertyType: 'Office Building',
            location: 'City Centre, Dar es Salaam',
            price: 'TZS 850,000,000',
            size: '500 sqm',
            bedrooms: null,
            bathrooms: null,
            parking: null,
            furnished: null,
            commercialType: 'Office',
            parkingSpaces: 20,
            plotType: null,
            plotSize: null,
            roadAccess: null,
            description: 'Modern office building with multiple floors, perfect for corporate headquarters. Features include conference rooms, reception area, and modern amenities.',
            images: [
              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
            ],
            features: [
              'Conference Rooms',
              'Reception Area',
              'Security System',
              'Air Conditioning',
              'Internet/WiFi'
            ],
            nearbyAmenities: [
              'Public Transport',
              'Restaurants',
              'Banks',
              'Shopping Centers'
            ],
            // Additional features for Commercial
            spaceAvailability: true,
            securitySystem: true,
            internetWifi: true,
            airConditioning: true,
            loadingDocks: true,
            storageRoom: true,
            kitchen: false,
            conferenceRooms: true,
            receptionArea: true
          },
          {
            id: 3,
            title: 'Residential Plot in Masaki',
            type: 'Plot',
            propertyType: 'Residential Plot',
            location: 'Masaki, Dar es Salaam',
            price: 'TZS 180,000,000',
            size: '500 sqm',
            bedrooms: null,
            bathrooms: null,
            parking: null,
            furnished: null,
            commercialType: null,
            parkingSpaces: null,
            plotType: 'Residential',
            plotSize: '500 sqm',
            roadAccess: true,
            description: 'Prime residential plot in upscale neighborhood with excellent infrastructure and security. Ready for development.',
            images: [
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'
            ],
            features: [
              'Road Access',
              'Water Supply',
              'Electricity',
              'Security'
            ],
            nearbyAmenities: [
              'Schools',
              'Hospitals',
              'Shopping Centers',
              'Public Transport'
            ],
            // Additional features for Plot
            waterSupply: true,
            electricitySupply: true,
            sewerageSystem: true,
            fencing: true,
            security: true,
            streetLighting: true
          }
        ];

        const foundProperty = properties.find(p => p.id === parseInt(id));
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // Property not found
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (addToFavorites) {
      addToFavorites(property);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPropertyTypeLabel = () => {
    switch(property?.type) {
      case 'Residence': return 'Residence';
      case 'Commercial': return 'Commercial';
      case 'Plot': return 'Plot';
      default: return 'Property';
    }
  };

  const getPropertyTypeIcon = () => {
    switch(property?.type) {
      case 'Residence': return <Building2 size={20} />;
      case 'Commercial': return <Building2 size={20} />;
      case 'Plot': return <Building2 size={20} />;
      default: return <Building2 size={20} />;
    }
  };

  const getAdditionalFeatures = () => {
    if (!property) return [];
    
    const features = [];
    
    if (property.type === 'Residence') {
      features.push(
        { name: 'Swimming Pool', value: property.swimmingPool },
        { name: 'Garden', value: property.garden },
        { name: 'Security System', value: property.securitySystem },
        { name: 'Internet/WiFi', value: property.internetWifi },
        { name: 'Air Conditioning', value: property.airConditioning },
        { name: 'Water Heater', value: property.waterHeater },
        { name: 'Kitchen', value: property.kitchen },
        { name: 'Balcony/Terrace', value: property.balconyTerrace },
        { name: 'Garage/Carport', value: property.garageCarport },
        { name: 'Storage Room', value: property.storageRoom },
        { name: 'Servant Quarters', value: property.servantQuarters }
      );
    } else if (property.type === 'Commercial') {
      features.push(
        { name: 'Space Availability', value: property.spaceAvailability },
        { name: 'Security System', value: property.securitySystem },
        { name: 'Internet/WiFi', value: property.internetWifi },
        { name: 'Air Conditioning', value: property.airConditioning },
        { name: 'Loading Docks', value: property.loadingDocks },
        { name: 'Storage Room', value: property.storageRoom },
        { name: 'Kitchen', value: property.kitchen },
        { name: 'Conference Rooms', value: property.conferenceRooms },
        { name: 'Reception Area', value: property.receptionArea }
      );
    } else if (property.type === 'Plot') {
      features.push(
        { name: 'Water Supply', value: property.waterSupply },
        { name: 'Electricity Supply', value: property.electricitySupply },
        { name: 'Sewerage System', value: property.sewerageSystem },
        { name: 'Fencing', value: property.fencing },
        { name: 'Security', value: property.security },
        { name: 'Street Lighting', value: property.streetLighting }
      );
    }
    
    return features;
  };

  const handleBackNavigation = () => {
    // Check if there's a previous page in the app's history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no previous page, go to home
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.125rem',
        color: 'var(--text-secondary)'
      }}>
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.125rem',
        color: 'var(--text-secondary)'
      }}>
        Property not found
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button 
            className="action-btn" 
            onClick={handleBackNavigation}
            style={{ marginRight: '1rem' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="logo">
            <span>Property Details</span>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={handleFavorite}>
              <Bookmark size={18} style={{ color: isFavorite ? 'var(--primary)' : 'inherit' }} />
            </button>
            <button className="action-btn" onClick={() => window.open('tel:+255123456789', '_self')}>
              <Phone size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Property Image */}
      <div style={{ marginBottom: '2rem' }}>
        <img
          src={property.images[0]} 
          alt={property.title}
          style={{ 
            width: '100%', 
            height: '250px', 
            objectFit: 'cover', 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)'
          }} 
        />
      </div>

      {/* Property Info */}
      <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title and Price */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          {property.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            {getPropertyTypeIcon()}
            <span style={{ fontSize: '0.75rem' }}>{property.propertyType || property.commercialType || property.plotType}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '0.75rem' }}>{property.location}</span>
        </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary)' }}>
          {property.price}
            {property.listingType === 'For Rent' && property.pricePeriod && (
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                {property.pricePeriod}
              </span>
            )}
            {property.listingType === 'For Rent' && property.leaseTerm && (
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Term: {property.leaseTerm}
              </div>
            )}
          </div>
        </div>

        {/* Property Details Grid - 2 per row */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Row 1 */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>ID:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Category:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.type}</span>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Type:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.propertyType || property.commercialType || property.plotType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Size:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.size}</span>
            </div>

            {/* Residence-specific details */}
            {property.type === 'Residence' && (
              <>
                {/* Row 3 */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>No of bedrooms:</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.bedrooms}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>No of bathrooms:</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.bathrooms}</span>
        </div>

                {/* Row 4 */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Parking spaces:</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.parking}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Furnished:</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.furnished}</span>
                </div>
              </>
            )}

            {/* Commercial-specific details */}
            {property.type === 'Commercial' && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Parking spaces:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.parkingSpaces}</span>
          </div>
            )}

            {/* Plot-specific details */}
            {property.type === 'Plot' && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Road access:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{property.roadAccess ? 'Yes' : 'No'}</span>
          </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
            Description
          </h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem' }}>
            {property.description}
          </p>
        </div>

        {/* Features - Expandable */}
        <div style={{ marginBottom: '2rem' }}>
          <div 
            style={{
              padding: '1.5rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--border-light)'
            }}
            onClick={() => toggleSection('features')}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
            Features
          </h3>
            {expandedSections.features ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.features && (
            <div style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {/* Additional Features - Only show available ones */}
                {getAdditionalFeatures()
                  .filter(feature => feature.value)
                  .map((feature, index) => (
                  <div key={`additional-${index}`} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <span style={{ fontSize: '0.875rem' }}>✓</span>
                    {feature.name}
                  </div>
                ))}
                
                {/* Regular Features - Only show if they exist */}
                {property.features && property.features.map((feature, index) => (
                  <div key={`regular-${index}`} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.875rem' }}>✓</span>
                {feature}
              </div>
            ))}
          </div>
            </div>
          )}
        </div>

        {/* Nearby Amenities - Expandable */}
        {property.nearbyAmenities && property.nearbyAmenities.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div 
              style={{
                padding: '1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--border-light)'
              }}
              onClick={() => toggleSection('amenities')}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
            Nearby Amenities
          </h3>
              {expandedSections.amenities ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections.amenities && (
              <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)'
              }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {property.nearbyAmenities.map((amenity, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    📍 {amenity}
              </div>
            ))}
          </div>
        </div>
            )}
          </div>
        )}
        </div>

      {/* Map Section */}
      <div style={{ marginTop: '1rem', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
          Location
        </h3>
        <Map 
          height="300px"
          markers={[
            {
              lat: -6.8235, // Default to Dar es Salaam coordinates
              lng: 39.2695,
              popup: property.location
            }
          ]}
        />
          

        {/* Location Details */}
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 