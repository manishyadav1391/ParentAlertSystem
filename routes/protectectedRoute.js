// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Example of a protected route
router.get('/protected', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use the decoded information (e.g., user ID or role)
    res.status(200).json({ message: `Welcome, user ${decoded.id}!` });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;
