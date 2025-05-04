const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const petRoutes = require('./routes/petRoutes');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/pets', petRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Virtual Pet Adoption Center API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

module.exports = app;