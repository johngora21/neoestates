const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload file
// @route   POST /api/upload
// @access  Private
const uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/mov', 'video/avi'];
  
  if (!allowedTypes.includes(req.file.mimetype)) {
    return next(new ErrorResponse('Please upload a valid image or video file', 400));
  }

  // Check file size (10MB max)
  if (req.file.size > 10 * 1024 * 1024) {
    return next(new ErrorResponse('File size too large. Maximum size is 10MB', 400));
  }

  try {
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'neo-estates',
      use_filename: true,
      unique_filename: true,
      resource_type: 'auto'
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        type: req.file.mimetype.startsWith('image/') ? 'image' : 'video'
      }
    });
  } catch (error) {
    return next(new ErrorResponse('Error uploading file', 500));
  }
});

// @desc    Delete file
// @route   DELETE /api/upload/:public_id
// @access  Private
const deleteFile = asyncHandler(async (req, res, next) => {
  const { public_id } = req.params;

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      return next(new ErrorResponse('Error deleting file', 500));
    }
  } catch (error) {
    return next(new ErrorResponse('Error deleting file', 500));
  }
});

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleFiles = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse('Please upload files', 400));
  }

  const uploadPromises = req.files.map(async (file) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/mov', 'video/avi'];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size too large');
    }

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'neo-estates',
        use_filename: true,
        unique_filename: true,
        resource_type: 'auto'
      });

      return {
        url: result.secure_url,
        public_id: result.public_id,
        type: file.mimetype.startsWith('image/') ? 'image' : 'video'
      };
    } catch (error) {
      throw new Error('Upload failed');
    }
  });

  try {
    const results = await Promise.all(uploadPromises);
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    return next(new ErrorResponse('Error uploading files', 500));
  }
});

module.exports = {
  uploadFile,
  deleteFile,
  uploadMultipleFiles
}; 