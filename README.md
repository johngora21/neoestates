# Neo Estates - Real Estate Platform

A modern real estate platform built with React.js frontend and Node.js/Express backend with MongoDB database.

## 🚀 Deployment Guide

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Cloudinary account
- Domain name
- Hosting provider (Vercel/Netlify for frontend, Railway/Render for backend)

### 1. Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free cluster
   - Get connection string

2. **Update Environment Variables:**
   ```bash
   # In backend/.env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neo-estates
   ```

### 2. File Storage Setup (Cloudinary)

1. **Create Cloudinary Account:**
   - Go to [Cloudinary](https://cloudinary.com)
   - Get cloud name, API key, and secret

2. **Update Environment Variables:**
   ```bash
   # In backend/.env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### 3. Backend Deployment

**Option A: Railway (Recommended)**
1. Connect GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

**Option B: Render**
1. Connect GitHub repo to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

**Environment Variables for Backend:**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

### 4. Frontend Deployment

**Option A: Vercel (Recommended)**
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

**Option B: Netlify**
1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

**Update API URL:**
```javascript
// In src/services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api'  // Your backend URL
  : 'http://localhost:5000/api';
```

### 5. Domain Configuration

1. **Point Domain to Frontend:**
   - Add CNAME record pointing to your frontend hosting
   - Example: `www.yourdomain.com` → `your-app.vercel.app`

2. **Point Subdomain to Backend:**
   - Add CNAME record for API subdomain
   - Example: `api.yourdomain.com` → `your-backend.railway.app`

3. **Update CORS Settings:**
   ```bash
   # In backend environment
   CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
   ```

### 6. SSL Certificate

- **Vercel/Netlify:** Automatic SSL
- **Railway/Render:** Automatic SSL
- **Custom Domain:** Configure in hosting provider

### 7. Final Configuration

1. **Update Frontend API URL:**
   ```javascript
   // Replace in src/services/api.js
   const API_BASE_URL = 'https://api.yourdomain.com/api';
   ```

2. **Test All Features:**
   - User registration/login
   - Property submission
   - Admin dashboard
   - File uploads
   - Property search

### 8. Monitoring & Maintenance

1. **Set up monitoring:**
   - Railway/Render dashboard
   - MongoDB Atlas monitoring
   - Error tracking (Sentry)

2. **Regular backups:**
   - MongoDB Atlas automated backups
   - Database exports

## 🛠️ Development

```bash
# Install dependencies
npm install
cd backend && npm install

# Start development servers
npm run dev          # Frontend
cd backend && npm run dev  # Backend
```

## 📁 Project Structure

```
neo-estates/
├── src/                 # Frontend React app
├── backend/            # Node.js/Express API
├── public/            # Static assets
└── README.md          # This file
```

## 🔧 Environment Variables

See `backend/env.example` and `backend/env.production.example` for all required environment variables.

## 📞 Support

For deployment issues, check:
1. Environment variables are set correctly
2. CORS configuration matches your domain
3. MongoDB connection string is valid
4. Cloudinary credentials are correct
