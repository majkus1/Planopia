const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const calendarController = require('../controllers/calendarController')

// router.get('/workdays/confirmation-status/:userId?', auth, calendarController.getCalendarConfirmationStatus)
// router.post('/workdays/confirm', auth, calendarController.confirmCalendar)

// calendarRoutes.js
router.get('/confirmation-status', auth, calendarController.getCalendarConfirmationStatus) // /api/users/calendar/confirmation-status?month=&year=
router.get('/confirmation-status/:userId', auth, calendarController.getCalendarConfirmationStatus) // /api/users/calendar/confirmation-status/:userId?month=&year=
router.post('/confirm', auth, calendarController.confirmCalendar) // /api/users/calendar/confirm


module.exports = router
