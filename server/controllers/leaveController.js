const { firmDb } = require('../db/db')
const LeaveRequest = require('../models/LeaveRequest')(firmDb)
const User = require('../models/user')(firmDb)
const { sendEmail } = require('../services/emailService')
const { findSupervisorsForDepartment } = require('../services/roleService')
const { appUrl } = require('../config')

exports.submitLeaveRequest = async (req, res) => {
	const { type, startDate, endDate, daysRequested, replacement, additionalInfo } = req.body
	const userId = req.user.userId
	const t = req.t

	try {
		const leaveRequest = new LeaveRequest({
			userId,
			type,
			startDate,
			endDate,
			daysRequested,
			replacement,
			additionalInfo,
		})
		await leaveRequest.save()

		const user = await User.findById(userId).select('firstName lastName roles department')
		if (!user) return res.status(404).send('Użytkownik nie znaleziony.')

		const supervisors = (await findSupervisorsForDepartment(user.department)).filter(u => u.username !== user.username)
		// const supervisors = await User.find({ roles: supervisorRole }).select('username firstName lastName')

		console.log(
			'Supervisorzy:',
			supervisors.map(u => u.username)
		)

		const emailPromises = supervisors.map(supervisor =>
			sendEmail(
				supervisor.username,
				`${appUrl}/leave-requests/${userId}`,
				t('email.leaveform.title'),
				`<h3>${t('email.leaveform.title')}</h3>
				<p><b>${t('email.leaveform.employee')}:</b> ${user.firstName} ${user.lastName}</p>
				<p><b>${t('email.leaveform.type')}:</b> ${t(type)}</p>
				<p><b>${t('email.leaveform.dates')}:</b> ${startDate} - ${endDate}</p>
				<p><b>${t('email.leaveform.days')}:</b> ${daysRequested}</p>
				<p><a href="${appUrl}/leave-requests/${userId}">${t('email.leaveform.goToRequest')}</a></p>`
			)
		)

		await Promise.all(emailPromises)

		// Wyszukaj HR
		const hrUsers = await User.find({
			roles: { $in: ['Może widzieć wszystkie wnioski i ewidencje (HR) (viewAllLeavesAndTimesheets)'] },
		})

		// Wyślij powiadomienie do wszystkich HR
		const hrEmailPromises = hrUsers.map(hr =>
			sendEmail(
				hr.username,
				`${appUrl}/leave-requests/${userId}`,
				t('email.leaveform.title'),
				`<h3>${t('email.leaveform.title')}</h3>
    <p><b>${t('email.leaveform.employee')}:</b> ${user.firstName} ${user.lastName}</p>
    <p><b>${t('email.leaveform.type')}:</b> ${t(type)}</p>
    <p><b>${t('email.leaveform.dates')}:</b> ${startDate} - ${endDate}</p>
    <p><b>${t('email.leaveform.days')}:</b> ${daysRequested}</p>
    <p><a href="${appUrl}/leave-requests/${userId}">${t('email.leaveform.goToRequest')}</a></p>`
			)
		)

		await Promise.all(hrEmailPromises)

		console.log('Wysłano wszystkie maile do przełożonych')

		res.status(201).json({ message: 'Wniosek został wysłany i powiadomienie zostało dostarczone.', leaveRequest })
	} catch (error) {
		console.error('Błąd podczas zgłaszania nieobecności:', error)
		res.status(500).json({ message: 'Błąd podczas zgłaszania nieobecności' })
	}
}
