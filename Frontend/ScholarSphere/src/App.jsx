import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import ProfileUser from './components/ProfileUser';
import ProfileDetails from './components/ProfileDetails';

import useLocalStorage from './helpers/useLocalStorage';
import { SessionProvider } from './contexts/SessionContext';
import { useState } from 'react'

import './App.css'

function App() {

  const [theme, setTheme] = useLocalStorage(
    "theme",
    'dark'
  );

  return (
    <div>
      <SessionProvider>
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </SessionProvider>
    </div>
  )
}

export default App
