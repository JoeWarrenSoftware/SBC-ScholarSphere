import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profilePic, setProfilePic] = useState('');
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
      await api.post('/api/profile', { email: email, password: password, password2: password2, firstNameL: firstName, lastName: lastName,
        department: department, bio: bio, twitter: twitter, linkedIn: linkedIn, facebook: facebook, profilePic: profilePic
       });
      navigate('/profile');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div>
      <form className="profile" onSubmit={handleSubmit}>
      <h2>My Profile</h2>
      <input
        type="string"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <input
        type="string"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="string"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="string"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="string"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="string"
        placeholder="Twitter"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />
      <input
        type="string"
        placeholder="LinkedIn"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
      />
      <input
        type="string"
        placeholder="Facebook"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
      />
      <input
        type="string"
        placeholder="Profile Picture URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUser;
