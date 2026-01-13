const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const UsersRouter = require('../controllers/users')

const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

describe('user api', () => {
  beforeEach(async () => {
      await User.deleteMany()

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })
  test('POST /api/users validation errors', async (t) => {
    const testCases = [
      {
        name: 'username too short',
        user: { username: 'jd', name: 'jonathan', password: 'sekret'},
        expectedError: 'expected `username` to be at least 3 characters',
      },
      {
        name: 'password too short',
        user: { username: 'jbdemme', name: 'jonathan', password: 'sk'},
        expectedError: 'expected `password` to be at least 3 characters'
      },
      {
        name: 'username already taken',
        user: { username: 'root', name: 'jonathan', password: 'skol'},
        expectedError: 'this username is already taken'
      },
    ]

    for (const tc of testCases) {
      await t.test(tc.name, async () => {
        console.log(tc.name)
        const usersAtStart = await usersInDb()
        console.log('new User', tc.user)

        const response = await api
          .post('/api/users')
          .send(tc.user)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)

        const errors = response.body.errors
        assert.ok(errors.some(e => e.includes(tc.expectedError)))
        
      })
    }
  })
  
})

after(async () => {
    await mongoose.connection.close()
})