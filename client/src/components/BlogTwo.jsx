import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'

function BlogTwo() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'pl' }}>
				<title>Integracja z systemami RCP – Rozszerz możliwości rejestracji czasu pracy | Planopia</title>
				<meta
					name="description"
					content="Dowiedz się, jak Planopia integruje się z systemami RCP (czytniki kart, bramki) i automatyzuje ewidencję czasu pracy – bez rezygnacji z dotychczasowej infrastruktury."
				/>
				<meta
					name="keywords"
					content="integracja z RCP, system RCP, czytniki kart, ewidencja czasu pracy, automatyzacja HR, planowanie pracy, aplikacja kadrowa, Planopia"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/blog/integracja-z-rcp" />
                <link rel="alternate" href="https://planopia.pl/blog/integracja-z-rcp" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en/blog/time-attendance-integration" hreflang="en" />
				<meta property="og:title" content="Integracja z systemami RCP – Rozszerz możliwości rejestracji czasu pracy" />
				<meta
					property="og:description"
					content="Zobacz, jak możesz połączyć swój system RCP z aplikacją Planopia i automatycznie uzupełniać kalendarz pracy. Nowoczesne rozwiązania bez rezygnacji z obecnych urządzeń."
				/>
				<meta property="og:type" content="article" />
				<meta property="og:url" content="https://planopia.pl/blog/integracja-z-rcp" />
				<meta property="og:image" content="https://planopia.pl/img/rcpblog.webp" />
				<meta property="og:site_name" content="Planopia" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Integracja z systemami RCP – Rozszerz możliwości rejestracji czasu pracy" />
				<meta
					name="twitter:description"
					content="Integracja z RCP w aplikacji Planopia – automatyczne uzupełnianie czasu pracy na podstawie odbić z kart pracowniczych."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/rcpblog.webp" />

				<script type="application/ld+json">
					{`
		{
		  "@context": "https://schema.org",
		  "@type": "BlogPosting",
		  "headline": "Integracja z systemami RCP – Rozszerz możliwości rejestracji czasu pracy",
		  "description": "Zobacz, jak możesz połączyć swój system RCP z aplikacją Planopia i automatycznie uzupełniać kalendarz pracy. Nowoczesne rozwiązania bez rezygnacji z obecnych urządzeń.",
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
		  "url": "https://planopia.pl/blog/integracja-z-rcp",
		  "datePublished": "2025-06-11"
		}
		`}
				</script>
			</Helmet>

			<header className="bg-white top-0 z-50 w-full flex justify-between" id="planopiaheader">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 menucontent">
					<RouterLink to="/" className="logoinmenu text-2xl font-bold text-blue-700 companyname" style={{ marginBottom: '0px' }}>
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
						<RouterLink to="/en/blog/time-attendance-integration" className="flex items-center languagechoose">
							<img src="/img/united-kingdom.webp" alt="English version" className="w-6 h-6" />
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
						<RouterLink to="/en/blog/time-attendance-integration" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
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
								Integracja z systemami RCP – wykorzystaj pełen potencjał Twojego systemu rejestracji czasu pracy
							</h1>
						</div>
						<img src="/img/rcpblog.webp" alt="osoba korzystajaca z systemu rcp w swojej pracy" className="rounded-xl w-full h-auto aspect-[3/2] shadow-lg" />
					</div>
				</div>
			</section>

			<article className="max-w-6xl mx-auto px-6 py-12">
				<p className="text-gray-700 text-lg mb-4">
					Jeśli Twoja firma korzysta z czytników kart, bramek wejściowych lub innych systemów RCP (Rejestracji Czasu
					Pracy), nie musisz rezygnować z obecnych rozwiązań. Dzięki <strong>aplikacji Planopia</strong> możesz
					zintegrować swoje obecne systemy z nowoczesną platformą do zarządzania czasem pracy i urlopami, zyskując
					jeszcze większą kontrolę i automatyzację procesów kadrowych.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Jak działa integracja z RCP?</h2>
				<p className="mb-4">
					Planopia umożliwia import danych z zewnętrznych systemów rejestrujących godziny wejścia i wyjścia pracowników.
					Oznacza to, że <strong>dane z czytników kart lub bramek</strong> mogą automatycznie uzupełniać kalendarz pracy
					w aplikacji – bez konieczności ręcznego wpisywania godzin przez pracownika lub dział HR.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Co zyskujesz dzięki integracji?</h2>
				<ul className="list-disc pl-6 mb-4 text-gray-700">
					<li>Automatyczne uzupełnianie godzin pracy na podstawie odbić z kart RCP.</li>
					<li>Redukcję błędów kadrowych i nieścisłości w ewidencji czasu pracy.</li>
					<li>Oszczędność czasu dla działu kadr i managerów zespołów.</li>
					<li>Możliwość dalszego korzystania z istniejących urządzeń i infrastruktury RCP.</li>
					<li>Centralne zarządzanie czasem pracy, nieobecnościami i urlopami – wszystko w jednym miejscu.</li>
					<li>Wygodny dostęp na telefonie – aplikację można dodać do ekranu głównego i korzystać z niej jak z normalnej aplikacji, bez pobierania ze sklepu.</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-3">Dla kogo jest ta funkcja?</h2>
				<p className="mb-4">
					Integracja z RCP to idealne rozwiązanie dla{' '}
					<strong>zakładów produkcyjnych, fabryk, magazynów oraz średnich i dużych firm</strong>, w których istnieje już
					infrastruktura rejestrująca czas pracy. Dzięki Planopii można ją rozszerzyć o nowoczesne funkcje HR bez
					potrzeby wymiany dotychczasowego systemu.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Jak rozpocząć integrację?</h2>
				<p className="mb-4">
					Nasz zespół pomaga w procesie integracji z systemem RCP, analizując format danych i dostosowując proces
					importu do indywidualnych potrzeb firmy. W wielu przypadkach wystarczy plik CSV lub dostęp do API z systemu
					RCP.
				</p>

				<h2 className="text-2xl font-semibold mb-3">Podsumowanie</h2>
				<p className="mb-4">
					Dzięki integracji z RCP możesz zautomatyzować ewidencję czasu pracy, zwiększyć precyzję danych i oszczędzić
					czas. <strong>Planopia nie zastępuje Twojego systemu – tylko go uzupełnia i rozwija</strong>, tworząc
					kompleksowe środowisko do zarządzania pracownikami.
				</p>

				<p className="mt-8 font-medium text-blue-600">
					<a href="/#kontakt" className="underline">
						Skontaktuj się z nami
					</a>{' '}
					i dowiedz się, jak łatwo możesz zintegrować Planopię z Twoim systemem RCP.
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

export default BlogTwo
