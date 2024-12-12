import React from 'react'

import { Link } from 'react-router-dom'

const BlogPost = ({blog}) => {
  return (
    <div className="blog">
        {/* <div className="blog-id">{blog.id}</div> */}
        <div className="blog-title">{blog.title}</div>
        <div className="blog-author-label">
            <label>Author:</label>
            <div>{blog.author}</div>
        </div>
        <div className="blog-createdDate">
            <label>Created:</label>
            <div>{blog.created_date}</div>
        </div>
        <div className="blog-modifiedDate">
            <label>Last Modified:</label>
            <div>{blog.modified_date}</div>
        </div>
        <div className="blog-body">{blog.body}</div>
        <div className="blog-likeCount">
            <label>Likes:</label>
            <div>{blog.likeCount}</div>
        </div>
    </div>
  )
}

export default BlogPost