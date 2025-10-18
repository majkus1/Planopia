import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Open_Sans, Teko, Titillium_Web } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";
import GoogleTagManagerNoScript from "../components/GoogleTagManagerNoScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Planopia – Darmowa aplikacja do ewidencji czasu pracy i urlopów",
    template: "%s | Planopia"
  },
  description: "Planopia to darmowa aplikacja online do ewidencji czasu pracy i zarządzania urlopami dla zespołów do 8 osób. Dla większych firm dostępne są plany płatne z nielimitowaną liczbą użytkowników, elastycznymi funkcjami i integracjami.",
  keywords: [
    "darmowa ewidencja czasu pracy",
    "aplikacja do urlopów", 
    "kalendarz urlopów online",
    "program HR",
    "zarządzanie czasem pracy",
    "oprogramowanie dla firm",
    "Planopia"
  ],
  authors: [{ name: "Michał Lipka" }],
  creator: "Michał Lipka",
  publisher: "Planopia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://planopia.pl',
    siteName: 'Planopia',
    title: 'Planopia – Darmowa aplikacja do ewidencji czasu pracy i urlopów',
    description: 'Wypróbuj Planopię za darmo – ewidencja godzin pracy, planowanie urlopów i raporty online. Do 8 użytkowników bez opłat. Plany płatne dla większych firm z dodatkowymi funkcjami.',
    images: [
      {
        url: 'https://planopia.pl/img/headerimage.png',
        width: 1200,
        height: 630,
        alt: 'Planopia – Darmowa aplikacja do ewidencji czasu pracy i urlopów',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planopia – Darmowa aplikacja do ewidencji czasu pracy i urlopów',
    description: 'Darmowa aplikacja do ewidencji czasu pracy i planowania urlopów dla zespołów do 8 osób. Dla większych firm dostępne są płatne plany z większymi możliwościami.',
    images: ['https://planopia.pl/img/headerimage.png'],
  },
  alternates: {
    canonical: 'https://planopia.pl',
    languages: {
      'pl': 'https://planopia.pl',
      'en': 'https://planopia.pl/en',
    },
  },
  verification: {
    google: 'your-google-verification-code', // Dodaj swój kod weryfikacji Google
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} ${teko.variable} ${titilliumWeb.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
