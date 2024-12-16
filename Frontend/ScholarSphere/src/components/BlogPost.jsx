import React from 'react'

import { Link } from 'react-router-dom'

const BlogPost = ({blog}) => {

const formatDate = (date) => {
    const index = date.indexOf('T');
    if (index !== -1) {
        return date.substring(0, index);  // Return everything before 'T'
    }
    return date;
    };

  return (
    <div className="blog">
        <div className="blog-title">{blog.title}</div>
        <div className="blog-info">
        <div className="blog-author">
            <label className="blog-author-label">Author:</label>
            <div>{blog.author}</div>
        </div>
        <div className="blog-createdDate">
            <label className="blog-createdDate-label">Created:</label>
            <div>{formatDate(blog.created_date)}</div>
        </div>
        <div className="blog-modifiedDate">
            <label className="blog-modifiedDate-label">Modified:</label>
            <div>{formatDate(blog.modified_date)}</div>
        </div>
        </div>
        <div className="blog-body">{blog.body}</div>
        <div className="blog-likeCount">
            <label className='blog-likeCount-label'>Likes:</label>
            <div>{blog.likeCount}</div>
        </div>
    </div>
  )
}

export default BlogPost