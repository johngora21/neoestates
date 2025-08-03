const express = require('express');
const {
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
} = require('../controllers/properties');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/filter', getFilteredProperties);
router.get('/type/:type', getPropertiesByType);
router.get('/:id', getProperty);

// Protected routes
router.use(protect);

router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.get('/my-properties', getMyProperties);
router.put('/:id/favorite', toggleFavorite);
router.get('/favorites', getFavorites);

module.exports = router; 