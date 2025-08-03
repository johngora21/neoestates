const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Simple test server is working!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mock properties endpoint
app.get('/api/properties', (req, res) => {
  res.json({
    success: true,
    count: 3,
    data: [
      {
        _id: '1',
        title: 'Modern Villa in Dar es Salaam',
        description: 'Beautiful 4-bedroom villa with pool',
        price: 250000000,
        location: 'Dar es Salaam',
        propertyType: 'residence',
        listingType: 'For Sale',
        bedrooms: 4,
        bathrooms: 3,
        size: '450 sqm',
        owner: {
          name: 'Neo Estates',
          email: 'info@neoestates.com'
        },
        media: [
          {
            url: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=Villa+1',
            type: 'image'
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Commercial Office Space',
        description: 'Prime office space in city center',
        price: 150000000,
        location: 'Dar es Salaam',
        propertyType: 'commercial',
        listingType: 'For Sale',
        size: '300 sqm',
        owner: {
          name: 'Neo Estates',
          email: 'info@neoestates.com'
        },
        media: [
          {
            url: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Office+1',
            type: 'image'
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        title: 'Residential Plot',
        description: 'Prime residential plot ready for development',
        price: 75000000,
        location: 'Dar es Salaam',
        propertyType: 'plot',
        listingType: 'For Sale',
        size: '500 sqm',
        owner: {
          name: 'Neo Estates',
          email: 'info@neoestates.com'
        },
        media: [
          {
            url: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Plot+1',
            type: 'image'
          }
        ],
        createdAt: new Date().toISOString()
      }
    ]
  });
});

// Mock regions endpoint
app.get('/api/regions', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Dar es Salaam', districts: ['Ilala', 'Kinondoni', 'Temeke'] },
      { name: 'Arusha', districts: ['Arusha City', 'Arumeru', 'Monduli'] },
      { name: 'Mwanza', districts: ['Mwanza City', 'Ilemela', 'Nyamagana'] }
    ]
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Simple API server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/api/test`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Properties: http://localhost:${PORT}/api/properties`);
  console.log(`🗺️ Regions: http://localhost:${PORT}/api/regions`);
}); 