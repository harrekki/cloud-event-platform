const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getCurrentUser 
} = require('../controllers/authController');

const { requireTitle } = require('../middleware/roleMiddleware');

const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getCurrentUser);
router.get(
    '/admin-test', 
    authenticateToken, 
    requireTitle('admin'), 
    (req, res) => {
        res.json({
            message: "Admin route working",
        });
    }
);

module.exports = router;    