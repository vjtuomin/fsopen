import React from 'react'

const Blog = ({ blog , deleteBLog }) => (
  <div>
    <p>{blog.title}</p>By: <p>{blog.author}</p>
    <button onClick={() => deleteBLog(blog.id)}>Delete</button>
  </div> 
)

export default Blog