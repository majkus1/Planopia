import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function BlogOne() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'pl' }}>
				<title>Ewidencja czasu pracy i urlopów w jednym miejscu | Planopia</title>
				<meta
					name="description"
					content="Poznaj wszystkie funkcje aplikacji Planopia. Ewidencjonuj czas pracy, planuj urlopy, zgłaszaj nieobecności i integruj system z RCP."
				/>
				<meta
					name="keywords"
					content="ewidencja czasu pracy, zarządzanie urlopami, aplikacja HR, kalendarz pracownika, Planopia, kadry online, planowanie urlopów, program dla firm"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/blog/ewidencja-czasu-pracy-i-urlopow" />
				<link rel="alternate" href="https://planopia.pl/blog/ewidencja-czasu-pracy-i-urlopow" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en/blog/time-tracking-and-leave-management" hreflang="en" />
				<meta property="og:title" content="Jak skutecznie ewidencjonować czas pracy? Poznaj aplikację Planopia" />
				<meta
					property="og:description"
					content="Dowiedz się, jak nowoczesna aplikacja Planopia pomaga firmom w ewidencji czasu pracy, planowaniu urlopów i uproszczeniu działań HR."
				/>
				<meta property="og:type" content="article" />
				<meta property="og:url" content="https://planopia.pl/blog/ewidencja-czasu-pracy-i-urlopow" />
				<meta property="og:image" content="https://planopia.pl/img/mockupdesktop.webp" />
				<meta property="og:site_name" content="Planopia" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Jak skutecznie ewidencjonować czas pracy? Poznaj aplikację Planopia" />
				<meta
					name="twitter:description"
					content="Poznaj aplikację Planopia – nowoczesne narzędzie do ewidencji czasu pracy, urlopów i nieobecności w firmie."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/mockupdesktop.webp" />

				<script type="application/ld+json">
					{`
		{
		  "@context": "https://schema.org",
		  "@type": "BlogPosting",
		  "headline": "Jak skutecznie ewidencjonować czas pracy? Poznaj aplikację Planopia",
		  "description": "Poznaj zalety aplikacji Planopia – nowoczesnego systemu do ewidencji czasu pracy, zarządzania urlopami i usprawniania procesów kadrowych.",
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
		  "url": "https://planopia.pl/blog/ewidencja-czasu-pracy-i-urlopow",
		  "datePublished": "2025-06-10"
		}
		`}
				</script>
			</Helmet>

			<header className="bg-white shadow top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
					<RouterLink
						to="/"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }}/>
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
						<RouterLink to="/en/blog/time-tracking-and-leave-management" className="flex items-center languagechoose">
							<img src="/img/united-kingdom.webp" alt="English version" className="w-6 h-6" />
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
							to="/#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Test
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
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={toggleMenu}>
							Logowanie
						</RouterLink>
						<RouterLink
							to="/en/blog/time-tracking-and-leave-management"
							className="flex items-center languagechoose"
							style={{ marginTop: '15px' }}>
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
							<h1 className="text-4xl font-bold mb-6">
								Planopia – nowoczesna aplikacja do ewidencji czasu pracy i zarządzania urlopami
							</h1>
						</div>
						<img
							src="/img/mockupdesktop.webp"
							alt="mockup naszej aplikacji na komputerze"
							className="rounded-xl w-full h-auto aspect-[3/2] shadow-lg"
						/>
					</div>
				</div>
			</section>

			<article className="max-w-6xl mx-auto px-6 py-12">
				<p className="text-gray-700 text-lg mb-4">
					W dzisiejszych czasach efektywne zarządzanie czasem pracy oraz nieobecnościami pracowników to klucz do sukcesu
					każdej firmy. Tradycyjne metody, takie jak arkusze Excel czy papierowe wnioski urlopowe, są nie tylko
					czasochłonne, ale również podatne na błędy. Z pomocą przychodzi <strong>Planopia</strong> – nowoczesna,
					intuicyjna aplikacja stworzona z myślą o usprawnieniu codziennej pracy działów HR i managerów zespołów.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Czym jest Planopia?</h2>
				<p className="mb-4">
					Planopia to{' '}
					<strong>
						webowa aplikacja do ewidencji czasu pracy, zgłaszania i planowania urlopów oraz zarządzania nieobecnościami
					</strong>
					. System działa w każdej przeglądarce – bez potrzeby instalacji. Dzięki przejrzystemu interfejsowi,
					automatyzacji procesów oraz wbudowanym powiadomieniom e-mail, obsługa kadrowa staje się prostsza niż
					kiedykolwiek wcześniej.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Najważniejsze funkcje aplikacji</h2>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Intuicyjna ewidencja czasu pracy w przejrzystym kalendarzu – wpisuj godziny pracy w łatwy sposób.</li>
					<li>Formularz zgłoszeniowy do urlopów i nieobecności z natychmiastowym powiadomieniem przełożonego.</li>
					<li>Planowanie rocznego kalendarza urlopowego dla całej firmy.</li>
					<li>Automatyczne zliczanie godzin pracy i nadgodzin</li>
					<li>
						Możliwość integracji z systemami RCP (np. czytniki kart, bramki) – import danych o wejściach i wyjściach
						pracowników bezpośrednio do kalendarza pracy.
					</li>
					<li>Generowanie wniosków i kalendarzy w formacie PDF.</li>
					<li>Bezpieczny system logowania z poziomami dostępu i ochroną danych.</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Dlaczego warto wdrożyć Planopię?</h2>
				<p className="mb-4">
					Dzięki Planopii firmy zyskują kontrolę nad czasem pracy i urlopami, eliminują papierowy obieg dokumentów i
					redukują błędy kadrowe. To także oszczędność czasu i pieniędzy – zarówno dla pracowników HR, jak i całego
					zespołu.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Dla kogo jest Planopia?</h2>
				<p className="mb-4">
					Aplikacja dedykowana jest <strong>małym i średnim firmom</strong>, które chcą w prosty sposób zorganizować
					procesy kadrowe. Intuicyjna obsługa sprawia, że wdrożenie jest szybkie i bezproblemowe, a system można
					dostosować do indywidualnych potrzeb każdej organizacji.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Integracja z systemami RCP</h2>
				<p className="mb-4">
					Planopia może zostać zintegrowana z istniejącymi systemami rejestracji czasu pracy (RCP), takimi jak czytniki
					kart pracowniczych czy bramki wejściowe. Dzięki temu możliwe jest automatyczne uzupełnianie kalendarza pracy
					na podstawie odbicia pracownika, co szczególnie sprawdza się w zakładach produkcyjnych, fabrykach oraz dużych
					przedsiębiorstwach.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Podsumowanie</h2>
				<p className="mb-4">
					Planopia to nowoczesne, skalowalne rozwiązanie dla każdej firmy, która chce{' '}
					<strong>zautomatyzować zarządzanie czasem pracy i urlopami</strong>. Zacznij już dziś i przekonaj się, jak
					wiele możesz zyskać dzięki jednej aplikacji.
				</p>

				<p className="mt-8 font-medium text-blue-600">
					Dowiedz się więcej i{' '}
					<a href="/#test" className="underline">
						przetestuj Planopię za darmo
					</a>{' '}
				</p>

				<p className="mt-8 text-gray-700">
					Chcesz dowiedzieć się więcej o cyfrowej ewidencji czasu pracy? Przeczytaj nasz poradnik:{' '}
					<a href="/blog/ewidencja-czasu-pracy" className="text-blue-600 underline">
						Jak prosto i wygodnie ewidencjonować czas pracy?
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

export default BlogOne
