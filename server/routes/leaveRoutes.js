const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const leaveController = require('../controllers/leaveController')
const leaveRequestController = require('../controllers/leaveRequestController')

router.post('/leave-request', authenticateToken, leaveController.submitLeaveRequest)
router.get('/leave-requests/:userId', authenticateToken, leaveRequestController.getUserLeaveRequests)
router.patch('/leave-requests/:id', authenticateToken, leaveRequestController.updateLeaveRequestStatus)

module.exports = router
