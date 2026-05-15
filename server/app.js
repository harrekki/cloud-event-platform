const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;