// API base URL - will use production URL when deployed
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api'  // Replace with your backend domain
  : 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('/auth/me'),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
};

// Properties API
export const propertiesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/properties?${queryString}`);
  },
  
  getFiltered: (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/properties/filter?${queryString}`);
  },
  
  getByType: (type) => apiRequest(`/properties/type/${type}`),
  
  getById: (id) => apiRequest(`/properties/${id}`),
  
  create: (propertyData) => apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(propertyData),
  }),
  
  update: (id, propertyData) => apiRequest(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(propertyData),
  }),
  
  delete: (id) => apiRequest(`/properties/${id}`, {
    method: 'DELETE',
  }),
  
  getMyProperties: () => apiRequest('/properties/my-properties'),
  
  toggleFavorite: (id) => apiRequest(`/properties/${id}/favorite`, {
    method: 'PUT',
  }),
  
  getFavorites: () => apiRequest('/properties/favorites'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => apiRequest('/admin/dashboard'),
  
  getPendingProperties: () => apiRequest('/admin/pending-properties'),
  
  approveProperty: (id) => apiRequest(`/admin/properties/${id}/approve`, {
    method: 'PUT',
  }),
  
  rejectProperty: (id) => apiRequest(`/admin/properties/${id}/reject`, {
    method: 'PUT',
  }),
  
  getUsersByRole: (role) => apiRequest(`/admin/users/${role}`),
  
  getPropertyStats: () => apiRequest('/admin/property-stats'),
};

// Agent Requests API
export const agentRequestsAPI = {
  submit: (requestData) => apiRequest('/agent-requests', {
    method: 'POST',
    body: JSON.stringify(requestData),
  }),
  
  getAll: () => apiRequest('/agent-requests'),
  
  getById: (id) => apiRequest(`/agent-requests/${id}`),
  
  update: (id, updateData) => apiRequest(`/agent-requests/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  }),
  
  delete: (id) => apiRequest(`/agent-requests/${id}`, {
    method: 'DELETE',
  }),
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  
  getById: (id) => apiRequest(`/users/${id}`),
  
  create: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  update: (id, userData) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  delete: (id) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Regions API
export const regionsAPI = {
  getAll: () => apiRequest('/regions'),
  
  getDistrictsByRegion: (region) => apiRequest(`/regions/${region}/districts`),
  
  search: (query) => apiRequest(`/regions/search?q=${encodeURIComponent(query)}`),
};

// Upload API
export const uploadAPI = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(res => res.json());
  },
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health'),
};

export default {
  auth: authAPI,
  properties: propertiesAPI,
  admin: adminAPI,
  users: usersAPI,
  regions: regionsAPI,
  upload: uploadAPI,
  health: healthAPI,
}; 