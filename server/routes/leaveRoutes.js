const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const leaveController = require('../controllers/leaveController')
const leaveRequestController = require('../controllers/leaveRequestController')

router.post('/leave-request', authenticateToken, leaveController.submitLeaveRequest)
router.get('/leave-requests/:userId', authenticateToken, leaveRequestController.getUserLeaveRequests)
router.patch('/leave-requests/:id', authenticateToken, leaveRequestController.updateLeaveRequestStatus)
router.get('/accepted-leave-requests', authenticateToken, leaveRequestController.getAllAcceptedLeaveRequests)
router.get('/user-accepted-leave-requests', authenticateToken, leaveRequestController.getUserAcceptedLeaveRequests)
router.get('/accepted-leave-requests/:userId', authenticateToken, leaveRequestController.getAcceptedLeaveRequestsForUser)

module.exports = router
