import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user, logout, updateStudentData } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(user?.profileData || {});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!user || user.role !== 'student') {
    navigate('/login');
    return null;
  }

  const [skillInput, setSkillInput] = useState('');

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    if (value.endsWith(',') || value.endsWith(' ')) {
      const newSkill = value.slice(0, -1).trim();
      if (newSkill && !formData.skills.split(',').includes(newSkill)) {
        const updatedSkills = formData.skills ? `${formData.skills},${newSkill}` : newSkill;
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
      }
      setSkillInput('');
    } else {
      setSkillInput(value);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = formData.skills
      .split(',')
      .filter(skill => skill !== skillToRemove)
      .join(',');
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      
      // Calculate Percentage
      if (['class10Marks', 'class10MaxMarks'].includes(name)) {
        const marks = parseFloat(name === 'class10Marks' ? value : prev.class10Marks);
        const max = parseFloat(name === 'class10MaxMarks' ? value : prev.class10MaxMarks);
        if (marks && max) {
          updatedData.class10Percentage = ((marks / max) * 100).toFixed(2);
        }
      }
      
      if (['class12Marks', 'class12MaxMarks'].includes(name)) {
        const marks = parseFloat(name === 'class12Marks' ? value : prev.class12Marks);
        const max = parseFloat(name === 'class12MaxMarks' ? value : prev.class12MaxMarks);
        if (marks && max) {
          updatedData.class12Percentage = ((marks / max) * 100).toFixed(2);
        }
      }
      
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.age || !formData.class10Marks || !formData.class10MaxMarks || !formData.class12Marks || !formData.class12MaxMarks || !formData.cgpa) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      updateStudentData(user.id, formData);
      setSuccess('Profile data submitted successfully! Waiting for staff verification...');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
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
              <h2>My Account</h2>
            </div>

            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
              <button
                className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
                onClick={() => setActiveTab('status')}
              >
                Status
              </button>
            </div>

            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="profile-status">
                  <p><strong>Registration Status:</strong> 
                    {!user.isApproved ? (
                      <span className="status-badge pending">⏳ Waiting for Staff Approval</span>
                    ) : (
                      <span className="status-badge approved">✓ Approved</span>
                    )}
                  </p>
                  
                  {user.isApproved && (
                    <p><strong>Data Verification Status:</strong>
                      {user.dataVerificationStatus === 'pending' && (
                        <span className="status-badge pending">⏳ Pending Staff Review</span>
                      )}
                      {user.dataVerificationStatus === 'verified' && (
                        <span className="status-badge verified">✓ Verified</span>
                      )}
                      {user.dataVerificationStatus === 'rejected' && (
                        <span className="status-badge rejected">✗ Needs Update</span>
                      )}
                      {!user.dataVerificationStatus && (
                        <span className="status-badge">Not Started</span>
                      )}
                    </p>
                  )}
                </div>

                {user.isApproved && (
                  <form onSubmit={handleSubmit} className="profile-form">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="age">Age *</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age || ''}
                          onChange={handleChange}
                          placeholder="Enter your age"
                          disabled={user.dataVerificationStatus === 'verified'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contacts">Contact Number</label>
                        <input
                          type="tel"
                          id="contact"
                          name="contact"
                          value={formData.contact || ''}
                          onChange={handleChange}
                          placeholder="Enter your contact"
                          disabled={user.dataVerificationStatus === 'verified'}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        rows="3"
                        disabled={user.dataVerificationStatus === 'verified'}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="class10Marks">10th Marks *</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input
                            type="number"
                            id="class10Marks"
                            name="class10Marks"
                            value={formData.class10Marks || ''}
                            onChange={handleChange}
                            placeholder="Obtained"
                            disabled={user.dataVerificationStatus === 'verified'}
                          />
                          <input
                            type="number"
                            id="class10MaxMarks"
                            name="class10MaxMarks"
                            value={formData.class10MaxMarks || ''}
                            onChange={handleChange}
                            placeholder="Total"
                            disabled={user.dataVerificationStatus === 'verified'}
                          />
                        </div>
                        {formData.class10Percentage && (
                          <p className="percentage-display">Percentage: {formData.class10Percentage}%</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="class12Marks">12th Marks *</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input
                            type="number"
                            id="class12Marks"
                            name="class12Marks"
                            value={formData.class12Marks || ''}
                            onChange={handleChange}
                            placeholder="Obtained"
                            disabled={user.dataVerificationStatus === 'verified'}
                          />
                          <input
                            type="number"
                            id="class12MaxMarks"
                            name="class12MaxMarks"
                            value={formData.class12MaxMarks || ''}
                            onChange={handleChange}
                            placeholder="Total"
                            disabled={user.dataVerificationStatus === 'verified'}
                          />
                        </div>
                        {formData.class12Percentage && (
                          <p className="percentage-display">Percentage: {formData.class12Percentage}%</p>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cgpa">CGPA *</label>
                        <input
                          type="number"
                          id="cgpa"
                          name="cgpa"
                          value={formData.cgpa || ''}
                          onChange={handleChange}
                          placeholder="Enter CGPA"
                          step="0.01"
                          max="10"
                          disabled={user.dataVerificationStatus === 'verified'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="skillInput">Skills (type then "," or space) *</label>
                        <input
                          type="text"
                          id="skillInput"
                          name="skillInput"
                          value={skillInput}
                          onChange={handleSkillInputChange}
                          placeholder="e.g., Python, JavaScript"
                        />
                        <div className="skills-container">
                          {formData.skills && formData.skills.split(',').filter(s => s).map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill}
                              <button type="button" onClick={() => removeSkill(skill)}>×</button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {user.dataVerificationStatus !== 'verified' ? (
                      <button type="submit" className="btn-primary">
                        Submit Data for Verification
                      </button>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button type="submit" className="btn-primary" style={{ background: '#764ba2' }}>
                          Update Skills Only
                        </button>
                        <div className="verified-notice">
                          <p>✓ Your academic data is locked. You can still update your skills.</p>
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {!user.isApproved && (
                  <div className="info-box">
                    <h3>⏳ Waiting for Approval</h3>
                    <p>Your registration is pending staff approval. Once approved, you will be able to update your profile data.</p>
                    <p>You will receive notification once your account is approved.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'status' && (
              <div className="status-section">
                <h3>Account Status</h3>
                <div className="status-info">
                  <div className="status-item">
                    <span className="status-label">Name:</span>
                    <span className="status-value">{user.name}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Email:</span>
                    <span className="status-value">{user.email}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Role:</span>
                    <span className="status-value">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Registration Date:</span>
                    <span className="status-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Registration Status:</span>
                    <span className={`status-value ${user.isApproved ? 'status-approved' : 'status-pending'}`}>
                      {user.isApproved ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </div>
                  {user.isApproved && (
                    <div className="status-item">
                      <span className="status-label">Data Verification:</span>
                      <span className={`status-value ${user.dataVerificationStatus === 'verified' ? 'status-verified' : 'status-pending'}`}>
                        {user.dataVerificationStatus === 'verified' && '✓ Verified'}
                        {user.dataVerificationStatus === 'pending' && '⏳ Pending Review'}
                        {user.dataVerificationStatus === 'rejected' && '✗ Needs Update'}
                        {!user.dataVerificationStatus && 'Not Started'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
