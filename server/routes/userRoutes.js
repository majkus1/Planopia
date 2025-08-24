const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middleware/authMiddleware')
const { loginLimiter, resetPasswordLimiter } = require('../utils/rateLimiters')


router.post('/login', loginLimiter, userController.login)
router.post('/refresh-token', userController.refreshToken)
router.post('/reset-password-request', resetPasswordLimiter, userController.resetPasswordRequest)
router.post('/set-password/:token', userController.setPassword)


router.get('/me', authenticateToken, userController.getMe)
router.post('/logout', authenticateToken, userController.logout)
router.post('/change-password', authenticateToken, userController.changePassword)
router.post('/register', authenticateToken, userController.register)
router.post('/new-password', userController.resetPassword)
router.put('/update-position', authenticateToken, userController.updatePosition)
router.get('/profile', authenticateToken, userController.getUserProfile)
router.get('/users', authenticateToken, userController.getAllUsers)
router.get('/all-users', authenticateToken, userController.getAllVisibleUsers)
router.get('/alluserplans', authenticateToken, userController.getAllUserPlans)
router.get('/:userId', authenticateToken, userController.getUserById)
router.patch('/:userId/roles', authenticateToken, userController.updateUserRoles)
router.delete('/:userId', authenticateToken, userController.deleteUser)

module.exports = router
