// services/roleService.js
const { firmDb } = require('../db/db')
const User = require('../models/user')(firmDb)

/**
 * Zwraca userów będących przełożonymi działu (mogą zatwierdzać urlopy)
 * TYLKO w obrębie tego samego zespołu i tego samego działu
 * @param {String} department
 * @param {String|ObjectId} teamId
 * @returns {Promise<Array<User>>}
 */
exports.findSupervisorsForDepartment = async (department, teamId) => {
	return User.find({
		department,
		teamId,
		roles: { $in: ['Może zatwierdzać urlopy swojego działu (Approve Leaves Department)'] },
	})
}
