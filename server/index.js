require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const logRoutes = require('./routes/logRoutes')
const workdayRoutes = require('./routes/workdayRoutes')
const calendarRoutes = require('./routes/calendarRoutes')
const leavePlanRoutes = require('./routes/leavePlanRoutes')
const leaveRequestRoutes = require('./routes/leaveRequestRoutes')
const leaveRoutes = require('./routes/leaveRoutes')
const vacationRoutes = require('./routes/vacationRoutes')
const ticketsRoutes = require('./routes/ticketsRoutes')
const publicRoutes = require('./routes/publicRoutes') // nowy import
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const i18nextMiddleware = require('i18next-http-middleware')
const csurf = require('csurf')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const helmet = require('helmet')
const { firmDb, centralTicketConnection } = require('./db/db')

const app = express()

i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		fallbackLng: 'en',
		preload: ['en', 'pl'],
		backend: {
			loadPath: __dirname + '/locales/{{lng}}/translation.json',
		},
	})

firmDb.on('connected', () => console.log('Firm DB connected.'))
firmDb.on('error', err => console.log('Firm DB error:', err))
centralTicketConnection.on('connected', () => console.log('Central tickets DB connected.'))
centralTicketConnection.on('error', err => console.log('Central tickets DB error:', err))

// mongoose
// 	.connect(process.env.DB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log('MongoDB connected successfully.'))
// 	.catch(err => console.log('Failed to connect to MongoDB:', err))

const corsOptions = {
	origin: process.env.NODE_ENV === 'production' ? 'https://planopia.pl' : 'http://localhost:3001',
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(xss())
app.use(mongoSanitize())
app.use(helmet())
app.use(i18nextMiddleware.handle(i18next))

// 🔓 Public routes — bez CSRF
app.use('/api/public', publicRoutes)

// 🔐 CSRF tylko dla tras chronionych
const csrfProtection = csurf({ cookie: true })
app.get('/api/csrf-token', csrfProtection, (req, res) => {
	res.json({ csrfToken: req.csrfToken() })
})
app.use(csrfProtection)

// 👥 User routes (z CSRF i auth)
app.use('/api/users', userRoutes)
app.use('/api/userlogs', logRoutes)
app.use('/api/workdays', workdayRoutes)
app.use('/api/calendar', calendarRoutes)

app.use('/api/planlea', leavePlanRoutes)
app.use('/api/requlea', leaveRequestRoutes)
app.use('/api/leaveworks', leaveRoutes)
app.use('/api/vacations', vacationRoutes)
app.use('/api/tickets', ticketsRoutes)
app.use('/api/departments', require('./routes/department'))
app.use('/uploads', express.static('uploads'))

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
