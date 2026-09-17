# Auratech

A full-stack e-commerce storefront for audio and consumer electronics — headphones, earbuds, smartwatches, speakers and accessories. Built as a portfolio project to demonstrate production-grade engineering across the whole stack: a typed Postgres-backed API, real authentication, and a premium, accessible React front end.

**Live demo:** [https://auratech-store.vercel.app](https://auratech-store.vercel.app)

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-Neon-4169e1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/tested%20with-Vitest-6e9f18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-black)

## Features

- **Full storefront flow** — browse by category, search, sort, view product details, add to cart, and check out.
- **Real backend** — products, users and orders are served from Postgres via serverless functions, not static files.
- **Authentication** — email/password accounts with bcrypt-hashed passwords and a JWT held in an httpOnly cookie.
- **Real orders** — checkout recomputes prices server-side from the database (never trusts the client) and persists an order + line items tied to the signed-in user; signed-in users can view their order history.
- **Persistent cart** — pre-checkout cart state lives in a `useReducer`-backed context and survives reloads via `localStorage`.
- **Server-driven search & filtering** — category, free-text search and sort are query params resolved by the API (`GET /api/products`), so results are shareable and bookmarkable.
- **Route-based code splitting** — every page is lazily loaded with `React.lazy` + `Suspense`.
- **Accessible by default** — semantic landmarks, a skip-to-content link, labelled icon buttons, visible focus states, and `prefers-reduced-motion` support.
- **Responsive, premium UI** — a restrained neutral palette with a single accent color and a fluid type scale, tested down to 360px.
- **Fully typed** — one shared `Product`/`AuthUser`/`Order` model in `src/types.ts`, and a Drizzle schema as the single source of truth on the server.

## Tech stack

| Layer          | Choice                                          |
| -------------- | ------------------------------------------------ |
| UI              | React 19, React Router 7, TanStack Query 5      |
| Backend         | Vercel Functions (Node.js) under `/api`         |
| Database        | Postgres (Neon) via Drizzle ORM                 |
| Auth            | bcrypt + JWT in an httpOnly cookie              |
| Validation      | Zod                                             |
| Language        | TypeScript (strict mode, front end and back end)|
| Build tool      | Vite 8                                          |
| Styling         | Hand-written CSS (design tokens, no framework)  |
| Icons           | lucide-react                                    |
| Testing         | Vitest, React Testing Library, jsdom            |
| Linting         | oxlint                                          |
| Deployment      | Vercel                                          |

## Getting started

```bash
npm install
```

This project needs a Postgres database and a JWT signing secret. The easiest path is Vercel + Neon:

```bash
vercel link                     # link this folder to a Vercel project
vercel integration add neon     # provisions Neon and wires DATABASE_URL automatically
vercel env add JWT_SECRET       # any long random string, e.g. `openssl rand -hex 32`
vercel env pull .env.local      # pulls DATABASE_URL, JWT_SECRET, etc. locally
npm run db:push                 # create the tables
npm run db:seed                 # load the product catalog
```

Then, for full-stack local development (frontend + `/api` functions together):

```bash
npm run dev:full     # runs `vercel dev` — http://localhost:3000
```

`npm run dev` (plain `vite`) also works for frontend-only work, but API calls will 404 without `vercel dev` or a deployed backend.

Other scripts:

```bash
npm run build        # type-check (tsc -b, including /api) then build for production
npm run preview       # preview the production build locally
npm run test          # run the test suite once
npm run test:watch    # run the test suite in watch mode
npm run lint          # run oxlint
npm run db:generate   # generate SQL migrations from the Drizzle schema
npm run db:push       # push the current schema straight to the database
npm run db:studio     # open Drizzle Studio to browse the data
npm run db:seed       # (re)load the product catalog from src/data.ts
```

## Project structure

```
api/
├── _lib/             # db client, Drizzle schema, auth helpers, zod schemas, HTTP helpers
├── auth/             # register, login, logout, me
├── products/         # list (with filters) + single product
└── orders/           # create (auth) + list current user's orders (auth)
scripts/
└── seed.ts           # loads src/data.ts's product catalog into Postgres
src/
├── components/       # Presentational + interactive UI pieces (Navbar, ProductCard, CartDrawer, ...)
├── context/          # CartContext (cart state) and AuthContext (session state)
├── pages/            # Route-level views (Home, Shop, Product, Cart, Login, Register, Orders, ...)
├── lib/api.ts        # Typed fetch client for the /api routes
├── test/             # Vitest setup
├── data.ts           # Static site content (nav/footer/promo copy) + the product seed source
├── hooks.ts          # useReveal (scroll-in animation), usd (currency formatting)
├── types.ts          # Shared Product / AuthUser / Order / CartItem types
└── main.tsx          # App entry point (QueryClient, AuthProvider, CartProvider)
```

## Testing

The suite covers the parts most likely to break silently:

- **Frontend**: currency formatting, the cart reducer (add/remove/update quantity/persist to `localStorage`), and component behavior (`ProductCard` rendering price/tag and reacting to "add to cart", `Stars` exposing an accessible rating label).
- **Backend**: password hashing and JWT sign/verify round-trips, and the Zod request schemas for register/login/order (valid input accepted, invalid input rejected).

```bash
npm run test
```

## Deployment

The project is configured for [Vercel](https://vercel.com): `vercel.json` rewrites page routes to `index.html` for client-side routing while leaving `/api/*` and Vite's own asset/module requests untouched. Push to a Vercel-linked Git repo (or run `vercel --prod`) and set the same `DATABASE_URL` / `JWT_SECRET` environment variables in the project settings for Production and Preview.

## Notes

This is a portfolio demo: no real payment is processed at checkout. Everything else — accounts, passwords, sessions, and order history — is real and backed by Postgres.

## License

MIT — see [LICENSE](./LICENSE).
