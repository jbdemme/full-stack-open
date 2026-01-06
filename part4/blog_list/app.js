const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')
const BlogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error)
  })

app.use(express.json())

app.use('/api/blogs', BlogsRouter)

module.exports = app