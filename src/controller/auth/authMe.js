const createHttpError = require('http-errors')

module.exports = async (req, res, next) => {
  try {
    console.log('check session api hit successfully')
  } catch (error) {
    next(createHttpError(500, error.message))
  }
}
