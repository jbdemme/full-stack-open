const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', '-blogs')

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  const user = request.user

  if (user.id.toString() === blog.user.toString()) {
    await blog.deleteOne()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'wrong userId'})
  }
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
