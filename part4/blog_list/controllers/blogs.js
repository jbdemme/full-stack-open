const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')


BlogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

BlogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(err) {
    if (err.name === 'ValidationError') {
      response.status(400).end()
    }
  }
})

module.exports = BlogsRouter
