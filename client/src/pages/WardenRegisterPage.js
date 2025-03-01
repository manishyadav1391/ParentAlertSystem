// src/pages/WardenRegisterPage.js

import axios from 'axios';
import React, { useState } from 'react';
import './WardenRegisterPage.css';

const WardenRegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request with the correct fields
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/wardauth/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div className="input-group">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
);
};





export default WardenRegisterPage;

