const express = require('express');

const {
  registerForEvent,
  getMyRegistrations,
  getRegistrationsForEvent,
  cancelRegistration,
} = require("../controllers/registrationController");

const { authenticateToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticateToken, registerForEvent);
router.get('/my', authenticateToken, getMyRegistrations);
router.get(
    '/event/:eventId', 
    authenticateToken,
    requireRole('admin'),
    getRegistrationsForEvent
);

router.delete('/:id', authenticateToken, cancelRegistration);

module.exports = router;


