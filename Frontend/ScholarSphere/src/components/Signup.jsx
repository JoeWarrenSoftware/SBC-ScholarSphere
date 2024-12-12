import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
        setError('');
    }, 3000);
};

  const validatePassword = () => {
    if (password !== password2) {
        displayError('Passwords do not match');
        return false;
    }
    return true;
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // run any validation checks
    if (!validatePassword()) {
        return;
    }

    try {
      await api.post('/api/signup', { username: userName, email: email, password: password, password2: password2 });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
