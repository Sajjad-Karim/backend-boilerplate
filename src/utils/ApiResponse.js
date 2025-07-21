// Define a standard API response class to format success responses
class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode // HTTP status code (e.g., 200, 201, etc.)
    this.data = data // Payload or result data of the API response
    this.message = message // Human-readable success message
    this.success = statusCode < 400 // Boolean indicating if the response is successful (true if statusCode < 400)
  }
}

module.exports = ApiResponse
