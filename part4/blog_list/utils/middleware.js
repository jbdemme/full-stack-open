
const errorHandler = (error, request, response, next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
    return response
      .status(400)
      .json({ errors: ['this username is already taken'] })
  }
}

module.exports = {
  errorHandler
}