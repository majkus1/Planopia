import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
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
	const [userMessage, setUserMessage] = useState('')
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

		if (!datetime && (!userMessage || userMessage.trim() === '')) {
			alert('Please select a date or enter a message.')
			return
		}

		try {
			await axios.post(`${API_URL}/api/public/schedule-call`, {
				email: email2,
				datetime: datetime?.toISOString(),
				message: userMessage,
			})
			setMsg2('Dziękujemy! Wysłano wiadomość.')
			setEmail2('')
			setDatetime(null)
		} catch {
			setMsg2('Wystąpił błąd. Spróbuj ponownie później.')
		}
		console.log({ datetime, email: email2, message })
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
				<meta property="og:image" content="https://planopia.pl/img/planopiaheader.webp" />
				<meta property="og:url" content="https://planopia.pl" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Planopia – Aplikacja do ewidencji czasu pracy i urlopów" />
				<meta
					name="twitter:description"
					content="Nowoczesne narzędzie do zarządzania czasem pracy i urlopami w firmach."
				/>
				<meta name="twitter:image" content="https://planopia.pl/img/planopiaheader.webp" />
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
					<RouterLink
						to="/"
						className="logoinmenu text-2xl font-bold text-blue-700 companyname"
						style={{ marginBottom: '0px' }}>
						<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }} />
					</RouterLink>
					<nav className="hidden flex space-x-8 navdesktop">
						<a
							href="#oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							O Aplikacji
						</a>
						<a
							href="#cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Cennik
						</a>
						<a
							href="#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Test
						</a>
						<a
							href="#kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition">
							Kontakt
						</a>
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
						<a
							href="#oaplikacji"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							O Aplikacji
						</a>
						<a
							href="#cennik"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Cennik
						</a>
						<a
							href="#test"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Test
						</a>
						<a
							href="#kontakt"
							smooth={true}
							duration={500}
							offset={-80}
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4">
							Kontakt
						</a>
						<RouterLink
							to="/blog"
							className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition mb-4"
							onClick={toggleMenu}>
							Blog
						</RouterLink>
						<RouterLink
							to="/login"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
							onClick={toggleMenu}>
							Logowanie
						</RouterLink>
						<RouterLink to="/en" className="flex items-center languagechoose" style={{ marginTop: '15px' }}>
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
							<h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
								Aplikacja do ewidencji czasu pracy i zarządzania urlopami.
							</h1>{' '}
							<h2 className="font-semibold text-gray-800 mb-2" id="underheader">
								Z Planopią wszystko ma swoje miejsce.
							</h2>
							<p className="text-lg sm:text-xl text-gray-600 mb-6 underheadertwo">Prosto. Lekko. Przejrzyście.</p>
						</div>
						<img
							src="/img/planopiaheader.webp"
							alt="biznesmen zaznaczający aplikację"
							className="rounded-xl w-full h-auto aspect-[3/2]"
						/>
					</div>
				</div>
			</section>

			<section className="py-13 px-6 bg-white" id="oaplikacji">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-4xl font-bold" style={{ marginBottom: '35px' }}>
						O aplikacji Planopia
					</h2>
					<p className="text-lg text-gray-700 mb-6 text-justify mt-10">
						Planopia to nowoczesna aplikacja webowa stworzona z myślą o firmach, które chcą w prosty sposób prowadzić
						<strong> ewidencję czasu pracy</strong>, zarządzać
						<strong> urlopami i nieobecnościami</strong> oraz usprawnić komunikację wewnętrzną. Dzięki intuicyjnemu
						interfejsowi i automatyzacji procesów kadrowych, oszczędzasz czas, unikasz błędów i zyskujesz pełną kontrolę
						nad organizacją pracy w Twoim zespole.
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
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Bezpieczeństwo</strong> – aplikacja została zaprojektowana z dużym
							naciskiem na bezpieczeństwo informacji i prywatność użytkowników.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Błyskawiczne działanie</strong> – aplikacja działa szybko i płynnie,
							nawet w większych zespołach.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Dostępność językowa</strong> – aplikacja dostępna jest w dwóch wersjach
							językowych: polskiej i angielskiej.
						</li>
						<li>
							<strong>Responsywność</strong> – aplikacja działa poprawnie i wygodnie również na urządzeniach mobilnych
							(smartfony, tablety).
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Aplikacja PWA</strong> – dodaj Planopię do ekranu głównego swojego
							telefonu i korzystaj z niej jak z pełnoprawnej aplikacji mobilnej – bez pobierania ze sklepu.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Wygląd dopasowany do firmy</strong> – personalizacja kolorów, logo i
							stylu aplikacji zgodnie z identyfikacją marki.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Osobna subdomena i baza danych</strong> – każda firma otrzymuje własne,
							odizolowane środowisko aplikacji dla pełnej prywatności i personalizacji.
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Integracja z systemami RCP</strong> – możliwość dostosowania aplikacji
							do importu danych z systemów rejestracji czasu pracy (np. dane z kart wejścia/wyjścia).
						</li>
						<li className="bg-green-50 border-l-4 border-green-600 p-4 rounded list-disc pl-6 custom-marker">
							<strong className="text-green-700">Indywidualne wsparcie</strong> – zapewniamy indywidualną opiekę oraz
							szybkie wsparcie – jesteśmy tu, by pomóc Ci w każdej sytuacji.
						</li>
					</ul>

					<h2 className="text-2xl font-semibold" style={{ marginTop: '50px', marginBottom: '15px' }}>
						Potrzebujesz dodatkowej funkcji lub integracji?
					</h2>
					<p className="text-gray-700 text-base">
						Planopia to aplikacja, którą możemy dopasować do specyfiki Twojej firmy. Potrzebujesz wewnętrznego czatu?
						Grafiku pracy? Raportów XLSX? <strong className="text-green-700"> Dodatkowych integracji?</strong> A może
						chcesz zlecić stworzenie innego systemu IT? Skontaktuj się z nami – oferujemy
						<strong className="text-green-700"> personalizację oprogramowania</strong> oraz realizację dedykowanych
						usług programistycznych.
					</p>
				</div>

				<img src="/img/planopiaimage.webp" alt="grafika promująca aplikację" className="planopiaimgaboutmobile" />
				<div
					className="h-[400px] bg-fixed bg-center bg-cover mt-16 rounded-xl shadow-md planopiaimgparallax"
					style={{ backgroundImage: "url('/img/planopiaimage.webp')" }}></div>
			</section>

			{/* CENNIK */}
			<section id="cennik" className="py-10 px-6 bg-gray-50">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-8">Cennik</h2>
					<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-10 mt-4">
						<p className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
							Pierwszy miesiąc za darmo — bez zobowiązań.
						</p>
						<p className="text-gray-700 mb-4">Skontaktuj się z nami i przetestuj Planopię całkowicie za darmo.</p>
						<button
							onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
							className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
							Zacznij za darmo
						</button>
					</div>

					<div className="grid gap-6 md:grid-cols-2 mt-10">
						{/* Miesięczny pakiet */}
						{/* Miesięczny pakiet */}
						<div className="bg-white shadow p-8 rounded-lg border-t-4 border-green-500">
							<h3 className="text-2xl font-semibold mb-4">Pakiet miesięczny</h3>
							<p className="text-4xl font-bold text-green-600 mb-2">
								11,10 zł <span className="text-lg font-normal text-gray-700">/os./mies. (9,00 zł netto)</span>
							</p>
							<p className="text-gray-700 mb-4">Płatność co miesiąc, możliwość rezygnacji w każdej chwili.</p>
							<ul className="text-gray-700 text-left list-disc pl-5 space-y-2 mb-6">
								<li>Dostęp do pełnej funkcjonalności</li>
								<li>Własna subdomena i baza danych</li>
								<li>Pomoc techniczna i aktualizacje</li>
							</ul>
							<p className="text-sm text-gray-500 mb-6">
								Na życzenie możemy dodać nowe funkcje dopasowane do Twoich potrzeb — ich koszt ustalamy indywidualnie, w
								zależności od zakresu prac.
							</p>
							<button
								onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
								className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-full">
								Wybieram pakiet miesięczny
							</button>
						</div>

						{/* Roczny pakiet */}
						<div className="bg-white shadow p-8 rounded-lg border-t-4 border-blue-500">
							<h3 className="text-2xl font-semibold mb-4">Pakiet roczny</h3>
							<p className="text-4xl font-bold text-blue-600 mb-2">
								111,00 zł <span className="text-lg font-normal text-gray-700">/os./rok (90,24 zł netto)</span>
							</p>
							<p className="text-gray-700 mb-4">2 miesiące gratis przy płatności z góry za cały rok.</p>
							<ul className="text-gray-700 text-left list-disc pl-5 space-y-2 mb-6">
								<li>Dostęp do pełnej funkcjonalności</li>
								<li>Własna subdomena i baza danych</li>
								<li>Pomoc techniczna i aktualizacje</li>
							</ul>
							<p className="text-sm text-gray-500 mb-6">
								Na życzenie możemy dodać nowe funkcje dopasowane do Twoich potrzeb — ich koszt ustalamy indywidualnie, w
								zależności od zakresu prac.
							</p>
							<button
								onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
								className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full">
								Wybieram pakiet roczny
							</button>
						</div>
					</div>
				</div>
				<div className="mt-16 max-w-4xl mx-auto text-center">
					<h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Dla kogo jest Planopia?</h3>
					<p className="text-gray-700 text-lg leading-relaxed">
						Planopia to idealne rozwiązanie dla zespołów każdej wielkości — od kilku do kilkuset pracowników. Nasza
						aplikacja została stworzona z myślą o firmach, które chcą:
					</p>
					<ul className="list-disc text-left mt-6 text-gray-700 text-base space-y-2 pl-8 sm:pl-12">
						<li>łatwo i szybko prowadzić ewidencję czasu pracy i urlopów,</li>
						<li>nie przepłacać za funkcje, których nie potrzebują,</li>
						<li>
							korzystać z bezpiecznej, nowoczesnej aplikacji — dostępnej pod adresem przypisanym wyłącznie Twojej
							firmie, z możliwością używania jej także jak aplikacji mobilnej.
						</li>
					</ul>
					<p className="text-gray-600 text-base mt-6">
						Każda firma otrzymuje własną wersję aplikacji — z unikalnym linkiem oraz oddzielną bazą danych — dzięki
						czemu Planopia działa szybko, bezpiecznie i niezależnie dla każdego klienta.
					</p>
				</div>

				<img
					src="/img/mockupmobile.webp"
					alt="grafika promująca aplikację desktopową"
					className="planopiaimgaboutmobile"
				/>
				<div
					className="h-[600px] bg-fixed bg-center bg-cover mt-16 rounded-xl planopiaimgparallax"
					style={{ backgroundImage: "url('/img/mockupdesktop.webp')" }}></div>
			</section>

			{/* TESTUJ */}
			<section id="test" className="py-13 px-6 bg-white">
				<div className="max-w-xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Przetestuj aplikację</h2>
					<p className="mb-6">
						Wpisz swój email, a wyślemy dane do logowania na konto testowe, które będzie aktywne przez 7 dni.
					</p>
					<form onSubmit={handleSubmit} className="mt-10">
						<input
							type="email"
							className="w-full p-2 border border-gray-300 rounded-md mb-4"
							placeholder="Twój email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700"
							style={{ padding: '15px' }}>
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
								src="/img/1709827103942.webp"
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
							<img src="/img/linkedin.webp" alt="logo linkedin" className="mylinkedin mr-2" />
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
						<p className="text-2xl font-bold mb-6 text-center md:text-left contactform">Formularz kontaktowy</p>
						<p className="mb-6 text-gray-700 text-center md:text-left">
							Możesz umówić się na rozmowę online lub po prostu wysłać wiadomość — wybierz to, co Ci bardziej odpowiada.
						</p>

						<form onSubmit={handleSubmitMeeting} className="text-center mt-10">
							{/* Email na górze */}
							<input
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								placeholder="Twój adres e-mail"
								value={email2}
								onChange={e => setEmail2(e.target.value)}
								required
							/>

							{/* Datepicker */}
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
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							/>

							{/* Wiadomość */}
							<textarea
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								rows={4}
								placeholder="Twoja wiadomość"
								value={userMessage}
								onChange={e => setUserMessage(e.target.value)}
							/>

							{/* Przycisk */}
							<button
								type="submit"
								className="w-full bg-green-600 text-white rounded-md hover:bg-green-700"
								style={{ padding: '15px' }}>
								Wyślij
							</button>

							{msg2 && <p className="mt-2 text-sm text-center text-gray-700">{msg2}</p>}
						</form>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="py-10 px-6 bg-white border-t text-center d-flex justify-center">
				<img src="/img/planopialogo.webp" alt="logo oficjalne planopia" style={{ maxWidth: '180px' }} />
				{/* <a href="/blog/jak-usprawnic-firme" className="text-sm text-gray-600 hover:underline mt-2 block">
					Aplikacja do ewidencji czasu pracy może usprawnić Twoją firmę
				</a> */}
			</footer>
		</>
	)
}

export default ProductPromotion
