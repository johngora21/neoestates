const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');
const connectDB = require('../config/database');

// Connect to database
connectDB();

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@neoestates.com',
    password: 'password123',
    phone: '+255123456789',
    role: 'admin'
  },
  {
    name: 'John Agent',
    email: 'john@neoestates.com',
    password: 'password123',
    phone: '+255123456790',
    role: 'agent'
  },
  {
    name: 'Sarah Agent',
    email: 'sarah@neoestates.com',
    password: 'password123',
    phone: '+255123456791',
    role: 'agent'
  },
  {
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password123',
    phone: '+255123456792',
    role: 'user'
  }
];

// Sample properties data
const properties = [
  {
    title: 'Modern Villa in Oyster Bay',
    propertyType: 'residence',
    subType: 'Villa',
    listingType: 'For Sale',
    price: 850000000,
    location: 'Oyster Bay, Dar es Salaam',
    size: '450 sqm',
    bedrooms: 4,
    bathrooms: 3,
    furnishedStatus: 'Fully Furnished',
    parkingSpaces: 2,
    description: 'Beautiful modern villa with sea view, swimming pool, and garden. Perfect for families.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1564013799919-ab60dec48ed5?w=800',
        public_id: 'villa1'
      }
    ],
    swimmingPool: true,
    garden: true,
    securitySystem: true,
    internetWifi: true,
    airConditioning: true,
    waterHeater: true,
    kitchen: true,
    balconyTerrace: true,
    garageCarport: true,
    status: 'approved',
    views: 45
  },
  {
    title: 'Luxury Apartment in City Centre',
    propertyType: 'residence',
    subType: 'Apartment',
    listingType: 'For Rent',
    price: 2500000,
    pricePeriod: 'per month',
    leaseTerm: '12 months',
    location: 'City Centre, Dar es Salaam',
    size: '120 sqm',
    bedrooms: 2,
    bathrooms: 2,
    furnishedStatus: 'Semi Furnished',
    parkingSpaces: 1,
    description: 'Modern apartment in the heart of the city with all amenities nearby.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        public_id: 'apartment1'
      }
    ],
    internetWifi: true,
    airConditioning: true,
    kitchen: true,
    balconyTerrace: true,
    status: 'approved',
    views: 32
  },
  {
    title: 'Office Space in CBD',
    propertyType: 'commercial',
    subType: 'Office',
    listingType: 'For Rent',
    price: 1500000,
    pricePeriod: 'per month',
    leaseTerm: '6 months',
    location: 'CBD, Dar es Salaam',
    size: '200 sqm',
    commercialType: 'Office',
    description: 'Professional office space in central business district with conference rooms.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        public_id: 'office1'
      }
    ],
    spaceAvailability: true,
    securitySystem: true,
    internetWifi: true,
    airConditioning: true,
    conferenceRooms: true,
    receptionArea: true,
    status: 'approved',
    views: 28
  },
  {
    title: 'Retail Shop in Shopping Mall',
    propertyType: 'commercial',
    subType: 'Shop',
    listingType: 'For Sale',
    price: 150000000,
    location: 'Mlimani City, Dar es Salaam',
    size: '80 sqm',
    commercialType: 'Shop',
    description: 'Prime retail space in popular shopping mall with high foot traffic.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        public_id: 'shop1'
      }
    ],
    spaceAvailability: true,
    securitySystem: true,
    internetWifi: true,
    airConditioning: true,
    status: 'approved',
    views: 56
  },
  {
    title: 'Residential Plot in Upanga',
    propertyType: 'plot',
    subType: 'Residential',
    listingType: 'For Sale',
    price: 75000000,
    location: 'Upanga, Dar es Salaam',
    size: '500 sqm',
    plotType: 'Residential',
    plotSize: '500 sqm',
    description: 'Prime residential plot in quiet neighborhood with all utilities available.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        public_id: 'plot1'
      }
    ],
    waterSupply: true,
    electricitySupply: true,
    sewerageSystem: true,
    fencing: true,
    security: true,
    streetLighting: true,
    roadAccess: true,
    status: 'approved',
    views: 23
  },
  {
    title: 'Commercial Plot in Mbezi Beach',
    propertyType: 'plot',
    subType: 'Commercial',
    listingType: 'For Sale',
    price: 120000000,
    location: 'Mbezi Beach, Dar es Salaam',
    size: '1000 sqm',
    plotType: 'Commercial',
    plotSize: '1000 sqm',
    description: 'Large commercial plot near the beach, perfect for hotel or restaurant development.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        public_id: 'plot2'
      }
    ],
    waterSupply: true,
    electricitySupply: true,
    sewerageSystem: true,
    fencing: false,
    security: true,
    streetLighting: true,
    roadAccess: true,
    status: 'pending',
    views: 12
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users imported successfully');

    // Create properties with owner references
    const propertiesWithOwners = properties.map((property, index) => ({
      ...property,
      owner: createdUsers[index % createdUsers.length]._id
    }));

    await Property.create(propertiesWithOwners);
    console.log('Properties imported successfully');

    console.log('Data import completed successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Property.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// Run seeder
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 