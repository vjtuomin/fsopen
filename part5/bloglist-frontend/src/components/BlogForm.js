import React from 'react'
import { useState } from 'react' 

const BlogForm = ({ createBlog })  => { 
    const [newBlogtitle, setBlogtitle] = useState('')
    const [newBlogAuthor, setBlogAuthor] = useState('')
    const [newBlogUrl, setBlogUrl] = useState('')

    const handleAuthorChange = (event) => {
        setBlogAuthor(event.target.value)
      }
      const handleTitleChange = (event) => {
        setBlogtitle(event.target.value)
      }
      const handleUrlChange = (event) => {
        setBlogUrl(event.target.value)
      }
      const addBlog= async (event) => {
        event.preventDefault()
        const BlogObject = {
          title: newBlogtitle,
         author: newBlogAuthor,
         url: newBlogUrl
         
        }
      await  createBlog(BlogObject)
        setBlogAuthor('')
        setBlogUrl('')
        setBlogtitle('')
    }

      return (    
    <form onSubmit={addBlog}>
      <label>Title:</label>
      <input
        id='title'
        value={newBlogtitle}
        onChange={handleTitleChange}
        placeholder='insert title'
      />
      <br></br>
      <label>Author:</label>
      <input
        id='author'
        value={newBlogAuthor}
        onChange={handleAuthorChange}
        placeholder='insert author'
      />
      <br></br>
      <label>Url:</label>
      <input
      id='url'
        value={newBlogUrl}
        onChange={handleUrlChange}
        placeholder='insert url'
      />
      <br></br>
      <button id='submit' type="submit">save</button>
    </form>  
      )
}

export default BlogForm