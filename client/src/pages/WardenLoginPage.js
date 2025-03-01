// src/pages/WardenLoginPage.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WardenLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send login request without the role field
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/wardauth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenExpiration', response.data.expiration);

      // Redirect based on role, or use logic to determine the correct dashboard
      navigate('/warden-dashboard'); // Adjust this if necessary based on your role determination logic

      console.log('Navigating to WardenDashboard'); // Confirm this is correct
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid username or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="login-container">
      <div className="login-box">
        <h2>Warden  Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          
      
          
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="signup-option">
            Not registered? <a href="/register">Create account</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default WardenLoginPage;

