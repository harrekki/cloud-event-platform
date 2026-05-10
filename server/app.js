const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify that the server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Cloud Event Platform API is running'
    });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Database test route
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database connection successful',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);

    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Database user test route
app.get('/users-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');

    res.json({
      message: 'Users retrieved successfully',
      users: result.rows
    });
  } catch (error) {
    console.error('Error retrieving users:', error);

    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
});

app.use('/api/auth', authRoutes);

module.exports = app;