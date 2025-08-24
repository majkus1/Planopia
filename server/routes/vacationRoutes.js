const express = require('express')
const router = express.Router()
const vacationController = require('../controllers/vacationController')
const { authenticateToken } = require('../middleware/authMiddleware')

router.get('/vacation-days', authenticateToken, vacationController.getMyVacationDays)
router.patch('/:userId/vacation-days', authenticateToken, vacationController.updateVacationDays)
router.get('/:userId/vacation-days', authenticateToken, vacationController.getVacationDays)

module.exports = router
