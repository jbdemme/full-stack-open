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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}