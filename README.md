# Cloneeu Portfolio

Alexandro’s static portfolio, built with Next.js, TypeScript, Framer Motion, and handcrafted CSS. The visual system follows the editorial, pastel, and pixel-art direction documented in `DESIGN.md`.

## Development

```bash
pnpm install
pnpm dev
```

Run the project checks with:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

`next build` exports the complete site to `out/`. The GitHub Actions workflow supplies the repository base path and public Pages URL at build time before deploying that directory.

## Content

Portfolio copy lives in `src/lib/data`. The portrait and other static assets live in `public`, while the pixel-art project illustrations are inline SVG components.
