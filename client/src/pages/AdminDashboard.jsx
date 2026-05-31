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
        <div className="admin-dashboard container text-center">
            <h1 className="mb-4">Admin Dashboard</h1>
              
            {error && <p className="error">{error}</p>}

            <Link className="btn btn-primary" to="/admin/events/new">Create New Event</Link>

            <br /><br />

            <h2>Events</h2>
            <hr />

            <div className="d-sm-flex flex-wrap justify-content-center p-2">
                {events.map((event) => (
                    <div key={event.id} className="event card bg-body-tertiary p-3 text-center m-3" style={{width: "40%"}}>
                        <div className="card-body d-flex flex-column justify-content-evenly align-items-center">
                            <h4 className="card-title">{event.title}</h4>
                            <span className="card-subtitle text-body-secondary">Location: {event.location}</span>
                            <span className="card-subtitle text-body-secondary mb-3">Date: {event.eventDate}</span>
                            <Link className="btn btn-sm btn-primary w-50 mb-3" to={`/admin/events/${event.id}/edit`}>Edit this event</Link>
                            <button className="btn btn-sm btn-danger w-50" onClick={() => handleDelete(event.id)}>
                                Delete this event
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default AdminDashboard;