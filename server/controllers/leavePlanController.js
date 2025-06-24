const LeavePlan = require('../models/LeavePlan')

exports.getUserLeavePlans = async (req, res) => {
	try {
		const leavePlans = await LeavePlan.find({ userId: req.user.userId })
		res.status(200).json(leavePlans.map(plan => plan.date))
	} catch (error) {
		console.error('Error fetching leave plans:', error)
		res.status(500).send('Failed to fetch leave plans.')
	}
}

exports.addLeavePlan = async (req, res) => {
	const { date } = req.body

	if (!date) {
		return res.status(400).send('Date is required.')
	}

	try {
		const existingPlan = await LeavePlan.findOne({ userId: req.user.userId, date })
		if (existingPlan) {
			return res.status(400).send('This date is already marked as a leave day.')
		}

		const leavePlan = new LeavePlan({ userId: req.user.userId, date })
		await leavePlan.save()

		res.status(201).send('Leave day added successfully.')
	} catch (error) {
		console.error('Error adding leave day:', error)
		res.status(500).send('Failed to add leave day.')
	}
}

exports.deleteLeavePlan = async (req, res) => {
	const { date } = req.body

	if (!date) {
		return res.status(400).send('Date is required.')
	}

	try {
		const result = await LeavePlan.deleteOne({ userId: req.user.userId, date })

		if (result.deletedCount === 0) {
			return res.status(404).send('No such leave day found.')
		}

		res.status(200).send('Leave day removed successfully.')
	} catch (error) {
		console.error('Error removing leave day:', error)
		res.status(500).send('Failed to remove leave day.')
	}
}

exports.getLeavePlansByAdmin = async (req, res) => {
	const { userId } = req.params

	try {
		const leavePlans = await LeavePlan.find({ userId }).select('date -_id')
		const dates = leavePlans.map(plan => plan.date)
		res.status(200).json(dates)
	} catch (error) {
		console.error('Error fetching leave plans:', error)
		res.status(500).send('Failed to fetch leave plans.')
	}
}


exports.getAllLeavePlans = async (req, res) => {
	try {
		const leavePlans = await LeavePlan.find()
			.populate('userId', 'username firstName lastName')
			.select('date userId')

		const formattedPlans = leavePlans
			.filter(plan => plan.userId !== null)
			.map(plan => ({
				date: plan.date,
				username: plan.userId.username,
				firstName: plan.userId.firstName,
				lastName: plan.userId.lastName,
				userId: plan.userId._id,
			}))

		res.status(200).json(formattedPlans)
	} catch (error) {
		console.error('Error fetching all leave plans:', error)
		res.status(500).send('Failed to fetch all leave plans.')
	}
}
