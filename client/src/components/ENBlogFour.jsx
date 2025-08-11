import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function ENBlogFour() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>How to easily and efficiently track employee work time? | Planopia</title>
				<meta
					name="description"
					content="Learn how to simplify work time tracking in your company. Discover the benefits of the Planopia system and streamline daily hour registration and reporting."
				/>
				<meta
					name="keywords"
					content="work time tracking, employee time logging, HR app, Planopia, overtime calculation, remote work tracking, RCP system integration, workforce management"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/en/blog/work-time-tracking" />
				<link rel="alternate" href="https://planopia.pl/en/blog/work-time-tracking" hreflang="en" />
				<link rel="alternate" href="https://planopia.pl/blog/ewidencja-czasu-pracy" hreflang="pl" />

				<meta property="og:title" content="How to easily and efficiently track employee work time? | Planopia" />
				<meta
					property="og:description"
					content="See how easy it is to log work hours with Planopia. A simple and effective solution for digital employee time tracking and team overview."
				/>
				<meta property="og:type" content="article" />
				<meta property="og:url" content="https://planopia.pl/en/blog/work-time-tracking" />
				<meta property="og:image" content="https://planopia.pl/img/worktimeblog.webp" />
				<meta property="og:site_name" content="Planopia" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="How to easily and efficiently track employee work time? | Planopia" />
				<meta
					name="twitter:description"
					content="Track work hours with Planopia – a modern app that helps your HR team and managers organize working time with ease and accuracy."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/worktimeblog.webp" />

				<script type="application/ld+json">
					{`
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to easily and efficiently track employee work time?",
      "description": "See how easy it is to log work hours with Planopia. A simple and effective solution for digital employee time tracking and team overview.",
      "image": "https://planopia.pl/img/worktimeblog.webp",
      "author": {
        "@type": "Person",
        "name": "Michał Lipka"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Planopia",
        "logo": {
          "@type": "ImageObject",
          "url": "https://planopia.pl/img/worktimeblog.webp"
        }
      },
      "url": "https://planopia.pl/en/blog/work-time-tracking",
      "datePublished": "2025-06-11"
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
						<RouterLink to="/blog/ewidencja-czasu-pracy" className="flex items-center languagechoose">
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
							to="/blog/ewidencja-czasu-pracy"
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
							<h1 className="text-4xl font-bold mb-6">How to easily and efficiently track employee work time?</h1>
						</div>
						<img
							src="/img/worktimeblog.webp"
							alt="person plan work time easy in our app"
							className="rounded-xl w-full h-auto aspect-[3/2] shadow-lg"
						/>
					</div>
				</div>
			</section>

			<article className="max-w-6xl mx-auto px-6 py-12">

				<p className="text-gray-700 text-lg mb-4">
					Accurate work time tracking is a legal obligation for every employer and a key element of effective team
					management. Regardless of the industry or company size, a lack of transparency in recording working hours can
					lead to misunderstandings, payroll errors, and inefficiencies. In this article, we’ll show you how to track
					work time easily and seamlessly using a modern tool – <strong>Planopia</strong>.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Why is work time tracking so important?</h2>
				<p className="mb-4">
					Work time tracking is not only required by labor law, but it also ensures accurate payroll calculations,
					proper handling of overtime, monitoring of remote work, and optimized team scheduling. Traditional methods
					like Excel sheets or paper attendance lists are often time-consuming and error-prone.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Common issues with time tracking</h2>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Lack of automation and reliance on manual data entry</li>
					<li>Challenges in tracking overtime and remote work</li>
					<li>Limited access to data across locations</li>
					<li>Missing centralized history and reports</li>
					<li>Risk of payroll errors and discrepancies</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">How to simplify work time tracking?</h2>
				<p className="mb-4">
					Implementing a system like <strong>Planopia</strong> allows you to move time tracking into a digital
					environment. With it, you can:
				</p>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Let employees log hours daily via an intuitive calendar</li>
					<li>Automatically calculate work hours, including overtime and remote work</li>
					<li>Access records from any device – including smartphones</li>
					<li>Export data to PDF or integrate with HR/payroll systems</li>
					<li>Quickly view attendance, absences, and team schedules</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Why choose Planopia?</h2>
				<p className="mb-4">
					<strong>Planopia</strong> is a modern web application built as a Progressive Web App (PWA), meaning it works
					fully on mobile devices without needing to install anything from an app store. This allows employees and
					managers to track time anywhere, anytime – ideal for remote and mobile teams.
				</p>

				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Employees can record hours and work modes (e.g. office, remote) every day</li>
					<li>Managers get instant access to summaries, reports, and attendance lists</li>
					<li>The system automatically detects overtime and generates monthly reports</li>
					<li>The app can be added to the home screen and used like a native mobile app</li>
					<li>All data is securely stored and accessible only to authorized users</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Summary</h2>
				<p className="mb-4">
					Time tracking doesn’t have to be complicated. With solutions like <strong>Planopia</strong>, companies can
					streamline the process, reduce errors, and save time. Its intuitive interface, mobile accessibility, and
					compliance with labor regulations make it a smart choice for modern organizations.
				</p>

				<p className="mt-8 font-medium text-blue-600">
					<RouterLink to="/en#contact" className="underline">
						Contact us
					</RouterLink>{' '}
					to learn how Planopia can help you simplify employee time tracking.
				</p>

				<p className="mt-8 text-gray-700">
					Also looking for a leave management solution? Discover more about what{' '}
					<a href="/en/blog/work-time-and-leave-management" className="text-blue-600 underline">
						Planopia offers
					</a>
					
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

export default ENBlogFour
