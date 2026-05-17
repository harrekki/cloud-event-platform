const pool = require("../config/db");

const getEvents = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT e.id, 
                    e.title, 
                    e.description, 
                    e.location,
                    e.event_date AS "eventDate",
                    e.capacity,  
                    e.created_at, 
                    CONCAT(u.first_name, ' ', u.last_name) AS created_by_name,
                    COUNT(r.id) AS registration_count,
                    e.capacity - COUNT(r.id) AS spots_remaining
            FROM events e
            LEFT JOIN users u ON e.created_by = u.id
            LEFT JOIN registrations r ON e.id = r.event_id
            GROUP BY e.id, u.first_name, u.last_name
            ORDER BY e.event_date ASC`
        );

        res.json({ events: result.rows });
    } catch (error) {
        console.error("Get events error: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT e.id, 
                    e.title, 
                    e.description, 
                    e.location,
                    e.event_date AS "eventDate",
                    e.capacity,  
                    e.created_at, 
                    CONCAT(u.first_name, ' ', u.last_name) AS created_by_name,
                    COUNT(r.id) AS registration_count,
                    e.capacity - COUNT(r.id) AS spots_remaining
            FROM events e
            LEFT JOIN users u ON e.created_by = u.id
            LEFT JOIN registrations r ON e.id = r.event_id
            WHERE e.id = $1
            GROUP BY e.id, u.first_name, u.last_name`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                message: "Event not found" 
            });
        }

        res.json({ event: result.rows[0] });
    } catch (error) {
        console.error("Get event by ID error: ", error);

        res.status(500).json({ 
            message: "Server error while fetching event" 
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, description, location, event_date, capacity } = req.body;
        
        if (!title || !event_date || !capacity) {
            return res.status(400).json({ 
                message: "Title, event date, and capacity are required" 
            });
        }

        if (capacity <= 0) {
            return res.status(400).json({ 
                message: "Capacity must be greater than zero" 
            });
        }

        const result = await pool.query(
            `INSERT INTO events 
            (title, description, location, event_date, capacity, created_by)
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [
                title, 
                description || null, 
                location || null, 
                event_date, 
                capacity, 
                req.user.id
            ]
        );

        res.status(201).json({ 
            message: "Event created successfully",
            event: result.rows[0] 
        });
    } catch (error) {
        console.error("Create event error: ", error);

        res.status(500).json({ 
            message: "Server error while creating event" 
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, event_date, capacity } = req.body;

        if (!title || !event_date || !capacity) {
            return res.status(400).json({ 
                message: "Title, event date, and capacity are required" 
            });
        }

        if (capacity <= 0) {
            return res.status(400).json({ 
                message: "Capacity must be greater than zero" 
            });
        }       

        const result = await pool.query(
            `UPDATE events 
             SET title = $1, 
                 description = $2, 
                 location = $3, 
                 event_date = $4, 
                 capacity = $5
             WHERE id = $6
            RETURNING *`,
            [
                title, 
                description || null, 
                location || null, 
                event_date, 
                capacity, 
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                message: "Event not found" 
            });
        }

        res.json({ 
            message: "Event updated successfully",
            event: result.rows[0] 
        });
    } catch (error) {
        console.error("Update event error: ", error);

        res.status(500).json({ 
            message: "Server error while updating event" 
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM events 
            WHERE id = $1 
            RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                message: "Event not found" 
            });
        }

        res.json({ 
            message: "Event deleted successfully",
            event: result.rows[0] 
        });
    } catch (error) {
        console.error("Delete event error: ", error);

        res.status(500).json({ 
            message: "Server error while deleting event" 
        });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};