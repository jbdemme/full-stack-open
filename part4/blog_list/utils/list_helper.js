const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sumLikes, blog) => {
            return sumLikes + blog.likes
        }, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    return blogs.reduce((mostLikedBlog, currentBlog) => {
         return mostLikedBlog.likes < currentBlog.likes 
            ? currentBlog
            : mostLikedBlog
    })
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    const blogsWritten = {}
    let bestAuthor = blogs[0].author
    for (blog of blogs) {
        if (!(blog.author in blogsWritten)) {
            blogsWritten[blog.author] = 0
        }
        
        blogsWritten[blog.author] ++

        if (blogsWritten[bestAuthor] < blogsWritten[blog.author]) {
            bestAuthor = blog.author
        }
    }

    return {
        author: bestAuthor,
        blogs: blogsWritten[bestAuthor]
    }
}

mostBlogs([
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
        ])

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}