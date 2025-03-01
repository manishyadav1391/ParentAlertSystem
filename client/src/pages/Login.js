import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [enrollmentNumber, setEnrollmentNumber] = useState(''); // Changed from username to enrollmentNumber
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        enrollmentNumber, // Send enrollmentNumber instead of username
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenExpiration', response.data.expiration);
      // Assuming login response includes enrollmentNumber
      localStorage.setItem('enrollmentNumber', response.data.enrollmentNumber);
      console.log('Enrollment number stored in localStorage:', response.data.enrollmentNumber); // Add this to check the value
      
      navigate('/student-dashboard');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid enrollment number or password.');
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
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enrollment Number" // Updated placeholder
              value={enrollmentNumber} // Changed state to enrollmentNumber
              onChange={(e) => setEnrollmentNumber(e.target.value)} // Update value on input change
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

export default Login;
