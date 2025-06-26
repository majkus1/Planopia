const upload = require('../utils/fileUpload') // lub ścieżka do tego pliku
const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')
const auth = require('../middleware/authMiddleware') // Twój middleware JWT

// Tworzenie ticketa
router.post('/create', auth, upload.array('attachments', 5), ticketController.createTicket)

// Pobieranie ticketów klienta
router.get('/my-tickets', auth, ticketController.getMyTickets)

// Pobieranie wszystkich ticketów (admin)
router.get('/all', auth, ticketController.getAllTickets)

// Pobieranie ticketa po ID
router.get('/:id', auth, ticketController.getTicketById)

// Odpowiadanie na ticket
router.post('/:id/reply', auth, upload.array('attachments', 5), ticketController.replyToTicket)

// Zmiana statusu (admin)
router.patch('/:id/status', auth, ticketController.updateTicketStatus)


module.exports = router
