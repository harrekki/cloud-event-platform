import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';

import './App.css'

function App() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/events">Events</Link> |{" "}
        {user && <Link to="/my-events">My Events</Link>}

          {user ? ( 
            <>
              <span>Logged in as {user.lastName + ", " + user.firstName}</span> |{" "}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
             <>
               <Link to="/login">Login</Link> |{" "}
               <Link to="/register">Register</Link>
             </>
          )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
