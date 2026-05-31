import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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
      setSaving(true);

      const response = await api.post('/auth/login', formData);

      login(response.data.user, response.data.token);
      navigate('/events');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="login container mt-5" style={{height: "80vh"}}>
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>Login</h1>

          {error && <p className="error">{error}</p>}
      
          <form className="mt-3 p-5 border border-secondary-subtle rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
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

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 
                (<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>) : 
                "Login"
              }
            </button>
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  );
}

export default Login;