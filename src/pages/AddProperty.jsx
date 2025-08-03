import { useState } from 'react';
import { ArrowLeft, MapPin, Upload, X, Building2, Car, Square, Bed, Bath, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/Map'; // Fixed import conflict

const AddProperty = () => {
  const navigate = useNavigate();
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [locationMethod, setLocationMethod] = useState(''); // 'mapping' or 'exact'
  const [showMapModal, setShowMapModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    listingType: 'For Sale', // 'For Sale' or 'For Rent'
    pricePeriod: 'per month', // 'per month', 'per year', 'per day', etc.
    leaseTerm: '6 months', // '3 months', '6 months', '1 year', '2 years', etc.
    location: '',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    furnishedStatus: 'Fully Furnished',
    parkingSpaces: '',
    commercialType: 'Office',
    plotType: 'Residential',
    plotSize: '',
    roadAccess: false,
    description: '',
    images: [],
    videos: [],
    // Location data
    latitude: '',
    longitude: '',
    mappedArea: '',
    // Additional Features
    swimmingPool: false,
    garden: false,
    securitySystem: false,
    internetWifi: false,
    airConditioning: false,
    waterHeater: false,
    kitchen: false,
    balconyTerrace: false,
    garageCarport: false,
    storageRoom: false,
    servantQuarters: false,
    spaceAvailability: false,
    loadingDocks: false,
    conferenceRooms: false,
    receptionArea: false,
    waterSupply: false,
    electricitySupply: false,
    sewerageSystem: false,
    fencing: false,
    security: false,
    streetLighting: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      videos: [...(prev.videos || []), ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Property Submission:', { type: selectedPropertyType, locationMethod, ...formData });
    // Here you would typically send the data to your backend
    alert('Property submitted successfully! We will contact you within 24-48 hours.');
    navigate('/');
  };

  const handleMapping = () => {
    setLocationMethod('mapping');
    setShowMapModal(true);
  };

  const handleExactLocation = () => {
    setLocationMethod('exact');
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          alert('Current location captured! Please enter the property address manually.');
        },
        (error) => {
          alert('Unable to get current location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const propertyTypeOptions = [
    { value: 'residence', label: 'Residential', description: 'Houses, Apartments, Villas' },
    { value: 'commercial', label: 'Commercial', description: 'Offices, Shops, Warehouses' },
    { value: 'plot', label: 'Plot', description: 'Land, Plots, Agricultural' }
  ];

  const getPropertyTypeLabel = () => {
    const option = propertyTypeOptions.find(opt => opt.value === selectedPropertyType);
    return option ? option.label : 'Property';
  };

  const getPropertyTypeOptions = () => {
    switch (selectedPropertyType) {
      case 'residence':
        return ['Villa', 'Apartment', 'Townhouse', 'Duplex', 'Other'];
      case 'commercial':
        return ['Office', 'Shop', 'Warehouse', 'Restaurant', 'Hotel', 'Other'];
      case 'plot':
        return ['Residential', 'Commercial', 'Agricultural', 'Mixed Use'];
      default:
        return [];
    }
  };

  const getFurnishedOptions = () => {
    return ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];
  };

  const getLeaseTermOptions = (pricePeriod) => {
    switch (pricePeriod) {
      case 'per day':
        return ['1 day', '3 days', '1 week', '2 weeks', '1 month', 'Flexible'];
      case 'per week':
        return ['1 week', '2 weeks', '1 month', '3 months', '6 months', 'Flexible'];
      case 'per month':
        return ['3 months', '6 months', '1 year', '2 years', '3 years', '5 years', 'Flexible'];
      case 'per year':
        return ['1 year', '2 years', '3 years', '5 years', '10 years', 'Flexible'];
      default:
        return ['3 months', '6 months', '1 year', '2 years', '3 years', '5 years', 'Flexible'];
    }
  };

  const renderLocationSection = () => (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginTop: '1.5rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Property Location *</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location Method</label>
        <select
          value={locationMethod}
          onChange={(e) => setLocationMethod(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem'
          }}
        >
          <option value="">Select location method</option>
          <option value="mapping">Map the Area</option>
          <option value="exact">Use Current Location</option>
        </select>
      </div>

      {locationMethod === 'mapping' && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem', fontWeight: '600' }}>Map the Property Area</h4>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Draw on the map to calculate the total area in square meters or acres
            </p>
          </div>
          
          <MapComponent 
            drawMode={true}
            height="400px"
            onAreaCalculated={(areaData) => {
              if (areaData) {
                setFormData(prev => ({
                  ...prev,
                  mappedArea: `${areaData.areaInSqMeters} sqm (${areaData.areaInAcres} acres)`,
                  latitude: areaData.coordinates[0].lat,
                  longitude: areaData.coordinates[0].lng
                }));
              } else {
                setFormData(prev => ({
                  ...prev,
                  mappedArea: ''
                }));
              }
            }}
          />
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Calculated Area</label>
            <input
              type="text"
              name="mappedArea"
              value={formData.mappedArea}
              onChange={handleInputChange}
              placeholder="Area will be calculated from map"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                background: '#f9fafb'
              }}
              readOnly
            />
          </div>
        </div>
      )}

            {locationMethod === 'exact' && (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Get Current Location</label>
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                background: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Navigation size={16} />
              Use Current Location
            </button>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Total Area *</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
              placeholder="e.g., 250 sqm or 2 acres"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderResidentialForm = () => (
    <>
      {/* Property Title and Property Type */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Property Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., Modern Villa in Masaki"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Property Type *</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select Property Type</option>
            {getPropertyTypeOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listing Type and Price */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Listing Type *</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="BNB">BNB (per night)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price (TZS) *</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., 450,000,000"
          />
        </div>
      </div>

      {/* Price Period and Lease Term (for rental properties) */}
      {formData.listingType === 'For Rent' && (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price Period *</label>
            <select
              name="pricePeriod"
              value={formData.pricePeriod}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              <option value="per month">Per Month</option>
              <option value="per year">Per Year</option>
              <option value="per day">Per Day</option>
              <option value="per week">Per Week</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Lease Term *</label>
            <select
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              {getLeaseTermOptions(formData.pricePeriod).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Bedrooms and Bathrooms */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Bedrooms *</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            required
            min="1"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Bathrooms *</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
            required
            min="1"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      {/* Furnished Status (single field) */}
      <div style={{ marginTop: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Furnished Status *</label>
        <select
          name="furnishedStatus"
          value={formData.furnishedStatus}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem'
          }}
        >
          {getFurnishedOptions().map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Additional Features for Residential */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Additional Features</h3>
        
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { name: 'parkingSpaces', label: 'Parking Spaces' },
            { name: 'swimmingPool', label: 'Swimming Pool' },
            { name: 'garden', label: 'Garden' },
            { name: 'securitySystem', label: 'Security System' },
            { name: 'internetWifi', label: 'Internet/WiFi' },
            { name: 'airConditioning', label: 'Air Conditioning' },
            { name: 'waterHeater', label: 'Water Heater' },
            { name: 'kitchen', label: 'Kitchen' },
            { name: 'balconyTerrace', label: 'Balcony/Terrace' },
            { name: 'garageCarport', label: 'Garage/Carport' },
            { name: 'storageRoom', label: 'Storage Room' },
            { name: 'servantQuarters', label: 'Servant Quarters' }
          ].map(feature => (
            <label key={feature.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name={feature.name}
                checked={formData[feature.name]}
                onChange={handleInputChange}
                style={{ width: '1rem', height: '1rem' }}
              />
              <span>{feature.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderCommercialForm = () => (
    <>
      {/* Commercial Title and Commercial Type */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Commercial Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., Office Building in City Centre"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Commercial Type *</label>
          <select
            name="commercialType"
            value={formData.commercialType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            {getPropertyTypeOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listing Type and Price */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Listing Type *</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="BNB">BNB (per night)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price (TZS) *</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., 850,000,000"
          />
        </div>
      </div>

      {/* Price Period and Lease Term (for rental properties) */}
      {formData.listingType === 'For Rent' && (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price Period *</label>
            <select
              name="pricePeriod"
              value={formData.pricePeriod}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              <option value="per month">Per Month</option>
              <option value="per year">Per Year</option>
              <option value="per day">Per Day</option>
              <option value="per week">Per Week</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Lease Term *</label>
            <select
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              {getLeaseTermOptions(formData.pricePeriod).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Additional Features for Commercial */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Additional Features</h3>
        
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { name: 'parkingSpaces', label: 'Parking Spaces' },
            { name: 'spaceAvailability', label: 'Space Availability' },
            { name: 'securitySystem', label: 'Security System' },
            { name: 'internetWifi', label: 'Internet/WiFi' },
            { name: 'airConditioning', label: 'Air Conditioning' },
            { name: 'loadingDocks', label: 'Loading Docks' },
            { name: 'storageRoom', label: 'Storage Room' },
            { name: 'kitchen', label: 'Kitchen' },
            { name: 'conferenceRooms', label: 'Conference Rooms' },
            { name: 'receptionArea', label: 'Reception Area' }
          ].map(feature => (
            <label key={feature.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name={feature.name}
                checked={formData[feature.name]}
                onChange={handleInputChange}
                style={{ width: '1rem', height: '1rem' }}
              />
              <span>{feature.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderPlotForm = () => (
    <>
      {/* Plot Title and Plot Type */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Plot Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., Residential Plot in Masaki"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Plot Type *</label>
          <select
            name="plotType"
            value={formData.plotType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            {getPropertyTypeOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listing Type and Price */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Listing Type *</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="BNB">BNB (per night)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price (TZS) *</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}
            placeholder="e.g., 180,000,000"
          />
        </div>
      </div>

      {/* Price Period and Lease Term (for rental properties) */}
      {formData.listingType === 'For Rent' && (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price Period *</label>
            <select
              name="pricePeriod"
              value={formData.pricePeriod}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              <option value="per month">Per Month</option>
              <option value="per year">Per Year</option>
              <option value="per day">Per Day</option>
              <option value="per week">Per Week</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Lease Term *</label>
            <select
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              {getLeaseTermOptions(formData.pricePeriod).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Road Access (single field) */}
      <div style={{ marginTop: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Road Access</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="roadAccess"
            checked={formData.roadAccess}
            onChange={handleInputChange}
            style={{ width: '1rem', height: '1rem' }}
          />
          <span>Yes, the plot has road access</span>
        </label>
      </div>

      {/* Additional Features for Plot */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Additional Features</h3>
        
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { name: 'waterSupply', label: 'Water Supply' },
            { name: 'electricitySupply', label: 'Electricity Supply' },
            { name: 'sewerageSystem', label: 'Sewerage System' },
            { name: 'fencing', label: 'Fencing' },
            { name: 'security', label: 'Security' },
            { name: 'streetLighting', label: 'Street Lighting' }
          ].map(feature => (
            <label key={feature.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name={feature.name}
                checked={formData[feature.name]}
                onChange={handleInputChange}
                style={{ width: '1rem', height: '1rem' }}
              />
              <span>{feature.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="App">
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
            <span>Add Property</span>
          </div>
          <div className="header-actions">
          </div>
        </div>
      </header>

      {/* Form */}
      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Property Type Selection */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Select Property Type</h3>
            
            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
            >
              <option value="">Choose Property Type</option>
              {propertyTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Form */}
          {selectedPropertyType && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Basic Information</h3>
              
              {selectedPropertyType === 'residence' && renderResidentialForm()}
              {selectedPropertyType === 'commercial' && renderCommercialForm()}
              {selectedPropertyType === 'plot' && renderPlotForm()}
            </div>
          )}

          {/* Location Section */}
          {selectedPropertyType && renderLocationSection()}

          {/* Description */}
          {selectedPropertyType && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Description</h3>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Describe your property in detail..."
              />
            </div>
          )}

          {/* Media Upload */}
          {selectedPropertyType && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>Property Media</h3>
              
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem'
                    }}
                  />
                  {formData.images.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formData.images.length} image(s) selected
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Videos</label>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem'
                    }}
                  />
                  {formData.videos && formData.videos.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formData.videos.length} video(s) selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedPropertyType && (
            <button
              type="submit"
              style={{
                padding: '1rem 2rem',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Submit {getPropertyTypeLabel()}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProperty; 