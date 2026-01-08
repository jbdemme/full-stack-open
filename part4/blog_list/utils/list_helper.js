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

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return 0
    }

    const authorLikes = {}
    let bestAuthor = blogs[0].author
    for (blog of blogs) {
        if (!(blog.author in authorLikes)) {
            authorLikes[blog.author] = 0
        }

        authorLikes[blog.author] += blog.likes

        if (authorLikes[bestAuthor] < authorLikes[blog.author]) {
            bestAuthor = blog.author
        }
    }

    return {
        author: bestAuthor,
        likes: authorLikes[bestAuthor]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}