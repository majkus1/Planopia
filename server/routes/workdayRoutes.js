const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const workdayController = require('../controllers/workdayController')

// router.post('/workdays', auth, workdayController.addWorkday)
// router.get('/workdays', auth, workdayController.getWorkdays)
// router.delete('/workdays/:id', auth, workdayController.deleteWorkday)
// router.get('/workdays/:userId', auth, workdayController.getUserWorkdays)

// workdayRoutes.js
router.post('/', auth, workdayController.addWorkday) // POST /api/users/workdays
router.get('/', auth, workdayController.getWorkdays) // GET /api/users/workdays (własne)
router.delete('/:id', auth, workdayController.deleteWorkday) // DELETE /api/users/workdays/:id
router.get('/user/:userId', auth, workdayController.getUserWorkdays) // GET /api/users/workdays/user/:userId


module.exports = router
