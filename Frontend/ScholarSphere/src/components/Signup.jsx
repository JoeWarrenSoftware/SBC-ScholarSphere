import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

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
      await api.post('/signup/', { username: username, email: email, password: password, first_name: firstName, last_name: lastName});
      displayStatus('Account Created Successfully!')
      /* navigate('/profile'); */
    } catch (error) {
      console.error('Signup failed', error);
      displayError(error.message);
    }
  };

  return (
    <>
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Account Registration</h2>
      <input
        type="string"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="string"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="string"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
      {error && <p className='errorText'>{error}</p>}
      {status && <p className='statusText'>{status}</p>}
      <button type="submit">Create Account</button>
    </form>
    <div>
      <label>Already registered?</label>
      <a href="/login">Login Here</a>
    </div>
    </>
  );
};

export default Signup;
