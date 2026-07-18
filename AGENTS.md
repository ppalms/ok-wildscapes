# AGENTS.md

OK Wildscapes: Next.js 14 (App Router) + TypeScript landscaping business site
with public marketing pages and an AWS Amplify/AppSync-backed backoffice.

## Setup

- `cp .env.local.example .env.local` then fill in AWS Amplify values (API URL,
  key, region, user/identity pool IDs). Required for auth and GraphQL calls.
- Install deps: `yarn install --frozen-lockfile` (11-55s).

## Build / Lint / Test Commands

- Dev server: `yarn dev` (http://localhost:3000, ~2s startup)
- Build: `yarn build` (~38s). May fail on Google Fonts fetch in
  network-restricted envs — temporarily comment out the font import in
  `src/app/layout.tsx` if so.
- Lint: `yarn lint` (runs `next lint`, ~2s). Must pass with zero errors before
  committing.
- Format: `npx prettier --write .` — format the whole repo. To check a single
  file: `npx prettier --check path/to/file.tsx`; to format one file:
  `npx prettier --write path/to/file.tsx`.
- Type-check only: `npx tsc --noEmit`
- **No test suite/framework is configured** (no jest/vitest/playwright, no
  `*.test.*`/`*.spec.*` files, no `test` script in package.json). If you add
  tests, add the framework + a `test` script and update this section,
  including the single-test invocation command.
- GraphQL codegen (regenerates `src/graphql/*`): `yarn codegen`. Requires AWS
  CLI/AppSync access; will fail offline — do not hand-edit generated files
  instead.

### Pre-commit checklist

Run in this order before committing: `yarn lint` → `npx prettier --write .` →
`yarn build` (skip build only if network-restricted, per above).

## Code Style

### Formatting (enforced by Prettier, `.prettierrc.json`)

- Single quotes, semicolons required, **no trailing commas**, 2-space indent,
  80-char print width. Don't hand-format against these rules — run Prettier.
- `prettier-plugin-tailwindcss` is installed, so Tailwind class lists are
  auto-sorted; don't manually reorder className strings.

### Linting

- ESLint config (`.eslintrc.json`) extends `next/core-web-vitals` and
  `prettier` (Prettier conflicts disabled in ESLint). Fix lint errors rather
  than disabling rules inline unless there's no reasonable alternative.

### TypeScript

- `strict: true` in `tsconfig.json` — all new code must be fully typed; avoid
  `any` (existing `plantSheet as any` casts in `actions.ts` are legacy, not a
  pattern to copy).
- Path alias `@/*` maps to `src/*` — always import via `@/...` instead of deep
  relative paths (e.g. `@/lib/utils`, `@/graphql/types`).
- Prefer `interface` for component props (e.g. `ButtonProps`,
  `ProvidersProps`); use `type` for unions/utility compositions.
- Use generated GraphQL types from `src/graphql/types.ts` for all API data
  shapes instead of redefining ad hoc interfaces.

### Imports

- No enforced import ordering — existing files freely interleave external
  packages and `@/...` aliases (e.g. `columns.tsx`, `upload-form.tsx`). Don't
  reorder imports as part of unrelated changes.
- Export style is directory-dependent, not a single rule: `src/components/ui/main/*`
  uses named exports (`export function Header()`); `src/components/ui/backoffice/*`
  and route files (`page.tsx`, `upload-form.tsx`) mostly use `export default`.
  Match the convention of the directory/sibling files you're editing.
- Server-only modules start with `'use server';` as the very first line
  (see `src/app/actions.ts`, `src/app/data.ts`). Client components start with
  `'use client';` as the first line in most files — `src/app/(main)/consultation/page.tsx`
  is an exception with a leading comment, which is legacy, not a pattern to copy.

### Naming Conventions

- Components: PascalCase filenames and export names
  (`Header.tsx`, `CarouselDotButton.tsx`).
- Utilities/hooks/config files: kebab-case or camelCase
  (`amplify-server-utils.ts`, `auth-provider.tsx`, `utils.ts`).
- React component props interfaces: `<ComponentName>Props`.
- Server actions: verb-first camelCase (`uploadPlantSheet`, `getPlantSheets`).
- Use the `cn()` helper (`src/lib/utils.ts`, clsx + tailwind-merge) for
  conditional/merged className strings — don't concatenate strings manually.

### Component Patterns

- UI primitives (`src/components/ui/*.tsx`) follow shadcn/ui conventions:
  `class-variance-authority` (cva) for variants, `React.forwardRef`, an
  `asChild` prop via `@radix-ui/react-slot` where composition is needed, and
  `displayName` set explicitly.
- Route groups define access boundaries: `src/app/(main)/` public,
  `src/app/(backoffice)/` authenticated admin (protected by
  `src/middleware.ts`), `src/app/(auth)/` login/auth pages.

### Forms & Validation

There are two distinct, unrelated form patterns in this codebase — match
whichever one fits the context, don't conflate them:

- **Client-side forms with instant feedback** (e.g. `consultation/page.tsx`):
  `react-hook-form`'s `useForm`/`register` with inline validation rules
  (`required`, `maxLength`, etc.) passed directly to `register()`. No zod.
- **Server action forms** (e.g. `upload-form.tsx` + `actions.ts`): plain
  `<form action={dispatch}>` with `useFormState`/`useFormStatus` from
  `react-dom`, validated server-side in the action with `zod`. Define a
  `formSchema` with `z.object`, a `State` type with `errors`/`message`, call
  `formSchema.safeParse` before `formSchema.parse`, and return field errors
  via `validatedFields.error.flatten().fieldErrors`.

### Error Handling

- Server actions/data fetchers: wrap GraphQL calls in `try/catch/finally`.
  Check `errors` array from `GraphQLResult` and log each via
  `errors.map(({ message }) => console.error(message))` before falling back
  to a default/empty value. Use `finally` for cleanup or guaranteed
  return/redirect (see `getPlantSheets`, `uploadPlantSheet`).
- Never let server actions throw uncaught — always return a typed `State`
  object with a user-facing `message` on failure.
- Use `unstable_noStore as noStore` at the top of server data-fetching
  functions that must not be cached.

### GraphQL / Data Layer

- **Never manually edit** `src/graphql/queries.ts`, `mutations.ts`, or
  `types.ts` — they are auto-generated by `yarn codegen`. Regenerate instead
  of patching.
- Server-side: use `cookiesClient` from `src/utils/amplify-server-utils.ts`.
- Client-side: use `generateClient()` from `aws-amplify/api`.

## Manual Validation

There is no test suite, so after making changes, manually verify:

- Public homepage, `/consultation` form, and `/resources` page render and
  function correctly.
- Backoffice routes (`/dashboard`, `/plant-sheets`, `/jobs`, `/ledger`)
  redirect to `/login` when unauthenticated — `src/middleware.ts` enforces
  this; verify any routing change still redirects correctly.

## Key Files Reference

- `src/middleware.ts` — auth middleware for protected routes
- `src/app/actions.ts` — server actions (uploads, form processing)
- `src/app/data.ts` — server-side data fetching
- `src/utils/amplify-server-utils.ts` — AWS Amplify server config
- `.graphqlconfig.yml` — AppSync schema config (don't commit real API IDs)
