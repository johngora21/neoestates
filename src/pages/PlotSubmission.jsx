import { useState } from 'react';
import { ArrowLeft, MapPin, Upload, X, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlotSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    plotType: 'Residential', // Residential, Commercial, Agricultural, Mixed Use
    location: '',
    price: '',
    plotSize: '',
    roadAccess: false,
    description: '',
    images: [],
    // Additional Features
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Plot Property Submission:', formData);
    // Here you would typically send the data to your backend
    alert('Property submitted successfully! We will contact you within 24-48 hours.');
    navigate('/');
  };

  const plotTypeOptions = ['Residential', 'Commercial', 'Agricultural', 'Mixed Use'];

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
            <span>Submit Plot Property</span>
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
                  {plotTypeOptions.map(option => (
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
                    placeholder="Enter plot location"
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
                  placeholder="e.g., 180,000,000"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Plot Size *</label>
                <input
                  type="text"
                  name="plotSize"
                  value={formData.plotSize}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}
                  placeholder="e.g., 500 sqm or 2 acres"
                />
              </div>

              <div>
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
            </div>
          </div>

          {/* Additional Features */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Additional Features</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {[
                { name: 'waterSupply', label: 'Water Supply', icon: '💧' },
                { name: 'electricitySupply', label: 'Electricity Supply', icon: '⚡' },
                { name: 'sewerageSystem', label: 'Sewerage System', icon: '🚰' },
                { name: 'fencing', label: 'Fencing', icon: '🏗️' },
                { name: 'security', label: 'Security', icon: '🔒' },
                { name: 'streetLighting', label: 'Street Lighting', icon: '💡' }
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
              placeholder="Describe your plot in detail..."
            />
          </div>

          {/* Image Upload */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Plot Images</h3>
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
            Submit Plot Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlotSubmission; 