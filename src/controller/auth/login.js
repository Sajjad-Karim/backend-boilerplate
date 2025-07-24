const createHttpError = require('http-errors')

module.exports = async (req, res, next) => {
  try {
    console.log('Login Api Hit Successfully')
  } catch (error) {
    next(createHttpError(500, error.message))
  }
}
