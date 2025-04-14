// server/config.js
const appUrl =
	process.env.NODE_ENV === 'production'
		? 'https://sprightly-centaur-b4cdcd.netlify.app'
		: 'http://localhost:3001'

module.exports = {
	appUrl,
}
