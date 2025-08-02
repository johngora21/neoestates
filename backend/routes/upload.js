const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  uploadFile,
  deleteFile,
  uploadMultipleFiles
} = require('../controllers/upload');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// All routes require authentication
router.use(protect);

router.post('/', upload.single('file'), uploadFile);
router.post('/multiple', upload.array('files', 10), uploadMultipleFiles);
router.delete('/:public_id', deleteFile);

module.exports = router; 