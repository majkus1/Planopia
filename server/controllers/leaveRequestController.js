const { firmDb } = require('../db/db')
const LeaveRequest = require('../models/LeaveRequest')(firmDb)
const { sendEmailToHR, sendEmail } = require('../services/emailService')
const User = require('../models/user')(firmDb)
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

// controllers/leaveRequestController.js

exports.getUserLeaveRequests = async (req, res) => {
	const { userId } = req.params
	const requestingUser = await User.findById(req.user.userId)
	if (!requestingUser) return res.status(404).send('Brak użytkownika')

	// Admin lub HR – widzi wszystko
	if (
		requestingUser.roles.includes('Admin') ||
		requestingUser.roles.includes('Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)')
	) {
		// widzi każdego
	} else if (
		// Przełożony działu lub ewidencja widzi tylko w swoim dziale
		requestingUser.roles.includes('Może zatwierdzać urlopy swojego działu (Approve Leaves Department)') ||
		requestingUser.roles.includes('Może widzieć ewidencję czasu pracy swojego działu (View Timesheets Department)')
	) {
		const userToView = await User.findById(userId)
		if (!userToView) return res.status(404).send('Nie znaleziono użytkownika')
		if (userToView.department !== requestingUser.department) return res.status(403).send('Brak uprawnień')
		// OK
	} else if (
		// Pracownik widzi tylko swoje
		requestingUser._id.toString() !== userId
	) {
		return res.status(403).send('Brak uprawnień')
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

// exports.updateLeaveRequestStatus = async (req, res) => {
// 	const { id } = req.params
// 	const { status } = req.body
// 	const { t } = req

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
// 		const leaveRequest = await LeaveRequest.findById(id)
// 		if (!leaveRequest) {
// 			return res.status(404).send('Leave request not found.')
// 		}

// 		const user = await User.findById(leaveRequest.userId).select('firstName lastName username')
// 		const updatedByUser = await User.findById(req.user.userId).select('firstName lastName')

// 		leaveRequest.status = status
// 		leaveRequest.updatedBy = req.user.userId
// 		await leaveRequest.save()

// 		const updatedByInfo = `<p><b>${t('email.leaveRequest.updatedBy')}:</b> ${updatedByUser.firstName} ${updatedByUser.lastName}</p>`

// 		await sendEmailToLeaveTeam(leaveRequest, user, updatedByUser, t, updatedByInfo)

// 		const mailContent = `
// 		  <p><b>${t('email.leaveRequest.employee')}:</b> ${user.firstName} ${user.lastName}</p>
// 		  <p><b>${t('email.leaveRequest.type')}:</b> ${t(leaveRequest.type)}</p>
// 		  <p><b>${t('email.leaveRequest.dates')}:</b> ${leaveRequest.startDate.toISOString().split('T')[0]} - ${leaveRequest.endDate.toISOString().split('T')[0]}</p>
// 		  <p><b>${t('email.leaveRequest.days')}:</b> ${leaveRequest.daysRequested}</p>
// 		  ${updatedByInfo}
// 		  <p><a href="${appUrl}/leave-requests/${user._id}">${t('email.leaveRequest.goToRequest')}</a></p>
// 		`

// 		await sendEmail(
// 			user.username,
// 			null,
// 			`${t('email.leaveRequest.titlemail')} ${t(leaveRequest.type)} ${t(status)}`,
// 			mailContent
// 		)

// 		if (status === 'status.accepted') {
// 			await sendEmailToLeaveTeam(leaveRequest, user, updatedByUser, t, updatedByInfo)
// 		}

// 		res.status(200).json({ message: 'Status updated successfully.', leaveRequest })
// 	} catch (error) {
// 		console.error('Error updating leave request status:', error)
// 		res.status(500).send('Failed to update leave request status.')
// 	}
// }
exports.updateLeaveRequestStatus = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	const { t } = req

	try {
		const leaveRequest = await LeaveRequest.findById(id)
		if (!leaveRequest) {
			return res.status(404).send('Leave request not found.')
		}

		const requestingUser = await User.findById(req.user.userId)
		const user = await User.findById(leaveRequest.userId).select('firstName lastName username department')
		const updatedByUser = await User.findById(req.user.userId).select('firstName lastName department roles')

		// Kto może edytować?
		const isAdmin = requestingUser.roles.includes('Admin')
		const isSupervisorOfDepartment =
			requestingUser.roles.includes('Może zatwierdzać urlopy swojego działu (Approve Leaves Department)') &&
			requestingUser.department === user.department

		const isHR = requestingUser.roles.includes(
			'Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)'
		)

		if (!isAdmin && !isHR && !isSupervisorOfDepartment) {
			return res.status(403).send('Access denied')
		}

		leaveRequest.status = status
		leaveRequest.updatedBy = req.user.userId
		await leaveRequest.save()

		const updatedByInfo = `<p><b>${t('email.leaveRequest.updatedBy')}:</b> ${updatedByUser.firstName} ${
			updatedByUser.lastName
		}</p>`

		// --- EMAIL DO OSOBY, KTÓRA ZGŁASZAŁA WNIOSEK ---
		const mailContent = `
		  <p><b>${t('email.leaveRequest.employee')}:</b> ${user.firstName} ${user.lastName}</p>
		  <p><b>${t('email.leaveRequest.type')}:</b> ${t(leaveRequest.type)}</p>
		  <p><b>${t('email.leaveRequest.dates')}:</b> ${leaveRequest.startDate.toISOString().split('T')[0]} - ${
			leaveRequest.endDate.toISOString().split('T')[0]
		}</p>
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

		// --- EMAIL DO HR ---
		await sendEmailToHR(leaveRequest, user, updatedByUser, t, updatedByInfo)

		res.status(200).json({ message: 'Status updated successfully.', leaveRequest })
	} catch (error) {
		console.error('Error updating leave request status:', error)
		res.status(500).send('Failed to update leave request status.')
	}
}
