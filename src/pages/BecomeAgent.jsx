import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { agentRequestsAPI } from '../services/api';

// Tanzania regions data
const tanzaniaRegions = [
  {
    name: 'Arusha',
    districts: [
      'Arusha City',
      'Arusha District',
      'Karatu',
      'Longido',
      'Monduli',
      'Ngorongoro'
    ]
  },
  {
    name: 'Dar es Salaam',
    districts: [
      'Ilala',
      'Kinondoni',
      'Temeke',
      'Ubungo',
      'Kigamboni'
    ]
  },
  {
    name: 'Dodoma',
    districts: [
      'Dodoma City',
      'Bahi',
      'Chamwino',
      'Chemba',
      'Kondoa',
      'Kongwa',
      'Mpwapwa'
    ]
  },
  {
    name: 'Geita',
    districts: [
      'Bukombe',
      'Chato',
      'Geita',
      'Mbogwe',
      'Nyang\'hwale'
    ]
  },
  {
    name: 'Iringa',
    districts: [
      'Iringa City',
      'Iringa District',
      'Kilolo',
      'Mafinga',
      'Mufindi',
      'Njombe'
    ]
  },
  {
    name: 'Kagera',
    districts: [
      'Biharamulo',
      'Bukoba',
      'Bukoba Rural',
      'Karagwe',
      'Kyerwa',
      'Missenyi',
      'Muleba',
      'Ngara'
    ]
  },
  {
    name: 'Katavi',
    districts: [
      'Mlele',
      'Mpanda',
      'Mpanda City'
    ]
  },
  {
    name: 'Kigoma',
    districts: [
      'Buhigwe',
      'Kakonko',
      'Kasulu',
      'Kasulu Town',
      'Kibondo',
      'Kigoma',
      'Uvinza'
    ]
  },
  {
    name: 'Kilimanjaro',
    districts: [
      'Hai',
      'Moshi',
      'Moshi City',
      'Mwanga',
      'Rombo',
      'Same',
      'Siha'
    ]
  },
  {
    name: 'Lindi',
    districts: [
      'Kilwa',
      'Lindi',
      'Liwale',
      'Nachingwea',
      'Ruangwa'
    ]
  },
  {
    name: 'Manyara',
    districts: [
      'Babati',
      'Hanang',
      'Kiteto',
      'Mbulu',
      'Simanjiro'
    ]
  },
  {
    name: 'Mara',
    districts: [
      'Bunda',
      'Butiama',
      'Musoma',
      'Musoma Rural',
      'Rorya',
      'Serengeti',
      'Tarime'
    ]
  },
  {
    name: 'Mbeya',
    districts: [
      'Chunya',
      'Ileje',
      'Kyela',
      'Mbarali',
      'Mbeya City',
      'Mbeya Rural',
      'Mbozi',
      'Rungwe'
    ]
  },
  {
    name: 'Morogoro',
    districts: [
      'Gairo',
      'Kilombero',
      'Kilosa',
      'Malinyi',
      'Morogoro',
      'Morogoro Rural',
      'Mvomero',
      'Ulanga'
    ]
  },
  {
    name: 'Mtwara',
    districts: [
      'Masasi',
      'Mtwara',
      'Mtwara Rural',
      'Nanyumbu',
      'Newala',
      'Tandahimba'
    ]
  },
  {
    name: 'Mwanza',
    districts: [
      'Ilemela',
      'Kwimba',
      'Magu',
      'Misungwi',
      'Nyamagana',
      'Sengerema',
      'Ukerewe'
    ]
  },
  {
    name: 'Njombe',
    districts: [
      'Ludewa',
      'Makambako',
      'Makete',
      'Njombe',
      'Wanging\'ombe'
    ]
  },
  {
    name: 'Pemba North',
    districts: [
      'Micheweni',
      'Wete'
    ]
  },
  {
    name: 'Pemba South',
    districts: [
      'Chake Chake',
      'Mkoani'
    ]
  },
  {
    name: 'Pwani',
    districts: [
      'Bagamoyo',
      'Chalinze',
      'Kibaha',
      'Kibaha Town',
      'Kisarawe',
      'Mafia',
      'Mkuranga',
      'Rufiji'
    ]
  },
  {
    name: 'Rukwa',
    districts: [
      'Kalambo',
      'Nkasi',
      'Sumbawanga',
      'Sumbawanga Rural'
    ]
  },
  {
    name: 'Ruvuma',
    districts: [
      'Mbinga',
      'Songea',
      'Songea Rural',
      'Tunduru'
    ]
  },
  {
    name: 'Shinyanga',
    districts: [
      'Kahama',
      'Kahama Town',
      'Kishapu',
      'Shinyanga',
      'Shinyanga Rural'
    ]
  },
  {
    name: 'Simiyu',
    districts: [
      'Bariadi',
      'Busega',
      'Itilima',
      'Maswa',
      'Meatu'
    ]
  },
  {
    name: 'Singida',
    districts: [
      'Ikungi',
      'Iramba',
      'Manyoni',
      'Mkalama',
      'Singida',
      'Singida Rural'
    ]
  },
  {
    name: 'Songwe',
    districts: [
      'Ileje',
      'Mbozi',
      'Momba'
    ]
  },
  {
    name: 'Tabora',
    districts: [
      'Igunga',
      'Kaliua',
      'Nzega',
      'Sikonge',
      'Tabora',
      'Urambo'
    ]
  },
  {
    name: 'Tanga',
    districts: [
      'Handeni',
      'Handeni Town',
      'Kilindi',
      'Korogwe',
      'Korogwe Town',
      'Lushoto',
      'Mkinga',
      'Muheza',
      'Pangani',
      'Tanga'
    ]
  },
  {
    name: 'Unguja North',
    districts: [
      'Kaskazini A',
      'Kaskazini B'
    ]
  },
  {
    name: 'Unguja South',
    districts: [
      'Kusini',
      'Mjini Magharibi'
    ]
  },
  {
    name: 'Unguja West',
    districts: [
      'Magharibi'
    ]
  }
];

const BecomeAgent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    region: '',
    district: '',
    instagram: '',
    facebook: '',
    reason: '',
    experience: ''
  });

  // Get districts for selected region
  const getDistrictsForRegion = (regionName) => {
    const region = tanzaniaRegions.find(r => r.name === regionName);
    return region ? region.districts : [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset district when region changes
    if (name === 'region') {
      setFormData(prev => ({
        ...prev,
        region: value,
        district: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await agentRequestsAPI.submit(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting agent request:', error);
      alert(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <button
              className="action-btn"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} />
            </button>
            <div className="header-title">
              <span>Become an Agent</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'var(--success-light)',
              color: 'var(--success)',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '500px',
              width: '100%'
            }}>
              <CheckCircle size={64} style={{ marginBottom: '1rem' }} />
              <h2 style={{ marginBottom: '1rem', color: 'var(--success)' }}>
                Request Submitted Successfully!
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                Thank you for your interest in becoming a Neo Estates agent. 
                We have received your application and will review it carefully.
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                You will be notified via email once your application has been reviewed.
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Return to Home
              </button>
            </div>
          </div>
        </main>

        <Sidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)}
          userRole={user?.role}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <button
            className="action-btn"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="header-title">
            <span>Become an Agent</span>
          </div>

        </div>
      </header>

      <main className="main-content">
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Join Our Team as a Real Estate Agent
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Are you passionate about real estate? Join Neo Estates as an agent and help 
              people find their dream properties. Submit your application below and we'll 
              get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+255755070072"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Region *
              </label>
              <select
                name="region"
                value={formData.region}
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
                <option value="">Select a region</option>
                {tanzaniaRegions.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                District *
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
                disabled={!formData.region}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  opacity: !formData.region ? 0.6 : 1
                }}
              >
                <option value="">
                  {formData.region ? 'Select a district' : 'Please select a region first'}
                </option>
                {formData.region && getDistrictsForRegion(formData.region).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Instagram Username
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="e.g., @username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Facebook Username
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="e.g., username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Why do you want to become an agent? *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Tell us why you want to join our team..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Real Estate Experience *
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe your experience in real estate, if any..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? 'var(--text-secondary)' : 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </main>

      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)}
        userRole={user?.role}
      />
    </div>
  );
};

export default BecomeAgent; 