# System Zespołów - Planopia

## Opis

Zaimplementowano system wielodostępności (multi-tenancy) dla aplikacji Planopia, który umożliwia:

- **Tworzenie zespołów** - każdy zespół ma swoją przestrzeń danych
- **Limit użytkowników** - darmowy plan do 8 użytkowników na zespół
- **Izolacja danych** - dane zespołów są całkowicie oddzielone
- **Administracja zespołu** - każdy zespół ma swojego admina

## Nowe funkcjonalności

### 1. Rejestracja zespołu (`/team-registration`)
- Formularz do tworzenia nowego zespołu
- Automatyczne tworzenie admina zespołu
- Generowanie tymczasowego hasła
- Przekierowanie do dashboardu po utworzeniu

### 2. Logowanie zespołu
- Dodano opcję "Utwórz nowy zespół" na stronie logowania
- Logowanie do istniejącego zespołu
- Automatyczne przekierowanie do odpowiedniego środowiska

### 3. Zarządzanie użytkownikami
- Sprawdzanie limitu użytkowników (max 8)
- Informacje o pozostałych miejscach
- Blokada dodawania użytkowników po osiągnięciu limitu

## Struktura bazy danych

### Nowy model `Team`
```javascript
{
  name: String,           // Nazwa zespołu
  adminEmail: String,     // Email admina
  adminPassword: String,  // Hasło admina (zahashowane)
  adminFirstName: String, // Imię admina
  adminLastName: String,  // Nazwisko admina
  maxUsers: Number,       // Limit użytkowników (domyślnie 8)
  currentUserCount: Number, // Aktualna liczba użytkowników
  isActive: Boolean,      // Czy zespół jest aktywny
  subscriptionType: String // Typ subskrypcji (free/premium/enterprise)
}
```

### Zmodyfikowany model `User`
```javascript
{
  // ... istniejące pola ...
  teamId: ObjectId,      // ID zespołu (wymagane)
  isTeamAdmin: Boolean   // Czy to admin zespołu
}
```

## Nowe endpointy API

### Zespoły (`/api/teams`)
- `POST /register` - Rejestracja nowego zespołu
- `GET /:teamId` - Informacje o zespole
- `GET /:teamId/users` - Użytkownicy zespołu
- `POST /:teamId/check-limit` - Sprawdzenie limitu użytkowników

### Zaktualizowane endpointy użytkowników
- `POST /register` - Dodaje sprawdzanie limitu zespołu
- `GET /me` - Zwraca informacje o zespole

## Instalacja i uruchomienie

### 1. Aktualizacja bazy danych
```bash
# Uruchom migrację dla istniejących użytkowników
cd server
node migrations/addTeamIdToUsers.js
```

### 2. Uruchomienie serwera
```bash
cd server
npm install
npm start
```

### 3. Uruchomienie klienta
```bash
cd client
npm install
npm run dev
```

## Migracja istniejących danych

### Automatyczna migracja
Skrypt `migrations/addTeamIdToUsers.js` automatycznie:
1. Tworzy domyślny zespół dla istniejących użytkowników
2. Przypisuje wszystkich użytkowników do tego zespołu
3. Ustawia `isTeamAdmin: false` dla wszystkich

### Ręczna migracja (opcjonalnie)
```javascript
// W MongoDB shell
use your_database_name

// Utwórz domyślny zespół
db.teams.insertOne({
  name: "Domyślny Zespół",
  adminEmail: "admin@default.com",
  adminPassword: "default_hash",
  adminFirstName: "Admin",
  adminLastName: "Domyślny",
  maxUsers: 8,
  currentUserCount: 0,
  isActive: true,
  subscriptionType: "free",
  createdAt: new Date()
})

// Zaktualizuj istniejących użytkowników
db.users.updateMany(
  { teamId: { $exists: false } },
  { 
    $set: { 
      teamId: ObjectId("ID_zespołu_z_powyższego_kroku"),
      isTeamAdmin: false 
    } 
  }
)
```

## Bezpieczeństwo

### Izolacja danych
- Każdy zespół ma dostęp tylko do swoich danych
- Middleware `checkTeamAccess` sprawdza przynależność do zespołu
- Tokeny JWT zawierają `teamId` dla weryfikacji

### Walidacja
- Sprawdzanie limitu użytkowników przed dodaniem
- Walidacja unikalności nazwy zespołu
- Sprawdzanie unikalności emaila admina

## Rozszerzenia w przyszłości

### Płatne plany
- Premium: 25 użytkowników
- Enterprise: Nielimitowane użytkowniki

### Funkcje zespołu
- Własne logo i kolory
- Zaawansowane raporty
- Integracje zewnętrzne

## Rozwiązywanie problemów

### Błąd "Zespół nie został znaleziony"
- Sprawdź czy użytkownik ma `teamId` w bazie
- Uruchom migrację: `node migrations/addTeamIdToUsers.js`

### Błąd "Osiągnięto limit użytkowników"
- Sprawdź liczbę użytkowników w zespole
- Rozważ upgrade do planu premium

### Problemy z logowaniem
- Sprawdź czy token JWT zawiera `teamId`
- Sprawdź czy użytkownik ma przypisany zespół

## Wsparcie

W przypadku problemów:
1. Sprawdź logi serwera
2. Sprawdź logi przeglądarki
3. Sprawdź czy wszystkie migracje zostały uruchomione
4. Sprawdź czy modele bazy danych są poprawnie zaimportowane
