import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({ 
      ...formData, 
      [event.target.name]: event.target.value, 
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/register', formData);

      login(response.data.user, response.data.token);
      navigate('/events');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register container">
      <h1>Register</h1>

      {error && <p className="error">{error}</p>}
      
      <form className="mt-3 w-50" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <div id="phone-text" className="form-text">
            Please enter numbers only (ex. 1112223333).
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={50}
            required
          />
          <div id="email-text" className="form-text">
            A unique email is required in order to receive a confirmation.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;