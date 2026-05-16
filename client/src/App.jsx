import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Register from './pages/Register'

import './App.css'

function App() {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/events">Events</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
