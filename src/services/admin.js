import { adminAPI, usersAPI } from './api';

class AdminService {
  constructor() {
    this.dashboardData = null;
    this.pendingProperties = [];
    this.users = [];
    this.loading = false;
    this.error = null;
  }

  // Get dashboard analytics
  async getDashboardAnalytics() {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.getDashboard();
      this.dashboardData = response.data;
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get pending properties
  async getPendingProperties() {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.getPendingProperties();
      this.pendingProperties = response.data;
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Approve property
  async approveProperty(id) {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.approveProperty(id);
      
      // Remove from pending properties
      this.pendingProperties = this.pendingProperties.filter(p => p._id !== id);
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Reject property
  async rejectProperty(id, rejectionReason) {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.rejectProperty(id, rejectionReason);
      
      // Remove from pending properties
      this.pendingProperties = this.pendingProperties.filter(p => p._id !== id);
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get users by role
  async getUsersByRole(role) {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.getUsersByRole(role);
      this.users = response.data;
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await usersAPI.getAll();
      this.users = response.data;
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Create user
  async createUser(userData) {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await usersAPI.create(userData);
      
      // Add to users array
      this.users.push(response.data);
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Update user
  async updateUser(id, userData) {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await usersAPI.update(id, userData);
      
      // Update in users array
      const index = this.users.findIndex(u => u._id === id);
      if (index !== -1) {
        this.users[index] = response.data;
      }
      
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      this.loading = true;
      this.error = null;
      
      await usersAPI.delete(id);
      
      // Remove from users array
      this.users = this.users.filter(u => u._id !== id);
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get property statistics
  async getPropertyStats() {
    try {
      this.loading = true;
      this.error = null;
      
      const response = await adminAPI.getPropertyStats();
      return response.data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Helper methods
  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = null;
  }

  getDashboardData() {
    return this.dashboardData;
  }

  getPendingProperties() {
    return this.pendingProperties;
  }

  getUsers() {
    return this.users;
  }

  // Dashboard data helpers
  getOverviewStats() {
    return this.dashboardData?.overview || {};
  }

  getPropertyTypeStats() {
    return this.dashboardData?.propertyTypes || {};
  }

  getListingTypeStats() {
    return this.dashboardData?.listingTypes || {};
  }

  getUserRoleStats() {
    return this.dashboardData?.userRoles || {};
  }

  getRecentProperties() {
    return this.dashboardData?.recentProperties || [];
  }

  getTopViewedProperties() {
    return this.dashboardData?.topViewedProperties || [];
  }

  // User management helpers
  getUsersByRole(role) {
    return this.users.filter(user => user.role === role);
  }

  getAdmins() {
    return this.getUsersByRole('admin');
  }

  getAgents() {
    return this.getUsersByRole('agent');
  }

  getRegularUsers() {
    return this.getUsersByRole('user');
  }
}

export default new AdminService(); 