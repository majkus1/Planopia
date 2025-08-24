const rateLimit = require('express-rate-limit')

exports.loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return req.ip + ':' + (req.body.username || 'unknown')
	},
	skipSuccessfulRequests: true,
	skipFailedRequests: false,
})

exports.resetPasswordLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: {
		message: 'Zbyt wiele prób resetowania hasła. Spróbuj ponownie za 15 minut.',
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return req.ip + ':' + (req.body.username || 'unknown')
	},
	skipSuccessfulRequests: true,
	skipFailedRequests: false,
})

exports.teamRegistrationLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 3,
	message: 'Zbyt wiele prób tworzenia zespołów. Spróbuj ponownie za godzinę.',
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return req.ip + ':' + (req.body.adminEmail || 'unknown')
	},
	skipSuccessfulRequests: true,
	skipFailedRequests: false,
})
