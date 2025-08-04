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

### 5. **Admin Setup** ⭐ **NEW**
- [ ] Create admin user with your credentials
- [ ] Test admin login
- [ ] Verify admin dashboard access

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
4. **Set up admin user:**
   ```bash
   # After deployment, run this command with your credentials
   npm run admin:create "Your Name" "your-email@domain.com" "your-secure-password" "+255123456789"
   ```

### Frontend (Vercel/Netlify)
1. **Connect GitHub repo**
2. **Set build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Update API URL in `src/services/api.js`**
4. **Deploy**

## 🔧 Post-Deployment

### 1. **Set Up Admin User**
```bash
# Connect to your deployed backend and run:
npm run admin:create "Your Name" "admin@yourdomain.com" "your-secure-password" "+255123456789"

# Or update existing admin:
npm run admin:update "Your Name" "new-email@domain.com" "new-password" "+255123456789"

# Check admin info:
npm run admin:info
```

### 2. **Test all features:**
- [ ] **Admin login** with your credentials
- [ ] **User registration** and login
- [ ] **Property submission** and approval
- [ ] **Admin dashboard** functionality
- [ ] **File uploads** (images/videos)
- [ ] **Property search** and filtering

### 3. **Configure domain:**
- [ ] Point www.yourdomain.com to frontend
- [ ] Point api.yourdomain.com to backend
- [ ] Update CORS settings

### 4. **SSL certificate:**
- [ ] Verify HTTPS is working
- [ ] Test all API calls

## 🚨 Common Issues

- **CORS errors:** Check CORS_ORIGIN matches your domain
- **Database connection:** Verify MongoDB Atlas IP whitelist
- **File uploads:** Check Cloudinary credentials
- **API calls:** Ensure frontend API URL is correct
- **Admin access:** Make sure admin user is created with correct credentials

## 📞 Need Help?

1. Check environment variables
2. Verify domain configuration
3. Test API endpoints
4. Check hosting provider logs
5. **Verify admin credentials** - most common issue!

## 🔐 Admin Credentials Setup

**After deployment, you MUST create your admin user:**

```bash
# Method 1: Using npm script
npm run admin:create "Your Name" "admin@yourdomain.com" "your-password" "+255123456789"

# Method 2: Direct command
node utils/admin-setup.js create "Your Name" "admin@yourdomain.com" "your-password" "+255123456789"
```

**Default admin from seeder (for testing only):**
- Email: `admin@neoestates.com`
- Password: `password123`
- **⚠️ Change these immediately after deployment!** 