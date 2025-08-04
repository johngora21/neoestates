const mongoose = require('mongoose');

const agentRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^(\+255|0)[1-9][0-9]{8}$/, 'Please enter a valid Tanzanian phone number']
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  instagram: {
    type: String,
    trim: true,
    maxlength: [50, 'Instagram username cannot exceed 50 characters']
  },
  facebook: {
    type: String,
    trim: true,
    maxlength: [50, 'Facebook username cannot exceed 50 characters']
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for wanting to become an agent'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  experience: {
    type: String,
    required: [true, 'Please describe your real estate experience'],
    maxlength: [300, 'Experience description cannot exceed 300 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: [200, 'Admin notes cannot exceed 200 characters']
  },
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
agentRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('AgentRequest', agentRequestSchema); 