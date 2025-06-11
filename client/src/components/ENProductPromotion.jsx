import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import axios from 'axios'
import { API_URL } from '../config'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import enGB from 'date-fns/locale/en-GB'

function ENProductPromotion() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [email2, setEmail2] = useState('')
	const [datetime, setDatetime] = useState(null)
	const [msg2, setMsg2] = useState('')
	registerLocale('en-GB', enGB)

	const minTime = new Date()
	minTime.setHours(7, 0, 0)

	const maxTime = new Date()
	maxTime.setHours(23, 0, 0)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(`${API_URL}/api/public/request-demo`, { email })
			setMessage('Thank you! You will receive access to the demo account shortly.')
			setEmail('')
		} catch {
			setMessage('Error occurred. Please try again later.')
		}
	}

	const handleSubmitMeeting = async e => {
		e.preventDefault()
		try {
			await axios.post(`${API_URL}/api/public/schedule-call`, {
				email: email2,
				datetime: datetime?.toISOString(),
			})
			setMsg2('Thank you! Your meeting has been scheduled.')
			setEmail2('')
			setDatetime(null)
		} catch {
			setMsg2('Error occurred. Please try again later.')
		}
	}

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Planopia – Time Tracking and Leave Management App</title>
				<meta
					name="description"
					content="Planopia is a modern web application for time tracking and managing employee leave. Streamline team scheduling and work hour recording."
				/>
				<meta name="keywords" content="time tracking app, leave management, HR software, employee scheduling" />
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/en" />
				<link rel="alternate" href="https://planopia.pl/" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en" hreflang="en" />
				<meta property="og:title" content="Planopia – Time Tracking and Leave Management App" />
				<meta
					property="og:description"
					content="Modern application for managing work time, leaves, and internal communication in your company."
				/>
				<meta property="og:image" content="https://planopia.pl/img/planopiaheader.png" />
				<meta property="og:url" content="https://planopia.pl/en" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Planopia – Time Tracking and Leave Management App" />
				<meta
					name="twitter:description"
					content="Streamline employee time tracking and vacation planning with Planopia."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/planopiaheader.png" />
				<script type="application/ld+json">
					{`
					{
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						"name": "Planopia",
						"url": "https://planopia.pl/en",
						"applicationCategory": "BusinessApplication",
						"operatingSystem": "Web",
						"author": {
							"@type": "Person",
							"name": "Michał Lipka"
						},
						"description": "Web app for time tracking and leave management."
					}
					`}
				</script>
			</Helmet>

			{/* HEADER + MENU */}
			<header className="bg-white shadow top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
					<RouterLink to="/en" className="logoinmenu text-2xl font-bold text-blue-700 companyname" style={{ marginBottom: '0px' }}>
						Planopia
					</RouterLink>
					<nav className="hidden flex space-x-8 navdesktop">
						<ScrollLink
							to="aboutapp"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							About the App
						</ScrollLink>
						<ScrollLink
							to="prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Pricing
						</ScrollLink>
						<ScrollLink
							to="test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Try the App
						</ScrollLink>
						<ScrollLink
							to="contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Contact
						</ScrollLink>
						<RouterLink
							to="/en/blog"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition"
							onClick={toggleMenu}>
							Blog
						</RouterLink>
						<RouterLink
							to="/login"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Login
						</RouterLink>
						<RouterLink to="/" className="flex items-center languagechoose">
							<img src="/img/poland.png" alt="Wersja Polska" className="w-6 h-6" />
						</RouterLink>
					</nav>

					<button
						className="md:hidden text-gray-700 text-3xl focus:outline-none"
						onClick={toggleMenu}
						style={{ fontSize: '25px' }}>
						{menuOpen ? '✕' : '☰'}
					</button>
				</div>

				{menuOpen && (
					<div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 flex flex-col items-start">
						<ScrollLink
							to="aboutapp"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							About the App
						</ScrollLink>
						<ScrollLink
							to="prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Pricing
						</ScrollLink>
						<ScrollLink
							to="test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Try the App
						</ScrollLink>
						<ScrollLink
							to="contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Contact
						</ScrollLink>
						<RouterLink
							to="/en/blog"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition"
							onClick={toggleMenu}>
							Blog
						</RouterLink>
						<RouterLink
							to="/login"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Login
						</RouterLink>
						<RouterLink to="/" className="flex items-center languagechoose mt-4">
							<img src="/img/poland.png" alt="Polish version" className="w-6 h-6" />
						</RouterLink>
					</div>
				)}
			</header>

			{/* HERO */}
			<section className="px-4 py-20 bg-gradient-to-r from-blue-50 to-white" id="planopia-welcome">
				<div className="max-w-7xl mx-auto text-left">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div className="ordering">
							<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
								Time tracking and leave management app.
							</h1>
						</div>
						<img
							src="/img/planopiaheader.png"
							alt="businessman highlighting an application"
							className="rounded-xl shadow-lg"
						/>
					</div>
				</div>
			</section>

			<section className="py-13 px-6 bg-white" id="aboutapp">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold mb-4" style={{ marginBottom: '35px' }}>
						About the Planopia App
					</h2>
					<p className="text-lg text-gray-700 mb-6 text-justify">
						Planopia is a modern web application designed for companies that want a simple way to manage
						<strong> working time records</strong>, handle
						<strong> leaves and absences</strong>, and improve internal communication. With an intuitive interface and
						HR process automation, you save time, avoid mistakes, and gain full control over work organization in your
						team. The system runs in your browser and requires no installation.
					</p>

					<ul className="list-disc pl-4 text-gray-800 text-base space-y-2 mb-4">
						<li>
							<strong>Work time tracking</strong> – intuitive calendar with options to log hours and work mode.
						</li>
						<li>
							<strong>Automatic hour calculation</strong> – including overtime and remote work.
						</li>
						<li>
							<strong>Leave and absence requests</strong> – form with instant notification to the supervisor.
						</li>
						<li>
							<strong>Leave planning</strong> – ability to create yearly leave plans for employees.
						</li>
						<li>
							<strong>Email notifications</strong> – automated info about submitted and approved requests.
						</li>
						<li>
							<strong>PDF export</strong> – generate printable calendars and leave request forms for archiving.
						</li>
						<li>
							<strong>Security</strong> – the app was designed with strong focus on data security and user privacy.
						</li>
						<li>
							<strong>Fast performance</strong> – the app runs smoothly even for larger teams.
						</li>
						<li>
							<strong>Language support</strong> – the app is available in both Polish and English.
						</li>
						<li>
							<strong>Responsive design</strong> – works flawlessly on mobile devices (smartphones, tablets).
						</li>
						<li>
							<strong>Integration with RCP systems</strong> – ability to import data from external time tracking systems
							(e.g. entry/exit badge scans).
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-12 mb-4">Need a custom feature?</h2>
					<p className="text-gray-700 text-base">
						Planopia can be tailored to your company’s needs. Need an internal chat? XLSX reports? Additional
						integrations? Or perhaps you'd like us to build a completely different IT system? Contact us – we offer
						<strong> software customization</strong> and dedicated development services.
					</p>
				</div>

				<img
					src="/img/planopiaimage.png"
					alt="promotional graphic of the application"
					className="planopiaimgaboutmobile"
				/>
				<div
					className="h-[400px] bg-fixed bg-center bg-cover mt-16 rounded-xl shadow-md planopiaimgparallax"
					style={{ backgroundImage: "url('/img/planopiaimage.png')" }}></div>
			</section>

			<section id="prices" className="py-10 px-6 bg-gray-50">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-8">Pricing</h2>
					<div className="grid gap-6 md:grid-cols-2 mt-10">
						<div className="bg-white shadow p-8 rounded-lg">
							<p className="text-2xl font-semibold mb-2">in progress...</p>
							<p className="text-3xl font-bold">...</p>
						</div>
						<div className="bg-white shadow p-8 rounded-lg">
							<p className="text-2xl font-semibold mb-2">in progress...</p>
							<p className="text-3xl font-bold">...</p>
						</div>
					</div>
				</div>

				<img src="/img/mockupmobile.png" alt="mobile app mockup graphic" className="planopiaimgaboutmobile" />
				<div
					className="h-[600px] bg-fixed bg-center bg-cover mt-16 rounded-xl planopiaimgparallax"
					style={{ backgroundImage: "url('/img/mockupdesktop.png')" }}></div>
			</section>

			<section id="test" className="py-13 px-6 bg-white">
				<div className="max-w-xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Try the app</h2>
					<p className="mb-6">Enter your email and we’ll send you test account login credentials.</p>
					<form onSubmit={handleSubmit} className="mt-10">
						<input
							type="email"
							className="w-full p-2 border border-gray-300 rounded-md mb-4"
							placeholder="Your email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
							Send
						</button>
						{message && <p className="mt-2 text-sm">{message}</p>}
					</form>
				</div>
			</section>

			{/* CONTACT & BOOKING */}
			<section id="contact" className="py-13 px-6 bg-gray-50">
				{/* Centered heading */}
				<h2 className="text-4xl font-bold text-center mb-12">Contact</h2>

				{/* Two columns: contact info & form */}
				<div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center mt-10">
					{/* Left column – contact info */}
					<div className="w-full md:w-1/2 flex flex-col items-center md:items-center text-center md:text-left">
						<div className="flex items-center mb-4 my-person">
							<img src="/img/1709827103942.jpg" alt="profile photo Michał Lipka" className="myimageface object-cover" />
							<p className="mb-0 ml-4 text-lg font-semibold text-left">Michał Lipka</p>
						</div>

						<a
							href="https://www.linkedin.com/in/michal-lipka-wd/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center mb-2 text-blue-600 hover:underline">
							<img src="/img/linkedin.png" alt="LinkedIn logo" className="mylinkedin mr-2" />
							LinkedIn
						</a>

						<a href="tel:+48516598792" className="mb-2 block text-gray-800 hover:underline">
							+48 516 598 792
						</a>
						<a href="mailto:michalipka1@gmail.com" className="mb-2 block text-gray-800 hover:underline">
							michalipka1@gmail.com
						</a>
						<p className="text-gray-700 text-sm mb-4 max-w-xs" style={{ marginTop: '10px' }}>
							I’d be happy to implement my application in your company or carry out custom IT or development projects
							for you. Feel free to reach out!
						</p>
					</div>

					{/* Right column – meeting form */}
					<div className="w-full md:w-1/2 p-6 rounded-md">
						<p className="text-2xl font-bold mb-6 text-center md:text-left">Schedule a meeting</p>
						<p className="mb-6 text-gray-700 text-center md:text-left">
							Choose a date and time, enter your email, and schedule an online meeting.
						</p>

						<form onSubmit={handleSubmitMeeting} className="text-center">
							<DatePicker
								selected={datetime}
								onChange={setDatetime}
								showTimeSelect
								timeIntervals={30}
								minTime={minTime}
								maxTime={maxTime}
								dateFormat="Pp"
								timeCaption="Time"
								locale="en"
								placeholderText="Select date and time"
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							/>

							<input
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								placeholder="Your email"
								value={email2}
								onChange={e => setEmail2(e.target.value)}
								required
							/>

							<button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
								Schedule
							</button>

							{msg2 && <p className="mt-2 text-sm text-center text-gray-700">{msg2}</p>}
						</form>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="py-10 px-6 bg-white border-t text-center">
				<p className="font-bold text-blue-700 companyfooter">Planopia</p>
				{/* <a href="/blog/jak-usprawnic-firme" className="text-sm text-gray-600 hover:underline mt-2 block">
					Aplikacja do ewidencji czasu pracy może usprawnić Twoją firmę
				</a> */}
			</footer>
		</>
	)
}

export default ENProductPromotion
