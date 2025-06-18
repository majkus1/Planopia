const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const vacationController = require('../controllers/vacationController')

router.get('/vacation-days', auth, vacationController.getMyVacationDays)
router.patch('/:userId/vacation-days', auth, vacationController.updateVacationDays)
router.get('/:userId/vacation-days', auth, vacationController.getVacationDays)

module.exports = router
