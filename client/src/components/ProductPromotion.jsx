import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import axios from 'axios'
import { API_URL } from '../config'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import pl from 'date-fns/locale/pl'

function ProductPromotion() {
	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(prev => !prev)
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const [email2, setEmail2] = useState('')
	const [datetime, setDatetime] = useState(null)
	const [msg2, setMsg2] = useState('')
	registerLocale('pl', pl)

	const minTime = new Date()
	minTime.setHours(7, 0, 0)

	const maxTime = new Date()
	maxTime.setHours(23, 0, 0)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(`${API_URL}/api/public/request-demo`, { email }) // ✅ poprawna ścieżka
			setMessage('Dziękujemy! Wkrótce otrzymasz konto testowe.')
			setEmail('')
		} catch {
			setMessage('Błąd podczas wysyłania. Spróbuj ponownie później.')
		}
	}

	const handleSubmitMeeting = async e => {
		e.preventDefault()
		try {
			await axios.post(`${API_URL}/api/public/schedule-call`, {
				email: email2,
				datetime: datetime?.toISOString(),
			})
			setMsg2('Dziękujemy! Termin został zgłoszony.')
			setEmail2('')
			setDatetime(null)
		} catch {
			setMsg2('Błąd podczas wysyłania. Spróbuj ponownie później.')
		}
	}

	return (
		<>
			<Helmet htmlAttributes={{ lang: 'pl' }}>
				<title>Planopia – Aplikacja do ewidencji czasu pracy i zarządzania urlopami</title>
				<meta
					name="description"
					content="Planopia to nowoczesna aplikacja do ewidencji czasu pracy i zarządzania urlopami. Ułatwia planowanie urlopów, zarządzanie pracownikami i kontrolę nad czasem pracy."
				/>
				<meta
					name="keywords"
					content="aplikacja do ewidencji czasu pracy, zarządzanie urlopami, oprogramowanie dla firm"
				/>
				<meta name="author" content="Michał Lipka" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://planopia.pl/" />
				<link rel="alternate" href="https://planopia.pl" hreflang="pl" />
				<link rel="alternate" href="https://planopia.pl/en" hreflang="en" />
				<meta property="og:title" content="Planopia – Aplikacja do ewidencji czasu pracy i urlopów" />
				<meta
					property="og:description"
					content="Nowoczesna aplikacja do zarządzania czasem pracy, urlopami i nieobecnościami w firmie."
				/>
				<meta property="og:image" content="https://planopia.pl/img/planopiaheader.png" />
				<meta property="og:url" content="https://planopia.pl" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Planopia – Aplikacja do ewidencji czasu pracy i urlopów" />
				<meta
					name="twitter:description"
					content="Nowoczesne narzędzie do zarządzania czasem pracy i urlopami w firmach."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/planopiaheader.png" />
				<script type="application/ld+json">
					{`
	{
	  "@context": "https://schema.org",
	  "@type": "SoftwareApplication",
	  "name": "Planopia",
	  "url": "https://planopia.pl",
	  "applicationCategory": "BusinessApplication",
	  "operatingSystem": "Web",
	  "author": {
	    "@type": "Person",
	    "name": "Michał Lipka"
	  },
	  "description": "Aplikacja do ewidencji czasu pracy i zarządzania urlopami."
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
						<ScrollLink
							to="oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							O Aplikacji
						</ScrollLink>
						<ScrollLink
							to="cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Cennik
						</ScrollLink>
						<ScrollLink
							to="test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Test
						</ScrollLink>
						<ScrollLink
							to="kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Kontakt
						</ScrollLink>
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
						<RouterLink to="/en" className="flex items-center languagechoose">
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
						<ScrollLink
							to="oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							O Aplikacji
						</ScrollLink>
						<ScrollLink
							to="cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Cennik
						</ScrollLink>
						<ScrollLink
							to="test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Test
						</ScrollLink>
						<ScrollLink
							to="kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Kontakt
						</ScrollLink>
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
						<RouterLink to="/en" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
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
							<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
								Aplikacja do ewidencji czasu pracy i zarządzania urlopami.
							</h1>
						</div>
						<img
							src="/img/planopiaheader.png"
							alt="biznesmen zaznaczający aplikację"
							className="rounded-xl shadow-lg"
						/>
					</div>
				</div>
			</section>

			<section className="py-13 px-6 bg-white" id="oaplikacji">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold" style={{ marginBottom: '35px' }}>
						O aplikacji Planopia
					</h2>
					<p className="text-lg text-gray-700 mb-6 text-justify mt-10">
						Planopia to nowoczesna aplikacja webowa stworzona z myślą o firmach, które chcą w prosty sposób prowadzić
						<strong> ewidencję czasu pracy</strong>, zarządzać
						<strong> urlopami i nieobecnościami</strong> oraz usprawnić komunikację wewnętrzną. Dzięki intuicyjnemu
						interfejsowi i automatyzacji procesów kadrowych, oszczędzasz czas, unikasz błędów i zyskujesz pełną kontrolę
						nad organizacją pracy w Twoim zespole. System działa w przeglądarce i nie wymaga instalacji.
					</p>

					<ul className="list-disc pl-4 text-gray-800 text-base space-y-2 mb-4">
						<li>
							<strong>Ewidencja czasu pracy</strong> – intuicyjny kalendarz z możliwością zapisu godzin i trybu pracy.
						</li>
						<li>
							<strong>Automatyczne zliczanie godzin pracy</strong> – w tym nadgodzin i pracy zdalnej.
						</li>
						<li>
							<strong>Zgłaszanie urlopów i nieobecności</strong> – formularz z natychmiastowym powiadomieniem
							przełożonego.
						</li>
						<li>
							<strong>Planowanie urlopów</strong> – możliwość tworzenia rocznych planów urlopowych dla pracowników.
						</li>
						<li>
							<strong>Powiadomienia e-mail</strong> – automatyczne informacje o złożonych i zaakceptowanych wnioskach.
						</li>
						<li>
							<strong>Wydruk PDF</strong> – generowanie kalendarzy pracy oraz wniosków urlopowych do druku lub
							archiwizacji.
						</li>
						<li>
							<strong>Bezpieczeństwo</strong> – aplikacja została zaprojektowana z dużym naciskiem na bezpieczeństwo
							informacji i prywatność użytkowników.
						</li>
						<li>
							<strong>Błyskawiczne działanie</strong> – aplikacja działa szybko i płynnie, nawet w większych zespołach.
						</li>
						<li>
							<strong>Dostępność językowa</strong> – aplikacja dostępna jest w dwóch wersjach językowych: polskiej i
							angielskiej.
						</li>
						<li>
							<strong>Responsywność</strong> – aplikacja działa poprawnie i wygodnie również na urządzeniach mobilnych
							(smartfony, tablety).
						</li>
						<li>
							<strong>Integracja z systemami RCP</strong> – możliwość dostosowania aplikacji do importu danych z
							systemów rejestracji czasu pracy (np. dane z kart wejścia/wyjścia).
						</li>
					</ul>

					<h2 className="text-2xl font-semibold" style={{ marginTop: '50px', marginBottom: '15px' }}>
						Potrzebujesz dodatkowej funkcji?
					</h2>
					<p className="text-gray-700 text-base">
						Planopia to aplikacja, którą możemy dopasować do specyfiki Twojej firmy. Potrzebujesz wewnętrznego czatu?
						Raportów XLSX? Dodatkowych integracji? A może chcesz zlecić stworzenie innego systemu IT? Skontaktuj się z
						nami – oferujemy
						<strong> personalizację oprogramowania</strong> oraz realizację dedykowanych usług programistycznych.
					</p>
				</div>

				<img src="/img/planopiaimage.png" alt="grafika promująca aplikację" className="planopiaimgaboutmobile" />
				<div
					className="h-[400px] bg-fixed bg-center bg-cover mt-16 rounded-xl shadow-md planopiaimgparallax"
					style={{ backgroundImage: "url('/img/planopiaimage.png')" }}></div>
			</section>

			{/* CENNIK */}
			<section id="cennik" className="py-10 px-6 bg-gray-50">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-8">Cennik</h2>
					<div className="grid gap-6 md:grid-cols-2 mt-10">
						<div className="bg-white shadow p-8 rounded-lg">
							<p className="text-2xl font-semibold mb-2">w trakcie...</p>
							<p className="text-3xl font-bold">...</p>
						</div>
						<div className="bg-white shadow p-8 rounded-lg">
							<p className="text-2xl font-semibold mb-2">w trakcie...</p>
							<p className="text-3xl font-bold">...</p>
						</div>
					</div>
				</div>

				<img
					src="/img/mockupmobile.png"
					alt="grafika promująca aplikację desktopową"
					className="planopiaimgaboutmobile"
				/>
				<div
					className="h-[600px] bg-fixed bg-center bg-cover mt-16 rounded-xl planopiaimgparallax"
					style={{ backgroundImage: "url('/img/mockupdesktop.png')" }}></div>
			</section>

			{/* TESTUJ */}
			<section id="test" className="py-13 px-6 bg-white">
				<div className="max-w-xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Przetestuj aplikację</h2>
					<p className="mb-6">Wpisz swój email, a wyślemy dane do logowania na konto testowe.</p>
					<form onSubmit={handleSubmit} className="mt-10">
						<input
							type="email"
							className="w-full p-2 border border-gray-300 rounded-md mb-4"
							placeholder="Twój email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
							Wyślij
						</button>
						{message && <p className="mt-2 text-sm">{message}</p>}
					</form>
				</div>
			</section>

			{/* UMÓW ROZMOWĘ */}
			<section id="kontakt" className="py-13 px-6 bg-gray-50">
				{/* Nagłówek na środku */}
				<h2 className="text-4xl font-bold text-center mb-12">Kontakt</h2>

				{/* Dwie kolumny: dane kontaktowe i formularz */}
				<div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center justify-center mt-10">
					{/* Lewa kolumna – dane kontaktowe */}
					<div className="w-full md:w-1/2 flex flex-col items-center md:items-center text-center md:text-left">
						<div className="flex items-center mb-4 my-person">
							<img
								src="/img/1709827103942.jpg"
								alt="zdjęcie profilowe Michał Lipka"
								className="myimageface object-cover"
							/>
							<p className="mb-0 ml-4 text-lg font-semibold text-left">Michał Lipka</p>
						</div>

						<a
							href="https://www.linkedin.com/in/michal-lipka-wd/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center mb-2 text-blue-600 hover:underline">
							<img src="/img/linkedin.png" alt="logo linkedin" className="mylinkedin mr-2" />
							LinkedIn
						</a>

						<a href="tel:+48516598792" className="mb-2 block text-gray-800 hover:underline">
							+48 516 598 792
						</a>
						<a href="mailto:michalipka1@gmail.com" className="mb-2 block text-gray-800 hover:underline">
							michalipka1@gmail.com
						</a>
						<p className="text-gray-700 text-sm mb-4 max-w-xs" style={{ marginTop: '10px' }}>
							Chętnie wdrożę u Ciebie swoją aplikację lub wykonam inne zlecenia IT/programistyczne. Zapraszam do
							kontaktu!
						</p>
					</div>

					{/* Prawa kolumna – formularz */}
					<div className="w-full md:w-1/2 p-6 rounded-md">
						<p className="text-2xl font-bold mb-6 text-center md:text-left">Umów rozmowę</p>
						<p className="mb-6 text-gray-700 text-center md:text-left">
							Wybierz datę i godzinę, podaj swój e-mail i umów się na spotkanie online
						</p>

						<form onSubmit={handleSubmitMeeting} className="text-center">
							<DatePicker
								selected={datetime}
								onChange={setDatetime}
								showTimeSelect
								timeIntervals={30}
								minTime={minTime}
								maxTime={maxTime}
								dateFormat="Pp"
								timeCaption="Godzina"
								locale="pl"
								placeholderText="Wybierz datę i godzinę"
								className="w-full p-2 border border-gray-300 rounded-md mb-2"
							/>

							<input
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								placeholder="Twój email"
								value={email2}
								onChange={e => setEmail2(e.target.value)}
								required
							/>

							<button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
								Umów
							</button>

							{msg2 && <p className="mt-2 text-sm text-center text-gray-700">{msg2}</p>}
						</form>
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

export default ProductPromotion
