require('dotenv').config();
const express = require('express');
const router = express.Router();
const WardUser = require('../models/wardUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await WardUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new WardUser({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Warden registered successfully' });
  } catch (error) {
    console.error('Error during warden registration:', error); // Detailed logging
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || username.length < 3 || !password.trim() || password.length < 8) {
    return res.status(400).json({ message: 'Please fill all fields with valid input' });
  }

  try {
    console.log('Finding user by username...');
    const user = await WardUser.findOne({ username });  // Correct this to WardUser
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);
    
    res.status(200).json({
      message: 'Login successful',
      token,
    });
    
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


