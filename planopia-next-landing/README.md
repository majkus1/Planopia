# Planopia Next.js Landing Page

Projekt Next.js 15 z przeniesionym komponentem ProductPromotion z Reacta, zoptymalizowany pod kątem SEO.

## Struktura projektu

```
src/
├── app/
│   ├── layout.tsx          # Główny layout z metadanymi SEO
│   ├── page.tsx            # Strona główna
│   ├── sitemap.ts          # Automatyczny sitemap
│   ├── robots.ts           # Plik robots.txt
│   ├── manifest.ts         # PWA manifest
│   └── globals.css         # Globalne style Tailwind
├── components/
│   └── ProductPromotion.tsx # Przeniesiony komponent z React
├── styles/
│   ├── index.css           # Plik do przeniesienia z React
│   ├── App.css             # Plik do przeniesienia z React
│   └── style.css           # Plik do przeniesienia z React
└── config.js               # Konfiguracja API
```

## Funkcjonalności SEO

- ✅ Metadata API (Next.js 15)
- ✅ Open Graph i Twitter Cards
- ✅ Automatyczny sitemap.xml
- ✅ Plik robots.txt
- ✅ PWA manifest
- ✅ Optymalizacja obrazów
- ✅ Headers bezpieczeństwa
- ✅ Kompresja gzip
- ✅ Strukturalne dane JSON-LD

## Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Budowanie produkcyjne
npm run build

# Uruchomienie produkcyjne
npm start
```

## Konfiguracja

1. Skopiuj pliki CSS z projektu React do folderu `src/styles/`:
   - `index.css`
   - `App.css` 
   - `style.css`

2. Skopiuj obrazy z projektu React do folderu `public/img/`

3. Utwórz plik `.env.local` z konfiguracją:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=https://planopia.pl
NEXT_PUBLIC_SITE_NAME=Planopia
```

## Różnice względem React

- `RouterLink` → `Link` (Next.js)
- `href` zamiast `to` w Link
- Dodano `'use client'` dla komponentów z hookami
- TypeScript zamiast JavaScript
- Metadata API zamiast react-helmet-async (opcjonalnie)

## SEO Features

- Automatyczne generowanie sitemap.xml
- Optymalizacja meta tagów
- Strukturalne dane JSON-LD
- Open Graph i Twitter Cards
- PWA support
- Optymalizacja obrazów
- Headers bezpieczeństwa