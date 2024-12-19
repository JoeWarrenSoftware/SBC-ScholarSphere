import React, { useState } from 'react';
import api from '../api';
import BlogPost from './BlogPost';
import { useNavigate } from 'react-router-dom';

const BlogCreate = () => {
  const [blogTitle, setBlogTitle] = useState([]);
  const [blogBody, setBlogBody] = useState([]);
  const [error, setError] = useState('');

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
        setError('');
    }, 3000);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/post/add/', { title: blogTitle, text: blogBody });
      navigate('/');
    } catch (error) {
      console.error('Create post failed', error);
      displayError(error);
    }
  };

  return (
    <>
    <form className="blog-create" onSubmit={handleSubmit}>
      <h2>Create Blog Post</h2>
      <input
        type="string"
        placeholder="Title"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        value={blogBody}
        onChange={(e) => setBlogBody(e.target.value)}
        required
        rows="10"
        cols="50"
      />
      {error && <p>{error}</p>}
      <button type="submit">Create Post</button>
    </form>
    </>
  );
};

export default BlogCreate;
