const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')
const { authenticateToken } = require('../middleware/authMiddleware') // Twój middleware JWT
const upload = require('../utils/fileUpload')


router.post('/create', authenticateToken, upload.array('attachments', 5), ticketController.createTicket)


router.get('/my-tickets', authenticateToken, ticketController.getMyTickets)


router.get('/all', authenticateToken, ticketController.getAllTickets)


router.get('/:id', authenticateToken, ticketController.getTicketById)


router.post('/:id/reply', authenticateToken, upload.array('attachments', 5), ticketController.replyToTicket)


router.patch('/:id/status', authenticateToken, ticketController.updateTicketStatus)

module.exports = router
