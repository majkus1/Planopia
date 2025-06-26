const { firmDb } = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')(firmDb)
const { createLog } = require('../services/logService')
const { appUrl } = require('../config')
const { sendEmail } = require('../services/emailService')

// POST /login
exports.login = async (req, res) => {
	const { username, password } = req.body
	try {
		const user = await User.findOne({ username })
		if (!user) return res.status(401).send('Nieprawidłowe dane logowania')

		const passwordIsValid = await bcrypt.compare(password, user.password)
		if (!passwordIsValid) return res.status(401).send('Nieprawidłowe hasło')

		const accessToken = jwt.sign(
			{ userId: user._id, roles: user.roles, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '15m' }
		)

		const refreshToken = jwt.sign(
			{ userId: user._id, roles: user.roles, username: user.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		)

		res.cookie('token', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 15 * 60 * 1000,
		})

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.status(200).json({
			message: 'Logged in successfully',
			roles: user.roles,
			username: user.username,
		})

		await createLog(user._id, 'LOGIN', 'Login successfully')
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).send('Błąd serwera podczas logowania')
	}
}

// POST /refresh-token
exports.refreshToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken
	if (!refreshToken) return res.status(401).json({ message: 'Brak refresh tokena' })

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ message: 'Nieprawidłowy refresh token' })

		const newAccessToken = jwt.sign(
			{ userId: decoded.userId, roles: decoded.roles, username: decoded.username },
			process.env.JWT_SECRET,
			{ expiresIn: '15m' }
		)

		const newRefreshToken = jwt.sign(
			{ userId: decoded.userId, roles: decoded.roles, username: decoded.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		)

		res.cookie('token', newAccessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 15 * 60 * 1000,
		})

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.json({ message: 'Token refreshed' })
	})
}

// GET /me
exports.getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('firstName lastName username roles')
		if (!user) return res.status(404).json({ message: 'Użytkownik nie został znaleziony' })
		return res.status(200).json({ roles: user.roles, username: user.username })
	} catch (error) {
		console.error('Błąd w /me:', error)
		return res.status(500).json({ message: 'Błąd serwera' })
	}
}

// POST /logout
exports.logout = (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
	})

	res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
	})

	res.status(200).json({ message: 'Wylogowano pomyślnie' })
}

// POST /change-password
exports.changePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
	if (!passwordRegex.test(newPassword)) {
		return res.status(400).send('Hasło nie spełnia wymagań bezpieczeństwa.')
	}

	try {
		const user = await User.findById(req.user.userId)
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}

		const passwordIsValid = await bcrypt.compare(currentPassword, user.password)
		if (!passwordIsValid) {
			return res.status(400).send('Obecne hasło jest nieprawidłowe')
		}

		user.password = await bcrypt.hash(newPassword, 12)
		await user.save()

		await createLog(user._id, 'CHANGE_PASSWORD', 'Password changed successfully')

		res.send('Hasło zostało zmienione pomyślnie')
	} catch (error) {
		console.error('Error changing password:', error)
		res.status(500).send('Nie udało się zmienić hasła.')
	}
}

exports.resetPasswordRequest = async (req, res) => {
	const { email } = req.body
	const t = req.t

	try {
		const user = await User.findOne({ username: email })
		if (!user) {
			return res.status(404).send('No user with that email exists.')
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		const resetLink = `${appUrl}/new-password/${token}`

		await sendEmail(
			email,
			resetLink,
			t('resetpass.subject'),
			`<p>${t('resetpass.body', { link: resetLink })}</p><p>${t('resetpass.linkActive')}</p>`
		)

		await createLog(user._id, 'RESET_PASSWORD_REQUEST', 'Password reset link sent')

		res.send('If a user with that email is registered, a password reset link has been sent.')
	} catch (error) {
		console.error('Error sending password reset email:', error)
		res.status(500).send('Failed to send password reset link.')
	}
}
