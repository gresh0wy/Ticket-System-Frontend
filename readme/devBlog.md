# DevBlog #1 — Backend Ticket System (Update 01.04.2026)



## Stack
Node.js, Express, MySQL2, bcrypt, jsonwebtoken, helmet, express-rate-limit


## Autentykacja

Zaimplementowano pełny system rejestracji i logowania. Hasła są hashowane przez `bcrypt` przed zapisem do bazy. Po zalogowaniu generowany jest token JWT który trafia do **HttpOnly cookie** — dzięki temu JavaScript po stronie klienta nie ma do niego dostępu, co chroni przed atakami XSS.

Logout czyści cookie po stronie serwera.



## Middleware

Stworzono dwa middleware:

`verifyToken` — weryfikuje JWT z cookie, dekoduje dane i dokłada je do `req.user`. Każdy chroniony endpoint przechodzi przez ten middleware.

`checkAdmin` — sprawdza `req.user.is_admin`. Używany zawsze po `verifyToken`.

Kombinacja `isAdmin` grupuje oba i stosowana jest na trasach administracyjnych.



## Endpointy

**Auth**
- `POST /login` `POST /register` `POST /logout`
- `GET /users` — lista userów (admin)
- `GET /users/me` — własny profil
- `PATCH /users/me` — edycja własnych danych
- `PATCH /users/me/password` — zmiana hasła
- `PATCH /users/:id` — edycja użytkownika (admin)
- `DELETE /users/:id` — usuwanie użytkownika (admin)

**Tickets**
- `POST /tickets` — tworzenie zgłoszenia
- `GET /tickets` — wszystkie zgłoszenia (admin)
- `GET /tickets/:id/status` — status własnego zgłoszenia
- `GET /ticketsDetails/:id` — szczegóły zgłoszenia (admin)
- `PATCH /tickets/:id` — edycja zgłoszenia (admin)
- `DELETE /tickets/:id` — usuwanie zgłoszenia (admin)



## Bezpieczeństwo

`helmet` ustawia bezpieczne nagłówki HTTP. 
`Rate limiting` na `/auth/login` blokuje brute force — maksymalnie 20 requestów na 15 minut. Dynamiczne zapytania SQL z placeholderami `?` chronią przed SQL injection.



# DevBlog #2 — FIX (Update 07.04.2026)

- Redukcja niepotrzebnego kodu w middleware autoryzacji oraz doprecyzowanie kodów błędów.
- Token JWT przechowuje dodatkowo dwa parametry: imię oraz nazwisko.
- Rozpoczęcie prac nad tworzeniem dokumentacji API.
- Przygotowanie wstępnego środowiska dla frontendu (React + TypeScript).



# DevBlog #3 — Update frontend (Update 20.04.2026)

## Autoryzacja
- Dodanie rejestracji użytkownika z podpiętym autorskim API
- Dodanie logowania użytkownika z podpiętym autorskim API
- Obsługa httpOnly cookie do przechowywania tokenu JWT
- Konfiguracja CORS między frontem (localhost:5173) a API (localhost:3000)

## Nawigacja v0.1
- Dodanie komponentu Navbar
- Komponent `GuestLinks` – wyświetla przyciski logowania i rejestracji gdy użytkownik nie jest zalogowany
- Komponent `UserInfo` – wyświetla imię i nazwisko zalogowanego użytkownika oraz przycisk wylogowania
- Automatyczne odświeżanie stanu nawigacji przy zmianie trasy (useLocation)
- Wylogowanie przekierowuje na stronę logowania
- Wstępny interfejs dla nawigacji, logowania i rejestracji

## Routing
- Konfiguracja tras dla użytkownika i admina
- Obsługa strony 404 (PageNotFound)
- Ujednolicone nazewnictwo tras zgodnie z REST (/tickets, /users/me, /admin/users itd.)

## Formularze i komponenty
- Komponent `FormInput` – wielokrotnego użytku, obsługuje wszystkie inputy przez propsy
- Formularz tworzenia zgłoszenia z dynamicznym mapowaniem pól przez `.map()`
- Komponent `SuccessModal` – modal z potwierdzeniem wysłania zgłoszenia oraz ID ticketa
- Reset formularza po zamknięciu modalu
- Obsługa błędów przy wysyłaniu zgłoszenia

## Lista zgłoszeń 
- Dodanie strony z listą wszytskich zgłoszeń po adresem `/admin/tickets` tylko dla użytkowników z pzoiomem administratora
- Dodanie szczegóły zgłoszenia z możliwością usunięcia zgłoszenia
- Stworzenie przekierowanie na strone z komunikatem o braku dostępu do danych zasobów

## Status zgłoszenia
- Dodanie strony przeglądania ststustu włąsnego zgłoszenia

## Edycja zgłoszeń
- Dodanie możliwości edycji zgłoszenia

