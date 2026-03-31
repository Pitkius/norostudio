# Freelancer Portfolio (Full‑stack)

Moderni pilno funkcionalumo freelancerių web programuotojo portfolio svetainė su:

- Viešu frontend (Home / Apie / Portfolio / Paslaugos / Kontaktai)
- Užklausų (užsakymų) forma, duomenys saugomi DB
- Admin panelė (JWT per `httpOnly` cookie) su:
  - Užklausų peržiūra + statuso keitimas
  - Portfolio projektų CRUD
  - Paslaugų ir kainų CRUD

## Technologijos

- **Frontend/Backend**: Next.js (App Router) + React + TypeScript
- **Stilius**: Tailwind CSS (minimalistinis, dark/light)
- **DB**: PostgreSQL + Prisma
- **Auth**: JWT (`/api/auth/login`) ir `httpOnly` cookie

## Projekto struktūra (svarbiausia)

- `app/` – vieši puslapiai, admin puslapiai, API
- `app/api/` – API endpointai (public + admin)
- `components/` – UI ir sekcijos
- `lib/` – Prisma client, auth, validacija
- `prisma/` – Prisma schema ir seed

## Paleidimas lokaliai (Windows / PowerShell)

### 1) Įdiegti priklausomybes

```bash
npm install
```

### 2) Susikurti `.env`

Nukopijuokite `.env.example` į `.env` ir užpildykite.

Pavyzdys:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="super-secret-string"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3) Prisma migracijos + client

```bash
npx prisma generate
npx prisma migrate dev
```

### 4) Sukurti admin vartotoją (seed)

```bash
npm run prisma:seed
```

### 5) Paleisti dev

```bash
npm run dev
```

Atidarykite `http://localhost:3000`.

Admin prisijungimas: `http://localhost:3000/admin/login`.

## API (trumpai)

- **Public**
  - `POST /api/inquiries` – sukuria užklausą (kontaktų forma)
  - `GET /api/public/projects` – publikuoti projektai
  - `GET /api/public/services` – aktyvios paslaugos
- **Auth**
  - `POST /api/auth/login` – sukuria JWT cookie
  - `POST /api/auth/logout` – išvalo cookie
  - `GET /api/auth/me` – patikrina sesiją
- **Admin (reikia prisijungti)**
  - `GET/POST /api/admin/projects`
  - `PUT/DELETE /api/admin/projects/:id`
  - `GET/POST /api/admin/services`
  - `PUT/DELETE /api/admin/services/:id`
  - `GET /api/admin/inquiries`
  - `PUT/DELETE /api/admin/inquiries/:id`

## Deploy

### Vercel (Next.js)

1. Įkelkite repo į GitHub.
2. Vercel → New Project → import repo.
3. Environment variables:
   - `DATABASE_URL` (Railway/Render Postgres)
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` (pvz. `https://jusu-domenas.lt`)
4. Pirmą kartą paleiskite migracijas:
   - paprasčiausia: lokaliai `npx prisma migrate dev`, tada `npx prisma migrate deploy` CI/deploy’e (arba Vercel Build Step).

### Railway/Render (PostgreSQL)

- Sukurkite PostgreSQL instancą ir pasiimkite `DATABASE_URL`.
- Paleidimui produkcijoje naudokite:

```bash
npx prisma migrate deploy
```

## Pastabos

- Dark/light režimas išsaugomas `localStorage`.
- Admin JWT laikomas `httpOnly` cookie, todėl jo neskaito JS (saugiau).

