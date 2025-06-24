const Log = require('../models/log') // Zakładam, że masz taki model

exports.createLog = async (userId, action, details, createdBy) => {
	try {
		const log = new Log({ user: userId, action, details, createdBy })
		await log.save()
		console.log(`Log created: ${action} - ${details}`)
	} catch (error) {
		console.error('Error creating log:', error)
	}
}
