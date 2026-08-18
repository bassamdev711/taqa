# TAQA HOME

TAQA HOME is a premium Arabic-first storefront for household electrical appliances and solar-energy solutions. The experience uses a quiet architectural visual language, clear product specifications, and an e-commerce foundation that preserves cart, checkout, orders, authentication, and administration.

## Product scope

The catalog covers washing machines, refrigerators, kitchen appliances, dishwashers, cleaning devices, air conditioning, water heating, solar energy, energy storage, and smart lighting and tools.

The demo catalog contains ten collections and one hundred products, with ten products per collection. Product images used by the demo seed are local SVG assets under `public/products/`.

## Stack

- Next.js 16.3.1 with App Router and TypeScript
- Prisma 5.22 with PostgreSQL
- Tailwind CSS v4
- Framer Motion and Lucide React
- Arabic-first layout using Tajawal
- Vercel deployment with optional Neon direct connection

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Database setup

The production build runs `prisma generate`, applies the current Prisma schema when a database connection exists, and then builds the Next.js application. The connection wrapper prefers `DIRECT_URL` and falls back to `DATABASE_URL`.

To initialize the demo catalog from a machine that has the project and database environment variables:

```bash
npm run db:bootstrap:demo
```

When working only from Vercel, add `SEED_DEMO_DATA=true` to the Production environment variables and redeploy once. The build will create the schema and seed ten collections and one hundred demo products. Disable the variable after the successful deployment so the demo seed does not run on later builds.

Never commit `.env` files or database credentials. See [SETUP.md](./SETUP.md) for the complete Vercel and database procedure.

## Repository

The source repository is [bassamdev711/taqa](https://github.com/bassamdev711/taqa), deployed as the `taqa` Vercel project.

© 2026 TAQA HOME. Built for clearer homes and smarter energy.
