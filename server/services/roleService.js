// services/roleService.js

/**
 * Zwraca userów będących przełożonymi działu (mogą zatwierdzać urlopy)
 * @param {String} department
 * @returns {Array<User>}
 */
exports.findSupervisorsForDepartment = async (department) => {
    const User = require('../models/user')
    // Szuka userów w tym samym dziale z rolą 'Może zatwierdzać urlopy swojego działu (approveLeavesDepartment)'
    return User.find({
        department,
        roles: { $in: ['Może zatwierdzać urlopy swojego działu (Approve Leaves Department)'] }
    });
};
