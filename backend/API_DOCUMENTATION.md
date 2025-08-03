# Neo Estates API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication Routes
**Base: `/auth`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | Logout user | Private |
| POST | `/forgotpassword` | Forgot password | Public |
| PUT | `/resetpassword/:resettoken` | Reset password | Public |

### Properties Routes
**Base: `/properties`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all properties | Public |
| GET | `/filter` | Get filtered properties | Public |
| GET | `/type/:type` | Get properties by type | Public |
| GET | `/:id` | Get single property | Public |
| POST | `/` | Create property | Private |
| PUT | `/:id` | Update property | Private |
| DELETE | `/:id` | Delete property | Private |
| GET | `/my-properties` | Get user's properties | Private |
| PUT | `/:id/favorite` | Toggle favorite | Private |
| GET | `/favorites` | Get user favorites | Private |

### Users Routes
**Base: `/users`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get single user | Admin |
| POST | `/` | Create user | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user | Admin |

### Admin Routes
**Base: `/admin`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/dashboard` | Get dashboard analytics | Admin |
| GET | `/pending-properties` | Get pending properties | Admin |
| PUT | `/properties/:id/approve` | Approve property | Admin |
| PUT | `/properties/:id/reject` | Reject property | Admin |
| GET | `/users/:role` | Get users by role | Admin |
| GET | `/property-stats` | Get property statistics | Admin |

### Regions Routes
**Base: `/regions`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all regions | Public |
| GET | `/search` | Search regions/districts | Public |
| GET | `/:region/districts` | Get districts by region | Public |

### Upload Routes
**Base: `/upload`**

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Upload file | Private |

## Request/Response Examples

### Property Filtering
```
GET /api/properties/filter?propertyType=residence&listingType=For Sale&minPrice=100000&maxPrice=500000&bedrooms=2&location=Dar es Salaam
```

Response:
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "pagination": {
    "current": 1,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [...]
}
```

### Admin Dashboard
```
GET /api/admin/dashboard
```

Response:
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 156,
      "totalProperties": 89,
      "pendingProperties": 12,
      "approvedProperties": 67,
      "rejectedProperties": 10
    },
    "propertyTypes": {
      "residential": 45,
      "commercial": 30,
      "plots": 14
    },
    "listingTypes": {
      "forSale": 60,
      "forRent": 29
    },
    "userRoles": {
      "admins": 3,
      "agents": 15,
      "users": 138
    },
    "recentProperties": [...],
    "topViewedProperties": [...]
  }
}
```

### Property Approval
```
PUT /api/admin/properties/64f8a1b2c3d4e5f6a7b8c9d0/approve
```

Response:
```json
{
  "success": true,
  "message": "Property approved successfully",
  "data": {...}
}
```

### Property Rejection
```
PUT /api/admin/properties/64f8a1b2c3d4e5f6a7b8c9d0/reject
Content-Type: application/json

{
  "rejectionReason": "Low quality photos and incomplete information"
}
```

Response:
```json
{
  "success": true,
  "message": "Property rejected successfully",
  "data": {...}
}
```

## Property Model Schema

```javascript
{
  owner: ObjectId,           // User reference
  title: String,             // Required
  propertyType: String,      // 'residence', 'commercial', 'plot'
  subType: String,           // Required
  listingType: String,       // 'For Sale', 'For Rent'
  price: Number,             // Required
  pricePeriod: String,       // 'per month', 'per year', etc.
  leaseTerm: String,         // '6 months', '1 year', etc.
  location: String,          // Required
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  size: String,              // Required
  bedrooms: Number,
  bathrooms: Number,
  furnishedStatus: String,   // 'Fully Furnished', 'Semi Furnished', 'Unfurnished'
  parkingSpaces: Number,
  description: String,       // Required
  media: [{
    type: String,            // 'image', 'video'
    url: String,
    public_id: String
  }],
  // Additional Features (Boolean)
  swimmingPool: Boolean,
  garden: Boolean,
  securitySystem: Boolean,
  internetWifi: Boolean,
  airConditioning: Boolean,
  waterHeater: Boolean,
  kitchen: Boolean,
  balconyTerrace: Boolean,
  garageCarport: Boolean,
  storageRoom: Boolean,
  servantQuarters: Boolean,
  spaceAvailability: Boolean,
  loadingDocks: Boolean,
  conferenceRooms: Boolean,
  receptionArea: Boolean,
  waterSupply: Boolean,
  electricitySupply: Boolean,
  sewerageSystem: Boolean,
  fencing: Boolean,
  security: Boolean,
  streetLighting: Boolean,
  roadAccess: Boolean,
  // Commercial specific
  commercialType: String,    // 'Office', 'Shop', 'Warehouse', etc.
  // Plot specific
  plotType: String,          // 'Residential', 'Commercial', 'Agricultural', 'Mixed Use'
  plotSize: String,
  status: String,            // 'pending', 'approved', 'rejected', 'sold', 'rented'
  rejectionReason: String,
  views: Number,
  favorites: [ObjectId],     // User references
  createdAt: Date,
  updatedAt: Date
}
```

## User Model Schema

```javascript
{
  name: String,              // Required
  email: String,             // Required, unique
  password: String,          // Required, hashed
  phone: String,             // Required
  role: String,              // 'user', 'admin', 'agent'
  avatar: {
    public_id: String,
    url: String
  },
  isVerified: Boolean,
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date
}
```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error 