const express = require('express')
const router = express.Router()
const leavePlanController = require('../controllers/leavePlanController')
const { authenticateToken } = require('../middleware/authMiddleware')

router.get('/leave-plans', authenticateToken, leavePlanController.getUserLeavePlans)
router.post('/leave-plans', authenticateToken, leavePlanController.addLeavePlan)
router.delete('/leave-plans', authenticateToken, leavePlanController.deleteLeavePlan)
router.get('/admin/leave-plans/:userId', authenticateToken, leavePlanController.getLeavePlansByAdmin)
router.get('/admin/all-leave-plans', authenticateToken, leavePlanController.getAllLeavePlans)

module.exports = router
