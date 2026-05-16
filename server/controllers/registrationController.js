const pool = require('../config/db');

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id;

        if (!eventId) {
            return res.status(400).json({ 
                message: 'Event ID is required' 
            });
        }

        const eventResult = await pool.query(
            'SELECT id, capacity FROM events WHERE id = $1',
            [eventId]           
        );

        if (eventResult.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Event not found' 
            });
        }

        const existingRegistration = await pool.query(
            'SELECT id FROM registrations WHERE user_id = $1 AND event_id = $2',
            [userId, eventId]
        );

        if (existingRegistration.rows.length > 0) {
            return res.status(400).json({ 
                message: 'You are already registered for this event' 
            });
        }

        const countResult = await pool.query(
            'SELECT COUNT(*) FROM registrations WHERE event_id = $1',
            [eventId]
        );

        const currentRegistrations = Number(countResult.rows[0].count, 10);
        const capacity = eventResult.rows[0].capacity;

        if (currentRegistrations >= capacity) {
            return res.status(400).json({ 
                message: 'Event is at full capacity' 
            });
        }

        const result = await pool.query(
            `INSERT INTO registrations (user_id, event_id) 
            VALUES ($1, $2) 
            RETURNING *`,
            [userId, eventId]
        );

        res.status(201).json({
            message: "Registered for event successfully",
            registration: result.rows[0]
        });
    } catch (error) {
        console.error('Error registering for event:', error);

        res.status(500).json({
            message: 'A Server error occurred while registering for the event'
        });
    }
};

const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT 
                r.id,
                r.registered_at,
                e.id AS event_id,
                e.title,
                e.description,
                e.location, 
                e.event_date 
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            WHERE r.user_id = $1
            ORDER BY e.event_date ASC`,
            [userId]
        );

        res.json({
            registrations: result.rows
        });
    } catch (error) {
        console.error('Get my registrations error:', error);

        res.status(500).json({
            message: 'A Server error occurred while fetching your registrations'
        });
    }
};

const getRegistrationsForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const result = await pool.query(
            `SELECT 
                r.id AS registration_id,
                r.registered_at,
                u.id AS user_id,
                CONCAT(u.first_name, ' ', u.last_name) AS user_name,
                u.email 
            FROM registrations r
            JOIN users u ON r.user_id = u.id
            WHERE r.event_id = $1
            ORDER BY r.registered_at ASC`,
            [eventId]
        );

        res.json({
            registrations: result.rows
        });
    } catch (error) {
        console.error('Get registrations for event error:', error);

        res.status(500).json({
            message: 'A Server error occurred while fetching event registrations'
        });
    }
};

const cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;
        
        let result;

        if (userRole === 'admin') {
            result = await pool.query(
                'DELETE FROM registrations WHERE id = $1 RETURNING *',
                [id]
            );
        } else {
            result = await pool.query(
               `DELETE FROM registrations 
                WHERE id = $1 AND user_id = $2 
                RETURNING *`,
                [id, userId]
            );
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Registration not found' 
            });
        }

        res.json({
            message: 'Registration cancelled successfully',
            registration: result.rows[0]
        });
    } catch (error) {
        console.error('Cancel registration error:', error);

        res.status(500).json({
            message: 'A Server error occurred while cancelling the registration'
        });
    }
};

module.exports = {
    registerForEvent,
    getMyRegistrations,
    getRegistrationsForEvent,
    cancelRegistration,
};