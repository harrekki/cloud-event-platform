import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events");
                setEvents(response.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Unable to load events.");
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await api.delete(`/events/${eventId}`);
            setEvents(events.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
            setError("Unable to delete event.");
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
              
            {error && <p className="error">{error}</p>}

            <Link to="/admin/events/new">Create New Event</Link>

            <br /><br />

            <h2>Events</h2>
            {events.map((event) => (
                <div key={event.id} className="event">
                    <h3>{event.title}</h3>
                    <p>Location: {event.location}</p>
                    <p>Date: {event.eventDate}</p>
                    <Link to={`/admin/events/${event.id}/edit`}>Edit this event</Link>
                    <button onClick={() => handleDelete(event.id)}>
                        Delete this event
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;