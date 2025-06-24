const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const leavePlanController = require('../controllers/leavePlanController')

router.get('/leave-plans', auth, leavePlanController.getUserLeavePlans)
router.post('/leave-plans', auth, leavePlanController.addLeavePlan)
router.delete('/leave-plans', auth, leavePlanController.deleteLeavePlan)
router.get('/admin/leave-plans/:userId', auth, leavePlanController.getLeavePlansByAdmin)
router.get('/admin/all-leave-plans', auth, leavePlanController.getAllLeavePlans)

module.exports = router
