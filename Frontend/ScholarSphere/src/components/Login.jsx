import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';

const defaultUser = {
  username: '',
  password: '',
};

const Login = () => {
  const [username, setUsername] = useState(defaultUser.username);
  const [password, setPassword] = useState(defaultUser.password);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const { setUser } = useSession();

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
        setError('');
    }, 3000);
};

  const displayStatus = (message) => {
    setStatus(message);
    setTimeout(() => {
        setStatus('');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login/', { username: username, password: password });
      const data = response.data;

      // Update the user in the context
      setUser({
        name: data.data.name,
        id: data.data.id,
      });

      console.log('Login response', data);
      localStorage.setItem('authToken', data.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      displayError(error.message);
    }
  };

  return (
    <div className="content">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="string"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className='errorText'>{error}</p>}
      {status && <p className='statusText'>{status}</p>}
      <button type="submit">Login</button>
    </form>
    <div className='already-registered-container'>
      <label className='already-registered'>Need an account?</label>
        <div className='nav-buttons'>
          <a href='/signup'>Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
