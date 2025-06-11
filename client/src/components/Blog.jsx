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
				<meta property="og:image" content="https://planopia.pl/img/blog.png" />
				<meta property="og:url" content="https://planopia.pl/blog" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Blog Planopii – Porady o ewidencji czasu pracy i HR" />
				<meta
					name="twitter:description"
					content="Dowiedz się więcej o zarządzaniu czasem pracy, urlopami i nieobecnościami w firmie z bloga Planopii."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/blog.png" />
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
			<header className="bg-white shadow top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
					<RouterLink to="/" className="logoinmenu text-2xl font-bold text-blue-700 companyname" style={{ marginBottom: '0px' }}>
						Planopia
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
							to="/#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Test
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
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Logowanie
						</RouterLink>
						<RouterLink to="/en/blog" className="flex items-center languagechoose">
							<img src="/img/united-kingdom.png" alt="English version" className="w-6 h-6" />
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
					<div
						className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 flex flex-col items-start
">
						<RouterLink
							to="/#oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
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
							to="/#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Test
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
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Logowanie
						</RouterLink>
						<RouterLink to="/en/blog" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
							<img src="/img/united-kingdom.png" alt="English version" className="w-6 h-6" />
						</RouterLink>
					</div>
				)}
			</header>

			{/* HERO */}
			<section className="px-4 py-20 bg-gradient-to-r from-blue-50 to-white" id="planopia-welcome">
				<div className="max-w-7xl mx-auto text-left">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div className="ordering">
							<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 blogh1">Blog</h1>
						</div>
						<img src="/img/blog.png" alt="grafika główna bloga" className="rounded-xl shadow-lg" />
					</div>
				</div>
			</section>

			<section className="px-4 py-16 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{/* Karta wpisu 1 */}
						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img src="/img/mockupdesktop.png" alt="Tytuł wpisu 1" className="rounded-md mb-4 h-48 object-cover" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Planopia – nowoczesna aplikacja do ewidencji czasu pracy i zarządzania urlopami
							</h3>
							<p className="text-gray-600 flex-1">
								W dzisiejszych czasach efektywne zarządzanie czasem pracy oraz nieobecnościami pracowników to klucz do
								sukcesu każdej firmy.
							</p>
							<RouterLink
								to="/blog/ewidencja-czasu-pracy-i-urlopow"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Czytaj więcej
							</RouterLink>
						</div>

						{/* Karta wpisu 2 */}
						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img src="/img/rcpblog.png" alt="Tytuł wpisu 2" className="rounded-md mb-4 h-48 object-cover" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Integracja z systemami RCP – wykorzystaj pełen potencjał Twojego systemu rejestracji czasu pracy
							</h3>
							<p className="text-gray-600 flex-1">
								Jeśli Twoja firma korzysta z czytników kart, bramek wejściowych lub innych systemów RCP (Rejestracji
								Czasu Pracy), nie musisz rezygnować z obecnych rozwiązań.
							</p>
							<RouterLink
								to="/blog/integracja-z-rcp"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Czytaj więcej
							</RouterLink>
						</div>

						{/* Karta wpisu 3 */}
						<div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col">
							<img src="/img/planvacationblog.png" alt="Tytuł wpisu 3" className="rounded-md mb-4 h-48 object-cover" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Jak planować urlopy pracowników w firmie? Praktyczne wskazówki i narzędzia.
							</h3>
							<p className="text-gray-600 flex-1">
								Planowanie urlopów pracowników to jedno z większych wyzwań dla działu HR oraz managerów zespołów.
								Niezależnie od wielkości firmy, brak przejrzystości w dostępności pracowników może prowadzić do chaosu,
								przestojów i frustracji.
							</p>
							<RouterLink
								to="/blog/planowanie-urlopow"
								className="mt-4 inline-block bg-blue-600 text-dark font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
								Czytaj więcej
							</RouterLink>
						</div>
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

export default Blog
