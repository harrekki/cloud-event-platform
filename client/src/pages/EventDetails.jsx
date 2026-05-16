import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Unable to load event details.");
      }
    };

    fetchEvent();
  }, [id]);

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
      <p>Date: {event.event_date}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Registered: {event.registration_count}</p>
      <p>Spots remaining: {event.spots_remaining}</p>
    </div>
  );
}

export default EventDetails;