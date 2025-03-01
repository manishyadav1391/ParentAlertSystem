// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file


const HomePage = () => {
  return (
    <div className='body'>
    <div className="home-container">
      <h1 className="home-title">Welcome to the Parent Alert System</h1>
      <div className="auth-section">
        <div className="auth-box">
          <h2>Student</h2>
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="auth-button">Register</button>
          </Link>
        </div>

        <div className="auth-box">
          <h2>Warden</h2>
          <Link to="/warden-login">
            <button className="auth-button">Login</button>
          </Link>
          <Link to="/warden-register">
            <button className="auth-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
