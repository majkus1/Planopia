const nodemailer = require('nodemailer')
const User = require('../models/user')
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
		from: '"planopia.pl" <your-email@gmail.com>',
		to,
		subject,
		html,
	})

	console.log('Message sent: %s', info.messageId)
}

// Funkcja wysyłająca email do wszystkich z rolą HR (czyli "Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)")
const sendEmailToHR = async (leaveRequest, user, updatedByUser, t, updatedByInfo) => {
	try {
		const hrUsers = await User.find({
			roles: { $in: ['Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)'] }
		})

		const mailContent = `
			<p><b>${t('email.leaveRequest.employee')}:</b> ${user.firstName} ${user.lastName}</p>
			<p><b>${t('email.leaveRequest.type')}:</b> ${t(leaveRequest.type)}</p>
			<p><b>${t('email.leaveRequest.dates')}:</b> ${leaveRequest.startDate.toISOString().split('T')[0]} - ${leaveRequest.endDate.toISOString().split('T')[0]}</p>
			<p><b>${t('email.leaveRequest.days')}:</b> ${leaveRequest.daysRequested}</p>
			${updatedByInfo}
			<p><a href="${appUrl}/leave-requests/${user._id}">${t('email.leaveRequest.goToRequest')}</a></p>
		`

		for (const hrUser of hrUsers) {
			await sendEmail(
				hrUser.username,
				null,
				`${t('email.leaveRequest.titlemail')} ${t(leaveRequest.type)} ${t(leaveRequest.status)}`,
				mailContent
			)
		}

		console.log('Email sent to HR users successfully')
	} catch (error) {
		console.error('Błąd podczas wysyłania maila do HR:', error)
	}
}

module.exports = {
	sendEmail,
	sendEmailToHR,
}
