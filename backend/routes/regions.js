const express = require('express');
const {
  getRegions,
  getDistrictsByRegion,
  searchRegions
} = require('../controllers/regions');

const router = express.Router();

// Public routes - order matters!
router.get('/search', searchRegions); // Must come before /:region
router.get('/', getRegions);
router.get('/region/:regionName/districts', getDistrictsByRegion);

module.exports = router; 