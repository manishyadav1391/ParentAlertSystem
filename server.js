const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const wardAuthRouter = require('./routes/wardauth');
const wardenRoutes = require('./routes/wardenRoutes');
const leaveFormRoutes = require('./routes/leaveForms');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors()); // Adjust as necessary for security (e.g., specifying allowed origins)

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/student';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Routes
app.options('*', cors()); // Handle preflight requests
app.use('/api/warden', wardenRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/leave-forms', leaveFormRoutes);
app.use('/api/wardauth', wardAuthRouter)

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// 404 Handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // For debugging, remove in production
  console.log('MONGODB_URI:', process.env.MONGODB_URI); // For debugging, remove in production
});

