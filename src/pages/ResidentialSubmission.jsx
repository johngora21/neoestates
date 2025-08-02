import { useState } from 'react';
import { ArrowLeft, MapPin, Upload, X, Bed, Bath, Car, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResidentialSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Villa', // Villa, Apartment, Townhouse, Duplex, Other
    location: '',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    furnishedStatus: 'Fully Furnished', // Fully Furnished, Semi Furnished, Unfurnished
    description: '',
    images: [],
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
    parkingSpaces: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Residential Property Submission:', formData);
    // Here you would typically send the data to your backend
    alert('Property submitted successfully! We will contact you within 24-48 hours.');
    navigate('/');
  };

  const propertyTypeOptions = ['Villa', 'Apartment', 'Townhouse', 'Duplex', 'Other'];
  const furnishedOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];

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
            <span>Submit Residential Property</span>
          </div>
        </div>
      </header>

      {/* Form */}
      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Basic Information */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Basic Information</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
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
                  {propertyTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={16} />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem'
                    }}
                    placeholder="Enter property location"
                  />
                </div>
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Size (sqm) *</label>
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
                  placeholder="e.g., 250"
                />
              </div>

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

              <div>
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
                  {furnishedOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Parking Spaces</label>
                <input
                  type="number"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}
                  placeholder="Number of parking spaces"
                />
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Additional Features</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {[
                { name: 'swimmingPool', label: 'Swimming Pool', icon: '🏊' },
                { name: 'garden', label: 'Garden', icon: '🌿' },
                { name: 'securitySystem', label: 'Security System', icon: '🔒' },
                { name: 'internetWifi', label: 'Internet/WiFi', icon: '📶' },
                { name: 'airConditioning', label: 'Air Conditioning', icon: '❄️' },
                { name: 'waterHeater', label: 'Water Heater', icon: '🚿' },
                { name: 'kitchen', label: 'Kitchen', icon: '🍳' },
                { name: 'balconyTerrace', label: 'Balcony/Terrace', icon: '🏠' },
                { name: 'garageCarport', label: 'Garage/Carport', icon: '🚗' },
                { name: 'storageRoom', label: 'Storage Room', icon: '📦' },
                { name: 'servantQuarters', label: 'Servant Quarters', icon: '👥' }
              ].map(feature => (
                <label key={feature.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name={feature.name}
                    checked={formData[feature.name]}
                    onChange={handleInputChange}
                    style={{ width: '1rem', height: '1rem' }}
                  />
                  <span style={{ fontSize: '1.25rem' }}>{feature.icon}</span>
                  <span>{feature.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Description</h3>
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
                resize: 'vertical'
              }}
              placeholder="Describe your property in detail..."
            />
          </div>

          {/* Image Upload */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Property Images</h3>
            <div style={{ border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
              <Upload size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Drag and drop images here, or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                Select Images
              </label>
            </div>
            {formData.images.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Selected Images:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {formData.images.map((file, index) => (
                    <div key={index} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
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
            Submit Residential Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResidentialSubmission; 