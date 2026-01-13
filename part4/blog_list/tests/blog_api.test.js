const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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
  },
]


const blogsInDB = async () => {
    const response = await Blog.find({})
    return response.map(blog => blog.toJSON())
}

const getUserToken = async () => {
    const response = await api
            .post('/api/login')
            .send({ username: 'root', password: 'secret' })
    return response.body.token
}

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    const savedUser = await user.save()

    initialBlogs.forEach(blog => {
        blog.user = savedUser._id
    })

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
        const token = await getUserToken()

        const newBlog = {
            title: "testBlog",
            author: "testAuthor",
            url: "example.com",
            likes: 5
        }

        const startBlogs = await blogsInDB()

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
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
        const token = await getUserToken()

        const newBlogWithoutLikes = {
            title: "blog without likes",
            author: "Withoutus Likus",
            url: "example.com/without_likes"
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlogWithoutLikes)
            .expect(201)
        
        assert.strictEqual(response.body.likes, 0)
    })

    test('when title or url is missing, respond with 400 on creation', async () => {
        const token = await getUserToken()

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
            .set('Authorization', 'Bearer ' + token)
            .send(blogWithoutTitle)

        assert.strictEqual(response.status, 400, 'adding blog without title')

        response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(blogWithoutUrl)

        assert.strictEqual(response.status, 400, 'adding blog without url')
    })

    test('when no token is provided, fails with 401 on creation', async () => {
        
        const newBlog = {
            title: "testBlog",
            author: "testAuthor",
            url: "example.com",
            likes: 5
        }

        // add the blog without user token
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

test('delete blog with id', async () => {
    const token = await getUserToken()

    const startBlogs = await blogsInDB()
    const blogToDelete = startBlogs[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(204)

    const endBlogs = await blogsInDB()

    const endIds = endBlogs.map(blog => blog.id)
    assert.ok(!endIds.includes(blogToDelete.id), 'id of deleted blog still in blogs')

    assert.strictEqual(endBlogs.length, startBlogs.length - 1)
})

describe('when updating a new blog', async () => {
    test('update blog successfuly by id', async () => {
        const updateBlog = {
            title: "updatedBlog",
            author: "updatedAuthor",
            url: "example.com/update",
            likes: 66
        }

        const startBlogs = await blogsInDB()
        const blogToUpdate = startBlogs[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)
            .expect(200)

        const endBlogs = await blogsInDB()

        assert.strictEqual(endBlogs.length, startBlogs.length)

        const updatedBlog = endBlogs.find(blog => {
            return blog.id.toString() === blogToUpdate.id.toString()
        })
        
        for (let key in updateBlog) {
            assert.strictEqual(updatedBlog[key], updatedBlog[key])
        }
    })

    test('update fails (404) when no blog is provided', async () => {
        await api.put('/api/blogs').expect(404)
    })
})


after(async () => {
    await mongoose.connection.close()
})