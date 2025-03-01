import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [leaveForm, setLeaveForm] = useState({
    studentName: '',
    enrollmentNumber: '',
    parentEmail: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [leaveForms, setLeaveForms] = useState([]); // State to store leave forms
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [submitting, setSubmitting] = useState(false); // State for submission loading indicator
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Fetch user data and leave forms when the component loads
  useEffect(() => {
    const fetchUserDataAndLeaveForms = async () => {
      setLoading(true); // Start loading indicator

      const token = localStorage.getItem('token');
      const enrollmentNumber = localStorage.getItem('enrollmentNumber');

      if (!enrollmentNumber) {
        console.error('Enrollment number is missing!');
        alert('Enrollment number is missing. Please log in again.');
        return;
      }

      try {
        // Fetch user details
        const userResponse = await axios.get('http://localhost:5002/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set user data in state
        setUserData(userResponse.data);

        // Set studentName and parentEmail based on fetched user data
        setLeaveForm((prev) => ({
          ...prev,
          studentName: userResponse.data.username,  // Assuming username holds the student's name
          enrollmentNumber: userResponse.data.enrollmentNumber,
          parentEmail: userResponse.data.parentEmail,
        }));

        // Fetch leave forms
        const leaveResponse = await axios.get(`http://localhost:5002/api/leave-forms/student/${enrollmentNumber}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaveForms(leaveResponse.data.leaveForms); // Set fetched leave forms in state
      } catch (error) {
        console.error('Failed to fetch user data or leave forms:', error);
        alert('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false); // End loading indicator
      }
    };

    fetchUserDataAndLeaveForms();
  }, []);
  

  // Handle form input changes
  const handleInputChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  // Handle submit for new leave form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting indicator
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5002/api/leave-forms',
        {
          ...leaveForm,
          studentName: userData?.username, // Use the stored user data here
          enrollmentNumber: userData?.enrollmentNumber,
          parentEmail: userData?.parentEmail,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Leave form submitted successfully');
      setLeaveForm({
        studentName: userData?.username || '',
        enrollmentNumber: userData?.enrollmentNumber || '',
        parentEmail: userData?.parentEmail || '',
        startDate: '',
        endDate: '',
        reason: ''
      });
      // Refetch leave forms after submission
      const enrollmentNumber = localStorage.getItem('enrollmentNumber');
      const leaveResponse = await axios.get(`http://localhost:5002/api/leave-forms/student/${enrollmentNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveForms(leaveResponse.data.leaveForms);
    } catch (error) {
      console.error('Failed to submit leave form:', error);
      alert('Failed to submit leave form. Please try again.');
    } finally {
      setSubmitting(false); // End submitting indicator
    }
  };

  // Handle logout
  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Student Dashboard</h2>

      {/* Form to submit new leave application */}
      <form className="leave-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={leaveForm.studentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Enrollment Number</label>
          <input
            type="text"
            name="enrollmentNumber"
            value={leaveForm.enrollmentNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Parent Email</label>
          <input
            type="email"
            name="parentEmail"
            value={leaveForm.parentEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={leaveForm.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={leaveForm.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Reason for Leave</label>
          <textarea
            name="reason"
            value={leaveForm.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-button" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Leave Form'}
        </button>
      </form>

      {/* Display leave form history */}
      <div className="leave-history">
        <h3>Your Leave Applications</h3>
        {loading ? (
          <p>Loading leave forms...</p>
        ) : leaveForms.length > 0 ? (
          <ul>
            {leaveForms.map((form) => (
              <li key={form.id}>
                <p><strong>Student Name:</strong> {form.studentName}</p>
                <p><strong>Enrollment Number:</strong> {form.enrollmentNumber}</p>
                <p><strong>Parent Email:</strong> {form.parentEmail}</p>
                <p><strong>Start Date:</strong> {new Date(form.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(form.endDate).toLocaleDateString()}</p>
                <p><strong>Reason:</strong> {form.reason}</p>
                <p>
                  <strong>Status:</strong> 
                  {form.status === 'Pending' ? 'Pending' : form.status === 'Approved' ? 'Approved' : 'Rejected'}
                </p>
                {form.status === 'Rejected' && (
                  <p><strong>Rejection Reason:</strong> {form.rejectionReason}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No leave applications found.</p>
        )}
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
