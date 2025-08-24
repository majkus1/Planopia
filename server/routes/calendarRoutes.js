const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/calendarController')
const { authenticateToken } = require('../middleware/authMiddleware')
// router.get('/workdays/confirmation-status/:userId?', authenticateToken, calendarController.getCalendarConfirmationStatus)
// router.post('/workdays/confirm', authenticateToken, calendarController.confirmCalendar)

// Trasy dla potwierdzania kalendarza
router.get('/confirmation-status', authenticateToken, calendarController.getCalendarConfirmationStatus) // /api/users/calendar/confirmation-status?month=&year=
router.get('/confirmation-status/:userId', authenticateToken, calendarController.getCalendarConfirmationStatus) // /api/users/calendar/confirmation-status/:userId?month=&year=
router.post('/confirm', authenticateToken, calendarController.confirmCalendar) // /api/users/calendar/confirm

module.exports = router
