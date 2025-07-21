require('dotenv').config()
const mongoose = require('mongoose')
const { DB_NAME } = require('../../constants')

const uri = process.env.MONGO_DB_URI
const configs = {
  strictQuery: true
}

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${uri}/${DB_NAME}`)
    for (const [key, value] of Object.entries(configs)) mongoose.set(key, value)
    console.log(`MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`)
  } catch (err) {
    console.log('MONGODB connection FAILED ', err)
    process.getMaxListeners(1)
  }
}
connect()
module.exports = mongoose
