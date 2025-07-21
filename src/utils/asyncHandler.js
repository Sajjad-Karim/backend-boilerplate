const createHttpError = require('http-errors')

/**
 * asyncHandler
 * ------------
 * A higher-order function that wraps asynchronous route handlers or middleware.
 * This allows errors thrown inside async functions to be automatically caught
 * and passed to Express's error handling middleware using `next()`.
 *
 * @param {Function} fn - The async route handler or middleware function to wrap
 * @returns {Function} A new function that executes `fn` and catches any errors
 */
const asyncHandler = fn => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    next(error.status ? error : createHttpError(500, error.message))
  }
}

module.exports = asyncHandler
