import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import BlogPost from './BlogPost';

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {

        console.log('fetch blog detail for ID ', id);

        const response = await api.get(`/post/get/${id}/`);

        console.log('blog', response.data);

        setBlog(response.data);
      } catch (error) {
        console.error('Failed to fetch blog', error);
      }
    };

    fetchBlog();

  }, []);

  return (
    <div>
      <h2>Blog Post Display</h2>
      { blog && <div className="blog-list">
          <BlogPost blog={blog} showLike={true} showEdit={true} showDelete={true}/>
      </div>}
      { !blog && <div>Loading...</div>}
    </div>
  );
};

export default BlogDetails;
