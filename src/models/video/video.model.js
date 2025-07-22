const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //cloudinary Url
      required: true
    },
    thumbnail: {
      type: String, //cloudinary Url
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number, //cloudinary Url
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const Video = mongoose.model('Video', videoSchema)
module.exports = Video
