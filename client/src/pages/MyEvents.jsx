import { useEffect, useState } from "react";
import api from "../services/api";

function MyEvents() {
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState("");

    const fetchRegistrations = async () => {
        try {
            const response = await api.get("/registrations/my");
            setRegistrations(response.data.registrations);
        } catch (error) {
            console.error("Error fetching registrations:", error);
            setError("Unable to load your events.");
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleCancel = async (registrationId) => {
        try {
            await api.delete(`/registrations/${registrationId}`);
            fetchRegistrations();
        } catch (error) {
            console.error("Error canceling registration:", error);
            setError("Unable to cancel registration.");
        }
    };

    return (
        <div className="my-events">
            <h1>My Events</h1>

            {error && <p className="error">{error}</p>}

            {registrations.length === 0 ? (
                <p>You haven't registered for any events yet.</p>
            ) : (
                registrations.map((registration) => (
                    <div key={registration.id}>
                        <h2>{registration.title}</h2>
                        <p>{registration.description}</p>
                        <p>{registration.location}</p>
                        <p>{registration.eventDate}</p>
                        <button onClick={() => handleCancel(registration.id)}>
                            Cancel Registration
                        </button>
                    </div>
                ))   
            )}
        </div>
    );
}

export default MyEvents;