import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, CheckCircle, X, Clock, Eye } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { agentRequestsAPI } from '../services/api';

const AdminAgentRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAgentRequests();
  }, []);

  const fetchAgentRequests = async () => {
    try {
      const data = await agentRequestsAPI.getAll();
      setRequests(data.data || []);
    } catch (error) {
      console.error('Error fetching agent requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status, adminNotes = '') => {
    try {
      const updatedData = await agentRequestsAPI.update(requestId, { status, adminNotes });
      setRequests(prev => 
        prev.map(req => 
          req._id === requestId ? updatedData.data : req
        )
      );
      setShowModal(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'var(--warning)';
      case 'approved': return 'var(--success)';
      case 'rejected': return 'var(--error)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <X size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <button
              className="action-btn"
              onClick={() => setShowSidebar(true)}
            >
              <ArrowLeft size={18} />
            </button>
            <div className="header-title">
              <span>Agent Requests</span>
            </div>
            <div className="header-actions">
              <button className="action-btn">
                <UserPlus size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}>
            <div>Loading...</div>
          </div>
        </main>

        <Sidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)}
          userRole={user?.role}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <button
            className="action-btn"
            onClick={() => setShowSidebar(true)}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="header-title">
            <span>Agent Requests</span>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <UserPlus size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Agent Requests Management
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Review and manage agent applications. Approve or reject requests and create agent accounts.
            </p>
          </div>

          {requests.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <UserPlus size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>No Agent Requests</h3>
              <p>No pending agent requests at the moment.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {requests.map((request) => (
                <div key={request._id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        {request.name}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {request.email} • {request.phone}
                      </p>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {request.region}, {request.district}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: getStatusColor(request.status)
                      }}>
                        {getStatusIcon(request.status)}
                        <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowModal(true);
                      }}
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Reason:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {request.reason}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Experience:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {request.experience}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal for request details */}
      {showModal && selectedRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: 'var(--text-primary)' }}>Request Details</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {selectedRequest.name}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {selectedRequest.email} • {selectedRequest.phone}
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {selectedRequest.region}, {selectedRequest.district}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: getStatusColor(selectedRequest.status)
              }}>
                {getStatusIcon(selectedRequest.status)}
                <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            {(selectedRequest.instagram || selectedRequest.facebook) && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Social Media:</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {selectedRequest.instagram && (
                    <span style={{ 
                      background: 'var(--bg-light)', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      Instagram: {selectedRequest.instagram}
                    </span>
                  )}
                  {selectedRequest.facebook && (
                    <span style={{ 
                      background: 'var(--bg-light)', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      Facebook: {selectedRequest.facebook}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Reason:</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {selectedRequest.reason}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Experience:</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {selectedRequest.experience}
              </p>
            </div>

            {selectedRequest.adminNotes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Admin Notes:</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedRequest.adminNotes}
                </p>
              </div>
            )}

            {selectedRequest.status === 'pending' && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  onClick={() => handleStatusUpdate(selectedRequest._id, 'approved')}
                  style={{
                    background: 'var(--success)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Approve & Create Account
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedRequest._id, 'rejected')}
                  style={{
                    background: 'var(--error)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)}
        userRole={user?.role}
      />
    </div>
  );
};

export default AdminAgentRequests; 