const express = require('express');
const { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent 
} = require('../controllers/eventController');

const { authenticateToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post('/', authenticateToken, requireRole('admin'), createEvent);
router.put('/:id', authenticateToken, requireRole('admin'), updateEvent);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteEvent);

module.exports = router;