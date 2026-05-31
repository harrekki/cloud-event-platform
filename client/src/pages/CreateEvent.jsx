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
        <div className="create-event container">
            <h1>Create New Event</h1>

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
                        type="datetime-local"
                        id="event_date"
                        name="event_date"
                        value={formData.event_date}
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
                        min="1"
                    />
                </div>

                <div className="my-4 row">
                    <div className="col-sm-4">
                        <button className="btn btn-primary" type="submit">Create Event</button>
                    </div>
                    <div className="col-sm-8">
                        <Link className="btn btn-link link-danger" to="/admin">Cancel</Link>
                    </div>
                </div>


            </form>
        </div>
    );     
}

export default CreateEvent;

