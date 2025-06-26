// models/Ticket.js
module.exports = connection => {
	const mongoose = require('mongoose')
	const ticketSchema = new mongoose.Schema({
		company: { type: String, required: true }, // subdomena (firma1, firma2)
		userEmail: { type: String, required: true }, // email użytkownika
		topic: { type: String, required: true },
		status: {
			type: String,
			enum: ['Otwarte', 'Zamknięte'],
			default: 'Otwarte',
		},
		messages: [
			{
				sender: { type: String, required: true }, // 'user' lub 'admin'
				author: { type: String, required: true },
				content: { type: String, required: true }, // treść wiadomości
				files: [String], // nazwy plików (opcjonalnie)
				timestamp: { type: Date, default: Date.now },
			},
		],
		createdAt: { type: Date, default: Date.now },
	})

	return connection.model('Ticket', ticketSchema)
}
