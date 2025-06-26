// controllers/ticketController.js
const { centralTicketConnection } = require('../db/db')
const Ticket = require('../models/Ticket')(centralTicketConnection)

// Wyciąganie subdomeny
function getCompanyFromHost(req) {
	const host = req.headers.host
	const subdomain = host.split('.')[0]
	return subdomain === 'planopia' ? null : subdomain
}

exports.createTicket = async (req, res) => {
	const { topic, message } = req.body
	const attachments = req.files ? req.files.map(f => f.filename) : []
	const userEmail = req.user.username // masz email w username
	const company = req.body.frontendUrl || getCompanyFromHost(req)
	try {
		const ticket = await Ticket.create({
			company,
			userEmail,
			topic,
			status: 'Otwarte',
			messages: [{ sender: 'user', author: userEmail, content: message, files: attachments }],
		})
		// Możesz dodać wysyłkę powiadomienia email do siebie (admina)
		res.status(201).json({ message: 'Ticket created', ticket })
	} catch (err) {
		res.status(500).json({ error: 'Nie udało się utworzyć zgłoszenia' })
	}
}

exports.getMyTickets = async (req, res) => {
	const isAdmin = req.user.roles.includes('Admin')

	if (isAdmin) {
		// Admin widzi wszystkie tickety
		const tickets = await Ticket.find().sort({ createdAt: -1 })
		return res.json(tickets)
	}

	// Dla zwykłego użytkownika
	const company = req.body.frontendUrl || getCompanyFromHost(req)
	const userEmail = req.user.username

	const tickets = await Ticket.find({ company, userEmail }).sort({ createdAt: -1 })
	res.json(tickets)
}


exports.getAllTickets = async (req, res) => {
	if (!req.user.roles.includes('Admin')) return res.status(403).send('Brak uprawnień')
	const tickets = await Ticket.find().sort({ createdAt: -1 })
	res.json(tickets)
}

exports.replyToTicket = async (req, res) => {
	const { id } = req.params
	const { message } = req.body
	const attachments = req.files ? req.files.map(f => f.filename) : []
	const sender = req.user.roles.includes('Admin') ? 'admin' : 'user'

	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })

	// Ograniczenie widoczności (admin widzi wszystko, user tylko swój ticket)
	if (!req.user.roles.includes('Admin')) {
		if (ticket.userEmail !== req.user.username) {
			return res.status(403).json({ error: 'Brak uprawnień' })
		}
	}

	ticket.messages.push({
		sender,
		author: req.user.username,
		content: message,
		files: attachments, // obsługa plików do zrobienia
	})
	await ticket.save()

	// Tutaj możesz wysłać powiadomienie email do usera/admina

	res.json({ message: 'Odpowiedź dodana', ticket })
}

exports.updateTicketStatus = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	if (!req.user.roles.includes('Admin')) return res.status(403).send('Brak uprawnień')
	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })
	ticket.status = status
	await ticket.save()
	res.json({ message: 'Status updated', ticket })
}

exports.getTicketById = async (req, res) => {
	const { id } = req.params
	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })

	// Ograniczenie widoczności: admin widzi wszystko, user tylko swój ticket (i tylko w swojej firmie)
	if (!req.user.roles.includes('Admin')) {
		if (ticket.userEmail !== req.user.username) {
			return res.status(403).json({ error: 'Brak uprawnień' })
		}
		// Dodatkowo sprawdzamy firmę/subdomenę (dla bezpieczeństwa)
		const company = req.body.frontendUrl || getCompanyFromHost(req)
		if (ticket.company !== company) {
			return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
		}
	}

	res.json(ticket)
}
