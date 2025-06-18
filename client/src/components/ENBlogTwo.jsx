import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function ENBlogTwo() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
				<title>Time & Attendance System Integration – Extend Your Work Time Tracking | Planopia</title>
				<meta
					name="description"
					content="Discover how Planopia integrates with existing Time & Attendance systems (badge readers, access gates) to automate employee work time tracking without replacing your current infrastructure."
				/>
				<meta
					name="keywords"
					content="Time and Attendance integration, T&A systems, badge readers, work time tracking, HR automation, employee scheduling, Planopia"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/en/blog/time-attendance-integration" />
				<link rel="alternate" href="https://planopia.pl/en/blog/time-attendance-integration" hreflang="en" />
				<link rel="alternate" href="https://planopia.pl/blog/integracja-z-rcp" hreflang="pl" />

				<meta property="og:title" content="Time & Attendance System Integration – Extend Your Work Time Tracking" />
				<meta
					property="og:description"
					content="See how Planopia integrates with T&A systems like badge readers and access terminals to automate time tracking. Boost HR efficiency without changing your current setup."
				/>
				<meta property="og:type" content="article" />
				<meta property="og:url" content="https://planopia.pl/en/blog/time-attendance-integration" />
				<meta property="og:image" content="https://planopia.pl/img/rcpblog.webp" />
				<meta property="og:site_name" content="Planopia" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Time & Attendance System Integration – Extend Your Work Time Tracking" />
				<meta
					name="twitter:description"
					content="Discover how Planopia automates employee time tracking through seamless integration with your T&A system – no hardware replacement needed."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/rcpblog.webp" />

				<script type="application/ld+json">
					{`
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Time & Attendance System Integration – Extend Your Work Time Tracking",
        "description": "Learn how Planopia integrates with badge readers and access control systems to automate time tracking while keeping your existing infrastructure.",
        "image": "https://planopia.pl/img/rcpblog.webp",
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
        "url": "https://planopia.pl/en/blog/time-attendance-integration",
        "datePublished": "2025-06-11"
      }
    `}
				</script>
			</Helmet>

			<header className="bg-white shadow top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
					<RouterLink to="/en" className="logoinmenu text-2xl font-bold text-blue-700 companyname" style={{ marginBottom: '0px' }}>
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
						<RouterLink to="/blog/integracja-z-rcp" className="flex items-center languagechoose">
							<img src="/img/poland.webp" alt="English version" className="w-6 h-6" />
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
						<RouterLink to="/blog/integracja-z-rcp" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
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
								Integrate Your Time & Attendance System (T&A) with Planopia – Take Full Control of Work Time Tracking
							</h1>
						</div>
						<img
							src="/img/rcpblog.webp"
							alt="person using the rcp system in their work"
							className="rounded-xl w-full h-auto aspect-[3/2] shadow-lg"
						/>
					</div>
				</div>
			</section>

			<article className="max-w-6xl mx-auto px-6 py-12">
				<p className="text-gray-700 text-lg mb-4">
					Does your company use badge readers, biometric terminals, or access gates to record employee attendance? With{' '}
					<strong>Planopia</strong>, you don’t need to abandon your current infrastructure. Instead, you can
					<strong> integrate it with our modern HR solution</strong> for enhanced work time and leave management.
				</p>

				<h2 className="text-2xl font-semibold mb-3">How does the integration work?</h2>
				<p className="mb-4">
					Planopia supports the import of data from external Time & Attendance (T&A) systems, such as badge readers or
					gate logs. This means <strong>entry and exit logs</strong> from your existing system can be automatically
					synced with employee work calendars,
					<strong> without manual data entry</strong> from HR teams or employees.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Benefits of integration</h2>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Automatic work time entries based on badge scans or terminal logs.</li>
					<li>Fewer HR mistakes and improved accuracy in work time records.</li>
					<li>Saved time for HR departments and team managers.</li>
					<li>No need to replace your current T&A system – continue using your existing infrastructure.</li>
					<li>Centralized management of work time, absences, and leave – all in one platform.</li>
					<li>Easy access on your phone – you can add the app to your home screen and use it like a regular mobile app, without downloading it from a store.</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Who is it for?</h2>
				<p className="mb-4">
					This feature is perfect for{' '}
					<strong>manufacturing plants, warehouses, logistics centers, and mid-to-large companies</strong>
					that already have a T&A infrastructure. Planopia complements your system with modern HR features, without
					requiring costly upgrades.
				</p>

				<h2 className="text-2xl font-semibold mb-3">How to get started?</h2>
				<p className="mb-4">
					Our team will support the integration process by analyzing your data format and creating a tailored import
					process. In most cases, all we need is a CSV file or API access from your T&A system.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Conclusion</h2>
				<p className="mb-4">
					By integrating with your existing Time & Attendance system, you can automate work time tracking, improve data
					accuracy, and save valuable HR time. <strong>Planopia doesn’t replace your system – it enhances it</strong>{' '}
					into a comprehensive employee management environment.
				</p>

				<p className="mt-8 font-medium text-blue-600">
					<a href="/en#kontakt" className="underline">
						Contact us
					</a>{' '}
					to learn how easily you can integrate Planopia with your current T&A system.
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

export default ENBlogTwo
