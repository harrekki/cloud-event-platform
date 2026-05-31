import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import api from "../services/api";

function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        capacity: 0,
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                const eventData = response.data.event;

                setFormData({
                    title: eventData.title || "",
                    description: eventData.description || "",
                    location: eventData.location || "",
                    eventDate: eventData.eventDate || "",
                    capacity: eventData.capacity || 0,
                });
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Unable to load event details.");
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (event) => {
        setFormData({ 
            ...formData, 
            [event.target.name]: event.target.value, 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await api.put(`/events/${id}`, {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                event_date: formData.eventDate,
                capacity: formData.capacity,
            });
            navigate("/admin");
        } catch (error) {
            console.error("Error updating event:", error);
            setError(error.response?.data?.message || "Failed to update event.");
        }
    };

    return (
        <div className="edit-event container">
            <h1>Edit Event</h1>

            {error && <p className="error">{error}</p>}

            <form className="mt-3 w-50" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input
                        className="form-control"
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="event_date">Event Date</label>
                    <input
                        className="form-control"
                        type="text"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="capacity">Capacity</label>
                    <input
                        className="form-control"
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="my-4 row">
                    <div className="col-sm-4">
                        <button className="btn btn-primary" type="submit">Update Event</button>
                    </div>
                    <div className="col-sm-8">
                        <Link className="btn btn-link link-danger" to="/admin">Cancel</Link>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditEvent;