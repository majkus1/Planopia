const express = require('express')
const router = express.Router()
const logController = require('../controllers/logController')
const { authenticateToken } = require('../middleware/authMiddleware')

router.get('/logs', authenticateToken, logController.getLogs)
router.get('/:userId', authenticateToken, logController.getLogsByUser)

module.exports = router
