import axios from 'axios';
import React, { useState } from 'react';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    enrollmentNumber: '',
    course: '',
    yearOfStudy: '',
    batch: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message); // Alert with the message from the server
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>

        {/* Username */}
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Enrollment Number */}
        <div className="input-group">
          <input
            type="text"
            name="enrollmentNumber"
            placeholder="Enrollment Number"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Course */}
        <div className="input-group">
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        {/* Year of Study */}
        <div className="input-group">
          <input
            type="text"
            name="yearOfStudy"
            placeholder="Year of Study (e.g., 1st Year, 2nd Year)"
            value={formData.yearOfStudy}
            onChange={handleChange}
            required
          />
        </div>

        {/* Batch */}
        <div className="input-group">
          <input
            type="text"
            name="batch"
            placeholder="Batch (e.g., A, B, C)"
            value={formData.batch}
            onChange={handleChange}
            required
          />
        </div>

        {/* Parent's Name */}
        <div className="input-group">
          <input
            type="text"
            name="parentName"
            placeholder="Parent's Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Parent's Email */}
        <div className="input-group">
          <input
            type="email"
            name="parentEmail"
            placeholder="Parent's Email"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Parent's Phone Number */}
        <div className="input-group">
          <input
            type="text"
            name="parentPhone"
            placeholder="Parent's Phone Number"
            value={formData.parentPhone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Register Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
