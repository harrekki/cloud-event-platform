import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

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
      <header className="mb-auto">
        <nav className="navbar navbar-expand-lg border-bottom mb-3">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/events" className="nav-link">Events</Link>
                </li>
                {user &&
                  <li className="nav-item">
                    <Link to="/my-events" className="nav-link">My Events</Link>
                  </li> 
                }
                {user?.role === 'admin' && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">Admin</Link>
                  </li>
                )}

                {!user && ( 
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">Register</Link>
                    </li>
                  </>
                )}
              </ul>
              {user && (
                <div className="d-flex">
                    <span className="navbar-text">Logged in as {user.lastName + ", " + user.firstName}&nbsp;&nbsp;</span>
                    <button className="btn btn-link" type="button" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          
          <Route 
            path="/my-events" 
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/events/new" 
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            } 
          />

          <Route 
            path="/admin/events/:id/edit" 
            element={
              <AdminRoute>
                <EditEvent />
              </AdminRoute>
            } 
          />
        </Routes>
      </main>

      <footer className="footer mt-4 py-3 bg-dark text-light">
        <div className="container px-4">
          <div className="row text-center">
            <p class="my-2">
              <small>Copyright &copy; 2026. All rights reserved.&nbsp; 
                <a href="https://www.davidlarocco.dev" target="_blank" className="link-light link-underline-opacity-50-hover">
                  David LaRocco
                </a>.</small>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
