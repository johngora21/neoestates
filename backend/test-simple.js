const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Simple test server is working!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Simple test server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/api/test`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
}); 