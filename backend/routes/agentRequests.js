const express = require('express');
const {
  submitAgentRequest,
  getAllAgentRequests,
  getAgentRequestById,
  updateAgentRequest,
  deleteAgentRequest
} = require('../controllers/agentRequests');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route - anyone can submit an agent request
router.post('/', submitAgentRequest);

// Admin routes - only admins can access these
router.get('/', protect, authorize('admin'), getAllAgentRequests);
router.get('/:id', protect, authorize('admin'), getAgentRequestById);
router.put('/:id', protect, authorize('admin'), updateAgentRequest);
router.delete('/:id', protect, authorize('admin'), deleteAgentRequest);

module.exports = router; 