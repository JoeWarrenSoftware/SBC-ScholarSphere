import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom'

const BlogPost = ({blog, showLike, showEdit, showDelete}) => {

const [error, setError] = useState('');
const [likeCount, setLikeCount] = useState(blog.likeCount || 0);

const formatDate = (date) => {
    const index = date.indexOf('T');
    if (index !== -1) {
        return date.substring(0, index);  // Return everything before 'T'
    }
    return date;
    };

const displayError = (message) => {
    setError(message);
    setTimeout(() => {
        setError('');
    }, 3000);
};

const handleDelete = async (e) => {
    e.preventDefault();

    try {
        console.log('Delete Post Begin');
        await api.delete('/post/delete/', { });
        navigate('/');
    } catch (error) {
        console.error('Delete post failed', error);
        displayError(error.message);
    }
    };

const handleLike = async (e) => {
    e.preventDefault();

    try {
        console.log('Like Begin');
        setLikeCount(prevCount => prevCount + 1)
    } catch (error) {
        console.error('Like post failed', error);
        displayError(error.message);
    }
    };

  return (
    <div className="blog">
        <div className="blog-title">
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </div>
        <div className="blog-info">
        <div className="blog-author">
            <label className="blog-author-label">Author:</label>
            <div>{blog.author}</div>
        </div>
        {blog.created_date && <div className="blog-createdDate">
            <label className="blog-createdDate-label">Created:</label>
            <div>{formatDate(blog.created_date)}</div>
        </div>}
        {blog.modified_date && <div className="blog-modifiedDate">
            <label className="blog-modifiedDate-label">Modified:</label>
            <div>{formatDate(blog.modified_date)}</div>
        </div>}
        </div>
        <div className="blog-body">{blog.text}</div>
        <div className="blog-controls">
            <label className='blog-likeCount-label'>Likes:</label>
            <div className='blog-likeCount-value'>{likeCount}</div>
            { showLike && <div className='blog-likeButton' title="Like Post">
                <Link onClick={handleLike}>👍</Link>
            </div>}
            { showEdit && <div className='blog-editButton' title="Edit Post">
                <Link to={`/blog/${blog.id}/edit`}>✏️</Link>
            </div>}
            { showDelete && <div className='blog-deleteButton' title="Delete Post">
                <Link onClick={handleDelete}>❌</Link>
            </div>}
        </div>
        {error && <p className='errorText'>{error}</p>}
    </div>
  )
}

export default BlogPost