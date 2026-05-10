const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify that the server is running
app.get('/', (req, res) => {
  res.json({
    message: 'Cloud Event Platform API is running'
    });
});

module.exports = app;