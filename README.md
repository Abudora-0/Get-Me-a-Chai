# Get Me A Chai — Patreon Clone

**Live Demo:** https://patreon-c.netlify.app

A full-stack creator support platform inspired by Patreon and Buy Me a Coffee. Fans can support their favorite creators by sending payments directly via Razorpay.

---

## About

Get Me A Chai lets creators sign up with GitHub, set up a public profile page, and start receiving support from their fans. Supporters visit the creator's page and make a payment (buying them a "chai") with a custom message. Built with Next.js, NextAuth for GitHub OAuth, Prisma for database access, and Razorpay for payment processing.

---

## Features

- **GitHub OAuth login** — sign in instantly with your GitHub account via NextAuth
- **Creator profile** — set your name, username, profile picture, cover photo, and Razorpay credentials
- **Public support page** — shareable page where fans can send payments with a message
- **Razorpay integration** — real payment processing via Razorpay API
- **Dashboard** — manage your profile and view incoming payments
- **Persistent storage** — all users and payments saved to PostgreSQL via Prisma

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| NextAuth v5 | GitHub OAuth authentication |
| Prisma | ORM for database access |
| PostgreSQL (Neon) | Cloud database |
| Razorpay | Payment processing |
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

```env
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
NEXT_PUBLIC_URL=http://localhost:3000
```
