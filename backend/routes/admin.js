const express = require('express');
const {
  getDashboardAnalytics,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getUsersByRole,
  getPropertyStats
} = require('../controllers/admin');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);
router.use(authorize('admin'));

// Dashboard analytics
router.get('/dashboard', getDashboardAnalytics);

// Property management
router.get('/pending-properties', getPendingProperties);
router.put('/properties/:id/approve', approveProperty);
router.put('/properties/:id/reject', rejectProperty);

// User management
router.get('/users/:role', getUsersByRole);

// Statistics
router.get('/property-stats', getPropertyStats);

module.exports = router; 