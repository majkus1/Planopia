import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

function ENBlog() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Blog – Planopia | Tips on Work Time Tracking and HR Management</title>
				<meta
					name="description"
					content="Get insights into work time tracking, leave management, and modern HR solutions with articles from the official Planopia blog."
				/>
				<meta
					name="keywords"
					content="Planopia blog, work time tracking, leave management, HR software, labor law, workforce organization"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/en/blog" />
				<link rel="alternate" href="https://planopia.pl/blog" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en/blog" hreflang="en" />
				<meta property="og:title" content="Planopia Blog – Tips on Work Time Tracking and HR" />
				<meta
					property="og:description"
					content="Explore articles about work time tracking, leave planning, remote work, and modern HR practices from the creators of Planopia."
				/>
				<meta property="og:image" content="https://planopia.pl/img/blog.webp" />
				<meta property="og:url" content="https://planopia.pl/en/blog" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Planopia Blog – Tips on Work Time Tracking and HR" />
				<meta
					name="twitter:description"
					content="Read helpful content about managing work hours, leave requests, and employee productivity with Planopia."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/blog.webp" />

				<script type="application/ld+json">
					{`
		{
			"@context": "https://schema.org",
			"@type": "Blog",
			"name": "Planopia Blog",
			"url": "https://planopia.pl/en/blog",
			"description": "The official Planopia blog – articles on work time tracking, leave management, and improving HR workflows.",
			"author": {
				"@type": "Person",
				"name": "Michał Lipka"
			}
		}
		`}
				</script>
			</Helmet>

			{/* HEADER + MENU */}
			<header className="bg-white top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 menucontent" style={{ maxWidth: '1350px' }}>
					<RouterLink
						to="/en"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/new-logoplanopia.png" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
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
  onClick={toggleMenu}
  className="bg-transparent text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded hover:bg-blue-50 hover:text-blue-700 transition"
>
  Login
</RouterLink>

<RouterLink
  to="/team-registration" // <- tutaj raczej kierujesz na rejestrację zespołu
  onClick={toggleMenu}
  className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-700 transition ctamenu"
>
  Create a free team
</RouterLink>
						<RouterLink to="/blog" className="flex items-center languagechoose">
							<img src="/img/poland.webp" alt="English version" className="w-6 h-6" />
						</RouterLink>
					</nav>

					<button
						className="lg:hidden text-gray-700 text-3xl focus:outline-none"
						onClick={toggleMenu}
						style={{ fontSize: '36px' }}>
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
  onClick={toggleMenu}
  className="w-full text-center bg-transparent text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded mb-4 hover:bg-blue-50 hover:text-blue-700 transition"
>
  Login
</RouterLink>

<RouterLink
  to="/team-registration" // <- tu najlepiej daj ścieżkę do rejestracji zespołu
  onClick={toggleMenu}
  className="ctamenu w-full text-center bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4 shadow hover:bg-green-700 transition"
>
  Create a free team
</RouterLink>
						<RouterLink to="/blog" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
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
							<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 blogh1 text-left mt-4">Blog</h1>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-16 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						

						{/* Karta wpisu 3 */}
						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img
								src="/img/planvacationblog.webp"
								alt="Title img of article 3"
								className="rounded-md mb-4 h-48 object-cover"
							/>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Employee leave planning – best tools and practices
							</h3>
							<p className="text-gray-600 flex-1">
							Leave planning is one of the most common HR challenges. Traditional methods—paper forms or spreadsheets—lead to chaos and errors. Learn how an online leave calendar and leave management software like Planopia make absence management simple, transparent, and fast.
							</p>
							<RouterLink
								to="/en/blog/leave-planning"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Read more
							</RouterLink>
						</div>

						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img
								src="/img/worktimeblog.webp"
								alt="Title img of article 4"
								className="rounded-md mb-4 h-48 object-cover"
							/>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Online Time Tracking – modern solutions for companies
							</h3>
							<p className="text-gray-600 flex-1">
							Accurate time tracking is a requirement for every business. Traditional methods like paper timesheets or Excel spreadsheets are often inefficient and error-prone. That’s why more and more companies choose online time tracking appsthat automate and organize the process.
							</p>
							<RouterLink
								to="/en/blog/time-tracking-online"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Read more
							</RouterLink>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="py-10 px-6 bg-white border-t text-center d-flex justify-center">
				<img src="/img/new-logoplanopia.png" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
				{/* <a href="/blog/jak-usprawnic-firme" className="text-sm text-gray-600 hover:underline mt-2 block">
					Aplikacja do ewidencji czasu pracy może usprawnić Twoją firmę
				</a> */}
			</footer>
		</>
	)
}

export default ENBlog
