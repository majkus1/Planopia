const LeaveRequest = require('../models/LeaveRequest')
const User = require('../models/user')
const { sendEmail } = require('../services/emailService')
const { findSupervisorRole } = require('../services/roleService')
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

		const user = await User.findById(userId).select('firstName lastName roles')
		if (!user) return res.status(404).send('Użytkownik nie znaleziony.')

		const supervisorRole = await findSupervisorRole(user.roles)
		const supervisors = await User.find({ roles: supervisorRole }).select('username firstName lastName')

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

		res.status(201).json({ message: 'Wniosek został wysłany i powiadomienie zostało dostarczone.', leaveRequest })
	} catch (error) {
		console.error('Błąd podczas zgłaszania nieobecności:', error)
		res.status(500).json({ message: 'Błąd podczas zgłaszania nieobecności' })
	}
}
