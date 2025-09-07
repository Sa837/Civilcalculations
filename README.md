# Civil Calculation

Fast calculators, smart converters — built for civil engineers.

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + next-themes
- Framer Motion
- Fuse.js (search)
- react-hook-form + zod (validation)
- Big.js (numeric stability)
- Vitest + Playwright (tests)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build && npm start
```

## Environment
Create `.env.local` with optional values:
```
RESEND_API_KEY=your_key
PLAUSIBLE_DOMAIN=civil-calculation.local
```

## Add a converter
- Edit `lib/registry/converters.ts` and add `makeConverter(slug, title, category, units)`.
- For each unit, provide `toBase` and `fromBase` via `linearUnit` or custom logic (see temperature example).

## Add a calculator
- Edit `lib/registry/calculators.ts` and add an object with `inputs` and `compute(values)`.
- The detail route `/calculators/[slug]` renders inputs and computed results automatically.

## Tests
- Unit: `npm test`
- E2E: `npm run e2e` (build/start required)

## Accessibility & SEO
- Keyboard-friendly components, visible focus, color contrast.
- `metadata` is set in `app/layout.tsx`, plus `robots.txt` and `sitemap.xml`.

## License
MIT


