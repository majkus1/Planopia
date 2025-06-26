// controllers/departmentController.js
const { firmDb } = require('../db/db')
const User = require('../models/user')(firmDb);

exports.getDepartments = async (req, res) => {
    try {
        // Zbierz unikalne departmenty z bazy
        const departments = await User.distinct('department', { department: { $ne: null, $ne: '' } });
        res.json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Błąd pobierania departmentów' });
    }
};
