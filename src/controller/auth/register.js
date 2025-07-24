const createHttpError = require('http-errors')

module.exports = async (req, res, next) => {
  try {
    console.log('Register Api Hit Sccessfully')
  } catch (error) {
    next(createHttpError(500, error.message))
  }
}
