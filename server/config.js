// server/config.js
const appUrl =
	process.env.NODE_ENV === 'production'
		? 'https://planopia.pl'
		: 'http://localhost:3001'

module.exports = {
	appUrl,
}
