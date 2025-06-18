const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { sendEmail } = require('../services/emailService')
const { createLog } = require('../services/logService')
const bcrypt = require('bcryptjs')

const { appUrl } = require('../config')

exports.register = async (req, res) => {
	const { username, firstName, lastName, roles } = req.body
	const t = req.t

	if (!req.user.roles.includes('Admin')) {
		return res.status(403).send('Access denied')
	}

	try {
		const existingUser = await User.findOne({ username })
		if (existingUser) {
			return res.status(409).json({ code: 'USER_EXISTS' })
		}

		const newUser = new User({
			username,
			firstName,
			lastName,
			roles,
		})

		const savedUser = await newUser.save()

		const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
			expiresIn: '24h',
		})

		const link = `${appUrl}/set-password/${token}`

		const subject = t('email.welcome.subject')
		const body = `
      <p>${t('email.welcome.login', { username })}</p>
      <p>${t('email.welcome.password', { link })}</p>
      <p>${t('email.welcome.linkActive')}</p>
    `

		await sendEmail(username, link, subject, body)
		await createLog(savedUser._id, 'REGISTER', `Created new user with roles ${roles.join(', ')}`, req.user.userId)

		res.status(201).send('User registered successfully. Please check your email to set your password.')
	} catch (error) {
		console.error('Error creating user:', error)
		res.status(500).send('Failed to create user.')
	}
}

exports.setPassword = async (req, res) => {
	const { password, token, position } = req.body
	if (!password || !token) {
		return res.status(400).send('Missing password or token')
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
	if (!passwordRegex.test(password)) {
		return res.status(400).send('Hasło nie spełnia wymagań bezpieczeństwa.')
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.userId)

		if (!user) return res.status(404).send('User not found')

		user.password = await bcrypt.hash(password, 12)
		user.position = position
		await user.save()

		await createLog(user._id, 'SET_PASSWORD', 'Password and position updated successfully')

		res.send('Password and position updated successfully')
	} catch (error) {
		console.error('Error setting password and position:', error)
		res.status(500).send('Failed to set password and position')
	}
}

exports.resetPassword = async (req, res) => {
	const { password, token } = req.body
	if (!password || !token) {
		return res.status(400).send('Missing password or token')
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
	if (!passwordRegex.test(password)) {
		return res.status(400).send('Hasło nie spełnia wymagań bezpieczeństwa.')
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.userId)

		if (!user) {
			return res.status(404).send('User not found')
		}

		user.password = await bcrypt.hash(password, 12)
		await user.save()

		await createLog(user._id, 'RESET_PASSWORD', 'Password updated successfully')

		res.send('Password updated successfully')
	} catch (error) {
		console.error('Error setting password:', error)
		res.status(500).send('Failed to set password')
	}
}

// PUT /update-position
exports.updatePosition = async (req, res) => {
	const { position } = req.body
	try {
		const user = await User.findById(req.user.userId)
		if (!user) return res.status(404).send('User not found')

		user.position = position
		await user.save()

		res.status(200).send('Stanowisko zostało zaktualizowane')
	} catch (error) {
		console.error('Błąd podczas aktualizacji stanowiska:', error)
		res.status(500).send('Błąd podczas aktualizacji stanowiska')
	}
}

// GET /profile
exports.getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)
		if (!user) {
			return res.status(404).send('User not found')
		}
		res.json({
			firstName: user.firstName,
			lastName: user.lastName,
			position: user.position,
			role: user.role,
		})
	} catch (error) {
		console.error('Error retrieving user profile:', error)
		res.status(500).send('Error retrieving user profile')
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const allowedRoles = ['Admin']
		if (!allowedRoles.some(role => req.user.roles.includes(role))) {
			return res.status(403).send('Access denied')
		}

		const users = await User.find().select('username firstName lastName role')
		res.json(users)
	} catch (error) {
		console.error('Error retrieving users:', error)
		res.status(500).send('Failed to retrieve users.')
	}
}

exports.getAllVisibleUsers = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.userId)
		if (!currentUser) return res.status(404).send('Użytkownik nie znaleziony')

		const rolesVisibleTo = {
			'Kierownik IT': ['IT'],
			'Kierownik BOK': ['Bok'],
			'Kierownik Bukmacher': ['Bukmacher'],
			'Kierownik Marketing': ['Marketing'],
			'Urlopy czas pracy': [],
			Zarząd: [],
			Admin: [],
		}

		let filter = {}
		if (
			currentUser.roles.includes('Admin') ||
			currentUser.roles.includes('Zarząd') ||
			currentUser.roles.includes('Urlopy czas pracy')
		) {
			filter = {}
		} else {
			const visibleRoles = currentUser.roles.flatMap(role => rolesVisibleTo[role] || [])
			filter = { roles: { $in: visibleRoles } }
		}

		const users = await User.find(filter).select('username firstName lastName roles position')
		res.json(users)
	} catch (error) {
		console.error('Error fetching users:', error)
		res.status(500).send('Błąd serwera podczas pobierania listy użytkowników')
	}
}

exports.getAllUserPlans = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.userId)
		if (!currentUser) return res.status(404).send('Użytkownik nie znaleziony')

		const rolesVisibleTo = {
			'Kierownik IT': [''],
			'Kierownik BOK': [''],
			'Kierownik Bukmacher': [''],
			'Kierownik Marketing': [''],
			'Urlopy czas pracy': [],
			Marketing: [],
			Bukmacher: [],
			IT: [],
			BOK: [],
			Zarząd: [],
			Admin: [],
		}

		let filter = {}
		if (
			currentUser.roles.includes('Admin') ||
			currentUser.roles.includes('Zarząd') ||
			currentUser.roles.includes('IT') ||
			currentUser.roles.includes('Marketing') ||
			currentUser.roles.includes('Bukmacher') ||
			currentUser.roles.includes('BOK') ||
			currentUser.roles.includes('Kierownik Marketing') ||
			currentUser.roles.includes('Kierownik Bukmacher') ||
			currentUser.roles.includes('Kierownik BOK') ||
			currentUser.roles.includes('Kierownik IT') ||
			currentUser.roles.includes('Urlopy czas pracy')
		) {
			filter = {}
		} else {
			const visibleRoles = currentUser.roles.flatMap(role => rolesVisibleTo[role] || [])
			filter = { roles: { $in: visibleRoles } }
		}

		const users = await User.find(filter).select('username firstName lastName roles position')
		res.json(users)
	} catch (error) {
		console.error('Error fetching users:', error)
		res.status(500).send('Błąd serwera podczas pobierania listy użytkowników')
	}
}

exports.getUserById = async (req, res) => {
	try {
		const { userId } = req.params

		const allowedRoles = [
			'Admin',
			'Zarząd',
			'Kierownik IT',
			'Kierownik BOK',
			'Kierownik Bukmacher',
			'Kierownik Marketing',
			'Urlopy czas pracy',
			'IT',
			'Marketing',
			'Bukmacher',
			'BOK',
		]
		if (!allowedRoles.some(role => req.user.roles.includes(role))) {
			return res.status(403).send('Access denied')
		}

		const user = await User.findById(userId).select('firstName lastName username roles position')
		if (!user) {
			return res.status(404).send('User not found')
		}

		res.json(user)
	} catch (error) {
		console.error('Error fetching user details:', error)
		res.status(500).send('Failed to fetch user details.')
	}
}

exports.updateUserRoles = async (req, res) => {
	const { userId } = req.params
	const { roles } = req.body

	const allowedRoles = ['Admin']
	if (!allowedRoles.some(role => req.user.roles.includes(role))) {
		return res.status(403).send('Access denied')
	}

	try {
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}

		user.roles = roles
		await user.save()

		await createLog(req.user.userId, 'UPDATE_ROLES', `Updated roles for user ${user.username}`, req.user.userId)

		res.status(200).json({ message: 'Role użytkownika zostały zaktualizowane', user })
	} catch (error) {
		console.error('Błąd podczas aktualizacji ról użytkownika:', error)
		res.status(500).send('Nie udało się zaktualizować ról użytkownika')
	}
}

exports.deleteUser = async (req, res) => {
	const { userId } = req.params

	const allowedRoles = ['Admin']
	if (!allowedRoles.some(role => req.user.roles.includes(role))) {
		return res.status(403).send('Access denied')
	}

	try {
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}

		await User.deleteOne({ _id: userId })

		await createLog(req.user.userId, 'DELETE_USER', `Deleted user ${user.username}`, req.user.userId)

		res.status(200).json({ message: 'Użytkownik został usunięty pomyślnie' })
	} catch (error) {
		console.error('Błąd podczas usuwania użytkownika:', error)
		res.status(500).send('Nie udało się usunąć użytkownika')
	}
}
