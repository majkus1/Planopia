// server/config.js
const appUrl =
	process.env.NODE_ENV === 'production'
		? 'https://rainbow-brioche-aa30c8.netlify.app'
		: 'http://localhost:3001'

module.exports = {
	appUrl,
}
