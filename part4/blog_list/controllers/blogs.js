const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', '-blogs')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request.body

  const user = await User.findById(userId)

  if (!user) {
    return response.status(400).json({ errors: ['userId missing or invalid'] })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.title = title
  blogToUpdate.author = author
  blogToUpdate.url = url
  blogToUpdate.likes = likes

  await blogToUpdate.save()

  response.status(200).json(blogToUpdate)

})

module.exports = blogsRouter
