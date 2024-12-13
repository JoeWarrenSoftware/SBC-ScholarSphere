import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useSession } from '../contexts/SessionContext';

const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const { user } = useSession();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };


  return (
    <header className="header">
      <div className="logo-container"> 
      <img  className="header-logo" alt="Logo" src="/assets/Logo10.png" style={{ width: '40%' }} />
      </div>
      <div>
        <h1>Scholar Sphere</h1>
        <h2>THE BLOGGING SITE FOR ACADEMICS</h2>
      </div>
      <nav>
        <Link to="/">All Blogs</Link>
        {token ? (
          <>
            <Link to="/profile">{user.name}'s Blogs</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
