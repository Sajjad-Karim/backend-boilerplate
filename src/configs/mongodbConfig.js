require('dotenv').config({ quiet: true })
const mongoose = require('mongoose')
const { DB_NAME } = require('../constants')

const uri = process.env.MONGO_DB_URI

// Define optional Mongoose configurations
const configs = {
  strictQuery: true // Enables strict filtering (only query fields defined in schema are allowed)
}

const connect = async () => {
  try {
    // Connect to the MongoDB instance using the URI and DB name
    const connectionInstance = await mongoose.connect(`${uri}/${DB_NAME}`)

    // Apply additional configurations to Mongoose after connection
    for (const [key, value] of Object.entries(configs)) {
      mongoose.set(key, value)
    }
    console.log(`✅ MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`)
  } catch (err) {
    console.log('❌ MONGODB connection FAILED', err)

    // Exit process with failure (instead of unrelated process.getMaxListeners)
    process.exit(1)
  }
}

// Immediately call the connect function when file loads
connect()

// Export the Mongoose instance for use elsewhere in the app
module.exports = mongoose
