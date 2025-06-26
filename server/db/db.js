// db.js
const mongoose = require('mongoose')
require('dotenv').config()

// Baza główna (firmowa)
const firmDb = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Centralna baza ticketów
const centralTicketConnection = mongoose.createConnection(process.env.MONGO_URI_TICKETS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Exportuj oba połączenia
module.exports = { firmDb, centralTicketConnection }
