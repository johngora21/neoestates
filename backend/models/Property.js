const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['residence', 'commercial', 'plot']
  },
  subType: {
    type: String,
    required: [true, 'Property sub-type is required']
  },
  listingType: {
    type: String,
    required: [true, 'Listing type is required'],
    enum: ['For Sale', 'For Rent']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  pricePeriod: {
    type: String,
    enum: ['per month', 'per year', 'per day', 'per week'],
    default: 'per month'
  },
  leaseTerm: {
    type: String,
    default: '6 months'
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  size: {
    type: String,
    required: [true, 'Property size is required']
  },
  bedrooms: {
    type: Number,
    min: [0, 'Bedrooms cannot be negative']
  },
  bathrooms: {
    type: Number,
    min: [0, 'Bathrooms cannot be negative']
  },
  furnishedStatus: {
    type: String,
    enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
  },
  parkingSpaces: {
    type: Number,
    min: [0, 'Parking spaces cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  media: [{
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    public_id: String
  }],
  // Additional Features
  swimmingPool: { type: Boolean, default: false },
  garden: { type: Boolean, default: false },
  securitySystem: { type: Boolean, default: false },
  internetWifi: { type: Boolean, default: false },
  airConditioning: { type: Boolean, default: false },
  waterHeater: { type: Boolean, default: false },
  kitchen: { type: Boolean, default: false },
  balconyTerrace: { type: Boolean, default: false },
  garageCarport: { type: Boolean, default: false },
  storageRoom: { type: Boolean, default: false },
  servantQuarters: { type: Boolean, default: false },
  spaceAvailability: { type: Boolean, default: false },
  loadingDocks: { type: Boolean, default: false },
  conferenceRooms: { type: Boolean, default: false },
  receptionArea: { type: Boolean, default: false },
  waterSupply: { type: Boolean, default: false },
  electricitySupply: { type: Boolean, default: false },
  sewerageSystem: { type: Boolean, default: false },
  fencing: { type: Boolean, default: false },
  security: { type: Boolean, default: false },
  streetLighting: { type: Boolean, default: false },
  roadAccess: { type: Boolean, default: false },
  
  // Commercial specific
  commercialType: {
    type: String,
    enum: ['Office', 'Shop', 'Warehouse', 'Restaurant', 'Hotel', 'Other']
  },
  
  // Plot specific
  plotType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Agricultural', 'Mixed Use']
  },
  plotSize: String,
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold', 'rented'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema); 