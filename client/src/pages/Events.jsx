import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if(loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p className="error alert alert-danger m-5" role="alert">{error}</p>;
  }

  if(events.length === 0) {
    return <p className="alert alert-primary m-5" role="alert">There are currently no events scheduled.</p>;
  }

  return (
    <div className="events text-center px-5">
      <h1 className="mb-3">Events</h1>

      <div className="d-sm-flex flex-wrap justify-content-center p-2">
       
        {events.map((event) => (
          <div key={event.id} className="event card bg-body-tertiary p-3 text-center m-3" style={{width: "40%"}}>
            <div className="card-body d-flex flex-column justify-content-evenly align-items-center">
              <h4 className="card-title">{event.title}</h4>
              <p className="card-text">{event.description}</p>
              <p className="card-subtitle text-body-secondary">Location: {event.location}</p>
              <p className="card-subtitle text-body-secondary mb-3">Spots remaining: {event.spots_remaining}</p>
              <Link className="card-link btn btn-primary w-50" to={`/events/${event.id}`}>View Details</Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Events;