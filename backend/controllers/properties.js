const Property = require('../models/Property');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Property.find(JSON.parse(queryStr)).populate('owner', 'name email');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Property.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const properties = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: properties.length,
    pagination,
    data: properties
  });
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id).populate('owner', 'name email');

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Increment views
  property.views += 1;
  await property.save();

  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
const createProperty = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id;

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    data: property
  });
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = asyncHandler(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is property owner or admin
  if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this property`, 401));
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is property owner or admin
  if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this property`, 401));
  }

  await property.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get properties by owner
// @route   GET /api/properties/my-properties
// @access  Private
const getMyProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ owner: req.user.id });

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Add/Remove property to favorites
// @route   PUT /api/properties/:id/favorite
// @access  Private
const toggleFavorite = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  const isFavorited = property.favorites.includes(req.user.id);

  if (isFavorited) {
    // Remove from favorites
    property.favorites = property.favorites.filter(
      id => id.toString() !== req.user.id
    );
  } else {
    // Add to favorites
    property.favorites.push(req.user.id);
  }

  await property.save();

  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Get user favorites
// @route   GET /api/properties/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({
    favorites: req.user.id
  }).populate('owner', 'name email');

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Get properties by type
// @route   GET /api/properties/type/:type
// @access  Public
const getPropertiesByType = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({
    propertyType: req.params.type,
    status: 'approved'
  }).populate('owner', 'name email');

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Get filtered properties
// @route   GET /api/properties/filter
// @access  Public
const getFilteredProperties = asyncHandler(async (req, res, next) => {
  const {
    propertyType,
    listingType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    furnishedStatus,
    location,
    page = 1,
    limit = 10
  } = req.query;

  // Build filter object
  const filter = { status: 'approved' };

  if (propertyType) {
    filter.propertyType = propertyType;
  }

  if (listingType) {
    filter.listingType = listingType;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseInt(minPrice);
    if (maxPrice) filter.price.$lte = parseInt(maxPrice);
  }

  if (bedrooms) {
    filter.bedrooms = { $gte: parseInt(bedrooms) };
  }

  if (bathrooms) {
    filter.bathrooms = { $gte: parseInt(bathrooms) };
  }

  if (furnishedStatus) {
    filter.furnishedStatus = furnishedStatus;
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Property.countDocuments(filter);

  const properties = await Property.find(filter)
    .populate('owner', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: properties.length,
    total,
    pagination: {
      current: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      hasNext: skip + properties.length < total,
      hasPrev: parseInt(page) > 1
    },
    data: properties
  });
});

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  toggleFavorite,
  getFavorites,
  getPropertiesByType,
  getFilteredProperties
}; 