import { useEffect, useState } from "react";
import api from "../services/api";
import Spinner from "../components/Spinner";
import { formatDateTime } from "../utils/dateUtils";

function MyEvents() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/registrations/my");
            setRegistrations(response.data.registrations);
        } catch (error) {
            console.error("Error fetching registrations:", error);
            setError("Unable to load your events.");
        } finally {
            setLoading(false);
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

    if(loading) {
        return <Spinner></Spinner>;
    }

    if (error) {
        return <p className="error alert alert-danger m-5" role="alert">{error}</p>;
    }

    return (
        <div className="my-events container">
            <h1 className="text-center">My Events</h1>

            {registrations.length === 0 ? (
                <div className="row" style={{height: "80vh"}}>
                    <div className="col-sm-12 text-center">
                        <p className="alert alert-primary w-50 mt-3 mx-auto" role="alert">You haven't registered for any events yet.</p>
                    </div>
                </div>
            ) : (
                <div className="d-sm-flex flex-wrap justify-content-center p-2">
                    {registrations.map((registration) => (
                        <div key={registration.id} className="event card bg-body-tertiary p-3 text-center m-3" style={{width: "40%"}}>
                            <div className="card-body d-flex flex-column justify-content-evenly align-items-center">
                                <h2 className="card-title">{registration.title}</h2>
                                <p className="card-text">{registration.description}</p>
                                <p className="card-subtitle text-body-secondary">{registration.location}</p>
                                <p className="card-subtitle text-body-secondary mb-4">{formatDateTime(registration.eventDate)}</p>
                                <button className="btn btn-sm btn-danger" onClick={() => handleCancel(registration.id)}>
                                    Cancel Registration
                                </button>
                            </div>
                        </div>
                    ))}
                </div>   
            )}
        </div>
    );
}

export default MyEvents;