const express = require('express');
const router = express.Router();
const LeaveForm = require('../models/LeaveForm');
const { sendApprovalEmail, sendComplaintEmail } = require('../services/mailer');
const User = require('../models/User'); // Import User model for student data

// Submit a new leave form
router.post('/', async (req, res) => {
  const { studentName, enrollmentNumber, parentEmail, startDate, endDate, reason } = req.body;

  // Validate the incoming data
  if (!studentName || !enrollmentNumber || !parentEmail || !startDate || !endDate || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new leave form and save it
    const newLeaveForm = new LeaveForm({ studentName, enrollmentNumber, parentEmail, startDate, endDate, reason });
    await newLeaveForm.save();
    res.status(201).json({ message: 'Leave form submitted successfully' });
  } catch (error) {
    console.error('Error saving leave form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all leave forms (admin use, if needed)
router.get('/', async (req, res) => {
  try {
    const leaveForms = await LeaveForm.find({});
    res.json(leaveForms);
  } catch (error) {
    console.error('Error fetching leave forms:', error);
    res.status(500).json({ message: 'Error fetching leave forms' });
  }
});

// Get leave history for a student by enrollment number
router.get('/student/:enrollmentNumber', async (req, res) => {
  try {
    const enrollmentNumber = req.params.enrollmentNumber;
    console.log('Received enrollmentNumber:', enrollmentNumber);

    // Fetch leave forms based on the student's enrollment number
    const leaveForms = await LeaveForm.find({ enrollmentNumber });

    if (!leaveForms || leaveForms.length === 0) {
      return res.status(404).json({ message: 'No leave forms found for this student' });
    }

    console.log('Leave forms found:', leaveForms);

    res.json({
      message: 'Leave forms fetched successfully',
      leaveForms: leaveForms.map(form => ({
        id: form._id,
        studentName: form.studentName,
        enrollmentNumber: form.enrollmentNumber,
        parentEmail: form.parentEmail,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
        status: form.isApproved === undefined ? 'Pending' : form.isApproved ? 'Approved' : 'Rejected',
      }))
    });
  } catch (error) {
    console.error('Error fetching student leave history:', error);
    res.status(500).json({ message: 'Error fetching student leave history' });
  }
});

// Approve leave form
router.patch('/:id/approve', async (req, res) => {
  try {
    const leaveForm = await LeaveForm.findById(req.params.id);
    if (!leaveForm) {
      return res.status(404).json({ message: 'Leave form not found' });
    }
    leaveForm.isApproved = true;
    await leaveForm.save();

    // Send approval email
    await sendApprovalEmail(
      leaveForm.parentEmail,
      leaveForm.studentName,
      leaveForm.enrollmentNumber,
      leaveForm.startDate,
      leaveForm.endDate
    );

    res.status(200).json({ message: 'Leave approved and notification sent to parent' });
  } catch (error) {
    console.error('Error approving leave form:', error);
    res.status(500).json({ message: 'Error approving leave form' });
  }
});

// Reject leave form (without sending email)
router.patch('/:id/reject', async (req, res) => {
  try {
    const leaveForm = await LeaveForm.findById(req.params.id);
    if (!leaveForm) {
      return res.status(404).json({ message: 'Leave form not found' });
    }
    leaveForm.isApproved = false;
    await leaveForm.save();

    res.status(200).json({ message: 'Leave rejected successfully' });
  } catch (error) {
    console.error('Error rejecting leave form:', error);
    res.status(500).json({ message: 'Error rejecting leave form' });
  }
});

// Raise complaint to parent
router.post('/:id/complaint', async (req, res) => {
  try {
    const leaveForm = await LeaveForm.findById(req.params.id);
    if (!leaveForm) {
      return res.status(404).json({ message: 'Leave form not found' });
    }

    const { complaintReason } = req.body;
    if (!complaintReason) {
      return res.status(400).json({ message: 'Complaint reason is required' });
    }

    // Send complaint email
    await sendComplaintEmail(
      leaveForm.parentEmail,
      leaveForm.studentName,
      complaintReason
    );

    res.status(200).json({ message: 'Complaint raised and notification sent to parent' });
  } catch (error) {
    console.error('Error raising complaint:', error);
    res.status(500).json({ message: 'Error raising complaint' });
  }
});

module.exports = router;
