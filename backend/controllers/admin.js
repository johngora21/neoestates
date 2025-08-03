const User = require('../models/User');
const Property = require('../models/Property');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get admin dashboard analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardAnalytics = asyncHandler(async (req, res, next) => {
  // Get total counts
  const totalUsers = await User.countDocuments();
  const totalProperties = await Property.countDocuments();
  const pendingProperties = await Property.countDocuments({ status: 'pending' });
  const approvedProperties = await Property.countDocuments({ status: 'approved' });
  const rejectedProperties = await Property.countDocuments({ status: 'rejected' });

  // Get properties by type
  const residentialProperties = await Property.countDocuments({ 
    propertyType: 'residence', 
    status: 'approved' 
  });
  const commercialProperties = await Property.countDocuments({ 
    propertyType: 'commercial', 
    status: 'approved' 
  });
  const plotProperties = await Property.countDocuments({ 
    propertyType: 'plot', 
    status: 'approved' 
  });

  // Get properties by listing type
  const forSaleProperties = await Property.countDocuments({ 
    listingType: 'For Sale', 
    status: 'approved' 
  });
  const forRentProperties = await Property.countDocuments({ 
    listingType: 'For Rent', 
    status: 'approved' 
  });

  // Get users by role
  const adminUsers = await User.countDocuments({ role: 'admin' });
  const agentUsers = await User.countDocuments({ role: 'agent' });
  const regularUsers = await User.countDocuments({ role: 'user' });

  // Get recent properties
  const recentProperties = await Property.find()
    .populate('owner', 'name email')
    .sort('-createdAt')
    .limit(5);

  // Get top viewed properties
  const topViewedProperties = await Property.find({ status: 'approved' })
    .populate('owner', 'name email')
    .sort('-views')
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalUsers,
        totalProperties,
        pendingProperties,
        approvedProperties,
        rejectedProperties
      },
      propertyTypes: {
        residential: residentialProperties,
        commercial: commercialProperties,
        plots: plotProperties
      },
      listingTypes: {
        forSale: forSaleProperties,
        forRent: forRentProperties
      },
      userRoles: {
        admins: adminUsers,
        agents: agentUsers,
        users: regularUsers
      },
      recentProperties,
      topViewedProperties
    }
  });
});

// @desc    Get pending properties for admin review
// @route   GET /api/admin/pending-properties
// @access  Private/Admin
const getPendingProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ status: 'pending' })
    .populate('owner', 'name email phone')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Approve property
// @route   PUT /api/admin/properties/:id/approve
// @access  Private/Admin
const approveProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  if (property.status !== 'pending') {
    return next(new ErrorResponse(`Property is not pending for approval`, 400));
  }

  property.status = 'approved';
  await property.save();

  res.status(200).json({
    success: true,
    message: 'Property approved successfully',
    data: property
  });
});

// @desc    Reject property
// @route   PUT /api/admin/properties/:id/reject
// @access  Private/Admin
const rejectProperty = asyncHandler(async (req, res, next) => {
  const { rejectionReason } = req.body;

  if (!rejectionReason) {
    return next(new ErrorResponse('Rejection reason is required', 400));
  }

  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  if (property.status !== 'pending') {
    return next(new ErrorResponse(`Property is not pending for approval`, 400));
  }

  property.status = 'rejected';
  property.rejectionReason = rejectionReason;
  await property.save();

  res.status(200).json({
    success: true,
    message: 'Property rejected successfully',
    data: property
  });
});

// @desc    Get users by role
// @route   GET /api/admin/users/:role
// @access  Private/Admin
const getUsersByRole = asyncHandler(async (req, res, next) => {
  const { role } = req.params;
  
  if (!['admin', 'agent', 'user'].includes(role)) {
    return next(new ErrorResponse('Invalid role specified', 400));
  }

  const users = await User.find({ role }).select('-password');

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get property statistics
// @route   GET /api/admin/property-stats
// @access  Private/Admin
const getPropertyStats = asyncHandler(async (req, res, next) => {
  const stats = await Property.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const propertyTypeStats = await Property.aggregate([
    {
      $group: {
        _id: '$propertyType',
        count: { $sum: 1 }
      }
    }
  ]);

  const listingTypeStats = await Property.aggregate([
    {
      $group: {
        _id: '$listingType',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      statusStats: stats,
      propertyTypeStats,
      listingTypeStats
    }
  });
});

module.exports = {
  getDashboardAnalytics,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getUsersByRole,
  getPropertyStats
}; 