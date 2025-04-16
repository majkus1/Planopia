require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const csurf = require('csurf')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean');

const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'pl'], // języki, które chcesz preładować
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/translation.json'
    }
  });

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully.");
})
.catch(err => {
    console.log("Failed to connect to MongoDB:", err);
});

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://sprightly-centaur-b4cdcd.netlify.app' : 'http://localhost:3001',
    credentials: true,
  };  

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(xss());

const csrfProtection = csurf({
  cookie: {
    httpOnly: false, // CSRF token ma być dostępny dla JS (czyli nie HttpOnly!)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 'lax' jest wystarczające i bezpieczne w większości przypadków
  }
});

app.use(mongoSanitize())

app.use(csrfProtection)

app.get('/api/csrf-token', (req, res) => {
	res.json({ csrfToken: req.csrfToken() })
})

app.use(i18nextMiddleware.handle(i18next));

app.use('/api/users', userRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
