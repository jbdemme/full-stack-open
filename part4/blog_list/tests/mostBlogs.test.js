const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs

describe('mostBlogs', () => {

    const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]

    const biggerList = [
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
        }
    ]

    test('of empty list is null', () => {
        assert.strictEqual(mostBlogs([]), null)
    })

    test('when list has only one blog, equals the author of this blog', () => {
        assert.deepStrictEqual(
            mostBlogs(listWithOneBlog), 
            {
                author: listWithOneBlog[0].author,
                blogs: 1
            }
        )
    })

    test('of a bigger list is returning the author with the most blogs', () => {
        assert.deepStrictEqual(
            mostBlogs(biggerList), 
            {
                author: "Edsger W. Dijkstra",
                blogs: 2
            }
        )
    })
})