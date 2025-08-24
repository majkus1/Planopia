const express = require('express')
const router = express.Router()
const leaveRequestController = require('../controllers/leaveRequestController')
const { authenticateToken } = require('../middleware/authMiddleware')

router.patch('/leave-requests/:id/mark-processed', authenticateToken, leaveRequestController.markLeaveRequestAsProcessed)
router.get('/user-leave-requests', authenticateToken, leaveRequestController.getUserLeaveRequests)
router.get('/ownrequestleave', authenticateToken, leaveRequestController.getOwnLeaveRequests)

module.exports = router
