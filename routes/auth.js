require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    enrollmentNumber,
    course,
    yearOfStudy,
    batch,
    parentName,
    parentEmail,
    parentPhone
  } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password || !enrollmentNumber || !course || !yearOfStudy || !batch || !parentName || !parentEmail || !parentPhone) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all fields
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      enrollmentNumber,
      course,
      yearOfStudy,
      batch,
      parentName,
      parentEmail,
      parentPhone
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { enrollmentNumber, password } = req.body; // Changed to enrollmentNumber

  // Basic validation
  if (!enrollmentNumber.trim() || !password.trim()) {
    return res.status(400).json({ message: 'Please fill all fields with valid input' });
  }

  try {
    // Find user by enrollment number
    const user = await User.findOne({ enrollmentNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid enrollment number or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid enrollment number or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      enrollmentNumber: user.enrollmentNumber,  // Include enrollment number
      parentEmail: user.parentEmail,              // Include parent email
    });
    
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get user details using token
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
