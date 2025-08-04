const AgentRequest = require('../models/AgentRequest');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Submit agent request
// @route   POST /api/agent-requests
// @access  Public
const submitAgentRequest = asyncHandler(async (req, res, next) => {
  const { name, email, phone, reason, experience } = req.body;

  // Check if request already exists for this email
  const existingRequest = await AgentRequest.findOne({ email });
  if (existingRequest) {
    return res.status(400).json({
      success: false,
      message: 'An agent request already exists for this email'
    });
  }

  const agentRequest = await AgentRequest.create({
    name,
    email,
    phone,
    reason,
    experience
  });

  res.status(201).json({
    success: true,
    message: 'Agent request submitted successfully',
    data: agentRequest
  });
});

// @desc    Get all agent requests (admin only)
// @route   GET /api/agent-requests
// @access  Private (admin)
const getAllAgentRequests = asyncHandler(async (req, res, next) => {
  const requests = await AgentRequest.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests
  });
});

// @desc    Get agent request by ID
// @route   GET /api/agent-requests/:id
// @access  Private (admin)
const getAgentRequestById = asyncHandler(async (req, res, next) => {
  const request = await AgentRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: 'Agent request not found'
    });
  }

  res.status(200).json({
    success: true,
    data: request
  });
});

// @desc    Update agent request status (admin only)
// @route   PUT /api/agent-requests/:id
// @access  Private (admin)
const updateAgentRequest = asyncHandler(async (req, res, next) => {
  const { status, adminNotes } = req.body;

  const request = await AgentRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({
      success: false,
      message: 'Agent request not found'
    });
  }

  // If approving, create agent account
  if (status === 'approved' && request.status === 'pending') {
    // Generate a random password for the agent
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    
    // Create agent user account
    const agentUser = await User.create({
      name: request.name,
      email: request.email,
      phone: request.phone,
      password: password,
      role: 'agent'
    });

    // Update request with admin notes
    request.status = status;
    request.adminNotes = adminNotes || `Agent account created. Temporary password: ${password}`;
    await request.save();

    return res.status(200).json({
      success: true,
      message: 'Agent request approved and account created',
      data: {
        request,
        agentAccount: {
          email: agentUser.email,
          temporaryPassword: password
        }
      }
    });
  }

  // For other status updates
  request.status = status;
  if (adminNotes) {
    request.adminNotes = adminNotes;
  }
  await request.save();

  res.status(200).json({
    success: true,
    message: 'Agent request updated successfully',
    data: request
  });
});

// @desc    Delete agent request (admin only)
// @route   DELETE /api/agent-requests/:id
// @access  Private (admin)
const deleteAgentRequest = asyncHandler(async (req, res, next) => {
  const request = await AgentRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: 'Agent request not found'
    });
  }

  await request.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Agent request deleted successfully'
  });
});

module.exports = {
  submitAgentRequest,
  getAllAgentRequests,
  getAgentRequestById,
  updateAgentRequest,
  deleteAgentRequest
}; 