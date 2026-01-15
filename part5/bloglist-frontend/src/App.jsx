import { useState, useEffect, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const changeVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(props.ref, () => {
    return { changeVisibility }
  })

  return (
    <div>
      <div style={{display: visibility ? 'none' : ''}}>
        <button onClick={changeVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{display: visibility ? '' : 'none'}}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ content:null, type: null })

  const newBlogToggle = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async newBlog => {

    const returnedBlog = await blogService.create(newBlog)

    setBlogs(blogs.concat(returnedBlog))

    newBlogToggle.current.changeVisibility()

    setMessage({
      content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      type: 'info'
    })
    setTimeout(() => {
      setMessage({content: null, ...message})
    }, 3000)
  }

  const handleLike = async (blog) => {
    const updatedBlog ={...blog, likes: blog.likes + 1}
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))

    await blogService.update(updatedBlog)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
    const user = await loginService.login({username, password})

    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    blogService.setToken(user.token)
    setUser(user)
    } catch (e) {
      console.log(e)
      setMessage({
        content: e.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setMessage({content: null, ...message})
      }, 3000)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = async event => {
    event.preventDefault()
    console.log('loggin out')

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.content} type={message.type}/>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={ username }
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={ password }
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type='submit'> Log in </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.content} type={message.type}/>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={newBlogToggle}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)}/>
        )}
      </div>
    </div>
  )
}

export default App