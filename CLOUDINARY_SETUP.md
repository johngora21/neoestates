# 📁 Cloudinary Setup Guide

## 🚀 Quick Setup

### 1. **Create Cloudinary Account**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

### 2. **Get Your Credentials**
After signing up, you'll find your credentials in the Dashboard:

```
Cloud Name: your_cloud_name
API Key: your_api_key  
API Secret: your_api_secret
```

### 3. **Update Environment Variables**
Replace these in your backend environment variables:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. **Test Upload**
The backend is already configured to use Cloudinary for:
- Property images
- Property videos
- User profile pictures

## 🔧 Configuration Details

### Free Plan Limits:
- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** 25,000/month
- **Uploads:** 25,000/month

### Supported Formats:
- **Images:** JPG, PNG, GIF, WebP, AVIF
- **Videos:** MP4, MOV, AVI, WebM
- **Documents:** PDF (for property documents)

## 🛡️ Security Best Practices

1. **Use Environment Variables** - Never hardcode credentials
2. **Set Upload Presets** - Configure allowed file types
3. **Enable HTTPS** - All uploads use secure connections
4. **Set Upload Limits** - Configure max file sizes

## 📝 Usage in Your App

The backend automatically:
- Resizes images for optimal performance
- Generates thumbnails for property listings
- Stores original files for high-quality display
- Handles video uploads for property tours

## 🚨 Important Notes

- **Free tier is sufficient** for most real estate apps
- **Upgrade when needed** - Cloudinary scales with your needs
- **Backup strategy** - Consider backing up important files
- **CDN included** - Files are served from global CDN

## ✅ Ready to Use

Once you add your Cloudinary credentials to your environment variables, file uploads will work automatically in your Neo Estates application! 