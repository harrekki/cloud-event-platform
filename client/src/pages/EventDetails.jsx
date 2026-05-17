import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Unable to load event details.");
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

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.eventDate}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Registered: {event.registration_count}</p>
      <p>Spots remaining: {event.spots_remaining}</p>
      {user ? (
        <button onClick={handleRegister}>
          Register for this event
        </button>
      ) : (
        <p>Please log in to register for this event.</p>
      )}
      
      {message && <p>{message}</p>}
    </div>
  );
}

export default EventDetails;