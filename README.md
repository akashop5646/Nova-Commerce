# Kiln — E-commerce Store Builder Dashboard

A React + TanStack Start dashboard for building and managing e-commerce stores. Built with React 19, TanStack Router, Tailwind CSS v4, and shadcn/ui.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18 (or [Bun](https://bun.sh/))
- npm or bun

## Installation

```bash
git clone https://github.com/akashop5646/Nova-Commerce.git
cd Nova-Commerce
```

Using npm:
```bash
npm install
```

Using bun:
```bash
bun install
```

## Development

```bash
npm run dev
# or
bun run dev
```

This starts the dev server at `http://localhost:8080/`.

## Build

```bash
npm run build
# or
bun run build
```

## Preview production build

```bash
npm run preview
# or
bun run preview
```

## Lint

```bash
npm run lint
# or
bun run lint
```

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/latest) (React 19)
- **Routing:** [TanStack Router](https://tanstack.com/router/latest) (file-based)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- **Icons:** [Lucide](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **SSR:** [Nitro](https://nitro.unjs.io/) (deployable to Cloudflare Workers)
- **Package Manager:** npm or bun

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── dashboard-layout.tsx  # Shared sidebar + topbar layout
│   └── wizard.tsx   # Onboarding wizard step wrapper
├── hooks/           # Custom React hooks
├── lib/             # Utilities, onboarding state, animations
├── routes/          # TanStack Router file-based routes
│   ├── __root.tsx   # App shell (root layout)
│   ├── index.tsx    # Landing page
│   ├── signup.tsx   # Signup page
│   ├── onboarding*.tsx  # Onboarding flow (6 steps)
│   └── dashboard*.tsx   # Dashboard pages (10 routes)
├── router.tsx       # Router configuration
├── server.ts        # Nitro SSR server entry
└── styles.css       # Design system (oklch colors, theme tokens)
```
