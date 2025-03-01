const mongoose = require('mongoose');

// Define the schema
const leaveFormSchema = new mongoose.Schema({
  
  studentName: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespace
    minlength: [3, 'Student name must be at least 3 characters long'],
    maxlength: [50, 'Student name must be no more than 50 characters long']
  },
  enrollmentNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Enrollment number must be exactly 10 digits'] // Example validation for a 10-digit enrollment number
  },
  parentEmail: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespace
    lowercase: true, // Convert to lowercase
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address'] // Validate email format
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespace
    minlength: [10, 'Reason must be at least 10 characters long'],
    maxlength: [200, 'Reason must be no more than 200 characters long']
  },
  isApproved: {
    type: Boolean,
    default: false // Default to false for new applications
  },
  complaints: [
    {
      message: String,
      raisedAt: { type: Date, default: Date.now }
    }
  ]
  
});

// Create and export the model
const LeaveForm = mongoose.model('LeaveForm', leaveFormSchema);

module.exports = LeaveForm;
