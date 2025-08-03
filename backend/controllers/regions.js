const tanzaniaRegions = require('../utils/tanzaniaRegions');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all Tanzania regions
// @route   GET /api/regions
// @access  Public
const getRegions = asyncHandler(async (req, res, next) => {
  const regions = tanzaniaRegions.map(region => ({
    name: region.name,
    districts: region.districts
  }));

  res.status(200).json({
    success: true,
    count: regions.length,
    data: regions
  });
});

// @desc    Get districts by region
// @route   GET /api/regions/:region/districts
// @access  Public
const getDistrictsByRegion = asyncHandler(async (req, res, next) => {
  const { region } = req.params;
  
  const regionData = tanzaniaRegions.find(r => 
    r.name.toLowerCase() === region.toLowerCase()
  );

  if (!regionData) {
    return res.status(404).json({
      success: false,
      message: 'Region not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      region: regionData.name,
      districts: regionData.districts
    }
  });
});

// @desc    Search regions and districts
// @route   GET /api/regions/search
// @access  Public
const searchRegions = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  const searchTerm = q.toLowerCase();
  const results = [];

  tanzaniaRegions.forEach(region => {
    // Check if region name matches
    if (region.name.toLowerCase().includes(searchTerm)) {
      results.push({
        type: 'region',
        name: region.name,
        districts: region.districts
      });
    }

    // Check if any district matches
    region.districts.forEach(district => {
      if (district.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'district',
          name: district,
          region: region.name
        });
      }
    });
  });

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

module.exports = {
  getRegions,
  getDistrictsByRegion,
  searchRegions
}; 