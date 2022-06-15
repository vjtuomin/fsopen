import React, { useState, useEffect,useRef  } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogtitle, setBlogtitle] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [notif, setNotif] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
     setBlogs(blogs.sort((a, b) => (a.likes > b.likes) ? 1 : -1))
     
    ) 
     
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const deleteBlog = async (id) => {
   blogService.deleteBlog(id)
  .then(
    setBlogs(blogs.filter(blog => blog.id !== id ))
  )

  }

  const addBlog= async (BlogObject) => {
    
    
    try {
     
      const returnedBlog = await blogService.create(BlogObject)
 
        setBlogs(blogs.concat(returnedBlog))
        setNotif(`Blog: ${newBlogtitle} added succesfully`)
      
        setTimeout(() => {
          setBlogtitle('')
          setNotif(null)
        }, 5000) 
     
    } catch (exception) {
      setErrorMessage('Add values to all blog fields')
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
  }
}
  


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error message={errorMessage} />
        <form onSubmit={handleLogin}>
      <div>
          username
          <input
          id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
          id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button id='login' type="submit">login</button>
    </form>      
      </div>
    )
  }
 
  return (
    <div>
      
      <h2>blogs</h2>
      <Error message={errorMessage} />
      <Notification message={notif} />
      <p>{user.name} logged in</p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
      </Togglable>
      <button onClick={handleLogout}
      >logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBLog={deleteBlog} />
        

        
      )}
    </div>
  )
}

export default App
