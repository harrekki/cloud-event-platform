const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

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

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;