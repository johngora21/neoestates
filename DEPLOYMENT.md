# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. **Database Setup**
- [ ] Create MongoDB Atlas cluster
- [ ] Get connection string
- [ ] Test database connection

### 2. **File Storage**
- [ ] Create Cloudinary account
- [ ] Get cloud name, API key, secret
- [ ] Test file upload

### 3. **Environment Variables**
- [ ] Generate secure JWT secret
- [ ] Set up all backend environment variables
- [ ] Update frontend API URL

### 4. **Domain Configuration**
- [ ] Point domain to frontend hosting
- [ ] Set up API subdomain
- [ ] Configure CORS with your domain

## 🎯 Deployment Steps

### Backend (Railway/Render)
1. **Connect GitHub repo**
2. **Set environment variables:**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secure_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CORS_ORIGIN=https://yourdomain.com
   ```
3. **Deploy**

### Frontend (Vercel/Netlify)
1. **Connect GitHub repo**
2. **Set build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Update API URL in `src/services/api.js`**
4. **Deploy**

## 🔧 Post-Deployment

1. **Test all features:**
   - [ ] User registration
   - [ ] Property submission
   - [ ] Admin dashboard
   - [ ] File uploads
   - [ ] Property search

2. **Configure domain:**
   - [ ] Point www.yourdomain.com to frontend
   - [ ] Point api.yourdomain.com to backend
   - [ ] Update CORS settings

3. **SSL certificate:**
   - [ ] Verify HTTPS is working
   - [ ] Test all API calls

## 🚨 Common Issues

- **CORS errors:** Check CORS_ORIGIN matches your domain
- **Database connection:** Verify MongoDB Atlas IP whitelist
- **File uploads:** Check Cloudinary credentials
- **API calls:** Ensure frontend API URL is correct

## 📞 Need Help?

1. Check environment variables
2. Verify domain configuration
3. Test API endpoints
4. Check hosting provider logs 