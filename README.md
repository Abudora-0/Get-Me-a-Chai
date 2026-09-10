# Get Me A Chai · Patreon Clone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![NextAuth](https://img.shields.io/badge/NextAuth-v5-purple)](https://authjs.dev)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/Postgres-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://get-me-a-chaii.netlify.app)

**Live Demo:** https://get-me-a-chaii.netlify.app/

A full-stack creator support platform inspired by Patreon and Buy Me a Coffee. Fans support their favorite creators with a direct JazzCash, Easypaisa, or bank transfer.

---

## About

Get Me A Chai lets creators sign in with GitHub or Google, set up a public profile page, and start receiving support from their fans. Creators list their JazzCash/Easypaisa number and bank details; supporters visit the creator's page, send the transfer themselves, and log their support with a custom message, which the creator confirms from their dashboard once the money lands. Built with Next.js, NextAuth for OAuth, and Prisma for database access.

---

## Features

- **GitHub & Google OAuth login** - sign in instantly via NextAuth
- **Creator profile** - set your name, username, profile picture (upload & crop), cover photo, and payment details
- **Public support page** - shareable page where fans see how to pay and log their support with a message
- **Manual payment confirmation** - no payment gateway, no merchant account; creators confirm transfers themselves from the dashboard
- **Dashboard** - manage your profile, confirm pending payments, and view your supporter history
- **Persistent storage** - all users and payments saved to PostgreSQL via Prisma

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| NextAuth v5 | GitHub & Google OAuth authentication |
| Prisma | ORM for database access |
| PostgreSQL (Neon) | Cloud database |
| Tailwind CSS | Styling |

---

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env

# Push schema to database
npx prisma migrate dev

# Start development server
npm run dev
```

---

## Environment Variables

See [`.env.example`](.env.example) for the full list and per-provider notes.

```env
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXT_PUBLIC_URL=http://localhost:3000
```

### OAuth setup

`NEXTAUTH_URL` must match the exact origin the app is served from (no trailing
slash, no path). The OAuth providers must be told the same callback URLs:

| Provider | Where | Value |
|---|---|---|
| GitHub | github.com/settings/developers, the app's **Authorization callback URL** | `<NEXTAUTH_URL>/api/auth/callback/github` |
| Google | Cloud Console, Credentials, the OAuth client's **Authorized redirect URIs** | `<NEXTAUTH_URL>/api/auth/callback/google` |
| Google | same screen, **Authorized JavaScript origins** | `<NEXTAUTH_URL>` |

If the deploy URL changes, update `NEXTAUTH_URL` and both provider settings, or
sign-in fails with `redirect_uri` mismatch errors.

---

## License

Released under the [MIT License](LICENSE).
