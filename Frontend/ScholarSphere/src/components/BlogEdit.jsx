import React, { useState, useEffect } from 'react';
import api from '../api';
import BlogPost from './BlogPost';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const BlogEdit = () => {
  const [blog, setBlog] = useState([]);
  const [blogTitle, setBlogTitle] = useState([]);
  const [blogBody, setBlogBody] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {

        console.log('fetch blog detail for ID ', id);

        const response = await api.get(`/post/get/${id}/`);

        console.log('blog', response.data);

        setBlog(response.data);
        setBlogTitle(response.data.title)
        setBlogBody(response.data.text)
      } catch (error) {
        console.error('Failed to fetch blog', error);
      }
    };

    fetchBlog();

  }, []);

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
      console.error('Edit post failed', error);
      displayError(error.message);
    }
  };

  return (
    <>
    <form className="blog-edit" onSubmit={handleSubmit}>
      <h2>Edit Blog Post</h2>
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
      <button type="submit">Edit Post</button>
    </form>
    </>
  );
};

export default BlogEdit;
