// controllers/ticketController.js
const { centralTicketConnection } = require('../db/db')
const Ticket = require('../models/Ticket')(centralTicketConnection)
const { firmDb } = require('../db/db')
const Team = require('../models/Team')(firmDb)

function getCompanyFromHost(req) {
	const host = req.headers.host
	const subdomain = host.split('.')[0]
	return subdomain === 'planopia' ? null : subdomain
}

exports.createTicket = async (req, res) => {
	const { topic, message } = req.body
	const attachments = req.files ? req.files.map(f => f.filename) : []
	const userEmail = req.user.username
	const teamId = req.user.teamId
	
	try {
		let company
		
		if (teamId) {
			const team = await Team.findById(teamId)
			if (!team) {
				return res.status(404).json({ error: 'Zespół nie został znaleziony' })
			}
			company = team.name
		} else {
			company = req.body.frontendUrl || getCompanyFromHost(req)
		}

		const ticket = await Ticket.create({
			company,
			userEmail,
			topic,
			status: 'Otwarte',
			messages: [{ sender: 'user', author: userEmail, content: message, files: attachments }],
		})
		
		res.status(201).json({ message: 'Ticket created', ticket })
	} catch (err) {
		res.status(500).json({ error: 'Nie udało się utworzyć zgłoszenia' })
	}
}

exports.getMyTickets = async (req, res) => {
	const userEmail = req.user.username
	const teamId = req.user.teamId
	const isAdmin = req.user.roles.includes('Admin')

	if (userEmail === 'michalipka1@gmail.com') {
		const tickets = await Ticket.find().sort({ createdAt: -1 })
		return res.json(tickets)
	}

	if (teamId) {
		const team = await Team.findById(teamId)
		if (team) {
			if (isAdmin) {
				const tickets = await Ticket.find({ company: team.name }).sort({ createdAt: -1 })
				return res.json(tickets)
			}
			const tickets = await Ticket.find({ company: team.name, userEmail }).sort({ createdAt: -1 })
			return res.json(tickets)
		}
	}

	const company = req.body.frontendUrl || getCompanyFromHost(req)
	if (isAdmin) {
		const tickets = await Ticket.find({ company }).sort({ createdAt: -1 })
		return res.json(tickets)
	}
	const tickets = await Ticket.find({ company, userEmail }).sort({ createdAt: -1 })
	res.json(tickets)
}

exports.getAllTickets = async (req, res) => {
	if (!req.user.roles.includes('Admin')) return res.status(403).send('Brak uprawnień')
	
	const userEmail = req.user.username
	const teamId = req.user.teamId

	if (userEmail === 'michalipka1@gmail.com') {
		const tickets = await Ticket.find().sort({ createdAt: -1 })
		return res.json(tickets)
	}

	if (teamId) {
		const team = await Team.findById(teamId)
		if (team) {
			const tickets = await Ticket.find({ company: team.name }).sort({ createdAt: -1 })
			return res.json(tickets)
		}
	}

	const company = req.body.frontendUrl || getCompanyFromHost(req)
	const tickets = await Ticket.find({ company }).sort({ createdAt: -1 })
	res.json(tickets)
}

exports.replyToTicket = async (req, res) => {
	const { id } = req.params
	const { message } = req.body
	const attachments = req.files ? req.files.map(f => f.filename) : []
	const sender = req.user.roles.includes('Admin') ? 'admin' : 'user'
	const userEmail = req.user.username
	const teamId = req.user.teamId

	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })

	if (userEmail !== 'michalipka1@gmail.com') {
		if (!req.user.roles.includes('Admin')) {
			if (ticket.userEmail !== userEmail) {
				return res.status(403).json({ error: 'Brak uprawnień' })
			}
		}
		
		if (teamId) {
			const team = await Team.findById(teamId)
			if (team && ticket.company !== team.name) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		} else {
			const company = req.body.frontendUrl || getCompanyFromHost(req)
			if (ticket.company !== company) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		}
	}

	ticket.messages.push({
		sender,
		author: userEmail,
		content: message,
		files: attachments,
	})
	await ticket.save()

	res.json({ message: 'Odpowiedź dodana', ticket })
}

exports.updateTicketStatus = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	const userEmail = req.user.username
	const teamId = req.user.teamId

	if (!req.user.roles.includes('Admin') && userEmail !== 'michalipka1@gmail.com') {
		return res.status(403).send('Brak uprawnień')
	}

	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })

	if (userEmail !== 'michalipka1@gmail.com') {
		if (teamId) {
			const team = await Team.findById(teamId)
			if (team && ticket.company !== team.name) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		} else {
			const company = req.body.frontendUrl || getCompanyFromHost(req)
			if (ticket.company !== company) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		}
	}

	ticket.status = status
	await ticket.save()
	res.json({ message: 'Status updated', ticket })
}

exports.getTicketById = async (req, res) => {
	const { id } = req.params
	const userEmail = req.user.username
	const teamId = req.user.teamId

	const ticket = await Ticket.findById(id)
	if (!ticket) return res.status(404).json({ error: 'Ticket nie znaleziony' })

	if (userEmail !== 'michalipka1@gmail.com') {
		if (!req.user.roles.includes('Admin')) {
			if (ticket.userEmail !== userEmail) {
				return res.status(403).json({ error: 'Brak uprawnień' })
			}
		}
		
		if (teamId) {
			const team = await Team.findById(teamId)
			if (team && ticket.company !== team.name) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		} else {
			const company = req.body.frontendUrl || getCompanyFromHost(req)
			if (ticket.company !== company) {
				return res.status(403).json({ error: 'Brak dostępu do tego zgłoszenia' })
			}
		}
	}

	res.json(ticket)
}
