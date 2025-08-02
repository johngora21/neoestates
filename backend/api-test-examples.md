# Neo Estates API Test Examples

## Base URL: http://localhost:5000

## 🔐 Authentication Tests

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+255123456789"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User (with token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏠 Property Tests

### 4. Get All Properties
```bash
curl -X GET "http://localhost:5000/api/properties?page=1&limit=10"
```

### 5. Get Properties with Filters
```bash
curl -X GET "http://localhost:5000/api/properties?propertyType=residence&listingType=For Sale&price[gte]=1000000&page=1&limit=5"
```

### 6. Get Properties by Type
```bash
curl -X GET http://localhost:5000/api/properties/type/residence
```

### 7. Create Property (with token)
```bash
curl -X POST http://localhost:5000/api/properties \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beautiful Villa",
    "propertyType": "residence",
    "subType": "Villa",
    "listingType": "For Sale",
    "price": 25000000,
    "location": "Masaki, Dar es Salaam",
    "size": "250 sqm",
    "bedrooms": 4,
    "bathrooms": 3,
    "furnishedStatus": "Fully Furnished",
    "description": "Beautiful villa with modern amenities"
  }'
```

### 8. Get Single Property
```bash
curl -X GET http://localhost:5000/api/properties/PROPERTY_ID
```

### 9. Update Property (with token)
```bash
curl -X PUT http://localhost:5000/api/properties/PROPERTY_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 23000000,
    "description": "Updated description"
  }'
```

### 10. Toggle Favorite (with token)
```bash
curl -X PUT http://localhost:5000/api/properties/PROPERTY_ID/favorite \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 11. Get User's Properties (with token)
```bash
curl -X GET http://localhost:5000/api/properties/my-properties \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 12. Get User's Favorites (with token)
```bash
curl -X GET http://localhost:5000/api/properties/favorites \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📁 File Upload Tests

### 13. Upload Single File (with token)
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/image.jpg"
```

### 14. Upload Multiple Files (with token)
```bash
curl -X POST http://localhost:5000/api/upload/multiple \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "files=@/path/to/image1.jpg" \
  -F "files=@/path/to/image2.jpg"
```

## 👥 User Management Tests (Admin Only)

### 15. Get All Users (admin token)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

### 16. Create User (admin token)
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "password123",
    "phone": "+255123456789",
    "role": "user"
  }'
```

## 🧪 System Tests

### 17. Test API
```bash
curl -X GET http://localhost:5000/api/test
```

### 18. Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

## 📋 Response Examples

### Successful Response
```json
{
  "success": true,
  "data": {...},
  "count": 10,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔑 Getting JWT Token

After login, you'll receive a response like:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Use this token in the Authorization header for protected routes:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
``` 