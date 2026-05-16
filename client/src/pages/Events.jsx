import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import api from "../services/api";

function Events() {
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

  return (
    <div className="events">
      <h1>Events</h1>

      {error && <p className="error">{error}</p>}

      {events.map((event) => (
        <div key={event.id} className="event">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Location: {event.location}</p>
          <p>Spots remaining: {event.spots_remaining}</p>
          <Link to={`/events/${event.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Events;