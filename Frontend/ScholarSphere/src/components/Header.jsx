import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const { user } = useSession();

  /* Light/Dark Mode setting */
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };


  return (
    <header className="header">
      <div className="logo-container"> 
      <img  className="header-logo" alt="Logo" src="/assets/Logo12.png"  />
      </div>
      <div>
        <h1>Scholar Sphere</h1>
        <h2>THE BLOGGING SITE FOR ACADEMICS</h2>
      </div>
      <nav>
      <div className="nav-buttons">
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
        </div>
        <div className="theme-switcher">
        <label>🌞</label>
        <label>🌙</label>
          <label htmlFor="theme-switch" className="switch">
            <input 
              type="checkbox" 
              id="theme-switch" 
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>
    </header>
  );
};

export default Header;
