# idea-engine — Web3 Token Launch & Whitelist Platform

A Web3 landing platform for token launches: wallet connection, whitelist registration, private-sale signup and airdrop tracking — built as a Next.js dApp with a MongoDB backend.

## Features

- Wallet connection (ethers.js / WalletConnect) with address-based whitelist eligibility
- Whitelist registration and private-sale email capture, persisted in MongoDB
- Airdrop info and user-wallet stats API
- Email notifications via MailerSend / Postmark
- Responsive landing page with Lottie animations and Framer Motion transitions
- Roadmap, NFT and partnership sections

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API routes, MongoDB (Mongoose)
- **Web3:** ethers.js v6, WalletConnect
- **Email:** MailerSend, Postmark
- **Animations:** Lottie, Framer Motion

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # or create .env.local manually
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `NODE_ENV` | `development` / `production` |

## API Routes

| Route | Description |
|---|---|
| `/api/joinWhitelist` | Register a wallet for the whitelist |
| `/api/submitPrivateSaleEmail` | Submit a private-sale email |
| `/api/isUserWalletConnectedWithEmail` | Check wallet/email connection status |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint
