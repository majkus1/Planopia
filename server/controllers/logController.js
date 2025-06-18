const Log = require('../models/log')

exports.getLogs = async (req, res) => {
	try {
		const allowedRoles = ['Admin']
		if (!allowedRoles.some(role => req.user.roles.includes(role))) {
			return res.status(403).send('Access denied')
		}

		const logs = await Log.find().populate('user', 'username').sort({ timestamp: -1 })
		res.json(logs)
	} catch (error) {
		console.error('Error retrieving logs:', error)
		res.status(500).send('Failed to retrieve logs.')
	}
}

exports.getLogsByUser = async (req, res) => {
	try {
		const allowedRoles = ['Admin']
		if (!allowedRoles.some(role => req.user.roles.includes(role))) {
			return res.status(403).send('Access denied')
		}

		const logs = await Log.find({ user: req.params.userId })
			.populate('user', 'username')
			.populate('createdBy', 'username')
			.sort({ timestamp: -1 })

		res.json(logs)
	} catch (error) {
		console.error('Error retrieving user logs:', error)
		res.status(500).send('Failed to retrieve user logs.')
	}
}
