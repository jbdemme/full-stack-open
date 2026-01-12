const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const errors = []

  if (!username || username.length <= 3) {
    errors.push('expected `username` to be at least 3 characters long')
  }

  if (!password || password.length <= 3) {
    errors.push('expected `password` to be at least 3 characters long')
  }

  if (errors.length > 0) {
    return response.status(400).json({ errors })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User ({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = usersRouter