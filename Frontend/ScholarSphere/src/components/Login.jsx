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
  const navigate = useNavigate();

  const { setUser } = useSession();

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
    }
  };

  return (
    <>
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
      <button type="submit">Login</button>
    </form>
    <div>
      <label>Need an account?</label>
      <a href='/signup'>Create Account Here</a>
    </div>
    </>
  );
};

export default Login;
