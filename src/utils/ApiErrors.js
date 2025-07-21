// Define a custom error class extending the built-in Error
class ApiError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message) // Call the parent Error constructor with the message

    this.statusCode = statusCode // HTTP status code (e.g., 400, 404, 500)
    this.data = null // Optional payload, can be set later if needed
    this.message = message // Redundant but explicitly set message again
    this.success = false // API response success flag
    this.errors = errors // Array to hold detailed error messages (optional)

    if (stack) {
      this.stack = stack // Use custom stack trace if provided
    } else {
      Error.captureStackTrace(this, this.constructor) // Capture stack trace from current constructor
    }
  }
}

module.exports = ApiError
