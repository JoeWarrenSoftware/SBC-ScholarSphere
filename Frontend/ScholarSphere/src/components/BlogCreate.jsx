import React, { useState } from 'react';
import api from '../api';
import BlogPost from './BlogPost';
import { useNavigate } from 'react-router-dom';

const BlogCreate = () => {
  const [blogTitle, setBlogTitle] = useState([]);
  const [blogBody, setBlogBody] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
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
      displayError(error.message);
    }
  };

  return (
    <div className="content">
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
        rows="20"
        cols="50"
      />
      {error && <p className='errorText'>{error}</p>}
      <button type="submit">Create Post</button>
    </form>
    </div>
  );
};

export default BlogCreate;
