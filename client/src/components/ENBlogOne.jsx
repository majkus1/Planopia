import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function ENBlogOne() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Work time and leave management in one place | Planopia</title>
				<meta
					name="description"
					content="Discover all the features of the Planopia app. Track work hours, manage leave requests, report absences, and integrate with RCP systems."
				/>
				<meta
					name="keywords"
					content="work time tracking, leave management, HR app, employee calendar, Planopia, online HR, vacation planning, software for companies"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/en/blog/time-tracking-and-leave-management" />
				<link rel="alternate" href="https://planopia.pl/en/blog/time-tracking-and-leave-management" hreflang="en" />
				<link rel="alternate" href="https://planopia.pl/blog/ewidencja-czasu-pracy-i-urlopow" hreflang="pl" />
				<meta property="og:title" content="How to Track Work Hours Effectively? Discover the Planopia App" />
				<meta
					property="og:description"
					content="Learn how the Planopia app helps companies track work hours, manage leaves, and automate HR operations with ease."
				/>
				<meta property="og:type" content="article" />
				<meta property="og:url" content="https://planopia.pl/en/blog/time-tracking-and-leave-management" />
				<meta property="og:image" content="https://planopia.pl/img/mockupdesktop.webp" />
				<meta property="og:site_name" content="Planopia" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="How to Track Work Hours Effectively? Discover the Planopia App" />
				<meta
					name="twitter:description"
					content="Planopia is a modern HR tool for effective time tracking, leave planning, and integration with RCP systems."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/mockupdesktop.webp" />

				<script type="application/ld+json">
					{`
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": "How to Track Work Hours Effectively? Discover the Planopia App",
			"description": "Discover the benefits of Planopia – a modern web application for work time tracking, leave management, and streamlining HR processes.",
			"image": "https://planopia.pl/img/mockupdesktop.webp",
			"author": {
				"@type": "Person",
				"name": "Michał Lipka"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Planopia",
				"logo": {
					"@type": "ImageObject",
					"url": "https://planopia.pl/img/planopiaheader.webp"
				}
			},
			"url": "https://planopia.pl/en/blog/time-tracking-and-leave-management",
			"datePublished": "2025-06-10"
		}
		`}
				</script>
			</Helmet>

			<header className="bg-white top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 menucontent">
					<RouterLink
						to="/en"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
					</RouterLink>
					<nav className="hidden flex space-x-8 navdesktop">
						<RouterLink
							to="/en#aboutapp"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							About the App
						</RouterLink>
						<RouterLink
							to="/en#prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Pricing
						</RouterLink>
						<RouterLink
							to="/en#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Try the App
						</RouterLink>
						<RouterLink
							to="/en#contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Contact
						</RouterLink>
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
						<RouterLink to="/blog/ewidencja-czasu-pracy-i-urlopow" className="flex items-center languagechoose">
							<img src="/img/poland.webp" alt="English version" className="w-6 h-6" />
						</RouterLink>
					</nav>

					<button
						className="lg:hidden text-gray-700 text-3xl focus:outline-none"
						onClick={toggleMenu}
						style={{ fontSize: '34px' }}>
						{menuOpen ? '✕' : '☰'}
					</button>
				</div>
				{menuOpen && (
					<div
						className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 flex flex-col items-start
">
						<RouterLink
							to="/en#aboutapp"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							About the App
						</RouterLink>
						<RouterLink
							to="/en#prices"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Pricing
						</RouterLink>
						<RouterLink
							to="/en#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Try the App
						</RouterLink>
						<RouterLink
							to="/en#contact"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Contact
						</RouterLink>
						<RouterLink
							to="/en/blog"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4"
							onClick={toggleMenu}>
							Blog
						</RouterLink>
						<RouterLink
							to="/login"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Login
						</RouterLink>
						<RouterLink
							to="/blog/ewidencja-czasu-pracy-i-urlopow"
							className="flex items-center languagechoose"
							style={{ marginTop: '15px' }}>
							<img src="/img/poland.webp" alt="English version" className="w-6 h-6" />
						</RouterLink>
					</div>
				)}
			</header>

			{/* HERO */}
			<section className="px-4 py-10 bg-gradient-to-r from-blue-50 to-white" id="planopia-welcome">
				<div className="max-w-7xl mx-auto text-left">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div className="ordering">
							<h1 className="text-4xl font-bold mb-6">
								Planopia – modern software for employee time tracking and leave management
							</h1>
						</div>
						<img src="/img/mockupdesktop.webp" alt="mockup our app on desktop" className="rounded-xl w-full h-auto aspect-[3/2] shadow-lg" />
					</div>
				</div>
			</section>

			<article className="max-w-6xl mx-auto px-6 py-12">
				<p className="text-gray-700 text-lg mb-4">
					In today’s fast-paced world, efficient work time tracking and employee absence management are key to every
					company's success. Traditional methods like Excel spreadsheets or paper leave requests are not only
					time-consuming but also error-prone. This is where <strong>Planopia</strong> comes in – a modern, intuitive
					web application designed to streamline the daily tasks of HR departments and team managers.
				</p>

				<h2 className="text-2xl font-semibold mb-3">What is Planopia?</h2>
				<p className="mb-4">
					Planopia is a <strong>web-based app for time tracking, leave requests, and absence management</strong>. It
					runs in any browser with no installation required. Thanks to its user-friendly interface, automation of
					processes, and built-in email notifications, HR operations become easier than ever.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Key features of the app</h2>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Intuitive time tracking in a clear calendar – log your working hours easily.</li>
					<li>Leave and absence request forms with instant supervisor notifications.</li>
					<li>Annual leave planning for the entire company.</li>
					<li>Automatic calculation of working hours, including overtime and remote work.</li>
					<li>
						Possibility to integrate with RCP systems (e.g. card readers, access gates) – import employee clock-in/out
						data directly into the work calendar.
					</li>
					<li>PDF generation – export calendars and leave requests for printing or archiving.</li>
					<li>Secure login system with user roles and data protection.</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Why choose Planopia?</h2>
				<p className="mb-4">
					Planopia gives companies full control over work time and leave management, eliminates paper-based document
					flow, and reduces HR errors. It also saves time and money – both for HR staff and the entire team.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Who is Planopia for?</h2>
				<p className="mb-4">
					The app is ideal for <strong>small and medium-sized businesses</strong> looking to streamline their HR
					processes. Its intuitive design ensures fast and hassle-free onboarding, and the system can be customized to
					meet the needs of any organization.
				</p>

				<h2 className="text-2xl font-semibold mb-3">RCP System Integration</h2>
				<p className="mb-4">
					Planopia can be integrated with existing <strong>RCP (work time registration systems)</strong> such as
					employee card readers or access control gates. This allows for automatic calendar updates based on clock-in
					and clock-out data, which is especially useful in factories, production facilities, and large enterprises.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Summary</h2>
				<p className="mb-4">
					Planopia is a modern, scalable solution for any company that wants to{' '}
					<strong>automate time and leave management</strong>. Try it today and discover how much you can gain with just
					one tool.
				</p>

				<p className="mt-8 font-medium text-blue-600">
					Learn more and{' '}
					<a href="/en#test" className="underline">
						try Planopia for free
					</a>{' '}
				</p>
			</article>

			{/* FOOTER */}
			<footer className="py-10 px-6 bg-white border-t text-center d-flex justify-center">
				<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
				{/* <a href="/blog/jak-usprawnic-firme" className="text-sm text-gray-600 hover:underline mt-2 block">
					Aplikacja do ewidencji czasu pracy może usprawnić Twoją firmę
				</a> */}
			</footer>
		</>
	)
}

export default ENBlogOne
