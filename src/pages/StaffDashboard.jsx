import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { exportToExcel } from '../utils/excelExport';
import './Dashboard.css';

const StaffDashboard = () => {
  const { user, logout, getPendingStudents, getApprovedStudents, approveUser, rejectUser, verifyStudentData, updateStudentDataByStaff, deleteStudent } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState(null);

  if (!user || user.role !== 'staff') {
    navigate('/login');
    return null;
  }

  const pendingStudents = getPendingStudents();
  const approvedStudents = getApprovedStudents();

  const handleApprove = (studentId) => {
    approveUser(studentId, 'staff');
    alert('Student approved successfully!');
  };

  const handleReject = (studentId) => {
    rejectUser(studentId);
    alert('Student rejected successfully!');
  };

  const handleVerifyData = (studentId) => {
    verifyStudentData(studentId, true);
    alert('Student data verified successfully!');
  };

  const handleRejectData = (studentId) => {
    verifyStudentData(studentId, false);
    alert('Student data rejected. Student needs to update.');
  };

  const handleUpdateStudentData = (studentId, data) => {
    updateStudentDataByStaff(studentId, data);
    alert('Student data updated successfully!');
    setEditData(null);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId, 'staff');
      alert('Student deleted successfully!');
    }
  };

  const handleExport = () => {
    exportToExcel(approvedStudents, 'students_data.xlsx');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditData(student.profileData);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Staff Dashboard</h1>
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
            <div className="section-header">
              <h2>Manage Students</h2>
              {approvedStudents.length > 0 && (
                <button className="btn-export" onClick={handleExport}>
                  📥 Export to Excel
                </button>
              )}
            </div>

            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Approval ({pendingStudents.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                Approved Students ({approvedStudents.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
                onClick={() => setActiveTab('verify')}
              >
                Verify Data
              </button>
            </div>

            {activeTab === 'pending' && (
              <div className="student-list">
                {pendingStudents.length === 0 ? (
                  <p className="empty-message">No pending student approvals</p>
                ) : (
                  pendingStudents.map(student => (
                    <div key={student.id} className="student-card">
                      <div className="student-info">
                        <h3>{student.name}</h3>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Registered:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
                        <p className="status-badge pending">Pending Approval</p>
                      </div>
                      <div className="student-actions">
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(student.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleReject(student.id)}
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
              <div className="student-list">
                {approvedStudents.length === 0 ? (
                  <p className="empty-message">No approved students yet</p>
                ) : (
                  approvedStudents.map(student => (
                    <div key={student.id} className="student-card">
                      <div className="student-info">
                        <h3>{student.name}</h3>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Approved:</strong> {new Date(student.approvedAt).toLocaleDateString()}</p>
                        <p><strong>Data Status:</strong> 
                          <span className={`status-badge ${student.dataVerificationStatus}`}>
                            {student.dataVerificationStatus || 'Not Verified'}
                          </span>
                        </p>
                        {student.profileData && (
                          <div className="student-profile-preview">
                            <p>CGPA: {student.profileData.cgpa || 'N/A'} | Age: {student.profileData.age || 'N/A'}</p>
                          </div>
                        )}
                      </div>
                      <div className="student-actions">
                        <button
                          className="btn-edit"
                          onClick={() => openEditModal(student)}
                        >
                          Edit Data
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'verify' && (
              <div className="student-list">
                {approvedStudents.filter(s => s.dataVerificationStatus === 'pending').length === 0 ? (
                  <p className="empty-message">No pending data verification</p>
                ) : (
                  approvedStudents
                    .filter(s => s.dataVerificationStatus === 'pending')
                    .map(student => (
                      <div key={student.id} className="student-card">
                        <div className="student-info">
                          <h3>{student.name}</h3>
                          <p><strong>Email:</strong> {student.email}</p>
                          {student.profileData && (
                            <div className="student-profile-details">
                              <p><strong>Age:</strong> {student.profileData.age}</p>
                              <p><strong>10th Marks:</strong> {student.profileData.class10Marks}</p>
                              <p><strong>12th Marks:</strong> {student.profileData.class12Marks}</p>
                              <p><strong>CGPA:</strong> {student.profileData.cgpa}</p>
                              <p><strong>Skills:</strong> {student.profileData.skills}</p>
                              <p className="status-badge pending">Awaiting Verification</p>
                            </div>
                          )}
                        </div>
                        <div className="student-actions">
                          {student.profileData && 
                           student.profileData.age && 
                           student.profileData.class10Marks && 
                           student.profileData.class10MaxMarks && 
                           student.profileData.class12Marks && 
                           student.profileData.class12MaxMarks ? (
                            <button
                              className="btn-verify"
                              onClick={() => handleVerifyData(student.id)}
                            >
                              Verify
                            </button>
                          ) : (
                            <span className="status-badge rejected">Data Incomplete</span>
                          )}
                          <button
                            className="btn-reject"
                            onClick={() => handleRejectData(student.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Edit Modal */}
      {selectedStudent && editData && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Student Data - {selectedStudent.name}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStudentData(selectedStudent.id, editData);
              }}
            >
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={editData.age}
                  onChange={(e) => handleEditChange('age', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>10th Marks (Obtained / Total)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="number"
                    value={editData.class10Marks}
                    onChange={(e) => handleEditChange('class10Marks', e.target.value)}
                    placeholder="Obtained"
                  />
                  <input
                    type="number"
                    value={editData.class10MaxMarks}
                    onChange={(e) => handleEditChange('class10MaxMarks', e.target.value)}
                    placeholder="Total"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>12th Marks (Obtained / Total)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="number"
                    value={editData.class12Marks}
                    onChange={(e) => handleEditChange('class12Marks', e.target.value)}
                    placeholder="Obtained"
                  />
                  <input
                    type="number"
                    value={editData.class12MaxMarks}
                    onChange={(e) => handleEditChange('class12MaxMarks', e.target.value)}
                    placeholder="Total"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={editData.cgpa}
                  onChange={(e) => handleEditChange('cgpa', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  value={editData.skills}
                  onChange={(e) => handleEditChange('skills', e.target.value)}
                  placeholder="e.g., Python, JavaScript, React"
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="tel"
                  value={editData.contact}
                  onChange={(e) => handleEditChange('contact', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={editData.address}
                  onChange={(e) => handleEditChange('address', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setSelectedStudent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
