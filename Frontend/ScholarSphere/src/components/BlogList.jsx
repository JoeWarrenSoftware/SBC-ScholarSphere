import React, { useState, useEffect } from 'react';
import api from '../api';
import BlogPost from './BlogPost';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/post/');

        console.log('blogs', response.data);


        const fetchedBlogs = response.data.data;
        // Sort blogs by descending ID
        fetchedBlogs.sort((a, b) => b.id - a.id);

        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>ALL BLOGS</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <BlogPost key={blog.id} blog={blog} showLike={true} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
