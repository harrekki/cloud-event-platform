import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        event_date: "",
        capacity: 0,
    });

    const [error, setError] = useState("");

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
            await api.post("/events", formData);
            navigate("/admin");
        } catch (error) {
            console.error("Error creating event:", error);
            setError(error.response?.data?.message || "Failed to create event.");
        }
    };

    return (
        <div className="create-event">
            <h1>Create New Event</h1>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="event_date">Event Date</label>
                    <input
                        type="datetime-local"
                        id="event_date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>

                <button type="submit">Create Event</button>

                <Link to="/admin">Cancel</Link>
            </form>
        </div>
    );     
}

export default CreateEvent;

