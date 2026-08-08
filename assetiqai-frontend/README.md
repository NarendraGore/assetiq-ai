# ASSETIQ AI — Frontend

Next.js 16 frontend for **ASSETIQ AI**, an asset and inventory management platform.

[Live Demo](https://assetiq-ai-beta.vercel.app)

## Tech Stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **TanStack Query** · **TanStack Table** · **React Hook Form** + **Zod**
- **Recharts** · **Sonner** · **next-themes** · **PapaParse / xlsx** (exports)

## Getting Started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> This project is part of the larger [ASSETIQ AI](..) monorepo. See the root
> [README](../README.md) for demo credentials, the full feature list, the
> backend, and deployment instructions.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── app/            # App Router pages & layouts
│   ├── (app)/      # Authenticated pages (dashboard, products, inventory, ...)
│   └── (auth)/     # Login, register, forgot/reset password
├── components/     # Shared UI + layout + table components
├── features/       # Feature-scoped modules (auth, products, inventory, ...)
├── providers/      # React Query, theme, auth providers
└── shared/         # Export utilities (CSV/Excel)
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL, e.g. `https://assetiq-ai.onrender.com/api` |
