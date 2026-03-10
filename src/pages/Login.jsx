import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if already logged in or after successful login
  useEffect(() => {
    if (user && user.isLoggedIn) {
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'staff') navigate('/staff-dashboard');
      else if (user.role === 'student') navigate('/student-dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    const result = login(credentials.email, credentials.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    }
    // Successful login will be handled by the useEffect above
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Admin Credentials:</strong></p>
          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>
        </div>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
