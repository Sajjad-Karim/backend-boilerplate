const util = require('util')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Set max file size to 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Define upload directory
const uploadDir = './public/temp'

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save file to ./public/temp
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Rename file with current timestamp and original extension
    const FILE_NAME = `${Date.now()}${path.extname(file.originalname)}`
    cb(null, FILE_NAME)
  }
})

/**
 * Utility function to check if the uploaded file is of an allowed image type.
 * Only allows JPEG, JPG, PNG, and GIF.
 */
function checkFileType(file, next) {
  const allowedTypes = /jpeg|jpg|png|gif/

  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) return next(null, true)

  return next({
    code: 400,
    message: 'Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'
  })
}

// Create the Multer middleware
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('file')

// Export middleware as a promise for use with async/await
module.exports = util.promisify(uploadFile)
