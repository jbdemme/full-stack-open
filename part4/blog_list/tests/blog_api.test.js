const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const BlogsRouter = require('../controllers/blogs')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const blogsInDB = async () => {
    const response = await Blog.find({})
    return response.map(blog => blog.toJSON())
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('JSON format and length of all blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('is unique identifier property named "id"', async () => {
    
    const blogs = await blogsInDB()


    assert(blogs.every(blog => 'id' in blog), 'not every blog has an id')

    const ids = blogs.map(blog => blog.id)
    assert.strictEqual(new Set(ids).size, blogs.length, 'ids are not unique')
})

describe('when creating a new blog', () => {
    test('create new blog', async () => {

        const newBlog = {
            title: "testBlog",
            author: "testAuthor",
            url: "example.com",
            likes: 5
        }

        const startBlogs = await blogsInDB()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const endBlogs = await blogsInDB()

        assert.strictEqual(startBlogs.length, endBlogs.length - 1)

        for (let key in newBlog) {
            const values = endBlogs.map(blog => blog[key])
            assert.ok(values.includes(newBlog[key]), 
                `${key} is not right when added`)
        }
    })

    test('likes property defaults to 0', async () => {
        const newBlogWithoutLikes = {
            title: "blog without likes",
            author: "Withoutus Likus",
            url: "example.com/without_likes"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)
        
        assert.strictEqual(response.body.likes, 0)
    })

    test('when title or url is missing, respond with 400 on creation', async () => {
        const newBlog = {
            title: "testBlog",
            author: "testAuthor",
            url: "example.com",
            likes: 5
        }

        const { title, ...blogWithoutTitle } = newBlog
        const { url, ...blogWithoutUrl } = newBlog

        let response = await api
            .post('/api/blogs')
            .send(blogWithoutTitle)

        assert.strictEqual(response.status, 400, 'adding blog without title')

        response = await api
            .post('/api/blogs')
            .send(blogWithoutUrl)

        assert.strictEqual(response.status, 400, 'adding blog without url')
    })

})

after(async () => {
    await mongoose.connection.close()
})