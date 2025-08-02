# Neo Estates Backend API

A scalable REST API backend for the Neo Estates real estate platform built with Node.js, Express.js, and MongoDB.

## 🏗️ Architecture

```
backend/
├── config/          # Database & app configuration
├── controllers/     # Business logic handlers
├── middleware/      # Authentication & validation
├── models/          # Database schemas
├── routes/          # API endpoints
├── utils/           # Helper functions
├── server.js        # Main application entry
└── package.json     # Dependencies
```

## 🚀 Features

- **Authentication & Authorization** - JWT-based authentication with role-based access
- **Property Management** - Full CRUD operations for real estate listings
- **File Upload** - Image and video upload with Cloudinary integration
- **Advanced Filtering** - Search, filter, and pagination for properties
- **User Management** - User registration, profiles, and favorites
- **Error Handling** - Centralized error handling with proper HTTP status codes
- **Security** - Password hashing, input validation, and CORS protection

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for file uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/neo-estates

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Properties
- `GET /api/properties` - Get all properties (with filtering)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/my-properties` - Get user's properties
- `PUT /api/properties/:id/favorite` - Toggle property favorite
- `GET /api/properties/favorites` - Get user's favorites
- `GET /api/properties/type/:type` - Get properties by type

### File Upload
- `POST /api/upload` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:public_id` - Delete file

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Models

### User Model
- Name, email, password, phone
- Role-based access (user, admin, agent)
- Avatar and verification status
- Password reset functionality

### Property Model
- Owner reference
- Property type (residence, commercial, plot)
- Detailed property information
- Media files (images/videos)
- Additional features and amenities
- Status tracking and views
- Favorites system

## 🛡️ Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Stateless authentication with tokens
- **Role-based Authorization** - Different access levels for users
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Cross-origin resource sharing configuration
- **File Upload Security** - File type and size validation

## 📈 Scalability Features

- **Modular Architecture** - Separated concerns for easy maintenance
- **Async/Await** - Non-blocking operations
- **Error Handling** - Centralized error management
- **Pagination** - Efficient data loading
- **Filtering & Sorting** - Advanced query capabilities
- **File Optimization** - Cloudinary integration for media handling

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📝 API Documentation

The API follows RESTful principles with consistent response formats:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "count": 10,
  "pagination": {...}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🚀 Deployment

1. **Environment Setup** - Configure production environment variables
2. **Database** - Set up MongoDB connection
3. **File Storage** - Configure Cloudinary credentials
4. **SSL Certificate** - For HTTPS in production
5. **PM2** - Process manager for Node.js applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team. 