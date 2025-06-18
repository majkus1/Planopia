const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const leaveController = require('../controllers/leaveController')
const leaveRequestController = require('../controllers/leaveRequestController')

router.post('/leave-request', auth, leaveController.submitLeaveRequest)
router.get('/leave-requests/:userId', auth, leaveRequestController.getUserLeaveRequests)
router.patch('/leave-requests/:id', auth, leaveRequestController.updateLeaveRequestStatus)

module.exports = router
