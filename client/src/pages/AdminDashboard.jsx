import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Spinner from "../components/Spinner";
import { formatDateTime } from "../utils/dateUtils";

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/events");
                setEvents(response.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Unable to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            setDeleting(true);
            setError("");

            await api.delete(`/events/${eventId}`);
            setEvents(events.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
            setError("Unable to delete event.");
        } finally {
            setDeleting(false);
        }
    };

    if(loading) {
        return <Spinner></Spinner>;
    }

    if (error) {
        return <p className="error alert alert-danger m-5" role="alert">{error}</p>;
    }

    return (
        <div className="admin-dashboard container text-center">
            <h1 className="mb-4">Admin Dashboard</h1>
              
            <Link className="btn btn-primary" to="/admin/events/new">Create New Event</Link>

            <br /><br />

            <hr />
            <h2>Events</h2>
            {events.length === 0 ? (
                <div className="row" style={{height: "80vh"}}>
                    <div className="col-sm-12 text-center">
                        <p className="alert alert-primary w-50 mt-3 mx-auto" role="alert">There are no events scheduled yet.</p>
                    </div>
                </div>
            ) : (
                <div className="d-sm-flex flex-wrap justify-content-center p-2">
                    {events.map((event) => (
                        <div key={event.id} className="event card bg-body-tertiary p-3 text-center m-3" style={{width: "40%"}}>
                            <div className="card-body d-flex flex-column justify-content-evenly align-items-center">
                                <h4 className="card-title">{event.title}</h4>
                                <span className="card-subtitle text-body-secondary">Location: {event.location}</span>
                                <span className="card-subtitle text-body-secondary mb-3">Date: {formatDateTime(event.eventDate)}</span>
                                <Link className="btn btn-sm btn-primary w-50 mb-3" to={`/admin/events/${event.id}/edit`}>Edit this event</Link>
                                <button className="btn btn-sm btn-danger w-50" onClick={() => handleDelete(event.id)} disabled={deleting}>
                                    {deleting ? "Deleting..." : "Delete this event"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;