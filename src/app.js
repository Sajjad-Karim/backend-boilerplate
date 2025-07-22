require('dotenv').config({ quiet: true })
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const createHttpError = require('http-errors')

const app = express()

// Database configuration
require('../src/configs/mongodbConfig')

// CORS configuration: allows all origins (adjust for production)
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Logger middleware: logs incoming HTTP requests
app.use(logger('dev'))

// Parse incoming JSON and store raw body (for verification, e.g., webhook)
app.use(
  express.json({
    verify: (req, res, buffer) => {
      req.rawBody = buffer.toString() // Store raw body as string
    }
  })
)

// Parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: false }))

// Serve static files from the "public" directory
app.use(express.static('public'))

// Parse cookies attached to requests
app.use(cookieParser())

// ROUTES should be defined here (before error handlers)

// 404 handler - catch undefined routes
app.use((req, res, next) => {
  next(createHttpError(404, 'Not Found'))
})

// Error handler middleware
app.use((err, req, res, next) => {
  // Set locals only in development mode
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Respond with error status and message
  res.status(err.status || 500).json({ error: err.message })
})

// Export the app for use in other files (e.g., for starting server in bin/www)
module.exports = app
