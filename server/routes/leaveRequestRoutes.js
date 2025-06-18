const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const leaveRequestController = require('../controllers/leaveRequestController')

router.patch('/leave-requests/:id/mark-processed', auth, leaveRequestController.markLeaveRequestAsProcessed)
router.get('/user-leave-requests', auth, leaveRequestController.getUserLeaveRequests)
router.get('/ownrequestleave', auth, leaveRequestController.getOwnLeaveRequests)

module.exports = router
