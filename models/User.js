const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Basic User Details
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Student-Specific Information
  enrollmentNumber: { type: String, required: true },  // Student's unique enrollment number
  course: { type: String, required: true },            // Course or program
  yearOfStudy: { type: String, required: true },        // Year (e.g., 1st, 2nd, 3rd year)
  batch: { type: String, required: true },             // Batch (e.g., A, B, etc.)

  // Parent/Guardian Information
  parentName: { type: String, required: true },         // Parent's name
  parentEmail: { type: String, required: true },        // Parent's email for notifications
  parentPhone: { type: String, required: true }         // Parent's phone number for contact

  // Other fields can be added as needed (e.g., role for student/warden differentiation)
});

module.exports = mongoose.model('User', UserSchema);
