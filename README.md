# Noro Studio

Pilno ciklo portfolio ir paslaugų svetainė su projektų, paslaugų bei klientų užklausų administravimu.

## Funkcionalumas

- Viešas portfolio, paslaugų ir kontaktų turinys
- Užklausų forma su duomenų saugojimu
- Apsaugota administravimo panelė
- Projektų ir paslaugų turinio valdymas
- Next.js, TypeScript, Prisma ir PostgreSQL

## Paleidimas lokaliai

```bash
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

Atidarykite: http://localhost:3000

## Admin prisijungimas lokaliai

Nukopijuokite `.env.example` į `.env` ir pakeiskite `JWT_SECRET`, `ADMIN_EMAIL` bei `ADMIN_PASSWORD`. Nenaudokite pavyzdinių reikšmių produkcijoje.

Prisijungimo adresas: http://localhost:3000/studio-login-9xk2/login

> Senas kelias `/admin` redirectina į pradžią. Naudokite tik `studio-login-9xk2`.
