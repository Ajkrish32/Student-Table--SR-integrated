import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout, getPendingStaff, getApprovedStaff, approveUser, rejectUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const pendingStaff = getPendingStaff();
  const approvedStaff = getApprovedStaff();

  const handleApprove = (staffId) => {
    approveUser(staffId, 'admin');
    alert('Staff approved successfully!');
  };

  const handleReject = (staffId) => {
    rejectUser(staffId);
    alert('Staff rejected successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span className="user-name">Welcome, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-sections">
          <section className="dashboard-section">
            <h2>Manage Staff</h2>

            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Approval ({pendingStaff.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                Approved Staff ({approvedStaff.length})
              </button>
            </div>

            {activeTab === 'pending' && (
              <div className="staff-list">
                {pendingStaff.length === 0 ? (
                  <p className="empty-message">No pending staff approvals</p>
                ) : (
                  pendingStaff.map(staff => (
                    <div key={staff.id} className="staff-card">
                      <div className="staff-info">
                        <h3>{staff.name}</h3>
                        <p><strong>Email:</strong> {staff.email}</p>
                        <p><strong>Registered:</strong> {new Date(staff.createdAt).toLocaleDateString()}</p>
                        <p className="status-badge pending">Pending Approval</p>
                      </div>
                      <div className="staff-actions">
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(staff.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleReject(staff.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'approved' && (
              <div className="staff-list">
                {approvedStaff.length === 0 ? (
                  <p className="empty-message">No approved staff yet</p>
                ) : (
                  approvedStaff.map(staff => (
                    <div key={staff.id} className="staff-card">
                      <div className="staff-info">
                        <h3>{staff.name}</h3>
                        <p><strong>Email:</strong> {staff.email}</p>
                        <p><strong>Approved:</strong> {new Date(staff.approvedAt).toLocaleDateString()}</p>
                        <p className="status-badge approved">Approved</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
