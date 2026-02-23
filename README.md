# Alexandro's Portfolio

Personal portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Icons** — [Simple Icons CDN](https://simpleicons.org/)
- **Package Manager** — pnpm

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── GlowOrbs.tsx
│       ├── ProjectCard.tsx
│       └── SectionHeading.tsx
├── hooks/
│   └── useActiveSection.ts
├── lib/
│   └── data/
│       ├── personal.ts
│       ├── skills.ts
│       ├── experience.ts
│       └── projects.ts
└── types/
    └── index.ts
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.