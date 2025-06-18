const LeaveRequest = require('../models/LeaveRequest')
const { sendEmailToLeaveTeam, sendEmail } = require('../services/emailService')
const User = require('../models/user')
const { appUrl } = require('../config')

exports.markLeaveRequestAsProcessed = async (req, res) => {
	try {
		const leaveRequest = await LeaveRequest.findById(req.params.id)
		if (!leaveRequest) {
			return res.status(404).send('Wniosek nie znaleziony')
		}

		leaveRequest.isProcessed = true
		await leaveRequest.save()

		res.status(200).json({ message: 'Wniosek oznaczony jako przetworzony' })
	} catch (error) {
		console.error('Błąd podczas oznaczania wniosku jako przetworzony:', error)
		res.status(500).send('Błąd serwera')
	}
}

// exports.getUserLeaveRequests = async (req, res) => {
// 	try {
// 		const leaveRequests = await LeaveRequest.find({ userId: req.user.userId }).populate(
// 			'updatedBy',
// 			'firstName lastName'
// 		)
// 		res.status(200).json(leaveRequests)
// 	} catch (error) {
// 		console.error('Błąd podczas pobierania zgłoszeń:', error)
// 		res.status(500).json({ message: 'Błąd podczas pobierania zgłoszeń' })
// 	}
// }

// exports.getUserLeaveRequests = async (req, res) => {
// 	const { userId } = req.params

// 	const allowedRoles = [
// 		'Admin',
// 		'Zarząd',
// 		'Kierownik IT',
// 		'Kierownik BOK',
// 		'Kierownik Bukmacher',
// 		'Kierownik Marketing',
// 		'Urlopy czas pracy',
// 	]
// 	if (!allowedRoles.some(role => req.user.roles.includes(role))) {
// 		return res.status(403).send('Access denied')
// 	}

// 	try {
// 		const leaveRequests = await LeaveRequest.find({ userId })
// 			.populate('userId', 'username firstName lastName position')
// 			.populate('updatedBy', 'firstName lastName')
// 		res.status(200).json(leaveRequests)
// 	} catch (error) {
// 		console.error('Error fetching leave requests:', error)
// 		res.status(500).send('Failed to fetch leave requests.')
// 	}
// }

exports.getOwnLeaveRequests = async (req, res) => {
	try {
		const leaveRequests = await LeaveRequest.find({ userId: req.user.userId }).populate(
			'updatedBy',
			'firstName lastName'
		)
		res.status(200).json(leaveRequests)
	} catch (error) {
		console.error('Błąd podczas pobierania zgłoszeń:', error)
		res.status(500).json({ message: 'Błąd podczas pobierania zgłoszeń' })
	}
}

exports.getUserLeaveRequests = async (req, res) => {
	const { userId } = req.params

	const allowedRoles = [
		'Admin',
		'Zarząd',
		'Kierownik IT',
		'Kierownik BOK',
		'Kierownik Bukmacher',
		'Kierownik Marketing',
		'Urlopy czas pracy',
	]
	if (!allowedRoles.some(role => req.user.roles.includes(role))) {
		return res.status(403).send('Access denied')
	}

	try {
		const leaveRequests = await LeaveRequest.find({ userId })
			.populate('userId', 'username firstName lastName position')
			.populate('updatedBy', 'firstName lastName')
		res.status(200).json(leaveRequests)
	} catch (error) {
		console.error('Error fetching leave requests:', error)
		res.status(500).send('Failed to fetch leave requests.')
	}
}

exports.updateLeaveRequestStatus = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	const { t } = req

	const allowedRoles = [
		'Admin',
		'Zarząd',
		'Kierownik IT',
		'Kierownik BOK',
		'Kierownik Bukmacher',
		'Kierownik Marketing',
		'Urlopy czas pracy',
	]
	if (!allowedRoles.some(role => req.user.roles.includes(role))) {
		return res.status(403).send('Access denied')
	}

	try {
		const leaveRequest = await LeaveRequest.findById(id)
		if (!leaveRequest) {
			return res.status(404).send('Leave request not found.')
		}

		const user = await User.findById(leaveRequest.userId).select('firstName lastName username')
		const updatedByUser = await User.findById(req.user.userId).select('firstName lastName')

		leaveRequest.status = status
		leaveRequest.updatedBy = req.user.userId
		await leaveRequest.save()

		const updatedByInfo = `<p><b>${t('email.leaveRequest.updatedBy')}:</b> ${updatedByUser.firstName} ${updatedByUser.lastName}</p>`

		await sendEmailToLeaveTeam(leaveRequest, user, updatedByUser, t, updatedByInfo)

		const mailContent = `
		  <p><b>${t('email.leaveRequest.employee')}:</b> ${user.firstName} ${user.lastName}</p>
		  <p><b>${t('email.leaveRequest.type')}:</b> ${t(leaveRequest.type)}</p>
		  <p><b>${t('email.leaveRequest.dates')}:</b> ${leaveRequest.startDate.toISOString().split('T')[0]} - ${leaveRequest.endDate.toISOString().split('T')[0]}</p>
		  <p><b>${t('email.leaveRequest.days')}:</b> ${leaveRequest.daysRequested}</p>
		  ${updatedByInfo}
		  <p><a href="${appUrl}/leave-requests/${user._id}">${t('email.leaveRequest.goToRequest')}</a></p>
		`

		await sendEmail(
			user.username,
			null,
			`${t('email.leaveRequest.titlemail')} ${t(leaveRequest.type)} ${t(status)}`,
			mailContent
		)

		if (status === 'status.accepted') {
			await sendEmailToLeaveTeam(leaveRequest, user, updatedByUser, t, updatedByInfo)
		}

		res.status(200).json({ message: 'Status updated successfully.', leaveRequest })
	} catch (error) {
		console.error('Error updating leave request status:', error)
		res.status(500).send('Failed to update leave request status.')
	}
}
