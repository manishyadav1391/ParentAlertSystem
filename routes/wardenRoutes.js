// wardenRoutes.js
const express = require('express');
const router = express.Router();
const LeaveForm = require('../models/LeaveForm'); // Ensure this path is correct

// Route to fetch all leave forms
router.get('/api/leave-forms', async (req, res) => {
  try {
    const leaveForms = await LeaveForm.find({});
    res.json(leaveForms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching leave forms' });
  }
});

module.exports = router;
