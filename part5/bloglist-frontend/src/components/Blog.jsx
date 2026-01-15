import {useState} from 'react'

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const changeVisibility = () => {
    setShowDetails(!showDetails)
  }

  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>

      <div>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      <div style={{ display: showDetails ? '' : 'none'}}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
      </div>
    </div>
  )
}

export default Blog