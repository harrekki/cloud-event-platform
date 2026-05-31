import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/events/${id}`);
      // const response = await api.get(`/events/9`);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Unable to load event details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const response = await api.post(`/registrations`, {
        eventId: event.id,
      });

      setMessage(response.data.message);
      await fetchEvent();
    } catch (error) {
      console.error("Error registering for event:", error);
      setMessage(error.response?.data?.message || "Unable to register for event.");
    } 
  };

  if(loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p className="error alert alert-danger m-5" role="alert">{error}</p>;
  }

  if (!event) {
    return <p className="alert alert-warning m-5" role="alert">Event not found</p>;
  }

  return (
    <div className="event-details container">
      <div className="row">
        <h1 className="text-center mb-3">Event Details</h1>
      </div>
      
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{event.title}</h2>
              <hr />
              <div className="p-3">
                <h6 className="card-subtitle text-body-secondary mb-4">
                  {event.description}
                </h6>
                <p className="card-text"><b>Location:</b> {event.location}</p>
                <p className="card-text"><b>Date:</b> {event.eventDate}</p>
                <p className="card-text"><b>Capacity:</b> {event.capacity}</p>
                <p className="card-text"><b>Registered:</b> {event.registration_count}</p>
                <p className="card-text mb-4"><b>Spots remaining:</b> {event.spots_remaining}</p>
                {user ? (
                  <div className="text-center">
                    <button className="btn btn-primary w-50" onClick={handleRegister}>
                      Register for this event
                    </button>
                  </div>
                ) : (
                  <p className="alert alert-primary" role="alert">
                    Please log in to register for this event.
                  </p>
                )}

                {message && <p className="alert alert-warning" role="alert">{message}</p>}
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
      
    </div>
  );
}

export default EventDetails;