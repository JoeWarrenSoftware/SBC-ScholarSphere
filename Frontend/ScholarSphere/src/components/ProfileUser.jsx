import React, { useState, useEffect } from 'react';
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

useEffect(() => {
  const fetchProfile = async () => {
    try {

      const user = localStorage.getItem('user');
      console.log('fetch profile detail for User: ', user);

      const response = await api.get(`/profile/${user}/`);

      console.log('profile', response.data);

      setUsername(response.data.username || '');
      setEmail(response.data.email || '');
      setFirstName(response.data.first_name || '');
      setLastName(response.data.last_name || '');
      setDepartment(response.data.department || '')
      setBio(response.data.bio || '');
      setTwitter(response.data.twitter || '');
      setLinkedIn(response.data.linkedIn || '');
      setFacebook(response.data.facebook || '');
      setProfilePic(response.data.profile_pic_url || '');
      /* displayStatus('Profile Loaded Successfully!') */
    } catch (error) {
      console.error('Failed to fetch profile', error);
      displayError(error.message)
    }
  };

  fetchProfile();

}, []);

  const updateProfile = async (e) => {
    try {

      e.preventDefault()
      const user = localStorage.getItem('user');
      console.log('update profile detail for User: ', user);

      const response = await api.put(`/update_profile/${user}/`,
        { username: username,
          email: email,
          first_name: firstName,
          last_name: lastName,
          department: department,
          bio: bio,
          twitter: twitter,
          linkedIn: linkedIn,
          facebook: facebook,
          profile_pic_url: profilePic });

      console.log('update profile response', response.data);

      displayStatus('Profile Updated Successfully!')
    } catch (error) {
      console.error('Failed to update profile', error);
      displayError(error.message)
  }}

  const validatePassword = () => {
    if (password !== password2) {
        displayError('Passwords do not match');
        return false;
    }
    return true;
    };

  return (
    <div>
      <form className="profile" onSubmit={updateProfile}>
      <h2>My Profile</h2>
      <label>Username</label>
      <input
        type="string"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>First Name</label>
      <input
        type="string"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>Last Name</label>
      <input
        type="string"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label>Department</label>
      <input
        type="string"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <label>Bio</label>
      <input
        type="string"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <label>X / Twitter:</label>
      <input
        type="url"
        placeholder="Twitter"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />
      <label>LinkedIn</label>
      <input
        type="url"
        placeholder="LinkedIn"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
      />
      <label>Facebook</label>
      <input
        type="url"
        placeholder="Facebook"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
      />
      <label>Profile Picture URL</label>
      <input
        type="url"
        placeholder="Profile Picture URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
      />
      <button type="submit">Update Profile</button>
      </form>
      {error && <p className='errorText'>{error}</p>}
      {status && <p className='statusText'>{status}</p>}
    </div>
  );
};

export default ProfileUser;
