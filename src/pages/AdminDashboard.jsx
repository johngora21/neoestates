import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Building2, Clock, CheckCircle, XCircle, TrendingUp, Eye } from 'lucide-react';
import adminService from '../services/admin';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await adminService.getDashboardAnalytics();
      setDashboardData(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { overview, propertyTypes, listingTypes, userRoles, recentProperties, topViewedProperties } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <button
            className="action-btn"
            onClick={() => navigate(-1)}
            style={{ marginRight: '1rem' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="logo">
            <span>Analytics Dashboard</span>
          </div>
          <div className="header-actions">
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{overview.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{overview.totalProperties}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600">{overview.pendingProperties}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{overview.approvedProperties}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Property Types & Listing Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Residential</span>
                <span className="font-semibold text-gray-900">{propertyTypes.residential}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Commercial</span>
                <span className="font-semibold text-gray-900">{propertyTypes.commercial}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Plots</span>
                <span className="font-semibold text-gray-900">{propertyTypes.plots}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Listing Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">For Sale</span>
                <span className="font-semibold text-gray-900">{listingTypes.forSale}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">For Rent</span>
                <span className="font-semibold text-gray-900">{listingTypes.forRent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Roles & Recent Properties */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Admins</span>
                <span className="font-semibold text-gray-900">{userRoles.admins}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Agents</span>
                <span className="font-semibold text-gray-900">{userRoles.agents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Users</span>
                <span className="font-semibold text-gray-900">{userRoles.users}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
            <div className="space-y-3">
              {recentProperties.slice(0, 3).map((property) => (
                <div key={property._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.owner?.name}</p>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Viewed Properties */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Viewed Properties</h3>
          <div className="space-y-3">
            {topViewedProperties.map((property) => (
              <div key={property._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.owner?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">{property.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/admin/pending-properties')}
            className="flex items-center justify-center gap-3 p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            <Clock className="h-5 w-5" />
            <span className="font-medium">Review Pending Properties</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/users')}
            className="flex items-center justify-center gap-3 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Manage Users</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 