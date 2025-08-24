// db.js
const mongoose = require('mongoose')
require('dotenv').config()


const firmDb = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


const centralTicketConnection = mongoose.createConnection(process.env.MONGO_URI_TICKETS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


module.exports = { firmDb, centralTicketConnection }
