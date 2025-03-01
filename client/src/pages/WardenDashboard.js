import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import './WardenDashboard.css';

const WardenDashboard = () => {
  const [newLeaveForms, setNewLeaveForms] = useState([]);
  const [approvedLeaveForms, setApprovedLeaveForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaintReasons, setComplaintReasons] = useState({}); // Complaint reasons state
  const [studentHistory, setStudentHistory] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveForms = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in again.');
          navigate('/');
          return;
        }

        const responseNew = await axios.get('http://localhost:5002/api/leave-forms?isApproved=false', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const responseApproved = await axios.get('http://localhost:5002/api/leave-forms?isApproved=true', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setNewLeaveForms(responseNew.data);
        setApprovedLeaveForms(responseApproved.data);
      } catch (error) {
        console.error('Failed to fetch leave forms:', error);
        setError('Error fetching leave forms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveForms();
  }, [navigate]);

  const handleApprove = async (formId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5002/api/leave-forms/${formId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewLeaveForms(prev => prev.filter(form => form._id !== formId));
      const approvedForm = newLeaveForms.find(form => form._id === formId);
      if (approvedForm) {
        approvedForm.isApproved = true;
        setApprovedLeaveForms(prev => [...prev, approvedForm]);
      }
      alert('Leave approved and notification sent to parent.');
    } catch (error) {
      console.error('Failed to approve leave:', error);
      alert('Failed to approve leave. Please try again.');
    }
  };

  const handleReject = async (formId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:5002/api/leave-forms/${formId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setNewLeaveForms(prev => prev.filter(form => form._id !== formId));
        alert('Leave rejected and notification sent to parent.');
      } else {
        throw new Error('Failed to reject leave');
      }
    } catch (error) {
      console.error('Failed to reject leave:', error);
      alert('Failed to reject leave. Please try again.');
    }
  };

  const handleRaiseComplaint = async (formId) => {
    try {
      const token = localStorage.getItem('token');
      const complaintReason = complaintReasons[formId]; // Get the complaint reason for this form
      if (!complaintReason) {
        alert('Please enter a complaint reason.');
        return;
      }

      const response = await axios.post(`http://localhost:5002/api/leave-forms/${formId}/complaint`, { complaintReason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        alert('Complaint raised and notification sent to parent.');
      } else {
        throw new Error('Failed to raise complaint');
      }
    } catch (error) {
      console.error('Failed to raise complaint:', error);
      alert('Failed to raise complaint. Please try again.');
    }
  };

  const handleViewStudentHistory = async (enrollmentNumber) => {
    if (!enrollmentNumber) {
      alert('Enrollment number not available.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5002/api/leave-forms/student/${enrollmentNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        console.log('Student History:', response.data);
        setStudentHistory(response.data.leaveForms); // Store the h
      } else {
        throw new Error('Failed to fetch student history');
      }
    } catch (error) {
      console.error('Failed to fetch student history:', error);
      alert('Failed to fetch student history.');
    }
  };
  
  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const handleComplaintReasonChange = (formId, reason) => {
    setComplaintReasons(prev => ({ ...prev, [formId]: reason }));
  };

  return (
    <div className="warden-dashboard">
      <h2>Warden Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {loading ? (
        <p>Loading leave forms...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h3>New Leave Applications</h3>
          {newLeaveForms.length > 0 ? (
            <ul className="leave-application-list">
              {newLeaveForms.map(form => (
                <li key={form._id}>
                  <p>Student Name: {form.studentName}</p>
                  <p>Enrollment No: {form.enrollmentNumber}</p>
                  <p>Parent Email: {form.parentEmail}</p>
                  <p>Start Date: {new Date(form.startDate).toDateString()}</p>
                  <p>End Date: {new Date(form.endDate).toDateString()}</p>
                  <p>Reason: {form.reason}</p>

                  {/* Text area for complaint reason */}
                  <textarea
                    placeholder="Enter complaint reason"
                    value={complaintReasons[form._id] || ''}
                    onChange={(e) => handleComplaintReasonChange(form._id, e.target.value)}
                  />

                  <button onClick={() => handleApprove(form._id)}>Approve</button>
                  <button onClick={() => handleReject(form._id)}>Reject</button>
                  <button onClick={() => handleRaiseComplaint(form._id)}>Raise Complaint</button>
                  <button onClick={() => handleViewStudentHistory(form.enrollmentNumber)}>View History</button>

                </li>
              ))}
            </ul>
          ) : (
            <p>No new leave applications.</p>
          )}
          <h3>Student Leave History</h3>
{studentHistory.length > 0 ? (
  <ul className="leave-application-list">
    {studentHistory.map((form) => (
      <li key={form._id}>
        <p>Student Name: {form.studentName}</p>
        <p>Enrollment No: {form.enrollmentNumber}</p>
        <p>Parent Email: {form.parentEmail}</p>
        <p>Start Date: {new Date(form.startDate).toDateString()}</p>
        <p>End Date: {new Date(form.endDate).toDateString()}</p>
        <p>Reason: {form.reason}</p>
        <p>Status: {form.isApproved ? "Approved" : "Pending"}</p>
      </li>
    ))}
  </ul>
) : (
  <p>No leave history available for this student.</p>
)}

          <h3>Approved Leave Applications</h3>
          {approvedLeaveForms.length > 0 ? (
            <ul className="leave-application-list">
              {approvedLeaveForms.map(form => (
                <li key={form._id}>
                  <p>Student Name: {form.studentName}</p>
                  <p>Enrollment No: {form.enrollmentNumber}</p>
                  <p>Parent Email: {form.parentEmail}</p>
                  <p>Start Date: {new Date(form.startDate).toDateString()}</p>
                  <p>End Date: {new Date(form.endDate).toDateString()}</p>
                  <p>Reason: {form.reason}</p>
                  <p>Status: Approved</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No approved leave applications.</p>
          )}
         

        </>
      )}
    </div>
  );
};

export default WardenDashboard;
