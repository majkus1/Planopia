const nodemailer = require('nodemailer')
const { firmDb } = require('../db/db')
const User = require('../models/user')(firmDb)
const { appUrl } = require('../config')

const sendEmail = async (to, link, subject, html) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	})

	const info = await transporter.sendMail({
		from: '"Planopia" <michalipka1@gmail.com>',
		to,
		subject,
		html,
	})

	console.log('Message sent: %s', info.messageId)
}


const sendEmailToHR = async (leaveRequest, user, updatedByUser, t, updatedByInfo, teamId) => {
	try {
		const hrUsers = await User.find({
			teamId, 
			roles: { $in: ['Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)'] },
		})

		if (hrUsers.length === 0) {
			console.log('Brak użytkowników HR w tym zespole')
			return
		}

		const emailPromises = hrUsers.map(hrUser =>
			sendEmail(
				hrUser.username,
				`${appUrl}/leave-requests/${user._id}`,
				`${t(leaveRequest.type)} ${t(leaveRequest.status)}`,
				`<h3>${t(leaveRequest.type)} ${t(leaveRequest.status)}</h3>
				<p><b>${t('email.leaveRequest.employee')}:</b> ${user.firstName} ${user.lastName}</p>
				<p><b>${t('email.leaveRequest.type')}:</b> ${t(leaveRequest.type)}</p>
				<p><b>${t('email.leaveRequest.dates')}:</b> ${leaveRequest.startDate.toISOString().split('T')[0]} - ${
					leaveRequest.endDate.toISOString().split('T')[0]
				}</p>
				<p><b>${t('email.leaveRequest.days')}:</b> ${leaveRequest.daysRequested}</p>
				${updatedByInfo}
				<p><a href="${appUrl}/leave-requests/${user._id}">${t('email.leaveRequest.goToRequest')}</a></p>`
			)
		)

		await Promise.all(emailPromises)
		console.log('Email sent to HR users successfully (team scoped, all departments)')
	} catch (error) {
		console.error('Błąd podczas wysyłania maila do HR:', error)
	}
}

module.exports = {
	sendEmail,
	sendEmailToHR,
}
