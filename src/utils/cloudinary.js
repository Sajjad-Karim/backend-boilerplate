const cloudinary = require('cloudinary').v2
const fs = require('fs')

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const uploadOnCloudinary = async localFilePath => {
  try {
    // If no file path is provided, exit early
    if (!localFilePath) return null
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto' // Automatically detect file type (image, video, etc.)
    })
    //need to remove after uploading on cloud
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath)
    }

    console.log('File is uploaded on Cloudinary:', response.url)

    return response
  } catch (error) {
    // If upload fails, attempt to delete the local file to avoid disk clutter
    try {
      fs.unlinkSync(localFilePath) // Attempt to delete the local temp file
    } catch (err) {
      // If file deletion fails, log the error but do not crash the app
      console.error('Failed to delete local file:', err)
    }
    console.error('Cloudinary upload failed:', error)

    return null
  }
}

module.exports = uploadOnCloudinary
