import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function ENBlogThree() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'en' }}>
  <title>Employee Leave Planning – Best Tools and Practices | Planopia</title>

  <meta
    name="description"
    content="Discover how to plan employee leave effectively with an online leave calendar. Planopia makes leave management simple – free plan for up to 8 users."
  />

  <meta
    name="keywords"
    content="leave planning, employee leave management, online leave calendar, PTO tracker, absence management, vacation planning software, HR app, Planopia"
  />

  <meta name="author" content="Michał Lipka" />
  <meta name="robots" content="index, follow" />

  {/* Canonical + alternates */}
  <link rel="canonical" href="https://planopia.pl/en/blog/leave-planning" />
  <link rel="alternate" href="https://planopia.pl/en/blog/leave-planning" hreflang="en" />
  <link rel="alternate" href="https://planopia.pl/blog/planowanie-urlopow" hreflang="pl" />

  {/* Open Graph (FB, LinkedIn) */}
  <meta property="og:title" content="Employee Leave Planning – Best Tools and Practices | Planopia" />
  <meta
    property="og:description"
    content="Learn how to improve employee leave planning with Planopia – online leave calendar, approval workflow, and absence management. Free plan for small teams."
  />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://planopia.pl/en/blog/leave-planning" />
  <meta property="og:image" content="https://planopia.pl/img/desktop.png" />
  <meta property="og:site_name" content="Planopia" />

  {/* Twitter Cards */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Employee Leave Planning – Best Tools and Practices | Planopia" />
  <meta
    name="twitter:description"
    content="Planopia simplifies leave management with an online leave calendar, automatic notifications, and reports. Try the free plan for teams up to 8 users."
  />
  <meta name="twitter:image" content="https://planopia.pl/img/desktop.png" />

  {/* Schema.org JSON-LD */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Employee Leave Planning – Best Tools and Practices",
      "description": "Learn how to improve leave planning and absence management in your company. Planopia offers an online leave calendar, approval workflow, and reports. Free plan for up to 8 users.",
      "image": "https://planopia.pl/img/desktop.png",
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
      "url": "https://planopia.pl/en/blog/leave-planning",
      "datePublished": "2025-08-25"
    }
    `}
  </script>
</Helmet>


			<header className="bg-white top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 menucontent" style={{ maxWidth: '1350px' }}>
					<RouterLink to="/en" className="logoinmenu text-2xl font-bold text-blue-700 companyname" style={{ marginBottom: '0px' }}>
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
  Logowanie
</RouterLink>

<RouterLink
  to="/team-registration" // <- tutaj raczej kierujesz na rejestrację zespołu
  onClick={toggleMenu}
  className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-700 transition ctamenu"
>
  Załóż darmowy zespół
</RouterLink>
						<RouterLink to="/blog/planowanie-urlopow" className="flex items-center languagechoose">
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
						className="navmobile lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 flex flex-col items-start
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
  Logowanie
</RouterLink>

<RouterLink
  to="/team-registration" // <- tu najlepiej daj ścieżkę do rejestracji zespołu
  onClick={toggleMenu}
  className="ctamenu w-full text-center bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4 shadow hover:bg-green-700 transition"
>
  Załóż darmowy zespół
</RouterLink>
						<RouterLink
							to="/blog/planowanie-urlopow"
							className="flex items-center languagechoose"
							style={{ marginTop: '15px' }}>
							<img src="/img/poland.webp" alt="English version" className="w-6 h-6" />
						</RouterLink>
					</div>
				)}
			</header>

{/* HERO */}
<section className="px-4 py-10 bg-gradient-to-r from-blue-50 to-white" id="blog-hero" style={{ marginTop: '70px' }}>
  <div className="max-w-7xl mx-auto text-left content-blog">
    <div className="grid xl:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-6">
          Employee leave planning – best tools and practices
        </h1>
        <p className="text-gray-700 text-lg">
          <strong>Leave planning</strong> is one of the most common challenges for HR departments and team managers.  
          Traditional methods – paper requests or Excel – often lead to chaos and mistakes.  
          Discover how an <strong>online leave calendar</strong> and apps like Planopia  
          make absence management simple and effective.
        </p>

        {/* CTA boxes */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4 cta-blog">
          <div className="bg-white border border-gray-200 rounded-xl py-5 px-4 shadow-sm text-center">
            <p className="text-gray-800 mb-3">
              👉 <strong>Free leave planning app</strong>  
              <br />for teams up to 8 users
            </p>
            <a
              href="/team-registration"
              className="inline-block first-cta bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition"
            >
              Create a free team
            </a>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl py-5 px-4 shadow-sm text-center">
            <p className="text-gray-800 mb-3">
              👉 <strong>For larger companies: </strong>  
              unlimited users, flexible features.
            </p>
            <a
              href="/en#prices"
              className="inline-block sec-cta bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              View pricing
            </a>
          </div>
        </div>
      </div>

      <img
        src="/img/desktop-en.png"
        alt="Leave planning software – Planopia"
        className="rounded-xl w-full h-auto aspect-[4/2] shadow-lg mockup-blog-desktop"
      />
      <img
        src="/img/mobile-en.png"
        alt="Leave planning app – Planopia"
        className="rounded-xl shadow-xl ring-1 ring-black/5 mx-auto mockup-blog-mobile"
      />
    </div>
  </div>
</section>


<article className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-2xl font-semibold mb-3">Why is leave planning critical?</h2>
  <p className="mb-4 text-gray-700">
    Lack of visibility into planned absences causes conflicts, staffing gaps, and lower productivity. 
    A <strong>central online leave calendar</strong> keeps operations running smoothly and prevents multiple key people 
    being off at the same time. Good leave management also supports morale and employee satisfaction.
  </p>

  <h2 className="text-2xl font-semibold mb-3">The most common leave management problems</h2>
  <ul className="list-disc pl-6 mb-4 text-gray-700">
    <li>No shared team leave calendar</li>
    <li>Manual requests in Excel or on paper—error-prone and hard to track</li>
    <li>No automatic notifications or approval workflow</li>
    <li>Overlapping vacations of key employees</li>
    <li>No leave history and limited access to reports</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-3">How to improve leave planning</h2>
  <p className="mb-4 text-gray-700">
    Implementing a modern <strong>leave management system</strong> (PTO tracker) solves most of these issues. With Planopia you can:
  </p>
  <ul className="list-disc pl-6 mb-4 text-gray-700">
    <li>Provide a shared, real-time <strong>online leave calendar</strong> for the whole team</li>
    <li>Send automatic notifications to managers and HR</li>
    <li>Use role-based permissions and a simple <strong>approval workflow</strong></li>
    <li>Prevent conflicts thanks to full visibility of team availability</li>
    <li>Export data to <strong>PDF/XLSX</strong> for reporting and compliance</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-3">Planopia – leave planning made simple</h2>
  <p className="mb-4 text-gray-700">
    <strong>Planopia</strong> combines <strong>time tracking</strong> with powerful <strong>leave management</strong>. 
    The free plan works perfectly for teams of up to 8 users. Paid plans add scalability, 
    custom branding, and integrations with your existing systems.
  </p>
  <ul className="list-disc pl-6 mb-4 text-gray-700">
    <li>Employees submit <strong>leave requests online</strong></li>
    <li>Managers approve requests with a single click</li>
    <li>Approved leave appears instantly in the team calendar</li>
    <li>Complete leave history and reports in one place</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-3">Conclusion</h2>
  <p className="mb-4 text-gray-700">
    <strong>Online leave planning</strong> brings order, clarity, and less stress to day-to-day operations. 
    With Planopia you’ll avoid scheduling conflicts, speed up approvals, 
    and keep full control over team availability. Try the free plan for 
    <strong> teams up to 8 users</strong> and see how easy <strong>leave management</strong> can be.
  </p>

  <p className="mt-8 font-medium text-blue-600">
    Try Planopia — <a href="/team-registration" className="underline">create your free team and start planning leave online</a>.
  </p>
</article>


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

export default ENBlogThree
