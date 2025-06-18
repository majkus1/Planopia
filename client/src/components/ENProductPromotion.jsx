import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Link as RouterLink } from 'react-router-dom'
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
	const [userMessage, setUserMessage] = useState('')
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

		if (!datetime && (!userMessage || userMessage.trim() === '')) {
			alert('Please select a date or enter a message.')
			return
		}

		try {
			await axios.post(`${API_URL}/api/public/schedule-call`, {
				email: email2,
				datetime: datetime?.toISOString(),
				message: userMessage,
			})
			setMsg2('Thank you! Your message has been sent.')
			setEmail2('')
			setDatetime(null)
		} catch {
			setMsg2('An error occurred while sending. Please try again later.')
		}
		console.log({ datetime, email: email2, message })
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
				<meta property="og:image" content="https://planopia.pl/img/planopiaheader.webp" />
				<meta property="og:url" content="https://planopia.pl/en" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Planopia – Time Tracking and Leave Management App" />
				<meta
					name="twitter:description"
					content="Streamline employee time tracking and vacation planning with Planopia."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/planopiaheader.webp" />
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
					<RouterLink
						to="/en"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }} />
					</RouterLink>
					<nav className="hidden flex space-x-8 navdesktop">
						<a
							href="#aboutapp"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							About the App
						</a>
						<a
							href="#prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Pricing
						</a>
						<a
							href="#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Try the App
						</a>
						<a
							href="#contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Contact
						</a>
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
							<img src="/img/poland.webp" alt="Wersja Polska" className="w-6 h-6" />
						</RouterLink>
					</nav>

					<button
						className="lg:hidden text-gray-700 text-3xl focus:outline-none"
						onClick={toggleMenu}
						style={{ fontSize: '32px' }}>
						{menuOpen ? '✕' : '☰'}
					</button>
				</div>

				{menuOpen && (
					<div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 flex flex-col items-start">
						<a
							href="#aboutapp"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							About the App
						</a>
						<a
							href="#prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Pricing
						</a>
						<a
							href="#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Try the App
						</a>
						<a
							href="#contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Contact
						</a>
						<RouterLink
							to="/en/blog"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4"
							onClick={toggleMenu}>
							Blog
						</RouterLink>
						<RouterLink
							to="/login"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
							onClick={toggleMenu}>
							Login
						</RouterLink>
						<RouterLink to="/" className="flex items-center languagechoose mt-4">
							<img src="/img/poland.webp" alt="Polish version" className="w-6 h-6" />
						</RouterLink>
					</div>
				)}
			</header>

			{/* HERO */}
			<section className="px-4 py-10 bg-gradient-to-r from-blue-50 to-white" id="planopia-welcome">
				<div className="max-w-7xl mx-auto text-left">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div className="ordering">
							<h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
								A time tracking and leave management app.
							</h1>
							<h2 className="font-semibold text-gray-800 mb-2" id="underheader">
								With Planopia, everything is in its place.
							</h2>
							<p className="text-lg sm:text-xl text-gray-600 mb-6 underheadertwo">Simple. Light. Clear.</p>
						</div>
						<img
							src="/img/planopiaheader.webp"
							alt="businessman highlighting an application"
							className="rounded-xl w-full h-auto aspect-[3/2]"
						/>
					</div>
				</div>
			</section>

			<section className="py-13 px-6 bg-white" id="aboutapp">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-4xl font-bold mb-4" style={{ marginBottom: '35px' }}>
						About the Planopia App
					</h2>
					<p className="text-lg text-gray-700 mb-6 text-justify">
						Planopia is a modern web application designed for companies that want a simple way to manage
						<strong> working time records</strong>, handle
						<strong> leaves and absences</strong>, and improve internal communication. With an intuitive interface and
						HR process automation, you save time, avoid mistakes, and gain full control over work organization in your
						team.
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
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Security</strong> – the app was designed with strong focus on data
							security and user privacy.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Fast performance</strong> – the app runs smoothly even for larger
							teams.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Language support</strong> – the app is available in both Polish and
							English.
						</li>
						<li>
							<strong>Responsive design</strong> – works flawlessly on mobile devices (smartphones, tablets).
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">PWA application</strong> – add Planopia to your phone’s home screen and
							use it like a full-featured mobile app – no download required from the store.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Branded appearance</strong> – customize the colors, logo, and style of
							the app to match your company's visual identity.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Dedicated subdomain and database</strong> – each company gets its own
							isolated application environment for full privacy and customization.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Integration with RCP systems</strong> – ability to import data from
							external time tracking systems (e.g. entry/exit badge scans).
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Dedicated support</strong> – we provide personalized assistance and
							fast support – we're here to help you in any situation.
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-12 mb-4" style={{ marginTop: '50px', marginBottom: '15px' }}>
						Need a custom feature or integration?
					</h2>
					<p className="text-gray-700 text-base">
						Planopia can be tailored to your company’s needs. Need an internal chat? Work schedule? XLSX reports?
						<strong className="text-green-700"> Additional integrations?</strong> Or perhaps you'd like us to build a
						completely different IT system? Contact us – we offer
						<strong className="text-green-700"> software customization</strong> and dedicated development services.
					</p>
				</div>

				<img
					src="/img/planopiaimage.webp"
					alt="promotional graphic of the application"
					className="planopiaimgaboutmobile"
				/>
				<div
					className="h-[400px] bg-fixed bg-center bg-cover mt-16 rounded-xl shadow-md planopiaimgparallax"
					style={{ backgroundImage: "url('/img/planopiaimage.webp')" }}></div>
			</section>

			{/* PRICING */}
			<section id="prices" className="py-10 px-6 bg-gray-50">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-8">Pricing</h2>
					<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-10 mt-4">
						<p className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">First month free — no commitment.</p>
						<p className="text-gray-700 mb-4">Contact us and try Planopia completely free of charge.</p>
						<button
							onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
							className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
							Start for free
						</button>
					</div>

					<div className="grid gap-6 md:grid-cols-2 mt-10">
						{/* Monthly Plan */}
						<div className="bg-white shadow p-8 rounded-lg border-t-4 border-green-500">
							<h3 className="text-2xl font-semibold mb-4">Monthly Plan</h3>
							<p className="text-4xl font-bold text-green-600 mb-2">
								$2.99 <span className="text-lg font-normal text-gray-700">/user/month (net)</span>
							</p>
							<p className="text-gray-700 mb-4">Billed monthly. Cancel anytime.</p>
							<ul className="text-gray-700 text-left list-disc pl-5 space-y-2 mb-6">
								<li>Full access to all features</li>
								<li>Own subdomain and database</li>
								<li>Technical support and updates</li>
							</ul>
							<p className="text-sm text-gray-500 mb-6">
								Custom features on request — priced individually depending on the complexity.
							</p>
							<button
								onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
								className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-full">
								Choose monthly plan
							</button>
						</div>

						{/* Yearly Plan */}
						<div className="bg-white shadow p-8 rounded-lg border-t-4 border-blue-500">
							<h3 className="text-2xl font-semibold mb-4">Yearly Plan</h3>
							<p className="text-4xl font-bold text-blue-600 mb-2">
								$29.99 <span className="text-lg font-normal text-gray-700">/user/year (net)</span>
							</p>
							<p className="text-gray-700 mb-4">2 months free with annual upfront payment.</p>
							<ul className="text-gray-700 text-left list-disc pl-5 space-y-2 mb-6">
								<li>Full access to all features</li>
								<li>Own subdomain and database</li>
								<li>Technical support and updates</li>
							</ul>
							<p className="text-sm text-gray-500 mb-6">
								Custom features on request — priced individually depending on the complexity.
							</p>
							<button
								onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
								className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full">
								Choose yearly plan
							</button>
						</div>
					</div>
				</div>

				<div className="mt-16 max-w-4xl mx-auto text-center">
					<h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Who is Planopia for?</h3>
					<p className="text-gray-700 text-lg leading-relaxed">
						Planopia is the perfect solution for teams of any size — from just a few employees to several hundred. Our
						application was built for companies that want to:
					</p>
					<ul className="list-disc text-left mt-6 text-gray-700 text-base space-y-2 pl-8 sm:pl-12">
						<li>easily track working hours and time off,</li>
						<li>avoid overpaying for features they don’t need,</li>
						<li>
							use a secure, modern app — accessible at a unique link dedicated to your company, with an option to use it
							like a mobile app.
						</li>
					</ul>
					<p className="text-gray-600 text-base mt-6">
						Each company gets its own dedicated version of the app — with a unique link and separate database — so
						Planopia runs fast, securely, and independently for every client.
					</p>
				</div>

				<img src="/img/mockupmobile.webp" alt="Planopia mobile preview" className="planopiaimgaboutmobile" />
				<div
					className="h-[600px] bg-fixed bg-center bg-cover mt-16 rounded-xl planopiaimgparallax"
					style={{ backgroundImage: "url('/img/mockupdesktop.webp')" }}></div>
			</section>

			<section id="test" className="py-13 px-6 bg-white">
				<div className="max-w-xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Try the app</h2>
					<p className="mb-6">
						Enter your email and we’ll send you login credentials for a test account, valid for 7 days.
					</p>
					<form onSubmit={handleSubmit} className="mt-10">
						<input
							type="email"
							className="w-full p-2 border border-gray-300 rounded-md mb-4"
							placeholder="Your email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700"
							style={{ padding: '15px' }}>
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
							<img
								src="/img/1709827103942.webp"
								alt="profile photo Michał Lipka"
								className="myimageface object-cover"
							/>
							<p className="mb-0 ml-4 text-lg font-semibold text-left">Michał Lipka</p>
						</div>

						<a
							href="https://www.linkedin.com/in/michal-lipka-wd/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center mb-2 text-blue-600 hover:underline">
							<img src="/img/linkedin.webp" alt="LinkedIn logo" className="mylinkedin mr-2" />
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
						<p className="text-2xl font-bold mb-6 text-center md:text-left contactform">Contact form</p>
						<p className="mb-6 text-gray-700 text-center md:text-left">
							You can schedule an online meeting or just send us a message — whichever works best for you.
						</p>

						<form onSubmit={handleSubmitMeeting} className="text-center mt-10">
							{/* Email at the top */}
							<input
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								placeholder="Your email"
								value={email2}
								onChange={e => setEmail2(e.target.value)}
								required
							/>

							{/* Datepicker second */}
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

							<textarea
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								rows={4}
								placeholder="Your message"
								value={userMessage}
								onChange={e => setUserMessage(e.target.value)}
							/>

							{/* Submit */}
							<button
								type="submit"
								className="w-full bg-green-600 text-white rounded-md hover:bg-green-700"
								style={{ padding: '15px' }}>
								Send
							</button>

							{msg2 && <p className="mt-2 text-sm text-center text-gray-700">{msg2}</p>}
						</form>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="py-10 px-6 bg-white border-t text-center d-flex justify-center">
				<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }} />
				{/* <a href="/blog/jak-usprawnic-firme" className="text-sm text-gray-600 hover:underline mt-2 block">
					Aplikacja do ewidencji czasu pracy może usprawnić Twoją firmę
				</a> */}
			</footer>
		</>
	)
}

export default ENProductPromotion
