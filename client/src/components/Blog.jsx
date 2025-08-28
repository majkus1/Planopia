import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

function Blog() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'pl' }}>
				<title>Blog – Planopia | Porady i informacje o ewidencji czasu pracy i urlopach</title>
				<meta
					name="description"
					content="Zdobądź wiedzę na temat ewidencji czasu pracy, zarządzania urlopami i nowoczesnych rozwiązań HR dzięki artykułom na blogu Planopii."
				/>
				<meta
					name="keywords"
					content="blog Planopia, ewidencja czasu pracy, zarządzanie urlopami, aplikacja HR, prawo pracy, organizacja pracy"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/blog" />
				<link rel="alternate" href="https://planopia.pl/blog" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en/blog" hreflang="en" />
				<meta property="og:title" content="Blog Planopii – Porady o ewidencji czasu pracy i HR" />
				<meta
					property="og:description"
					content="Dowiedz się więcej o ewidencji czasu pracy, zarządzaniu urlopami i pracy zdalnej. Porady i nowości od twórców aplikacji Planopia."
				/>
				<meta property="og:image" content="https://planopia.pl/img/blog.webp" />
				<meta property="og:url" content="https://planopia.pl/blog" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Blog Planopii – Porady o ewidencji czasu pracy i HR" />
				<meta
					name="twitter:description"
					content="Dowiedz się więcej o zarządzaniu czasem pracy, urlopami i nieobecnościami w firmie z bloga Planopii."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/blog.webp" />
				<script type="application/ld+json">
					{`
		{
		  "@context": "https://schema.org",
		  "@type": "Blog",
		  "name": "Blog Planopii",
		  "url": "https://planopia.pl/blog",
		  "description": "Oficjalny blog aplikacji Planopia – artykuły o ewidencji czasu pracy, zarządzaniu urlopami i organizacji pracy w firmie.",
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
						to="/"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/new-logoplanopia.png" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
					</RouterLink>
					<nav className="hidden flex space-x-8 navdesktop">
						<RouterLink
							to="/#oaplikacji"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							O Aplikacji
						</RouterLink>
						<RouterLink
							to="/#cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Cennik
						</RouterLink>
						<RouterLink
							to="/#kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Kontakt
						</RouterLink>
						<RouterLink
							to="/blog"
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
						<RouterLink to="/en/blog" className="flex items-center languagechoose">
							<img src="/img/united-kingdom.webp" alt="English version" className="w-6 h-6" />
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
							to="/#oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							O Aplikacji
						</RouterLink>
						<RouterLink
							to="/#cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Cennik
						</RouterLink>
						<RouterLink
							to="/#kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Kontakt
						</RouterLink>
						<RouterLink
							to="/blog"
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
						<RouterLink to="/en/blog" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
							<img src="/img/united-kingdom.webp" alt="English version" className="w-6 h-6" />
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
							<img src="/img/planvacationblog.webp" alt="..." className="rounded-md mb-4 h-48 object-cover" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Planowanie urlopów pracowników – najlepsze narzędzia i praktyki
							</h3>
							<p className="text-gray-600 flex-1">
							Planowanie urlopów to jedno z najczęstszych wyzwań w działach HR i u menedżerów zespołów. Tradycyjne metody – papierowe wnioski czy Excel – prowadzą do chaosu i błędów. Dowiedz się, jak kalendarz urlopowy online i aplikacje takie jak Planopia pomagają w prostym i skutecznym zarządzaniu nieobecnościami.
							</p>
							<RouterLink
								to="/blog/planowanie-urlopow"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Czytaj więcej
							</RouterLink>
						</div>

						{/* Karta wpisu 4 */}
						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img src="/img/worktimeblog.webp" alt="..." className="rounded-md mb-4 h-48 object-cover" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Ewidencja czasu pracy online – nowoczesne rozwiązania dla firm
							</h3>
							<p className="text-gray-600 flex-1">
							Prowadzenie dokładnej ewidencji czasu pracy to obowiązek każdej firmy. Tradycyjne metody, takie jak papierowe listy obecności czy Excel, często są nieefektywne i podatne na błędy. Dlatego coraz więcej przedsiębiorstw wybiera programy i aplikacje online, które automatyzują i porządkują ten proces.
							</p>
							<RouterLink
								to="/blog/ewidencja-czasu-pracy-online"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Czytaj więcej
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

export default Blog
