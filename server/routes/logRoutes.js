const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const logController = require('../controllers/logController')

router.get('/logs', auth, logController.getLogs)
router.get('/:userId', auth, logController.getLogsByUser)

module.exports = router
