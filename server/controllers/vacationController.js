const { firmDb } = require('../db/db')
const User = require('../models/user')(firmDb)

exports.updateVacationDays = async (req, res) => {
	const { userId } = req.params
	const { vacationDays } = req.body

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
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}

		user.vacationDays = vacationDays
		await user.save()

		res.status(200).json({ message: 'Liczba dni urlopu zaktualizowana pomyślnie', user })
	} catch (error) {
		console.error('Błąd podczas aktualizacji liczby dni urlopu:', error)
		res.status(500).send('Błąd serwera')
	}
}

exports.getVacationDays = async (req, res) => {
	const { userId } = req.params
	try {
		const user = await User.findById(userId).select('vacationDays')
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}
		res.status(200).json({ vacationDays: user.vacationDays })
	} catch (error) {
		console.error('Błąd podczas pobierania liczby dni urlopu:', error)
		res.status(500).send('Błąd serwera')
	}
}

exports.getMyVacationDays = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('vacationDays')
		if (!user) {
			return res.status(404).send('Użytkownik nie znaleziony')
		}
		res.status(200).json({ vacationDays: user.vacationDays })
	} catch (error) {
		console.error('Błąd podczas pobierania liczby dni urlopu:', error)
		res.status(500).send('Błąd serwera')
	}
}
