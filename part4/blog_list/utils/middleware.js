
const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ errors: ['Validation Error']})
  }
  if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
    return response
      .status(400)
      .json({ errors: ['this username is already taken'] })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

module.exports = {
  errorHandler
}